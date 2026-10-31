const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const dotenv = require("dotenv");

dotenv.config();

const serviceAccount = require("./firebase-admin-key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields."
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters."
      });
    }

    const existingUser = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!existingUser.empty) {
      return res.status(400).json({
        message: "Email already registered."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
      firstName,
      lastName,
      email,
      passwordHash,
      plan: "Free",
      createdAt: FieldValue.serverTimestamp()
    };

    await db.collection("users").add(user);

    res.status(201).json({
      message: "Registration successful."
    });

  } catch (error) {
    res.status(500).json({
      message: "Registration failed."
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password."
      });
    }

    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const passwordMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Server configuration error."
      });
    }

    const token = jwt.sign(
      {
        userId: userDoc.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: userDoc.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        plan: user.plan
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed."
    });
  }
});

app.post("/upgrade", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Please log in first."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userRef = db.collection("users").doc(decoded.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    await userRef.update({
      plan: "Paid"
    });

    res.status(200).json({
      message: "Your plan has been upgraded to Paid."
    });

  } catch (error) {
    res.status(401).json({
      message: "Unable to upgrade plan."
    });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Please log in before creating a post."
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      postType,
      title,
      abstract,
      description,
      tags,
      plan
    } = req.body;

    if (!["Question", "Article"].includes(postType)) {
      return res.status(400).json({
        message: "Invalid post type."
      });
    }

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        message: "Please enter a valid title."
      });
    }

    if (!description || description.trim().length < 5) {
      return res.status(400).json({
        message: "Please enter a valid description."
      });
    }

    if (postType === "Article" && (!abstract || abstract.trim() === "")) {
      return res.status(400).json({
        message: "Please enter an abstract."
      });
    }

    if (
      !Array.isArray(tags) ||
      tags.length > 3 ||
      tags.some((tag) => typeof tag !== "string" || !tag.trim())
    ) {
      return res.status(400).json({
        message: "Please enter no more than 3 valid tags."
      });
    }

    if (!["Free", "Paid"].includes(plan)) {
      return res.status(400).json({
        message: "Invalid post plan."
      });
    }

    const userDoc = await db
      .collection("users")
      .doc(decoded.userId)
      .get();

    if (!userDoc.exists) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (plan === "Paid" && userDoc.data().plan !== "Paid") {
      return res.status(403).json({
        message: "Please upgrade your account to create Paid posts."
      });
    }

    const post = {
      userId: decoded.userId,
      postType,
      title: title.trim(),
      abstract: postType === "Article" ? abstract.trim() : "",
      description: description.trim(),
      tags: tags.map((tag) => tag.trim()),
      plan,
      createdAt: FieldValue.serverTimestamp()
    };

    const postRef = await db.collection("posts").add(post);

    res.status(201).json({
      message: "Post created successfully.",
      postId: postRef.id
    });

  } catch (error) {
    res.status(401).json({
      message: "Unable to create post."
    });
  }
});

app.get("/posts", async (req, res) => {
  try {
    let userPlan = "Free";

    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userDoc = await db
        .collection("users")
        .doc(decoded.userId)
        .get();

      if (!userDoc.exists) {
        return res.status(401).json({
          message: "User not found."
        });
      }

      userPlan = userDoc.data().plan;
    }

    const postsSnapshot = await db.collection("posts").get();

    const posts = [];

    postsSnapshot.forEach((doc) => {
      const post = doc.data();

      if (userPlan === "Paid" || post.plan === "Free") {
        posts.push({
          id: doc.id,
          ...post
        });
      }
    });

    res.status(200).json(posts);

  } catch (error) {
    res.status(401).json({
      message: "Unable to fetch posts."
    });
  }
});

app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please enter your email."
      });
    }

    if (
      !process.env.EMAILJS_SERVICE_ID ||
      !process.env.EMAILJS_TEMPLATE_ID ||
      !process.env.EMAILJS_PUBLIC_KEY ||
      !process.env.EMAILJS_PRIVATE_KEY
    ) {
      return res.status(500).json({
        message: "Email service is not configured."
      });
    }

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: {
            subscriber_email: email
          }
        })
      }
    );

    if (!response.ok) {
      return res.status(400).json({
        message: "Unable to subscribe."
      });
    }

    res.status(200).json({
      message: "Subscription successful."
    });

  } catch (error) {
    res.status(500).json({
      message: "Subscription failed."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

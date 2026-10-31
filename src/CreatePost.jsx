import { useState } from "react";
import "./CreatePost.css";

function CreatePost() {
  const [postType, setPostType] = useState("Question");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [plan, setPlan] = useState("Free");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in before creating a post.");
      return;
    }

    if (title.trim().length < 3) {
      setError("Please enter a valid title (at least 3 characters).");
      return;
    }

    if (postType === "Article" && abstract.trim() === "") {
      setError("Please enter an abstract.");
      return;
    }

    if (description.trim().length < 5) {
      setError("Please complete the description (at least 5 characters).");
      return;
    }

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    if (tagList.length > 3) {
      setError("Please enter no more than 3 tags.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          postType,
          title,
          abstract,
          description,
          tags: tagList,
          plan
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create post.");
      }

      alert("Your post has been submitted successfully!");

      setTitle("");
      setAbstract("");
      setDescription("");
      setTags("");
      setPostType("Question");
      setPlan("Free");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  let titlePlaceholder = "Start your question with how, what, why, etc.";
  let descriptionLabel = "Describe your problem";
  let descriptionPlaceholder = "Explain your question here";

  if (postType === "Article") {
    titlePlaceholder = "Enter a descriptive title";
    descriptionLabel = "Article Text";
    descriptionPlaceholder = "Enter your article text here";
  }

  return (
    <div className="create-post">
      <h3 className="heading">New Post</h3>

      <form onSubmit={handleSubmit} noValidate>
        <label>Select Post Type:</label>

        <div className="post-type">
          <label>
            <input
              type="radio"
              name="postType"
              value="Question"
              checked={postType === "Question"}
              onChange={() => {
                setPostType("Question");
                setError("");
              }}
            />
            Question
          </label>

          <label>
            <input
              type="radio"
              name="postType"
              value="Article"
              checked={postType === "Article"}
              onChange={() => {
                setPostType("Article");
                setError("");
              }}
            />
            Article
          </label>
        </div>

        <label>Select Post Plan:</label>

        <div className="post-type">
          <label>
            <input
              type="radio"
              name="plan"
              value="Free"
              checked={plan === "Free"}
              onChange={() => setPlan("Free")}
            />
            Free
          </label>

          <label>
            <input
              type="radio"
              name="plan"
              value="Paid"
              checked={plan === "Paid"}
              onChange={() => setPlan("Paid")}
            />
            Paid
          </label>
        </div>

        <h3 className="heading">What do you want to ask or share?</h3>

        <label>Title</label>
        <input
          type="text"
          placeholder={titlePlaceholder}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError("");
          }}
        />

        {postType === "Article" && (
          <>
            <label>Abstract</label>
            <textarea
              className="abstract"
              placeholder="Enter a 1-paragraph abstract"
              value={abstract}
              onChange={(event) => {
                setAbstract(event.target.value);
                setError("");
              }}
            />
          </>
        )}

        <label>{descriptionLabel}</label>
        <textarea
          className="description"
          placeholder={descriptionPlaceholder}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError("");
          }}
        />

        <label>Tags</label>
        <input
          type="text"
          placeholder="Add up to 3 tags, e.g., Java"
          value={tags}
          onChange={(event) => {
            setTags(event.target.value);
            setError("");
          }}
        />

        {error && <p className="error-message">{error}</p>}

        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;

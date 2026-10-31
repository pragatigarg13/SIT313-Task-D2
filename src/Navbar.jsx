import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    window.addEventListener("userLogin", updateUser);
    window.addEventListener("userPlanUpdated", updateUser);

    return () => {
      window.removeEventListener("userLogin", updateUser);
      window.removeEventListener("userPlanUpdated", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        DEV@Deakin
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="navbar-search"
      />

      <Link to="/browse-posts" className="navbar-post">
        Browse Posts
      </Link>

      <Link to="/create-post" className="navbar-post">
        Post
      </Link>

      <Link to="/pricing" className="navbar-post">
        Pricing
      </Link>

      {token ? (
        <>
          {user && (
            <span className={`navbar-plan ${user.plan?.toLowerCase()}`}>
              {user.plan} Plan
            </span>
          )}

          <button onClick={handleLogout} className="navbar-login">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">
            Login
          </Link>

          <Link to="/signup" className="navbar-login">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

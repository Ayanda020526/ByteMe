// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";
 import "../App.css"; // The two dots tell the compiler to go up one folder level to find App.css


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Holds our custom error message text

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); // Reset error display on new attempt

    const savedUser = JSON.parse(localStorage.getItem("user"));

    // 1. Account exist check
    if (!savedUser) {
      setError("Account not found. Please register an account first!");
      return;
    }

    // 2. Email confirmation check
    if (savedUser.email !== email) {
      setError("Incorrect Email Address. Please try again.");
      return;
    }

    // 3. Password credentials match check
    if (savedUser.password && savedUser.password !== password) {
      setError("Incorrect Password. Please try again.");
      return;
    }

    // Success sequence path
    navigate("/dashboard");
    localStorage.setItem("user", JSON.stringify(savedUser));
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>SMART QUIZ</h1>
        <h2>Learn Smarter. Learn Faster</h2>

        <p>
          Welcome to SMART QUIZ! Learn smarter and faster with our interactive
          platform designed to assist you in your learning journey.
        </p>

        <ul className="features">
          <li>Adaptive Learning</li>
          <li>AI Quiz Generator</li>
          <li>Performance Analytics</li>
        </ul>
      </div>

      <div className="right-panel flex-column-layout">
        {/* Login Card Structural Block */}
        <div className="login-card">
          <h2>Welcome</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="primary-gold-btn">
              Login
            </button>
          </form>

          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>

          <div className="divider">
            <span>──────── OR ────────</span>
          </div>

          <button type="button" className="social-btn google-btn">
            <FcGoogle /> Continue with Google
          </button>

          <button type="button" className="social-btn microsoft-btn">
            <BsMicrosoft /> Continue with Microsoft
          </button>
        </div>

        {/* Inline Condition Error Popup Area positioned right beneath the card view */}
        {error && (
          <div className="login-error-box">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;


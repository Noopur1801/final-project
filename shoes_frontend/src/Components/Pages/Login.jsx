import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const showAlert = (type, message) => {
  alert(`${type.toUpperCase()}: ${message}`);
};

const login = async (email, password, navigate) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/signup/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("jwt", data.token);

      localStorage.setItem("reloadPage", "true");

      window.setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showAlert("error", data.message);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "An error occurred while logging in.");
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password, navigate);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

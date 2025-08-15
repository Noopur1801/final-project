import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const showAlert = (type, message) => {
  alert(`${type.toUpperCase()}: ${message}`);
};

const signup = async (
  name,
  email,
  address,
  password,
  profilePicture,
  navigate
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("address", address);
  formData.append("password", password);
  formData.append("profilePicture", profilePicture);

  try {
    const res = await fetch("http://127.0.0.1:5000/api/signup/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("reloadPage", "true");
      localStorage.setItem("jwt", data.token);

      window.setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      showAlert("error", data.message);
    }
  } catch (err) {
    console.error(err);
    showAlert("error", "An error occurred while creating the account.");
  }
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(name, email, address, password, profilePicture, navigate);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureChange}
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

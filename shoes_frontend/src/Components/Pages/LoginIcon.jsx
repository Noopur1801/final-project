import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginIcon.css";
import Carticon from "./Carticon";

const LoginIcon = () => {
  const [user, setUser] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const checkUserLoggedIn = async () => {
    try {
      const cookie = localStorage.getItem("jwt");

      const response = await fetch(
        "http://127.0.0.1:5000/api/signup/isUserLoggedIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            JWTCookie: cookie,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === "success") {
          setUser(data.loggedInUser);
        } else {
          setUser(null);
        }
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleIconClick = (e) => {
    if (e.target.closest(".cart-icon-container")) {
      setIsActive(false);
    }
    if (e.target.classList.contains("close-p")) {
      setIsActive(false);
    } else if (user && !isActive) {
      setIsActive((prevState) => !prevState);
    } else if (!user) {
      navigate("/login");
    }
  };

  const handleOrdersClick = () => {
    setIsActive(false);
    navigate("/order-info");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("jwt");
      setUser(null);
      navigate("/");
    }
  };

  const capitalizeName = (name) => {
    return name
      .split(" ")
      .map((nm) => nm.charAt(0).toUpperCase() + nm.slice(1))
      .join(" ");
  };

  return (
    <div
      className={`login-icon ${isActive ? "active" : ""}`}
      onClick={handleIconClick}>
      {user ? (
        <>
          <img
            src={`http://127.0.0.1:5000/assets/profile_pictures/${user.profilePicture}`}
            alt={user.name}
            className="profilePicture"
          />
          <div className="profileDetails">
            <span className="close-p">X</span>
            <img
              src={`http://127.0.0.1:5000/assets/profile_pictures/${user.profilePicture}`}
              alt={user.name}
              className="profilePicture"
            />
            <p className="profileName">
              <span>{capitalizeName(user.name)}</span>
            </p>
            <p className="profileEmail">
              <span>{user.email.toLowerCase()}</span>
            </p>
            <p className="cart-c" onClick={handleIconClick}>
              <Carticon />
            </p>
            <p className="cart-c" onClick={handleOrdersClick}>
              My Orders <i className="fa-solid fa-bag-shopping"></i>
            </p>
            {user.role === "admin" && (
              <p
                onClick={() => {
                  setIsActive(false);
                  window.open(
                    `http://localhost:5000/api/admin-panel/dashboard/${encodeURIComponent(
                      localStorage.getItem("jwt")
                    )}`,
                    "_blank"
                  );
                }}
                style={{ cursor: "pointer" }}>
                Admin Panel
              </p>
            )}
            <p onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </div>
        </>
      ) : (
        <img src="./login.png" alt="Login" className="loginImage" />
      )}
    </div>
  );
};

export default LoginIcon;

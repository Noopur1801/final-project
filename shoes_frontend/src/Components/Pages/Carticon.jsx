// CartIcon.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Carticon.css";

const Carticon = () => {
  const navigate = useNavigate();

  const handleCartClick = (e) => {
    // e.stopPropagation();
    navigate("/cart");
  };

  return (
    <div className="cart-icon-container" onClick={handleCartClick}>
      <span>Shopping Cart </span>
      <FontAwesomeIcon icon={faShoppingCart} size="1x" />
    </div>
  );
};

export default Carticon;

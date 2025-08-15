// StarRating.js
import React from "react";
import "./StarRating.css"; // Optional: for custom styling

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (index) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => (
        <i
          key={index}
          className={`fas fa-star ${index < rating ? "checked" : ""}`}
          onClick={() => handleClick(index)}></i>
      ))}
    </div>
  );
};

export default StarRating;

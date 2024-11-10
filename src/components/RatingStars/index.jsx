import React from "react";

const RatingStars = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.floor(rating / 2);

  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starClass = index < filledStars ? "filled-star" : "empty-star";
    return (
      <span key={index} className={starClass}>
        <i className="fa-solid fa-star"></i>
      </span>
    );
  });

  return <div className="rating-stars mb-2">{stars}</div>;
};

export default RatingStars;

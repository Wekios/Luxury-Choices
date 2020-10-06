import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, starColor = "#f8e825" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star key={i} value={value} max={i} half={i - 0.5} color={starColor} />
    );
  }

  return (
    <div className="rating">
      <span>{stars}</span> <span>{text && text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;

const Star = ({ value, max, half, color }) => {
  return (
    <i
      style={{ color }}
      className={
        value >= max
          ? "fas fa-star"
          : value >= half
          ? "fas fa-star-half-alt"
          : "far fa-star"
      }
    ></i>
  );
};

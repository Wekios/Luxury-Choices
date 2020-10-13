import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, starColor = "#f8e825" }) => {
  const stars = [1, 2, 3, 4, 5].map((index) => (
    <i
      key={index}
      style={{ color: starColor }}
      className={
        value >= index
          ? "fas fa-star"
          : value >= index - 0.5
          ? "fas fa-star-half-alt"
          : "far fa-star"
      }
    ></i>
  ));

  return (
    <div className="rating">
      <span>{stars}</span> <span>{text}</span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;

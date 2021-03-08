import React from "react";
import PropTypes from "prop-types";

export interface RatingProps {
  value: number;
  text: string;
  starColor?: string;
}

export function Rating({ value, text, starColor = "#f8e825" }: RatingProps) {
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
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

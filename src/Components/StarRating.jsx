import React, { useState } from 'react';

const StarRating = ({ maxRating = 5, initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (starValue) => {
    setRating(starValue);
    if (onRatingChange) onRatingChange(starValue);
  };

  const handleMouseEnter = (starValue) => {
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        // When hovering, use hoverRating; otherwise, use the current rating.
        const isFilled = hoverRating ? starValue <= hoverRating : starValue <= rating;

        return (
          <svg
            key={index}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
              isFilled ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.28 3.93a1 1 0 00.95.69h4.14c.969 0 1.371 1.24.588 1.81l-3.345 2.43a1 1 0 00-.364 1.118l1.28 3.93c.3.921-.755 1.688-1.54 1.118l-3.345-2.43a1 1 0 00-1.175 0l-3.345 2.43c-.785.57-1.84-.197-1.54-1.118l1.28-3.93a1 1 0 00-.364-1.118L2.068 9.357c-.783-.57-.38-1.81.588-1.81h4.14a1 1 0 00.95-.69l1.28-3.93z"></path>
          </svg>
        );
      })}
    </div>
  );
};

export default StarRating;

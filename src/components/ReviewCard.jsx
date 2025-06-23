import React from 'react';
import { renderStars } from '../utils/starUtils';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start space-x-4">
        <img
          src={review.user.image}
          alt={review.user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{review.user.name}</h3>
            <div className="flex items-center">
              {renderStars(review.rating)}
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{review.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
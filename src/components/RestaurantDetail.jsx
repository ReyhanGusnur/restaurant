import React from 'react';
import { renderStars } from '../utils/starUtils';
import ReviewCard from './ReviewCard';

const RestaurantDetail = ({ restaurant, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="text-white hover:text-white border-1 bg-blue-500 hover:bg-blue-800 rounded-md p-1.5 font-medium mb-2 transition-colors"
          >
            Back to Restaurants
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
              <div className="flex items-center mt-2">
                <div className="flex items-center mr-4">
                  {renderStars(restaurant.rating)}
                  <span className="ml-2 text-gray-600">{restaurant.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">
                  {restaurant.categories[0]?.name}
                </span>
                <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                  restaurant.is_open ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {restaurant.is_open ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Image */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <img
          src={restaurant.photos[0]?.url}
          alt={restaurant.name}
          className="w-full h-64 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Restaurant Details */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 mb-4">{restaurant.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">Specialty:</span>
              <p className="text-gray-600">{restaurant.speciality}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900">Category:</span>
              <p className="text-gray-600">{restaurant.category}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900">Price Range:</span>
              <p className="text-gray-600">{restaurant.price_range}</p>
            </div>
          </div>
          {restaurant.tags && restaurant.tags.length > 0 && (
            <div className="mt-4">
              <span className="font-medium text-gray-900">Features:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {restaurant.tags.slice(0, 6).map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        <div className="space-y-6">
          {restaurant.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
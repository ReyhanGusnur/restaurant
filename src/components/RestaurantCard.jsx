import { DollarSign } from 'lucide-react';
import { renderStars } from '../utils/starUtils';

const RestaurantCard = ({ restaurant, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={restaurant.photos[0]?.url}
        alt={restaurant.name}
        className="w-full h-48 object-cover"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop';
        }}
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {restaurant.categories[0]?.name}
          </span>
          <span className={`text-xs font-medium ${restaurant.is_open ? 'text-green-600' : 'text-red-600'}`}>
            {restaurant.is_open ? 'Open' : 'Closed'}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{restaurant.name}</h3>
        
        <div className="flex items-center mb-2">
          {renderStars(restaurant.rating)}
          <span className="ml-2 text-sm text-gray-600">{restaurant.rating.toFixed(1)}</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm">{restaurant.price_range}</span>
          </div>
          <span className="text-sm text-gray-600">{restaurant.category}</span>
        </div>
        
        <button
          onClick={onSelect}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
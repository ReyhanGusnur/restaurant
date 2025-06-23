import React from 'react';
import { Clock, Filter, RotateCcw } from 'lucide-react';

const categories = ["Categories", "American", "British", "Chinese", "French", "Indian", "Italian", "Japanese", "Mexican", "Thai"];
const priceRanges = ["Price", "$", "$$", "$$$", "$$$$"];

const Header = ({ filters, setFilters, showFilters, setShowFilters }) => {
  const resetFilters = () => {
    setFilters({
      openNow: false,
      price: "Price",
      category: "Categories"
    });
  };
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Restaurant</h1>
        <p className="text-gray-600 mb-4 max-w-3xl ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero incidunt repellat repellendus porro ipsa reiciendis distinctio dolore eos in delectus.</p>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'}  space-y-4 md:space-y-0 md:flex md:items-center md:space-x-6`}>
          {/* Open Now Filter */}
          <label className="flex items-center">
            <p className='mr-3 text-sm font-medium text-gray-700'>Filter by:</p>
            <input
              type="checkbox"
              checked={filters.openNow}
              onChange={(e) => setFilters({...filters, openNow: e.target.checked})}
              className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Open Now</span>
          </label>

          {/* Price Filter */}
          <div>
            <select
              value={filters.price}
              onChange={(e) => setFilters({...filters, price: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            > Price
              {priceRanges.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          {/* Reset Filter Button */}
          <div>
            <button
              onClick={resetFilters}
              className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
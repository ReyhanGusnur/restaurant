import React, { useState, useEffect } from 'react';
import { Loader, Plus } from 'lucide-react';
import RestaurantCard from './components/RestaurantCard';
import RestaurantDetail from './components/RestaurantDetail';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import { convertMealToRestaurant } from './utils/dataUtils';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    openNow: false,
    price: "All",
    category: "All"
  });
  const [showFilters, setShowFilters] = useState(false);

  const ITEMS_PER_PAGE = 6;

  // Fetch meals from different categories to get variety
  const fetchMealsFromCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    if (!response.ok) throw new Error(`Failed to fetch ${category}`);
    const data = await response.json();
    return data.meals || [];
  };

  const fetchMealDetails = async (mealId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    if (!response.ok) throw new Error(`Failed to fetch meal details for ${mealId}`);
    const data = await response.json();
    return data.meals[0];
  };

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      try {
        setLoading(true);
        // Fetch meals from different categories for variety
        const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'];
        
        let allMeals = [];
        
        // Get 3-4 meals from each category
        for (const category of categories.slice(0, 8)) {
          try {
            const meals = await fetchMealsFromCategory(category);
            allMeals = allMeals.concat(meals.slice(0, 4));
          } catch (err) {
            console.warn(`Failed to fetch ${category}:`, err);
          }
        }

        // Shuffle and limit to 48 meals for better variety
        const shuffledMeals = allMeals.sort(() => Math.random() - 0.5).slice(0, 48);
        
        // Fetch detailed information for each meal
        const detailedMeals = await Promise.all(
          shuffledMeals.map(async (meal) => {
            try {
              return await fetchMealDetails(meal.idMeal);
            } catch (err) {
              console.warn(`Failed to fetch details for meal ${meal.idMeal}:`, err);
              return meal; // Return basic meal data if detailed fetch fails
            }
          })
        );

        const restaurantData = detailedMeals
          .filter(meal => meal) // Remove any null results
          .map(convertMealToRestaurant);
        
        setAllRestaurants(restaurantData);
        setDisplayedRestaurants(restaurantData.slice(0, ITEMS_PER_PAGE));
        setFilteredRestaurants(restaurantData.slice(0, ITEMS_PER_PAGE));
        setHasMore(restaurantData.length > ITEMS_PER_PAGE);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRestaurants();
  }, []);

  // Apply filters to displayed restaurants
  useEffect(() => {
    let filtered = displayedRestaurants;

    if (filters.openNow) {
      filtered = filtered.filter(restaurant => restaurant.is_open);
    }

    if (filters.price !== "All") {
      filtered = filtered.filter(restaurant => restaurant.price_range === filters.price);
    }

    if (filters.category !== "All") {
      filtered = filtered.filter(restaurant => 
        restaurant.categories.some(cat => cat.name === filters.category)
      );
    }

    setFilteredRestaurants(filtered);
  }, [filters, displayedRestaurants]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const loadMore = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      
      const newDisplayed = allRestaurants.slice(startIndex, endIndex);
      setDisplayedRestaurants(newDisplayed);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allRestaurants.length);
      setLoadingMore(false);
    }, 500); // Small delay to show loading state
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading restaurants...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching data from TheMealDB</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading restaurants: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedRestaurant) {
    return (
      <RestaurantDetail 
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {/* Restaurant Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={() => setSelectedRestaurant(restaurant)}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loadingMore ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Load More Restaurants
                </>
              )}
            </button>
          </div>
        )}

        {filteredRestaurants.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
          </div>
        )}

        {/* Results Info */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Showing {filteredRestaurants.length} of {allRestaurants.length} restaurants
        </div>
      </div>
    </div>
  );
}

export default App;
// Function to convert meal data to restaurant data
export const convertMealToRestaurant = (meal) => {
  const cuisineMap = {
    'American': 'American',
    'British': 'British',
    'Chinese': 'Chinese',
    'French': 'French',
    'Indian': 'Indian',
    'Italian': 'Italian',
    'Japanese': 'Japanese',
    'Mexican': 'Mexican',
    'Thai': 'Thai',
    'Spanish': 'Mediterranean',
    'Greek': 'Mediterranean',
    'Turkish': 'Mediterranean'
  };

  const priceMap = {
    'American': '$$$',
    'British': '$$',
    'Chinese': '$$',
    'French': '$$$$',
    'Indian': '$$',
    'Italian': '$$$',
    'Japanese': '$$$',
    'Mexican': '$$',
    'Thai': '$$',
    'Mediterranean': '$$$'
  };

  const cuisine = cuisineMap[meal.strArea] || meal.strArea || 'International';
  const restaurantName = `${meal.strMeal} Restaurant`;

  // Generate random but consistent ratings based on meal ID
  const baseRating = 3.5 + ((parseInt(meal.idMeal) % 15) / 10);
  const rating = Math.min(5, baseRating);

  return {
    id: meal.idMeal,
    name: restaurantName,
    categories: [{ name: cuisine }, { name: 'Fine Dining' }],
    rating: rating,
    price_range: priceMap[cuisine] || '$$',
    photos: [{ url: meal.strMealThumb }],
    is_open: (parseInt(meal.idMeal) % 3) !== 0, // 66% chance of being open
    description: `Specializing in authentic ${cuisine.toLowerCase()} cuisine. Our signature dish "${meal.strMeal}" is prepared with traditional methods and fresh ingredients.`,
    speciality: meal.strMeal,
    category: meal.strCategory,
    tags: meal.strTags ? meal.strTags.split(',').map(tag => tag.trim()) : [],
    instructions: meal.strInstructions,
    reviews: [
      {
        id: 1,
        user: { 
          name: "Food Enthusiast", 
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
        },
        rating: Math.min(5, Math.max(3, Math.round(rating))),
        text: `Amazing ${cuisine.toLowerCase()} restaurant! Their ${meal.strMeal} is absolutely delicious and authentic. Great atmosphere and excellent service.`
      },
      {
        id: 2,
        user: { 
          name: "Culinary Critic", 
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" 
        },
        rating: Math.min(5, Math.max(3, Math.round(rating) - 1)),
        text: `Outstanding ${meal.strCategory.toLowerCase()} preparation. The quality of ingredients and presentation is top-notch. Highly recommended for ${cuisine.toLowerCase()} food lovers.`
      }
    ]
  };
};
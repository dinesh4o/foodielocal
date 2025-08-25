import React from 'react';
import RestaurantCard from './RestaurantCard';

const RecommendationsSection = ({ className = '' }) => {
  const recommendedRestaurants = [
    {
      id: 6,
      name: "Café Luna",
      cuisine: "Coffee • Pastries",
      rating: 4.4,
      priceRange: "$",
      distance: "0.2 mi",
      image: "https://images.pixabay.com/photo/2016/11/29/12/54/cafe-1869656_1280.jpg?w=400&h=300&fit=crop",
      isFavorited: false,
      isNew: false
    },
    {
      id: 7,
      name: "Dragon Palace",
      cuisine: "Chinese • Traditional",
      rating: 4.6,
      priceRange: "$$",
      distance: "0.8 mi",
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
      isFavorited: true,
      isNew: false
    },
    {
      id: 8,
      name: "Mediterranean Delight",
      cuisine: "Mediterranean • Healthy",
      rating: 4.7,
      priceRange: "$$",
      distance: "1.0 mi",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop",
      isFavorited: false,
      isNew: true
    },
    {
      id: 9,
      name: "Taco Libre",
      cuisine: "Mexican • Street Food",
      rating: 4.5,
      priceRange: "$",
      distance: "0.6 mi",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      isFavorited: false,
      isNew: false
    }
  ];

  return (
    <section className={`mb-8 ${className}`}>
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
          Recommended for You ✨
        </h2>
        <p className="text-sm text-muted-foreground">
          Based on your preferences and recent activity
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recommendedRestaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant?.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendationsSection;
import React, { useRef } from 'react';
import RestaurantCard from './RestaurantCard';
import Icon from '../../../components/AppIcon';

const TrendingSection = ({ className = '' }) => {
  const scrollRef = useRef(null);

  const trendingRestaurants = [
    {
      id: 1,
      name: "Bella Vista Italian",
      cuisine: "Italian • Fine Dining",
      rating: 4.8,
      priceRange: "$$$",
      distance: "0.3 mi",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      isFavorited: false,
      isNew: true
    },
    {
      id: 2,
      name: "Sakura Sushi Bar",
      cuisine: "Japanese • Sushi",
      rating: 4.9,
      priceRange: "$$$$",
      distance: "0.5 mi",
      image: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?w=400&h=300&fit=crop",
      isFavorited: true,
      isNew: false
    },
    {
      id: 3,
      name: "The Local Bistro",
      cuisine: "American • Casual",
      rating: 4.6,
      priceRange: "$$",
      distance: "0.7 mi",
      image: "https://images.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg?w=400&h=300&fit=crop",
      isFavorited: false,
      isNew: false
    },
    {
      id: 4,
      name: "Spice Garden",
      cuisine: "Indian • Authentic",
      rating: 4.7,
      priceRange: "$$",
      distance: "1.2 mi",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      isFavorited: false,
      isNew: true
    },
    {
      id: 5,
      name: "Ocean Breeze Seafood",
      cuisine: "Seafood • Fresh",
      rating: 4.5,
      priceRange: "$$$",
      distance: "1.5 mi",
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=400&h=300&fit=crop",
      isFavorited: true,
      isNew: false
    }
  ];

  const scroll = (direction) => {
    if (scrollRef?.current) {
      const scrollAmount = 300;
      scrollRef?.current?.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Trending Now 🔥
          </h2>
          <p className="text-sm text-muted-foreground">
            Popular restaurants in your area
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll('left')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Scroll left"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Scroll right"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trendingRestaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant?.id}
            restaurant={restaurant}
            variant="horizontal"
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
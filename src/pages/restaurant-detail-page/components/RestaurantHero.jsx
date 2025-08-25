import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RestaurantHero = ({ restaurant, onFavoriteToggle, isFavorite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === restaurant?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? restaurant?.images?.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-64 lg:h-80 overflow-hidden bg-muted">
      {/* Image Carousel */}
      <div className="relative w-full h-full">
        <Image
          src={restaurant?.images?.[currentImageIndex]}
          alt={`${restaurant?.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {restaurant?.images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Image Indicators */}
        {restaurant?.images?.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {restaurant?.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={onFavoriteToggle}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon 
            name={isFavorite ? 'Heart' : 'Heart'} 
            size={20} 
            className={isFavorite ? 'fill-current text-red-500' : ''}
          />
        </button>
      </div>
      {/* Restaurant Basic Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
        <h1 className="text-2xl font-heading font-bold mb-2">{restaurant?.name}</h1>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="fill-current text-yellow-400" />
            <span className="font-medium">{restaurant?.rating}</span>
            <span className="opacity-80">({restaurant?.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={16} />
            <span>{restaurant?.priceRange}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={16} />
            <span>{restaurant?.distance}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {restaurant?.cuisineTypes?.map((cuisine, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
            >
              {cuisine}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
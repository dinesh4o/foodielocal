import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RestaurantCard = ({ 
  restaurant, 
  onToggleFavorite,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  const handleCardClick = () => {
    navigate('/restaurant-detail-page', { state: { restaurant } });
  };

  const handleFavoriteClick = (e) => {
    e?.stopPropagation();
    onToggleFavorite(restaurant?.id);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const getPriceIndicator = (priceRange) => {
    return '$'?.repeat(priceRange) + '$'?.repeat(4 - priceRange)?.split('')?.map((_, i) => (
      <span key={i} className="text-muted-foreground">$</span>
    ));
  };

  return (
    <div 
      className={`bg-card rounded-lg shadow-food-card hover:shadow-food-elevated transition-all duration-300 cursor-pointer group overflow-hidden ${className}`}
      onClick={handleCardClick}
    >
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={restaurant?.image}
          alt={restaurant?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onLoad={() => setImageLoading(false)}
        />
        
        {imageLoading && (
          <div className="absolute inset-0 bg-muted animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-smooth"
          aria-label={restaurant?.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={restaurant?.isFavorite ? 'text-error fill-current' : 'text-muted-foreground'} 
          />
        </button>

        {/* Status Badge */}
        {restaurant?.status && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
            restaurant?.status === 'open' ?'bg-success/90 text-success-foreground' 
              : restaurant?.status === 'closing-soon' ?'bg-warning/90 text-warning-foreground' :'bg-error/90 text-error-foreground'
          }`}>
            {restaurant?.status === 'open' ? 'Open' : 
             restaurant?.status === 'closing-soon' ? 'Closing Soon' : 'Closed'}
          </div>
        )}
      </div>
      {/* Restaurant Info */}
      <div className="p-4">
        {/* Name and Cuisine */}
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-foreground text-lg mb-1 line-clamp-1">
            {restaurant?.name}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            {restaurant?.cuisines?.slice(0, 2)?.map((cuisine, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full"
              >
                {cuisine}
              </span>
            ))}
            {restaurant?.cuisines?.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{restaurant?.cuisines?.length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center space-x-1">
            {renderStars(restaurant?.rating)}
          </div>
          <span className="text-sm font-medium text-foreground">
            {restaurant?.rating?.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({restaurant?.reviewCount} reviews)
          </span>
        </div>

        {/* Price and Distance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {getPriceIndicator(restaurant?.priceRange)}
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span>{restaurant?.distance}</span>
          </div>
        </div>

        {/* Delivery Info */}
        {restaurant?.deliveryTime && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{restaurant?.deliveryTime}</span>
            </div>
            {restaurant?.deliveryFee && (
              <div className="text-sm text-muted-foreground">
                {restaurant?.deliveryFee === 0 ? 'Free delivery' : `$${restaurant?.deliveryFee} delivery`}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RestaurantCard = ({ restaurant, variant = 'default', className = '' }) => {
  const [isFavorited, setIsFavorited] = useState(restaurant?.isFavorited || false);
  const navigate = useNavigate();

  const handleFavoriteToggle = (e) => {
    e?.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleCardClick = () => {
    navigate(`/restaurant-detail-page?id=${restaurant?.id}`);
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: restaurant?.name,
        text: `Check out ${restaurant?.name} - ${restaurant?.cuisine}`,
        url: window.location?.origin + `/restaurant-detail-page?id=${restaurant?.id}`
      });
    }
  };

  if (variant === 'horizontal') {
    return (
      <div 
        className={`flex-shrink-0 w-72 bg-card rounded-lg shadow-food-card hover:shadow-food-elevated transition-smooth cursor-pointer ${className}`}
        onClick={handleCardClick}
      >
        <div className="relative">
          <Image
            src={restaurant?.image}
            alt={restaurant?.name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-smooth"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={isFavorited ? 'text-error fill-current' : 'text-muted-foreground'} 
            />
          </button>
          {restaurant?.isNew && (
            <div className="absolute top-3 left-3 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
              New
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-heading font-semibold text-foreground text-sm leading-tight">
              {restaurant?.name}
            </h3>
            <button
              onClick={handleShare}
              className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Share restaurant"
            >
              <Icon name="Share2" size={14} />
            </button>
          </div>
          
          <p className="text-xs text-muted-foreground mb-2">{restaurant?.cuisine}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={12} className="text-warning fill-current" />
                <span className="text-xs font-medium text-foreground">{restaurant?.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{restaurant?.priceRange}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="MapPin" size={10} />
              <span>{restaurant?.distance}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-card rounded-lg shadow-food-card hover:shadow-food-elevated transition-smooth cursor-pointer ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative">
        <Image
          src={restaurant?.image}
          alt={restaurant?.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-smooth"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon 
            name="Heart" 
            size={16} 
            className={isFavorited ? 'text-error fill-current' : 'text-muted-foreground'} 
          />
        </button>
        {restaurant?.isNew && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
            New
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-semibold text-foreground leading-tight">
            {restaurant?.name}
          </h3>
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Share restaurant"
          >
            <Icon name="Share2" size={14} />
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{restaurant?.cuisine}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium text-foreground">{restaurant?.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{restaurant?.priceRange}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span>{restaurant?.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
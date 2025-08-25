import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const FavoriteCard = ({ restaurant, onRemove, onMoveToList }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const handleViewRestaurant = () => {
    navigate('/restaurant-detail-page', { state: { restaurant } });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={`${
          index < Math.floor(rating)
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-food-card transition-smooth">
      {/* Restaurant Image */}
      <div className="relative h-32 overflow-hidden">
        <Image
          src={restaurant?.image}
          alt={restaurant?.name}
          className="w-full h-full object-cover hover-scale"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => setShowActions(!showActions)}
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/70 transition-smooth"
          >
            <Icon name="MoreHorizontal" size={16} className="text-white" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-food-elevated z-10 min-w-40">
              <button
                onClick={() => {
                  handleViewRestaurant();
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-smooth"
              >
                <Icon name="ExternalLink" size={14} />
                View Details
              </button>
              <button
                onClick={() => {
                  onMoveToList(restaurant);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-smooth"
              >
                <Icon name="FolderPlus" size={14} />
                Move to List
              </button>
              <button
                onClick={() => {
                  onRemove(restaurant?.id);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
              >
                <Icon name="Heart" size={14} className="fill-current" />
                Remove
              </button>
            </div>
          )}
        </div>
        
        {restaurant?.isOpen && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-success/90 backdrop-blur-sm rounded text-xs text-white font-medium">
            Open Now
          </div>
        )}
      </div>
      {/* Restaurant Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-medium text-foreground truncate flex-1">
            {restaurant?.name}
          </h3>
          <button
            onClick={() => onRemove(restaurant?.id)}
            className="ml-2 flex items-center justify-center w-6 h-6 text-error hover:bg-error/10 rounded transition-smooth"
          >
            <Icon name="Heart" size={14} className="fill-current" />
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2 truncate">
          {restaurant?.cuisine} • {restaurant?.location}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {renderStars(restaurant?.rating)}
            <span className="text-sm font-medium text-foreground ml-1">
              {restaurant?.rating}
            </span>
            <span className="text-sm text-muted-foreground">
              ({restaurant?.reviewCount})
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {restaurant?.deliveryTime}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {restaurant?.distance} away
            </span>
          </div>
          
          <span className="text-sm font-medium text-foreground">
            ${restaurant?.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
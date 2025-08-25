import React from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ 
  restaurants = [], 
  onRestaurantSelect,
  className = '' 
}) => {
  // Mock coordinates for demonstration
  const mapCenter = { lat: 40.7128, lng: -74.0060 }; // New York City

  return (
    <div className={`relative w-full h-full bg-muted rounded-lg overflow-hidden ${className}`}>
      {/* Google Maps Iframe */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Restaurant Locations"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=14&output=embed`}
        className="w-full h-full"
      />
      {/* Map Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          className="w-10 h-10 bg-card shadow-food-card rounded-lg flex items-center justify-center text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="Zoom in"
        >
          <Icon name="Plus" size={18} />
        </button>
        <button
          className="w-10 h-10 bg-card shadow-food-card rounded-lg flex items-center justify-center text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="Zoom out"
        >
          <Icon name="Minus" size={18} />
        </button>
        <button
          className="w-10 h-10 bg-card shadow-food-card rounded-lg flex items-center justify-center text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="My location"
        >
          <Icon name="Navigation" size={18} />
        </button>
      </div>
      {/* Restaurant Markers Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm rounded-lg shadow-food-elevated p-4 max-h-32 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">
            {restaurants?.length} restaurants found
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Tap on map markers to view restaurant details
        </div>
      </div>
      {/* Loading State */}
      <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-card rounded-lg p-4 shadow-food-elevated">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-foreground">Loading map...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
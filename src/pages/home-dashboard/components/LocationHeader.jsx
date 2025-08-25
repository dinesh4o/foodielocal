import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationHeader = ({ className = '' }) => {
  const [location, setLocation] = useState({
    city: 'San Francisco',
    weather: '72°F',
    isLoading: false
  });

  const mockLocations = [
    { city: 'San Francisco', weather: '72°F', icon: 'Sun' },
    { city: 'New York', weather: '68°F', icon: 'Cloud' },
    { city: 'Los Angeles', weather: '75°F', icon: 'Sun' },
    { city: 'Chicago', weather: '65°F', icon: 'CloudRain' }
  ];

  useEffect(() => {
    // Simulate geolocation
    const randomLocation = mockLocations?.[Math.floor(Math.random() * mockLocations?.length)];
    setLocation(randomLocation);
  }, []);

  const handleLocationRefresh = () => {
    setLocation(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      const randomLocation = mockLocations?.[Math.floor(Math.random() * mockLocations?.length)];
      setLocation({ ...randomLocation, isLoading: false });
    }, 1000);
  };

  return (
    <div className={`bg-gradient-to-r from-primary/10 to-accent/20 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/80 rounded-full">
            <Icon 
              name={location?.icon || 'MapPin'} 
              size={20} 
              className="text-primary" 
            />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Good morning! 👋
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{location?.city}</span>
              <span>•</span>
              <span>{location?.weather}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleLocationRefresh}
          disabled={location?.isLoading}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white transition-smooth"
          aria-label="Refresh location"
        >
          <Icon 
            name="RefreshCw" 
            size={16} 
            className={`text-primary ${location?.isLoading ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>
    </div>
  );
};

export default LocationHeader;
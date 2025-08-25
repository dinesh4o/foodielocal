import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RestaurantInfo = ({ restaurant }) => {
  const [showFullHours, setShowFullHours] = useState(false);

  const getCurrentDayStatus = () => {
    const today = new Date()?.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames?.[today];
    const todayHours = restaurant?.hours?.find(h => h?.day === currentDay);
    
    if (!todayHours || !todayHours?.isOpen) {
      return { status: 'Closed', color: 'text-error' };
    }

    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    const [openHour, openMin] = todayHours?.open?.split(':')?.map(Number);
    const [closeHour, closeMin] = todayHours?.close?.split(':')?.map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    if (currentTime >= openTime && currentTime <= closeTime) {
      return { status: `Open until ${todayHours?.close}`, color: 'text-success' };
    } else {
      return { status: `Opens at ${todayHours?.open}`, color: 'text-warning' };
    }
  };

  const dayStatus = getCurrentDayStatus();

  return (
    <div className="bg-card rounded-lg shadow-food-card p-6 space-y-6">
      <h2 className="text-lg font-heading font-semibold text-foreground">Restaurant Information</h2>
      {/* Hours */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={20} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Hours</span>
          </div>
          <span className={`text-sm font-medium ${dayStatus?.color}`}>
            {dayStatus?.status}
          </span>
        </div>
        
        {showFullHours ? (
          <div className="space-y-2 pl-7">
            {restaurant?.hours?.map((hour, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{hour?.day}</span>
                <span className="text-foreground">
                  {hour?.isOpen ? `${hour?.open} - ${hour?.close}` : 'Closed'}
                </span>
              </div>
            ))}
            <button
              onClick={() => setShowFullHours(false)}
              className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
            >
              Show less
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowFullHours(true)}
            className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth pl-7"
          >
            View all hours
          </button>
        )}
      </div>
      {/* Contact */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={20} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Contact</span>
        </div>
        <div className="pl-7 space-y-2">
          <a
            href={`tel:${restaurant?.phone}`}
            className="flex items-center text-primary hover:text-primary/80 transition-smooth"
          >
            <span className="text-sm">{restaurant?.phone}</span>
          </a>
          {restaurant?.website && (
            <a
              href={restaurant?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:text-primary/80 transition-smooth"
            >
              <span className="text-sm">Visit website</span>
              <Icon name="ExternalLink" size={14} className="ml-1" />
            </a>
          )}
        </div>
      </div>
      {/* Address & Map */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-muted-foreground" />
          <span className="font-medium text-foreground">Location</span>
        </div>
        <div className="pl-7 space-y-3">
          <p className="text-sm text-muted-foreground">{restaurant?.address}</p>
          <div className="h-32 rounded-lg overflow-hidden bg-muted">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={restaurant?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${restaurant?.coordinates?.lat},${restaurant?.coordinates?.lng}&z=15&output=embed`}
              className="border-0"
            />
          </div>
          <button className="flex items-center text-primary hover:text-primary/80 transition-smooth">
            <Icon name="Navigation" size={16} className="mr-1" />
            <span className="text-sm font-medium">Get directions</span>
          </button>
        </div>
      </div>
      {/* Features */}
      {restaurant?.features && restaurant?.features?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-muted-foreground" />
            <span className="font-medium text-foreground">Features</span>
          </div>
          <div className="pl-7 flex flex-wrap gap-2">
            {restaurant?.features?.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantInfo;
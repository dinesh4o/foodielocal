import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-results', 
  searchQuery = '',
  onClearFilters,
  onTryCategories,
  className = '' 
}) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: 'Search',
          title: 'No restaurants found',
          description: `We couldn't find any restaurants matching "${searchQuery}". Try adjusting your search or filters.`,
          actions: [
            { label: 'Clear Filters', onClick: onClearFilters, variant: 'outline' },
            { label: 'Browse Categories', onClick: onTryCategories, variant: 'default' }
          ]
        };
      case 'no-search':
        return {
          icon: 'ChefHat',
          title: 'Discover amazing restaurants',
          description: 'Search for your favorite cuisines, restaurants, or dishes to get started.',
          actions: [
            { label: 'Browse Popular', onClick: onTryCategories, variant: 'default' }
          ]
        };
      case 'location-error':
        return {
          icon: 'MapPin',
          title: 'Location access needed',
          description: 'Enable location access to find restaurants near you, or search by city name.',
          actions: [
            { label: 'Enable Location', onClick: () => {}, variant: 'default' },
            { label: 'Search by City', onClick: () => {}, variant: 'outline' }
          ]
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Something went wrong',
          description: 'We encountered an error while loading restaurants. Please try again.',
          actions: [
            { label: 'Try Again', onClick: () => window.location?.reload(), variant: 'default' }
          ]
        };
    }
  };

  const content = getEmptyStateContent();

  const popularCategories = [
    { name: 'Italian', icon: 'Pizza' },
    { name: 'Chinese', icon: 'Bowl' },
    { name: 'Mexican', icon: 'Pepper' },
    { name: 'Indian', icon: 'Flame' },
    { name: 'Japanese', icon: 'Fish' },
    { name: 'American', icon: 'Burger' }
  ];

  return (
    <div className={`flex flex-col items-center justify-center text-center py-16 px-4 ${className}`}>
      {/* Icon */}
      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
        <Icon name={content?.icon} size={32} className="text-muted-foreground" />
      </div>
      {/* Title */}
      <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
        {content?.title}
      </h2>
      {/* Description */}
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {content?.description}
      </p>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
        {content?.actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            onClick={action?.onClick}
            className="w-full sm:w-auto"
          >
            {action?.label}
          </Button>
        ))}
      </div>
      {/* Popular Categories */}
      {type === 'no-search' && (
        <div className="w-full max-w-md">
          <h3 className="text-sm font-medium text-foreground mb-4">Popular Categories</h3>
          <div className="grid grid-cols-3 gap-3">
            {popularCategories?.map((category, index) => (
              <button
                key={index}
                onClick={() => onTryCategories && onTryCategories(category?.name)}
                className="flex flex-col items-center space-y-2 p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name={category?.icon} size={16} className="text-accent-foreground" />
                </div>
                <span className="text-xs font-medium text-foreground">{category?.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
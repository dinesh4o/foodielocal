import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SortDropdown = ({ 
  isOpen, 
  onClose, 
  currentSort, 
  onSortChange,
  className = '' 
}) => {
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'distance', label: 'Nearest First', icon: 'MapPin' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popular', label: 'Most Popular', icon: 'Heart' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={`absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-food-elevated z-50 py-2 ${className}`}
    >
      <div className="px-3 py-2 border-b border-border">
        <h3 className="text-sm font-heading font-medium text-foreground">Sort by</h3>
      </div>
      <div className="py-1">
        {sortOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => handleSortSelect(option?.value)}
            className={`w-full px-3 py-2 text-left hover:bg-muted/50 transition-smooth flex items-center space-x-3 ${
              currentSort === option?.value ? 'bg-accent/20 text-primary' : 'text-foreground'
            }`}
          >
            <Icon 
              name={option?.icon} 
              size={16} 
              className={currentSort === option?.value ? 'text-primary' : 'text-muted-foreground'}
            />
            <span className="text-sm font-body">{option?.label}</span>
            {currentSort === option?.value && (
              <Icon name="Check" size={16} className="text-primary ml-auto" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortDropdown;
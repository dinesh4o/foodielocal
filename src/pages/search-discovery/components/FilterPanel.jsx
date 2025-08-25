import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  className = '' 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    cuisine: true,
    price: true,
    rating: true,
    distance: true,
    dietary: false,
    hours: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...filters };
    if (!newFilters?.[category]) {
      newFilters[category] = [];
    }

    if (checked) {
      newFilters[category] = [...newFilters?.[category], value];
    } else {
      newFilters[category] = newFilters?.[category]?.filter(item => item !== value);
    }

    onFiltersChange(newFilters);
  };

  const handleRangeChange = (category, value) => {
    onFiltersChange({
      ...filters,
      [category]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(filters)?.forEach(filterValue => {
      if (Array.isArray(filterValue)) {
        count += filterValue?.length;
      } else if (filterValue) {
        count += 1;
      }
    });
    return count;
  };

  const cuisineOptions = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'Thai', 'American', 'Mediterranean', 'French', 'Korean'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Keto', 'Low-Carb', 'Organic'
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className={`
        fixed lg:static inset-x-0 bottom-0 lg:inset-auto
        bg-card lg:bg-transparent
        rounded-t-lg lg:rounded-none
        shadow-food-elevated lg:shadow-none
        z-50 lg:z-auto
        max-h-[80vh] lg:max-h-none
        overflow-hidden lg:overflow-visible
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-0 lg:mb-4 border-b lg:border-b-0 border-border">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Filters
            </h2>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
            <button
              onClick={onClose}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label="Close filters"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)] lg:max-h-none p-4 lg:p-0 space-y-6">
          {/* Cuisine Type */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('cuisine')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-medium text-foreground">Cuisine Type</h3>
              <Icon 
                name={expandedSections?.cuisine ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            {expandedSections?.cuisine && (
              <div className="space-y-2 pl-2">
                {cuisineOptions?.map((cuisine) => (
                  <Checkbox
                    key={cuisine}
                    label={cuisine}
                    checked={filters?.cuisine?.includes(cuisine) || false}
                    onChange={(e) => handleFilterChange('cuisine', cuisine, e?.target?.checked)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-medium text-foreground">Price Range</h3>
              <Icon 
                name={expandedSections?.price ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            {expandedSections?.price && (
              <div className="space-y-2 pl-2">
                {[1, 2, 3, 4]?.map((price) => (
                  <Checkbox
                    key={price}
                    label={`${'$'?.repeat(price)} ${price === 1 ? '(Budget)' : price === 2 ? '(Moderate)' : price === 3 ? '(Expensive)' : '(Fine Dining)'}`}
                    checked={filters?.price?.includes(price) || false}
                    onChange={(e) => handleFilterChange('price', price, e?.target?.checked)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-medium text-foreground">Minimum Rating</h3>
              <Icon 
                name={expandedSections?.rating ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            {expandedSections?.rating && (
              <div className="space-y-2 pl-2">
                {[4.5, 4.0, 3.5, 3.0]?.map((rating) => (
                  <Checkbox
                    key={rating}
                    label={`${rating}+ stars`}
                    checked={filters?.rating === rating}
                    onChange={(e) => handleRangeChange('rating', e?.target?.checked ? rating : null)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Distance */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('distance')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-medium text-foreground">Distance</h3>
              <Icon 
                name={expandedSections?.distance ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            {expandedSections?.distance && (
              <div className="space-y-2 pl-2">
                {['0.5 mi', '1 mi', '2 mi', '5 mi', '10+ mi']?.map((distance) => (
                  <Checkbox
                    key={distance}
                    label={`Within ${distance}`}
                    checked={filters?.distance === distance}
                    onChange={(e) => handleRangeChange('distance', e?.target?.checked ? distance : null)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('dietary')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-medium text-foreground">Dietary Options</h3>
              <Icon 
                name={expandedSections?.dietary ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            {expandedSections?.dietary && (
              <div className="space-y-2 pl-2">
                {dietaryOptions?.map((option) => (
                  <Checkbox
                    key={option}
                    label={option}
                    checked={filters?.dietary?.includes(option) || false}
                    onChange={(e) => handleFilterChange('dietary', option, e?.target?.checked)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Business Hours */}
          <div className="space-y-3">
            <button
              onClick={() => toggleSection('hours')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="font-heading font-medium text-foreground">Business Hours</h3>
              <Icon 
                name={expandedSections?.hours ? 'ChevronUp' : 'ChevronDown'} 
                size={16} 
                className="text-muted-foreground"
              />
            </button>
            {expandedSections?.hours && (
              <div className="space-y-2 pl-2">
                <Checkbox
                  label="Open Now"
                  checked={filters?.openNow || false}
                  onChange={(e) => handleRangeChange('openNow', e?.target?.checked)}
                />
                <Checkbox
                  label="Open Late (after 10 PM)"
                  checked={filters?.openLate || false}
                  onChange={(e) => handleRangeChange('openLate', e?.target?.checked)}
                />
                <Checkbox
                  label="24/7"
                  checked={filters?.open24h || false}
                  onChange={(e) => handleRangeChange('open24h', e?.target?.checked)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Apply Button */}
        <div className="lg:hidden p-4 border-t border-border">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;
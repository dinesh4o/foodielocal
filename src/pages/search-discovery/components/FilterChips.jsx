import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ 
  activeFilters = [], 
  onRemoveFilter, 
  onClearAll,
  className = '' 
}) => {
  if (activeFilters?.length === 0) return null;

  return (
    <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
      <div className="flex items-center space-x-2 min-w-max">
        {activeFilters?.map((filter, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 bg-accent/30 text-foreground px-3 py-1.5 rounded-full text-sm font-medium border border-accent/40"
          >
            <span className="whitespace-nowrap">{filter?.label}</span>
            <button
              onClick={() => onRemoveFilter(filter)}
              className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-accent/50 transition-smooth"
              aria-label={`Remove ${filter?.label} filter`}
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
        
        {activeFilters?.length > 1 && (
          <button
            onClick={onClearAll}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground text-sm font-medium px-2 py-1 rounded transition-smooth whitespace-nowrap"
          >
            <Icon name="X" size={14} />
            <span>Clear all</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;
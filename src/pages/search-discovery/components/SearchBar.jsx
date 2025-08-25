import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterClick, 
  onSortClick,
  suggestions = [],
  showSuggestions = false,
  onSuggestionClick,
  className = '' 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef?.current && 
        !searchRef?.current?.contains(event?.target) &&
        suggestionsRef?.current && 
        !suggestionsRef?.current?.contains(event?.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsFocused(true);
  };

  const handleSuggestionSelect = (suggestion) => {
    onSuggestionClick(suggestion);
    setIsFocused(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center space-x-3">
        {/* Search Input */}
        <div className="flex-1 relative" ref={searchRef}>
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none z-10"
            />
            <Input
              type="search"
              placeholder="Search restaurants, cuisines, dishes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onFocus={handleSearchFocus}
              className="pl-10 pr-4 h-12 bg-background border-border focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Search Suggestions Dropdown */}
          {isFocused && showSuggestions && suggestions?.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-food-elevated z-50 max-h-64 overflow-y-auto"
            >
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-smooth flex items-center space-x-3 border-b border-border last:border-b-0"
                >
                  <Icon 
                    name={suggestion?.type === 'restaurant' ? 'MapPin' : suggestion?.type === 'cuisine' ? 'ChefHat' : 'Search'} 
                    size={16} 
                    className="text-muted-foreground flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {suggestion?.name}
                    </p>
                    {suggestion?.subtitle && (
                      <p className="text-xs text-muted-foreground truncate">
                        {suggestion?.subtitle}
                      </p>
                    )}
                  </div>
                  {suggestion?.type === 'recent' && (
                    <Icon name="Clock" size={14} className="text-muted-foreground flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={onFilterClick}
          className="flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="Open filters"
        >
          <Icon name="SlidersHorizontal" size={20} />
        </button>

        {/* Sort Button */}
        <button
          onClick={onSortClick}
          className="flex items-center justify-center w-12 h-12 bg-card border border-border rounded-lg text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="Sort options"
        >
          <Icon name="ArrowUpDown" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
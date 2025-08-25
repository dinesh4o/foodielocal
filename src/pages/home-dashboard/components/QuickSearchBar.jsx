import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickSearchBar = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const mockSuggestions = [
    { id: 1, type: 'restaurant', name: 'Bella Vista Italian', cuisine: 'Italian' },
    { id: 2, type: 'restaurant', name: 'Sakura Sushi Bar', cuisine: 'Japanese' },
    { id: 3, type: 'cuisine', name: 'Italian Food', count: 24 },
    { id: 4, type: 'cuisine', name: 'Pizza Places', count: 18 },
    { id: 5, type: 'restaurant', name: 'The Local Bistro', cuisine: 'American' },
    { id: 6, type: 'cuisine', name: 'Sushi Restaurants', count: 12 }
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = mockSuggestions?.filter(item =>
          item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
        setSuggestions(filtered?.slice(0, 5));
        setShowSuggestions(true);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion?.type === 'restaurant') {
      navigate(`/restaurant-detail-page?id=${suggestion?.id}`);
    } else {
      navigate(`/search-discovery?q=${encodeURIComponent(suggestion?.name)}`);
    }
    setSearchQuery('');
    setShowSuggestions(false);
    inputRef?.current?.blur();
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/search-discovery?q=${encodeURIComponent(searchQuery?.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
      inputRef?.current?.blur();
    }
  };

  const handleFocus = () => {
    if (suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className={`relative mb-6 ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search restaurants, cuisines..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-smooth"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Icon name="Loader2" size={20} className="text-muted-foreground animate-spin" />
            </div>
          )}
          {searchQuery && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </form>
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-food-elevated z-50 max-h-64 overflow-y-auto">
          {suggestions?.map((suggestion) => (
            <button
              key={`${suggestion?.type}-${suggestion?.id}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted/50 transition-smooth first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-muted/50 rounded-full">
                <Icon 
                  name={suggestion?.type === 'restaurant' ? 'MapPin' : 'Search'} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {suggestion?.name}
                </p>
                {suggestion?.type === 'restaurant' ? (
                  <p className="text-xs text-muted-foreground">
                    {suggestion?.cuisine} Restaurant
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    {suggestion?.count} places
                  </p>
                )}
              </div>
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickSearchBar;
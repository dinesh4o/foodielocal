import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderContextual from '../../components/ui/HeaderContextual';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import RestaurantCard from './components/RestaurantCard';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import ViewToggle from './components/ViewToggle';
import MapView from './components/MapView';
import EmptyState from './components/EmptyState';


const SearchDiscovery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [currentSort, setCurrentSort] = useState('relevance');
  const [currentView, setCurrentView] = useState('list');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Mock data for restaurants
  const mockRestaurants = [
    {
      id: 1,
      name: "Bella Vista Italian",
      cuisines: ["Italian", "Mediterranean"],
      rating: 4.8,
      reviewCount: 324,
      priceRange: 3,
      distance: "0.3 mi",
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      status: "open",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      isFavorite: false
    },
    {
      id: 2,
      name: "Dragon Palace",
      cuisines: ["Chinese", "Asian"],
      rating: 4.6,
      reviewCount: 189,
      priceRange: 2,
      distance: "0.5 mi",
      deliveryTime: "30-40 min",
      deliveryFee: 0,
      status: "open",
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
      isFavorite: false
    },
    {
      id: 3,
      name: "Taco Libre",
      cuisines: ["Mexican", "Latin"],
      rating: 4.7,
      reviewCount: 256,
      priceRange: 2,
      distance: "0.7 mi",
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      status: "closing-soon",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      isFavorite: true
    },
    {
      id: 4,
      name: "Spice Garden",
      cuisines: ["Indian", "Vegetarian"],
      rating: 4.5,
      reviewCount: 142,
      priceRange: 2,
      distance: "1.2 mi",
      deliveryTime: "35-45 min",
      deliveryFee: 3.49,
      status: "open",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
      isFavorite: false
    },
    {
      id: 5,
      name: "Sakura Sushi",
      cuisines: ["Japanese", "Sushi"],
      rating: 4.9,
      reviewCount: 412,
      priceRange: 4,
      distance: "0.8 mi",
      deliveryTime: "40-50 min",
      deliveryFee: 4.99,
      status: "open",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      isFavorite: false
    },
    {
      id: 6,
      name: "The Burger Joint",
      cuisines: ["American", "Burgers"],
      rating: 4.4,
      reviewCount: 298,
      priceRange: 2,
      distance: "0.4 mi",
      deliveryTime: "15-25 min",
      deliveryFee: 1.49,
      status: "closed",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      isFavorite: false
    }
  ];

  // Mock search suggestions
  const mockSuggestions = [
    { name: "Italian restaurants", type: "cuisine", subtitle: "25 restaurants nearby" },
    { name: "Bella Vista Italian", type: "restaurant", subtitle: "0.3 mi away • Italian" },
    { name: "Pizza", type: "dish", subtitle: "Popular dish" },
    { name: "Sushi near me", type: "recent", subtitle: "Recent search" }
  ];

  // Initialize favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteRestaurants');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Handle search query from URL params or initial state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q');
    if (query) {
      setSearchQuery(query);
      setShowSuggestions(false);
    }
  }, [location?.search]);

  // Filter and sort restaurants
  const getFilteredRestaurants = useCallback(() => {
    let filtered = [...mockRestaurants];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(restaurant => 
        restaurant?.name?.toLowerCase()?.includes(query) ||
        restaurant?.cuisines?.some(cuisine => cuisine?.toLowerCase()?.includes(query))
      );
    }

    // Apply filters
    if (filters?.cuisine?.length > 0) {
      filtered = filtered?.filter(restaurant =>
        restaurant?.cuisines?.some(cuisine => filters?.cuisine?.includes(cuisine))
      );
    }

    if (filters?.price?.length > 0) {
      filtered = filtered?.filter(restaurant =>
        filters?.price?.includes(restaurant?.priceRange)
      );
    }

    if (filters?.rating) {
      filtered = filtered?.filter(restaurant => restaurant?.rating >= filters?.rating);
    }

    if (filters?.openNow) {
      filtered = filtered?.filter(restaurant => restaurant?.status === 'open');
    }

    // Apply sorting
    switch (currentSort) {
      case 'distance':
        filtered?.sort((a, b) => parseFloat(a?.distance) - parseFloat(b?.distance));
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'price-low':
        filtered?.sort((a, b) => a?.priceRange - b?.priceRange);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.priceRange - a?.priceRange);
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [searchQuery, filters, currentSort]);

  // Get active filters for chips
  const getActiveFilters = useCallback(() => {
    const active = [];
    
    if (filters?.cuisine?.length > 0) {
      filters?.cuisine?.forEach(cuisine => {
        active?.push({ type: 'cuisine', value: cuisine, label: cuisine });
      });
    }
    
    if (filters?.price?.length > 0) {
      filters?.price?.forEach(price => {
        active?.push({ 
          type: 'price', 
          value: price, 
          label: `${'$'?.repeat(price)}` 
        });
      });
    }
    
    if (filters?.rating) {
      active?.push({ 
        type: 'rating', 
        value: filters?.rating, 
        label: `${filters?.rating}+ stars` 
      });
    }
    
    if (filters?.distance) {
      active?.push({ 
        type: 'distance', 
        value: filters?.distance, 
        label: `Within ${filters?.distance}` 
      });
    }
    
    if (filters?.openNow) {
      active?.push({ type: 'openNow', value: true, label: 'Open Now' });
    }

    return active;
  }, [filters]);

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setShowSuggestions(query?.length > 0);
    
    // Update URL with search query
    const params = new URLSearchParams(location.search);
    if (query?.trim()) {
      params?.set('q', query);
    } else {
      params?.delete('q');
    }
    navigate(`${location?.pathname}?${params?.toString()}`, { replace: true });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.name);
    setShowSuggestions(false);
  };

  const handleToggleFavorite = (restaurantId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites?.has(restaurantId)) {
      newFavorites?.delete(restaurantId);
    } else {
      newFavorites?.add(restaurantId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteRestaurants', JSON.stringify([...newFavorites]));
  };

  const handleRemoveFilter = (filter) => {
    const newFilters = { ...filters };
    
    if (filter?.type === 'cuisine' && newFilters?.cuisine) {
      newFilters.cuisine = newFilters?.cuisine?.filter(c => c !== filter?.value);
      if (newFilters?.cuisine?.length === 0) delete newFilters?.cuisine;
    } else if (filter?.type === 'price' && newFilters?.price) {
      newFilters.price = newFilters?.price?.filter(p => p !== filter?.value);
      if (newFilters?.price?.length === 0) delete newFilters?.price;
    } else {
      delete newFilters?.[filter?.type];
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  const handleTryCategories = (category) => {
    if (category) {
      setSearchQuery(category);
      setShowSuggestions(false);
    } else {
      // Show popular categories
      setSearchQuery('');
    }
  };

  // Get filtered restaurants
  const filteredRestaurants = getFilteredRestaurants();
  const activeFilters = getActiveFilters();

  // Update restaurant favorites
  const restaurantsWithFavorites = filteredRestaurants?.map(restaurant => ({
    ...restaurant,
    isFavorite: favorites?.has(restaurant?.id)
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HeaderContextual
        title="Search & Discovery"
        showBack={false}
        showLogo={true}
      />
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Search Section */}
          <div className="mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onFilterClick={() => setShowFilterPanel(true)}
              onSortClick={() => setShowSortDropdown(!showSortDropdown)}
              suggestions={mockSuggestions}
              showSuggestions={showSuggestions}
              onSuggestionClick={handleSuggestionClick}
            />

            {/* Active Filters */}
            {activeFilters?.length > 0 && (
              <FilterChips
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
                onClearAll={handleClearAllFilters}
                className="mt-4"
              />
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-heading font-semibold text-foreground">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredRestaurants?.length} found
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <ViewToggle
                currentView={currentView}
                onViewChange={setCurrentView}
              />
              
              {/* Sort Dropdown Container */}
              <div className="relative">
                <SortDropdown
                  isOpen={showSortDropdown}
                  onClose={() => setShowSortDropdown(false)}
                  currentSort={currentSort}
                  onSortChange={setCurrentSort}
                />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:flex lg:space-x-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
            </div>

            {/* Results Content */}
            <div className="flex-1 min-w-0">
              {currentView === 'list' ? (
                <>
                  {filteredRestaurants?.length === 0 ? (
                    <EmptyState
                      type={searchQuery ? 'no-results' : 'no-search'}
                      searchQuery={searchQuery}
                      onClearFilters={handleClearAllFilters}
                      onTryCategories={handleTryCategories}
                    />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {restaurantsWithFavorites?.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant?.id}
                          restaurant={restaurant}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="h-96 lg:h-[600px]">
                  <MapView
                    restaurants={filteredRestaurants}
                    onRestaurantSelect={(restaurant) => {
                      navigate('/restaurant-detail-page', { state: { restaurant } });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default SearchDiscovery;
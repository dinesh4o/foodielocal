import React, { useState, useEffect } from 'react';
import HeaderContextual from '../../components/ui/HeaderContextual';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import LocationHeader from './components/LocationHeader';
import QuickSearchBar from './components/QuickSearchBar';
import CategoryFilters from './components/CategoryFilters';
import TrendingSection from './components/TrendingSection';
import RecommendationsSection from './components/RecommendationsSection';
import RecentReviewsSection from './components/RecentReviewsSection';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const HomeDashboard = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userName = localStorage.getItem('userName') || 'Guest';

  useEffect(() => {
    // Check for geolocation permission on first visit
    if (!localStorage.getItem('locationPermissionAsked')) {
      setTimeout(() => {
        if (navigator.geolocation) {
          navigator.geolocation?.getCurrentPosition(
            () => {
              localStorage.setItem('locationPermissionAsked', 'true');
            },
            () => {
              localStorage.setItem('locationPermissionAsked', 'true');
            }
          );
        }
      }, 1000);
    }
  }, []);

  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleSearchClick = () => {
    navigate('/search-discovery');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/user-profile-dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  const headerActions = [
    {
      icon: 'Search',
      label: 'Search',
      onClick: handleSearchClick,
      variant: 'default'
    },
    {
      icon: isAuthenticated ? 'User' : 'LogIn',
      label: isAuthenticated ? 'Profile' : 'Sign In',
      onClick: handleProfileClick,
      variant: 'default'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HeaderContextual
        showBack={false}
        showLogo={true}
        actions={headerActions}
      />

      {/* Main Content */}
      <main 
        className="pt-16 pb-20 lg:pb-8 px-4 lg:px-6 max-w-7xl mx-auto"
        style={{ 
          paddingTop: 'calc(var(--header-height-mobile) + 1rem)',
          paddingBottom: 'calc(var(--nav-height-mobile) + 1rem)'
        }}
      >
        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2 text-primary">
              <Icon name="RefreshCw" size={16} className="animate-spin" />
              <span className="text-sm font-medium">Refreshing...</span>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Welcome back{isAuthenticated ? `, ${userName}` : ''}! 👋
          </h1>
          <p className="text-muted-foreground">
            Discover amazing local restaurants and share your food experiences
          </p>
        </div>

        {/* Location Header */}
        <LocationHeader />

        {/* Quick Search Bar */}
        <QuickSearchBar />

        {/* Category Filters */}
        <CategoryFilters />

        {/* Trending Section */}
        <TrendingSection />

        {/* Recommendations Section */}
        <RecommendationsSection />

        {/* Recent Reviews Section - Only show if authenticated */}
        {isAuthenticated && <RecentReviewsSection />}

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-primary/10 to-accent/20 rounded-lg p-6 text-center">
            <div className="mb-4">
              <Icon name="Heart" size={48} className="text-primary mx-auto mb-3" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Join the FoodieLocal Community
              </h3>
              <p className="text-muted-foreground text-sm">
                Sign up to save favorites, write reviews, and get personalized recommendations
              </p>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth"
            >
              Get Started
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomTabNavigation />

      {/* Authentication Modal */}
      <AuthenticationGate
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectPath="/home-dashboard"
      />
    </div>
  );
};

export default HomeDashboard;
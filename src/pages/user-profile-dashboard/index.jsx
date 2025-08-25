import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderContextual from '../../components/ui/HeaderContextual';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import ProfileHeader from './components/ProfileHeader';
import TabNavigation from './components/TabNavigation';
import ReviewCard from './components/ReviewCard';
import FavoriteCard from './components/FavoriteCard';
import PhotoGrid from './components/PhotoGrid';
import SettingsPanel from './components/SettingsPanel';
import Icon from '../../components/AppIcon';


const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    location: "San Francisco, CA",
    joinDate: "March 2023",
    averageRating: 4.2,
    bio: "Food enthusiast and local explorer. Love discovering hidden gems and sharing great dining experiences!",
    phone: "+1 (555) 123-4567",
    badges: [
      { name: "Top Reviewer", icon: "Star" },
      { name: "Photo Pro", icon: "Camera" },
      { name: "Local Guide", icon: "MapPin" }
    ]
  };

  const userStats = [
    { label: "Reviews", value: "127" },
    { label: "Photos", value: "89" },
    { label: "Followers", value: "234" },
    { label: "Helpful", value: "456" }
  ];

  const tabs = [
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare', count: 127 },
    { id: 'favorites', label: 'Favorites', icon: 'Heart', count: 23 },
    { id: 'photos', label: 'Photos', icon: 'Camera', count: 89 },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  const mockReviews = [
    {
      id: 1,
      restaurant: {
        name: "Bella Vista Italian",
        cuisine: "Italian",
        location: "Downtown SF",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
      },
      rating: 5,
      content: "Absolutely amazing experience! The pasta was perfectly cooked and the service was exceptional. The ambiance is perfect for a romantic dinner. Highly recommend the truffle risotto - it\'s their signature dish and worth every penny.",
      date: "2025-08-20T19:30:00Z",
      images: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop",
        "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop"
      ],
      likes: 24,
      replies: 3,
      views: 156
    },
    {
      id: 2,
      restaurant: {
        name: "Sakura Sushi Bar",
        cuisine: "Japanese",
        location: "Mission District",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop"
      },
      rating: 4,
      content: "Fresh sushi and great atmosphere. The chef's special roll was creative and delicious. Service was a bit slow during peak hours, but the quality of food made up for it.",
      date: "2025-08-18T20:15:00Z",
      images: [
        "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&h=200&fit=crop"
      ],
      likes: 18,
      replies: 2,
      views: 89
    },
    {
      id: 3,
      restaurant: {
        name: "Green Garden Cafe",
        cuisine: "Vegetarian",
        location: "Castro",
        image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop"
      },
      rating: 4,
      content: "Great healthy options and fresh ingredients. The quinoa bowl was filling and nutritious. Perfect spot for a healthy lunch break.",
      date: "2025-08-15T12:30:00Z",
      images: [],
      likes: 12,
      replies: 1,
      views: 67
    }
  ];

  const mockFavorites = [
    {
      id: 1,
      name: "Bella Vista Italian",
      cuisine: "Italian",
      location: "Downtown SF",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 234,
      deliveryTime: "25-35 min",
      distance: "0.8 mi",
      priceRange: "25-40",
      isOpen: true
    },
    {
      id: 2,
      name: "Sakura Sushi Bar",
      cuisine: "Japanese",
      location: "Mission District",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 189,
      deliveryTime: "30-40 min",
      distance: "1.2 mi",
      priceRange: "30-50",
      isOpen: false
    },
    {
      id: 3,
      name: "Green Garden Cafe",
      cuisine: "Vegetarian",
      location: "Castro",
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 156,
      deliveryTime: "20-30 min",
      distance: "0.5 mi",
      priceRange: "15-25",
      isOpen: true
    }
  ];

  const mockPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
      restaurant: {
        name: "Bella Vista Italian",
        cuisine: "Italian",
        location: "Downtown SF"
      },
      uploadDate: "2025-08-20T19:30:00Z",
      likes: 45,
      views: 234
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=400&fit=crop",
      restaurant: {
        name: "Sakura Sushi Bar",
        cuisine: "Japanese",
        location: "Mission District"
      },
      uploadDate: "2025-08-18T20:15:00Z",
      likes: 32,
      views: 178
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=400&fit=crop",
      restaurant: {
        name: "Bella Vista Italian",
        cuisine: "Italian",
        location: "Downtown SF"
      },
      uploadDate: "2025-08-20T19:30:00Z",
      likes: 28,
      views: 145
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
      restaurant: {
        name: "Green Garden Cafe",
        cuisine: "Vegetarian",
        location: "Castro"
      },
      uploadDate: "2025-08-15T12:30:00Z",
      likes: 19,
      views: 98
    }
  ];

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      
      if (!authStatus) {
        setShowAuthGate(true);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleEditReview = (review) => {
    console.log('Edit review:', review);
    // Implement edit review functionality
  };

  const handleDeleteReview = (reviewId) => {
    console.log('Delete review:', reviewId);
    // Implement delete review functionality
  };

  const handleRemoveFavorite = (restaurantId) => {
    console.log('Remove favorite:', restaurantId);
    // Implement remove favorite functionality
  };

  const handleMoveToList = (restaurant) => {
    console.log('Move to list:', restaurant);
    // Implement move to list functionality
  };

  const handleUpdateProfile = (profileData) => {
    console.log('Update profile:', profileData);
    // Implement profile update functionality
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/home-dashboard');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'reviews':
        return (
          <div className="space-y-4">
            {mockReviews?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageSquare" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-medium text-foreground mb-2">No reviews yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start sharing your dining experiences
                </p>
                <button
                  onClick={() => navigate('/search-discovery')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
                >
                  Find Restaurants
                </button>
              </div>
            ) : (
              mockReviews?.map((review) => (
                <ReviewCard
                  key={review?.id}
                  review={review}
                  onEdit={handleEditReview}
                  onDelete={handleDeleteReview}
                />
              ))
            )}
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-4">
            {mockFavorites?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-heading font-medium text-foreground mb-2">No favorites yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save restaurants you love for easy access
                </p>
                <button
                  onClick={() => navigate('/search-discovery')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
                >
                  Discover Restaurants
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFavorites?.map((restaurant) => (
                  <FavoriteCard
                    key={restaurant?.id}
                    restaurant={restaurant}
                    onRemove={handleRemoveFavorite}
                    onMoveToList={handleMoveToList}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 'photos':
        return <PhotoGrid photos={mockPhotos} />;

      case 'settings':
        return (
          <SettingsPanel
            user={userData}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderContextual title="Profile" />
        <div className="pt-16 pb-20 lg:pb-8">
          <div className="animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-4 space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderContextual 
        title="Profile"
        showLogo={false}
        actions={[
          {
            icon: 'Share',
            label: 'Share Profile',
            onClick: () => console.log('Share profile')
          }
        ]}
      />

      <div className="pt-16 pb-20 lg:pb-8">
        <ProfileHeader user={userData} stats={userStats} />
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
        
        <div className="px-4 lg:px-6 py-6">
          {renderTabContent()}
        </div>
      </div>

      <BottomTabNavigation />

      <AuthenticationGate
        isOpen={showAuthGate}
        onClose={() => setShowAuthGate(false)}
        redirectPath="/user-profile-dashboard"
      />
    </div>
  );
};

export default UserProfileDashboard;
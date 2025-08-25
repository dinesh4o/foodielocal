import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderContextual from '../../components/ui/HeaderContextual';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import RestaurantHero from './components/RestaurantHero';
import RestaurantInfo from './components/RestaurantInfo';
import MenuSection from './components/MenuSection';
import PhotoGallery from './components/PhotoGallery';
import ReviewsSection from './components/ReviewsSection';
import StickyActions from './components/StickyActions';
import Icon from '../../components/AppIcon';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock restaurant data
  const mockRestaurant = {
    id: "rest-001",
    name: "Bella Vista Italian Kitchen",
    rating: 4.6,
    reviewCount: 342,
    priceRange: "$$",
    distance: "0.8 mi",
    cuisineTypes: ["Italian", "Mediterranean", "Wine Bar"],
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"
    ],
    phone: "(555) 123-4567",
    website: "https://bellavistakitchen.com",
    address: "123 Main Street, Downtown District, City, State 12345",
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    hours: [
      { day: "Monday", isOpen: true, open: "11:00", close: "22:00" },
      { day: "Tuesday", isOpen: true, open: "11:00", close: "22:00" },
      { day: "Wednesday", isOpen: true, open: "11:00", close: "22:00" },
      { day: "Thursday", isOpen: true, open: "11:00", close: "23:00" },
      { day: "Friday", isOpen: true, open: "11:00", close: "23:00" },
      { day: "Saturday", isOpen: true, open: "10:00", close: "23:00" },
      { day: "Sunday", isOpen: true, open: "10:00", close: "22:00" }
    ],
    features: ["Outdoor Seating", "Takeout", "Delivery", "Wine Selection", "Vegetarian Options", "Parking Available"],
    menu: [
      {
        category: "Appetizers",
        items: [
          {
            id: "app-001",
            name: "Bruschetta Trio",
            description: "Three varieties of our signature bruschetta: classic tomato basil, roasted red pepper with goat cheese, and mushroom truffle. Served on house-made focaccia bread.",
            price: "14.95",
            isPopular: true,
            isVegetarian: true,
            allergens: ["Gluten", "Dairy"]
          },
          {
            id: "app-002",
            name: "Antipasto Platter",
            description: "Selection of Italian cured meats, artisanal cheeses, olives, roasted vegetables, and fresh bread.",
            price: "18.95",
            allergens: ["Gluten", "Dairy", "Nuts"]
          }
        ]
      },
      {
        category: "Pasta",
        items: [
          {
            id: "pasta-001",
            name: "Spaghetti Carbonara",
            description: "Traditional Roman pasta with pancetta, eggs, pecorino romano, and black pepper. Made with fresh house-made pasta.",
            price: "22.95",
            isPopular: true,
            allergens: ["Gluten", "Dairy", "Eggs"],
            customizations: ["Gluten-free pasta", "Extra pancetta", "Add mushrooms"]
          },
          {
            id: "pasta-002",
            name: "Lobster Ravioli",
            description: "House-made ravioli filled with fresh lobster and ricotta, served in a light cream sauce with cherry tomatoes and fresh herbs.",
            price: "28.95",
            allergens: ["Gluten", "Dairy", "Shellfish", "Eggs"]
          }
        ]
      },
      {
        category: "Main Courses",
        items: [
          {
            id: "main-001",
            name: "Osso Buco",
            description: "Slow-braised veal shanks in rich tomato and wine sauce, served with saffron risotto and gremolata.",
            price: "34.95",
            isSpicy: false,
            allergens: ["Dairy"]
          },
          {
            id: "main-002",
            name: "Grilled Branzino",
            description: "Whole Mediterranean sea bass grilled with lemon, herbs, and olive oil. Served with roasted vegetables and potatoes.",
            price: "29.95",
            allergens: ["Fish"]
          }
        ]
      },
      {
        category: "Desserts",
        items: [
          {
            id: "dessert-001",
            name: "Tiramisu",
            description: "Classic Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa powder.",
            price: "9.95",
            isPopular: true,
            isVegetarian: true,
            allergens: ["Gluten", "Dairy", "Eggs"]
          }
        ]
      }
    ],
    photos: [
      {
        id: "photo-001",
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop",
        caption: "Signature Spaghetti Carbonara",
        userSubmitted: true,
        submittedBy: "Sarah M."
      },
      {
        id: "photo-002",
        url: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop",
        caption: "Cozy dining atmosphere",
        userSubmitted: false
      },
      {
        id: "photo-003",
        url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop",
        caption: "Fresh ingredients",
        userSubmitted: false
      },
      {
        id: "photo-004",
        url: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop",
        caption: "Outdoor seating area",
        userSubmitted: true,
        submittedBy: "Mike R."
      },
      {
        id: "photo-005",
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
        caption: "Wine selection",
        userSubmitted: false
      },
      {
        id: "photo-006",
        url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
        caption: "Delicious tiramisu",
        userSubmitted: true,
        submittedBy: "Emma L."
      }
    ],
    reviews: [
      {
        id: "review-001",
        user: {
          name: "Sarah Mitchell",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        rating: 5,
        date: "2025-01-20",
        text: "Absolutely incredible dining experience! The carbonara was perfectly executed - creamy, rich, and authentic. The service was attentive without being intrusive, and the atmosphere was warm and inviting. Will definitely be returning soon!",
        likes: 12,
        photos: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop"
        ]
      },
      {
        id: "review-002",
        user: {
          name: "Michael Rodriguez",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        rating: 4,
        date: "2025-01-18",
        text: "Great Italian food with generous portions. The osso buco was tender and flavorful. Only minor complaint is that it can get quite noisy during peak hours, but the food quality more than makes up for it.",
        likes: 8,
        photos: []
      },
      {
        id: "review-003",
        user: {
          name: "Emma Thompson",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg"
        },
        rating: 5,
        date: "2025-01-15",
        text: "Perfect spot for a romantic dinner! The lobster ravioli was divine, and the tiramisu was the best I've had outside of Italy. The wine selection is impressive too. Highly recommend making a reservation.",
        likes: 15,
        photos: [
          "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop",
          "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=200&fit=crop"
        ]
      },
      {
        id: "review-004",
        user: {
          name: "David Chen",
          avatar: "https://randomuser.me/api/portraits/men/33.jpg"
        },
        rating: 4,
        date: "2025-01-12",
        text: "Solid Italian restaurant with authentic flavors. The bruschetta trio was a great start to the meal. Service was friendly and knowledgeable about the menu. Prices are reasonable for the quality.",
        likes: 6,
        photos: []
      },
      {
        id: "review-005",
        user: {
          name: "Lisa Johnson",
          avatar: "https://randomuser.me/api/portraits/women/41.jpg"
        },
        rating: 3,
        date: "2025-01-10",
        text: "Food was good but not exceptional. The pasta was slightly overcooked for my taste. The atmosphere is nice and the staff is friendly. It\'s a decent option but there are better Italian places in the area.",
        likes: 3,
        photos: []
      }
    ],
    overallRating: 4.6,
    ratingDistribution: {
      5: 198,
      4: 89,
      3: 32,
      2: 15,
      1: 8
    }
  };

  useEffect(() => {
    // Simulate API call
    const loadRestaurant = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRestaurant(mockRestaurant);
        
        // Check if restaurant is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites?.includes(mockRestaurant?.id));
      } catch (error) {
        console.error('Error loading restaurant:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
  }, [id]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites?.filter(fav => fav !== restaurant?.id);
    } else {
      updatedFavorites = [...favorites, restaurant?.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleCall = () => {
    window.location.href = `tel:${restaurant?.phone}`;
  };

  const handleDirections = () => {
    const { lat, lng } = restaurant?.coordinates;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const handleWebsite = () => {
    window.open(restaurant?.website, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: restaurant?.name,
      text: `Check out ${restaurant?.name} - ${restaurant?.cuisineTypes?.join(', ')} restaurant`,
      url: window.location?.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        await navigator.clipboard?.writeText(window.location?.href);
        alert('Restaurant link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSubmitReview = (reviewData) => {
    const newReview = {
      id: `review-${Date.now()}`,
      user: {
        name: localStorage.getItem('userName') || 'Anonymous User',
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      },
      rating: reviewData?.rating,
      date: new Date()?.toISOString()?.split('T')?.[0],
      text: reviewData?.text,
      likes: 0,
      photos: reviewData?.photos || []
    };

    setRestaurant(prev => ({
      ...prev,
      reviews: [newReview, ...prev?.reviews],
      reviewCount: prev?.reviewCount + 1,
      overallRating: ((prev?.overallRating * prev?.reviewCount) + reviewData?.rating) / (prev?.reviewCount + 1),
      ratingDistribution: {
        ...prev?.ratingDistribution,
        [reviewData?.rating]: prev?.ratingDistribution?.[reviewData?.rating] + 1
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderContextual showBack title="Loading..." />
        <div className="pt-16 pb-20 lg:pb-4">
          <div className="animate-pulse space-y-6">
            <div className="h-64 lg:h-80 bg-muted" />
            <div className="px-4 space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-32 bg-muted rounded" />
            </div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderContextual showBack title="Restaurant Not Found" />
        <div className="pt-16 pb-20 lg:pb-4 flex items-center justify-center">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
              Restaurant Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The restaurant you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/home-dashboard')}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  const headerActions = [
    {
      icon: 'Share',
      label: 'Share restaurant',
      onClick: handleShare
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderContextual 
        showBack 
        title={restaurant?.name}
        actions={headerActions}
        showLogo={false}
      />
      <div className="pt-16 pb-20 lg:pb-4">
        <div className="lg:max-w-6xl lg:mx-auto lg:px-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <RestaurantHero
                restaurant={restaurant}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={isFavorite}
              />
              
              <div className="px-4 lg:px-0">
                <MenuSection menu={restaurant?.menu} />
              </div>
              
              <div className="px-4 lg:px-0">
                <PhotoGallery photos={restaurant?.photos} />
              </div>
              
              <div className="px-4 lg:px-0">
                <ReviewsSection
                  reviews={restaurant?.reviews}
                  overallRating={restaurant?.overallRating}
                  ratingDistribution={restaurant?.ratingDistribution}
                  onSubmitReview={handleSubmitReview}
                />
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <RestaurantInfo restaurant={restaurant} />
                
                {/* Desktop Actions */}
                <div className="bg-card rounded-lg shadow-food-card p-6 space-y-3">
                  <button
                    onClick={handleCall}
                    className="w-full flex items-center justify-center space-x-2 bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-smooth"
                  >
                    <Icon name="Phone" size={20} />
                    <span className="font-medium">Call Restaurant</span>
                  </button>
                  
                  <button
                    onClick={handleDirections}
                    className="w-full flex items-center justify-center space-x-2 bg-secondary text-secondary-foreground py-3 rounded-lg hover:bg-secondary/90 transition-smooth"
                  >
                    <Icon name="Navigation" size={20} />
                    <span className="font-medium">Get Directions</span>
                  </button>
                  
                  {restaurant?.website && (
                    <button
                      onClick={handleWebsite}
                      className="w-full flex items-center justify-center space-x-2 border border-border text-foreground py-3 rounded-lg hover:bg-muted/50 transition-smooth"
                    >
                      <Icon name="ExternalLink" size={20} />
                      <span className="font-medium">Visit Website</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Restaurant Info */}
        <div className="px-4 lg:hidden mt-6">
          <RestaurantInfo restaurant={restaurant} />
        </div>
      </div>
      {/* Mobile Sticky Actions */}
      <StickyActions
        restaurant={restaurant}
        onCall={handleCall}
        onDirections={handleDirections}
        onWebsite={handleWebsite}
        onShare={handleShare}
      />
      <BottomTabNavigation />
    </div>
  );
};

export default RestaurantDetailPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const RecentReviewsSection = ({ className = '' }) => {
  const navigate = useNavigate();

  const recentReviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        isFollowing: true
      },
      restaurant: {
        id: 10,
        name: "Artisan Pizza Co.",
        cuisine: "Italian"
      },
      rating: 5,
      comment: "Absolutely incredible wood-fired pizza! The margherita was perfection - fresh basil, creamy mozzarella, and the most amazing crust.",
      images: [
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop"
      ],
      timestamp: "2 hours ago",
      likes: 12,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        isFollowing: true
      },
      restaurant: {
        id: 11,
        name: "Golden Spoon Thai",
        cuisine: "Thai"
      },
      rating: 4,
      comment: "Great pad thai and friendly service. The spice level was perfect and portions were generous.",
      images: [],
      timestamp: "5 hours ago",
      likes: 8,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "Emma Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        isFollowing: false
      },
      restaurant: {
        id: 12,
        name: "Brew & Bite",
        cuisine: "American"
      },
      rating: 5,
      comment: "Perfect brunch spot! The avocado toast was Instagram-worthy and the coffee was exceptional.",
      images: [
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?w=300&h=200&fit=crop"
      ],
      timestamp: "1 day ago",
      likes: 24,
      isLiked: false
    }
  ];

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant-detail-page?id=${restaurantId}`);
  };

  const handleUserClick = (userName) => {
    navigate(`/user-profile-dashboard?user=${userName?.toLowerCase()?.replace(' ', '-')}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground/30'}
      />
    ));
  };

  return (
    <section className={`mb-8 ${className}`}>
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
          Recent Reviews 📝
        </h2>
        <p className="text-sm text-muted-foreground">
          Latest reviews from people you follow
        </p>
      </div>
      <div className="space-y-4">
        {recentReviews?.map((review) => (
          <div key={review?.id} className="bg-card rounded-lg shadow-food-card p-4">
            {/* User Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleUserClick(review?.user?.name)}
                  className="flex-shrink-0"
                >
                  <Image
                    src={review?.user?.avatar}
                    alt={review?.user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
                <div>
                  <button
                    onClick={() => handleUserClick(review?.user?.name)}
                    className="font-medium text-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {review?.user?.name}
                  </button>
                  <p className="text-xs text-muted-foreground">{review?.timestamp}</p>
                </div>
              </div>
              
              {review?.user?.isFollowing && (
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="UserCheck" size={12} />
                  <span>Following</span>
                </div>
              )}
            </div>

            {/* Restaurant Info */}
            <button
              onClick={() => handleRestaurantClick(review?.restaurant?.id)}
              className="flex items-center space-x-2 mb-3 hover:text-primary transition-smooth"
            >
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {review?.restaurant?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                • {review?.restaurant?.cuisine}
              </span>
            </button>

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-3">
              {renderStars(review?.rating)}
            </div>

            {/* Review Content */}
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              {review?.comment}
            </p>

            {/* Review Images */}
            {review?.images?.length > 0 && (
              <div className="mb-3">
                <div className="flex space-x-2 overflow-x-auto">
                  {review?.images?.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="flex-shrink-0 w-20 h-20 rounded-lg object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-smooth">
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={review?.isLiked ? 'text-error fill-current' : ''} 
                />
                <span className="text-sm">{review?.likes}</span>
              </button>
              
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="MessageCircle" size={16} />
                  <span className="text-sm">Reply</span>
                </button>
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth">
                  <Icon name="Share2" size={16} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentReviewsSection;
import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, overallRating, ratingDistribution, onSubmitReview }) => {
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: '',
    photos: []
  });
  const [likedReviews, setLikedReviews] = useState(new Set());

  const filteredReviews = reviews?.filter(review => filterRating === 'all' || review?.rating === parseInt(filterRating))?.sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'rating') {
        return b?.rating - a?.rating;
      }
      return b?.likes - a?.likes;
    });

  const handleLikeToggle = (reviewId) => {
    const newLiked = new Set(likedReviews);
    if (newLiked?.has(reviewId)) {
      newLiked?.delete(reviewId);
    } else {
      newLiked?.add(reviewId);
    }
    setLikedReviews(newLiked);
  };

  const handleRatingClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = (e) => {
    e?.preventDefault();
    if (newReview?.rating > 0 && newReview?.text?.trim()) {
      onSubmitReview(newReview);
      setNewReview({ rating: 0, text: '', photos: [] });
      setShowReviewForm(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg shadow-food-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">Reviews</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReviewForm(!showReviewForm)}
            iconName="Plus"
            iconPosition="left"
          >
            Write Review
          </Button>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground mb-2">{overallRating}</div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={20}
                  className={`${
                    star <= Math.floor(overallRating)
                      ? 'fill-current text-yellow-400' :'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{reviews?.length} reviews</p>
          </div>
          
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground w-2">{rating}</span>
                <Icon name="Star" size={12} className="text-yellow-400" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(ratingDistribution?.[rating] / reviews?.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Filter:</span>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e?.target?.value)}
              className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground"
            >
              <option value="all">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="text-sm border border-border rounded-lg px-3 py-1 bg-background text-foreground"
            >
              <option value="recent">Most recent</option>
              <option value="rating">Highest rated</option>
              <option value="helpful">Most helpful</option>
            </select>
          </div>
        </div>
      </div>
      {/* Review Form */}
      {showReviewForm && (
        <div className="p-6 border-b border-border bg-accent/5">
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-1 hover:scale-110 transition-smooth"
                  >
                    <Icon
                      name="Star"
                      size={24}
                      className={`${
                        star <= newReview?.rating
                          ? 'fill-current text-yellow-400' :'text-muted-foreground hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Review</label>
              <textarea
                value={newReview?.text}
                onChange={(e) => setNewReview(prev => ({ ...prev, text: e?.target?.value }))}
                placeholder="Share your experience..."
                rows={4}
                className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                disabled={newReview?.rating === 0 || !newReview?.text?.trim()}
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Reviews List */}
      <div className="divide-y divide-border">
        {filteredReviews?.map((review) => (
          <div key={review?.id} className="p-6">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.user?.avatar}
                alt={review?.user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{review?.user?.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            size={14}
                            className={`${
                              star <= review?.rating
                                ? 'fill-current text-yellow-400' :'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground mb-3">{review?.text}</p>
                
                {review?.photos && review?.photos?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.photos?.map((photo, index) => (
                      <Image
                        key={index}
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLikeToggle(review?.id)}
                    className={`flex items-center space-x-1 text-sm transition-smooth ${
                      likedReviews?.has(review?.id)
                        ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon 
                      name="ThumbsUp" 
                      size={16} 
                      className={likedReviews?.has(review?.id) ? 'fill-current' : ''}
                    />
                    <span>Helpful ({review?.likes + (likedReviews?.has(review?.id) ? 1 : 0)})</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="MessageCircle" size={16} />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
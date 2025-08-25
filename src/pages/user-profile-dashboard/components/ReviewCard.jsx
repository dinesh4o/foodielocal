import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(review?.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={`${
          index < rating
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-food-card transition-smooth">
      {/* Restaurant Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Image
            src={review?.restaurant?.image}
            alt={review?.restaurant?.name}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-medium text-foreground truncate">
              {review?.restaurant?.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {review?.restaurant?.cuisine} • {review?.restaurant?.location}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-food-elevated z-10 min-w-32">
              <button
                onClick={() => {
                  onEdit(review);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-smooth"
              >
                <Icon name="Edit" size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowActions(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
              >
                <Icon name="Trash2" size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Rating and Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(review?.rating)}
          </div>
          <span className="text-sm font-medium text-foreground">{review?.rating}/5</span>
        </div>
        <span className="text-sm text-muted-foreground">{formatDate(review?.date)}</span>
      </div>
      {/* Review Content */}
      <p className="text-sm text-foreground mb-3 leading-relaxed">
        {review?.content}
      </p>
      {/* Review Images */}
      {review?.images && review?.images?.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {review?.images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Review photo ${index + 1}`}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}
      {/* Engagement Stats */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          <Icon name="ThumbsUp" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{review?.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="MessageCircle" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{review?.replies}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Eye" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{review?.views}</span>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-food-elevated w-full max-w-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="Trash2" size={20} className="text-error" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">Delete Review</h3>
                  <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
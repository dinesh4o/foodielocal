import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StickyActions = ({ restaurant, onCall, onDirections, onWebsite, onShare }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 z-sticky lg:hidden">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onCall}
          iconName="Phone"
          className="flex-1"
        >
          Call
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onDirections}
          iconName="Navigation"
          className="flex-1"
        >
          Directions
        </Button>
        
        {restaurant?.website && (
          <Button
            variant="outline"
            size="sm"
            onClick={onWebsite}
            iconName="ExternalLink"
            className="flex-1"
          >
            Website
          </Button>
        )}
        
        <button
          onClick={onShare}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          aria-label="Share restaurant"
        >
          <Icon name="Share" size={20} />
        </button>
      </div>
    </div>
  );
};

export default StickyActions;
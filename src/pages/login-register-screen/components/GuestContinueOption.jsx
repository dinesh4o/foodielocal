import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const GuestContinueOption = ({ onContinueAsGuest, className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">or</span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        onClick={onContinueAsGuest}
        className="text-muted-foreground hover:text-foreground"
      >
        <div className="flex items-center space-x-2">
          <Icon name="UserX" size={16} />
          <span>Continue as Guest</span>
        </div>
      </Button>
      
      <p className="text-xs text-muted-foreground mt-2">
        Limited features available without an account
      </p>
    </div>
  );
};

export default GuestContinueOption;
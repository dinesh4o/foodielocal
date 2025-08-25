import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, restaurantData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleViewDashboard = () => {
    onClose();
    navigate('/user-profile-dashboard');
  };

  const handleAddAnother = () => {
    onClose();
    window.location?.reload(); // Reset the form
  };

  const handleGoHome = () => {
    onClose();
    navigate('/home-dashboard');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-food-elevated w-full max-w-md animate-scale-in">
        {/* Success Icon */}
        <div className="text-center pt-8 pb-4">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Restaurant Submitted!
          </h2>
          
          <p className="text-muted-foreground px-4">
            Thank you for adding <span className="font-medium text-foreground">{restaurantData?.name}</span> to FoodieLocal.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* Timeline */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">
              What happens next?
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary-foreground">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Review Process</p>
                  <p className="text-xs text-muted-foreground">Our team will review your submission within 24-48 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-muted-foreground">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Publication</p>
                  <p className="text-xs text-muted-foreground">Once approved, your restaurant will be live on the platform</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-muted-foreground">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Notification</p>
                  <p className="text-xs text-muted-foreground">You'll receive an email confirmation when it's published</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Number */}
          <div className="text-center py-4 bg-background border border-border rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Submission Reference</p>
            <p className="text-lg font-mono font-medium text-foreground">
              #{Date.now()?.toString()?.slice(-8)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={handleViewDashboard}
              iconName="User"
              iconPosition="left"
            >
              View My Profile
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleAddAnother}
                iconName="Plus"
                iconPosition="left"
              >
                Add Another
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleGoHome}
                iconName="Home"
                iconPosition="left"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
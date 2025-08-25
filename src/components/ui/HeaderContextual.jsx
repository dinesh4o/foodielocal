import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const HeaderContextual = ({ 
  showBack = false, 
  title = '', 
  actions = [], 
  showLogo = true,
  className = '' 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history?.length > 1) {
      navigate(-1);
    } else {
      navigate('/home-dashboard');
    }
  };

  const renderLogo = () => (
    <div className="flex items-center">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        className="text-primary"
        aria-label="FoodieLocal"
      >
        <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1"/>
        <path 
          d="M12 8c-2.2 0-4 1.8-4 4v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8c0-2.2-1.8-4-4-4h-8z" 
          fill="currentColor"
        />
        <circle cx="14" cy="14" r="2" fill="white"/>
        <circle cx="20" cy="14" r="2" fill="white"/>
        <path d="M14 18h4c0 1.1-.9 2-2 2s-2-.9-2-2z" fill="white"/>
      </svg>
      <span className="ml-2 text-lg font-heading font-semibold text-foreground">
        FoodieLocal
      </span>
    </div>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-header ${className}`}
      style={{ height: 'var(--header-height-mobile)' }}
    >
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center min-w-0">
          {showBack ? (
            <button
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground hover:bg-muted/50 transition-smooth mr-2"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} />
            </button>
          ) : showLogo ? (
            renderLogo()
          ) : null}
          
          {title && (
            <h1 className="text-lg font-heading font-semibold text-foreground truncate ml-2">
              {title}
            </h1>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={action?.onClick}
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-smooth ${
                action?.variant === 'primary' ?'bg-primary text-primary-foreground hover:bg-primary/90' :'text-foreground hover:bg-muted/50'
              }`}
              aria-label={action?.label}
              title={action?.label}
              disabled={action?.disabled}
            >
              <Icon 
                name={action?.icon} 
                size={action?.size || 20} 
                strokeWidth={action?.variant === 'primary' ? 2.5 : 2}
              />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HeaderContextual;
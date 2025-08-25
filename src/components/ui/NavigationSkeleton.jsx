import React from 'react';

const NavigationSkeleton = ({ type = 'bottom', className = '' }) => {
  if (type === 'bottom') {
    return (
      <div 
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-navigation ${className}`}
        style={{ height: 'var(--nav-height-mobile)' }}
        role="navigation"
        aria-label="Loading navigation"
      >
        <div className="flex items-center justify-around h-full px-2">
          {[...Array(4)]?.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1"
              style={{ minHeight: '48px', minWidth: '48px' }}
            >
              <div className="w-6 h-6 bg-muted rounded mb-1 animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
              <div className="w-12 h-3 bg-muted rounded animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'header') {
    return (
      <div 
        className={`fixed top-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border z-header ${className}`}
        style={{ height: 'var(--header-height-mobile)' }}
      >
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left Section Skeleton */}
          <div className="flex items-center min-w-0">
            <div className="w-8 h-8 bg-muted rounded-lg animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
            <div className="w-32 h-6 bg-muted rounded ml-2 animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
          </div>

          {/* Right Section Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-muted rounded-lg animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
            <div className="w-10 h-10 bg-muted rounded-lg animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'desktop') {
    return (
      <div 
        className={`hidden lg:flex items-center justify-center bg-card border-b border-border ${className}`}
        style={{ height: 'var(--nav-height-desktop)' }}
        role="navigation"
        aria-label="Loading navigation"
      >
        <div className="flex items-center space-x-8">
          {[...Array(4)]?.map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg"
              style={{ minHeight: '40px' }}
            >
              <div className="w-5 h-5 bg-muted rounded animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
              <div className="w-16 h-4 bg-muted rounded animate-shimmer bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200px_100%]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default NavigationSkeleton;
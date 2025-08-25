import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    {
      label: 'Discover',
      path: '/home-dashboard',
      icon: 'Home',
      authRequired: false,
      tooltip: 'Discover trending restaurants and food'
    },
    {
      label: 'Search',
      path: '/search-discovery',
      icon: 'Search',
      authRequired: false,
      tooltip: 'Search and filter restaurants'
    },
    {
      label: 'Profile',
      path: '/user-profile-dashboard',
      icon: 'User',
      authRequired: true,
      tooltip: 'Your profile and favorites'
    },
    {
      label: 'Add',
      path: '/add-restaurant',
      icon: 'Plus',
      authRequired: true,
      tooltip: 'Add a new restaurant'
    }
  ];

  const handleTabChange = (tab) => {
    if (tab?.authRequired) {
      // Check if user is authenticated (you can implement your auth logic here)
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      if (!isAuthenticated) {
        navigate('/login-register-screen', { state: { redirectPath: tab?.path } });
        return;
      }
    }
    navigate(tab?.path);
  };

  const isActiveTab = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav 
        className={`lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-navigation ${className}`}
        style={{ height: 'var(--nav-height-mobile)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around h-full px-2">
          {tabs?.map((tab) => {
            const isActive = isActiveTab(tab?.path);
            return (
              <button
                key={tab?.path}
                onClick={() => handleTabChange(tab)}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-smooth rounded-lg ${
                  isActive 
                    ? 'text-primary bg-accent/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-label={tab?.tooltip}
                title={tab?.tooltip}
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <Icon 
                  name={tab?.icon} 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className="mb-1"
                />
                <span className={`text-xs font-caption leading-tight ${isActive ? 'font-medium' : 'font-normal'}`}>
                  {tab?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      {/* Desktop Header Navigation */}
      <nav 
        className={`hidden lg:flex items-center justify-center bg-card border-b border-border ${className}`}
        style={{ height: 'var(--nav-height-desktop)' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center space-x-8">
          {tabs?.map((tab) => {
            const isActive = isActiveTab(tab?.path);
            return (
              <button
                key={tab?.path}
                onClick={() => handleTabChange(tab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                  isActive 
                    ? 'text-primary bg-accent/20 font-medium' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-label={tab?.tooltip}
                title={tab?.tooltip}
                style={{ minHeight: '40px' }}
              >
                <Icon 
                  name={tab?.icon} 
                  size={20} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-sm font-body ${isActive ? 'font-medium' : 'font-normal'}`}>
                  {tab?.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;
import React from 'react';
import Icon from '../../../components/AppIcon';

const ViewToggle = ({ 
  currentView, 
  onViewChange,
  className = '' 
}) => {
  const views = [
    { value: 'list', label: 'List View', icon: 'List' },
    { value: 'map', label: 'Map View', icon: 'Map' }
  ];

  return (
    <div className={`flex items-center bg-muted/30 rounded-lg p-1 ${className}`}>
      {views?.map((view) => (
        <button
          key={view?.value}
          onClick={() => onViewChange(view?.value)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
            currentView === view?.value
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
          }`}
          aria-label={view?.label}
        >
          <Icon 
            name={view?.icon} 
            size={16} 
            className={currentView === view?.value ? 'text-foreground' : 'text-muted-foreground'}
          />
          <span className="hidden sm:inline">{view?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
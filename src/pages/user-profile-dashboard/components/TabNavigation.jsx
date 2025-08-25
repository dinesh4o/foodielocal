import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-card border-b border-border sticky top-16 lg:top-18 z-10">
      <div className="px-4 lg:px-6">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap border-b-2 transition-smooth ${
                activeTab === tab?.id
                  ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={tab?.icon} 
                size={16} 
                strokeWidth={activeTab === tab?.id ? 2.5 : 2}
              />
              <span className="text-sm">{tab?.label}</span>
              {tab?.count && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab?.id
                    ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
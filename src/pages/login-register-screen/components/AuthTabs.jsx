import React from 'react';

const AuthTabs = ({ activeTab, onTabChange, className = '' }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'register', label: 'Sign Up' }
  ];

  return (
    <div className={`flex bg-muted rounded-lg p-1 ${className}`}>
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
            activeTab === tab?.id
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab?.label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;
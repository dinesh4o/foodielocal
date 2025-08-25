import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProfileHeader = ({ user, stats }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="px-4 lg:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar and Basic Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={user?.avatar}
                alt={`${user?.name}'s profile`}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-2 border-accent"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" strokeWidth={3} />
              </div>
            </div>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
                {user?.name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Member since {user?.joinDate}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{user?.location}</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-foreground">{user?.averageRating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
              <Icon name="Edit" size={16} />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-border rounded-lg hover:bg-muted/50 transition-smooth">
              <Icon name="Share" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-lg lg:text-xl font-heading font-semibold text-foreground">
                {stat?.value}
              </div>
              <div className="text-xs lg:text-sm text-muted-foreground mt-1">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {user?.badges?.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent-foreground rounded-full"
            >
              <Icon name={badge?.icon} size={12} className="text-primary" />
              <span className="text-xs font-medium">{badge?.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsPanel = ({ user, onUpdateProfile, onLogout }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name,
    email: user?.email,
    bio: user?.bio || '',
    location: user?.location,
    phone: user?.phone || ''
  });
  const [notifications, setNotifications] = useState({
    emailReviews: true,
    emailFollowers: true,
    pushReviews: false,
    pushPromotions: true,
    smsUpdates: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    reviewsVisible: true,
    photosVisible: true,
    locationVisible: false
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'account', label: 'Account', icon: 'Settings' }
  ];

  const handleProfileChange = (e) => {
    const { name, value } = e?.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key, checked) => {
    setNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handlePrivacyChange = (key, checked) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleSaveProfile = () => {
    onUpdateProfile(profileData);
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-medium text-foreground mb-4">Profile Information</h3>
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={profileData?.name}
            onChange={handleProfileChange}
            placeholder="Enter your full name"
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={profileData?.email}
            onChange={handleProfileChange}
            placeholder="Enter your email"
          />
          <Input
            label="Phone Number"
            name="phone"
            type="tel"
            value={profileData?.phone}
            onChange={handleProfileChange}
            placeholder="Enter your phone number"
          />
          <Input
            label="Location"
            name="location"
            value={profileData?.location}
            onChange={handleProfileChange}
            placeholder="Enter your city"
          />
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              name="bio"
              value={profileData?.bio}
              onChange={handleProfileChange}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button onClick={handleSaveProfile} className="flex-1">
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-medium text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            label="New reviews on my photos"
            description="Get notified when someone reviews your uploaded photos"
            checked={notifications?.emailReviews}
            onChange={(e) => handleNotificationChange('emailReviews', e?.target?.checked)}
          />
          <Checkbox
            label="New followers"
            description="Get notified when someone follows your profile"
            checked={notifications?.emailFollowers}
            onChange={(e) => handleNotificationChange('emailFollowers', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-medium text-foreground mb-4">Push Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            label="Review interactions"
            description="Get notified about likes and replies on your reviews"
            checked={notifications?.pushReviews}
            onChange={(e) => handleNotificationChange('pushReviews', e?.target?.checked)}
          />
          <Checkbox
            label="Promotions and offers"
            description="Receive notifications about special offers from restaurants"
            checked={notifications?.pushPromotions}
            onChange={(e) => handleNotificationChange('pushPromotions', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-medium text-foreground mb-4">SMS Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            label="Important updates"
            description="Receive SMS for critical account updates"
            checked={notifications?.smsUpdates}
            onChange={(e) => handleNotificationChange('smsUpdates', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-medium text-foreground mb-4">Profile Visibility</h3>
        <div className="space-y-3">
          <Checkbox
            label="Public profile"
            description="Allow others to find and view your profile"
            checked={privacy?.profileVisible}
            onChange={(e) => handlePrivacyChange('profileVisible', e?.target?.checked)}
          />
          <Checkbox
            label="Show my reviews"
            description="Display your reviews on your public profile"
            checked={privacy?.reviewsVisible}
            onChange={(e) => handlePrivacyChange('reviewsVisible', e?.target?.checked)}
          />
          <Checkbox
            label="Show my photos"
            description="Display your uploaded photos on your profile"
            checked={privacy?.photosVisible}
            onChange={(e) => handlePrivacyChange('photosVisible', e?.target?.checked)}
          />
          <Checkbox
            label="Show my location"
            description="Display your city on your profile"
            checked={privacy?.locationVisible}
            onChange={(e) => handlePrivacyChange('locationVisible', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-medium text-foreground mb-4">Account Actions</h3>
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Change Password</h4>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Download Data</h4>
                <p className="text-sm text-muted-foreground">Export your reviews and photos</p>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
          
          <div className="p-4 border border-error/20 bg-error/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-error">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <Button variant="outline" onClick={onLogout} fullWidth>
          Sign Out
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'account':
        return renderAccountSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="lg:flex lg:gap-8">
      {/* Settings Navigation */}
      <div className="lg:w-64 mb-6 lg:mb-0">
        <div className="bg-card border border-border rounded-lg p-2">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-smooth ${
                activeSection === section?.id
                  ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon 
                name={section?.icon} 
                size={16} 
                strokeWidth={activeSection === section?.id ? 2.5 : 2}
              />
              <span className="text-sm font-medium">{section?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Settings Content */}
      <div className="flex-1">
        <div className="bg-card border border-border rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
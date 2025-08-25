import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ onSocialLogin, loading, className = '' }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => onSocialLogin(provider?.id)}
          disabled={loading}
          className={`${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} border transition-smooth`}
        >
          <div className="flex items-center justify-center space-x-3">
            <Icon name={provider?.icon} size={20} />
            <span className="font-medium">Continue with {provider?.name}</span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;
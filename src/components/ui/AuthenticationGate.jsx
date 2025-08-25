import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const AuthenticationGate = ({ 
  isOpen = false, 
  onClose, 
  redirectPath = '/home-dashboard',
  className = '' 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData?.name) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.name || formData?.email?.split('@')?.[0]);
      
      // Close modal and redirect
      onClose();
      const targetPath = location?.state?.redirectPath || redirectPath;
      navigate(targetPath);
      
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-modal flex items-center justify-center p-4 animate-fade-in ${className}`}
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-lg shadow-food-elevated w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              {isLogin ? 'Welcome Back' : 'Join FoodieLocal'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isLogin 
                ? 'Sign in to access your profile and favorites' :'Create an account to start discovering amazing food'
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
            aria-label="Close"
            disabled={loading}
          >
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!isLogin && (
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData?.name}
              onChange={handleInputChange}
              error={errors?.name}
              required
              disabled={loading}
            />
          )}
          
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={loading}
          />
          
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={loading}
          />
          
          {!isLogin && (
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
              disabled={loading}
            />
          )}
          
          {errors?.submit && (
            <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg p-3">
              {errors?.submit}
            </div>
          )}
          
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
              disabled={loading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGate;
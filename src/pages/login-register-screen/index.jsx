import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderContextual from '../../components/ui/HeaderContextual';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import GuestContinueOption from './components/GuestContinueOption';

const LoginRegisterScreen = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for testing
  const mockCredentials = {
    email: "demo@foodielocal.com",
    password: "demo123"
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const redirectPath = location?.state?.redirectPath || '/home-dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, location?.state]);

  const validateLoginForm = (formData) => {
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
    
    return newErrors;
  };

  const validateRegisterForm = (formData) => {
    const newErrors = {};
    
    if (!formData?.name) {
      newErrors.name = 'Name is required';
    } else if (formData?.name?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
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
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

  const handleLogin = async (formData) => {
    const validationErrors = validateLoginForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check mock credentials
    if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
      setErrors({ 
        submit: `Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}` 
      });
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.email?.split('@')?.[0]);
      localStorage.setItem('rememberMe', formData?.rememberMe?.toString());
      
      // Redirect to intended page or dashboard
      const redirectPath = location?.state?.redirectPath || '/home-dashboard';
      navigate(redirectPath, { replace: true });
      
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    const validationErrors = validateRegisterForm(formData);
    
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData?.email);
      localStorage.setItem('userName', formData?.name);
      
      // Redirect to intended page or dashboard
      const redirectPath = location?.state?.redirectPath || '/home-dashboard';
      navigate(redirectPath, { replace: true });
      
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setErrors({});
    
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('userName', `${provider?.charAt(0)?.toUpperCase() + provider?.slice(1)} User`);
      
      // Redirect to intended page or dashboard
      const redirectPath = location?.state?.redirectPath || '/home-dashboard';
      navigate(redirectPath, { replace: true });
      
    } catch (error) {
      setErrors({ submit: `${provider} login failed. Please try again.` });
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    // Set guest mode
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('isGuest', 'true');
    
    // Redirect to home dashboard
    navigate('/home-dashboard', { replace: true });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderContextual
        showBack={true}
        showLogo={true}
        title=""
      />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back!' : 'Join FoodieLocal'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to access your personalized food discovery experience' :'Create an account to start discovering amazing local restaurants'
                }
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-card rounded-lg shadow-food-card border border-border p-6">
              {/* Social Login Buttons */}
              <SocialLoginButtons
                onSocialLogin={handleSocialLogin}
                loading={loading}
                className="mb-6"
              />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or</span>
                </div>
              </div>

              {/* Auth Tabs */}
              <AuthTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
                className="mb-6"
              />

              {/* Forms */}
              {activeTab === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  errors={errors}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  loading={loading}
                  errors={errors}
                />
              )}
            </div>

            {/* Guest Continue Option */}
            <GuestContinueOption
              onContinueAsGuest={handleContinueAsGuest}
              className="mt-6"
            />

            {/* Footer Text */}
            <div className="text-center mt-8">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our{' '}
                <button className="text-primary hover:text-primary/80 underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:text-primary/80 underline">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginRegisterScreen;
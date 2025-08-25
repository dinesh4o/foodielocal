import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onSubmit, loading, errors, className = '' }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(formData);
  };

  const handleForgotPassword = () => {
    // Mock forgot password functionality
    alert('Password reset link would be sent to your email');
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          disabled={loading}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>
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
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
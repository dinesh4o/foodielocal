import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegisterForm = ({ onSubmit, loading, errors, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
        placeholder="Create a password"
        value={formData?.password}
        onChange={handleInputChange}
        error={errors?.password}
        description="Password must be at least 6 characters"
        required
        disabled={loading}
      />
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
      <Checkbox
        label="I agree to the Terms of Service and Privacy Policy"
        name="agreeToTerms"
        checked={formData?.agreeToTerms}
        onChange={handleInputChange}
        error={errors?.agreeToTerms}
        required
        disabled={loading}
      />
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
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderContextual from '../../components/ui/HeaderContextual';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import AuthenticationGate from '../../components/ui/AuthenticationGate';
import Button from '../../components/ui/Button';
import BasicInfoStep from './components/BasicInfoStep';
import LocationStep from './components/LocationStep';
import ContactStep from './components/ContactStep';
import HoursStep from './components/HoursStep';
import PhotosStep from './components/PhotosStep';
import ReviewStep from './components/ReviewStep';
import ProgressIndicator from './components/ProgressIndicator';
import SuccessModal from './components/SuccessModal';

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const steps = [
    { title: 'Basic Info', subtitle: 'Restaurant details' },
    { title: 'Location', subtitle: 'Address & map' },
    { title: 'Contact', subtitle: 'Phone & website' },
    { title: 'Hours', subtitle: 'Operating times' },
    { title: 'Photos', subtitle: 'Visual showcase' },
    { title: 'Review', subtitle: 'Final check' }
  ];

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      setShowAuthGate(true);
    }
  }, []);

  // Load draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem('restaurantDraft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
        setIsDraftSaved(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save draft
  useEffect(() => {
    if (Object.keys(formData)?.length > 0) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem('restaurantDraft', JSON.stringify(formData));
        setIsDraftSaved(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [formData]);

  const handleFormDataChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user makes changes
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    setIsDraftSaved(false);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Basic Info
        if (!formData?.name?.trim()) newErrors.name = 'Restaurant name is required';
        if (!formData?.cuisineType) newErrors.cuisineType = 'Cuisine type is required';
        if (!formData?.priceRange) newErrors.priceRange = 'Price range is required';
        break;

      case 1: // Location
        if (!formData?.address?.trim()) newErrors.address = 'Address is required';
        if (!formData?.city?.trim()) newErrors.city = 'City is required';
        if (!formData?.state?.trim()) newErrors.state = 'State is required';
        if (!formData?.zipCode?.trim()) newErrors.zipCode = 'ZIP code is required';
        if (!formData?.country?.trim()) newErrors.country = 'Country is required';
        break;

      case 2: // Contact
        if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (formData?.email && !/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (formData?.website && !formData?.website?.startsWith('http')) {
          newErrors.website = 'Website URL must start with http:// or https://';
        }
        break;

      case 3: // Hours
        const hasOpenDays = formData?.businessHours && 
          Object.values(formData?.businessHours)?.some(day => day?.isOpen);
        if (!hasOpenDays) {
          newErrors.businessHours = 'Please set operating hours for at least one day';
        }
        break;

      case 4: // Photos
        if (!formData?.photos || formData?.photos?.length === 0) {
          newErrors.photos = 'Please add at least one photo of the restaurant';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepEdit = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return; // Validate photos step

    setIsSubmitting(true);

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      localStorage.removeItem('restaurantDraft');
      
      // Show success modal
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit restaurant. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('restaurantDraft', JSON.stringify(formData));
    setIsDraftSaved(true);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem('restaurantDraft');
    setFormData({});
    setCurrentStep(0);
    setIsDraftSaved(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 1:
        return (
          <LocationStep
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <ContactStep
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <HoursStep
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 4:
        return (
          <PhotosStep
            formData={formData}
            onChange={handleFormDataChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <ReviewStep
            formData={formData}
            onEdit={handleStepEdit}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const headerActions = [
    {
      icon: 'Save',
      label: 'Save Draft',
      onClick: handleSaveDraft,
      variant: isDraftSaved ? 'ghost' : 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderContextual
        showBack={true}
        title="Add Restaurant"
        actions={headerActions}
        showLogo={false}
      />
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={steps?.length}
        steps={steps}
      />
      <main 
        className="pt-4 pb-24 lg:pb-8"
        style={{ 
          marginTop: 'calc(var(--header-height-mobile) + 80px)',
          minHeight: 'calc(100vh - var(--header-height-mobile) - 80px)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          {/* Draft Status */}
          {isDraftSaved && Object.keys(formData)?.length > 0 && (
            <div className="mb-6 bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-sm font-medium text-success">
                    Draft saved automatically
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDiscardDraft}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Discard Draft
                </Button>
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < steps?.length - 1 && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {currentStep + 1} of {steps?.length}
                </span>
              </div>

              <Button
                variant="default"
                onClick={handleNext}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            </div>
          )}

          {/* Error Display */}
          {errors?.submit && (
            <div className="mt-6 text-sm text-error bg-error/10 border border-error/20 rounded-lg p-4">
              {errors?.submit}
            </div>
          )}
        </div>
      </main>
      <BottomTabNavigation />
      <AuthenticationGate
        isOpen={showAuthGate}
        onClose={() => setShowAuthGate(false)}
        redirectPath="/add-restaurant"
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        restaurantData={formData}
      />
    </div>
  );
};

export default AddRestaurant;
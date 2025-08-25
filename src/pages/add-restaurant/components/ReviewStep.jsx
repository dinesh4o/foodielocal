import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewStep = ({ formData, onEdit, onSubmit, isSubmitting }) => {
  const formatBusinessHours = (hours) => {
    if (!hours) return 'Not specified';
    
    const daysOfWeek = [
      { key: 'monday', label: 'Mon' },
      { key: 'tuesday', label: 'Tue' },
      { key: 'wednesday', label: 'Wed' },
      { key: 'thursday', label: 'Thu' },
      { key: 'friday', label: 'Fri' },
      { key: 'saturday', label: 'Sat' },
      { key: 'sunday', label: 'Sun' }
    ];

    return daysOfWeek?.map(({ key, label }) => {
      const dayHours = hours?.[key];
      if (!dayHours || !dayHours?.isOpen) {
        return `${label}: Closed`;
      }
      
      const formatTime = (time24) => {
        const [hour, minute] = time24?.split(':');
        const hour12 = hour === '00' ? 12 : hour > 12 ? hour - 12 : parseInt(hour);
        const ampm = hour < 12 ? 'AM' : 'PM';
        return `${hour12}:${minute} ${ampm}`;
      };
      
      return `${label}: ${formatTime(dayHours?.openTime)} - ${formatTime(dayHours?.closeTime)}`;
    })?.join('\n');
  };

  const sections = [
    {
      title: 'Basic Information',
      step: 0,
      items: [
        { label: 'Restaurant Name', value: formData?.name || 'Not specified' },
        { label: 'Cuisine Type', value: formData?.cuisineType || 'Not specified' },
        { label: 'Price Range', value: formData?.priceRange || 'Not specified' },
        { label: 'Description', value: formData?.description || 'Not specified' }
      ]
    },
    {
      title: 'Location',
      step: 1,
      items: [
        { label: 'Address', value: formData?.address || 'Not specified' },
        { label: 'City', value: formData?.city || 'Not specified' },
        { label: 'State', value: formData?.state || 'Not specified' },
        { label: 'ZIP Code', value: formData?.zipCode || 'Not specified' },
        { label: 'Country', value: formData?.country || 'Not specified' }
      ]
    },
    {
      title: 'Contact Information',
      step: 2,
      items: [
        { label: 'Phone', value: formData?.phone || 'Not specified' },
        { label: 'Website', value: formData?.website || 'Not specified' },
        { label: 'Email', value: formData?.email || 'Not specified' },
        { label: 'Facebook', value: formData?.facebook || 'Not specified' },
        { label: 'Instagram', value: formData?.instagram || 'Not specified' }
      ]
    },
    {
      title: 'Business Hours',
      step: 3,
      items: [
        { 
          label: 'Operating Hours', 
          value: formatBusinessHours(formData?.businessHours),
          isMultiline: true 
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Review & Submit
        </h2>
        <p className="text-muted-foreground">
          Please review all information before submitting your restaurant
        </p>
      </div>
      <div className="space-y-6">
        {/* Restaurant Preview Card */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">
            How your listing will appear:
          </h3>
          
          <div className="bg-background border border-border rounded-lg p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Main Photo */}
              <div className="w-full md:w-48 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                {formData?.photos && formData?.photos?.length > 0 ? (
                  <Image
                    src={formData?.photos?.[0]?.url}
                    alt={formData?.name || 'Restaurant'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="ImageOff" size={24} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {/* Restaurant Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-lg font-medium text-foreground truncate">
                    {formData?.name || 'Restaurant Name'}
                  </h4>
                  <span className="text-sm font-medium text-primary ml-2">
                    {formData?.priceRange || '$'}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {formData?.cuisineType || 'Cuisine Type'} • {formData?.city || 'City'}, {formData?.state || 'State'}
                </p>
                
                {formData?.description && (
                  <p className="text-sm text-foreground mb-2 line-clamp-2">
                    {formData?.description}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {formData?.phone && (
                    <span className="flex items-center">
                      <Icon name="Phone" size={12} className="mr-1" />
                      {formData?.phone}
                    </span>
                  )}
                  {formData?.website && (
                    <span className="flex items-center">
                      <Icon name="Globe" size={12} className="mr-1" />
                      Website
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Sections */}
        {sections?.map((section) => (
          <div key={section?.title} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                {section?.title}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(section?.step)}
                iconName="Edit2"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>
            
            <div className="space-y-3">
              {section?.items?.map((item) => (
                <div key={item?.label} className="flex flex-col sm:flex-row sm:items-start">
                  <span className="text-sm font-medium text-muted-foreground w-full sm:w-32 flex-shrink-0 mb-1 sm:mb-0">
                    {item?.label}:
                  </span>
                  <span className={`text-sm text-foreground flex-1 ${item?.isMultiline ? 'whitespace-pre-line' : ''}`}>
                    {item?.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Photos Section */}
        {formData?.photos && formData?.photos?.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-foreground">
                Photos ({formData?.photos?.length})
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onEdit(4)}
                iconName="Edit2"
                iconPosition="left"
              >
                Edit
              </Button>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {formData?.photos?.slice(0, 6)?.map((photo, index) => (
                <div key={photo?.id} className="aspect-square bg-muted rounded overflow-hidden">
                  <Image
                    src={photo?.url}
                    alt={`Restaurant photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {formData?.photos?.length > 6 && (
                <div className="aspect-square bg-muted rounded flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">
                    +{formData?.photos?.length - 6} more
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Section */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Ready to Submit?
              </h3>
              <p className="text-sm text-muted-foreground">
                Your restaurant will be reviewed by our team and published within 24-48 hours.
                You'll receive an email confirmation once it's live.
              </p>
            </div>
            
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={onSubmit}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Submit Restaurant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
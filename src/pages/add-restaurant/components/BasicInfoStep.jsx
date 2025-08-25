import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicInfoStep = ({ formData, onChange, errors }) => {
  const cuisineOptions = [
    { value: 'american', label: 'American' },
    { value: 'italian', label: 'Italian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'indian', label: 'Indian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'french', label: 'French' },
    { value: 'korean', label: 'Korean' },
    { value: 'vietnamese', label: 'Vietnamese' },
    { value: 'greek', label: 'Greek' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'turkish', label: 'Turkish' },
    { value: 'lebanese', label: 'Lebanese' },
    { value: 'other', label: 'Other' }
  ];

  const priceRangeOptions = [
    { value: '$', label: '$ - Budget Friendly (Under $15)' },
    { value: '$$', label: '$$ - Moderate ($15-30)' },
    { value: '$$$', label: '$$$ - Upscale ($30-60)' },
    { value: '$$$$', label: '$$$$ - Fine Dining ($60+)' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Basic Information
        </h2>
        <p className="text-muted-foreground">
          Let's start with the essential details about this restaurant
        </p>
      </div>
      <div className="space-y-4">
        <Input
          label="Restaurant Name"
          type="text"
          placeholder="Enter the restaurant name"
          value={formData?.name || ''}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
          description="The official name as it appears on signage"
        />

        <Select
          label="Cuisine Type"
          placeholder="Select primary cuisine type"
          options={cuisineOptions}
          value={formData?.cuisineType || ''}
          onChange={(value) => handleInputChange('cuisineType', value)}
          error={errors?.cuisineType}
          required
          searchable
          description="Choose the main type of cuisine served"
        />

        <Select
          label="Price Range"
          placeholder="Select price range"
          options={priceRangeOptions}
          value={formData?.priceRange || ''}
          onChange={(value) => handleInputChange('priceRange', value)}
          error={errors?.priceRange}
          required
          description="Average cost per person for a typical meal"
        />

        <Input
          label="Short Description"
          type="text"
          placeholder="Brief description of the restaurant"
          value={formData?.description || ''}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          error={errors?.description}
          description="A catchy one-line description (optional)"
          maxLength={120}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;
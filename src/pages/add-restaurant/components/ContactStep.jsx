import React from 'react';
import Input from '../../../components/ui/Input';

const ContactStep = ({ formData, onChange, errors }) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value?.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits?.length >= 10) {
      return `(${digits?.slice(0, 3)}) ${digits?.slice(3, 6)}-${digits?.slice(6, 10)}`;
    } else if (digits?.length >= 6) {
      return `(${digits?.slice(0, 3)}) ${digits?.slice(3, 6)}-${digits?.slice(6)}`;
    } else if (digits?.length >= 3) {
      return `(${digits?.slice(0, 3)}) ${digits?.slice(3)}`;
    }
    return digits;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange('phone', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-muted-foreground">
          Provide contact details so customers can reach the restaurant
        </p>
      </div>
      <div className="space-y-4">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData?.phone || ''}
          onChange={handlePhoneChange}
          error={errors?.phone}
          required
          description="Primary phone number for reservations and inquiries"
        />

        <Input
          label="Website URL"
          type="url"
          placeholder="https://www.restaurant-website.com"
          value={formData?.website || ''}
          onChange={(e) => handleInputChange('website', e?.target?.value)}
          error={errors?.website}
          description="Official website (optional)"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="contact@restaurant.com"
          value={formData?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="Contact email for business inquiries (optional)"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Facebook Page"
            type="url"
            placeholder="https://facebook.com/restaurant"
            value={formData?.facebook || ''}
            onChange={(e) => handleInputChange('facebook', e?.target?.value)}
            error={errors?.facebook}
            description="Facebook page URL (optional)"
          />

          <Input
            label="Instagram Handle"
            type="text"
            placeholder="@restaurantname"
            value={formData?.instagram || ''}
            onChange={(e) => handleInputChange('instagram', e?.target?.value)}
            error={errors?.instagram}
            description="Instagram username (optional)"
          />
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-accent-foreground">i</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">
                Contact Information Tips
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Phone number is required for customer inquiries</li>
                <li>• Website and social media help customers learn more</li>
                <li>• All contact info will be publicly visible on your listing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStep;
import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const LocationStep = ({ formData, onChange, errors }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: formData?.latitude || 40.7128,
    lng: formData?.longitude || -74.0060
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          handleInputChange('latitude', latitude);
          handleInputChange('longitude', longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleAddressChange = (e) => {
    const address = e?.target?.value;
    handleInputChange('address', address);
    
    // Simulate geocoding for demo
    if (address?.toLowerCase()?.includes('new york')) {
      setMapCenter({ lat: 40.7128, lng: -74.0060 });
    } else if (address?.toLowerCase()?.includes('los angeles')) {
      setMapCenter({ lat: 34.0522, lng: -118.2437 });
    } else if (address?.toLowerCase()?.includes('chicago')) {
      setMapCenter({ lat: 41.8781, lng: -87.6298 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Location Details
        </h2>
        <p className="text-muted-foreground">
          Help people find this restaurant with accurate location information
        </p>
      </div>
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Street Address"
            type="text"
            placeholder="Enter the full street address"
            value={formData?.address || ''}
            onChange={handleAddressChange}
            error={errors?.address}
            required
            description="Include street number, street name, and any unit/suite numbers"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGetCurrentLocation}
            loading={isLocating}
            iconName="MapPin"
            iconPosition="left"
            className="absolute right-2 top-8"
          >
            Use Current Location
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />

          <Input
            label="State/Province"
            type="text"
            placeholder="Enter state or province"
            value={formData?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="ZIP/Postal Code"
            type="text"
            placeholder="Enter ZIP or postal code"
            value={formData?.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />

          <Input
            label="Country"
            type="text"
            placeholder="Enter country"
            value={formData?.country || 'United States'}
            onChange={(e) => handleInputChange('country', e?.target?.value)}
            error={errors?.country}
            required
          />
        </div>

        {/* Map Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Location Preview
          </label>
          <div className="w-full h-64 bg-muted rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Restaurant Location"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=15&output=embed`}
              className="border-0"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            The map will update automatically as you enter the address
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
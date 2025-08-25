import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const HoursStep = ({ formData, onChange, errors }) => {
  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour?.toString()?.padStart(2, '0')}:${minute?.toString()?.padStart(2, '0')}`;
      const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const ampm = hour < 12 ? 'AM' : 'PM';
      const time12 = `${hour12}:${minute?.toString()?.padStart(2, '0')} ${ampm}`;
      timeOptions?.push({ value: time24, label: time12 });
    }
  }

  const handleHoursChange = (day, field, value) => {
    const currentHours = formData?.businessHours || {};
    const dayHours = currentHours?.[day] || { isOpen: false, openTime: '09:00', closeTime: '21:00' };
    
    onChange('businessHours', {
      ...currentHours,
      [day]: {
        ...dayHours,
        [field]: value
      }
    });
  };

  const handleCopyToAll = (sourceDay) => {
    const currentHours = formData?.businessHours || {};
    const sourceHours = currentHours?.[sourceDay];
    
    if (!sourceHours) return;
    
    const newHours = {};
    daysOfWeek?.forEach(({ key }) => {
      newHours[key] = { ...sourceHours };
    });
    
    onChange('businessHours', newHours);
  };

  const getHoursForDay = (day) => {
    const hours = formData?.businessHours?.[day];
    return hours || { isOpen: false, openTime: '09:00', closeTime: '21:00' };
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Business Hours
        </h2>
        <p className="text-muted-foreground">
          Set the operating hours for each day of the week
        </p>
      </div>
      <div className="space-y-4">
        {daysOfWeek?.map(({ key, label }) => {
          const dayHours = getHoursForDay(key);
          
          return (
            <div key={key} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={dayHours?.isOpen}
                    onChange={(e) => handleHoursChange(key, 'isOpen', e?.target?.checked)}
                  />
                  <span className="font-medium text-foreground">{label}</span>
                </div>
                
                {dayHours?.isOpen && (
                  <button
                    type="button"
                    onClick={() => handleCopyToAll(key)}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Copy to all days
                  </button>
                )}
              </div>
              {dayHours?.isOpen ? (
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Opening Time"
                    options={timeOptions}
                    value={dayHours?.openTime}
                    onChange={(value) => handleHoursChange(key, 'openTime', value)}
                    searchable
                  />
                  
                  <Select
                    label="Closing Time"
                    options={timeOptions}
                    value={dayHours?.closeTime}
                    onChange={(value) => handleHoursChange(key, 'closeTime', value)}
                    searchable
                  />
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="text-muted-foreground text-sm">Closed</span>
                </div>
              )}
            </div>
          );
        })}

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-accent-foreground">i</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-1">
                Business Hours Tips
              </h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Use "Copy to all days" for consistent hours</li>
                <li>• Leave days unchecked if the restaurant is closed</li>
                <li>• Consider lunch/dinner breaks for accurate hours</li>
                <li>• Hours can be updated later if they change</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoursStep;
import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full bg-card border-b border-border p-4">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Progress Bar */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
          
          <div className="mt-2 text-center">
            <span className="text-sm font-medium text-foreground">
              {steps?.[currentStep]?.title}
            </span>
          </div>
        </div>

        {/* Desktop Step Indicator */}
        <div className="hidden lg:flex items-center justify-between">
          {steps?.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isUpcoming = index > currentStep;
            
            return (
              <React.Fragment key={index}>
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isActive 
                        ? 'border-primary text-primary bg-primary/10' :'border-muted-foreground/30 text-muted-foreground bg-background'
                    }
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} strokeWidth={2.5} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  {/* Step Label */}
                  <div className="ml-3">
                    <div className={`text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-foreground' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </div>
                    {step?.subtitle && (
                      <div className="text-xs text-muted-foreground">
                        {step?.subtitle}
                      </div>
                    )}
                  </div>
                </div>
                {/* Connector Line */}
                {index < steps?.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
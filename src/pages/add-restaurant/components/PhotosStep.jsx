import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotosStep = ({ formData, onChange, errors }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const sampleImages = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=400&h=300&fit=crop",
    "https://images.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784_1280.jpg?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?w=400&h=300&fit=crop"
  ];

  const handleFileSelect = (files) => {
    const currentPhotos = formData?.photos || [];
    const newPhotos = [];
    
    Array.from(files)?.forEach((file, index) => {
      if (file?.type?.startsWith('image/') && currentPhotos?.length + newPhotos?.length < 10) {
        // For demo purposes, use sample images
        const sampleIndex = (currentPhotos?.length + index) % sampleImages?.length;
        newPhotos?.push({
          id: Date.now() + index,
          url: sampleImages?.[sampleIndex],
          name: file?.name,
          size: file?.size,
          type: file?.type
        });
      }
    });
    
    onChange('photos', [...currentPhotos, ...newPhotos]);
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files);
    }
  };

  const removePhoto = (photoId) => {
    const currentPhotos = formData?.photos || [];
    onChange('photos', currentPhotos?.filter(photo => photo?.id !== photoId));
  };

  const movePhoto = (photoId, direction) => {
    const currentPhotos = formData?.photos || [];
    const index = currentPhotos?.findIndex(photo => photo?.id === photoId);
    
    if (index === -1) return;
    
    const newPhotos = [...currentPhotos];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newPhotos?.length) {
      [newPhotos[index], newPhotos[newIndex]] = [newPhotos?.[newIndex], newPhotos?.[index]];
      onChange('photos', newPhotos);
    }
  };

  const photos = formData?.photos || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Restaurant Photos
        </h2>
        <p className="text-muted-foreground">
          Add high-quality photos to showcase the restaurant's atmosphere and food
        </p>
      </div>
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Icon name="Upload" size={24} className="text-muted-foreground" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload Restaurant Photos
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop photos here, or click to browse
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef?.current?.click()}
                iconName="Plus"
                iconPosition="left"
              >
                Choose Photos
              </Button>
            </div>
          </div>
        </div>

        {/* Photo Guidelines */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Photo Guidelines
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Upload up to 10 high-quality photos</li>
            <li>• Include exterior, interior, and food photos</li>
            <li>• First photo will be used as the main image</li>
            <li>• Recommended size: at least 1024x768 pixels</li>
            <li>• Accepted formats: JPG, PNG, WebP</li>
          </ul>
        </div>

        {/* Photo Preview Grid */}
        {photos?.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">
                Uploaded Photos ({photos?.length}/10)
              </h3>
              {photos?.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange('photos', [])}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Remove All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos?.map((photo, index) => (
                <div key={photo?.id} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={photo?.url}
                      alt={`Restaurant photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Photo Controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth rounded-lg flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => movePhoto(photo?.id, 'up')}
                          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-smooth"
                          title="Move left"
                        >
                          <Icon name="ChevronLeft" size={16} className="text-white" />
                        </button>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => removePhoto(photo?.id)}
                        className="w-8 h-8 bg-error/80 hover:bg-error rounded-full flex items-center justify-center transition-smooth"
                        title="Remove photo"
                      >
                        <Icon name="Trash2" size={16} className="text-white" />
                      </button>
                      
                      {index < photos?.length - 1 && (
                        <button
                          type="button"
                          onClick={() => movePhoto(photo?.id, 'down')}
                          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-smooth"
                          title="Move right"
                        >
                          <Icon name="ChevronRight" size={16} className="text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Main Photo Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                      Main Photo
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {errors?.photos && (
          <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg p-3">
            {errors?.photos}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosStep;
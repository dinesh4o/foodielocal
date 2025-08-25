import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  const nextPhoto = () => {
    const nextIndex = currentIndex === photos?.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos?.[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = currentIndex === 0 ? photos?.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos?.[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Escape') closeLightbox();
    if (e?.key === 'ArrowRight') nextPhoto();
    if (e?.key === 'ArrowLeft') prevPhoto();
  };

  React.useEffect(() => {
    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedPhoto, currentIndex]);

  return (
    <>
      <div className="bg-card rounded-lg shadow-food-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-foreground">Photos</h2>
            <span className="text-sm text-muted-foreground">{photos?.length} photos</span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos?.map((photo, index) => (
              <div
                key={photo?.id}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group hover-scale"
                onClick={() => openLightbox(photo, index)}
              >
                <Image
                  src={photo?.url}
                  alt={photo?.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                  <Icon 
                    name="ZoomIn" 
                    size={24} 
                    className="text-white opacity-0 group-hover:opacity-100 transition-smooth"
                  />
                </div>
                {photo?.userSubmitted && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-modal flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
              aria-label="Close photo"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Navigation Arrows */}
            {photos?.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    prevPhoto();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
                  aria-label="Previous photo"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e?.stopPropagation();
                    nextPhoto();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth z-10"
                  aria-label="Next photo"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Photo */}
            <div className="relative" onClick={(e) => e?.stopPropagation()}>
              <Image
                src={selectedPhoto?.url}
                alt={selectedPhoto?.caption || 'Restaurant photo'}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {/* Photo Info */}
              {selectedPhoto?.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                  <p className="text-white text-sm">{selectedPhoto?.caption}</p>
                  {selectedPhoto?.userSubmitted && (
                    <p className="text-white/70 text-xs mt-1">
                      Photo by {selectedPhoto?.submittedBy}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Photo Counter */}
            {photos?.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} of {photos?.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PhotoGrid = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-medium text-foreground">
          Your Photos ({photos?.length})
        </h3>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center justify-center w-8 h-8 rounded transition-smooth ${
              viewMode === 'grid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center justify-center w-8 h-8 rounded transition-smooth ${
              viewMode === 'list' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
      {photos?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Camera" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-foreground mb-2">No photos yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start sharing your food experiences by uploading photos
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth">
            Upload First Photo
          </button>
        </div>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {photos?.map((photo) => (
                <div
                  key={photo?.id}
                  className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <Image
                    src={photo?.url}
                    alt={`Photo at ${photo?.restaurant?.name}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                      <p className="text-xs text-white font-medium truncate">
                        {photo?.restaurant?.name}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    {photo?.likes > 0 && (
                      <div className="bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
                        <Icon name="Heart" size={10} className="text-error fill-current" />
                        <span className="text-xs text-white">{photo?.likes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {photos?.map((photo) => (
                <div
                  key={photo?.id}
                  className="flex items-center gap-4 p-3 bg-card border border-border rounded-lg hover:shadow-food-card transition-smooth cursor-pointer"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <Image
                    src={photo?.url}
                    alt={`Photo at ${photo?.restaurant?.name}`}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground truncate">
                      {photo?.restaurant?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {photo?.restaurant?.cuisine} • {photo?.restaurant?.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(photo?.uploadDate)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={14} />
                      <span>{photo?.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={14} />
                      <span>{photo?.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {/* Photo Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-modal flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-food-elevated">
              <Image
                src={selectedPhoto?.url}
                alt={`Photo at ${selectedPhoto?.restaurant?.name}`}
                className="w-full max-h-96 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-medium text-foreground">
                    {selectedPhoto?.restaurant?.name}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(selectedPhoto?.uploadDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {selectedPhoto?.restaurant?.cuisine} • {selectedPhoto?.restaurant?.location}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={16} className="text-error" />
                    <span className="text-sm text-foreground">{selectedPhoto?.likes} likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{selectedPhoto?.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGrid;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CategoryFilters = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All', icon: 'Grid3X3', count: 150 },
    { id: 'italian', name: 'Italian', icon: 'Pizza', count: 24 },
    { id: 'asian', name: 'Asian', icon: 'Soup', count: 32 },
    { id: 'american', name: 'American', icon: 'Beef', count: 28 },
    { id: 'mexican', name: 'Mexican', icon: 'Pepper', count: 18 },
    { id: 'coffee', name: 'Coffee', icon: 'Coffee', count: 22 },
    { id: 'dessert', name: 'Desserts', icon: 'IceCream', count: 16 },
    { id: 'healthy', name: 'Healthy', icon: 'Salad', count: 20 }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      navigate('/search-discovery');
    } else {
      navigate(`/search-discovery?category=${categoryId}`);
    }
  };

  return (
    <section className={`mb-8 ${className}`}>
      <div className="mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-1">
          Browse Categories 🍽️
        </h2>
        <p className="text-sm text-muted-foreground">
          Discover restaurants by cuisine type
        </p>
      </div>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category?.id;
          return (
            <button
              key={category?.id}
              onClick={() => handleCategoryClick(category?.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 p-4 rounded-lg border transition-smooth min-w-[80px] ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-foreground border-border hover:border-primary/30 hover:bg-muted/30'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                isSelected ? 'bg-white/20' : 'bg-muted/50'
              }`}>
                <Icon 
                  name={category?.icon} 
                  size={20} 
                  className={isSelected ? 'text-primary-foreground' : 'text-muted-foreground'} 
                />
              </div>
              <div className="text-center">
                <p className={`text-xs font-medium ${
                  isSelected ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {category?.name}
                </p>
                <p className={`text-xs ${
                  isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {category?.count}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFilters;
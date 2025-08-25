import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MenuSection = ({ menu }) => {
  const [activeCategory, setActiveCategory] = useState(menu?.[0]?.category || '');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleItemExpansion = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(itemId)) {
      newExpanded?.delete(itemId);
    } else {
      newExpanded?.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="bg-card rounded-lg shadow-food-card overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-heading font-semibold text-foreground">Menu</h2>
      </div>
      {/* Category Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto scrollbar-hide">
          {menu?.map((category) => (
            <button
              key={category?.category}
              onClick={() => setActiveCategory(category?.category)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-smooth ${
                activeCategory === category?.category
                  ? 'border-primary text-primary bg-accent/10' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {category?.category}
            </button>
          ))}
        </div>
      </div>
      {/* Menu Items */}
      <div className="p-6">
        {menu?.filter((category) => category?.category === activeCategory)?.map((category) => (
            <div key={category?.category} className="space-y-4">
              {category?.items?.map((item) => (
                <div
                  key={item?.id}
                  className="border border-border rounded-lg p-4 hover:shadow-food-card transition-smooth"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-foreground">{item?.name}</h3>
                        {item?.isPopular && (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                        {item?.isVegetarian && (
                          <Icon name="Leaf" size={16} className="text-success" />
                        )}
                        {item?.isSpicy && (
                          <span className="text-red-500 text-sm">🌶️</span>
                        )}
                      </div>
                      
                      <p className={`text-sm text-muted-foreground mb-2 ${
                        expandedItems?.has(item?.id) ? '' : 'line-clamp-2'
                      }`}>
                        {item?.description}
                      </p>
                      
                      {item?.description?.length > 100 && (
                        <button
                          onClick={() => toggleItemExpansion(item?.id)}
                          className="text-primary text-sm font-medium hover:text-primary/80 transition-smooth"
                        >
                          {expandedItems?.has(item?.id) ? 'Show less' : 'Show more'}
                        </button>
                      )}
                      
                      {item?.allergens && item?.allergens?.length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Icon name="AlertTriangle" size={14} className="text-warning" />
                          <span className="text-xs text-muted-foreground">
                            Contains: {item?.allergens?.join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end ml-4">
                      <span className="font-semibold text-foreground">${item?.price}</span>
                      {item?.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item?.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {item?.customizations && item?.customizations?.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-2">Customizations available:</p>
                      <div className="flex flex-wrap gap-1">
                        {item?.customizations?.map((custom, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                          >
                            {custom}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuSection;
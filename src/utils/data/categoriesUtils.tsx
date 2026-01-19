import categoriesData from '@/data/categoriesData.json';
import {
  Star,
  Moon,
  Hash,
  HandMetal,
  Mountain,
  Sparkles,
  Compass,
  Sun
} from 'lucide-react';
import React from 'react';

// Render function to convert string names to JSX elements
const renderIcon = (iconName: string) => {
  const iconClass = 'h-6 w-6 text-white';

  switch (iconName) {
    case 'Star':
      return <Star className={iconClass} />;
    case 'Moon':
      return <Moon className={iconClass} />;
    case 'Hash':
      return <Hash className={iconClass} />;
    case 'HandMetal':
      return <HandMetal className={iconClass} />;
    case 'Mountain':
      return <Mountain className={iconClass} />;
    case 'Sparkles':
      return <Sparkles className={iconClass} />;
    case 'Compass':
      return <Compass className={iconClass} />;
    case 'Sun':
      return <Sun className={iconClass} />;
    default:
      return <Star className={iconClass} />;
  }
};

export const getCategories = () => {
  return categoriesData.categories.map((category) => ({
    ...category,
    // ✅ icon now contains JSX, not string
    icon: renderIcon(category.icon)
  }));
};


import React from 'react';
import { Filter } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedOption: string;
  onChange: (id: string) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, options, selectedOption, onChange }) => {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.id} className="flex items-center">
            <input
              type="radio"
              id={option.id}
              name={title.toLowerCase().replace(/\s+/g, '-')}
              checked={selectedOption === option.id}
              onChange={() => onChange(option.id)}
              className="mr-2"
            />
            <label htmlFor={option.id} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface FilterSidebarProps {
  categories: string[];
  priceRanges: string[];
  levels: string[];
  selectedCategory: string;
  selectedPrice: string;
  selectedLevel: string;
  onCategoryChange: (categoryId: string) => void;
  onPriceChange: (priceId: string) => void;
  onLevelChange: (levelId: string) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  priceRanges,
  levels,
  selectedCategory,
  selectedPrice,
  selectedLevel,
  onCategoryChange,
  onPriceChange,
  onLevelChange,
  onResetFilters,
}) => {
  const categoryOptions = categories.map((category, index) => ({
    id: `category-${index}`,
    label: category,
  }));

  const priceOptions = priceRanges.map((price, index) => ({
    id: `price-${index}`,
    label: price,
  }));

  const levelOptions = levels.map((level, index) => ({
    id: `level-${index}`,
    label: level,
  }));

  return (
    <div className="w-full md:w-64">
      <div className="sticky top-24">
        <div className="bg-card rounded-lg border border-border p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Filters</h3>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
          
          {/* Category Filter */}
          <FilterGroup
            title="Category"
            options={categoryOptions}
            selectedOption={selectedCategory}
            onChange={onCategoryChange}
          />
          
          {/* Price Range Filter */}
          <FilterGroup
            title="Price Range"
            options={priceOptions}
            selectedOption={selectedPrice}
            onChange={onPriceChange}
          />
          
          {/* Level Filter */}
          <FilterGroup
            title="Level"
            options={levelOptions}
            selectedOption={selectedLevel}
            onChange={onLevelChange}
          />
        </div>
        
        <ButtonCustom variant="outline" className="w-full" onClick={onResetFilters}>
          Reset Filters
        </ButtonCustom>
      </div>
    </div>
  );
};

export default FilterSidebar;

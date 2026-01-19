
import React from 'react';
import { X } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { motion } from 'framer-motion';

interface Filter {
  type: string;
  label: string;
}

interface ActiveFiltersProps {
  filters: Filter[];
  onRemoveFilter: (type: string, value: string) => void;
  onClearAll: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  onRemoveFilter,
  onClearAll
}) => {
  if (filters.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-wrap items-center gap-2"
    >
      <span className="text-sm text-muted-foreground">Active filters:</span>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <motion.div
            key={`${filter.type}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onRemoveFilter(filter.type, filter.label)}
              className="ml-1 rounded-full p-0.5 hover:bg-primary/20"
              aria-label={`Remove filter ${filter.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
        <ButtonCustom
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="ml-2 h-7 text-xs"
        >
          Clear all
        </ButtonCustom>
      </div>
    </motion.div>
  );
};

export default ActiveFilters;

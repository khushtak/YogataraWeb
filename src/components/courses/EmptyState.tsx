
import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  onReset: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex items-center justify-center"
    >
      <div className="text-center py-12 px-6 max-w-md mx-auto">
        <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No courses found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find any courses matching your current filters. 
          Try adjusting your search criteria or browse our other offerings.
        </p>
        <ButtonCustom onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset Filters
        </ButtonCustom>
      </div>
    </motion.div>
  );
};

export default EmptyState;

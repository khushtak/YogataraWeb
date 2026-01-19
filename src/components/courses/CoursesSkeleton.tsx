
import React from 'react';
import { motion } from 'framer-motion';

const CoursesSkeleton: React.FC = () => {
  // Create an array of 6 skeleton cards
  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 w-40 bg-muted-foreground/10 rounded animate-pulse"></div>
        <div className="h-10 w-44 bg-muted-foreground/10 rounded animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonCards.map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border border-border rounded-xl overflow-hidden bg-card shadow-sm"
          >
            <div className="aspect-[16/9] bg-muted-foreground/10 animate-pulse"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-muted-foreground/10 rounded animate-pulse"></div>
              <div className="h-4 w-1/2 bg-muted-foreground/10 rounded animate-pulse"></div>
              <div className="flex justify-between pt-4">
                <div className="h-4 w-1/3 bg-muted-foreground/10 rounded animate-pulse"></div>
                <div className="h-4 w-1/4 bg-muted-foreground/10 rounded animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesSkeleton;

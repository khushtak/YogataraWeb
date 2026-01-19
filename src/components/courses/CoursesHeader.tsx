
import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { motion } from 'framer-motion';

interface CoursesHeaderProps {
  searchTerm?: string;
  isSearching?: boolean;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit?: () => void;
}

const CoursesHeader: React.FC<CoursesHeaderProps> = ({
  searchTerm = '',
  isSearching = false,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Explore Our Courses
          </h1>
          <p className="text-muted-foreground mb-8">
            Discover comprehensive courses on Vedic astrology, numerology, tarot, palmistry, and other ancient divination arts.
          </p>
          
          {/* Search Bar with Loading Indicator */}
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {isSearching ? (
                  <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                ) : (
                  <Search className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <input
                type="text"
                placeholder="Search for courses..."
                className="input-field pl-10 w-full rounded-lg border-border focus:border-primary transition-all"
                value={searchTerm}
                onChange={onSearchChange}
              />
            </div>
            <ButtonCustom onClick={onSearchSubmit} disabled={isSearching}>
              Search
            </ButtonCustom>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesHeader;

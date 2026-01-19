
import React from 'react';
import CourseCard from '@/components/CourseCard';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  category: string;
  featured?: boolean;
}

interface CourseGridProps {
  courses: Course[];
  sortOption: string;
  onSortChange: (option: string) => void;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, sortOption, onSortChange }) => {
  // Define animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Showing {courses.length} courses</p>
        <div className="flex items-center gap-2">
          {sortOption !== 'featured' && (
            <button
              onClick={() => onSortChange('featured')}
              className="p-1 text-muted-foreground hover:text-primary"
              aria-label="Reset sort"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <select 
            className="px-3 py-2 border border-border rounded-md bg-card text-sm transition-colors focus:border-primary focus:outline-none"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {courses.map((course, index) => (
          <motion.div key={course.id} variants={item} custom={index}>
            <CourseCard key={course.id} {...course} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CourseGrid;

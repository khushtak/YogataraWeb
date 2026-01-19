
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
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

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  thumbnail,
  rating,
  students,
  duration,
  price,
  category,
  featured = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <Link 
      to={`/course/${id}`}
      className={cn(
        "group relative flex flex-col rounded-xl overflow-hidden bg-card border border-border shadow-sm transition-all duration-300",
        "hover:shadow-md hover:border-primary/20 hover:-translate-y-1",
        featured ? "md:col-span-2 lg:flex-row" : ""
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        featured ? "lg:w-2/5" : "aspect-[16/9]"
      )}>
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse"></div>
        )}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {category}
          </span>
        </div>
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      
      <div className={cn(
        "flex flex-col p-5",
        featured ? "lg:w-3/5" : "h-full justify-between"
      )}>
        <div>
          <h3 className="text-lg font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            by {instructor}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-y-3 justify-between items-end mt-auto">
          <div className="flex items-center text-sm">
            <div className="flex items-center mr-3">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center mr-3">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span>{students}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span>{duration}</span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-base font-semibold">
              {price === 0 ? (
                <span className="text-emerald-600">Free</span>
              ) : (
                <span>${price.toFixed(2)}</span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 bg-primary transition-opacity pointer-events-none"></div>
    </Link>
  );
};

export default CourseCard;

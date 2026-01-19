
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CourseCard from './CourseCard';
import { cn } from '@/lib/utils';
import baseUrl from '@/config/Config';

interface FeaturedCoursesProps {
  className?: string;
}

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

const FeaturedCourses: React.FC<FeaturedCoursesProps> = ({ className }) => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      setIsLoading(true);  // Start loading
      try {
        const response = await fetch(`${baseUrl}/get-courses`);
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();

        const formattedCourses = data.map((course) => ({
          id: course.courseId || course._id,
          title: course.courseName,
          instructor: course.courseInStructure?.[0]?.name || "Unknown Instructor",
          thumbnail: course.courseImage || "https://via.placeholder.com/300",
          rating: course.courseRating || 4.5,
          students: Math.floor(Math.random() * 1000),
          duration: course.courseDuration || "Unknown Duration",
          price: parseFloat(course.coursePrice) || 0,
          category: course.courseCategory || "Uncategorized",
          featured: course.featured || false,
        }));

        setFeaturedCourses(formattedCourses);
      } catch (error) {
        console.error("Error retrieving courses:", error);
      } finally {
        setIsLoading(false);  // Stop loading
      }
    };

    fetchFeaturedCourses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container-custom">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our most popular courses on Vedic astrology, numerology, and ancient divination techniques taught by our expert instructor.
            </p>
          </div>
          <Link to="/courses" className="mt-4 md:mt-0 inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            View all courses <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              instructor={course.instructor}
              thumbnail={course.thumbnail}
              rating={course.rating}
              students={course.students}
              duration={course.duration}
              price={course.price}
              category={course.category}
              featured={index === 0 || Boolean(course.featured)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
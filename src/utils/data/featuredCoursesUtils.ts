
import featuredCoursesData from '@/data/featuredCoursesData.json';
import { FeaturedCourse } from './types';

export const getFeaturedCourses = (): FeaturedCourse[] => {
  // Map the data to ensure it conforms to the FeaturedCourse type
  return featuredCoursesData.featuredCourses.map(course => {
    // Handle the fact that some properties might be missing in the source data
    const courseData = course as any;
    
    // Create a properly typed object with all required fields
    const mappedCourse: FeaturedCourse = {
      id: courseData.id,
      title: courseData.title,
      description: courseData.description || "", // Provide default for missing description
      image: courseData.image || courseData.thumbnail || "", // Use thumbnail as image if image is missing
      instructor: courseData.instructor,
      rating: courseData.rating,
      students: courseData.students || 0, // Provide default for missing students
      // Optional fields
      thumbnail: courseData.thumbnail || "",
      duration: courseData.duration || "0h",
      price: courseData.price || 0,
      category: courseData.category || "",
      featured: courseData.featured || false
    };
    
    return mappedCourse;
  });
};

// This function provides a filtered subset of courses based on criteria
export const getFilteredCourses = (
  category?: string,
  level?: string,
  search?: string
): FeaturedCourse[] => {
  let filtered = getFeaturedCourses();
  
  if (category && category !== 'all') {
    filtered = filtered.filter(course => 
      course.category?.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (level && level !== 'all') {
    // This is just an example - in a real app you would have level in your course data
    // filtered = filtered.filter(course => course.level === level);
  }
  
  if (search && search.trim() !== '') {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(searchLower) ||
      (course.category && course.category.toLowerCase().includes(searchLower))
    );
  }
  
  return filtered;
};

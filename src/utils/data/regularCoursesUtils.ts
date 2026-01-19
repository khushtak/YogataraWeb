
import coursesListData from '@/data/coursesListData.json';
import { coursesData } from '@/data/coursesData';
import { Course } from './types';

export const getCoursesList = () => {
  // Map the data to ensure it matches our Course type
  return coursesListData.courses.map(course => ({
    id: course.id.toString(),
    title: course.title,
    instructor: "Instructor", // Add required instructor field
    category: "Uncategorized", // Default value since category doesn't exist in the source data
    rating: 0, // Default value for required field
    students: 0, // Default value for required field
    price: 0, // Default value for required field
    image: "", // Default value for required field
    description: "", // Default value for optional field
    duration: "0h", // Default value for optional field
    sections: course.sections || []
  }));
};

export const getCourseDetails = (courseId: string) => {
  return coursesData[courseId as keyof typeof coursesData];
};

// Alias for backward compatibility with any code that might be using getRegularCourses
export { getCoursesList as getRegularCourses };

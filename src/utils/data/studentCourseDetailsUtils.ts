
import { getEnrolledCourses, getCompletedCourses } from './studentCoursesUtils';

// Function to get course details by ID for student view
export const getStudentCourseById = (courseId: string) => {
  // First check in enrolled courses
  const enrolledCourse = getEnrolledCourses().find(course => course.id === courseId);
  if (enrolledCourse) return enrolledCourse;
  
  // Then check in completed courses
  const completedCourse = getCompletedCourses().find(course => course.id === courseId);
  if (completedCourse) {
    // Add missing properties required by the UI
    return {
      ...completedCourse,
      progress: 100,
      nextLesson: "Course completed",
      nextLessonTime: "-",
      description: "This course has been completed.",
      instructor: completedCourse.instructor || "Instructor", // Ensure instructor exists
      modules: [
        {
          title: "Course Content",
          lessons: [
            { title: "All lessons completed", duration: "-", completed: true, type: "video" }
          ]
        }
      ]
    };
  }
  
  return null;
};

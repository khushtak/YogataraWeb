
import { getCategories } from './data/categoriesUtils';
import { getFeaturedCourses, getFilteredCourses } from './data/featuredCoursesUtils';
import { 
  getAssignment, 
  getAssignmentsForCourse, 
  getStudentAssignments,
  getUpcomingAssignments
} from './data/assignmentsUtils';
import { 
  getGradeStatistics, 
  getGrades, 
  getStudentCourseGrades 
} from './data/gradesUtils';
import { getEnrolledCourses, getCompletedCourses } from './data/studentCoursesUtils';
import { getStudentCourseById } from './data/studentCourseDetailsUtils';
import { getAnnouncements } from './data/announcementsUtils';
import { getQuestions } from './data/questionsUtils';
import { getCoursesList, getCourseDetails } from './data/regularCoursesUtils';

// Re-export all functions
export {
  getCategories,
  getFeaturedCourses,
  getFilteredCourses,
  getAssignment,
  getAssignmentsForCourse,
  getStudentAssignments,
  getUpcomingAssignments,
  getGrades,
  getGradeStatistics,
  getStudentCourseGrades,
  getEnrolledCourses,
  getCompletedCourses,
  getStudentCourseById,
  getAnnouncements,
  getQuestions,
  getCoursesList,
  getCourseDetails
};

// Add other exported functions as needed

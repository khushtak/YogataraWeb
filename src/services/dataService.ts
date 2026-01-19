
import { 
  getQuestions, 
  getCategories, 
  getFeaturedCourses, 
  getCoursesList, 
  getCourseDetails,
  getFilteredCourses
} from '@/utils/dataUtils';
import { Question } from '@/utils/data/types';

// This service layer can be expanded to include API calls when moving to a backend
// For now it just passes through to the utility functions, but it provides a clean
// abstraction for future backend integration

export const DataService = {
  // Questions related methods
  getQuestions: () => getQuestions(),
  
  getQuestionById: (id: number) => {
    const questions = getQuestions();
    return questions.find(q => q.id === id);
  },
  
  // Categories related methods
  getCategories: () => getCategories(),
  
  // Courses related methods
  getFeaturedCourses: () => getFeaturedCourses(),
  
  getCoursesList: () => getCoursesList(),
  
  getCourseDetails: (courseId: string) => getCourseDetails(courseId),
  
  getFilteredCourses: (category?: string, level?: string, search?: string) => 
    getFilteredCourses(category, level, search),
  
  // In a real application, these would connect to a backend API
  // Example of methods that would be implemented when connected to a backend:
  
  /* Commented out as these would be implemented with actual API calls
  createQuestion: async (questionData: any) => {
    // This would be an API call to create a question
    // return await api.post('/questions', questionData);
    console.log('Create question:', questionData);
    return { success: true, id: Date.now() };
  },
  
  updateQuestion: async (id: number, questionData: any) => {
    // This would be an API call to update a question
    // return await api.put(`/questions/${id}`, questionData);
    console.log('Update question:', id, questionData);
    return { success: true };
  },
  
  deleteQuestion: async (id: number) => {
    // This would be an API call to delete a question
    // return await api.delete(`/questions/${id}`);
    console.log('Delete question:', id);
    return { success: true };
  }
  */
};

export default DataService;

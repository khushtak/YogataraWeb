
import { Assignment } from './types';
import { getAssignmentById, getUpcomingAssignmentsData, getCompletedAssignmentsData } from './assignmentsDataUtils';

// Get assignment by ID
export const getAssignment = (id: string): Assignment | null => {
  const assignment = getAssignmentById(id);
  
  if (!assignment) return null;
  
  // Ensure the returned object conforms to the Assignment interface
  return {
    id: assignment.id,
    title: assignment.title,
    course: assignment.course,
    dueDate: 'dueDate' in assignment ? assignment.dueDate : '',
    status: 'In Progress', // Add required status field
    description: 'description' in assignment ? assignment.description : '',
    instructions: assignment.instructions || '',
    resources: assignment.resources || [],
    courseId: assignment.courseId || '',
    points: assignment.points
  };
};

// Get upcoming assignments
export const getUpcomingAssignments = (): Assignment[] => {
  const assignments = getUpcomingAssignmentsData();
  return assignments.map(assignment => ({
    id: assignment.id,
    title: assignment.title,
    course: assignment.course,
    dueDate: assignment.dueDate,
    status: 'Upcoming', // Add required status field
    description: assignment.description || '',
    instructions: assignment.instructions || '',
    resources: assignment.resources || [],
    courseId: assignment.courseId || '',
    points: assignment.points,
    type: assignment.type
  }));
};

// Get assignments for a specific course
export const getAssignmentsForCourse = (courseId: string): Assignment[] => {
  // In a real app, we would filter assignments by courseId
  // For now, just return an empty array as a placeholder
  return [];
};

// Get student assignments
export const getStudentAssignments = (studentId: string): Assignment[] => {
  // In a real app, we would fetch assignments for a specific student
  // For now, just return an empty array as a placeholder
  return [];
};

// Additional assignment-related utility functions can be added here

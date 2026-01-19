
import assignmentsData from '@/data/assignmentsData.json';

export interface AssignmentSimple {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  description?: string;
  type: string;
  points: number;
  courseId?: string;
  instructions?: string;
  resources?: { name: string; type: string }[];
}

export interface CompletedAssignment {
  id: string;
  title: string;
  course: string;
  submittedDate: string;
  grade: string;
  feedback: string;
  type: string;
  points: number;
  courseId?: string;
  description?: string;
  instructions?: string;
  resources?: { name: string; type: string }[];
}

export const getUpcomingAssignmentsData = (): AssignmentSimple[] => {
  return assignmentsData.upcomingAssignments.map(assignment => {
    // Create a new assignment object with all required and optional properties
    const enhancedAssignment: AssignmentSimple = {
      id: assignment.id,
      title: assignment.title,
      course: assignment.course,
      dueDate: assignment.dueDate,
      type: assignment.type,
      points: assignment.points,
      // Add optional properties with fallbacks
      description: assignment.description || '',
      courseId: '',  // Default empty string as it's not in the raw data
      instructions: '',  // Default empty string as it's not in the raw data
      resources: []  // Default empty array as it's not in the raw data
    };
    return enhancedAssignment;
  });
};

export const getCompletedAssignmentsData = (): CompletedAssignment[] => {
  return assignmentsData.completedAssignments.map(assignment => {
    // Create a new assignment object with all required and optional properties
    const enhancedAssignment: CompletedAssignment = {
      id: assignment.id,
      title: assignment.title,
      course: assignment.course,
      submittedDate: assignment.submittedDate,
      grade: assignment.grade,
      feedback: assignment.feedback,
      type: assignment.type,
      points: assignment.points,
      // Add optional properties with fallbacks
      courseId: '',  // Default empty string as it's not in the raw data
      description: '',  // Default empty string as it's not in the raw data
      instructions: '',  // Default empty string as it's not in the raw data
      resources: []  // Default empty array as it's not in the raw data
    };
    return enhancedAssignment;
  });
};

export const getAssignmentById = (id: string): AssignmentSimple | CompletedAssignment | undefined => {
  const upcoming = getUpcomingAssignmentsData().find(assignment => assignment.id === id);
  if (upcoming) return upcoming;
  
  const completed = getCompletedAssignmentsData().find(assignment => assignment.id === id);
  return completed;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

export const getTimeRemaining = (dueDate: string) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();
  
  if (diff <= 0) return 'Overdue';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} left`;
  } else {
    return `${hours} hour${hours !== 1 ? 's' : ''} left`;
  }
};

export const getBadgeVariant = (type: string) => {
  switch (type) {
    case 'quiz': return 'blue';
    case 'project': return 'green';
    case 'essay': return 'purple';
    case 'exercise': return 'yellow';
    case 'challenge': return 'orange';
    default: return 'default';
  }
};

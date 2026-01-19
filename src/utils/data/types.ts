// Existing types

export interface Question {
  id: number;
  question: string;
  type: string;
  difficulty: string;
  category: string;
  course: string;
  courseId: string;
  section: string;
  usedIn: number;
  hasImage: boolean;
  explanation?: string;
  options?: string[];
  selectedOption: number;
}

// Updated type definitions with consistent types and all required properties
export interface StudentCourse {
  id: string;
  title: string;
  progress: number;
  instructor: string;
  category?: string;
  lastAccessed?: string;
  image?: string;
  totalLessons?: number;
  completedLessons?: number;
  // Additional fields for student course detail page
  nextLesson?: string;
  nextLessonTime?: string;
  description?: string;
  modules?: CourseModule[];
}

export interface CompletedCourse {
  id: string;
  title: string;
  completedDate: string;
  instructor: string;
  image?: string;
  category?: string;
  completedOn?: string;
  grade?: string;
  certificate?: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  discount?: number;
  duration?: string;
  description?: string;
  featured?: boolean;
  sections?: { id: number; title: string }[];
}

export interface FeaturedCourse {
  id: string;
  title: string;
  instructor: string;
  description: string;
  rating: number;
  students: number;
  image: string;
  thumbnail?: string;
  duration?: string;
  price?: number;
  category?: string;
  featured?: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export interface IconMap {
  [key: string]: JSX.Element;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  grade?: string;
  maxGrade?: string;
  courseId?: string;
  description?: string;
  instructions?: string;
  resources?: { name: string; type: string }[];
  points?: number;
  type?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  author: string;
  course: string;
  content: string;
  read?: boolean;
  isRead?: boolean;
  message?: string;
  time?: string;
}

export interface CourseModule {
  id?: number;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id?: number;
  title: string;
  duration: string;
  completed: boolean;
  type: string;
  url?: string;
}

// Type aliases for legacy component compatibility - updated to match our newer types
export type Module = CourseModule;
export type Lesson = CourseLesson;

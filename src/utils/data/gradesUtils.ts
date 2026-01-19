
import gradesData from '@/data/gradesData.json';
import { CourseGrade } from '@/components/student/grades/CourseGradesList';

export interface GradeStatistics {
  average: number;
  highest: number;
  lowest: number;
  gpa: number;
  averageGrade: number;
  coursesCompleted: number;
  gradeDistribution: { grade: string; count: number }[];
}

export interface GradeData {
  name: string;
  value: number;
  color?: string;
}

// Get all grade data
export const getGradesData = () => {
  return gradesData;
};

// Get grade statistics
export const getGradeStatistics = (studentId: string): GradeStatistics => {
  // In a real app, we would filter by studentId
  return {
    average: 85,
    highest: 96,
    lowest: 72,
    gpa: 3.7,
    averageGrade: 88,
    coursesCompleted: 12,
    gradeDistribution: [
      { grade: 'A', count: 5 },
      { grade: 'B', count: 4 },
      { grade: 'C', count: 2 },
      { grade: 'D', count: 1 },
      { grade: 'F', count: 0 }
    ]
  };
};

// Get course grades for a student
export const getStudentCourseGrades = (studentId: string): CourseGrade[] => {
  // In a real app, we would filter by studentId
  if (gradesData && gradesData.courseGrades) {
    return gradesData.courseGrades.map(course => ({
      course: course.course,
      grade: course.grade,
      status: course.status
    }));
  }
  
  // Fallback if data structure is different
  return [
    { course: "Introduction to React", grade: 88, status: "In Progress" },
    { course: "Advanced JavaScript Concepts", grade: 75, status: "In Progress" },
    { course: "Web Design Fundamentals", grade: 92, status: "In Progress" },
    { course: "HTML & CSS Basics", grade: 95, status: "Completed" },
    { course: "UX Research Methods", grade: 89, status: "Completed" }
  ];
};

// Utility function to convert grade data for charts
export const getGradeDistributionForChart = (): GradeData[] => {
  if (gradesData && gradesData.gradeDistributionData) {
    return gradesData.gradeDistributionData.map(item => ({
      name: item.name,
      value: item.value,
      color: item.color
    }));
  }
  
  // Fallback data
  return [
    { name: 'A', value: 5, color: '#4CAF50' },
    { name: 'B', value: 4, color: '#8BC34A' },
    { name: 'C', value: 2, color: '#FFC107' },
    { name: 'D', value: 1, color: '#FF9800' },
    { name: 'F', value: 0, color: '#F44336' }
  ];
};

// Get recent grades for charts
export const getRecentGradesForChart = (): GradeData[] => {
  if (gradesData && gradesData.performanceTrendData) {
    return gradesData.performanceTrendData.map(item => ({
      name: item.name,
      value: item.value
    }));
  }
  
  // Fallback data
  return [
    { name: 'Module 1', value: 88 },
    { name: 'Module 2', value: 75 },
    { name: 'Module 3', value: 92 },
    { name: 'Module 4', value: 95 },
    { name: 'Module 5', value: 89 }
  ];
};

// Get grades
export const getGrades = () => {
  if (gradesData && gradesData.courseGrades) {
    return gradesData.courseGrades;
  }
  
  // Fallback data
  return [
    { course: "Introduction to React", grade: 88, status: "In Progress" },
    { course: "Advanced JavaScript Concepts", grade: 75, status: "In Progress" },
    { course: "Web Design Fundamentals", grade: 92, status: "In Progress" },
    { course: "HTML & CSS Basics", grade: 95, status: "Completed" },
    { course: "UX Research Methods", grade: 89, status: "Completed" }
  ];
};

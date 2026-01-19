
import { CalendarEvent } from './types';

// Format date as YYYY-MM-DD
export const formatDate = (year: number, month: number, day: number) => {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Check if a date is today
export const isToday = (year: number, month: number, day: number) => {
  const today = new Date();
  return today.getDate() === day && 
         today.getMonth() === month && 
         today.getFullYear() === year;
};

// Get month name from month index
export const getMonthName = (month: number) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[month];
};

// Helper function to generate calendar days for a specific month and year
export const generateCalendarDays = (month: number, year: number) => {
  const days = [];
  
  // Get the number of days in the selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
};

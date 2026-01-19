
import { CalendarEvent } from './types';
import { formatDate } from './dateUtils';

// Event type badge color helper
export const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'lecture':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'deadline':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'workshop':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'exam':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'meeting':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Get events for a specific date
export const getEventsForDate = (year: number, month: number, day: number, allEvents: CalendarEvent[]) => {
  const dateString = formatDate(year, month, day);
  return allEvents.filter(event => event.date === dateString);
};

// Get upcoming events for the next 7 days from a specific date
export const getUpcomingEvents = (date: Date, allEvents: CalendarEvent[]) => {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 7);
  
  return allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
};

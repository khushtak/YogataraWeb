import { CalendarEvent } from './types';

// Get current date and format it to YYYY-MM-DD
const today = new Date();
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Create dates for the next few days
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);

// Mock events data with current dates
export const events: CalendarEvent[] = [
  {
    id: 1,
    title: 'Vedic Astrology Fundamentals',
    date: formatDate(today),
    time: '10:00 AM - 11:30 AM',
    location: 'Online - Zoom',
    course: 'Introduction to Vedic Astrology',
    type: 'lecture'
  },
  {
    id: 2,
    title: 'Horoscope Analysis Assignment',
    date: formatDate(tomorrow),
    time: '11:59 PM',
    course: 'Advanced Horoscope Reading',
    type: 'deadline'
  },
  {
    id: 3,
    title: 'Planetary Combinations Workshop',
    date: formatDate(today),
    time: '2:00 PM - 4:00 PM',
    location: 'Online - Zoom',
    course: 'Advanced Planetary Combinations',
    type: 'workshop'
  },
  {
    id: 4,
    title: 'Mid-term: Basic Principles',
    date: formatDate(dayAfterTomorrow),
    time: '9:00 AM - 11:00 AM',
    location: 'Online - Proctored',
    course: 'Fundamentals of Vedic Astrology',
    type: 'exam'
  },
  {
    id: 5,
    title: 'Study Group: Transit Effects',
    date: formatDate(tomorrow),
    time: '3:00 PM - 4:30 PM',
    location: 'Online - Teams',
    course: 'Transit and Predictions',
    type: 'meeting'
  },
  {
    id: 6,
    title: 'Advanced Dasha Analysis',
    date: formatDate(nextWeek),
    time: '1:00 PM - 2:30 PM',
    location: 'Online - Zoom',
    course: 'Vimshottari Dasha System',
    type: 'lecture'
  },
  {
    id: 7,
    title: 'Case Study Submission',
    date: formatDate(nextWeek),
    time: '11:59 PM',
    course: 'Practical Horoscope Analysis',
    type: 'deadline'
  },
  {
    id: 8,
    title: 'Remedial Measures Workshop',
    date: formatDate(dayAfterTomorrow),
    time: '10:00 AM - 12:00 PM',
    location: 'Online - Zoom',
    course: 'Astrological Remedies',
    type: 'workshop'
  }
];

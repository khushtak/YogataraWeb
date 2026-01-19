
import { Announcement } from './types';

// Mock data for announcements
const announcements: Announcement[] = [
  {
    id: "1",
    title: "Welcome to the Course",
    date: "2024-03-15",
    content: "Welcome to Introduction to React! We're excited to have you join us for this journey into modern frontend development.",
    course: "Introduction to React",
    read: true,
    isRead: true,
    message: "Welcome message from your instructor",
    time: "10:30 AM",
    author: "Course Instructor"
  },
  {
    id: "2",
    title: "First Assignment Posted",
    date: "2024-03-16",
    content: "The first assignment for Advanced JavaScript Concepts has been posted. Please check the assignments section.",
    course: "Advanced JavaScript Concepts",
    read: false,
    isRead: false,
    message: "New assignment available",
    time: "2:15 PM",
    author: "Course Instructor"
  },
  {
    id: "3",
    title: "Schedule Update",
    date: "2024-03-17",
    content: "The next Web Design Fundamentals live session will be postponed by one day. Please check your calendar.",
    course: "Web Design Fundamentals",
    read: false,
    isRead: false,
    message: "Important schedule change",
    time: "9:45 AM",
    author: "Course Instructor"
  }
];

export const getAnnouncements = () => {
  return announcements;
};

export const getUnreadAnnouncementsCount = () => {
  return announcements.filter(a => !a.read).length;
};

export const getAnnouncementById = (id: string) => {
  return announcements.find(a => a.id === id);
};

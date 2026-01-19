
import { StudentCourse, CompletedCourse } from './types';

// Mock data for student dashboard - using mystical/astrology courses
export const getEnrolledCourses = (): StudentCourse[] => {
  return [
    { 
      id: '1', 
      title: 'Vedic Astrology: Complete Chart Analysis & Predictions', 
      progress: 65, 
      instructor: 'Mridul', 
      nextLesson: 'Understanding Birth Charts', 
      nextLessonTime: '2h',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Vedic Astrology',
      description: 'Master the ancient science of Vedic astrology and learn to make accurate predictions using birth charts, planetary positions, and celestial events.',
      modules: [
        { 
          title: 'Foundations of Vedic Astrology',
          lessons: [
            { title: 'Introduction to Vedic Astrology', duration: '10:45', completed: true, type: 'video' },
            { title: 'The Zodiac Signs in Vedic System', duration: '15:20', completed: true, type: 'video' },
            { title: 'Understanding Birth Charts', duration: '25:30', completed: false, type: 'video' },
            { title: 'Planets and Their Significance', duration: '18:15', completed: false, type: 'video' }
          ]
        },
        {
          title: 'Advanced Chart Analysis',
          lessons: [
            { title: 'Reading Astrological Houses', duration: '22:10', completed: false, type: 'video' },
            { title: 'Planetary Conjunctions', duration: '19:45', completed: false, type: 'video' },
            { title: 'Dashas and Timing Events', duration: '28:30', completed: false, type: 'video' },
            { title: 'Remedial Measures in Vedic Astrology', duration: '24:15', completed: false, type: 'video' }
          ]
        }
      ]
    },
    { 
      id: '2', 
      title: 'Numerology: Unlock the Power of Numbers', 
      progress: 42, 
      instructor: 'Aanya Patel', 
      nextLesson: 'Life Path Numbers Calculation', 
      nextLessonTime: '1d',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Numerology',
      description: 'Discover how numbers influence your life and learn to calculate and interpret the various numerological aspects that define your personality, destiny, and life path.',
      modules: [
        {
          title: 'Numerology Fundamentals',
          lessons: [
            { title: 'Introduction to Numerology', duration: '12:30', completed: true, type: 'video' },
            { title: 'The Pythagorean System', duration: '15:45', completed: true, type: 'video' },
            { title: 'Life Path Numbers Calculation', duration: '20:15', completed: false, type: 'video' },
            { title: 'Master Numbers and Their Significance', duration: '18:20', completed: false, type: 'video' }
          ]
        },
        {
          title: 'Practical Numerology',
          lessons: [
            { title: 'Name Numerology', duration: '19:10', completed: false, type: 'video' },
            { title: 'Compatibility Through Numbers', duration: '21:30', completed: false, type: 'video' },
            { title: 'Numerology in Career Decisions', duration: '24:45', completed: false, type: 'video' },
            { title: 'Creating Your Numerology Chart', duration: '22:15', completed: false, type: 'video' }
          ]
        }
      ]
    },
    { 
      id: '3', 
      title: 'Introduction to Tarot Reading', 
      progress: 89, 
      instructor: 'Rohan Sharma', 
      nextLesson: 'Major Arcana Deep Dive', 
      nextLessonTime: '3h',
      image: 'https://images.unsplash.com/photo-1659535996463-a6115e3b2733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Tarot',
      description: 'Learn the ancient art of Tarot reading, understand the symbolism of each card, and master various spreads to provide insightful and accurate readings.',
      modules: [
        {
          title: 'Tarot Basics',
          lessons: [
            { title: 'History of Tarot Cards', duration: '14:25', completed: true, type: 'video' },
            { title: 'Tarot Deck Structure', duration: '16:30', completed: true, type: 'video' },
            { title: 'Major Arcana Deep Dive', duration: '25:15', completed: false, type: 'video' },
            { title: 'Minor Arcana Suits', duration: '22:40', completed: false, type: 'video' }
          ]
        },
        {
          title: 'Reading Techniques',
          lessons: [
            { title: 'Basic Spreads', duration: '20:10', completed: true, type: 'video' },
            { title: 'The Celtic Cross Spread', duration: '28:45', completed: true, type: 'video' },
            { title: 'Intuitive Reading', duration: '18:30', completed: true, type: 'video' },
            { title: 'Client Reading Ethics', duration: '15:50', completed: false, type: 'video' }
          ]
        }
      ]
    },
  ];
};

export const getCompletedCourses = (): CompletedCourse[] => {
  return [
    { 
      id: '4', 
      title: 'Palmistry: The Complete Guide', 
      completedDate: '2023-03-15', 
      instructor: 'Leela Reddy',
      image: 'https://images.unsplash.com/photo-1590218392991-83f178aad425?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 
      category: 'Palmistry' 
    },
    { 
      id: '5', 
      title: 'Vaastu Shastra for Modern Living', 
      completedDate: '2023-02-01', 
      instructor: 'Vivek Joshi',
      image: 'https://images.unsplash.com/photo-1588534510807-e4ae8542e031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', 
      category: 'Vaastu Shastra' 
    },
  ];
};

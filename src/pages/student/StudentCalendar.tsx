
import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import CalendarHeader from '@/components/student/calendar/CalendarHeader';
import CalendarGrid from '@/components/student/calendar/CalendarGrid';
import UpcomingEvents from '@/components/student/calendar/UpcomingEvents';
import TodaysSchedule from '@/components/student/calendar/TodaysSchedule';
import {
  generateCalendarDays,
  getEventTypeColor,
  events,
  getMonthName,
  getEventsForDate,
  getUpcomingEvents,
  formatDate
} from '@/components/student/calendar/CalendarUtils';
import baseUrl from '@/config/Config';

const StudentCalendar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set up state to track current date
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Extract month and year from current date
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentMonthName = getMonthName(currentMonth);

  // Navigation handlers
  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days for the current month
  const days = generateCalendarDays(currentMonth, currentYear);

  // Get events for today's schedule
  const today = new Date();
  // const todayDateString = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
  // const todayEvents = events.filter(event => event.date === todayDateString);

  // // Get upcoming events for the next 7 days
  // const upcomingEvents = getUpcomingEvents(today, events);

  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [todayEvents, setTodayEvents] = useState([]);

  const allEvents = [...todayEvents, ...upcomingEvents];

  const formattedDate = (date: string) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7); // Adding 1 week
    return newDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD
  };

  const transformUserProgress = (userProgress: any) => {
    const today = getTodayDate();
    const upcomingEvents: any[] = [];
    const todayEvents: any[] = [];

    userProgress.courseDetails.forEach((course: any, index: number) => {
      const eventDate = formattedDate(course.enrollmentDate);
      const event = {
        id: index + 1,
        title: `${course.courseName} Assignment`,
        course: course.courseName,
        date: eventDate,
        time: "10:00 AM - 12:00 PM",
        location: "Online",
        type: "exam",
      };

      if (eventDate === today) {
        todayEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    });

    return { todayEvents, upcomingEvents };
  };

  const getUserProgress = async (userEmail: string) => {
    try {
      const response = await fetch(`${baseUrl}/user-progress/${userEmail}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user progress");
      }

      return data.userProgress; // Return user progress data
    } catch (error) {
      console.error("Error fetching user progress:", error);
      return null;
    }
  };

  // Usage Example:
  useEffect(() => {
    const fetchProgress = async () => {
      const progress = await getUserProgress("sayanmyself50@gmail.com");
      console.log("User Progress:", progress);

      if (progress) {
        const { todayEvents, upcomingEvents } = transformUserProgress(progress);

        setTodayEvents(todayEvents);
        setUpcomingEvents(upcomingEvents);
        console.log("Transformed User Progress todayEvents:", todayEvents);
        console.log("Transformed User Progress upcomingEvents:", upcomingEvents);

      }
    };
    fetchProgress();
  }, []);


  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and upcoming events</p>
        </div>

        {/* Calendar Header */}
        <CalendarHeader
          currentMonthName={currentMonthName}
          currentYear={currentYear}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          onToday={handleTodayClick}
        />

        {/* Calendar Grid */}
        <CalendarGrid
          days={days}
          currentDate={today}
          displayMonth={currentMonth}
          displayYear={currentYear}
          events={allEvents}
        />

        {/* Upcoming Events and Today's Schedule */}
        <div className="grid gap-6 md:grid-cols-3">
          <UpcomingEvents
            events={upcomingEvents}
            getEventTypeColor={getEventTypeColor}
          />

          <TodaysSchedule
            todayEvents={todayEvents}
            currentMonthName={getMonthName(today.getMonth())}
            currentDate={today}
            currentYear={today.getFullYear()}
          />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCalendar;

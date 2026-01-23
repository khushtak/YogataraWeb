import React, { useEffect, useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import CalendarHeader from "@/components/student/calendar/CalendarHeader";
import CalendarGrid from "@/components/student/calendar/CalendarGrid";
import UpcomingEvents from "@/components/student/calendar/UpcomingEvents";
import TodaysSchedule from "@/components/student/calendar/TodaysSchedule";
import {
  generateCalendarDays,
  getEventTypeColor,
  getMonthName,
} from "@/components/student/calendar/CalendarUtils";

const StudentCalendar = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentMonthName = getMonthName(currentMonth);

  const days = generateCalendarDays(currentMonth, currentYear);

  // Fresh student => no events
  const todayEvents: any[] = [];
  const upcomingEvents: any[] = [];

  // Disable navigation if month goes out of current year
  const handlePreviousMonth = () => {
    if (currentDate.getFullYear() === today.getFullYear() && currentMonth > 0) {
      setCurrentDate(new Date(currentYear, currentMonth - 1));
    }
  };

  const handleNextMonth = () => {
    if (currentDate.getFullYear() === today.getFullYear() && currentMonth < 11) {
      setCurrentDate(new Date(currentYear, currentMonth + 1));
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>

        <CalendarHeader
          currentMonthName={currentMonthName}
          currentYear={currentYear}
          onPrevious={handlePreviousMonth}
          onNext={handleNextMonth}
          onToday={() => setCurrentDate(new Date())}
          disablePrevious={currentMonth === 0}
          disableNext={currentMonth === 11}
        />

        <CalendarGrid
          days={days}
          currentDate={today}
          displayMonth={currentMonth}
          displayYear={currentYear}
          events={[]} // no events
        />

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

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

const STATIC_EVENTS = [
  {
    id: 1,
    title: "Astrology Basics Assignment",
    course: "Astrology 101",
    date: "2026-01-21",
    time: "10:00 AM - 12:00 PM",
    location: "Online",
    type: "assignment",
  },
  {
    id: 2,
    title: "Numerology Quiz",
    course: "Numerology",
    date: "2026-01-23",
    time: "02:00 PM - 03:00 PM",
    location: "Online",
    type: "quiz",
  },
  {
    id: 3,
    title: "Vedic Astrology Exam",
    course: "Vedic Astrology",
    date: "2026-01-26",
    time: "11:00 AM - 01:00 PM",
    location: "Online",
    type: "exam",
  },
];

const StudentCalendar = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentMonthName = getMonthName(currentMonth);

  const days = generateCalendarDays(currentMonth, currentYear);

  const today = new Date().toISOString().split("T")[0];

  const todayEvents = STATIC_EVENTS.filter(
    (event) => event.date === today
  );

  const upcomingEvents = STATIC_EVENTS.filter(
    (event) => event.date > today
  );

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
          onPrevious={() =>
            setCurrentDate(new Date(currentYear, currentMonth - 1))
          }
          onNext={() =>
            setCurrentDate(new Date(currentYear, currentMonth + 1))
          }
          onToday={() => setCurrentDate(new Date())}
        />

        <CalendarGrid
          days={days}
          currentDate={new Date()}
          displayMonth={currentMonth}
          displayYear={currentYear}
          events={STATIC_EVENTS}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <UpcomingEvents
            events={upcomingEvents}
            getEventTypeColor={getEventTypeColor}
          />

          <TodaysSchedule
            todayEvents={todayEvents}
            currentMonthName={getMonthName(new Date().getMonth())}
            currentDate={new Date()}
            currentYear={new Date().getFullYear()}
          />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCalendar;

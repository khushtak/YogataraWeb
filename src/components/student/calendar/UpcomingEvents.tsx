
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EventCard from './EventCard';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location?: string;
  course: string;
  type: string;
}

interface UpcomingEventsProps {
  events: Event[];
  getEventTypeColor: (type: string) => string;
}

const UpcomingEvents = ({ events, getEventTypeColor }: UpcomingEventsProps) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const formattedToday = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedNextWeek = nextWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className='text-xl'>Upcoming Events</CardTitle>
        <CardDescription>Events from {formattedToday} to {formattedNextWeek}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} typeColor={getEventTypeColor(event.type)} />
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>No upcoming events in the next week</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location?: string;
  course: string;
  type: string;
}

interface TodaysScheduleProps {
  todayEvents: Event[];
  currentMonthName: string;
  currentDate: Date;
  currentYear: number;
}

const TodaysSchedule = ({ todayEvents, currentMonthName, currentDate, currentYear }: TodaysScheduleProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Schedule</CardTitle>
        <CardDescription>Events for {currentMonthName} {currentDate.getDate()}, {currentYear}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayEvents.length > 0 ? (
          todayEvents.map((event) => (
            <div key={event.id} className="space-y-2">
              <div className="flex items-start">
                <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded text-xs mr-3 w-24 text-center">
                  {event.time.split(' - ')[0]}
                </div>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.course}</p>
                  {event.location && (
                    <div className="flex items-center text-xs mt-1 text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>No events scheduled for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaysSchedule;

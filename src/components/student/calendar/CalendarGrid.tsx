
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CalendarEvent, 
  getEventTypeColor, 
  getEventsForDate, 
  isToday 
} from './CalendarUtils';

interface CalendarGridProps {
  days: (number | null)[];
  currentDate: Date;
  displayMonth: number;
  displayYear: number;
  events: CalendarEvent[];
}

const CalendarGrid = ({ days, currentDate, displayMonth, displayYear, events }: CalendarGridProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        {/* Days of the week */}
        <div className="grid grid-cols-7 border-b border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="p-3 text-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 h-[600px]">
          {days.map((day, index) => {
            // Get events for this day if it's not null
            const dayEvents = day !== null 
              ? getEventsForDate(displayYear, displayMonth, day, events)
              : [];
            
            // Check if this day is today
            const isCurrentDay = day !== null && isToday(displayYear, displayMonth, day);
            
            return (
              <div
                key={index}
                className={`border-border border-r border-b p-1 ${
                  isCurrentDay ? 'bg-primary/5' : ''
                } ${day === null ? 'bg-muted/30' : 'min-h-[100px]'}`}
              >
                {day !== null && (
                  <>
                    <div className={`flex justify-between items-center mb-1 p-1 ${
                      isCurrentDay ? 'font-bold text-primary' : ''
                    }`}>
                      <span>{day}</span>
                      {/* Show a dot for days with events */}
                      {dayEvents.length > 0 ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      ) : null}
                    </div>
                    
                    {/* Display events for this day */}
                    {dayEvents.slice(0, 2).map(event => (
                      <div 
                        key={event.id}
                        className={`text-xs p-1 mb-1 truncate rounded ${getEventTypeColor(event.type)}`}
                      >
                        {event.time.split(' - ')[0]} {event.title}
                      </div>
                    ))}
                    
                    {/* Show indicator if there are more events */}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarGrid;


import React from 'react';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface EventProps {
  event: {
    id: number;
    title: string;
    date: string;
    time: string;
    location?: string;
    course: string;
    type: string;
  };
  typeColor: string;
}

const EventCard = ({ event, typeColor }: EventProps) => {
  return (
    <div className="flex flex-col space-y-2 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex justify-between">
        <h3 className="font-medium text-lg">{event.title}</h3>
        <span className={`text-xs px-2 py-1 h-8 rounded-md border ${typeColor}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </div>
      <div className="text-sm">{event.course}</div>
      <div className="flex items-center text-sm text-muted-foreground">
        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
        <span>{event.date}</span>
        <Separator className="mx-2 h-3" orientation="vertical" />
        <Clock className="h-3.5 w-3.5 mr-1" />
        <span>{event.time}</span>
      </div>
      {event.location && (
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{event.location}</span>
        </div>
      )}
    </div>
  );
};

export default EventCard;

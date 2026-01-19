
import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

interface CalendarHeaderProps {
  currentMonthName: string;
  currentYear: number;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
  onAddEvent?: () => void;
}

const CalendarHeader = ({ 
  currentMonthName, 
  currentYear, 
  onPrevious, 
  onNext, 
  onToday,
  onAddEvent
}: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h2 className="text-xl font-semibold">{currentMonthName} {currentYear}</h2>
      </div>
      <div className="flex space-x-2">
        <ButtonCustom variant="outline" size="sm" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </ButtonCustom>
        <ButtonCustom variant="outline" size="sm" onClick={onToday}>
          Today
        </ButtonCustom>
        <ButtonCustom variant="outline" size="sm" onClick={onNext}>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </ButtonCustom>
        <ButtonCustom size="sm" className="ml-2" onClick={onAddEvent}>
          <Plus className="h-4 w-4 mr-1" />
          Add Event
        </ButtonCustom>
      </div>
    </div>
  );
};

export default CalendarHeader;

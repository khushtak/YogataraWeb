
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  course: any;
}

const CourseProgress = ({ course }: CourseProgressProps) => {
  return (
    <div className="mb-8 p-6 border border-border rounded-xl bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0">Your Progress</h2>
        <span className="text-sm text-muted-foreground">{course.progress}% Complete</span>
      </div>
      <Progress value={course.progress} className="h-2 mb-2" />
      
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm">
        <div className="py-2 px-3 rounded-md bg-primary/10">
          <p className="font-semibold">{course.sections.reduce((acc, section) => acc + section.items.filter(item => item.completed).length, 0)}</p>
          <p className="text-muted-foreground">Completed</p>
        </div>
        <div className="py-2 px-3 rounded-md bg-muted">
          <p className="font-semibold">{course.sections.reduce((acc, section) => acc + section.items.length, 0)}</p>
          <p className="text-muted-foreground">Total</p>
        </div>
        <div className="col-span-2 sm:col-span-1 py-2 px-3 rounded-md bg-muted">
          <p className="font-semibold">{formatRemainingTime(course)}</p>
          <p className="text-muted-foreground">Remaining</p>
        </div>
      </div>
    </div>
  );
};

// Helper function to format remaining time
function formatRemainingTime(course: any): string {
  // Calculate total minutes of content
  const totalMinutes = course.sections.reduce((acc: number, section: any) => {
    return acc + section.items.reduce((sectionAcc: number, item: any) => {
      if (item.type === 'video' && !item.completed) {
        return sectionAcc + convertToMinutes(item.duration);
      }
      return sectionAcc;
    }, 0);
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Helper function to convert duration string to minutes
function convertToMinutes(duration: string): number {
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60);
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]) + Math.round(parseInt(parts[2]) / 60);
  }
  return 0;
}

export default CourseProgress;

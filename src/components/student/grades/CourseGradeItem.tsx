
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

interface CourseGradeItemProps {
  course: string;
  grade: number;
  status: string;
  isLast?: boolean;
}

// Helper function to determine grade letter
const getGradeLetter = (grade: number) => {
  if (grade >= 90) return 'A';
  if (grade >= 80) return 'B';
  if (grade >= 70) return 'C';
  if (grade >= 60) return 'D';
  return 'F';
};

// Helper function to determine color based on grade
const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'text-green-500';
  if (grade >= 80) return 'text-blue-500';
  if (grade >= 70) return 'text-yellow-500';
  if (grade >= 60) return 'text-orange-500';
  return 'text-red-500';
};

const CourseGradeItem = ({ course, grade, status, isLast = false }: CourseGradeItemProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{course}</h3>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>
        <div className={`font-bold ${getGradeColor(grade)}`}>
          {grade}% ({getGradeLetter(grade)})
        </div>
      </div>
      
      <Progress value={grade} className="h-2" />
      
      {!isLast && <Separator className="my-2" />}
    </div>
  );
};

export default CourseGradeItem;

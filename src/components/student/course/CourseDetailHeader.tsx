
import React from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

interface CourseDetailHeaderProps {
  course: {
    title: string;
    instructor: string;
    category?: string;
    progress: number;
  };
}

const CourseDetailHeader = ({ course }: CourseDetailHeaderProps) => {
  console.log('ssss',course);

  return (
    <div>
      <Link to="/student/courses" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-flex items-center">
        ← Back to All Courses
      </Link>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          {course.category && (
            <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">
              {course.category}
            </span>
          )}
          <h1 className="text-3xl font-bold mt-2 mb-1">{course.title}</h1>
          <p className="text-muted-foreground">Instructor: {course.instructor}</p>
        </div>
        
        <div className="flex flex-col gap-2 min-w-[200px]">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailHeader;


import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ButtonCustom } from '@/components/ui/button-custom';

interface CourseType {
  id: string;
  title: string;
  instructor: string;
  image: string;
  progress: number;
}

interface AssignmentCourseInfoProps {
  course: CourseType | null;
}

const AssignmentCourseInfo = ({ course }: AssignmentCourseInfoProps) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Course Information</CardTitle>
        <CardDescription>
          Related to your assignment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {course ? (
          <>
            <div className="aspect-video rounded-md overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="object-cover w-full h-full"
              />
            </div>
            
            <h3 className="font-medium">{course.title}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Instructor: {course.instructor}</span>
            </div>
            
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Your progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
            
            <Link to={`/student/course/${course.id}`} className="block mt-4">
              <ButtonCustom variant="outline" className="w-full">
                Go to Course
              </ButtonCustom>
            </Link>
          </>
        ) : (
          <p className="text-muted-foreground">No course information available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AssignmentCourseInfo;

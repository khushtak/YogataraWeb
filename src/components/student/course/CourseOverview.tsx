
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseOverviewProps {
  course: {
    description?: string;
    instructor: string;
    category?: string;
  };
}

const CourseOverview = ({ course }: CourseOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {course.description && (
          <div>
            <h3 className="font-medium text-base mb-2">Description</h3>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
        )}
        
        <div>
          <h3 className="font-medium text-base mb-2">Instructor</h3>
          <p className="text-muted-foreground">{course.instructor}</p>
        </div>
        
        {course.category && (
          <div>
            <h3 className="font-medium text-base mb-2">Category</h3>
            <p className="text-muted-foreground">{course.category}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseOverview;

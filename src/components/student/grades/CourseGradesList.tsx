
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CourseGradeItem from './CourseGradeItem';

export interface CourseGrade {
  course: string;
  grade: number;
  status: string;
}

interface CourseGradesListProps {
  courseGrades: CourseGrade[];
}

const CourseGradesList = ({ courseGrades }: CourseGradesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Grades</CardTitle>
        <CardDescription>Your grades for all enrolled courses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {courseGrades.map((course, index) => (
          <CourseGradeItem
            key={index}
            course={course.course}
            grade={course.grade}
            status={course.status}
            isLast={index === courseGrades.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseGradesList;

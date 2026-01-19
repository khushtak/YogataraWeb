
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CourseGradeDetailsProps {
  courseTitle: string;
  instructor: string;
  overallGrade: string;
  assignments: {
    title: string;
    type: string;
    grade: string;
    maxGrade: string;
    status: string;
  }[];
}

const CourseGradeDetails = ({
  courseTitle,
  instructor,
  overallGrade,
  assignments
}: CourseGradeDetailsProps) => {
  // Transform assignments for chart visualization
  const chartData = assignments.map(assignment => ({
    name: assignment.title,
    grade: parseFloat(assignment.grade),
    maxGrade: parseFloat(assignment.maxGrade)
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{courseTitle}</CardTitle>
        <div className="text-sm text-muted-foreground">{instructor}</div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Overall Grade</h3>
          <div className="text-2xl font-bold">{overallGrade}</div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Grade Breakdown</h3>
          <div className="h-64 w-full">
            <ChartContainer config={{}}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="grade" fill="#8884d8" name="Your Grade" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Assignments</h3>
          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 py-2">
                <div className="col-span-6 md:col-span-5">
                  <div className="font-medium">{assignment.title}</div>
                  <div className="text-sm text-muted-foreground">{assignment.type}</div>
                </div>
                <div className="col-span-3 md:col-span-4 flex items-center">
                  <div className="text-sm md:text-base">
                    {assignment.grade} / {assignment.maxGrade}
                  </div>
                </div>
                <div className="col-span-3 flex items-center justify-end">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium
                    ${assignment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      assignment.status === 'Missing' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseGradeDetails;

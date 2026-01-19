
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ButtonCustom } from '@/components/ui/button-custom';

const CourseDiscussions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Discussions</CardTitle>
        <CardDescription>
          Engage with your instructor and fellow students
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No discussions yet</AlertTitle>
          <AlertDescription>
            Be the first to start a discussion about this course. Ask questions, share insights, or discuss course topics.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <ButtonCustom>
            Start a New Discussion
          </ButtonCustom>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseDiscussions;

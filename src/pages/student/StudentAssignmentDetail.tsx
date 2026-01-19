
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentLayout from '@/components/student/StudentLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { getAssignment, getStudentCourseById } from '@/utils/data';
import AssignmentHeader from '@/components/student/assignment/AssignmentHeader';
import AssignmentInstructions from '@/components/student/assignment/AssignmentInstructions';
import AssignmentSubmissionForm from '@/components/student/assignment/AssignmentSubmissionForm';
import AssignmentCourseInfo from '@/components/student/assignment/AssignmentCourseInfo';
import { Link } from 'react-router-dom';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Progress } from '@/components/ui/progress';
import baseUrl from '@/config/Config';

const StudentAssignmentDetail = () => {
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const [assignment, setAssignment] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (assignmentId) {
      const assignment = getQuestionsByCourse(assignmentId);
      setAssignment(assignment);

      setIsLoading(false);
    }
  }, [assignmentId]);

  const getQuestionsByCourse = async (courseId: string) => {
    try {
      const response = await fetch(`${baseUrl}/get-questions/${courseId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch questions");
      }

      return data.test; // Format data before returning
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };


  if (isLoading) {
    return (
      <StudentLayout>
        <div className="h-full flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </StudentLayout>
    );
  }

  if (!assignment) {
    return (
      <StudentLayout>
        <div className="flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Assignment Not Found</h1>
          <p className="text-muted-foreground mb-6">The assignment you're looking for doesn't exist or has been removed.</p>
          <Link to="/student/assignments">
            <ButtonCustom>Back to Assignments</ButtonCustom>
          </Link>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-8">
        <AssignmentHeader assignment={assignment} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="instructions">
              <TabsList>
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="submission">Submission</TabsTrigger>
              </TabsList>

              <TabsContent value="instructions" className="space-y-6 mt-6">
                <AssignmentInstructions assignment={assignment} />
              </TabsContent>

              <TabsContent value="submission" className="mt-6">
                <AssignmentSubmissionForm courseId={assignmentId} />
              </TabsContent>
            </Tabs>
          </div>

          {/* <div>
            <AssignmentCourseInfo course={course} />
          </div> */}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentAssignmentDetail;

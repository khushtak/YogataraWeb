import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Search, Filter, Clock, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import {
  getUpcomingAssignmentsData,
  getCompletedAssignmentsData,
  formatDate,
  getTimeRemaining,
  getBadgeVariant,
  AssignmentSimple,
  CompletedAssignment
} from '@/utils/data/assignmentsDataUtils';
import baseUrl from '@/config/Config';

const StudentAssignments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getUserProgress("sayanmyself50@gmail.com");
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  // const upcomingAssignments = getUpcomingAssignmentsData();
  const [upcomingAssignments, setUpcomingAssignments] = useState([]);
  // const completedAssignments = getCompletedAssignmentsData();
  const [completedAssignments, setCompletedAssignments] = useState([]);

  const filteredUpcoming = upcomingAssignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = completedAssignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  interface CompletedTest {
    id: string;
    title: string;
    course: string;
    submittedDate: string;
    grade: string;
    feedback: string;
    type: string;
    points: number;
  }
  
  interface UpcomingTest {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    description: string;
    type: string;
    points: number;
    status: "upcoming";
  }
  
  const transformToTestAssignments = (
    userProgress: any,
    courseDetails: any[]
  ): { completedTests: CompletedTest[]; upcomingTests: UpcomingTest[] } => {
    const completedTests: CompletedTest[] = [];
    const upcomingTests: UpcomingTest[] = [];
  
    userProgress.courseDetails.forEach((course: any, index: number) => {
      const fullCourse = courseDetails.find((c) => c?.courseId === course.courseId);
  
      const commonData = {
        id: course.courseId,
        title: fullCourse?.courseName || "Untitled Course",
        course: fullCourse?.courseCategory || "General Course",
        points: 100,
      };
  
      if (course.testsTaken.length > 0) {
        course.testsTaken.forEach((test: any) => {
          if (test.score !== undefined) {
            completedTests.push({
              ...commonData,
              submittedDate: new Date().toISOString(), // Placeholder for now
              grade: `${test.score}/${test.totalMarks}`,
              feedback: "Great job! Keep up the good work.", // Placeholder for now
              type: "exercise",
            });
          } else {
            upcomingTests.push({
              ...commonData,
              dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
              description: fullCourse?.courseDescription || "No description available.",
              type: "test",
              status: "upcoming",
            });
          }
        });
      } else {
        upcomingTests.push({
          ...commonData,
          dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
          description: fullCourse?.courseDescription || "No description available.",
          type: "test",
          status: "upcoming",
        });
      }
    });
  
    return { completedTests, upcomingTests };
  };
  

  const getCourseById = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/get-course/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch course");
      }

      const course = await response.json();

      // console.log(course);
      return course;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };

  const getUserProgress = async (userEmail: string) => {
    try {
      const response = await fetch(`${baseUrl}/user-progress/${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // console.log("User progress fetched successfully:", data);

      const courseIds = data.userProgress.courseDetails.map((course: any) => course.courseId);

      // Fetch course details for each course ID
      const courses = await Promise.all(courseIds.map((id: string) => getCourseById(id)));

      // console.log("Fetched courses:", courses);

      // Transform user progress with additional course details
      const transformedAssignments = transformToTestAssignments(data.userProgress, courses);

      // console.log("Completed Tests:", transformedAssignments.completedTests);
      // console.log("Upcoming Tests:", transformedAssignments.upcomingTests);


      // console.log(transformedAssignments);
      setUpcomingAssignments(transformedAssignments.upcomingTests);
      setCompletedAssignments(transformedAssignments.completedTests);

      return transformedAssignments;
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Assignments</h1>
            <p className="text-muted-foreground">Track your upcoming and past assignments</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search assignments..."
                className="pl-9 pr-4 py-2 w-full bg-background border border-border rounded-md focus:border-primary focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <ButtonCustom variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </ButtonCustom>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({filteredUpcoming.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({filteredCompleted.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {filteredUpcoming.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No assignments found</h3>
                  <p className="text-muted-foreground">No upcoming assignments match your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredUpcoming.map(assignment => (
                  <Card key={assignment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                              {assignment.course}
                            </Badge>
                            <Badge className="capitalize" variant="default">
                              {assignment.type}
                            </Badge>
                          </div>

                          <h3 className="text-xl font-semibold">{assignment.title}</h3>

                          <p className="text-muted-foreground text-sm">
                            {assignment.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-primary" />
                              <span>Due: {formatDate(assignment.dueDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-amber-500" />
                              <span>{getTimeRemaining(assignment.dueDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{assignment.points} points</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Link to={`/student/assignments/${assignment.id}`}>
                            <ButtonCustom>Start Assignment</ButtonCustom>
                          </Link>
                          <Link to={`/student/assignments/${assignment.id}/details`}>
                            <ButtonCustom variant="outline" size="sm">View Details</ButtonCustom>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {filteredCompleted.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No completed assignments found</h3>
                  <p className="text-muted-foreground">No completed assignments match your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredCompleted.map(assignment => (
                  <Card key={assignment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                              {assignment.course}
                            </Badge>
                            <Badge
                              variant="default"
                              className="capitalize"
                              style={{ backgroundColor: '#16a34a' }}
                            >
                              Completed
                            </Badge>
                          </div>

                          <h3 className="text-xl font-semibold">{assignment.title}</h3>

                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Submitted: {formatDate(assignment.submittedDate)}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="text-sm font-medium">Grade: {assignment.grade}</span>
                            </div>
                          </div>

                          <Separator className="my-2" />

                          <div className="pt-1">
                            <h4 className="text-sm font-medium mb-1">Feedback:</h4>
                            <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Link to={`/student/assignments/${assignment.id}/submission`}>
                            <ButtonCustom variant="outline">Take Quiz Again</ButtonCustom>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentAssignments;


import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getEnrolledCourses, getCompletedCourses } from '@/utils/dataUtils';
import baseUrl from '@/config/Config';

const StudentCourses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getUserProgress("sayanmyself50@gmail.com");
  }, []);

  // Get data from our data utils
  // const inProgressCourses = getEnrolledCourses();
  // const completedCourses = getCompletedCourses();

  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  interface Lesson {
    title: string;
    duration: string;
    completed: boolean;
    type: string;
  }

  interface Module {
    title: string;
    lessons: Lesson[];
  }

  interface StudentCourse {
    id: string;
    title: string;
    progress: number;
    instructor: string;
    nextLesson: string;
    nextLessonTime: string;
    image: string;
    category: string;
    description: string;
    modules: Module[];
  }

  const transformUserProgress = (userProgress: any, courseDetails: any[]): StudentCourse[] => {
    return userProgress.courseDetails.map((course: any, index: number) => {
      const fullCourse = courseDetails.find(
        (c) => c?._id === course.courseId || c?.courseId === course.courseId
      );


      // Extract instructor details
      // console.log(fullCourse);

      // userProgress.courseDetails.forEach((course) => {
      //   console.log(`Looking for Course ID: ${course.courseId}`);
      //   console.log("Available Course IDs:", courseDetails.map((c) => c.id));

      //   const fullCourse = courseDetails.find((c) => c?.id === course.courseId || c?.courseId === course.courseId);

      //   console.log(`Found Course:`, fullCourse);
      // });


      const instructor = fullCourse?.courseInStructure?.[0] || {
        name: "Unknown Instructor",
        bio: "No bio available",
        image: "https://via.placeholder.com/100",
      };

      return {
        id: course.courseId || (index + 1).toString(),
        title: fullCourse?.title || course.courseName || "Untitled Course",
        progress: (course.videosWatched / (course.totalVideos || 1)) * 100,
        instructor: instructor.name,
        instructorBio: instructor.bio,
        instructorImage: instructor.image,
        nextLesson: fullCourse?.nextLesson || "Upcoming Lesson",
        nextLessonTime: fullCourse?.nextLessonTime || "TBD",
        image: fullCourse?.courseImage || "https://via.placeholder.com/300",
        category: fullCourse?.category || "Unknown Category",
        description: fullCourse?.description || "No description available.",
        modules: fullCourse?.modules || [],
      };
    });
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
      const transformedData = transformUserProgress(data.userProgress, courses);

      // console.log(transformedData);

      // Filtering completed courses
      const completedCourses = transformedData.filter(course => course.progress === 100);

      // Filtering other courses
      const ongoingCourses = transformedData.filter(course => course.progress !== 100);

      setCompletedCourses(completedCourses);

      setInProgressCourses(ongoingCourses);

      return transformedData;
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-muted-foreground">Manage and track your learning journey</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2 w-full bg-background border border-border rounded-md focus:border-primary focus:outline-none"
              />
            </div>

            <ButtonCustom variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </ButtonCustom>
          </div>
        </div>

        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList>
            <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressCourses.map(course => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video relative">
                    <img
                      src={course.image || '/placeholder.svg'}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-xs font-medium text-white bg-primary/80 px-2 py-1 rounded-full">
                        {course.category || 'Course'}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="px-5 pb-2 pt-5">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 px-5 pb-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  </CardContent>

                  <CardFooter className="px-5 pb-5 pt-0">
                    <Link to={`/course/${course.id}`} className="w-full">
                      <ButtonCustom className="w-full">Continue Learning</ButtonCustom>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map(course => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video relative">
                    <img
                      src={course.image || '/placeholder.svg'}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <span className="text-xs font-medium text-white bg-green-500/80 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  </div>

                  <CardHeader className="px-5 pb-2 pt-5">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 px-5 pb-3">
                    <p className="text-sm text-muted-foreground">
                      Completed on: {new Date(course.completedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </CardContent>

                  <CardFooter className="px-5 pb-5 pt-0">
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <ButtonCustom variant="outline">View Certificate</ButtonCustom>
                      <Link to={`/course/${course.id}`} className="w-full">
                        <ButtonCustom variant="secondary" className="w-full">Review</ButtonCustom>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentCourses;

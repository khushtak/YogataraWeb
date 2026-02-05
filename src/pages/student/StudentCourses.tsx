import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import baseUrl from '@/config/Config';
import { getToken, getUser } from '@/utils/auth';

const StudentCourses = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEnrolledAndProgress();
  }, []);

  const [inProgressCourses, setInProgressCourses] = useState<any[]>([]);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);

  /* ================= TYPES ================= */

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
    completedDate?: string;
  }

  /* ================= MAIN API LOGIC ================= */

const fetchEnrolledAndProgress = async () => {
  try {
    const user = getUser();
    const token = getToken();
console.log('sssss',user);

    if (!user?.id || !user?.email) return;

    /* 1️⃣ ENROLLED COURSES */
    const enrolledRes = await fetch(
      `${baseUrl}/enrolled-courses/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const enrolledData = await enrolledRes.json();
    const enrolledCourses = enrolledData.courses || [];

    /* 2️⃣ USER PROGRESS (SAFE) */
    let progressMap = new Map();

    try {
      const progressRes = await fetch(
        `${baseUrl}/user-progress/${user.email}`
      );
      console.log('sssssssss',progressRes);
      
      const progressData = await progressRes.json();

      const courseDetails =
        progressData?.userProgress?.courseDetails || [];

      progressMap = new Map(
        courseDetails.map((c: any) => [c.courseId, c])
      );
    } catch (e) {
      console.warn("⚠️ Progress not found, defaulting to 0%");
    }

    /* 3️⃣ MERGE DATA ✅ */
    const mergedCourses = enrolledCourses.map((course: any) => {
      const progressInfo = progressMap.get(course.courseId);

      const progress = progressInfo
        ? Math.round(
            (progressInfo.videosWatched /
              (progressInfo.totalVideos || 1)) * 100
          )
        : 0;

      const instructor =
        course.courseInStructure?.[0]?.name || "Instructor";

      return {
        id: course.courseId,
        title: course.courseName,
        progress,
        instructor,
        nextLesson: "Continue learning",
        nextLessonTime: "",
        image: course.courseImage,
        category: course.courseCategory,
        description: course.courseDescription,
        modules: course.videoes || [],
        completedDate: progress === 100 ? new Date().toISOString() : undefined,
      };
    });

    setCompletedCourses(mergedCourses.filter(c => c.progress === 100));
    setInProgressCourses(mergedCourses.filter(c => c.progress < 100));

  } catch (error) {
    console.error("❌ Error loading enrolled courses:", error);
  }
};


  /* ================= UI ================= */

  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-muted-foreground">
              Manage and track your learning journey
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2 w-full bg-background border border-border rounded-md"
              />
            </div>

            <ButtonCustom variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </ButtonCustom>
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="in-progress">
          <TabsList>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
          </TabsList>

          {/* IN PROGRESS */}
          <TabsContent value="in-progress">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressCourses.map(course => (
                <Card key={course.id} className="flex flex-col">
                  <img
                    src={course.image}
                    className="h-40 w-full object-cover"
                  />

                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      Instructor: {course.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Progress value={course.progress} />
                    <p className="text-sm mt-2">
                      {course.progress}% completed
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Link to={`/student/course/${course.id}`} className="w-full">
                      <ButtonCustom className="w-full">
                        Continue Learning
                      </ButtonCustom>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* COMPLETED */}
          <TabsContent value="completed">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map(course => (
                <Card key={course.id} className="flex flex-col">
                  <img
                    src={course.image}
                    className="h-40 w-full object-cover"
                  />

                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      Instructor: {course.instructor}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="grid grid-cols-2 gap-2">
                    <ButtonCustom variant="outline">
                      View Certificate
                    </ButtonCustom>
                    <Link to={`/course/${course.id}`} className="w-full">
                      <ButtonCustom variant="secondary" className="w-full">
                        Review
                      </ButtonCustom>
                    </Link>
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

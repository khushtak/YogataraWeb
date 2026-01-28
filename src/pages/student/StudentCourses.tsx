import React, { useEffect, useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import baseUrl from "@/config/Config";

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
  id: string;              // 👉 courseId
  title: string;
  progress: number;
  instructor: string;
  instructorBio?: string;
  instructorImage?: string;
  nextLesson: string;
  nextLessonTime: string;
  image: string;
  category: string;
  description: string;
  modules: Module[];
}

/* ================= COMPONENT ================= */

const StudentCourses = () => {
  const [inProgressCourses, setInProgressCourses] = useState<StudentCourse[]>([]);
  const [completedCourses, setCompletedCourses] = useState<StudentCourse[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserProgress("sayanmyself50@gmail.com");
  }, []);

  /* ================= GET COURSE BY courseId ================= */

  const getCourseById = async (courseId: string) => {
    try {
      const response = await fetch(`${baseUrl}/get-course/${courseId}`);

      if (!response.ok) {
        console.warn("Course not found:", courseId);
        return null; // ❗ crash prevent
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };

  /* ================= TRANSFORM USER PROGRESS ================= */

  const transformUserProgress = (userProgress: any, courses: any[]): StudentCourse[] => {
    return userProgress.courseDetails.map((progressCourse: any) => {
      const fullCourse = courses.find(
        (c) => c?.courseId === progressCourse.courseId
      );

      if (!fullCourse) return null;

      const instructor = fullCourse.courseInStructure?.[0] || {
        name: "Unknown Instructor",
        bio: "",
        image: ""
      };

      return {
        id: progressCourse.courseId, // ✅ ONLY courseId
        title: fullCourse.courseName || "Untitled Course",
        progress: Math.round(
          (progressCourse.videosWatched / (progressCourse.totalVideos || 1)) * 100
        ),
        instructor: instructor.name,
        instructorBio: instructor.bio,
        instructorImage: instructor.image,
        nextLesson: "Continue learning",
        nextLessonTime: "",
        image: fullCourse.courseImage,
        category: fullCourse.courseCategory || "Course",
        description: fullCourse.courseDescription || "",
        modules: fullCourse.videoes || []
      };
    }).filter(Boolean);
  };

  /* ================= GET USER PROGRESS ================= */

  const getUserProgress = async (userEmail: string) => {
    try {
      const response = await fetch(`${baseUrl}/user-progress/${userEmail}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch progress");
      }

      const courseIds = data.userProgress.courseDetails.map(
        (c: any) => c.courseId
      );

      // ✅ fetch all courses using courseId
      const courses = (
        await Promise.all(courseIds.map((id: string) => getCourseById(id)))
      ).filter(Boolean);

      const transformed = transformUserProgress(data.userProgress, courses);

      setCompletedCourses(transformed.filter(c => c.progress === 100));
      setInProgressCourses(transformed.filter(c => c.progress < 100));
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  /* ================= UI ================= */

  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-muted-foreground">
              Manage and track your learning journey
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <input
                placeholder="Search courses..."
                className="pl-9 pr-4 py-2 border rounded-md"
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
                <Card key={course.id}>
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
                    <p className="text-sm mt-2">{course.progress}% completed</p>
                  </CardContent>

                  <CardFooter>
                    <Link to={`/course/${course.id}`} className="w-full">
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
                <Card key={course.id}>
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

                  <CardFooter>
                    <Link to={`/course/${course.id}`} className="w-full">
                      <ButtonCustom variant="secondary" className="w-full">
                        Review Course
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

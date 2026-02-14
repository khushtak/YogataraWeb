import React, { useEffect, useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  BookOpen,
  Clock,
  Award,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import baseUrl from "@/config/Config";
import { getUser, getToken } from "@/utils/auth";

/* ================= STAT CARD ================= */
const StatCard = ({
  title,
  value,
  icon: Icon,
  bg,
  color,
}: any) => (
  <Card>
    <CardContent className="p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>

      <div className={`p-3 rounded-full ${bg}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </CardContent>
  </Card>
);

/* ================= MAIN ================= */
const StudentDashboard = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDashboardCourses();
  }, []);

  /* ================= API ================= */
  const fetchDashboardCourses = async () => {
    try {
      const user = getUser();
      const token = getToken();

      if (!user?.id || !user?.email) return;

      setStudentName(user.full_name || "Student");

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
      const enrolledCourses = enrolledData?.courses || [];

      /* 2️⃣ USER PROGRESS (SAFE) */
      let progressMap = new Map();

      try {
        const progressRes = await fetch(
          `${baseUrl}/user-progress/${user.email}`
        );
        const progressData = await progressRes.json();

        const courseDetails =
          progressData?.userProgress?.courseDetails || [];

        progressMap = new Map(
          courseDetails.map((c: any) => [c.courseId, c])
        );
      } catch {
        console.warn("Progress not found, default 0%");
      }

      /* 3️⃣ MERGE DATA */
      const formatted = enrolledCourses.map((course: any) => {
        const progressInfo = progressMap.get(course.courseId);

        const progress = progressInfo
          ? Math.round(
              (progressInfo.videosWatched /
                (progressInfo.totalVideos || 1)) * 100
            )
          : 0;

        return {
          id: course.courseId,
          title: course.courseName,
          image: course.courseImage,
          instructor:
            course.courseInStructure?.[0]?.name || "Instructor",
          progress,
        };
      });

      setCourses(formatted);
    } catch (err) {
      console.error("Dashboard load error:", err);
      setCourses([]);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back,{" "}
            <span className="text-primary">{studentName}</span> 👋
          </h1>
          <p className="text-muted-foreground">
            Track your learning progress
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Enrolled Courses"
            value={courses.length}
            icon={BookOpen}
            bg="bg-purple-100"
            color="text-purple-600"
          />
          <StatCard
            title="Learning Hours"
            value="0"
            icon={Clock}
            bg="bg-orange-100"
            color="text-orange-500"
          />
          <StatCard
            title="Certificates"
            value="0"
            icon={Award}
            bg="bg-green-100"
            color="text-green-600"
          />
          <StatCard
            title="Upcoming Events"
            value="0"
            icon={Calendar}
            bg="bg-blue-100"
            color="text-blue-600"
          />
        </div>

        {/* ================= COURSES ================= */}
        <Card>
         <CardHeader className="flex flex-row items-center justify-between">
  <div>
    <CardTitle>My Courses</CardTitle>
    <CardDescription>
      Continue where you left off
    </CardDescription>
  </div>

  <div className="flex gap-2">
    <Link to="/courses">
      <ButtonCustom variant="secondary" size="sm">
        Explore Courses
      </ButtonCustom>
    </Link>

    <Link to="/student/courses">
      <ButtonCustom variant="outline" size="sm">
        View All
      </ButtonCustom>
    </Link>
  </div>
</CardHeader>


          <CardContent>
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  You haven’t enrolled in any course yet.
                </p>

                <Link to="/courses">
                  <ButtonCustom className="mt-4">
                    Explore Courses
                  </ButtonCustom>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.slice(0, 3).map(course => (
                  <Card key={course.id} className="flex flex-col">
                    <img
                      src={course.image}
                      className="h-40 w-full object-cover rounded-t-md"
                    />

                    <CardHeader>
                      <CardTitle className="text-base">
                        {course.title}
                      </CardTitle>
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

                    <div className="mt-auto p-4 pt-0">
                      <Link
                        to={`/student/course/${course.id}`}
                        className="w-full"
                      >
                        <ButtonCustom className="w-full">
                          Continue Learning
                        </ButtonCustom>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;

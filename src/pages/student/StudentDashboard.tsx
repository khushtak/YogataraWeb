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
import { Separator } from "@/components/ui/separator";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  BookOpen,
  Clock,
  Award,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import baseUrl from "@/config/Config";
import { getUser } from "@/utils/auth";

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
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [studentName, setStudentName] = useState("Student");

  useEffect(() => {
    window.scrollTo(0, 0);

    const user = getUser();
    if (user?.full_name && user?.email) {
      setStudentName(user.full_name);
      getUserProgress(user.email);
    }
  }, []);

  /* ================= API ================= */
  const getCourseById = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/get-courses/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const getUserProgress = async (email: string) => {
    try {
      const res = await fetch(`${baseUrl}/user-progress/${email}`);
      const data = await res.json();

      if (!data?.userProgress?.courseDetails?.length) {
        setEnrolledCourses([]);
        return;
      }

      const courses = await Promise.all(
        data.userProgress.courseDetails.map((c: any) =>
          getCourseById(c.courseId)
        )
      );

      const formatted = data.userProgress.courseDetails.map(
        (course: any, i: number) => ({
          id: course.courseId,
          title: courses[i]?.title || "Untitled Course",
          progress:
            (course.videosWatched / (course.totalVideos || 1)) * 100,
          instructor:
            courses[i]?.courseInStructure?.[0]?.name || "Instructor",
        })
      );

      setEnrolledCourses(formatted);
    } catch (err) {
      console.error(err);
      setEnrolledCourses([]);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back,{" "}
            <span className="text-primary">{studentName}</span> 👋
          </h1>
          <p className="text-muted-foreground">
            Track your astrology learning progress.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Enrolled Courses"
            value={enrolledCourses.length}
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

        {/* COURSES */}
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>
              Your enrolled courses will appear here
            </CardDescription>
          </CardHeader>

          <CardContent>
            {enrolledCourses.length === 0 ? (
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
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div key={course.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {course.instructor}
                        </p>
                      </div>

                      <Link to={`/student/course/${course.id}`}>
                        <ButtonCustom size="sm" variant="outline">
                          Continue
                        </ButtonCustom>
                      </Link>
                    </div>

                    <Progress value={course.progress} className="mt-3" />
                    <Separator className="mt-4" />
                  </div>
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

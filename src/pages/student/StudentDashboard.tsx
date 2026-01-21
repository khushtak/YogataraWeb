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

/* ================= STATIC COURSES ================= */
const STATIC_COURSES = [
  {
    id: "vedic-101",
    title: "Vedic Astrology Foundations",
    instructor: "Acharya Yogesh",
    progress: 35,
  },
  {
    id: "kundli-202",
    title: "Kundli Reading & Analysis",
    instructor: "Guru Ramesh",
    progress: 62,
  },
  {
    id: "navagraha-303",
    title: "Navagraha Deep Study",
    instructor: "Pandit Shankar",
    progress: 18,
  },
];

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserProgress("sayanmyself50@gmail.com");
  }, []);

  const getCourseById = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/get-course/${id}`);
      if (!res.ok) throw new Error("Failed");
      return await res.json();
    } catch {
      return null;
    }
  };

  const getUserProgress = async (email) => {
    try {
      const res = await fetch(`${baseUrl}/user-progress/${email}`);
      const data = await res.json();

      const courses = await Promise.all(
        data.userProgress.courseDetails.map((c) =>
          getCourseById(c.courseId)
        )
      );

      const formatted = data.userProgress.courseDetails.map((course, i) => ({
        id: course.courseId,
        title: courses[i]?.title || "Untitled Course",
        progress:
          (course.videosWatched / (course.totalVideos || 1)) * 100,
        instructor:
          courses[i]?.courseInStructure?.[0]?.name || "Instructor",
      }));

      setEnrolledCourses(formatted);
    } catch (err) {
      console.error(err);
      setEnrolledCourses([]); // fallback trigger
    }
  };

  const coursesToShow =
    enrolledCourses.length > 0 ? enrolledCourses : STATIC_COURSES;

  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Welcome back, Student
          </h1>
          <p className="text-muted-foreground">
            Track your astrology learning progress.
          </p>
        </div>

        {/* STATS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Enrolled Courses
                </p>
                <p className="text-2xl font-bold">
                  {coursesToShow.length}
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Learning Hours
                </p>
                <p className="text-2xl font-bold">24.5</p>
              </div>
              <div className="bg-amber-500/10 p-3 rounded-full">
                <Clock className="text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Certificates
                </p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-full">
                <Award className="text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Upcoming Events
                </p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Calendar className="text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CURRENT COURSES */}
        <Card>
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>
              Continue your astrology journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {coursesToShow.map((course) => (
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

                <Progress
                  value={course.progress}
                  className="mt-3"
                />
                <Separator className="mt-4" />
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;

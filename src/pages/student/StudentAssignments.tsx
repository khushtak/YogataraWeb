import React, { useEffect, useState } from "react";
import StudentLayout from "@/components/student/StudentLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  Search,
  Clock,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import baseUrl from "@/config/Config";
import { getUser } from "@/utils/auth";

/* ================= TYPES ================= */

interface UpcomingAssignment {
  id: string;
  title: string;
  course: string;
  dueDate?: string;
  description?: string;
}

interface CompletedAssignment {
  id: string;
  title: string;
  course: string;
  score: number;
  totalMarks: number;
}

/* ================= HELPERS ================= */

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

/* ================= COMPONENT ================= */

const StudentAssignments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [upcomingAssignments, setUpcomingAssignments] = useState<
    UpcomingAssignment[]
  >([]);
  const [completedAssignments, setCompletedAssignments] = useState<
    CompletedAssignment[]
  >([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const a=getUser()
    console.log('iii',a);
    
    getUserProgress(a.email);
  }, []);

  /* ================= SEARCH ================= */

  const filteredUpcoming = upcomingAssignments.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = completedAssignments.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= API ================= */

  const getCourseById = async (id: string) => {
    try {
      const res = await fetch(`${baseUrl}/get-course/${id}`);
      if (!res.ok) throw new Error();
      return await res.json();
    } catch {
      return null;
    }
  };

  const getUserProgress = async (email: string) => {
    console.log('8888',email);
    
    try {
      const res = await fetch(`${baseUrl}/user-progress/${email}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Progress fetch failed");

      const courseDetails = data.userProgress.courseDetails || [];
console.log('ppppppppp',res);

      const courses = await Promise.all(
        courseDetails.map((c: any) => getCourseById(c.courseId))
      );

      const upcoming: UpcomingAssignment[] = [];
      const completed: CompletedAssignment[] = [];

      courseDetails.forEach((course: any) => {
        const fullCourse = courses.find(
          (c) => c?.courseId === course.courseId
        );

        const base = {
          id: course.courseId,
          title: fullCourse?.courseName || "Untitled Course",
          course: fullCourse?.courseCategory || "General",
        };
        console.log('oooo',base);
        

        if (course.testsTaken?.length) {
          course.testsTaken.forEach((test: any) => {
            if (test.score !== undefined) {
              completed.push({
                ...base,
                score: test.score,
                totalMarks: test.totalMarks,
              });
            } else {
              upcoming.push({
                ...base,
                description:
                  fullCourse?.courseDescription || "No description available",
              });
            }
          });
        } else {
          upcoming.push({
            ...base,
            description:
              fullCourse?.courseDescription || "No description available",
          });
        }
      });
console.log('ppp',upcoming);

      setUpcomingAssignments(upcoming);
      setCompletedAssignments(completed);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= UI ================= */

  return (
    <StudentLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Assignments</h1>
            <p className="text-muted-foreground">
              Track your tests and completed assignments
            </p>
          </div>

          {/* SEARCH BAR FIXED */}
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course or title"
              className="w-full h-11 pl-9 pr-4 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({filteredUpcoming.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({filteredCompleted.length})
            </TabsTrigger>
          </TabsList>

          {/* ================= UPCOMING ================= */}
          <TabsContent value="upcoming" className="space-y-4">
            {filteredUpcoming.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No upcoming assignments
              </p>
            )}

            {filteredUpcoming.map((a) => (
              <Card key={a.id}>
                <CardContent className="p-6 space-y-2">
                  <Badge variant="secondary">{a.course}</Badge>
                  <h3 className="text-xl font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {a.description}
                  </p>

                  <Link to={`/student/assignments/${a.id}`}>
                    <ButtonCustom className="mt-3">
                      Start Assignment
                    </ButtonCustom>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ================= COMPLETED ================= */}
          <TabsContent value="completed" className="space-y-4">
            {filteredCompleted.length === 0 && (
              <p className="text-muted-foreground text-sm">
                No completed assignments
              </p>
            )}

            {filteredCompleted.map((a) => (
              <Card key={a.id}>
                <CardContent className="p-6 space-y-2">
                  <Badge className="bg-green-600 flex w-fit gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </Badge>

                  <h3 className="text-xl font-semibold">{a.title}</h3>

                  <Separator />

                  <p className="text-sm">
                    Score:{" "}
                    <b>
                      {a.score}/{a.totalMarks}
                    </b>
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentAssignments;

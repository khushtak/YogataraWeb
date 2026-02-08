import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentLayout from "@/components/student/StudentLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { toast } from "@/components/ui/use-toast";

import StudentVideoPlayer from "@/components/student/course/StudentVideoPlayer";
import CourseDetailHeader from "@/components/student/course/CourseDetailHeader";
import CourseModules from "@/components/student/course/CourseModules";
import CourseOverview from "@/components/student/course/CourseOverview";
import CourseResources from "@/components/student/course/CourseResources";
import CourseDiscussions from "@/components/student/course/CourseDiscussions";
import CourseProgressSidebar from "@/components/student/course/CourseProgressSidebar";
import baseUrl from "@/config/Config";

// ================= TYPES =================
interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description?: string;
  completed?: boolean;
}

interface Module {
  id: string;
  title: string;
  items: Lesson[];
}

interface Course {
  courseName: string;
  courseImage: string;
  courseDescription: string;
  courseShortDescription: string;
  courseDuration: string;
  courseLevel: string;
  courseLanguage: string;
  modules: Module[];
}

interface CurrentLesson extends Lesson {
  moduleTitle: string;
}

// ================= COMPONENT =================
const StudentCourseDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentLesson, setCurrentLesson] =
    useState<CurrentLesson | null>(null);

  // 🔒 PAGE PROTECTION (UNCHANGED)
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    const disableKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        e.ctrlKey ||
        e.metaKey ||
        (e.ctrlKey && e.shiftKey)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  // ================= FETCH COURSE =================
  useEffect(() => {
    if (!id) {
      console.error("❌ COURSE ID NOT FOUND IN URL");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${baseUrl}/get-course/${id}`);
        const data = await res.json();

        console.log("API DATA 👉", data);

        // ✅ YAHI GALTI THI
        if (!data || !data._id) {
          // setCourse(null);
          setLoading(false);
          return;
        }

        const formattedCourse: Course = {
          ...data,
          modules: data.videoes || [],
        };
        console.log("API DATA 👉", formattedCourse);

        setCourse(formattedCourse);

        if (formattedCourse.modules.length > 0) {
          const firstModule = formattedCourse.modules[0];
          const firstLesson = firstModule.items?.[0];

          if (firstLesson) {
            setCurrentLesson({
              ...firstLesson,
              moduleTitle: firstModule.title || "",
            });
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("FETCH ERROR ❌", err);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // ================= HANDLERS =================
  const startLesson = (moduleTitle: string, lesson: Lesson) => {
    setCurrentLesson({ ...lesson, moduleTitle });

    toast({
      title: "Lesson Started",
      description: lesson.title,
    });

    document
      .getElementById("video-player")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVideoPlayer = () => {
    document
      .getElementById("video-player")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // ================= UI STATES =================
  if (loading) {
        console.log('eeee',course);

    return (
      <StudentLayout>
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-primary rounded-full"></div>
        </div>
      </StudentLayout>
    );
  }

  if (!course) {
    
    return (
      <StudentLayout>
        <div className="flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <Link to="/student/courses">
            <ButtonCustom>Back to Courses</ButtonCustom>
          </Link>
        </div>
      </StudentLayout>
    );
  }
    console.log('eeee2',course);

  // ================= MAIN RENDER =================
  return (
    <StudentLayout>
      <div className="space-y-8">
        <CourseDetailHeader course={course} />

        {currentLesson && (
          <Card id="video-player">
            <StudentVideoPlayer currentLesson={currentLesson} />
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                {/* <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger> */}
              </TabsList>

              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>Track your progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CourseModules
                      modules={course.modules}
                      onStartLesson={startLesson}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="overview">
                <CourseOverview course={course} />
              </TabsContent>

              <TabsContent value="resources">
                <CourseResources modules={course.modules} />
              </TabsContent>

              <TabsContent value="discussions">
                <CourseDiscussions />
              </TabsContent>
            </Tabs>
          </div>

          <CourseProgressSidebar
            course={course}
            currentLesson={currentLesson}
            onContinueLearning={scrollToVideoPlayer}
          />
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCourseDetail;

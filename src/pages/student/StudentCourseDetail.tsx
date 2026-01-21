import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

import StudentLayout from '@/components/student/StudentLayout';
import { getStudentCourseById } from '@/utils/dataUtils';
import { StudentCourse, CourseModule, Lesson, Module } from '@/utils/data/types';

// Import refactored components
import StudentVideoPlayer from '@/components/student/course/StudentVideoPlayer';
import CourseDetailHeader from '@/components/student/course/CourseDetailHeader';
import CourseModules from '@/components/student/course/CourseModules';
import CourseOverview from '@/components/student/course/CourseOverview';
import CourseResources from '@/components/student/course/CourseResources';
import CourseDiscussions from '@/components/student/course/CourseDiscussions';
import CourseProgressSidebar from '@/components/student/course/CourseProgressSidebar';

// Extended type for courses with modules
interface ExtendedStudentCourse extends StudentCourse {
  modules: Module[];
}

// Type for the current lesson
interface CurrentLessonType extends Lesson {
  moduleTitle: string;
}

const StudentCourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<ExtendedStudentCourse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<CurrentLessonType | null>(null);

  /* =====================================================
     🔒 ADDED ONLY: PAGE PRIVACY (RIGHT CLICK + KEYS BLOCK)
     ===================================================== */
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    const disableKeys = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        e.key === 'prt sc' ||
        e.ctrlKey ||
        e.metaKey
      ) {
        e.preventDefault();
      }

      if (
        (e.ctrlKey && ['c', 'v', 'x', 'u', 's', 'p'].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && ['i', 'j'].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', disableRightClick);
    document.addEventListener('keydown', disableKeys);

    return () => {
      document.removeEventListener('contextmenu', disableRightClick);
      document.removeEventListener('keydown', disableKeys);
    };
  }, []);
  /* ================= END ADDED CODE =================== */

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch course data
    if (courseId) {
      const courseData = getStudentCourseById(courseId);
      if (courseData && 'modules' in courseData) {
        setCourse(courseData as ExtendedStudentCourse);
        
        // Find the first incomplete lesson to set as current
        if (courseData.modules) {
          let foundCurrentLesson = false;
          
          for (const module of courseData.modules) {
            for (const lesson of module.lessons) {
              if (!lesson.completed && !foundCurrentLesson) {
                setCurrentLesson({
                  ...lesson,
                  moduleTitle: module.title,
                  completed: lesson.completed || false
                });
                foundCurrentLesson = true;
                break;
              }
            }
            if (foundCurrentLesson) break;
          }
        }
      } else {
        setCourse(null);
      }
      
      setIsLoading(false);
    }
  }, [courseId]);

  const startLesson = (module: string, lesson: Lesson) => {
    setCurrentLesson({
      ...lesson,
      moduleTitle: module
    });
    
    toast({
      title: "Lesson started",
      description: `You're now viewing ${lesson.title}`,
    });
    
    document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToVideoPlayer = () => {
    document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth' });
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

  if (!course) {
    return (
      <StudentLayout>
        <div className="flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/student/courses">
            <ButtonCustom>Back to My Courses</ButtonCustom>
          </Link>
        </div>
      </StudentLayout>
    );
  }

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
            <Tabs defaultValue="content" className="space-y-6">
              <TabsList>
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>
                      Track your progress through the course content
                    </CardDescription>
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
          
          <div>
            <CourseProgressSidebar 
              course={course} 
              currentLesson={currentLesson} 
              onContinueLearning={scrollToVideoPlayer} 
            />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentCourseDetail;

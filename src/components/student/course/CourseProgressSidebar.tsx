
import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Module } from '@/utils/data/types';

interface CourseProgressSidebarProps {
  course: {
    progress: number;
    modules: Module[];
  };
  currentLesson: {
    title: string;
    duration: string;
  } | null;
  onContinueLearning: () => void;
}

const CourseProgressSidebar = ({ course, currentLesson, onContinueLearning }: CourseProgressSidebarProps) => {
  return (
    <Card className="sticky top-16 md:top-24 w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-lg sm:text-xl">Your Progress</CardTitle>
        <CardDescription>
          Track your course completion
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm font-medium">Overall Progress</span>
            <span className="text-xs sm:text-sm font-medium">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <h4 className="font-medium text-sm sm:text-base">Module Progress</h4>
          {course.modules.map((module, index) => {
            const completedLessons = module.lessons.filter(l => l.completed).length;
            const totalLessons = module.lessons.length;
            const moduleProgress = (completedLessons / totalLessons) * 100;
            
            return (
              <div key={index} className="space-y-1 sm:space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm line-clamp-1">{module.title}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {completedLessons}/{totalLessons}
                  </span>
                </div>
                <Progress value={moduleProgress} className="h-1.5" />
              </div>
            );
          })}
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium text-sm sm:text-base mb-3">Next up</h4>
          {currentLesson ? (
            <div className="border rounded-lg p-2 sm:p-3 space-y-2">
              <div className="flex items-center text-xs sm:text-sm">
                <Play className="h-3 w-3 sm:h-4 sm:w-4 text-primary mr-1 sm:mr-2 flex-shrink-0" />
                <span className="font-medium line-clamp-2">{currentLesson.title}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{currentLesson.duration}</span>
              </div>
              <ButtonCustom className="w-full mt-2" size="sm" onClick={onContinueLearning}>
                Continue Learning
              </ButtonCustom>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-muted-foreground">
              You've completed all lessons in this course!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseProgressSidebar;

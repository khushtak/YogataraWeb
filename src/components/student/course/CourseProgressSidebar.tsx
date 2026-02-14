import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ButtonCustom } from '@/components/ui/button-custom';

interface Item {
  title: string;
  completed: boolean;
}

interface Module {
  title: string;
  items?: Item[];
}

interface CourseProgressSidebarProps {
  course?: {
    progress?: number;
    modules?: Module[];
  };
  currentLesson: {
    title: string;
    duration: string;
  } | null;
  onContinueLearning: () => void;
}

const CourseProgressSidebar = ({
  course,
  currentLesson,
  onContinueLearning,
}: CourseProgressSidebarProps) => {

  const modules = course?.modules ?? [];
  const progress = course?.progress ?? 0;
// console.log('sdsa',progress);

  return (
    <Card className="sticky top-16 md:top-24 w-full">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
        <CardDescription>Track your course completion</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* OVERALL */}
        <div>
          <div className="flex justify-between text-sm">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* MODULE PROGRESS */}
        <div className="space-y-4">
          <h4 className="font-medium">Module Progress</h4>

          {modules.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No modules found
            </p>
          )}

          {modules.map((module, index) => {
            const items = module.items ?? []; // 👈 always defined
            const completedItems = items.filter(i => i.completed).length;
            const totalItems = items.length || 1;

            const moduleProgress = Math.round(
              (completedItems / totalItems) * 100
            );

            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{module.title}</span>
                  <span>{completedItems}/{items.length}</span>
                </div>
                <Progress value={moduleProgress} className="h-2" />
              </div>
            );
          })}
        </div>

        <Separator />

        {/* NEXT LESSON */}
        <div>
          <h4 className="font-medium mb-2">Next up</h4>

          {currentLesson ? (
            <div className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-primary" />
                <span className="font-medium">{currentLesson.title}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {currentLesson.duration}
              </div>
              <ButtonCustom className="w-full" onClick={onContinueLearning}>
                Continue Learning
              </ButtonCustom>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Course completed 🎉
            </p>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default CourseProgressSidebar;

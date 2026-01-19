
import React from 'react';
import { Play, CheckCircle2, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lesson, Module } from '@/utils/data/types';

interface CourseModulesProps {
  modules: Module[];
  onStartLesson: (module: string, lesson: Lesson) => void;
}

const CourseModules = ({ modules, onStartLesson }: CourseModulesProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4 w-full">
      {modules.map((module, index) => (
        <AccordionItem key={index} value={`module-${index}`} className="border rounded-lg px-2">
          <AccordionTrigger className="py-4 hover:no-underline">
            <div className="flex items-start w-full">
              <div className="text-left">
                <h3 className="font-medium line-clamp-2 text-sm sm:text-base">{module.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-left">
                  {module.lessons.length} lessons • 
                  {module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 pb-4">
            <div className="space-y-3">
              {module.lessons.map((lesson, lessonIndex) => (
                <div 
                  key={lessonIndex} 
                  className="flex items-center justify-between p-2 sm:p-3 rounded-md hover:bg-accent/50 cursor-pointer" 
                  onClick={() => onStartLesson(module.title, lesson)}
                >
                  <div className="flex items-center min-w-0">
                    {lesson.completed ? (
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    ) : (
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 sm:mr-3 flex-shrink-0" />
                    )}
                    <span className={`truncate ${lesson.completed ? "text-muted-foreground" : ""} text-sm sm:text-base`}>
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-muted-foreground ml-2 flex-shrink-0">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CourseModules;

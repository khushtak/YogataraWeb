
import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import CourseSection from './content/CourseSection';

interface CourseContentTabProps {
  course: any;
  isEnrolled: boolean;
  playVideo: (item: any, sectionTitle: string) => void;
  bookmarkedItems: string[];
  toggleBookmark: (itemId: string, title: string) => void;
}

const CourseContentTab = ({ 
  course, 
  isEnrolled, 
  playVideo, 
  bookmarkedItems, 
  toggleBookmark 
}: CourseContentTabProps) => {
  
  // Generate a unique ID for an item
  const getItemId = (sectionIndex: number, itemIndex: number) => {
    return `${course.id}_section${sectionIndex}_item${itemIndex}`;
  };
  
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-4">
        {course.sections.length} sections • {course.duration} total length
      </div>
      
      <Accordion type="single" collapsible className="border rounded-lg">
        {course.sections.map((section: any, sectionIndex: number) => (
          <CourseSection
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            isEnrolled={isEnrolled}
            bookmarkedItems={bookmarkedItems}
            getItemId={getItemId}
            playVideo={playVideo}
            toggleBookmark={toggleBookmark}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default CourseContentTab;

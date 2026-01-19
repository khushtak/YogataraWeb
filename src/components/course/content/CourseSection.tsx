
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import CourseContentItem from './CourseContentItem';
import { convertToMinutes } from '@/utils/timeUtils';

interface CourseSectionProps {
  section: any;
  sectionIndex: number;
  isEnrolled: boolean;
  bookmarkedItems: string[];
  getItemId: (sectionIndex: number, itemIndex: number) => string;
  playVideo: (item: any, sectionTitle: string) => void;
  toggleBookmark: (itemId: string, title: string) => void;
}

const CourseSection = ({
  section,
  sectionIndex,
  isEnrolled,
  bookmarkedItems,
  getItemId,
  playVideo,
  toggleBookmark
}: CourseSectionProps) => {
  const handleBookmarkClick = (
    e: React.MouseEvent, 
    itemId: string, 
    itemTitle: string
  ) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    toggleBookmark(itemId, itemTitle);
  };

  // Calculate total duration of videos in this section
  const totalDuration = section.items.reduce(
    (total: number, item: any) => 
      item.type === 'video' ? total + convertToMinutes(item.duration) : total, 
    0
  );
  
  return (
    <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
      <AccordionTrigger className="px-4 hover:no-underline">
        <div className="text-left">
          <div>{section.title}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {section.items.length} lectures
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-0">
        <div className="divide-y">
          {section.items.map((item: any, itemIndex: number) => {
            const itemId = getItemId(sectionIndex, itemIndex);
            const isBookmarked = bookmarkedItems.includes(itemId);
            
            return (
              <CourseContentItem
                key={itemIndex}
                item={item}
                itemId={itemId}
                isEnrolled={isEnrolled}
                isBookmarked={isBookmarked}
                onPlay={() => playVideo(item, section.title)}
                onBookmark={(e) => handleBookmarkClick(e, itemId, item.title)}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CourseSection;

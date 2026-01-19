
import React from 'react';
import { Bookmark, Calendar, Clock, Globe, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import CourseHeader from '@/components/course/CourseHeader';
import CourseProgress from '@/components/course/CourseProgress';

interface CourseDetailHeaderProps {
  course: any;
  isEnrolled: boolean;
  showBookmarks: boolean;
  bookmarkedIds: string[];
  handleEnroll: () => void;
  handleShare: () => void;
  toggleBookmarksPanel: () => void;
}

const CourseDetailHeader = ({
  course,
  isEnrolled,
  showBookmarks,
  bookmarkedIds,
  handleEnroll,
  handleShare,
  toggleBookmarksPanel
}: CourseDetailHeaderProps) => {
  return (
    <>
      <CourseHeader 
        course={course}
        isEnrolled={isEnrolled}
        handleEnroll={handleEnroll}
        handleShare={handleShare}
      />
      
      {isEnrolled && (
        <div className="flex justify-between items-center mb-4">
          <CourseProgress course={course} />
          <button
            onClick={toggleBookmarksPanel}
            className={`flex items-center text-sm font-medium px-3 py-2 rounded-md transition-colors ${
              showBookmarks ? "bg-primary/10 text-primary" : "hover:bg-accent/50"
            }`}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Bookmarks {bookmarkedIds.length > 0 && `(${bookmarkedIds.length})`}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default CourseDetailHeader;

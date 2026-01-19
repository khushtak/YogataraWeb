
import React from 'react';
import { CheckCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import ContentTypeIcon from './ContentTypeIcon';

interface CourseContentItemProps {
  item: any;
  itemId: string;
  isEnrolled: boolean;
  isBookmarked: boolean;
  onPlay: () => void;
  onBookmark: (e: React.MouseEvent) => void;
}

const CourseContentItem = ({
  item,
  itemId,
  isEnrolled,
  isBookmarked,
  onPlay,
  onBookmark
}: CourseContentItemProps) => {
  return (
    <div 
      className={cn(
        "px-4 py-3 flex items-center justify-between",
        (item.isPreview || isEnrolled) && "cursor-pointer hover:bg-accent/50",
        item.completed && "bg-primary/5"
      )}
      onClick={() => item.type === 'video' && onPlay()}
    >
      <div className="flex items-center">
        {item.completed ? (
          <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-primary-foreground" />
          </div>
        ) : (
          <ContentTypeIcon type={item.type} />
        )}
        <div className="ml-3">
          <div className="font-medium">{item.title}</div>
          {/* {item.type === 'video' && (
            <div className="text-xs text-muted-foreground">{item.duration}</div>
          )} */}
          {item.type === 'quiz' && (
            <div className="text-xs text-muted-foreground">{item.questions} questions</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center">
        {item.isPreview && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mr-2">Preview</span>
        )}
        {isEnrolled && (
          <button 
            onClick={onBookmark}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5 text-primary" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseContentItem;

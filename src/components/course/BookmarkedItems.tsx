
import React from 'react';
import { BookmarkCheck, PlayCircle, FileText, Book, X } from 'lucide-react';

interface BookmarkedItemsProps {
  bookmarkedItems: Array<{
    id: string;
    title: string;
  }>;
  onItemClick: (itemId: string) => void;
  onRemoveBookmark: (itemId: string) => void;
}

const BookmarkedItems = ({ 
  bookmarkedItems, 
  onItemClick, 
  onRemoveBookmark 
}: BookmarkedItemsProps) => {
  
  if (bookmarkedItems.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <BookmarkCheck className="h-12 w-12 mx-auto mb-2 opacity-30" />
        <p>No bookmarked items yet</p>
        <p className="text-sm mt-1">Bookmark lessons to easily find them later</p>
      </div>
    );
  }
  
  return (
    <div className="p-2">
      <h3 className="text-sm font-medium mb-3 px-2">Your Bookmarked Items</h3>
      <div className="space-y-1">
        {bookmarkedItems.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 cursor-pointer"
          >
            <div 
              className="flex items-center flex-1 overflow-hidden mr-2"
              onClick={() => onItemClick(item.id)}
            >
              <PlayCircle className="h-4 w-4 text-primary flex-shrink-0 mr-2" />
              <span className="text-sm truncate">{item.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveBookmark(item.id);
              }}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Remove bookmark"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkedItems;

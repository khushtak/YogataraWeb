
import React from 'react';
import BookmarkedItems from '@/components/course/BookmarkedItems';

interface BookmarksPanelProps {
  showBookmarks: boolean;
  bookmarkedData: Array<{id: string, title: string}>;
  findAndPlayBookmarkedVideo: (itemId: string) => void;
  toggleBookmark: (itemId: string, title: string) => void;
}

const BookmarksPanel = ({
  showBookmarks,
  bookmarkedData,
  findAndPlayBookmarkedVideo,
  toggleBookmark
}: BookmarksPanelProps) => {
  if (!showBookmarks) return null;
  
  return (
    <div className="bg-card border border-border rounded-lg mb-6 animate-fade-in">
      <BookmarkedItems 
        bookmarkedItems={bookmarkedData}
        onItemClick={findAndPlayBookmarkedVideo}
        onRemoveBookmark={(itemId) => toggleBookmark(itemId, '')}
      />
    </div>
  );
};

export default BookmarksPanel;

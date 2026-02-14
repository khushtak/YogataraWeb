
import React from 'react';
import { Card } from '@/components/ui/card';
import VideoPlayerProvider from './video-player/VideoPlayerProvider';
import VideoDisplay from './video-player/VideoDisplay';
import VideoInfoBar from './video-player/VideoInfoBar';
import BookmarkedItems from './BookmarkedItems';
import useVideoPlayerState from './video-player/useVideoPlayerState';

interface BookmarkedItem {
  id: string;
  title: string;
}

interface VideoPlayerProps {
  course: any;
  currentVideo: any;
  isEnrolled: boolean;
  handleShare: () => void;
  bookmarkedItems?: BookmarkedItem[];
  onBookmarkItemClick?: (id: string) => void;
  onRemoveBookmark?: (id: string) => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  handleDownloadResources: () => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  course,
  currentVideo,
  isEnrolled,
  handleShare,
  bookmarkedItems = [],
  onBookmarkItemClick = () => { },
  onRemoveBookmark,
  isBookmarked = false,
  onBookmarkToggle = () => { },
  handleDownloadResources = () => { }
}) => {
  const videoPlayerState = useVideoPlayerState();
// console.log('3333',course);

  return (
    <VideoPlayerProvider value={videoPlayerState}>
      <Card className="overflow-hidden">
        <div className="relative">
          <VideoDisplay
            course={course}
            currentVideo={currentVideo}
            isEnrolled={isEnrolled}
            isBookmarked={isBookmarked}
            onBookmarkToggle={onBookmarkToggle}
          />
        </div>
        <VideoInfoBar
          currentVideo={currentVideo}
          toggleNotes={() => { }}
          handleShare={handleShare}
          handleDownloadResources={handleDownloadResources}
        />
        {bookmarkedItems.length > 0 && (
          <BookmarkedItems
            bookmarkedItems={bookmarkedItems}
            onItemClick={onBookmarkItemClick}
            onRemoveBookmark={onRemoveBookmark}
          />
        )}
      </Card>
    </VideoPlayerProvider>
  );
};

export default VideoPlayer;

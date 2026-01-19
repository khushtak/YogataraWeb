
import React from 'react';
import { useVideoPlayer } from './VideoPlayerProvider';
import ProgressBar from './controls/ProgressBar';
import PlaybackControls from './controls/PlaybackControls';
import VolumeControls from './controls/VolumeControls';
import SettingsControls from './controls/SettingsControls';

interface VideoPlayerControlsProps {
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  onShare?: () => void;
}

const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({
  isBookmarked,
  onBookmarkToggle,
  onShare
}) => {
  const { showControls } = useVideoPlayer();

  if (!showControls) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
      {/* Progress bar */}
      <ProgressBar />

      {/* Controls row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-white">
        <div className="flex items-center gap-3">
          <PlaybackControls />
          <VolumeControls />
        </div>

        <div className="flex items-center gap-2">
          <SettingsControls 
            isBookmarked={isBookmarked}
            onBookmarkToggle={onBookmarkToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerControls;

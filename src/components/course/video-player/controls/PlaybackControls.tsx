
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useVideoPlayer } from '../VideoPlayerProvider';

const PlaybackControls: React.FC = () => {
  const { isPlaying, togglePlay } = useVideoPlayer();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={togglePlay}
        className="rounded-full p-1 hover:bg-white/10"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>

      <button className="rounded-full p-1 hover:bg-white/10" aria-label="Skip back">
        <SkipBack className="h-4 w-4" />
      </button>

      <button className="rounded-full p-1 hover:bg-white/10" aria-label="Skip forward">
        <SkipForward className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PlaybackControls;

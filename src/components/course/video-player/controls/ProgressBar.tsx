
import React from 'react';
import { useVideoPlayer } from '../VideoPlayerProvider';
import { Progress } from '@/components/ui/progress';

const ProgressBar: React.FC = () => {
  const { duration, currentTime, handleSeek, formatTime } = useVideoPlayer();
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="mb-3 flex w-full items-center gap-2">
      <span className="text-xs text-white">{formatTime(currentTime)}</span>
      <div className="relative h-1.5 w-full cursor-pointer">
        <Progress value={progressPercent} className="h-1.5" />
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
      <span className="text-xs text-white">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;

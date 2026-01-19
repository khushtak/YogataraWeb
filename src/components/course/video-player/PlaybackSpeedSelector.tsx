
import React from 'react';
import { useVideoPlayer } from './VideoPlayerProvider';

interface PlaybackSpeedSelectorProps {
  currentSpeed: number;
  onChange: (speed: number) => void;
}

const PlaybackSpeedSelector: React.FC<PlaybackSpeedSelectorProps> = ({ 
  currentSpeed, 
  onChange 
}) => {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  return (
    <div>
      <div className="font-medium">Playback Speed</div>
      {speeds.map((speed) => (
        <div 
          key={speed} 
          className="p-2 cursor-pointer hover:bg-muted rounded flex justify-between items-center"
          onClick={() => onChange(speed)}
        >
          <span>{speed}x</span>
          {speed === currentSpeed && <span className="text-primary text-sm">✓</span>}
        </div>
      ))}
    </div>
  );
};

export default PlaybackSpeedSelector;

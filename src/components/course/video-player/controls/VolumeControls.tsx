
import React from 'react';
import { Volume, VolumeX } from 'lucide-react';
import { useVideoPlayer } from '../VideoPlayerProvider';

const VolumeControls: React.FC = () => {
  const { isMuted, toggleMute, volume, setVolume } = useVideoPlayer();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="rounded-full p-1 hover:bg-white/10"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume className="h-4 w-4" />
        )}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16"
      />
    </div>
  );
};

export default VolumeControls;


import React from 'react';
import { Settings, Maximize, Bookmark } from 'lucide-react';
import { useVideoPlayer } from '../VideoPlayerProvider';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';

interface SettingsControlsProps {
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

const SettingsControls: React.FC<SettingsControlsProps> = ({
  isBookmarked = false,
  onBookmarkToggle
}) => {
  const { 
    toggleFullscreen, 
    playbackSpeed, 
    setPlaybackSpeed, 
    quality, 
    setQuality,
    availableQualities 
  } = useVideoPlayer();

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-1 hover:bg-white/10" aria-label="Playback speed">
            <span className="text-xs font-medium">{playbackSpeed}x</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
              <DropdownMenuItem 
                key={speed} 
                onClick={() => setPlaybackSpeed(speed)}
                className={playbackSpeed === speed ? "bg-accent" : ""}
              >
                {speed}x
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full p-1 hover:bg-white/10" aria-label="Video quality">
            <Settings className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32">
          <DropdownMenuLabel>Quality</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {availableQualities.map((q) => (
              <DropdownMenuItem 
                key={q} 
                onClick={() => setQuality(q)}
                className={quality === q ? "bg-accent" : ""}
              >
                {q}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {onBookmarkToggle && (
        <button 
          className={`rounded-full p-1 ${isBookmarked ? 'text-primary' : 'hover:bg-white/10'}`} 
          aria-label="Bookmark"
          onClick={onBookmarkToggle}
        >
          <Bookmark className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={toggleFullscreen}
        className="rounded-full p-1 hover:bg-white/10"
        aria-label="Toggle fullscreen"
      >
        <Maximize className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SettingsControls;

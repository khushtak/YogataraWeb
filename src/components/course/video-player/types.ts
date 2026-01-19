
export interface VideoPlayerState {
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  progress: number;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  formatTime: (timeInSeconds: number) => string;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  quality: string;
  setQuality: (quality: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
  availableQualities: string[];
  setAvailableQualities: (qualities: string[]) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  handleSeek: (time: number) => void;
}

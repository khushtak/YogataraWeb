
import { useState, useCallback } from 'react';
import { VideoPlayerState } from './types';

const useVideoPlayerState = (): VideoPlayerState => {
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState('auto');
  // Add missing properties from VideoPlayerState
  const [isMuted, setIsMuted] = useState(false);
  const [availableQualities, setAvailableQualities] = useState<string[]>(['auto', '1080p', '720p', '480p', '360p']);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const formatTime = useCallback((timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
    setProgress((time / duration) * 100);
  }, [duration]);

  return {
    showControls,
    setShowControls,
    isPlaying,
    setIsPlaying,
    togglePlay,
    volume,
    setVolume,
    progress,
    setProgress,
    duration,
    setDuration,
    currentTime,
    setCurrentTime,
    formatTime,
    playbackSpeed,
    setPlaybackSpeed,
    quality,
    setQuality,
    isMuted,
    setIsMuted,
    toggleMute,
    availableQualities,
    setAvailableQualities,
    isFullscreen,
    toggleFullscreen,
    handleSeek
  };
};

export default useVideoPlayerState;

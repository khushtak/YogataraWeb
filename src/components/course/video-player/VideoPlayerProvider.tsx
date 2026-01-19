
import React, { createContext, useContext } from 'react';
import { VideoPlayerState } from './types';

const VideoPlayerContext = createContext<VideoPlayerState | undefined>(undefined);

interface VideoPlayerProviderProps {
  children: React.ReactNode;
  value: VideoPlayerState;
}

const VideoPlayerProvider = ({ children, value }: VideoPlayerProviderProps) => {
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = (): VideoPlayerState => {
  const context = useContext(VideoPlayerContext);
  if (context === undefined) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
};

export default VideoPlayerProvider;

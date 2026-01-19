
import React from 'react';
import { Pencil, Download, Share } from 'lucide-react';

interface VideoInfoBarProps {
  currentVideo: any;
  toggleNotes: () => void;
  handleShare: () => void;
  handleDownloadResources: () => void;
}

const VideoInfoBar: React.FC<VideoInfoBarProps> = ({
  currentVideo,
  toggleNotes,
  handleShare,
  handleDownloadResources
}) => {
  return (
    <div className="bg-background border-b border-border">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-lg font-medium">{currentVideo.title}</h1>
            <p className="text-sm text-muted-foreground">From: {currentVideo.section}</p>
          </div>
          <div className="flex flex-wrap items-center mt-2 md:mt-0">
            {/* <button 
              className="text-sm text-muted-foreground hover:text-foreground mr-6 flex items-center"
              onClick={toggleNotes}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Notes
            </button> */}
            <button className="text-sm text-muted-foreground hover:text-foreground mr-6 flex items-center" onClick={handleDownloadResources}>
              <Download className="h-4 w-4 mr-1" />
              Resources
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center" onClick={handleShare}>
              <Share className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfoBar;

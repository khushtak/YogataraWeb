
import React from 'react';
import { useVideoPlayer } from './VideoPlayerProvider';

const QualitySelector: React.FC = () => {
  const { quality, setQuality } = useVideoPlayer();
  
  const qualities = ['Auto', '1080p', '720p', '480p', '360p'];
  
  return (
    <div>
      <div className="pt-2 border-t font-medium">Quality</div>
      {qualities.map((qualityOption) => (
        <div 
          key={qualityOption} 
          className="p-2 cursor-pointer hover:bg-muted rounded flex justify-between items-center"
          onClick={() => setQuality(qualityOption)}
        >
          <span>{qualityOption}</span>
          {qualityOption === quality && <span className="text-primary text-sm">✓</span>}
        </div>
      ))}
    </div>
  );
};

export default QualitySelector;

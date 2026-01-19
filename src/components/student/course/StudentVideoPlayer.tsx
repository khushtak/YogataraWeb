
import React from 'react';
import { Play, Download, FileText } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { toast } from '@/components/ui/use-toast';

interface StudentVideoPlayerProps {
  currentLesson: {
    title: string;
    moduleTitle: string;
    duration: string;
  } | null;
}

const StudentVideoPlayer = ({ currentLesson }: StudentVideoPlayerProps) => {
  if (!currentLesson) return null;

  const markAsComplete = () => {
    toast({
      title: "Lesson completed",
      description: `You've completed ${currentLesson.title}`,
    });
  };

  return (
    <div id="video-player">
      <div className="aspect-video bg-black/95 flex flex-col items-center justify-center">
        <div className="text-center">
          <Play className="h-16 w-16 text-primary/80 mx-auto mb-4 cursor-pointer hover:text-primary transition-colors" />
          <h3 className="text-xl font-medium text-white">{currentLesson.title}</h3>
          <p className="text-sm text-white/70 mt-2">From: {currentLesson.moduleTitle}</p>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center bg-card border rounded-b-lg">
        <div>
          <h3 className="font-medium">{currentLesson.title}</h3>
          <p className="text-sm text-muted-foreground">Duration: {currentLesson.duration}</p>
        </div>
        <div className="flex gap-2">
          <ButtonCustom variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Resources
          </ButtonCustom>
          <ButtonCustom variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Notes
          </ButtonCustom>
          <ButtonCustom size="sm" onClick={markAsComplete}>
            Mark as Complete
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default StudentVideoPlayer;

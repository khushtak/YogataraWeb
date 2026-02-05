import React from "react";
import { Download, FileText } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { toast } from "@/components/ui/use-toast";

interface StudentVideoPlayerProps {
  currentLesson: {
    title: string;
    duration?: string;
    videoUrl: string;
  } | null;
}

const StudentVideoPlayer = ({ currentLesson }: StudentVideoPlayerProps) => {
  if (!currentLesson) return null;

  // Bunny video id nikaalne ke liye
  const extractVideoId = (url: string) => {
    return url.split("/").pop(); // last part = video id
  };

  const videoId = extractVideoId(currentLesson.videoUrl);

  const markAsComplete = () => {
    toast({
      title: "Lesson completed",
      description: `You've completed ${currentLesson.title}`,
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">

      {/* VIDEO AREA (iframe player same as working component) */}
      <div className="w-full aspect-video bg-black">
        <iframe
          src={`https://iframe.mediadelivery.net/embed/409626/${videoId}?autoplay=false`}
          loading="lazy"
          className="w-full h-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* INFO + ACTIONS (same design as before) */}
      <div className="p-4 flex justify-between items-center bg-card border-t">
        <div>
          <h3 className="font-medium">{currentLesson.title}</h3>
          <p className="text-sm text-muted-foreground">
            Duration: {currentLesson.duration || "N/A"}
          </p>
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

import React, { useEffect, useRef, useState } from "react";
import { Download, FileText } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { toast } from "@/components/ui/use-toast";

interface StudentVideoPlayerProps {
  currentLesson: {
    title: string;
    duration?: string;
    videoUrl: string;
    description?: string;
  } | null;
}

const StudentVideoPlayer = ({ currentLesson }: StudentVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isHtmlVideo, setIsHtmlVideo] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 🔍 Detect direct video file
  const isVideoFileUrl = (url: string): boolean => {
    return /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url);
  };

  const getStorageKey = (url: string) => `video_progress_${btoa(url)}`;

  // ================= SAVE PROGRESS =================
  const saveVideoProgress = () => {
    if (!videoRef.current || !currentLesson) return;

    const video = videoRef.current;

    const data = {
      timestamp: video.currentTime,
      duration: video.duration,
      completed: isCompleted,
    };
console.log('dsadad',data);

    localStorage.setItem(
      getStorageKey(currentLesson.videoUrl),
      JSON.stringify(data)
    );
  };

  // ================= RESTORE PROGRESS =================
  useEffect(() => {
    if (!currentLesson) return;

    setIsHtmlVideo(isVideoFileUrl(currentLesson.videoUrl));
    setIsCompleted(false);
  }, [currentLesson]);

  useEffect(() => {
    if (!isHtmlVideo || !videoRef.current || !currentLesson) return;

    const video = videoRef.current;

    const restoreTime = () => {
      const saved = localStorage.getItem(
        getStorageKey(currentLesson.videoUrl)
      );

      if (!saved) return;

      try {
        const { timestamp, completed } = JSON.parse(saved);

        if (
          timestamp &&
          timestamp > 0 &&
          video.duration &&
          timestamp < video.duration - 2
        ) {
          video.currentTime = timestamp;
          video.pause();

          toast({
            title: "Resume Available",
            description: `Continue from ${Math.floor(
              timestamp / 60
            )}:${String(Math.floor(timestamp % 60)).padStart(2, "0")}`,
          });
        }

        if (completed) {
          setIsCompleted(true);
        }
      } catch {}
    };

    video.addEventListener("loadedmetadata", restoreTime);

    return () => {
      video.removeEventListener("loadedmetadata", restoreTime);
    };
  }, [isHtmlVideo, currentLesson]);

  // ================= AUTO SAVE WHILE PLAYING =================
  useEffect(() => {
    if (!isHtmlVideo || !videoRef.current) return;

    const video = videoRef.current;

    const handleTimeUpdate = () => {
      if (!video.paused) {
        saveVideoProgress();

        // 🔥 Auto mark complete at 95%
        if (
          video.duration &&
          video.currentTime >= video.duration * 0.95 &&
          !isCompleted
        ) {
          setIsCompleted(true);
          toast({
            title: "Lesson Completed 🎉",
            description: currentLesson?.title,
          });
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isHtmlVideo, currentLesson, isCompleted]);

  // ================= SAVE ON PAUSE =================
  useEffect(() => {
    if (!isHtmlVideo || !videoRef.current) return;

    const video = videoRef.current;

    const handlePause = () => {
      saveVideoProgress();
    };

    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("pause", handlePause);
    };
  }, [isHtmlVideo, currentLesson]);

  // ================= PAUSE ON TAB CHANGE =================
  useEffect(() => {
    const handleVisibility = () => {
      if (!videoRef.current) return;

      if (document.hidden) {
        videoRef.current.pause();
        saveVideoProgress();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [currentLesson]);

  // ================= SAVE BEFORE REFRESH =================
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveVideoProgress();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentLesson]);

  if (!currentLesson) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="w-full aspect-video bg-black">
        {isHtmlVideo ? (
          <video
            ref={videoRef}
            controls
            controlsList="nodownload"
            preload="metadata"
            playsInline
            className="w-full h-full"
          >
            <source src={currentLesson.videoUrl} type="video/mp4" />
            <source src={currentLesson.videoUrl} type="video/webm" />
            Your browser does not support video.
          </video>
        ) : (
          <iframe
            src={currentLesson.videoUrl}
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            title={currentLesson.title}
          />
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div>
          <h3 className="font-medium text-lg text-white">
  {currentLesson.title}
</h3>

          {/* <p className="text-sm text-muted-foreground mt-1">
            Duration: {currentLesson.duration || "N/A"}
          </p> */}
          {currentLesson.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {currentLesson.description}
            </p>
          )}
        </div>

        <div className="flex gap-2 justify-end border-t pt-4">

          <ButtonCustom size="sm">
            {isCompleted ? "Completed ✅" : "Mark as Complete"}
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default StudentVideoPlayer;

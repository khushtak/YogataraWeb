import React, { useEffect, useState } from "react";
import { Info, Play, X } from "lucide-react";
import { useVideoPlayer } from "./VideoPlayerProvider";
import baseUrl from "@/config/Config";
import { getUser } from "@/utils/auth";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useNavigate } from "react-router-dom";

interface VideoDisplayProps {
  course: any;
  currentVideo: any;
  isEnrolled: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  course,
  currentVideo,
  isEnrolled,
}) => {
  const { isPlaying, togglePlay, setShowControls } = useVideoPlayer();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  /* ================= GET USER (FIXED) ================= */
  useEffect(() => {
    const storedUser = getUser(); // ✅ already object
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  /* ================= HELPERS ================= */
  const extractVideoId = (url: string) => {
    return url.split("/").pop();
  };

  /* ================= GET USER PROGRESS ================= */
  const getUserProgress = async (userEmail: string, courseId: string) => {
    try {
      const res = await fetch(`${baseUrl}/user-progress/${userEmail}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      const matchedCourse = data.userProgress.courseDetails.find(
        (c: any) => c.courseId === courseId
      );

      return matchedCourse ? matchedCourse.videosWatched : 0;
    } catch (err) {
      console.error("Progress fetch error:", err);
      return 0;
    }
  };

  /* ================= UPDATE PROGRESS ================= */
  const updateVideosWatched = async () => {
    try {
      if (!user?.email) return;

      const totalVideos = course?.videos?.length || 0;
      if (!totalVideos) return;

      const watched = await getUserProgress(user.email, course.id);
      if (watched >= totalVideos) return;

      await fetch(`${baseUrl}/update-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          courseId: course.id,
          videosWatched: watched + 1,
        }),
      });
    } catch (err) {
      console.error("Update progress error:", err);
    }
  };

  /* ================= PLAY CLICK ================= */
  const handlePlayClick = () => {
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    togglePlay();
    updateVideosWatched();
  };

  /* ================= UI ================= */
  return (
    <>
      <div
        className="aspect-video bg-black relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <div className="flex items-center justify-center h-full">
          {currentVideo.isPreview || isEnrolled ? (
            <div className="relative w-full h-full">
              {!isPlaying && (
                <div className="relative w-full h-full">
                  <img
                    src={`https://vz-409626.b-cdn.net/${extractVideoId(
                      currentVideo.videoUrl
                    )}/thumbnail.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover opacity-20"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={handlePlayClick}
                      className="bg-black/60 rounded-full p-4 hover:bg-black/80"
                    >
                      <Play className="h-8 w-8 text-white" />
                    </button>
                  </div>
                </div>
              )}

              {isPlaying && (
                <iframe
                  src={`https://iframe.mediadelivery.net/embed/409626/${extractVideoId(
                    currentVideo.videoUrl
                  )}`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <Info className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Preview not available</p>
              <p className="text-gray-400 mt-2">
                Enroll to watch this video
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= LOGIN POPUP ================= */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl w-[90%] max-w-md p-6 relative">
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold text-center mb-3">
              Login Required
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Please login to watch this video
            </p>

            <ButtonCustom
              className="w-full"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </ButtonCustom>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDisplay;

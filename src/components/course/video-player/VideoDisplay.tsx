import React from 'react';
import { Info, Play } from 'lucide-react';
import { useVideoPlayer } from './VideoPlayerProvider';
import VideoPlayerControls from './VideoPlayerControls';
import baseUrl from '@/config/Config';

interface VideoDisplayProps {
  course: any;
  currentVideo: any;
  isEnrolled: boolean;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  course,
  currentVideo,
  isEnrolled,
  isBookmarked = false,
  onBookmarkToggle
}) => {
  const {
    isPlaying,
    showControls,
    togglePlay,
    setShowControls
  } = useVideoPlayer();

  const extractVideoId = (url: string) => {
    // For Bunny.net URLs, extract the video ID (the part after the last slash)
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const getUserProgress = async (userEmail: string, courseId: string) => {
    try {
      const response = await fetch(`${baseUrl}/user-progress/${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // console.log("User progress fetched successfully:", data);

      // Check if the courseId exists in the courseDetails array
      const matchedCourse = data.userProgress.courseDetails.find(
        (course: { courseId: string }) => course.courseId === courseId
      );

      if (matchedCourse) {
        // console.log("Matched Course:", matchedCourse);
        return matchedCourse.videosWatched;
        
      } else {
        console.log("Course ID not found in user progress");
      }

    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const updateVideosWatched = async () => {
    // console.log(course.id);

    try {

      const videosWatched = await getUserProgress("sayanmyself50@gmail.com", course.id);
      const response = await fetch(`${baseUrl}/update-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: "sayanmyself50@gmail.com",
          courseId: course.id,
          videosWatched: videosWatched + 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("Progress updated successfully:", data);
      } else {
        console.error("Failed to update progress:", data.message);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handlePlay = () => {
    togglePlay();
    updateVideosWatched();
  };

  return (
    <div
      className="aspect-video bg-black relative"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <div className="flex items-center justify-center h-full">
        {currentVideo.isPreview || isEnrolled ? (
          <div className="relative w-full h-full">
            {/* Clickable Overlay - Clicks pass through */}

            {currentVideo && !isPlaying && (
              <div className="relative w-full h-full">
                <img
                  src={`https://vz-409626.b-cdn.net/${extractVideoId(currentVideo.videoUrl)}/thumbnail.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlay}
                    className="bg-black/50 rounded-full p-4 hover:bg-black/70 transition-colors"
                  >
                    <Play className="h-8 w-8 text-white" />
                  </button>
                </div>
              </div>
            )}

            {currentVideo && isPlaying && (
              <iframe
                src={`https://iframe.mediadelivery.net/embed/409626/${extractVideoId(currentVideo.videoUrl)}`}
                loading="lazy"
                style={{
                  border: 'none',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen={true}
              ></iframe>
            )}

            {/* <VideoPlayerControls
              isBookmarked={isBookmarked}
              onBookmarkToggle={onBookmarkToggle}
            /> */}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-white">
            <Info className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-lg font-medium">Preview not available</p>
            <p className="text-gray-400 mt-2">Enroll to watch this video</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoDisplay;

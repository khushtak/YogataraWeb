import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentLayout from "@/components/student/StudentLayout";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Progress } from "@/components/ui/progress";

interface CourseVideo {
  id: string;
  title: string;
  url: string;
}

interface CourseDetailData {
  id: string;
  title: string;
  instructor: string;
  description: string;
  videos: CourseVideo[];
}

const CourseDetail = () => {
  const { id } = useParams(); // course id from URL
  const [course, setCourse] = useState<CourseDetailData | null>(null);
  const [currentVideo, setCurrentVideo] = useState<CourseVideo | null>(null);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(new Set());
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // -------------------
  // Detect dark/light theme dynamically
  useEffect(() => {
    const checkTheme = () => setIsDarkTheme(document.body.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // -------------------
  // Privacy/security: disable right-click, print screen, etc.
  useEffect(() => {
    const blockKeys = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key.toLowerCase() === "s") || // ctrl+s
        (e.ctrlKey && e.key.toLowerCase() === "p") // ctrl+p
      ) {
        e.preventDefault();
        alert("Action blocked for privacy!");
      }
    };
    const blockRightClick = (e: MouseEvent) => e.preventDefault();

    document.addEventListener("keydown", blockKeys);
    document.addEventListener("contextmenu", blockRightClick);

    return () => {
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("contextmenu", blockRightClick);
    };
  }, []);

  // -------------------
  // Fetch course data (use same URLs from StudentCourses)
  useEffect(() => {
    const fetchCourse = () => {
      const data: CourseDetailData = {
        id: "1",
        title: "Yoga for Beginners",
        instructor: "Guru Ji",
        description: "Learn the basics of Yoga step by step.",
        videos: [
          {
            id: "v1",
            title: "Introduction to Yoga",
            url: "https://iframe.mediadelivery.net/embed/583905/15300ab3-502e-4eab-8b04-ce03dc1409eb",
          },
          {
            id: "v2",
            title: "Warm-up Exercises",
            url: "https://iframe.mediadelivery.net/embed/583905/15300ab3-502e-4eab-8b04-ce03dc1409eb",
          },
          {
            id: "v3",
            title: "Basic Poses",
            url: "https://iframe.mediadelivery.net/embed/583905/15300ab3-502e-4eab-8b04-ce03dc1409eb",
          },
        ],
      };
      setCourse(data);
      setCurrentVideo(data.videos[0]);
    };
    fetchCourse();
  }, [id]);

  const handleVideoSelect = (video: CourseVideo) => {
    setCurrentVideo(video);
  };

  const handleVideoComplete = (videoId: string) => {
    setCompletedVideos((prev) => new Set(prev).add(videoId));
  };

  return (
    <StudentLayout>
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* ---------------- Video Player ---------------- */}
        <div className="flex-1">
          {currentVideo && (
            <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
              {/* Video iframe */}
              <iframe
                src={currentVideo.url}
                style={{ border: 0, width: "100%", height: "100%", pointerEvents: "auto" }}
                sandbox="allow-scripts allow-same-origin allow-presentation"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                title={currentVideo.title}
              />
            </div>
          )}

          <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
            {currentVideo?.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{course?.description}</p>
        </div>

        {/* ---------------- Sidebar / Video List ---------------- */}
        <div className="w-full lg:w-80 bg-gray-100 dark:bg-gray-800 rounded-md p-4 h-fit">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Course Videos</h3>
          <ul className="space-y-2">
            {course?.videos.map((video, index) => {
              const isCompleted = completedVideos.has(video.id);
              return (
                <li key={video.id}>
                  <button
                    onClick={() => handleVideoSelect(video)}
                    className={`flex justify-between items-center w-full px-3 py-2 rounded-md transition-colors ${
                      video.id === currentVideo?.id
                        ? "bg-indigo-500 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <span>{index + 1}. {video.title}</span>
                    {isCompleted && <span className="text-yellow-400">★</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Progress */}
          <div className="mt-4">
            <span className="text-gray-700 dark:text-gray-300">Course Progress</span>
            <Progress
              value={course ? (completedVideos.size / course.videos.length) * 100 : 0}
              className="h-2 mt-1"
            />
          </div>

          {currentVideo && !completedVideos.has(currentVideo.id) && (
            <ButtonCustom
              className="w-full mt-4"
              onClick={() => handleVideoComplete(currentVideo.id)}
            >
              Mark Video as Completed
            </ButtonCustom>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseDetail;

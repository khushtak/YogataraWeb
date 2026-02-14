import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { loadBookmarks, saveBookmarks } from '@/utils/bookmarkUtils';
import baseUrl from '@/config/Config';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function useCourse(id: string | undefined) {
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [bookmarkedData, setBookmarkedData] = useState<Array<{ id: string; title: string }>>([]);
  const [coursesData, setCoursesData] = useState<any>({});
  const [pdfUrls, setPdfUrls] = useState<string[]>([]);

  /* ================= FETCH COURSE ================= */
  const getCourseById = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-course/${id}`);
      const course = await response.json();

      const formattedCourse = {
        id: course.courseId,
        title: course.courseName,
        description: course.courseDescription,
        duration: course.courseDuration,
        level: course.courseLevel,
        price: Number(course.coursePrice),
        category: course.courseCategory,
        instructor: course.courseInStructure?.[0]?.name || "Unknown",
        instructorTitle: course.courseInStructure?.[0]?.title || "",
        instructorBio: course.courseInStructure?.[0]?.bio || "",
        instructorImage: course.courseInStructure?.[0]?.image || "",
        thumbnail: course.courseImage,
        sections: course.videoes.map((section: any) => ({
          title: section.title,
          items: section.items.map((item: any) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            duration: item.duration,
            isPreview: item.isPreview,
            videoUrl: item.videoUrl,
            questions: item.questions || 0,
          })),
        })),
        whatYouWillLearn: course.whatYouWillLearn || [],
        requirements: course.requirements || [],
        reviews: course.reviews || [],
      };

      return formattedCourse;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };

  /* ================= RENDER COURSE ================= */
  const renderCourse = () => {
    if (!coursesData || !coursesData.sections) {
      setIsLoading(false);
      return;
    }

    setCourse(coursesData);

    const savedBookmarks = loadBookmarks(id || "");
    setBookmarkedIds(savedBookmarks.bookmarkedIds || []);
    setBookmarkedData(savedBookmarks.bookmarkedData || []);

    /* ================= 🔥 FIX START ================= */
    let videoSet = false;

    // 1️⃣ Try preview video
    const previewSection = coursesData.sections.find((section: any) =>
      section.items.some((item: any) => item.type === 'video' && item.isPreview)
    );

    if (previewSection) {
      const previewVideo = previewSection.items.find(
        (item: any) => item.type === 'video' && item.isPreview
      );

      if (previewVideo) {
        setCurrentVideo({
          ...previewVideo,
          section: previewSection.title,
        });
        videoSet = true;
      }
    }

    // 2️⃣ Fallback → FIRST VIDEO
    if (!videoSet) {
      const firstSection = coursesData.sections[0];
      const firstVideo = firstSection?.items?.find(
        (item: any) => item.type === 'video'
      );

      if (firstVideo) {
        setCurrentVideo({
          ...firstVideo,
          section: firstSection.title,
        });
      }
    }
    /* ================= 🔥 FIX END ================= */

    setIsLoading(false);
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getCourseById();
      if (data) setCoursesData(data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (Object.keys(coursesData).length > 0) {
      renderCourse();
    }
  }, [coursesData]);

  /* ================= VIDEO PLAY ================= */
  const playVideo = (item: any, sectionTitle: string) => {
    if (!isEnrolled && !item.isPreview) {
      toast({
        title: "Content locked",
        description: "Please enroll to access this video",
        variant: "destructive",
      });
      return;
    }

    setCurrentVideo({
      ...item,
      section: sectionTitle,
    });
  };

  /* ================= BOOKMARK ================= */
  const toggleBookmark = (itemId: string, title: string) => {
    if (!id) return;

    let ids = [...bookmarkedIds];
    let data = [...bookmarkedData];

    if (ids.includes(itemId)) {
      ids = ids.filter(i => i !== itemId);
      data = data.filter(i => i.id !== itemId);
    } else {
      ids.push(itemId);
      data.push({ id: itemId, title });
    }

    setBookmarkedIds(ids);
    setBookmarkedData(data);
    saveBookmarks(id, ids, data);
  };

  const findAndPlayBookmarkedVideo = (itemId: string) => {
    if (!course) return;

    for (const section of course.sections) {
      const item = section.items.find((i: any) => i.id === itemId);
      if (item) {
        playVideo(item, section.title);
        setShowBookmarks(false);
        break;
      }
    }
  };

  const toggleBookmarksPanel = () => {
    setShowBookmarks(prev => !prev);
  };

  /* ================= SHARE ================= */
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied" });
  };

  return {
    course,
    isLoading,
    isEnrolled,
    currentVideo,
    showBookmarks,
    bookmarkedIds,
    bookmarkedData,
    playVideo,
    toggleBookmark,
    findAndPlayBookmarkedVideo,
    toggleBookmarksPanel,
    handleShare,
  };
}

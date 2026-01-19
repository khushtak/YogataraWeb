
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { loadBookmarks, saveBookmarks } from '@/utils/bookmarkUtils';
import baseUrl from '@/config/Config';
// import { coursesData } from '@/data/coursesData';

export function useCourse(id: string | undefined) {
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<any>(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [bookmarkedData, setBookmarkedData] = useState<Array<{ id: string, title: string }>>([]);

  const [coursesData, setCoursesData] = useState<any>({});

  const [pdfUrls, setPdfUrls] = useState([])

  const handleDownloadResources = () => {
    if (pdfUrls.length > 0) {
      pdfUrls.forEach(pdfUrl => {
        fetch(pdfUrl)
          .then(response => response.blob()) // Convert to blob
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = pdfUrl.split('/').pop(); // Extract filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); // Cleanup URL object
          })
          .catch(error => console.error("Error downloading PDF:", error));
      });
    }
  };


  const getCourseById = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-course/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch course");
      }

      const course = await response.json();

      // console.log("Fetched course:", course);

      const pdfUrls = course?.videoes?.flatMap(video =>
        video.items?.filter(item => item.type === "pdf" && item.pdfUrl).map(item => item.pdfUrl)
      ) || [];

      // console.log("Extracted PDF URLs:", pdfUrls);

      setPdfUrls(pdfUrls);


      // Transforming the response to match your expected structure
      const formattedCourse = {
        id: course.courseId,
        title: course.courseName,
        description: course.courseDescription,
        duration: course.courseDuration,
        level: course.courseLevel,
        price: Number(course.coursePrice),
        category: course.courseCategory,
        instructor: course.courseInStructure[0]?.name || "Unknown",
        instructorTitle: course.courseInStructure[0]?.title || "Instructor",
        instructorBio: course.courseInStructure[0]?.bio || "",
        instructorImage: course.courseInStructure[0]?.image || "",
        thumbnail: course.courseImage,
        sections: course.videoes.map((videoSection) => ({
          title: videoSection.title,
          items: videoSection.items.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            duration: item.duration,
            isPreview: item.isPreview,
            videoUrl: item.videoUrl,
            questions: item.questions || 0,
          })),
        })),
        whatYouWillLearn: course.whatYouWillLearn,
        requirements: course.requirements,
        reviews: course.reviews,
      };

      // console.log( "Formatted course:", formattedCourse);
      return formattedCourse;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };

  const renderCourse = () => {
    if (id) {
      // console.log("Available coursesData:", coursesData);
      // console.log("Checking for ID:", id);

      const courseData = coursesData; // No need to use coursesData[id]

      if (!courseData || courseData.id !== id) {
        console.error(`Course not found for id: ${id}`);
        setIsLoading(false);
        return;
      }

      setCourse(courseData);

      // Load bookmarks from localStorage
      const { bookmarkedIds, bookmarkedData } = loadBookmarks(id);
      setBookmarkedIds(bookmarkedIds || []);
      setBookmarkedData(bookmarkedData || []);

      // Set the first preview video as default
      const firstPreviewSection = courseData.sections?.find(section =>
        section.items.some(item => item.type === 'video' && item.isPreview)
      );

      if (firstPreviewSection) {
        const firstPreviewVideo = firstPreviewSection.items.find(item =>
          item.type === 'video' && item.isPreview
        );

        if (firstPreviewVideo) {
          setCurrentVideo({
            ...firstPreviewVideo,
            section: firstPreviewSection.title
          });
        }
      }

      setIsLoading(false);
    } else {
      console.error("ID is undefined or invalid");
      setIsLoading(false);
    }
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
        setIsEnrolled(true);
      } else {
        console.log("Course ID not found in user progress");
      }

    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      const fetchedCourse = await getCourseById();
      if (fetchedCourse) {
        // console.log("Fetched course:", fetchedCourse);
        getUserProgress("sayanmyself50@gmail.com", fetchedCourse?.id);
        setCoursesData(fetchedCourse); // Ensure state is updated
      }
    };

    fetchData();
  }, [id]); // Depend on `id`, so it re-fetches when `id` changes

  // Run renderCourse separately when coursesData updates
  useEffect(() => {
    if (Object.keys(coursesData).length > 0) {
      renderCourse();
    }
  }, [coursesData]);

  const addProgress = async (
    userEmail: string,
    courseId: string,
    courseName: string,
    totalVideos: number,
    testId?: string
  ) => {
    try {
      const response = await fetch(`${baseUrl}/add-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          courseId,
          courseName,
          totalVideos,
          testId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // throw new Error(data.message || "Something went wrong");
        // console.log(data);
        toast({
          title: "Error",
          description: data.message || "Something went wrong"
        });
        return;
      }

      // console.log("Progress added successfully:", data);
      setIsEnrolled(true);
      toast({
        title: "Successfully enrolled!",
        description: `You are now enrolled in "${course?.title}". Start learning now!`,
      });
      return data;
    } catch (error) {
      console.error("Error adding progress:", error);
    }
  };




  const handleEnroll = () => {
    // console.log("sayanmyself50@gmail.com", course?.id, course?.title, course?.sections?.length || 0);

    addProgress("sayanmyself50@gmail.com", course?.id, course?.title, course?.sections?.length || 0)
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course?.title,
        text: `Check out this amazing course: ${course?.title}`,
        url: window.location.href,
      })
        .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          toast({
            title: "Link copied!",
            description: "Course link copied to clipboard",
          });
        })
        .catch(err => console.log('Error copying link:', err));
    }
  };

  const playVideo = (item: any, sectionTitle: string) => {
    if (!isEnrolled && !item.isPreview) {
      toast({
        title: "Content locked",
        description: "Please enroll in the course to access all content",
        variant: "destructive"
      });
      return;
    }

    setCurrentVideo({
      ...item,
      section: sectionTitle
    });

    // In a real app, you would update the user's progress here
    if (isEnrolled) {
      // Mark video as watched
    }
  };

  const handleReviewHelpful = (reviewId: number, helpful: boolean) => {
    // In a real app, you would update the review's helpful count in your backend
    toast({
      title: helpful ? "Marked as helpful" : "Marked as unhelpful",
      description: "Thank you for your feedback!",
    });
  };

  const toggleBookmark = (itemId: string, itemTitle: string) => {
    if (!id) return;

    let newBookmarkedIds: string[];
    let newBookmarkedData: Array<{ id: string, title: string }>;

    if (bookmarkedIds.includes(itemId)) {
      // Remove bookmark
      newBookmarkedIds = bookmarkedIds.filter(id => id !== itemId);
      newBookmarkedData = bookmarkedData.filter(item => item.id !== itemId);

      toast({
        title: "Bookmark removed",
        description: "Item removed from your bookmarks",
      });
    } else {
      // Add bookmark
      newBookmarkedIds = [...bookmarkedIds, itemId];
      newBookmarkedData = [...bookmarkedData, { id: itemId, title: itemTitle }];

      toast({
        title: "Bookmark added",
        description: "Item added to your bookmarks",
      });
    }

    // Update state
    setBookmarkedIds(newBookmarkedIds);
    setBookmarkedData(newBookmarkedData);

    // Save to localStorage
    saveBookmarks(id, newBookmarkedIds, newBookmarkedData);
  };

  const findAndPlayBookmarkedVideo = (itemId: string) => {
    if (!course) return;

    // Extract section and item index from the itemId format: courseId_sectionX_itemY
    const parts = itemId.split('_');
    if (parts.length !== 3) return;

    const sectionIndexStr = parts[1].replace('section', '');
    const itemIndexStr = parts[2].replace('item', '');

    const sectionIndex = parseInt(sectionIndexStr);
    const itemIndex = parseInt(itemIndexStr);

    if (isNaN(sectionIndex) || isNaN(itemIndex)) return;

    const section = course.sections[sectionIndex];
    if (!section) return;

    const item = section.items[itemIndex];
    if (!item) return;

    // Play the video
    playVideo(item, section.title);

    // Hide bookmarks panel
    setShowBookmarks(false);
  };

  const toggleBookmarksPanel = () => {
    setShowBookmarks(!showBookmarks);
  };

  return {
    course,
    isLoading,
    isEnrolled,
    currentVideo,
    showBookmarks,
    bookmarkedIds,
    bookmarkedData,
    handleEnroll,
    handleShare,
    playVideo,
    handleReviewHelpful,
    toggleBookmark,
    findAndPlayBookmarkedVideo,
    toggleBookmarksPanel,
    handleDownloadResources
  };
}

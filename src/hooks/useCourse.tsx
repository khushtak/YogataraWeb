
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { loadBookmarks, saveBookmarks } from '@/utils/bookmarkUtils';
import baseUrl from '@/config/Config';
import { getToken, getUser, saveToken } from '@/utils/auth';
// import { coursesData } from '@/data/coursesData';
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

      // Support both 'videos' and 'videoes' field names
      const videoSections = course?.videos || course?.videoes || [];

      const pdfUrls = videoSections?.flatMap(video =>
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
        sections: videoSections.map((videoSection) => ({
          id: videoSection.id,
          title: videoSection.name || videoSection.title,
          items: videoSection.items.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            duration: item.duration,
            isPreview: item.isPreview,
            videoUrl: item.videoUrl,
            description: item.description || "",
            questions: item.questions || 0,
            videoId: item.videoId,
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
  if (!id) {
    setIsLoading(false);
    return;
  }

  const courseData = coursesData;

  if (!courseData || courseData.id !== id) {
    console.error(`Course not found for id: ${id}`);
    setIsLoading(false);
    return;
  }

  setCourse(courseData);

  // bookmarks
  const { bookmarkedIds, bookmarkedData } = loadBookmarks(id);
  setBookmarkedIds(bookmarkedIds || []);
  setBookmarkedData(bookmarkedData || []);

  let videoSet = false;

  /* ================= 1️⃣ PREVIEW VIDEO ================= */
  const previewSection = courseData.sections?.find((section: any) =>
    section.items?.some((item: any) => item.type === "video" && item.isPreview)
  );

  if (previewSection) {
    const previewVideo = previewSection.items.find(
      (item: any) => item.type === "video" && item.isPreview
    );

    if (previewVideo) {
      setCurrentVideo({
        ...previewVideo,
        section: previewSection.title,
      });
      videoSet = true;
    }
  }

  /* ================= 2️⃣ FALLBACK → FIRST VIDEO ================= */
  if (!videoSet) {
    const firstSection = courseData.sections?.[0];
    const firstVideo = firstSection?.items?.find(
      (item: any) => item.type === "video"
    );

    if (firstVideo) {
      setCurrentVideo({
        ...firstVideo,
        section: firstSection.title,
      });
    }
  }

  setIsLoading(false);
};



// const getUserProgress = async (userEmail?: string, courseId?: string) => {
//   try {
//     // 🔒 agar email ya courseId hi nahi hai to aage mat badho
//     if (!userEmail || !courseId) {
//       setIsEnrolled(false);
//       return;
//     }

//     const response = await fetch(`${baseUrl}/user-progress/${userEmail}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       // agar 404 ya error aaya to enrolled false
//       setIsEnrolled(false);
//       return;
//     }

//     const data = await response.json();

//     // safe access (kahin undefined na ho)
//     const courseDetails = data?.userProgress?.courseDetails;

//     if (!Array.isArray(courseDetails)) {
//       setIsEnrolled(false);
//       return;
//     }

//     // check karo ki ye course user ne enroll kiya hai ya nahi
//     const matchedCourse = courseDetails.find(
//       (course: { courseId: string }) => course.courseId === courseId
//     );

//     if (matchedCourse) {
//       setIsEnrolled(true);
//     } else {
//       setIsEnrolled(false);
//     }

//   } catch (error) {
//     console.error("Error fetching user progress:", error);
//     // kisi bhi error me safe default = not enrolled
//     setIsEnrolled(false);
//   }
// };


useEffect(() => {
  const fetchData = async () => {
    const fetchedCourse = await getCourseById();

    if (fetchedCourse) {
      setCoursesData(fetchedCourse);

      const user = getUser(); // yaha call karo

      // 🔒 agar user logged in hai tabhi email bhejo
      // if (user && user.email) {
      //   getUserProgress(user.email, fetchedCourse.id);
      // } else {
      //   // user nahi hai to enrolled false rakho
      //   setIsEnrolled(false);
      // }
    }
  };

  fetchData();
}, [id]);


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




const handleEnroll = async () => {
  try {
    const user = getUser();
    const token = getToken();

    if (!user?.email) {
      toast({
        title: "Login required",
        description: "Please login to continue",
        variant: "destructive",
      });
      return;
    }

    // ================= LOAD RAZORPAY =================
    const res = await loadRazorpayScript();
    if (!res) {
      toast({
        title: "Razorpay SDK failed",
        description: "Check your internet connection",
        variant: "destructive",
      });
      return;
    }

    // ================= CREATE ORDER =================
    const orderRes = await fetch(`${baseUrl}/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: course.price, // ✅ BASE PRICE (GST backend me add ho raha)
        currency: "INR",
        courseId: course.id,
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      toast({
        title: "Order failed",
        description: orderData.message || "Something went wrong",
        variant: "destructive",
      });
      return;
    }

    /**
     * backend response expected:
     * {
     *   orderId,
     *   amount,        // totalAmount * 100 (paise)
     *   currency,
     *   gstAmount,
     *   totalAmount
     * }
     */

    // ================= RAZORPAY OPTIONS =================
    const options = {
      key: "rzp_live_RRFHHC0NDEGi6g",

      amount: orderData.amount, // ✅ FINAL AMOUNT (GST included, paise)
      currency: orderData.currency,
      name: "Yogatara",
      description: `${course.title} (incl. 18% GST)`,

      order_id: orderData.orderId,

      prefill: {
        name: user.fullName,
        email: user.email,
        contact: user.phoneNumber || "",
      },

      notes: {
        courseId: course.id,
        baseAmount: course.price,
        gstAmount: orderData.gstAmount,
        totalAmount: orderData.totalAmount,
      },

      theme: {
        color: "#BE7169",
      },

      handler: async function (response: any) {
        // ================= VERIFY PAYMENT =================
        const verifyRes = await fetch(`${baseUrl}/verify-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyRes.ok) {
          toast({
            title: "Payment verification failed",
            description: verifyData.message || "Something went wrong",
            variant: "destructive",
          });
          return;
        }

        // ================= ADD COURSE PROGRESS =================
        await addProgress(
          user.email,
          course.id,
          course.title,
          course.sections?.length || 0
        );

        toast({
          title: "Payment Successful 🎉",
          description: `₹${orderData.totalAmount} (incl. 18% GST) paid successfully`,
        });
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error("Payment error:", error);
    toast({
      title: "Payment failed",
      description: "Something went wrong",
      variant: "destructive",
    });
  }
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

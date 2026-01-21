import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import StudentLayout from "@/components/student/StudentLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Filter, Search, X, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* ================= TYPES ================= */

interface StudentCourse {
  id: string;
  title: string;
  progress: number;
  instructor: string;
  image?: string;
  category: string;
  description: string;
  videoUrl?: string;
  completedDate?: string;
}

interface Review {
  rating: number;
  feedback: string;
}

/* ================= COMPONENT ================= */

const StudentCourses = () => {
  const [inProgressCourses, setInProgressCourses] = useState<StudentCourse[]>([]);
  const [completedCourses, setCompletedCourses] = useState<StudentCourse[]>([]);

  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<StudentCourse | null>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  const [showReview, setShowReview] = useState(false);
  const [reviewCourse, setReviewCourse] = useState<StudentCourse | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reviews, setReviews] = useState<Record<string, Review>>({});
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  /* ================= PRIVACY / SECURITY ================= */

  useEffect(() => {
    // ❌ Right click disable
    const disableRightClick = (e: MouseEvent) => e.preventDefault();

    // ❌ Keyboard shortcuts disable
    const disableKeys = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        ["u", "s", "c", "p", "a", "i", "j"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
      if (e.key === "F12") e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  /* ================= STATIC DATA ================= */

  useEffect(() => {
    setInProgressCourses([
      {
        id: "1",
        title: "Yoga for Beginners",
        progress: 35,
        instructor: "Mridul",
        category: "Yoga",
        description: "Basic yoga course",
        videoUrl:
          "https://iframe.mediadelivery.net/embed/583905/15300ab3-502e-4eab-8b04-ce03dc1409eb",
      },
      {
        id: "2",
        title: "Advanced Meditation",
        progress: 70,
        instructor: "Mridul",
        category: "Meditation",
        description: "Deep meditation practices",
        videoUrl:
          "https://iframe.mediadelivery.net/embed/583905/15300ab3-502e-4eab-8b04-ce03dc1409eb",
      },
    ]);

    setCompletedCourses([
      {
        id: "3",
        title: "Pranayama Mastery",
        progress: 100,
        instructor: "Mridul",
        category: "Breathing",
        description: "Complete pranayama course",
        image: "/placeholder.svg",
        completedDate: "2025-12-20",
      },
    ]);
  }, []);

  /* ================= CERTIFICATE ================= */

const downloadPDF = async () => {
  if (!certificateRef.current) return;

  const element = certificateRef.current;

  const canvas = await html2canvas(element, {
    scale: 3, // 🔥 high quality
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 landscape size (px)
  const pdf = new jsPDF("landscape", "px", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // 🔥 Scale image to fit PDF
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  const finalWidth = imgWidth * ratio;
  const finalHeight = imgHeight * ratio;

  // 🔥 CENTER POSITION
  const x = (pdfWidth - finalWidth) / 2;
  const y = (pdfHeight - finalHeight) / 2;

  pdf.addImage(
    imgData,
    "PNG",
    x,
    y,
    finalWidth,
    finalHeight,
    undefined,
    "FAST"
  );

  pdf.save("certificate.pdf");
};


  /* ================= REVIEW ================= */

  const submitReview = () => {
    if (!reviewCourse) return;
    setReviews((prev) => ({
      ...prev,
      [reviewCourse.id]: { rating, feedback },
    }));
    setShowReview(false);
  };

  /* ================= UI ================= */

  return (
    <StudentLayout>
      <div className="space-y-8 p-4">

        {/* HEADER */}
       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  {/* LEFT */}
  <div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
      My Courses
    </h1>
    <p className="text-sm text-gray-500 dark:text-gray-400">
      Manage and track your learning journey
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-3">
    {/* SEARCH */}
    <div className="relative w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search courses..."
        className="
          h-10
          w-full
          pl-10 pr-4
          rounded-xl
          border border-gray-300
          bg-white
          text-sm text-gray-900
          placeholder-gray-400
          focus:outline-none
          focus:ring-2 focus:ring-indigo-500
          dark:bg-gray-900
          dark:border-gray-700
          dark:text-gray-100
          dark:placeholder-gray-500
        "
      />
    </div>

    {/* FILTER */}
    <button
      className="
        h-10
        px-4
        flex items-center gap-2
        rounded-xl
        border border-gray-300
        text-sm font-medium
        text-gray-700
        hover:bg-gray-100
        dark:border-gray-700
        dark:text-gray-200
        dark:hover:bg-gray-800
      "
    >
      <Filter className="h-4 w-4" />
      Filter
    </button>
  </div>
</div>


        {/* TABS */}
        <Tabs defaultValue="in-progress">
          <TabsList>
            <TabsTrigger value="in-progress">
              In Progress ({inProgressCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedCourses.length})
            </TabsTrigger>
          </TabsList>

          {/* IN PROGRESS */}
          <TabsContent value="in-progress" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {inProgressCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <div
  className="relative"
  style={{ paddingTop: "56.25%" }}
  onContextMenu={(e) => e.preventDefault()} // right click block
>
  <iframe
    src={`${course.videoUrl}?autoplay=false&controls=1&muted=false`}
    title={course.title}
    loading="lazy"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
    allowFullScreen
    sandbox="allow-scripts allow-same-origin allow-presentation"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: "0",
    }}
  />
</div>


                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    Instructor: {course.instructor}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </CardContent>

                <CardFooter>
                  <Link to={`/student/course/${course.id}`} className="w-full">
                    <ButtonCustom className="w-full">
                      Continue Learning
                    </ButtonCustom>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* COMPLETED */}
          <TabsContent value="completed" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {completedCourses.map((course) => (
              <Card key={course.id}>
                <img
                  src={course.image}
                  alt={course.title}
                  className="aspect-video object-cover"
                />

                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    Instructor: {course.instructor}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  Completed on:{" "}
                  {new Date(course.completedDate!).toLocaleDateString()}
                </CardContent>

                <CardFooter className="grid grid-cols-2 gap-2">
                  <ButtonCustom
                    variant="outline"
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowCertificate(true);
                    }}
                  >
                    Certificate
                  </ButtonCustom>

                  <ButtonCustom
                    variant="secondary"
                    onClick={() => {
                      setReviewCourse(course);
                      setShowReview(true);
                    }}
                  >
                    Review
                  </ButtonCustom>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* CERTIFICATE MODAL */}
      {/* CERTIFICATE MODAL */}
{showCertificate && selectedCourse && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl w-full max-w-4xl relative shadow-2xl">
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
        onClick={() => setShowCertificate(false)}
      >
        <X />
      </button>

      {/* CERTIFICATE */}
      <div
        ref={certificateRef}
        className="relative p-10 border-[6px] border-indigo-600 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-indigo-100"
      >
        {/* TOP */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <h3 className="text-sm text-gray-600">
              Certificate No:
              <span className="font-semibold ml-1">
                YOG-{selectedCourse.id}-2026
              </span>
            </h3>
            <h3 className="text-sm text-gray-600">
              Issued On:{" "}
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </h3>
          </div>

          {/* LOGO */}
          <div className="text-right">
            <h2 className="text-2xl font-bold text-indigo-700">
              YOGATARA
            </h2>
            <p className="text-xs text-gray-500">
              Authentic Yoga Learning Platform
            </p>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-indigo-700">
            Certificate of Completion
          </h1>
          <p className="mt-3 text-gray-600">
            This certificate is proudly presented to
          </p>
        </div>

        {/* STUDENT NAME */}
        <div className="text-center my-6">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 inline-block px-6 pb-2">
            Khush singh
          </h2>
        </div>

        {/* COURSE INFO */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-lg text-gray-700">
            for successfully completing the course
          </p>

          <h3 className="text-2xl font-semibold text-indigo-600">
            {selectedCourse.title}
          </h3>

          <p className="text-sm text-gray-600">
            Category: {selectedCourse.category}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-end mt-14">
          {/* SIGNATURE */}
          <div className="text-center">
            <div className="border-t-2 w-40 mx-auto mb-1"></div>
            <p className="font-semibold text-gray-800">
              {selectedCourse.instructor}
            </p>
            <p className="text-xs text-gray-500">
              Certified Yoga Instructor
            </p>
          </div>

          {/* SEAL */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border-4 border-indigo-600 flex items-center justify-center text-indigo-600 font-bold">
              ✔
            </div>
            <p className="text-xs mt-1 text-gray-500">
              Verified Certificate
            </p>
          </div>
        </div>
      </div>

      {/* DOWNLOAD */}
      <ButtonCustom
        className="mt-6 w-full text-lg"
        onClick={downloadPDF}
      >
        <Download className="mr-2" />
        Download Certificate (PDF)
      </ButtonCustom>
    </div>
  </div>
)}


        {/* REVIEW MODAL */}
      {showReview && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div
      className="
        relative w-full max-w-md rounded-2xl p-6
        bg-white text-gray-900
        shadow-2xl
        dark:bg-gray-900 dark:text-gray-100
      "
    >
      {/* CLOSE */}
      <button
        onClick={() => setShowReview(false)}
        className="
          absolute top-4 right-4 rounded-full p-1
          text-gray-500 hover:text-gray-900
          dark:text-gray-400 dark:hover:text-white
        "
      >
        <X className="h-5 w-5" />
      </button>

      {/* TITLE */}
      <h2 className="text-xl font-bold mb-1">
        Leave Review
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Rate this course and share your feedback
      </p>

      {/* STARS */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setRating(s)}
            className={`text-3xl transition ${
              s <= rating
                ? "text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* TEXTAREA */}
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback..."
        className="
          w-full min-h-[100px] rounded-xl border px-4 py-2 text-sm
          bg-white text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          dark:bg-gray-800 dark:border-gray-700
          dark:text-gray-100 dark:placeholder-gray-500
        "
      />

      {/* BUTTON */}
      <ButtonCustom
        className="mt-5 w-full text-base"
        onClick={submitReview}
      >
        Submit Review
      </ButtonCustom>
    </div>
  </div>
)}

      </div>
    </StudentLayout>
  );
};

export default StudentCourses;

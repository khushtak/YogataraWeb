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
import { Filter, Search, X, Download, BookOpen } from "lucide-react";
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

  /* ================= SECURITY ================= */

  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => e.preventDefault();
    const disableKeys = (e: KeyboardEvent) => {
      if (e.ctrlKey && ["u", "s", "c", "p", "a", "i", "j"].includes(e.key.toLowerCase()))
        e.preventDefault();
      if (e.key === "F12") e.preventDefault();
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  /* ================= CERTIFICATE ================= */

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const pdf = new jsPDF("landscape", "px", "a4");
    const imgData = canvas.toDataURL("image/png");

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();

    const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height);

    pdf.addImage(
      imgData,
      "PNG",
      (pdfW - canvas.width * ratio) / 2,
      (pdfH - canvas.height * ratio) / 2,
      canvas.width * ratio,
      canvas.height * ratio
    );

    pdf.save("certificate.pdf");
  };

  /* ================= UI ================= */

  return (
    <StudentLayout>
      <div className="space-y-8 p-4">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">
              Manage and track your learning journey
            </p>
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

          {/* ================= IN PROGRESS ================= */}
          <TabsContent value="in-progress" className="mt-6">
            {inProgressCourses.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inProgressCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ================= COMPLETED ================= */}
          <TabsContent value="completed" className="mt-6">
            {completedCourses.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {completedCourses.map((course) => (
                  <CompletedCard
                    key={course.id}
                    course={course}
                    setSelectedCourse={setSelectedCourse}
                    setShowCertificate={setShowCertificate}
                    setReviewCourse={setReviewCourse}
                    setShowReview={setShowReview}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* ================= CERTIFICATE MODAL ================= */}
        {showCertificate && selectedCourse && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-4xl relative">
              <button
                className="absolute top-4 right-4"
                onClick={() => setShowCertificate(false)}
              >
                <X />
              </button>

              <div ref={certificateRef} className="p-10 border-4 rounded-xl">
                <h1 className="text-3xl font-bold text-center">
                  Certificate of Completion
                </h1>
                <p className="text-center mt-4 text-xl">
                  {selectedCourse.title}
                </p>
              </div>

              <ButtonCustom className="mt-6 w-full" onClick={downloadPDF}>
                <Download className="mr-2" />
                Download Certificate
              </ButtonCustom>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

/* ================= EMPTY STATE ================= */

const EmptyState = () => (
  <div className="text-center py-16">
    <BookOpen className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
    <p className="text-muted-foreground mb-4">
      You haven’t enrolled in any courses yet.
    </p>
    <Link to="/courses">
      <ButtonCustom>Explore Courses</ButtonCustom>
    </Link>
  </div>
);

/* ================= CARDS ================= */

const CourseCard = ({ course }: { course: StudentCourse }) => (
  <Card>
    <CardHeader>
      <CardTitle>{course.title}</CardTitle>
      <CardDescription>Instructor: {course.instructor}</CardDescription>
    </CardHeader>
    <CardContent>
      <Progress value={course.progress} />
    </CardContent>
    <CardFooter>
      <ButtonCustom className="w-full">Continue</ButtonCustom>
    </CardFooter>
  </Card>
);

const CompletedCard = ({ course, setSelectedCourse, setShowCertificate, setReviewCourse, setShowReview }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>{course.title}</CardTitle>
      <CardDescription>Completed</CardDescription>
    </CardHeader>
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
);

export default StudentCourses;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageQuestions from "./pages/admin/ManageQuestions";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageNotifications from "./pages/admin/ManageNotifications";
import Settings from "./pages/admin/Settings";
import CreateCourse from "./pages/admin/CreateCourse";
import EditCourse from "./pages/admin/EditCourse";

// Student Dashboard Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentGrades from "./pages/student/StudentGrades";
import StudentProfile from "./pages/student/StudentProfile";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentAssignmentDetail from "./pages/student/StudentAssignmentDetail";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// This component serves as a loading indicator for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Simple global error boundary at the route level
const RouteErrorBoundary = ({children}: {children: React.ReactNode}) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    // Add a global error handler
    const handler = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      setError(event.error);
      setHasError(true);
      event.preventDefault();
    };

    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h2>
        {error && (
          <div className="bg-gray-100 p-4 rounded-md mb-4 max-w-lg overflow-auto">
            <p className="font-mono text-sm">{error.message}</p>
          </div>
        )}
        <button
          className="px-4 py-2 bg-primary text-white rounded"
          onClick={() => {
            setHasError(false);
            setError(null);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  return children;
};

// Error boundary component for the entire app
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to the console
    console.error("App rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Application Error</h2>
          {this.state.error && (
            <div className="bg-gray-100 p-4 rounded-md mb-4 max-w-lg overflow-auto">
              <p className="font-mono text-sm">{this.state.error.message}</p>
            </div>
          )}
          <button
            className="px-4 py-2 bg-primary text-white rounded"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <RouteErrorBoundary>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Student Dashboard Routes */}
                  <Route path="/student" element={<StudentDashboard />} />
                  <Route path="/student/courses" element={<StudentCourses />} />
                  <Route path="/student/course/:courseId" element={<StudentCourseDetail />} />
                  <Route path="/student/assignments" element={<StudentAssignments />} />
                  <Route path="/student/assignments/:assignmentId" element={<StudentAssignmentDetail />} />
                  <Route path="/student/assignments/:assignmentId/details" element={<StudentAssignmentDetail />} />
                  <Route path="/student/assignments/:assignmentId/submission" element={<StudentAssignmentDetail />} />
                  <Route path="/student/grades" element={<StudentGrades />} />
                  <Route path="/student/profile" element={<StudentProfile />} />
                  <Route path="/student/calendar" element={<StudentCalendar />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/courses" element={<ManageCourses />} />
                  <Route path="/admin/courses/create" element={<CreateCourse />} />
                  <Route path="/admin/courses/edit/:id" element={<EditCourse />} />
                  <Route path="/admin/questions" element={<ManageQuestions />} />
                  <Route path="/admin/students" element={<ManageStudents />} />
                  <Route path="/admin/notifications" element={<ManageNotifications />} />
                  <Route path="/admin/settings" element={<Settings />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RouteErrorBoundary>
            </Suspense>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;

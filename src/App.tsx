// src/App.tsx

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";

// 🔐 AUTH
import { getToken } from "@/utils/auth";

// Public Pages
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageQuestions from "./pages/admin/ManageQuestions";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageNotifications from "./pages/admin/ManageNotifications";
import Settings from "./pages/admin/Settings";
import CreateCourse from "./pages/admin/CreateCourse";
import EditCourse from "./pages/admin/EditCourse";
import SubscribedStudents from "./pages/admin/ManageSubscribed";
import AdminCoupons from "./pages/admin/AdminCoupon";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentGrades from "./pages/student/StudentGrades";
import StudentProfile from "./pages/student/StudentProfile";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentAssignmentDetail from "./pages/student/StudentAssignmentDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// 🔥 QUERY CLIENT
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// 🔄 LOADER
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// 🔐 AUTH HELPERS
const isAuthenticated = () => {
  return !!getToken();
};

// 🔒 PROTECTED ROUTE (login required)
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 🚫 AUTH ROUTE (login/register hide after login)
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/student" replace />;
  }
  return children;
};

// 🌍 ROUTE ERROR BOUNDARY
const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      setError(event.error);
      setHasError(true);
      event.preventDefault();
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Something went wrong
        </h2>
        {error && (
          <pre className="bg-gray-100 p-4 rounded text-sm max-w-lg overflow-auto">
            {error.message}
          </pre>
        )}
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
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

  return <>{children}</>;
};

// 🌐 APP ERROR BOUNDARY
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <h2 className="text-xl text-red-500">
            Application crashed. Please reload.
          </h2>
        </div>
      );
    }
    return this.props.children;
  }
}

// 🚀 APP
const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <RouteErrorBoundary>
                <Routes>
                  {/* PUBLIC */}
                  <Route path="/" element={<Index />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/course/:id" element={<CourseDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />



                  {/* AUTH */}
                  <Route
                    path="/login"
                    element={
                      <AuthRoute>
                        <Login />
                      </AuthRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <AuthRoute>
                        <Register />
                      </AuthRoute>
                    }
                  />

                  {/* STUDENT */}
                  <Route path="/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                  <Route path="/student/courses" element={<ProtectedRoute><StudentCourses /></ProtectedRoute>} />
                  <Route path="/student/course/:courseId" element={<ProtectedRoute><StudentCourseDetail /></ProtectedRoute>} />
                  <Route path="/student/assignments" element={<ProtectedRoute><StudentAssignments /></ProtectedRoute>} />
                  <Route path="/student/assignments/:assignmentId" element={<ProtectedRoute><StudentAssignmentDetail /></ProtectedRoute>} />
                  <Route path="/student/assignments/:assignmentId/details" element={<ProtectedRoute><StudentAssignmentDetail /></ProtectedRoute>} />
                  <Route path="/student/assignments/:assignmentId/submission" element={<ProtectedRoute><StudentAssignmentDetail /></ProtectedRoute>} />
                  <Route path="/student/grades" element={<ProtectedRoute><StudentGrades /></ProtectedRoute>} />
                  <Route path="/student/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
                  <Route path="/student/calendar" element={<ProtectedRoute><StudentCalendar /></ProtectedRoute>} />

                  {/* ADMIN */}
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/courses" element={<ProtectedRoute><ManageCourses /></ProtectedRoute>} />
                  <Route path="/admin/courses/create" element={<ProtectedRoute><CreateCourse /></ProtectedRoute>} />
                  <Route path="/admin/courses/edit/:id" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
                  <Route path="/admin/questions" element={<ProtectedRoute><ManageQuestions /></ProtectedRoute>} />
                  <Route path="/admin/students" element={<ProtectedRoute><ManageStudents /></ProtectedRoute>} />
                  <Route path="/admin/subscribed-students" element={<ProtectedRoute><SubscribedStudents /></ProtectedRoute>} />
                  <Route path="/admin/coupons" element={<ProtectedRoute><AdminCoupons /></ProtectedRoute>} />
                  <Route path="/admin/notifications" element={<ProtectedRoute><ManageNotifications /></ProtectedRoute>} />
                  <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                  {/* FALLBACK */}
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

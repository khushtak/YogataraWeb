import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, useEffect } from "react";

// 🔐 AUTH
import { getToken, getUser } from "@/utils/auth";

// Public Pages
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import VerifyEmail from "./pages/verifyEmail";

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
import AdminLogin from "./pages/AdminLogin";

// Student Pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentGrades from "./pages/student/StudentGrades";
import StudentProfile from "./pages/student/StudentProfile";
import StudentCalendar from "./pages/student/StudentCalendar";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";
import StudentAssignmentDetail from "./pages/student/StudentAssignmentDetail";
import CreateStudentPage from "./components/admin/AdminCreateStudent";
import StudentsPage from "./components/admin/AdminStudent";
import CategoryList from "./components/admin/ViewCategory";
import AddCategory from "./components/admin/AddCategory";

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
const isAuthenticated = () => !!getToken();

const getRole = () => {
  const user = getUser();
  return user?.role || null; // "admin" | "student"
};

// 🔒 PROTECTED ROUTE (login required)
const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole: "admin" | "student";
}) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getRole();
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// 🚫 LOGIN / REGISTER HIDE AFTER LOGIN
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    const role = getRole();
    return <Navigate to={role === "admin" ? "/admin" : "/student"} replace />;
  }
  return children;
};

// 🚫 ADMIN LOGIN HIDE AFTER LOGIN
const AdminAuthRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    const role = getRole();
    return <Navigate to={role === "admin" ? "/admin" : "/student"} replace />;
  }
  return children;
};

// 🚀 APP
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
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
              <Route
                path="/admin-login"
                element={
                  <AdminAuthRoute>
                    <AdminLogin />
                  </AdminAuthRoute>
                }
              />

              <Route path="/verify-email/:token" element={<VerifyEmail />} />

              {/* STUDENT ROUTES */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/courses"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/course/:id"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentCourseDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/assignments"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentAssignments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/assignments/:assignmentId"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentAssignmentDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/grades"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentGrades />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/calendar"
                element={
                  <ProtectedRoute allowedRole="student">
                    <StudentCalendar />
                  </ProtectedRoute>
                }
              />

              {/* ADMIN ROUTES */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create-student"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <CreateStudentPage />
                  </ProtectedRoute>
                }
              />
               {/* <Route
                path="/admin/student"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <StudentsPage />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/admin/courses"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <CategoryList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-category"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AddCategory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/courses/create"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/courses/edit/:id"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <EditCourse />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/questions"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageQuestions />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/students"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageStudents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/subscribed-students"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <SubscribedStudents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/coupons"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminCoupons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/notifications"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageNotifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* FALLBACK */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

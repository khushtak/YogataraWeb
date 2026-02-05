import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  AlignLeft,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Tag,
} from "lucide-react";
import { GiShipWheel } from "react-icons/gi";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 LOGOUT FUNCTION
  const handleLogout = () => {
    // ✅ clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("isAdmin");

    sessionStorage.clear();

    // ✅ redirect to admin login
    navigate("/admin-login", { replace: true });
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      title: "Courses",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      title: "Questions",
      icon: AlignLeft,
      path: "/admin/questions",
    },
    {
      title: "Students",
      icon: Users,
      path: "/admin/students",
    },
    {
      title: "Subscribed Students",
      icon: Users,
      path: "/admin/subscribed-students",
    },
    {
      title: "Categories",
      icon: Users,
      path: "/admin/categories",
    },
    {
      title: "Create Students",
      icon: Users,
      path: "/admin/create-student",
    },
    {
      title: "Coupons",
      icon: Tag,
      path: "/admin/coupons",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/admin/notifications",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="h-screen w-64 bg-card border-r border-border flex flex-col">
      {/* LOGO */}
      <div className="p-6">
        <Link to="/admin" className="flex items-center space-x-2">
          <GiShipWheel className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            Vedic Astro
          </span>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all",
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <span className="flex items-center">
                    <Icon className="h-5 w-5" />
                    <span className="ml-3">{item.title}</span>
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition",
                      active && "text-primary"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

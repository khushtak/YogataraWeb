import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  Tag,          // ✅ Coupon icon
} from "lucide-react";
import { GiShipWheel } from "react-icons/gi";

const AdminSidebar = () => {
  const location = useLocation();

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
      title: "Coupons",              // ✅ NEW
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

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="h-screen w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
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

      {/* Menu */}
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

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <Link
          to="/login"
          className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log out
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;

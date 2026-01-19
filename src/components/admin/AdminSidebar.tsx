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
} from "lucide-react";
import { GiShipWheel } from "react-icons/gi";

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin",
    },
    {
      title: "Courses",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/admin/courses",
    },
    {
      title: "Questions",
      icon: <AlignLeft className="h-5 w-5" />,
      path: "/admin/questions",
    },
    {
      title: "Students",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/students",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      path: "/admin/notifications",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="h-screen bg-card border-r border-border w-64 flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <GiShipWheel className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-semibold tracking-tight">
            Vedic Astro
          </span>
        </Link>
        <div className="text-sm text-muted-foreground mt-1">
          Admin Dashboard
        </div>
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center justify-between p-3 rounded-md text-sm transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <span className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <Link
          to="/login"
          className="flex items-center p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Log out</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;

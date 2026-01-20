import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookCopy,
  ClipboardList,
  Calendar,
  User,
  LogOut,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { getAnnouncements } from "@/utils/dataUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiShipWheel } from "react-icons/gi";

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const announcements = getAnnouncements();
  const unreadNotifications = announcements.length;

  /* ================= THEME ================= */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  const sidebarLinks = [
    { name: "Dashboard", icon: Home, path: "/student" },
    { name: "My Courses", icon: BookCopy, path: "/student/courses" },
    { name: "Assignments", icon: ClipboardList, path: "/student/assignments" },
    { name: "Calendar", icon: Calendar, path: "/student/calendar" },
    { name: "Profile", icon: User, path: "/student/profile" },
  ];

  const handleLogout = () => navigate("/");

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col bg-card border-r border-border z-30">
        <div className="p-4 flex items-center">
          <Link to="/" className="flex items-center">
            <GiShipWheel className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-semibold">Yogtara</span>
          </Link>
        </div>

        <Separator />

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent"
              )}
            >
              <link.icon className="h-5 w-5 mr-3" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <ButtonCustom
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </ButtonCustom>
        </div>
      </aside>

      {/* ================= TOP RIGHT ================= */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
        {/* 🔔 Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 bg-background border border-border rounded-full shadow-sm">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs h-4 w-4 flex items-center justify-center rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          {/* ✅ BLUR FIXED DROPDOWN */}
          <DropdownMenuContent
            align="end"
            side="bottom"
            sideOffset={12}
            collisionPadding={20}
            className="
              z-[9999]
              w-80
              max-h-[70vh]
              overflow-y-auto
              rounded-xl
              border border-border
              shadow-2xl

              bg-white/70
              dark:bg-black/60

              backdrop-blur-xl
              backdrop-saturate-150
            "
          >
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {announcements.length > 0 ? (
              announcements.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <span className="font-medium">{n.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {n.content}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {n.date}
                  </span>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                No notifications
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🌙 Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-background border border-border rounded-full hover:bg-accent transition"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* ================= MAIN ================= */}
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default StudentLayout;

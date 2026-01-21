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
  Menu,
  X,
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

  /* ================= MOBILE DRAWER ================= */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col bg-card border-r border-border z-30">
        <div className="p-4 flex items-center">
          <GiShipWheel className="h-6 w-6 text-primary mr-2" />
          <span className="text-lg font-semibold">Yogtara</span>
        </div>

        <Separator />

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg",
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-accent"
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

      {/* ================= MOBILE DRAWER ================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsDrawerOpen(false)}
          />

          <aside className="absolute left-0 top-0 h-full w-64 bg-card border-r border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-lg">Yogtara</span>
              <X onClick={() => setIsDrawerOpen(false)} className="cursor-pointer" />
            </div>

            <Separator />

            <nav className="mt-4 space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsDrawerOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent"
                  )}
                >
                  <link.icon className="h-5 w-5 mr-3" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* ================= TOP BAR ================= */}
      <div className="fixed top-4 left-4 right-4 z-[100] flex justify-between lg:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 bg-background border rounded-full"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ================= TOP RIGHT ================= */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 bg-background border rounded-full">
              <Bell className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {announcements.map((n) => (
              <DropdownMenuItem key={n.id}>
                {n.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={toggleTheme}
          className="p-2 bg-background border rounded-full"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
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

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Home,
  BookCopy,
  ClipboardList,
  Calendar,
  User,
  LogOut,
  Bell,
  Sun,
  Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Separator } from '@/components/ui/separator';
import { getAnnouncements } from '@/utils/dataUtils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiShipWheel } from 'react-icons/gi';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const announcements = getAnnouncements();
  const unreadNotifications = announcements.length;

  /* ================= THEME TOGGLE ================= */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const sidebarLinks = [
    { name: 'Dashboard', icon: Home, path: '/student' },
    { name: 'My Courses', icon: BookCopy, path: '/student/courses' },
    { name: 'Assignments', icon: ClipboardList, path: '/student/assignments' },
    { name: 'Calendar', icon: Calendar, path: '/student/calendar' },
    { name: 'Profile', icon: User, path: '/student/profile' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= SIDEBAR ================= */}
      <aside className={cn(
        "hidden lg:flex flex-col w-64 bg-card border-r border-border",
        "fixed top-0 left-0 h-full z-30"
      )}>
        <div className="p-4 flex items-center">
          <Link to="/" className="flex items-center">
            <GiShipWheel className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-semibold">Vedic Astro</span>
          </Link>
        </div>

        <Separator />

        <nav className="flex-1 p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-lg transition-colors",
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

        <div className="p-4 mt-auto">
          <ButtonCustom
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </ButtonCustom>
        </div>
      </aside>

      {/* ================= TOP BAR (MOBILE) ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-semibold">LearnSync</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* 🔔 Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {announcements.length > 0 ? (
                  announcements.map((n) => (
                    <DropdownMenuItem key={n.id} className="flex flex-col items-start py-2">
                      <span className="font-medium">{n.title}</span>
                      <span className="text-sm text-muted-foreground">{n.content}</span>
                      <span className="text-xs text-muted-foreground mt-1">{n.date}</span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 🌙☀️ THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* 👤 User */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sidebarLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link to={link.path} className="flex items-center">
                      <link.icon className="h-4 w-4 mr-2" />
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP TOP RIGHT ================= */}
      <div className="hidden lg:flex fixed top-4 right-4 z-40 items-center gap-2">
        {/* 🔔 Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 bg-background border border-border rounded-full shadow-sm">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {announcements.length > 0 ? (
              announcements.map((n) => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start py-2">
                  <span className="font-medium">{n.title}</span>
                  <span className="text-sm text-muted-foreground">{n.content}</span>
                  <span className="text-xs text-muted-foreground mt-1">{n.date}</span>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 🌙☀️ Theme Toggle */}
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

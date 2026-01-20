import React, { useEffect, useState } from "react";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  /* ================= THEME STATE ================= */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="border-b border-border py-4 px-6 bg-background flex items-center justify-between">
      {/* ================= SEARCH ================= */}
      <div className="flex items-center relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="pl-10" />
      </div>

      {/* ================= RIGHT ACTIONS ================= */}
      <div className="flex items-center space-x-4">
        {/* 🌙 THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-border hover:bg-muted transition"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        {/* 🔔 NOTIFICATION */}
        <button className="p-2 rounded-full hover:bg-muted relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
        </button>

        {/* 👤 PROFILE DROPDOWN */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="text-sm hidden md:block">
                <p className="font-medium">Admin User</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-48
              bg-background
              border border-border
              shadow-lg
            "
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </DropdownMenuItem>

            <Link to="/admin/settings">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem>
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;

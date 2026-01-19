import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, User, Laptop, Moon, Sun } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { cn } from "@/lib/utils";
import { GiShipWheel } from "react-icons/gi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🌗 THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const location = useLocation();

  // ✅ LOGIN CHECK
  const isLoggedIn = !!localStorage.getItem("token");

  // 🌗 APPLY THEME
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  // 📜 SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Courses", path: "/courses" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const isCoursePage = location.pathname.includes("/course/");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || isCoursePage
          ? "bg-background py-3 shadow-md"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom mx-auto flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <GiShipWheel className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-semibold tracking-tight">
            Yogtara
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/courses">
            <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
          </Link>

          {/* 🌗 THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-foreground/70" />
            )}
          </button>

          {isLoggedIn ? (
            <Link to="/student">
              <ButtonCustom
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Laptop className="h-4 w-4 mr-2" />
                Dashboard
              </ButtonCustom>
            </Link>
          ) : (
            <Link to="/login">
              <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition">
                <User className="h-5 w-5 text-foreground/70" />
              </div>
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-20 px-6 flex flex-col transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-base font-medium py-2 border-b border-border",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              {link.title}
            </Link>
          ))}

          {isLoggedIn ? (
            <Link
              to="/student"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-border"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium py-2 border-b border-border"
            >
              Login
            </Link>
          )}
        </nav>

        {/* 🌗 MOBILE THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="mt-10 flex items-center justify-center gap-2 py-3 border border-border rounded-lg"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="text-sm">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

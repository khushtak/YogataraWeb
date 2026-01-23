import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, Laptop, Moon, Sun, LogOut } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { cn } from "@/lib/utils";
import { GiShipWheel } from "react-icons/gi";

/* 🔥 LOGOUT */
const logoutUser = (navigate: any) => {
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.classList.remove("dark");
  navigate("/", { replace: true });
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  /* 🌗 THEME */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Courses", path: "/courses" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all",
        isScrolled
          ? "bg-background shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <GiShipWheel className="h-8 w-8 text-primary mr-2" />
          <span className="text-xl font-semibold">Yogtara</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium hover:text-primary",
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/80"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">

          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="h-9 w-9 rounded-full bg-muted flex items-center justify-center"
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/student">
                <ButtonCustom size="sm" variant="outline">
                  <Laptop className="h-4 w-4 mr-2" />
                  Dashboard
                </ButtonCustom>
              </Link>
              <button
                onClick={() => logoutUser(navigate)}
                className="p-2 rounded-full bg-muted"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link to="/login">
              <User />
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
    </header>
  );
};

export default Navbar;

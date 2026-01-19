import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
        {/* background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative w-full max-w-5xl grid md:grid-cols-2
          bg-card text-card-foreground border border-border
          rounded-2xl shadow-xl overflow-hidden">

          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-center px-10 bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">
              Welcome back to Yogtara 🧘‍♂️
            </h2>
            <p className="opacity-90">
              Continue your mindful learning journey with expert-led yoga
              and meditation courses.
            </p>

            <ul className="mt-8 space-y-2 text-sm opacity-90">
              <li>✔ Track your progress</li>
              <li>✔ Learn anytime, anywhere</li>
              <li>✔ Certified instructors</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
            <p className="text-muted-foreground mb-8">
              Enter your credentials to continue
            </p>

            <form className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-12 pl-11 pr-4 rounded-lg
                      bg-background border border-input text-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full h-12 pl-11 pr-12 rounded-lg
                      bg-background border border-input text-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>

              <ButtonCustom className="w-full h-12 text-base">
                Sign In
              </ButtonCustom>

              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative w-full max-w-5xl grid md:grid-cols-2
          bg-card text-card-foreground border border-border
          rounded-2xl shadow-xl overflow-hidden">

          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-center px-10 bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">
              Join Yogtara 🌿
            </h2>
            <p className="opacity-90">
              Create your account and start your journey towards
              mindfulness and wellness.
            </p>

            <ul className="mt-8 space-y-2 text-sm opacity-90">
              <li>✔ Personalized courses</li>
              <li>✔ Learn at your pace</li>
              <li>✔ Community support</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-semibold mb-2">
              Create account
            </h1>
            <p className="text-muted-foreground mb-8">
              Join our learning community
            </p>

            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full h-12 pl-11 pr-4 rounded-lg
                      bg-background border border-input text-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

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
                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
                <p className="text-xs text-muted-foreground mt-2">
                  Minimum 8 characters
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" required className="accent-primary mt-1" />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <ButtonCustom className="w-full h-12 text-base">
                Create Account
              </ButtonCustom>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
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

export default Register;

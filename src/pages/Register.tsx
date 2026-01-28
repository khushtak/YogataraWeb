import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { toast } from "@/hooks/use-toast";

const initialFormData = {
  full_name: "",
  email: "",
  password: "",
};

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  /* ✅ PAGE LOAD / REFRESH PE CLEAR */
  useEffect(() => {
    setFormData(initialFormData);
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= REGISTER API ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.full_name, // 🔥 backend expects fullName
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE 👉", data);

      /* ❌ ERROR CASE */
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: data?.message || "Something went wrong",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      /* ✅ SUCCESS CASE (EMAIL VERIFICATION) */
      toast({
        title: "Account created 🎉",
        description: "Verification email sent. Please check your inbox 📩",
        duration: 2500,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Server error",
        description: "Please try again later",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div
          className="relative w-full max-w-5xl grid md:grid-cols-2
          bg-card text-card-foreground border border-border
          rounded-2xl shadow-xl overflow-hidden"
        >
          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-center px-10 bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Join Yogtara 🌿</h2>
            <p className="opacity-90">
              Create your account and start your journey towards mindfulness and wellness.
            </p>

            <ul className="mt-8 space-y-2 text-sm opacity-90">
              <li>✔ Personalized courses</li>
              <li>✔ Learn at your pace</li>
              <li>✔ Community support</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-semibold mb-2">Create account</h1>
            <p className="text-muted-foreground mb-8">
              Join our learning community
            </p>

            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* FULL NAME */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your full name"
                    required
                    autoComplete="off"
                    className="w-full h-12 pl-11 pr-4 rounded-lg
                      bg-background border border-input text-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="new-email"
                    className="w-full h-12 pl-11 pr-4 rounded-lg
                      bg-background border border-input text-foreground
                      focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
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

              {/* TERMS */}
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

              <ButtonCustom
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base"
              >
                {loading ? "Creating..." : "Create Account"}
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

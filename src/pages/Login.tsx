import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ButtonCustom } from "@/components/ui/button-custom"
import { toast } from "@/hooks/use-toast"
import { jwtDecode } from "jwt-decode"
import { saveUser, saveToken } from "@/utils/auth"

interface DecodedToken {
  user_id: string
  email: string
  full_name: string
  role: string
  email_verified: boolean
}

const initialFormData = {
  email: "",
  password: "",
}

const Login = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  /* ✅ PAGE LOAD PE CLEAR + AUTOFILL FIX */
  useEffect(() => {
    setFormData(initialFormData)
    window.scrollTo(0, 0)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://192.168.29.73:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      // ❌ ERROR
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description:
            data?.error ||
            data?.detail ||
            "Invalid email or password",
          duration: 2500,
        })
        return
      }

      // ✅ SAVE TOKEN
      saveToken(data.access)

      // ✅ DECODE & SAVE USER
      const decoded = jwtDecode<DecodedToken>(data.access)
      saveUser(decoded)

      toast({
        title: "Login successful ✅",
        description: "Welcome back to Yogtara",
        duration: 1500,
      })

      setFormData(initialFormData)

      setTimeout(() => {
        navigate("/student")
      }, 1500)

    } catch {
      toast({
        variant: "destructive",
        title: "Server error",
        description: "Please try again later",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* 🔄 FULL PAGE LOADER */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="animate-spin w-16 h-16 rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16 relative overflow-hidden">
        {/* BACKGROUND BLUR */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div
          className="relative w-full max-w-5xl grid md:grid-cols-2
          bg-card text-card-foreground border border-border
          rounded-2xl shadow-xl overflow-hidden"
        >
          {/* LEFT PANEL */}
          <div className="hidden md:flex flex-col justify-center px-10 bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">
              Welcome Back 🌿
            </h2>
            <p className="opacity-90">
              Continue your journey towards mindfulness and wellness with Yogtara.
            </p>

            <ul className="mt-8 space-y-2 text-sm opacity-90">
              <li>✔ Access your courses</li>
              <li>✔ Track your progress</li>
              <li>✔ Stay consistent</li>
            </ul>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-semibold mb-2">
              Sign in
            </h1>
            <p className="text-muted-foreground mb-8">
              Login to your account
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              autoComplete="off"
            >
              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="new-email"
                    className="w-full h-12 pl-11 pr-4 rounded-lg
                      bg-background border border-input
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
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="new-password"
                    className="w-full h-12 pl-11 pr-12 rounded-lg
                      bg-background border border-input
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

              <ButtonCustom
                type="submit"
                className="w-full h-12 text-base"
              >
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
  )
}

export default Login

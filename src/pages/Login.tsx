import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ButtonCustom } from "@/components/ui/button-custom"
import { toast } from "@/hooks/use-toast"

import { saveUser, saveToken, getUser } from "@/utils/auth"
import baseUrl from "@/config/Config"
import { getFCMToken, onMessageListener } from "@/firebase"


const initialFormData = {
  email: "",
  password: "",
}

const Login: React.FC = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  /* 🔔 Foreground push listener (ONE TIME) */
  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        toast({
          title: payload?.notification?.title,
          description: payload?.notification?.body,
        })
      })
      .catch(() => {})
  }, [])

  /* 🔐 INPUT CHANGE */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  /* 🔥 LOGIN SUBMIT */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      /* 1️⃣ LOGIN API */
      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: data?.message || "Invalid credentials",
        })
        return
      }

      /* 2️⃣ SAVE JWT + USER */
      saveToken(data.token)
      saveUser(data.user)

      /* 3️⃣ FCM TOKEN AFTER LOGIN */
      if ("serviceWorker" in navigator && "Notification" in window) {
        const permission = await Notification.requestPermission()
const data=getUser()

        if (permission === "granted") {
          const fcmToken = await getFCMToken()
console.log('wwww',fcmToken);

          if (fcmToken) {
            await fetch(`${baseUrl}/save-fcm-token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
                
              },
body: JSON.stringify({
              token: fcmToken,
              userId: data.id, // ✅ ID FRONTEND SE
            }),            })
          }
        }
      }

      toast({
        title: "Login successful 🎉",
        description: "Welcome back to Yogatara 🌿",
        duration: 1500,
      })

      setFormData(initialFormData)

      /* 4️⃣ REDIRECT */
      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin", { replace: true })
        } else {
          navigate("/student", { replace: true })
        }
      }, 1200)

    } catch (err) {
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

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="animate-spin w-14 h-14 rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-card border rounded-2xl shadow-xl overflow-hidden">

          {/* LEFT */}
          <div className="hidden md:flex flex-col justify-center px-10 bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Welcome Back 🌿</h2>
            <p>Continue your Yogatara journey.</p>
          </div>

          {/* RIGHT */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-lg border"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full h-12 pl-11 pr-12 rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                 {/* 👇 FORGOT PASSWORD BUTTON */}
  <div className="flex justify-end mt-2">
    <Link
      to="/forgot-password"
      className="text-sm text-primary hover:underline"
    >
      Forgot Password?
    </Link>
  </div>

              </div>

              <ButtonCustom type="submit" className="w-full h-12">
                Sign In
              </ButtonCustom>

              <p className="text-center text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary">
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

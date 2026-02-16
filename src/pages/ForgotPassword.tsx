import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Mail } from "lucide-react"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ButtonCustom } from "@/components/ui/button-custom"
import { toast } from "@/hooks/use-toast"
import baseUrl from "@/config/Config"

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${baseUrl}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
console.log('ds0',res);

      const data = await res.json()

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: data?.message || "Something went wrong",
        })
        return
      }

      toast({
        title: "Reset link sent 📩",
        description: "Please check your email",
      })

      setEmail("")
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

          {/* LEFT SIDE */}
          <div className="hidden md:flex flex-col justify-center px-10 bg-primary text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Forgot Password? 🔐</h2>
            <p>
              Enter your email and we’ll send you a reset link to continue your Yogatara journey.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-semibold mb-6">Reset Password</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 pl-11 pr-4 rounded-lg border"
                  />
                </div>
              </div>

              <ButtonCustom type="submit" className="w-full h-12">
                Send Reset Link
              </ButtonCustom>

              <p className="text-center text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
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

export default ForgotPassword

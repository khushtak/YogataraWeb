"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import baseUrl from "@/config/Config";

/* ================= TYPES ================= */

type Category = {
  _id: string;
  name: string;
  slug: string; // 👈 FIXED COURSE ID
  status: string;
};

/* ================= PAGE ================= */

export default function CreateStudentPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    courseName: "",
    courseId: "",
    paidAmount: "",
    paymentMode: "offline",
  });

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        // only active categories (optional)
        const activeCats = (data.categories || []).filter(
          (c: Category) => c.status === "active"
        );
        setCategories(activeCats);
      });
  }, []);

  /* ================= HANDLERS ================= */

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 👇 category select
  const handleCategoryChange = (slug: string) => {
    const selectedCategory = categories.find(
      (cat) => cat.slug === slug
    );

    setForm((prev) => ({
      ...prev,
      courseName: selectedCategory?.name || "",
      courseId: selectedCategory?.slug || "", // ✅ SLUG AS COURSE ID
    }));
  };

  const handlePaymentModeChange = (value: string) => {
    setForm((prev) => ({ ...prev, paymentMode: value }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.courseId ||
      !form.paidAmount
    ) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${baseUrl}/create-student`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            paidAmount: Number(form.paidAmount),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "❌ Failed");
        return;
      }

      alert("✅ Student created & course assigned");

      setForm({
        fullName: "",
        email: "",
        password: "",
        courseName: "",
        courseId: "",
        paidAmount: "",
        paymentMode: "offline",
      });
    } catch (err) {
      alert("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-semibold mb-6">
            Create Student & Assign Course
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* STUDENT INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name *"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
              />
              <Input
                label="Email *"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
              />
              <Input
                label="Password *"
                name="password"
                type="password"
                value={form.password}
                onChange={handleInputChange}
              />
            </div>

            {/* CATEGORY SELECT */}
            <div className="grid gap-2">
              <Label>Course Category *</Label>

              <Select
                value={form.courseId}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course category" />
                </SelectTrigger>

                <SelectContent className="bg-white text-black border shadow-lg z-50">
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* COURSE ID + PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Course ID (Slug)"
                name="courseId"
                value={form.courseId}
                readOnly
              />
              <Input
                label="Paid Amount (₹) *"
                name="paidAmount"
                type="number"
                value={form.paidAmount}
                onChange={handleInputChange}
              />
            </div>

            {/* PAYMENT MODE */}
            <div className="grid gap-2">
              <Label>Payment Mode</Label>
              <Select
                value={form.paymentMode}
                onValueChange={handlePaymentModeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="bank">Bank</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* SUBMIT */}
            <button
              disabled={loading}
              className="bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Creating..." : "Create Student"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= INPUT COMPONENT ================= */

function Input({ label, ...props }: any) {
  return (
    <div className="grid gap-1">
      <Label>{label}</Label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 text-sm
        focus:ring-2 focus:ring-violet-500"
      />
    </div>
  );
}

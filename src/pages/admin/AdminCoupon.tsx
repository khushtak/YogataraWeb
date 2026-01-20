import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";

/* ---------------- HELPERS ---------------- */
const generateCode = () =>
  "YOG-" + Math.random().toString(36).substring(2, 8).toUpperCase();

const isExpired = (date) => new Date(date) < new Date();

/* ---------------- DUMMY DATA ---------------- */
const studentsList = [
  "Aman Sharma",
  "Riya Verma",
  "Rahul Singh",
  "Neha Gupta",
  "Priya Shah",
];

const coursesList = [
  "Tarot Mastery",
  "Vedic Astrology",
  "Numerology",
  "Palm Reading",
];

/* ---------------- COMPONENT ---------------- */
const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "YOG-TAROT20",
      discount: 20,
      type: "Percentage",
      students: ["Aman Sharma", "Riya Verma"],
      course: "Tarot Mastery",
      expiry: "2026-12-31",
      usage: 5,
    },
    {
      id: 2,
      code: "YOG-FLAT500",
      discount: 500,
      type: "Flat",
      students: ["Rahul Singh"],
      course: "Vedic Astrology",
      expiry: "2025-01-01",
      usage: 2,
    },
  ]);

  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("Percentage");
  const [expiry, setExpiry] = useState("");
  const [course, setCourse] = useState("");

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleStudent = (name) => {
    setSelectedStudents((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  };

  const createCoupon = () => {
    if (!discount || !expiry || !course || selectedStudents.length === 0)
      return;

    setCoupons([
      ...coupons,
      {
        id: Date.now(),
        code: generateCode(),
        discount,
        type,
        students: selectedStudents,
        course,
        expiry,
        usage: 0,
      },
    ]);

    setDiscount("");
    setExpiry("");
    setCourse("");
    setSelectedStudents([]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Coupon Management</h1>

        {/* ================= CREATE COUPON ================= */}
        <div className="bg-card border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-lg">Generate Coupon</h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />

            <select
              className="border rounded-md px-3 py-2 bg-background"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Percentage</option>
              <option>Flat</option>
            </select>

            <Input
              type="date"
              className="dark:[color-scheme:dark]"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />

            <select
              className="border rounded-md px-3 py-2 bg-background"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {coursesList.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* ================= STUDENT MULTI SELECT ================= */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assign Students</label>

            <div className="relative">
              {/* Selected Chips */}
              <div
                onClick={() => setShowDropdown(true)}
                className="min-h-[44px] border rounded-md px-2 py-1 flex flex-wrap gap-2 bg-background cursor-text"
              >
                {selectedStudents.length === 0 && (
                  <span className="text-muted-foreground text-sm">
                    Select students...
                  </span>
                )}

                {selectedStudents.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    {s}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStudent(s);
                      }}
                      className="hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-card border rounded-md shadow-lg">
                  <Input
                    placeholder="Search student..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="m-2"
                  />

                  <div className="max-h-48 overflow-auto">
                    {studentsList
                      .filter((s) =>
                        s.toLowerCase().includes(studentSearch.toLowerCase())
                      )
                      .map((s) => (
                        <div
                          key={s}
                          onClick={() => toggleStudent(s)}
                          className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted ${
                            selectedStudents.includes(s)
                              ? "bg-primary/10 text-primary"
                              : ""
                          }`}
                        >
                          {s}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {showDropdown && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
            )}
          </div>

          <Button onClick={createCoupon}>Generate Coupon</Button>
        </div>

        {/* ================= COUPON TABLE ================= */}
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Course</th>
                <th className="p-4">Students</th>
                <th className="p-4">Usage</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => {
                const expired = isExpired(c.expiry);

                return (
                  <tr key={c.id} className="border-t">
                    <td className="p-4 font-mono flex items-center gap-2">
                      {c.code}
                      <Copy
                        className="h-4 w-4 cursor-pointer text-muted-foreground"
                        onClick={() =>
                          navigator.clipboard.writeText(c.code)
                        }
                      />
                    </td>

                    <td className="p-4 text-center">
                      {c.type === "Percentage"
                        ? `${c.discount}%`
                        : `₹${c.discount}`}
                    </td>

                    <td className="p-4 text-center">{c.course}</td>

                    <td className="p-4 text-center">
                      {c.students.join(", ")}
                    </td>

                    <td className="p-4 text-center">{c.usage}</td>

                    <td className="p-4 text-center">{c.expiry}</td>

                    <td className="p-4 text-center">
                      {expired ? (
                        <Badge variant="destructive">Expired</Badge>
                      ) : (
                        <Badge variant="success">Active</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCoupons;

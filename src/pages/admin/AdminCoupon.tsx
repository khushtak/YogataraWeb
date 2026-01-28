import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import baseUrl from "@/config/Config";

/* ---------------- CONFIG ---------------- */

/* ---------------- HELPERS ---------------- */
const generateCode = () =>
  "YOG-" + Math.random().toString(36).substring(2, 8).toUpperCase();

const isExpired = (date: string) => new Date(date) < new Date();

/* ---------------- COMPONENT ---------------- */
const AdminCoupons = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [coursesList, setCoursesList] = useState<any[]>([]);

  const [code, setCode] = useState(generateCode());
  const [discount, setDiscount] = useState("");
  const [type, setType] = useState("Percentage");
  const [expiry, setExpiry] = useState("");
  const [course, setCourse] = useState("");

  const [selectedStudents, setSelectedStudents] = useState<any[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ---------------- OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- FETCH ---------------- */
  const fetchStudents = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${baseUrl}/students`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setStudentsList(data.students || []);
  };

  const fetchCourses = async () => {
    const res = await fetch(`${baseUrl}/get-courses`);
    const data = await res.json();
    
    setCoursesList(data || []);
  };

  const fetchCoupons = async () => {
    const res = await fetch(`${baseUrl}/getcoupons`);
    const data = await res.json();
    console.log('ppppp',data);
    
    setCoupons(data.coupons || []);
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchCoupons();
  }, []);

  /* ---------------- STUDENT SELECT ---------------- */
  const toggleStudent = (student: any) => {
    setSelectedStudents((prev) =>
      prev.some((s) => s._id === student._id)
        ? prev.filter((s) => s._id !== student._id)
        : [...prev, student]
    );
    setShowDropdown(false);
    setStudentSearch("");
  };

  /* ---------------- CREATE COUPON ---------------- */
  const createCoupon = async () => {
    if (!discount || !expiry || !course || selectedStudents.length === 0) return;

    await fetch(`${baseUrl}/coupons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        discountType: type === "Percentage" ? "percentage" : "flat",
        discountValue: Number(discount),
        courseId: course,
        assignedStudents: selectedStudents.map((s) => s._id),
        expiryDate: new Date(expiry).toISOString(),
      }),
    });

    fetchCoupons();
    setCode(generateCode());
    setDiscount("");
    setExpiry("");
    setCourse("");
    setSelectedStudents([]);
  };

  /* ---------------- DELETE COUPON (FIXED) ---------------- */
const deleteCoupon = async (id: string) => {
  try {
    await fetch(`${baseUrl}/deletecoupons/${id}`, {
      method: "DELETE",
    });

    // UI se bhi hata do
    setCoupons((prev) => prev.filter((c) => c._id !== id));
  } catch (error) {
    console.error("Delete failed", error);
  }
};


  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Coupon Management</h1>

        {/* ================= CREATE ================= */}
        <div className="bg-white border rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-lg">Generate Coupon</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input value={code} onChange={(e) => setCode(e.target.value)} />
            <Input value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Discount" />
            <select className="border rounded-md px-3 py-2" value={type} onChange={(e) => setType(e.target.value)}>
              <option>Percentage</option>
              <option>Flat</option>
            </select>
            <Input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            <select className="border rounded-md px-3 py-2" value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select Course</option>
              {coursesList.map((c) => (
                <option key={c._id} value={c._id}>{c.courseName}</option>
              ))}
            </select>
          </div>

          {/* STUDENTS */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setShowDropdown(true)}
              className="min-h-[44px] border rounded-md px-2 py-1 flex flex-wrap gap-2 cursor-text"
            >
              {selectedStudents.length === 0 && (
                <span className="text-muted-foreground text-sm">Select students...</span>
              )}
              {selectedStudents.map((s) => (
                <span key={s._id} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                  {s.fullName}
                </span>
              ))}
            </div>

            {showDropdown && (
              <div className="absolute z-50 mt-2 w-full bg-white border rounded-md shadow-lg">
                <Input
                  className="m-2"
                  placeholder="Search student..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                />
                <div className="max-h-48 overflow-auto">
                  {studentsList
                    .filter((s) =>
                      s.fullName.toLowerCase().includes(studentSearch.toLowerCase())
                    )
                    .map((s) => (
                      <div
                        key={s._id}
                        onClick={() => toggleStudent(s)}
                        className="px-3 py-2 cursor-pointer hover:bg-muted"
                      >
                        {s.fullName}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <Button onClick={createCoupon}>Generate Coupon</Button>
        </div>

        {/* ================= TABLE (DESIGN FIXED) ================= */}
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-left">Discount</th>
                <th className="p-4 text-left">Course</th>
                <th className="p-4 text-left">Students</th>
                <th className="p-4 text-left">Expiry</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => {
                const expired = isExpired(c.expiryDate);
                return (
                  <tr key={c._id} className="border-t">
                    <td className="p-4 font-medium">{c.code}</td>
                    <td className="p-4">{c.discountValue}%</td>
                    <td className="p-4">{c.courseId?.courseName}</td>
                    <td className="p-4">
                      {c.assignedStudents?.map((s: any) => s.fullName).join(", ")}
                    </td>
                    <td className="p-4">{c.expiryDate?.split("T")[0]}</td>
                    <td className="p-4">
                      <Badge variant={expired ? "destructive" : "success"}>
                        {expired ? "Expired" : "Active"}
                      </Badge>
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteCoupon(c._id)}
                      >
                        <Trash2 size={16} />
                      </Button>
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

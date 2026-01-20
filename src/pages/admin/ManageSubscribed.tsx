import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ---------------- DATA ---------------- */
const studentsData = [
  {
    id: 1,
    name: "Priya Shah",
    email: "priya.shah@example.com",
    plan: "Yearly",
    amount: "₹4,999",
    paymentStatus: "Paid",
    status: "Active",
    expiry: "12 Mar 2026",
    courses: ["Vedic Astrology", "Tarot Mastery"],
    coupon: "YOG-TAROT20",
  },
  {
    id: 2,
    name: "Rahul Verma",
    email: "rahul.v@example.com",
    plan: "Monthly",
    amount: "₹499",
    paymentStatus: "Paid",
    status: "Active",
    expiry: "25 Feb 2025",
    courses: ["Numerology"],
    coupon: null,
  },
  {
    id: 3,
    name: "Ananya Patel",
    email: "ananya.p@example.com",
    plan: "Monthly",
    amount: "₹499",
    paymentStatus: "Failed",
    status: "Expired",
    expiry: "10 Jan 2025",
    courses: [],
    coupon: null,
  },
];

/* ---------------- COMPONENT ---------------- */
const SubscribedStudents = () => {
  const [filter, setFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = studentsData.filter((s) => {
    const statusMatch = filter === "All" || s.status === filter;
    const planMatch = planFilter === "All" || s.plan === planFilter;
    const searchMatch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());

    return statusMatch && planMatch && searchMatch;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Subscribed Students</h1>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name or email..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {["All", "Active", "Expired"].map((item) => (
              <Button
                key={item}
                variant={filter === item ? "default" : "outline"}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}

            <select
              className="border rounded-md px-3 py-2 bg-background"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option>All</option>
              <option>Monthly</option>
              <option>Yearly</option>
              <option>Lifetime</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Expiry</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="border-t hover:bg-muted/40">
                  <td className="p-4">
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  </td>

                  <td className="p-4 text-center">{s.plan}</td>
                  <td className="p-4 text-center">{s.amount}</td>

                  <td className="p-4 text-center">
                    <Badge
                      variant={
                        s.paymentStatus === "Paid"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {s.paymentStatus}
                    </Badge>
                  </td>

                  <td className="p-4 text-center">
                    <Badge
                      variant={s.status === "Active" ? "default" : "secondary"}
                    >
                      {s.status}
                    </Badge>
                  </td>

                  <td className="p-4 text-center">{s.expiry}</td>

                  <td className="p-4 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedStudent(s)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* VIEW MODAL */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 w-full max-w-lg space-y-4">
              <h2 className="text-xl font-semibold">
                {selectedStudent.name}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Email:</b> {selectedStudent.email}</p>
                <p><b>Plan:</b> {selectedStudent.plan}</p>
                <p><b>Amount:</b> {selectedStudent.amount}</p>
                <p><b>Expiry:</b> {selectedStudent.expiry}</p>
                <p><b>Coupon:</b> {selectedStudent.coupon || "None"}</p>
              </div>

              <div>
                <b className="text-sm">Courses Access:</b>
                <ul className="list-disc ml-5 text-sm">
                  {selectedStudent.courses.length > 0 ? (
                    selectedStudent.courses.map((c) => (
                      <li key={c}>{c}</li>
                    ))
                  ) : (
                    <li>No courses assigned</li>
                  )}
                </ul>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
                <Button>Disable Account</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SubscribedStudents;

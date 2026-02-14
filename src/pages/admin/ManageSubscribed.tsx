import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import baseUrl from "@/config/Config";

/* ---------------- COMPONENT ---------------- */
const SubscribedStudents = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  const fetchSubscribedStudents = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/subscribed-students`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json(); // 🔥 REQUIRED

    // console.log("API DATA 👉", data);

    if (data.success) {
      setStudents(data.data);
    }
  } catch (error) {
    console.error("API Error", error);
  }
};


  useEffect(() => {
    fetchSubscribedStudents();
  }, [filter, search]);

  /* ---------------- FILTER (PLAN) ---------------- */
  const filteredStudents = students.filter((s) => {
    return planFilter === "All" || s.plan === planFilter;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Enrolled Students</h1>

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
            {["All", "Active", ].map((item) => (
              <Button
                key={item}
                variant={filter === item ? "default" : "outline"}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}

            {/* <select
              className="border rounded-md px-3 py-2 bg-background"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option>All</option>
              <option>Monthly</option>
              <option>Yearly</option>
              <option>Lifetime</option>
            </select> */}
          </div>
        </div>

        {/* TABLE */}
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left">Student</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center">
                    No subscribed students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, index) => (
                  <tr key={index} className="border-t hover:bg-muted/40">
                    <td className="p-4">
                      <p className="font-medium">{s.studentName}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </td>

                    <td className="p-4 text-center">₹{s.amount}</td>

                    <td className="p-4 text-center">
                      <Badge
                        variant={s.payment === "Paid" ? "success" : "destructive"}
                      >
                        {s.payment}
                      </Badge>
                    </td>

                    <td className="p-4 text-center">
                      <Badge
                        variant={s.status === "Active" ? "default" : "secondary"}
                      >
                        {s.status}
                      </Badge>
                    </td>

                   

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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* VIEW MODAL */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-xl p-6 w-full max-w-lg space-y-4">
              <h2 className="text-xl font-semibold">
                {selectedStudent.studentName}
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Email:</b> {selectedStudent.email}</p>
                <p><b>Plan:</b> {selectedStudent.plan}</p>
                <p><b>Amount:</b> ₹{selectedStudent.amount}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SubscribedStudents;

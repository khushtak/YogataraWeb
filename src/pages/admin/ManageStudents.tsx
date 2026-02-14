import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import baseUrl from "@/config/Config";

/* ================= TYPES ================= */

interface Student {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  role: string;
  status: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ================= COMPONENT ================= */

const ManageStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      // console.log("FETCH STUDENTS RESPONSE 👉", data);

      setStudents(data.students);
    } catch (err) {
      toast({
        title: "Error",
        description: "Students load nahi hue ❌",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* ================= DELETE ================= */

const handleDelete = async (id: string) => {
  const email = students.find((s) => s._id === id)?.email;
// console.log('pp',email);

  try {

    const res = await fetch(`${baseUrl}/delete-user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
// console.log('sss',res);

    setStudents((prev) => prev.filter((s) => s.email !== email));

    toast({
      title: "Deleted",
      description: "Student deleted successfully ✅",
    });
  } catch {
    toast({
      title: "Error",
      description: "Failed to delete student ❌",
      variant: "destructive",
    });
  }
};


  /* ================= FILTER ================= */

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Students</h1>

        <div className="relative w-72">
          <Search className="absolute left-3 top-3 h-4 w-4" />
          <Input
            placeholder="Search student..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-x-auto">
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={student._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phoneNumber || "-"}</TableCell>
                  <TableCell>{student.location || "-"}</TableCell>
                  <TableCell>{student.role}</TableCell>
                  <TableCell>
                    <Badge>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={student.isVerified ? "default" : "secondary"}
                    >
                      {student.isVerified ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(student.createdAt).toLocaleString()}
                  </TableCell>
               
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(student._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageStudents;

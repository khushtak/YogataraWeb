"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import baseUrl from "@/config/Config";

export default function AddCategory() {
    const navigate=useNavigate()
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      alert("✅ Category added successfully");
      navigate("/admin/categories")
      setName("");
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Add Course Category</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4"
        >
          <div className="grid gap-1">
            <Label>Category Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tarot Reading"
            />
          </div>

          <Button disabled={loading} className="bg-violet-600 hover:bg-violet-700">
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import baseUrl from "@/config/Config";

type Category = {
  _id: string;
  name: string;
  slug: string;
  status: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useNavigate();

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.categories || []);
        setLoading(false);
      });
  }, []);

  return (
    <AdminLayout>
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Course Categories</h1>

          <Button
            onClick={() => router("/admin/add-category")}
            className="bg-violet-600 hover:bg-violet-700"
          >
            + Add Category
          </Button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3">Category</th>
                <th className="text-left px-6 py-3">Slug (Fixed ID)</th>
                <th className="text-left px-6 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6">
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 font-medium">
                      {cat.name}
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {cat.slug}
                    </td>
                    <td className="px-6 py-3">
                      <Badge
                        className={
                          cat.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {cat.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

import React from "react";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import baseUrl from "@/config/Config";
import { getToken } from "@/utils/auth";

interface CourseActionsMenuProps {
  courseId: string;
}

const CourseActionsMenu: React.FC<CourseActionsMenuProps> = ({ courseId }) => {
  const navigate = useNavigate();

  const handleEditCourse = () => {
    navigate(`/admin/courses/edit/${courseId}`);
  };

  const handleDeleteCourse = async () => {
    const token = getToken();

    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please login again",
        variant: "destructive",
      });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`${baseUrl}/delete-course/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Delete failed",
          description: data.message || "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Course deleted",
      });

      window.location.reload();
    } catch (err) {
      toast({
        title: "Server error",
        description: "Unable to delete course",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditCourse}>
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive"
          onClick={handleDeleteCourse}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsMenu;

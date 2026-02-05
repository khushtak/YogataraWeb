import React from 'react';
import { toast } from '@/components/ui/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '@/config/Config';
import { getToken } from '@/utils/auth';

interface CourseActionsMenuProps {
  courseId: string;
  status: string;
}

const CourseActionsMenu: React.FC<CourseActionsMenuProps> = ({ courseId }) => {
  const navigate = useNavigate();

  /* ================= DELETE COURSE ================= */
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

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${baseUrl}/delete-course/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
        title: "Course deleted ✅",
        description: "The course has been permanently removed.",
      });

      // optional: reload or redirect
      window.location.reload();

    } catch (error) {
      console.error("Delete course error:", error);
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
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center text-destructive"
          onClick={handleDeleteCourse}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsMenu;

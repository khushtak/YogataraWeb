
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
import { 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye, 
  Globe, 
  Copy, 
  Download 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CourseActionsMenuProps {
  courseId: string;
  status: string;
}

const CourseActionsMenu: React.FC<CourseActionsMenuProps> = ({ courseId, status }) => {
  const navigate = useNavigate();
  
  const handleEditCourse = () => {
    navigate(`/admin/courses/edit/${courseId}`);
  };
  
  const handleDeleteCourse = () => {
    // Show confirmation dialog in a real app
    toast({
      title: "Course deleted",
      description: "The course has been permanently removed."
    });
  };
  
  const handleViewCourse = () => {
    navigate(`/course/${courseId}`);
  };
  
  const handleDuplicateCourse = () => {
    toast({
      title: "Course duplicated",
      description: "A copy of the course has been created."
    });
  };
  
  const handleExportCourse = () => {
    toast({
      title: "Course exported",
      description: "The course data has been exported."
    });
  };
  
  const handleStatusToggle = () => {
    const newStatus = status === 'Published' ? 'Draft' : 'Published';
    toast({
      title: `Course ${newStatus === 'Published' ? 'published' : 'unpublished'}`,
      description: `The course is now ${newStatus.toLowerCase()}.`
    });
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
        <DropdownMenuItem className="flex items-center" onClick={handleViewCourse}>
          <Eye className="h-4 w-4 mr-2" />
          <span>View</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center" onClick={handleEditCourse}>
          <Pencil className="h-4 w-4 mr-2" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center" onClick={handleStatusToggle}>
          {status === 'Published' ? (
            <>
              <Eye className="h-4 w-4 mr-2 text-amber-500" />
              <span>Unpublish</span>
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-2 text-green-500" />
              <span>Publish</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center" onClick={handleDuplicateCourse}>
          <Copy className="h-4 w-4 mr-2" />
          <span>Duplicate</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center" onClick={handleExportCourse}>
          <Download className="h-4 w-4 mr-2" />
          <span>Export</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center text-destructive" onClick={handleDeleteCourse}>
          <Trash2 className="h-4 w-4 mr-2" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CourseActionsMenu;

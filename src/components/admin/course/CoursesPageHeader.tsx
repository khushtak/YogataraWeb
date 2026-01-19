
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CoursesPageHeader: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAddCourse = () => {
    navigate('/admin/courses/create');
  };
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <p className="text-muted-foreground mt-1">Create, edit and manage your course catalog</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button className="flex items-center" onClick={handleAddCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </div>
    </div>
  );
};

export default CoursesPageHeader;

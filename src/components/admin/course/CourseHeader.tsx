
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface CourseHeaderProps {
  handleSaveCourse: (status?: string) => void;
  handleDiscard: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  handleSaveCourse,
  handleDiscard
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-4"
          onClick={handleDiscard}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground mt-1">Add details to create a new course</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => handleSaveCourse('draft')}
        >
          Save as Draft
        </Button>
        <Button 
          onClick={() => handleSaveCourse('published')}
          className="flex items-center"
        >
          <Save className="h-4 w-4 mr-2" />
          Publish Course
        </Button>
      </div>
    </div>
  );
};

export default CourseHeader;


import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface CourseSelectionSectionProps {
  courses: Course[];
  selectedCourse: string;
  selectedSection: string;
  setSelectedCourse: (value: string) => void;
  setSelectedSection: (value: string) => void;
}

const CourseSelectionSection: React.FC<CourseSelectionSectionProps> = ({
  courses,
  selectedCourse,
  selectedSection,
  setSelectedCourse,
  setSelectedSection
}) => {
  // Filter sections based on selected course
  const availableSections = selectedCourse 
    ? courses.find(course => course.id.toString() === selectedCourse)?.sections || []
    : [];

  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="course">Course</Label>
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger id="course">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map(course => (
              <SelectItem key={course.id} value={course.id.toString()}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="section">Section (Optional)</Label>
        <Select 
          value={selectedSection} 
          onValueChange={setSelectedSection}
          disabled={!selectedCourse || availableSections.length === 0}
        >
          <SelectTrigger id="section">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Sections</SelectItem>
            {availableSections.map(section => (
              <SelectItem key={section.id} value={section.id.toString()}>
                {section.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default CourseSelectionSection;


import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface BasicFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  courses: Course[];
}

const BasicFilters: React.FC<BasicFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCourse,
  setSelectedCourse,
  selectedSection,
  setSelectedSection,
  courses,
}) => {
  const availableSections = selectedCourse === 'all' 
    ? [] 
    : courses.find(course => course.id.toString() === selectedCourse)?.sections || [];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search questions..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Select 
        value={selectedCourse} 
        onValueChange={setSelectedCourse}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Select Course" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Courses</SelectItem>
          {courses.map(course => (
            <SelectItem key={course.id} value={course.id.toString()}>
              {course.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select 
        value={selectedSection} 
        onValueChange={setSelectedSection}
        disabled={selectedCourse === 'all' || availableSections.length === 0}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Select Section" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sections</SelectItem>
          {availableSections.map(section => (
            <SelectItem key={section.id} value={section.id.toString()}>
              {section.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BasicFilters;

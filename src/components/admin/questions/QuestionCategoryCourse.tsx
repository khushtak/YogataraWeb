
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: number;
  title: string;
}

interface QuestionCategoryCourseProps {
  errors: any;
  setValue: (name: string, value: any) => void;
  watchCourseId: string;
  courses: Course[];
}

const QuestionCategoryCourse: React.FC<QuestionCategoryCourseProps> = ({
  errors,
  setValue,
  watchCourseId,
  courses
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="courseId" className={errors.courseId ? "text-destructive" : ""}>
        Course {errors.courseId && <span className="text-xs">({errors.courseId.message})</span>}
      </Label>
      <Select 
        value={watchCourseId} 
        onValueChange={(value) => {
          setValue("courseId", value);
          setValue("sectionId", ""); // Reset section when course changes
        }}
      >
        <SelectTrigger id="courseId" className={errors.courseId ? "border-destructive" : ""}>
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
  );
};

export default QuestionCategoryCourse;

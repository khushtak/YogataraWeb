
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Section {
  id: number;
  title: string;
}

interface QuestionSectionSelectProps {
  errors: any;
  setValue: (name: string, value: any) => void;
  currentCourseSections: Section[];
}

const QuestionSectionSelect: React.FC<QuestionSectionSelectProps> = ({
  errors,
  setValue,
  currentCourseSections
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="sectionId" className={errors.sectionId ? "text-destructive" : ""}>
        Section {errors.sectionId && <span className="text-xs">({errors.sectionId.message})</span>}
      </Label>
      <Select 
        onValueChange={(value) => setValue("sectionId", value)}
      >
        <SelectTrigger id="sectionId" className={errors.sectionId ? "border-destructive" : ""}>
          <SelectValue placeholder="Select section" />
        </SelectTrigger>
        <SelectContent>
          {currentCourseSections.map(section => (
            <SelectItem key={section.id} value={section.id.toString()}>
              {section.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default QuestionSectionSelect;

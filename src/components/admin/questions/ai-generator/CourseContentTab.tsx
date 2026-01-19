
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Settings } from 'lucide-react';
import DifficultyDistribution from './DifficultyDistribution';
import QuestionTypeSelector from './QuestionTypeSelector';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface CourseContentTabProps {
  courses: Course[];
  selectedCourse: string;
  setSelectedCourse: (value: string) => void;
  selectedSection: string;
  setSelectedSection: (value: string) => void;
  questionCount: string;
  setQuestionCount: (value: string) => void;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  updateDifficultyDistribution: (key: 'easy' | 'medium' | 'hard', value: number) => void;
  questionTypes: {
    multiplechoice: boolean;
    truefalse: boolean;
    essay: boolean;
    matching: boolean;
  };
  toggleQuestionType: (type: 'multiplechoice' | 'truefalse' | 'essay' | 'matching') => void;
}

const CourseContentTab: React.FC<CourseContentTabProps> = ({
  courses,
  selectedCourse,
  setSelectedCourse,
  selectedSection,
  setSelectedSection,
  questionCount,
  setQuestionCount,
  difficultyDistribution,
  updateDifficultyDistribution,
  questionTypes,
  toggleQuestionType
}) => {
  // Filter sections based on selected course
  const availableSections = selectedCourse 
    ? courses.find(course => course.id.toString() === selectedCourse)?.sections || []
    : [];

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="ai-course">Course</Label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger id="ai-course">
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
          <Label htmlFor="ai-section">Section (Optional)</Label>
          <Select 
            value={selectedSection} 
            onValueChange={setSelectedSection}
            disabled={!selectedCourse || availableSections.length === 0}
          >
            <SelectTrigger id="ai-section">
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
      </div>
      
      <div className="grid gap-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="ai-count">Number of Questions</Label>
          <Input 
            id="ai-count" 
            value={questionCount} 
            onChange={(e) => setQuestionCount(e.target.value)}
            className="w-20 text-right" 
            type="number" 
            min="1"
            max="50"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label className="flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Advanced Settings
        </Label>
        <div className="border rounded-md p-4 space-y-4">
          <DifficultyDistribution 
            difficultyDistribution={difficultyDistribution}
            updateDifficultyDistribution={updateDifficultyDistribution}
          />
          
          <QuestionTypeSelector 
            questionTypes={questionTypes}
            toggleQuestionType={toggleQuestionType}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContentTab;

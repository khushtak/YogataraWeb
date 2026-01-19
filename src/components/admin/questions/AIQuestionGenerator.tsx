
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles } from 'lucide-react';

// Import the new modular components
import CourseContentTab from './ai-generator/CourseContentTab';
import CustomPromptTab from './ai-generator/CustomPromptTab';
import GeneratedQuestionsPreview from './ai-generator/GeneratedQuestionsPreview';
import AIGeneratorFooter from './ai-generator/AIGeneratorFooter';
import { useAIGenerator } from './ai-generator/useAIGenerator';
import { Question } from '@/utils/data/types';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface AIQuestionGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: Course[];
  onGenerate: (questions: Question[]) => void;
}

const AIQuestionGenerator: React.FC<AIQuestionGeneratorProps> = ({ 
  open, 
  onOpenChange,
  courses,
  onGenerate
}) => {
  const {
    tab,
    setTab,
    selectedCourse,
    setSelectedCourse,
    selectedSection,
    setSelectedSection,
    questionCount,
    setQuestionCount,
    customPrompt,
    setCustomPrompt,
    uploading,
    generating,
    generatedQuestions,
    setGeneratedQuestions,
    difficultyDistribution,
    questionTypes,
    updateDifficultyDistribution,
    toggleQuestionType,
    handleGenerateQuestions,
    handleSaveQuestions
  } = useAIGenerator({
    courses,
    onGenerate,
    onOpenChange
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            AI Question Generator
          </DialogTitle>
          <DialogDescription>
            Automatically generate high-quality questions using AI based on your course content.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={tab} onValueChange={setTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="course-content">From Course Content</TabsTrigger>
            <TabsTrigger value="custom-prompt">Custom Prompt</TabsTrigger>
          </TabsList>
          
          <TabsContent value="course-content">
            <CourseContentTab
              courses={courses}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedSection={selectedSection}
              setSelectedSection={setSelectedSection}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              difficultyDistribution={difficultyDistribution}
              updateDifficultyDistribution={updateDifficultyDistribution}
              questionTypes={questionTypes}
              toggleQuestionType={toggleQuestionType}
            />
          </TabsContent>
          
          <TabsContent value="custom-prompt">
            <CustomPromptTab
              customPrompt={customPrompt}
              setCustomPrompt={setCustomPrompt}
            />
          </TabsContent>
        </Tabs>
        
        <GeneratedQuestionsPreview generatedQuestions={generatedQuestions} />
        
        <DialogFooter>
          <AIGeneratorFooter
            generatedQuestions={generatedQuestions}
            uploading={uploading}
            generating={generating}
            onOpenChange={onOpenChange}
            handleGenerateQuestions={handleGenerateQuestions}
            handleSaveQuestions={handleSaveQuestions}
            setGeneratedQuestions={setGeneratedQuestions}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIQuestionGenerator;

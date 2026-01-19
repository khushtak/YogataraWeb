
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Question } from '@/utils/data/types';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface GeneratedQuestion {
  question: string;
  type: string;
  difficulty: string;
  options?: {
    text: string;
    correct: boolean;
  }[];
}

interface UseAIGeneratorProps {
  courses: Course[];
  onGenerate: (questions: Question[]) => void;
  onOpenChange: (open: boolean) => void;
}

export const useAIGenerator = ({
  courses,
  onGenerate,
  onOpenChange
}: UseAIGeneratorProps) => {
  const [tab, setTab] = useState('course-content');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<string>('10');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [difficultyDistribution, setDifficultyDistribution] = useState({
    easy: 30,
    medium: 50,
    hard: 20
  });
  const [questionTypes, setQuestionTypes] = useState({
    multiplechoice: true,
    truefalse: true,
    essay: false,
    matching: false
  });

  const updateDifficultyDistribution = (key: 'easy' | 'medium' | 'hard', value: number) => {
    // Ensure total equals 100%
    const others = Object.entries(difficultyDistribution)
      .filter(([k]) => k !== key)
      .map(([k]) => k as 'easy' | 'medium' | 'hard');
    
    const remaining = 100 - value;
    const currentOthersTotal = others.reduce((acc, curr) => acc + difficultyDistribution[curr], 0);
    
    const newDistribution = { ...difficultyDistribution, [key]: value };
    
    if (currentOthersTotal > 0) {
      // Proportionally adjust other values
      others.forEach(otherKey => {
        const ratio = difficultyDistribution[otherKey] / currentOthersTotal;
        newDistribution[otherKey] = Math.round(remaining * ratio);
      });
      
      // Handle rounding errors to ensure total is exactly 100
      const total = Object.values(newDistribution).reduce((sum, val) => sum + val, 0);
      if (total !== 100) {
        newDistribution[others[0]] += (100 - total);
      }
    }
    
    setDifficultyDistribution(newDistribution);
  };

  const toggleQuestionType = (type: 'multiplechoice' | 'truefalse' | 'essay' | 'matching') => {
    setQuestionTypes({
      ...questionTypes,
      [type]: !questionTypes[type]
    });
  };

  const handleGenerateQuestions = async () => {
    if (tab === 'course-content' && !selectedCourse) {
      toast({
        title: "Course required",
        description: "Please select a course to generate questions for.",
        variant: "destructive"
      });
      return;
    }
    
    if (tab === 'custom-prompt' && !customPrompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a custom prompt to generate questions.",
        variant: "destructive"
      });
      return;
    }
    
    setGenerating(true);
    
    // Simulate generating questions with AI
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Example generated questions
    const mockGeneratedQuestions = [
      {
        question: "What is the significance of the 7th house in Vedic astrology?",
        type: "Multiple Choice",
        difficulty: "Medium",
        options: [
          { text: "Career and public image", correct: false },
          { text: "Marriage and partnerships", correct: true },
          { text: "Children and creativity", correct: false },
          { text: "Spirituality and liberation", correct: false }
        ]
      },
      {
        question: "The planet Jupiter (Guru) is considered the karaka for which of the following?",
        type: "Multiple Choice",
        difficulty: "Easy",
        options: [
          { text: "Education and wisdom", correct: true },
          { text: "Communication", correct: false },
          { text: "Discipline and hard work", correct: false },
          { text: "Luxury and comfort", correct: false }
        ]
      },
      {
        question: "The Nakshatras are divided into how many equal parts?",
        type: "Multiple Choice",
        difficulty: "Hard", 
        options: [
          { text: "9 parts", correct: false },
          { text: "12 parts", correct: false },
          { text: "27 parts", correct: true },
          { text: "30 parts", correct: false }
        ]
      }
    ];
    
    setGeneratedQuestions(mockGeneratedQuestions);
    setGenerating(false);
  };

  const handleSaveQuestions = async () => {
    if (generatedQuestions.length === 0) {
      toast({
        title: "No questions to save",
        description: "Please generate questions first before saving.",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate saving questions
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Find the course object
    const course = courses.find(c => c.id.toString() === selectedCourse);
    const section = selectedSection 
      ? course?.sections.find(s => s.id.toString() === selectedSection)
      : null;
    
    // Convert generated questions to the Question format
    const questions: Question[] = generatedQuestions.map((q, index) => ({
      id: Math.floor(Math.random() * 10000) + 100, // Generate random IDs
      question: q.question,
      type: q.type,
      difficulty: q.difficulty,
      category: 'Vedic Astrology',
      course: course?.title || 'Unknown Course',
      section: section?.title || 'General',
      usedIn: 0,
      hasImage: false
    }));
    
    // Call the handler
    onGenerate(questions);
    
    toast({
      title: "Questions saved",
      description: `${generatedQuestions.length} questions have been added to your question bank.`,
    });
    
    setUploading(false);
    onOpenChange(false);
    
    // Reset state
    setSelectedCourse('');
    setSelectedSection('');
    setCustomPrompt('');
    setGeneratedQuestions([]);
  };

  return {
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
  };
};

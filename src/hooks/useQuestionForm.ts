
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuestionSubmission } from './useQuestionSubmission';
import { useQuestionOptions } from './useQuestionOptions';
import { Question } from '@/utils/data/types';

// Define the validation schema
const questionFormSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  type: z.string().min(1, "Question type is required"),
  difficulty: z.string().min(1, "Difficulty level is required"),
  category: z.string().min(1, "Category is required"),
  courseId: z.string().min(1, "Course is required"),
  sectionId: z.string().optional(),
  explanation: z.string().optional(),
  addAnother: z.boolean().optional()
});

export type QuestionFormValues = z.infer<typeof questionFormSchema>;

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface UseQuestionFormProps {
  onOpenChange: (open: boolean) => void;
  courses: Course[];
  onAddQuestion?: (question: Question) => void;
}

export const useQuestionForm = ({ onOpenChange, courses, onAddQuestion }: UseQuestionFormProps) => {
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [questionImage, setQuestionImage] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    watch, 
    reset,
    formState: { errors, isSubmitting }
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      type: "multiplechoice",
      difficulty: "medium",
      category: "vedic",
      courseId: courses.length > 0 ? courses[0].id.toString() : "",
      sectionId: "",
      addAnother: false
    }
  });

  const questionType = watch("type");
  
  const {
    selectedOption,
    setSelectedOption,
    optionImages,
    optionTexts,
    handleAddOption,
    handleOptionImageChange,
    handleOptionTextChange,
    handleRemoveOption,
    resetOptions
  } = useQuestionOptions({ questionType });

  // Custom reset function that also resets our custom state
  const resetForm = () => {
    reset({
      questionText: "",
      type: watch("type"),
      difficulty: watch("difficulty"),
      category: watch("category"),
      courseId: watch("courseId"),
      sectionId: watch("sectionId"),
      explanation: "",
      addAnother: watch("addAnother")
    });
    setQuestionImage(null);
    resetOptions();
    setShowImageUploader(false);
  };

  // Custom submit handler that uses the onAddQuestion callback
  const customSubmitHandler = async (data: QuestionFormValues) => {
    // console.log("Options before submission:", optionTexts);
    // console.log("data", selectedOption);
    
  
    if (data.type === "multiplechoice" && selectedOption === -1) {
      return;
    }
  
    const course = courses.find(c => c.id.toString() === data.courseId);
    const section = course?.sections.find(s => s.id.toString() === data.sectionId);
  
    const newQuestion: Question = {
      id: Math.floor(Math.random() * 10000) + 100,
      question: data.questionText,
      type: data.type === 'multiplechoice' ? 'Multiple Choice' :
            data.type === 'truefalse' ? 'True/False' :
            data.type === 'essay' ? 'Essay' : 'Matching',
      difficulty: data.difficulty,
      category: data.category,
      course: course?.title || 'Unknown Course',
      courseId: data.courseId,
      section: section?.title || 'General',
      usedIn: 0,
      explanation: data.explanation,
      options: [...optionTexts],  // Ensure all options are passed
      selectedOption,
      hasImage: questionImage !== null
    };
  
    // console.log("Final question data:", newQuestion);
  
    if (onAddQuestion) {
      onAddQuestion(newQuestion);
    }
  
    if (!data.addAnother) {
      onOpenChange(false);
    }
  
    if (data.addAnother) {
      resetForm();
    }
  };
  

  const watchCourseId = watch("courseId");
  
  // Find the current course sections for the dropdown
  const currentCourseSections = courses.find(
    (course) => course.id.toString() === watchCourseId
  )?.sections || [];

  const handleOptionChange = (value: { 
    selectedOption: number; 
    optionImages: (string | null)[]; 
    optionTexts: string[]; 
  }) => {
    setSelectedOption(value.selectedOption);
  
    // Ensure all option texts are updated
    value.optionTexts.forEach((text, index) => {
      handleOptionTextChange(index, text);
    });
  
    // Ensure all option images are updated
    value.optionImages.forEach((image, index) => {
      handleOptionImageChange(index, image);
    });
  };
  

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    reset: resetForm,
    errors,
    isSubmitting,
    selectedOption,
    setSelectedOption,
    showImageUploader,
    setShowImageUploader,
    questionImage,
    setQuestionImage,
    optionImages,
    optionTexts,
    handleOptionChange,
    onSubmit: customSubmitHandler,
    currentCourseSections,
    watchCourseId,
    handleAddOption,
    handleOptionImageChange,
    handleOptionTextChange,
    handleRemoveOption
  };
};

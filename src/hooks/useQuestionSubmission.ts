
import { useToast } from '@/hooks/use-toast';
import { QuestionFormValues } from './useQuestionForm';

interface UseQuestionSubmissionProps {
  onOpenChange: (open: boolean) => void;
  reset: () => void;
  selectedOption: number;
  questionImage: string | null;
  optionImages: (string | null)[];
  optionTexts: string[];
}

export const useQuestionSubmission = ({
  onOpenChange,
  reset,
  selectedOption,
  questionImage,
  optionImages,
  optionTexts
}: UseQuestionSubmissionProps) => {
  const { toast } = useToast();
  
  const handleSubmit = async (data: QuestionFormValues) => {
    // Check if validation is required based on question type
    if (data.type === "multiplechoice" && selectedOption === -1) {
      toast({
        title: "Validation Error",
        description: "Please select a correct option for the multiple choice question.",
        variant: "destructive"
      });
      return;
    }
    
    // Construct the question data based on the question type
    let questionData;
    
    switch (data.type) {
      case "truefalse":
        questionData = {
          ...data,
          correctOption: selectedOption, // 0 for true, 1 for false
          questionImage,
          options: [
            { text: "True", isCorrect: selectedOption === 0 },
            { text: "False", isCorrect: selectedOption === 1 }
          ]
        };
        break;
        
      case "essay":
        questionData = {
          ...data,
          questionImage,
          // Essay questions don't have options or correct answers
          answerGuidelines: data.explanation || "Scoring guidelines for essay"
        };
        break;
        
      case "matching":
        questionData = {
          ...data,
          questionImage,
          matchingPairs: optionTexts.map((text, index) => ({
            leftItem: text,
            rightMatch: `Match ${index + 1}` // This would come from the UI
          }))
        };
        break;
        
      case "multiplechoice":
      default:
        questionData = {
          ...data,
          correctOption: selectedOption,
          questionImage,
          options: optionImages.map((image, index) => ({
            text: optionTexts[index] || "",
            image,
            isCorrect: index === selectedOption
          }))
        };
    }
    
    // console.log("Question submitted:", questionData);
    
    toast({
      title: "Success",
      description: "Question saved successfully"
    });
    
    if (!data.addAnother) {
      onOpenChange(false);
    }
    
    // Reset form if needed
    if (data.addAnother) {
      reset();
    }
  };

  return { handleSubmit };
};


import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import QuestionImageManager from './QuestionImageManager';

interface QuestionBasicDetailsProps {
  register: any;
  errors: any;
  questionImage: string | null;
  setQuestionImage: (image: string | null) => void;
  showImageUploader: boolean;
  setShowImageUploader: (show: boolean) => void;
}

const QuestionBasicDetails: React.FC<QuestionBasicDetailsProps> = ({
  register,
  errors,
  questionImage,
  setQuestionImage,
  showImageUploader,
  setShowImageUploader
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="questionText" className={errors.questionText ? "text-destructive" : ""}>
        Question Text {errors.questionText && <span className="text-xs">({errors.questionText.message})</span>}
      </Label>
      <Textarea 
        id="questionText" 
        placeholder="Enter your question here..." 
        {...register("questionText")}
        className={errors.questionText ? "border-destructive" : ""}
      />
      
      <QuestionImageManager
        showImageUploader={showImageUploader}
        setShowImageUploader={setShowImageUploader}
        questionImage={questionImage}
        setQuestionImage={setQuestionImage}
      />
    </div>
  );
};

export default QuestionBasicDetails;

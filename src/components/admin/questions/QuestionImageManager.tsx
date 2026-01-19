
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ImageIcon, X } from 'lucide-react';
import QuestionImageUploader from './QuestionImageUploader';

interface QuestionImageManagerProps {
  showImageUploader: boolean;
  setShowImageUploader: (show: boolean) => void;
  questionImage: string | null;
  setQuestionImage: (image: string | null) => void;
}

const QuestionImageManager: React.FC<QuestionImageManagerProps> = ({
  showImageUploader,
  setShowImageUploader,
  questionImage,
  setQuestionImage
}) => {
  if (!showImageUploader) {
    return (
      <Button 
        variant="outline" 
        type="button" 
        onClick={() => setShowImageUploader(true)}
        className="mt-2"
      >
        <ImageIcon className="mr-2 h-4 w-4" /> Add Image to Question
      </Button>
    );
  }

  return (
    <div className="mt-4 border rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <Label>Question Image</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowImageUploader(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <QuestionImageUploader 
        onImageSelected={(imageUrl) => setQuestionImage(imageUrl)} 
        imageSrc={questionImage}
      />
      {questionImage && (
        <div className="mt-2 text-sm text-muted-foreground">
          Image added successfully. Students will see this image with the question.
        </div>
      )}
    </div>
  );
};

export default QuestionImageManager;

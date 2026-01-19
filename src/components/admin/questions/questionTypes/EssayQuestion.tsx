
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EssayQuestionProps {
  onChange?: (guideline: string) => void;
  value?: string;
}

const EssayQuestion: React.FC<EssayQuestionProps> = ({ 
  onChange,
  value = ''
}) => {
  // Add debug log
  console.log("Rendering EssayQuestion component with value:", value);
  
  return (
    <div className="space-y-4 max-w-full">
      <Label>Essay Answer Guideline</Label>
      <Textarea 
        placeholder="Enter expected answer guidelines for scoring..." 
        className="w-full h-32"
        value={value}
        onChange={(e) => {
          console.log("EssayQuestion value changed:", e.target.value);
          onChange?.(e.target.value);
        }}
      />
      <p className="text-sm text-muted-foreground">
        This guideline will be used for scoring but won't be visible to students.
      </p>
    </div>
  );
};

export default EssayQuestion;

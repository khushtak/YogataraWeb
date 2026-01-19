
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface QuestionExplanationProps {
  register: any;
  setValue: (name: string, value: any) => void;
}

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({
  register,
  setValue
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea 
          id="explanation" 
          placeholder="Provide an explanation for the correct answer"
          {...register("explanation")}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="addAnother" 
          onCheckedChange={(checked) => {
            setValue("addAnother", checked === true);
          }}
        />
        <Label htmlFor="addAnother" className="text-sm font-normal">
          Add another question after saving
        </Label>
      </div>
    </>
  );
};

export default QuestionExplanation;

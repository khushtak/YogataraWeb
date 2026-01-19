
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TrueFalseQuestionProps {
  selectedOption: number;
  onChange: (index: number) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({ 
  selectedOption, 
  onChange
}) => {
  return (
    <div className="space-y-4 max-w-full">
      <Label>Correct Answer</Label>
      <RadioGroup 
        defaultValue={selectedOption === 0 ? "true" : "false"}
        onValueChange={(value) => onChange(value === "true" ? 0 : 1)}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="true" />
          <Label htmlFor="true">True</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="false" />
          <Label htmlFor="false">False</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TrueFalseQuestion;

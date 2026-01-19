
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, ImageIcon } from 'lucide-react';

interface MultipleChoiceQuestionProps {
  selectedOption: number;
  optionTexts: string[];
  optionImages: (string | null)[];
  onSelectOption: (index: number) => void;
  onOptionTextChange: (index: number, text: string) => void;
  onOptionImageChange: (index: number, image: string | null) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  selectedOption,
  optionTexts,
  optionImages,
  onSelectOption,
  onOptionTextChange,
  onOptionImageChange,
  onAddOption,
  onRemoveOption
}) => {
  return (
    <div className="space-y-4 max-w-full">
      <div className="mb-2">
        <Label className="text-sm font-medium">Select the correct answer by checking the option</Label>
      </div>
      {optionImages.map((image, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <Checkbox 
              id={`option-${index + 1}`} 
              checked={selectedOption === index}
              onCheckedChange={() => onSelectOption(index)}
            />
            <div className="flex-1 min-w-0">
              <Input 
                placeholder={`Option ${index + 1}`} 
                className="w-full"
                value={optionTexts[index] || ''}
                onChange={(e) => onOptionTextChange(index, e.target.value)} 
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              type="button"
              onClick={() => onRemoveOption(index)}
              disabled={optionImages.length <= 2}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {!image ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                onOptionImageChange(index, "https://example.com/sample.jpg");
              }}
            >
              <ImageIcon className="mr-2 h-4 w-4" /> Add Image to Option
            </Button>
          ) : (
            <div className="flex items-center gap-2 border p-2 rounded">
              <ImageIcon className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-sm truncate flex-1">Image attached</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onOptionImageChange(index, null)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full sm:w-auto"
        onClick={onAddOption}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Option
      </Button>
    </div>
  );
};

export default MultipleChoiceQuestion;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface MatchingQuestionProps {
  optionTexts: string[];
  optionImages: (string | null)[];
  onOptionTextChange: (index: number, text: string) => void;
  onAddOption: () => void;
  onRemoveOption: (index: number) => void;
}

const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  optionTexts,
  optionImages,
  onOptionTextChange,
  onAddOption,
  onRemoveOption
}) => {
  return (
    <div className="space-y-4 max-w-full">
      <Label>Matching Pairs</Label>
      {optionImages.map((_, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-2 border p-3 rounded">
          <div className="flex-1 min-w-0">
            <Label htmlFor={`left-${index}`} className="mb-1 block text-sm">Left Item</Label>
            <Input 
              id={`left-${index}`}
              placeholder={`Item ${index + 1}`} 
              className="w-full"
              value={optionTexts[index] || ''}
              onChange={(e) => onOptionTextChange(index, e.target.value)} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <Label htmlFor={`right-${index}`} className="mb-1 block text-sm">Right Match</Label>
            <Input 
              id={`right-${index}`}
              placeholder={`Match ${index + 1}`} 
              className="w-full"
            />
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            type="button"
            onClick={() => onRemoveOption(index)}
            disabled={optionImages.length <= 2}
            className="mt-1 sm:col-span-2 w-full justify-center"
          >
            <X className="h-4 w-4 mr-1" /> Remove Pair
          </Button>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full sm:w-auto"
        onClick={onAddOption}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Pair
      </Button>
    </div>
  );
};

export default MatchingQuestion;

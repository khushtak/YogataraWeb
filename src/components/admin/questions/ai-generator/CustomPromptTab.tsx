
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react';

interface CustomPromptTabProps {
  customPrompt: string;
  setCustomPrompt: (value: string) => void;
}

const CustomPromptTab: React.FC<CustomPromptTabProps> = ({
  customPrompt,
  setCustomPrompt
}) => {
  return (
    <div className="mt-4">
      <div className="grid gap-2">
        <Label htmlFor="custom-prompt">Custom Prompt</Label>
        <Textarea 
          id="custom-prompt" 
          placeholder="Write your custom prompt here. For example: 'Generate 10 multiple-choice questions about Vedic astrology focused on planetary transits and their effects.'"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={6}
        />
        <p className="text-sm text-muted-foreground">
          <Lightbulb className="h-4 w-4 inline-block mr-1" />
          For best results, be specific about the topic, difficulty level, and type of questions you want.
        </p>
      </div>
    </div>
  );
};

export default CustomPromptTab;

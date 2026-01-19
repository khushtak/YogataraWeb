
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface AIGeneratorFooterProps {
  generatedQuestions: any[];
  uploading: boolean;
  generating: boolean;
  onOpenChange: (open: boolean) => void;
  handleGenerateQuestions: () => Promise<void>;
  handleSaveQuestions: () => Promise<void>;
  setGeneratedQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const AIGeneratorFooter: React.FC<AIGeneratorFooterProps> = ({
  generatedQuestions,
  uploading,
  generating,
  onOpenChange,
  handleGenerateQuestions,
  handleSaveQuestions,
  setGeneratedQuestions
}) => {
  if (generatedQuestions.length > 0) {
    return (
      <div className="flex-col sm:flex-row gap-2 flex">
        <Button 
          variant="outline" 
          onClick={() => setGeneratedQuestions([])}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Regenerate
        </Button>
        <Button 
          onClick={handleSaveQuestions} 
          disabled={uploading}
          className="w-full sm:w-auto order-1 sm:order-2"
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>Save {generatedQuestions.length} Questions</>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-col sm:flex-row gap-2 flex">
      <Button 
        variant="outline" 
        onClick={() => onOpenChange(false)}
        className="w-full sm:w-auto"
      >
        Cancel
      </Button>
      <Button 
        onClick={handleGenerateQuestions} 
        disabled={generating}
        className="w-full sm:w-auto"
      >
        {generating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Questions
          </>
        )}
      </Button>
    </div>
  );
};

export default AIGeneratorFooter;

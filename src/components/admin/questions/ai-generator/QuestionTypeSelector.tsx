
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

interface QuestionTypeSelectorProps {
  questionTypes: {
    multiplechoice: boolean;
    truefalse: boolean;
    essay: boolean;
    matching: boolean;
  };
  toggleQuestionType: (type: 'multiplechoice' | 'truefalse' | 'essay' | 'matching') => void;
}

const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({
  questionTypes,
  toggleQuestionType
}) => {
  return (
    <div>
      <Label className="mb-2 block">Question Types</Label>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={questionTypes.multiplechoice ? "default" : "outline"} 
          size="sm"
          onClick={() => toggleQuestionType('multiplechoice')}
        >
          {questionTypes.multiplechoice && (
            <CheckCircle2 className="h-3 w-3 mr-1" />
          )}
          Multiple Choice
        </Button>
        <Button 
          variant={questionTypes.truefalse ? "default" : "outline"} 
          size="sm"
          onClick={() => toggleQuestionType('truefalse')}
        >
          {questionTypes.truefalse && (
            <CheckCircle2 className="h-3 w-3 mr-1" />
          )}
          True/False
        </Button>
        <Button 
          variant={questionTypes.essay ? "default" : "outline"} 
          size="sm"
          onClick={() => toggleQuestionType('essay')}
        >
          {questionTypes.essay && (
            <CheckCircle2 className="h-3 w-3 mr-1" />
          )}
          Essay
        </Button>
        <Button 
          variant={questionTypes.matching ? "default" : "outline"} 
          size="sm"
          onClick={() => toggleQuestionType('matching')}
        >
          {questionTypes.matching && (
            <CheckCircle2 className="h-3 w-3 mr-1" />
          )}
          Matching
        </Button>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;

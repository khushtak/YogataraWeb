
import React from 'react';

interface GeneratedQuestion {
  question: string;
  type: string;
  difficulty: string;
  options?: {
    text: string;
    correct: boolean;
  }[];
}

interface GeneratedQuestionsPreviewProps {
  generatedQuestions: GeneratedQuestion[];
}

const GeneratedQuestionsPreview: React.FC<GeneratedQuestionsPreviewProps> = ({ 
  generatedQuestions 
}) => {
  if (generatedQuestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border rounded-md p-4 max-h-60 overflow-y-auto">
      <h3 className="font-medium mb-2">Generated Questions Preview</h3>
      <div className="space-y-4">
        {generatedQuestions.map((q, i) => (
          <div key={i} className="border-b pb-2 last:border-b-0">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{i+1}. {q.question}</p>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{q.difficulty}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {q.type} • {q.options?.filter(o => o.correct).length || 0} correct answer(s)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedQuestionsPreview;

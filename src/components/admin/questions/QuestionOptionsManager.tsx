
import React from 'react';
import { useQuestionOptions } from '@/hooks/useQuestionOptions';
import EssayQuestion from './questionTypes/EssayQuestion';
import TrueFalseQuestion from './questionTypes/TrueFalseQuestion';
import MatchingQuestion from './questionTypes/MatchingQuestion';
import MultipleChoiceQuestion from './questionTypes/MultipleChoiceQuestion';

interface QuestionOptionsManagerProps {
  questionType: string;
  value?: {
    selectedOption: number;
    optionImages: (string | null)[];
    optionTexts?: string[];
  };
  onChange?: (value: {
    selectedOption: number;
    optionImages: (string | null)[];
    optionTexts: string[];
  }) => void;
}

const QuestionOptionsManager: React.FC<QuestionOptionsManagerProps> = ({
  questionType,
  value,
  onChange
}) => {
  const {
    selectedOption,
    setSelectedOption,
    optionImages,
    optionTexts,
    handleAddOption,
    handleOptionImageChange,
    handleOptionTextChange,
    handleRemoveOption
  } = useQuestionOptions({ initialOptions: questionType === 'truefalse' ? 2 : 4 });
  
  // Sync with external state if provided
  React.useEffect(() => {
    if (value && onChange) {
      onChange({
        selectedOption,
        optionImages,
        optionTexts
      });
    }
  }, [selectedOption, optionImages, optionTexts, onChange, value]);

  // Render the appropriate question type component
  if (questionType === 'essay') {
    return <EssayQuestion />;
  }

  if (questionType === 'truefalse') {
    return (
      <TrueFalseQuestion
        selectedOption={selectedOption}
        onChange={setSelectedOption}
      />
    );
  }

  if (questionType === 'matching') {
    return (
      <MatchingQuestion
        optionTexts={optionTexts}
        optionImages={optionImages}
        onOptionTextChange={handleOptionTextChange}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
      />
    );
  }

  // Default to multiple choice
  return (
    <MultipleChoiceQuestion
      selectedOption={selectedOption}
      optionTexts={optionTexts}
      optionImages={optionImages}
      onSelectOption={setSelectedOption}
      onOptionTextChange={handleOptionTextChange}
      onOptionImageChange={handleOptionImageChange}
      onAddOption={handleAddOption}
      onRemoveOption={handleRemoveOption}
    />
  );
};

export default QuestionOptionsManager;

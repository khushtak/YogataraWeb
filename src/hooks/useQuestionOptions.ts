
import { useState, useEffect } from 'react';

interface UseQuestionOptionsProps {
  initialOptions?: number;
  questionType?: string;
}

export const useQuestionOptions = ({ initialOptions = 4, questionType = 'multiplechoice' }: UseQuestionOptionsProps = {}) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionImages, setOptionImages] = useState<(string | null)[]>(Array(initialOptions).fill(null));
  const [optionTexts, setOptionTexts] = useState<string[]>(Array(initialOptions).fill(''));

  // Reset options when question type changes
  useEffect(() => {
    let optionsCount = initialOptions;
    
    if (questionType === 'truefalse') {
      optionsCount = 2;
    } else if (questionType === 'essay') {
      optionsCount = 0;
    } else if (questionType === 'matching' || questionType === 'multiplechoice') {
      optionsCount = 4;
    }
    
    resetOptions(optionsCount);
  }, [questionType, initialOptions]);

  const handleAddOption = () => {
    setOptionImages([...optionImages, null]);
    setOptionTexts([...optionTexts, '']);
  };

  const handleOptionImageChange = (index: number, image: string | null) => {
    const newOptionImages = [...optionImages];
    newOptionImages[index] = image;
    setOptionImages(newOptionImages);
  };

  const handleOptionTextChange = (index: number, text: string) => {
    setOptionTexts((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = text;
      return updatedOptions;
    });
  };
  

  const handleRemoveOption = (index: number) => {
    const newOptionImages = [...optionImages];
    newOptionImages.splice(index, 1);
    setOptionImages(newOptionImages);
    
    const newOptionTexts = [...optionTexts];
    newOptionTexts.splice(index, 1);
    setOptionTexts(newOptionTexts);
    
    // Adjust selectedOption if needed
    if (selectedOption === index) {
      setSelectedOption(0);
    } else if (selectedOption > index) {
      setSelectedOption(selectedOption - 1);
    }
  };

  const resetOptions = (optionsCount = initialOptions) => {
    setOptionImages(Array(optionsCount).fill(null));
    setOptionTexts(Array(optionsCount).fill(''));
    setSelectedOption(0);
  };

  return {
    selectedOption,
    setSelectedOption,
    optionImages,
    optionTexts,
    handleAddOption,
    handleOptionImageChange,
    handleOptionTextChange,
    handleRemoveOption,
    resetOptions
  };
};

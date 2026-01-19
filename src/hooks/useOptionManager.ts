
import { useState } from 'react';

export const useOptionManager = (initialOptions: number = 4) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionImages, setOptionImages] = useState<(string | null)[]>(Array(initialOptions).fill(null));

  const handleAddOption = () => {
    setOptionImages([...optionImages, null]);
  };

  const handleOptionImageChange = (index: number, image: string | null) => {
    const newOptionImages = [...optionImages];
    newOptionImages[index] = image;
    setOptionImages(newOptionImages);
  };

  const handleRemoveOption = (index: number) => {
    const newOptionImages = [...optionImages];
    newOptionImages.splice(index, 1);
    setOptionImages(newOptionImages);
    
    // Adjust selectedOption if needed
    if (selectedOption === index) {
      setSelectedOption(0);
    } else if (selectedOption > index) {
      setSelectedOption(selectedOption - 1);
    }
  };

  const resetOptions = () => {
    setOptionImages(Array(initialOptions).fill(null));
    setSelectedOption(0);
  };

  return {
    selectedOption,
    setSelectedOption,
    optionImages,
    setOptionImages,
    handleAddOption,
    handleOptionImageChange,
    handleRemoveOption,
    resetOptions
  };
};

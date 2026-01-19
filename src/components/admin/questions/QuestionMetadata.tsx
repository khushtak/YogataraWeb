
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuestionMetadataProps {
  errors: any;
  setValue: (name: string, value: any) => void;
}

const QuestionMetadata: React.FC<QuestionMetadataProps> = ({
  errors,
  setValue
}) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="type" className={errors.type ? "text-destructive" : ""}>
            Question Type {errors.type && <span className="text-xs">({errors.type.message})</span>}
          </Label>
          <Select 
            defaultValue="multiplechoice" 
            onValueChange={(value) => setValue("type", value)}
          >
            <SelectTrigger id="type" className={errors.type ? "border-destructive" : ""}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiplechoice">Multiple Choice</SelectItem>
              {/* <SelectItem value="truefalse">True/False</SelectItem>
              <SelectItem value="essay">Essay</SelectItem>
              <SelectItem value="matching">Matching</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="difficulty" className={errors.difficulty ? "text-destructive" : ""}>
            Difficulty Level {errors.difficulty && <span className="text-xs">({errors.difficulty.message})</span>}
          </Label>
          <Select 
            defaultValue="medium" 
            onValueChange={(value) => setValue("difficulty", value)}
          >
            <SelectTrigger id="difficulty" className={errors.difficulty ? "border-destructive" : ""}>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="category" className={errors.category ? "text-destructive" : ""}>
          Category {errors.category && <span className="text-xs">({errors.category.message})</span>}
        </Label>
        <Select 
          defaultValue="vedic" 
          onValueChange={(value) => setValue("category", value)}
        >
          <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vedic">Vedic Astrology</SelectItem>
            <SelectItem value="numerology">Numerology</SelectItem>
            <SelectItem value="tarot">Tarot Reading</SelectItem>
            <SelectItem value="palmistry">Palmistry</SelectItem>
            <SelectItem value="vaastu">Vaastu</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QuestionMetadata;

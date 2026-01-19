
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdvancedFilters: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="vedic">Vedic Astrology</SelectItem>
          <SelectItem value="numerology">Numerology</SelectItem>
          <SelectItem value="tarot">Tarot Reading</SelectItem>
          <SelectItem value="palmistry">Palmistry</SelectItem>
          <SelectItem value="vaastu">Vaastu</SelectItem>
        </SelectContent>
      </Select>
      
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Difficulties</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Question Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="multiple">Multiple Choice</SelectItem>
          <SelectItem value="truefalse">True/False</SelectItem>
          <SelectItem value="essay">Essay</SelectItem>
          <SelectItem value="matching">Matching</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AdvancedFilters;

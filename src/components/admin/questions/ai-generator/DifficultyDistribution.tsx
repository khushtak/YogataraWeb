
import React from 'react';
import { Label } from '@/components/ui/label';

interface DifficultyDistributionProps {
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  updateDifficultyDistribution: (key: 'easy' | 'medium' | 'hard', value: number) => void;
}

const DifficultyDistribution: React.FC<DifficultyDistributionProps> = ({
  difficultyDistribution,
  updateDifficultyDistribution
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label>Difficulty Distribution</Label>
        <span className="text-xs text-muted-foreground">Total: 100%</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="easy-slider" className="text-sm">Easy</Label>
          <span className="text-xs">{difficultyDistribution.easy}%</span>
        </div>
        <input 
          type="range" 
          id="easy-slider" 
          min="0" 
          max="100" 
          value={difficultyDistribution.easy}
          onChange={(e) => updateDifficultyDistribution('easy', parseInt(e.target.value))}
          className="w-full"
        />
        
        <div className="flex items-center justify-between">
          <Label htmlFor="medium-slider" className="text-sm">Medium</Label>
          <span className="text-xs">{difficultyDistribution.medium}%</span>
        </div>
        <input 
          type="range" 
          id="medium-slider" 
          min="0" 
          max="100" 
          value={difficultyDistribution.medium}
          onChange={(e) => updateDifficultyDistribution('medium', parseInt(e.target.value))}
          className="w-full"
        />
        
        <div className="flex items-center justify-between">
          <Label htmlFor="hard-slider" className="text-sm">Hard</Label>
          <span className="text-xs">{difficultyDistribution.hard}%</span>
        </div>
        <input 
          type="range" 
          id="hard-slider" 
          min="0" 
          max="100" 
          value={difficultyDistribution.hard}
          onChange={(e) => updateDifficultyDistribution('hard', parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DifficultyDistribution;

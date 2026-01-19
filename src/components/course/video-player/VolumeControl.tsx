
import React from 'react';
import { Volume2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface VolumeControlProps {
  volume: number;
  setVolume: (value: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, setVolume }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="text-white hover:text-primary transition" title="Volume">
          <Volume2 className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <Slider
          defaultValue={[volume]}
          max={100}
          step={1}
          onValueChange={(val) => setVolume(val[0])}
        />
      </PopoverContent>
    </Popover>
  );
};

export default VolumeControl;

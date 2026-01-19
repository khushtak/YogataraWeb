
import * as React from "react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

export interface CheckboxCustomProps {
  id: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const CheckboxCustom = ({
  id,
  label,
  checked,
  onCheckedChange,
}: CheckboxCustomProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onCheckedChange} 
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
};

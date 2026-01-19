
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormFooterProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const FormFooter: React.FC<FormFooterProps> = ({ 
  onCancel, 
  isSubmitting 
}) => {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Question"}
      </Button>
    </div>
  );
};

export default FormFooter;

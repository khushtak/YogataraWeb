
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';

interface TemplateDownloadSectionProps {
  onDownloadTemplate: () => void;
}

const TemplateDownloadSection: React.FC<TemplateDownloadSectionProps> = ({
  onDownloadTemplate
}) => {
  return (
    <div className="flex justify-between items-center">
      <Label>File Template</Label>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onDownloadTemplate}
        className="whitespace-nowrap"
      >
        <Download className="mr-2 h-4 w-4" /> Download Template
      </Button>
    </div>
  );
};

export default TemplateDownloadSection;

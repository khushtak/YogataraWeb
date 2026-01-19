
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface QuestionImageUploaderProps {
  onImageSelected: (imageUrl: string | null) => void;
  imageSrc: string | null;
}

const QuestionImageUploader: React.FC<QuestionImageUploaderProps> = ({ 
  onImageSelected, 
  imageSrc 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  const handleFileChange = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    onImageSelected(null);
  };
  
  if (imageSrc) {
    return (
      <div className="relative">
        <img 
          src={imageSrc} 
          alt="Question image" 
          className="w-full h-48 object-contain border rounded-md"
        />
        <Button
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleRemoveImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('image-upload')?.click()}
    >
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
      <p className="text-sm text-center text-muted-foreground mb-1">
        Drag and drop an image, or click to browse
      </p>
      <p className="text-xs text-center text-muted-foreground">
        Supports JPG, PNG and GIF files
      </p>
    </div>
  );
};

export default QuestionImageUploader;

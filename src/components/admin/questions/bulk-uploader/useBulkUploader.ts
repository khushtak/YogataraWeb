
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Question } from '@/utils/data/types';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface UseBulkUploaderProps {
  courses: Course[];
  onUpload: (questions: Question[]) => void;
  onOpenChange: (open: boolean) => void;
}

export const useBulkUploader = ({ courses, onUpload, onOpenChange }: UseBulkUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'validating' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownloadTemplate = () => {
    // In a real implementation, this would download a CSV template
    toast({
      title: "Template downloaded",
      description: "The CSV template has been downloaded to your device.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Validate file type (could be more sophisticated in a real implementation)
      if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
        setUploadStatus('error');
        setErrorMessage('Please upload a CSV or Excel file.');
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setUploadStatus('validating');
      
      // Simulate file validation
      setTimeout(() => {
        if (file.size > 5000000) { // Example validation: file too large
          setUploadStatus('error');
          setErrorMessage('File is too large. Maximum size is 5MB.');
        } else {
          setUploadStatus('success');
          setErrorMessage('');
        }
      }, 1000);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedCourse) {
      toast({
        title: "Course required",
        description: "Please select a course for these questions.",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate sample questions based on the selected course
    const course = courses.find(c => c.id.toString() === selectedCourse);
    const section = selectedSection 
      ? course?.sections.find(s => s.id.toString() === selectedSection)
      : null;
    
    // Simulate 10 imported questions
    const mockQuestions: Question[] = Array.from({length: 10}, (_, i) => ({
      id: Math.floor(Math.random() * 10000) + 100, // Generate random IDs
      question: `Imported question ${i+1} from ${selectedFile.name}`,
      type: i % 2 === 0 ? 'Multiple Choice' : 'True/False',
      difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
      category: 'Vedic Astrology',
      course: course?.title || '',
      section: section?.title || 'General',
      usedIn: 0,
      hasImage: false
    }));
    
    // Call the upload handler
    onUpload(mockQuestions);
    
    toast({
      title: "Questions uploaded",
      description: `${selectedFile.name} has been processed. ${mockQuestions.length} questions were added successfully.`,
    });
    
    setUploading(false);
    onOpenChange(false);
    
    // Reset state
    setSelectedFile(null);
    setSelectedCourse('');
    setSelectedSection('');
    setUploadStatus('idle');
  };

  return {
    selectedFile,
    selectedCourse,
    selectedSection,
    uploading,
    uploadStatus,
    errorMessage,
    setSelectedCourse,
    setSelectedSection,
    handleDownloadTemplate,
    handleFileChange,
    handleRemoveFile,
    handleUpload
  };
};

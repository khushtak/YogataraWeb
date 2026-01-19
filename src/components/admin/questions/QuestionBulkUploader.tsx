
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Question } from '@/utils/data/types';
import FileUploadArea from './bulk-uploader/FileUploadArea';
import CourseSelectionSection from './bulk-uploader/CourseSelectionSection';
import TemplateDownloadSection from './bulk-uploader/TemplateDownloadSection';
import { useBulkUploader } from './bulk-uploader/useBulkUploader';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface QuestionBulkUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: Course[];
  onUpload: (questions: Question[]) => void;
}

const QuestionBulkUploader: React.FC<QuestionBulkUploaderProps> = ({ 
  open, 
  onOpenChange,
  courses,
  onUpload
}) => {
  const {
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
  } = useBulkUploader({ courses, onUpload, onOpenChange });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Upload Questions</DialogTitle>
          <DialogDescription>
            Upload multiple questions at once using a CSV or Excel file.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <TemplateDownloadSection onDownloadTemplate={handleDownloadTemplate} />
          
          <CourseSelectionSection
            courses={courses}
            selectedCourse={selectedCourse}
            selectedSection={selectedSection}
            setSelectedCourse={setSelectedCourse}
            setSelectedSection={setSelectedSection}
          />
          
          <div className="grid gap-2">
            <Label>Upload File</Label>
            <FileUploadArea
              selectedFile={selectedFile}
              uploadStatus={uploadStatus}
              errorMessage={errorMessage}
              onFileChange={handleFileChange}
              onRemoveFile={handleRemoveFile}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={uploading || !selectedFile || uploadStatus !== 'success'}>
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                Uploading...
              </>
            ) : (
              <>Upload Questions</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionBulkUploader;

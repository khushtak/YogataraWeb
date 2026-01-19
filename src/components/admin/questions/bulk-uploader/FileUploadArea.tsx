
import React from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, X, FileText, AlertCircle, CheckCircle } from 'lucide-react';

interface FileUploadAreaProps {
  selectedFile: File | null;
  uploadStatus: 'idle' | 'validating' | 'error' | 'success';
  errorMessage: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  selectedFile,
  uploadStatus,
  errorMessage,
  onFileChange,
  onRemoveFile
}) => {
  if (!selectedFile) {
    return (
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
        <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop a CSV or Excel file, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          Supports CSV and Excel (XLSX) files up to 5MB
        </p>
        <input
          type="file"
          id="file-upload"
          accept=".csv,.xlsx"
          className="hidden"
          onChange={onFileChange}
        />
        <Button 
          variant="secondary" 
          className="mt-4"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          Select File
        </Button>
      </div>
    );
  }

  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-blue-500 mr-2" />
          <div>
            <p className="text-sm font-medium truncate max-w-[200px]">
              {selectedFile.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          {uploadStatus === 'validating' && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
          )}
          {uploadStatus === 'error' && (
            <AlertCircle className="h-4 w-4 text-destructive mr-2" />
          )}
          {uploadStatus === 'success' && (
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRemoveFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {uploadStatus === 'validating' && (
        <p className="text-xs text-muted-foreground mt-2">
          Validating file...
        </p>
      )}
      
      {uploadStatus === 'error' && (
        <p className="text-xs text-destructive mt-2">
          {errorMessage}
        </p>
      )}
      
      {uploadStatus === 'success' && (
        <p className="text-xs text-green-500 mt-2">
          File is ready to upload
        </p>
      )}
    </div>
  );
};

export default FileUploadArea;

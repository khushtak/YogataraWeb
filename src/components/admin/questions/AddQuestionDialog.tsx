
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import QuestionOptionsManager from './QuestionOptionsManager';

// Import components
import QuestionBasicDetails from './QuestionBasicDetails';
import QuestionMetadata from './QuestionMetadata';
import QuestionCategoryCourse from './QuestionCategoryCourse';
import QuestionSectionSelect from './QuestionSectionSelect';
import QuestionExplanation from './QuestionExplanation';
import FormFooter from './FormFooter';
import { useQuestionForm } from '@/hooks/useQuestionForm';
import { Question } from '@/utils/data/types';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface AddQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: Course[];
  onAddQuestion?: (question: Question) => void;
}

const AddQuestionDialog: React.FC<AddQuestionDialogProps> = ({ 
  open, 
  onOpenChange,
  courses,
  onAddQuestion
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    optionImages,
    optionTexts,
    selectedOption,
    handleOptionChange,
    showImageUploader,
    setShowImageUploader,
    questionImage,
    setQuestionImage,
    onSubmit: onFormSubmit,
    currentCourseSections,
    watchCourseId,
    watch
  } = useQuestionForm({ 
    onOpenChange, 
    courses,
    onAddQuestion
  });

  // Get the current question type
  const questionType = watch("type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogDescription>
            Create a new question for tests and assessments.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <QuestionBasicDetails 
              register={register} 
              errors={errors}
              questionImage={questionImage}
              setQuestionImage={setQuestionImage}
              showImageUploader={showImageUploader}
              setShowImageUploader={setShowImageUploader}
            />
            
            <QuestionMetadata 
              errors={errors} 
              setValue={setValue} 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <QuestionCategoryCourse 
                errors={errors} 
                setValue={setValue} 
                watchCourseId={watchCourseId}
                courses={courses} 
              />
              
              {/* <QuestionSectionSelect 
                errors={errors} 
                setValue={setValue} 
                currentCourseSections={currentCourseSections} 
              /> */}
            </div>
            
            <div className="grid gap-2">
              <QuestionOptionsManager 
                questionType={questionType}
                value={{
                  selectedOption,
                  optionImages,
                  optionTexts
                }}
                onChange={handleOptionChange}
              />
            </div>
            
            <QuestionExplanation 
              register={register} 
              setValue={setValue} 
            />
          </div>
          
          <FormFooter 
            onCancel={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
// import { ButtonCustom } from '@/components/ui/button-custom';
// import { Separator } from '@/components/ui/separator';
// import { Upload, FileText, CheckCircle2 } from 'lucide-react';
// import { toast } from '@/components/ui/use-toast';

// const AssignmentSubmissionForm = () => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const filesArray = Array.from(e.target.files);
//       setSelectedFiles(prev => [...prev, ...filesArray]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // Simulate submission
//     setTimeout(() => {
//       setSubmitting(false);
//       toast({
//         title: "Assignment submitted successfully",
//         description: "Your work has been submitted and is now pending review.",
//       });
//       navigate('/student/assignments');
//     }, 1500);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Submit Your Assignment </CardTitle>
//         <CardDescription>Upload your work below</CardDescription>
//       </CardHeader>
//       {/* <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-3">
//             <h3 className="text-lg font-medium">Upload Files</h3>
//             <p className="text-sm text-muted-foreground mb-2">
//               Upload your completed assignment. Accepted file types: PDF, DOCX, JPG, PNG.
//             </p>

//             <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
//               <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
//               <p className="text-sm text-muted-foreground mb-4">
//                 Drag and drop your files here, or click to browse
//               </p>
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="hidden"
//                 multiple
//                 onChange={handleFileChange}
//               />
//               <label htmlFor="file-upload">
//                 <ButtonCustom variant="outline" type="button" className="cursor-pointer">
//                   Choose Files
//                 </ButtonCustom>
//               </label>
//             </div>

//             {selectedFiles.length > 0 && (
//               <div className="mt-4 space-y-2">
//                 <h4 className="font-medium">Selected Files:</h4>
//                 <div className="border rounded-lg divide-y">
//                   {selectedFiles.map((file, index) => (
//                     <div key={index} className="flex items-center justify-between p-3">
//                       <div className="flex items-center">
//                         <FileText className="h-5 w-5 text-blue-500 mr-3" />
//                         <div>
//                           <p className="font-medium">{file.name}</p>
//                           <p className="text-xs text-muted-foreground">
//                             {(file.size / 1024).toFixed(2)} KB
//                           </p>
//                         </div>
//                       </div>
//                       <ButtonCustom
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeFile(index)}
//                         className="text-destructive hover:text-destructive/90"
//                       >
//                         Remove
//                       </ButtonCustom>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <Separator />

//           <div className="flex justify-end space-x-2">
//             <Link to="/student/assignments">
//               <ButtonCustom variant="outline" type="button">
//                 Cancel
//               </ButtonCustom>
//             </Link>
//             <ButtonCustom 
//               type="submit" 
//               disabled={selectedFiles.length === 0 || submitting}
//               className="min-w-[120px]"
//             >
//               {submitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   <CheckCircle2 className="h-4 w-4 mr-2" />
//                   Submit Assignment
//                 </>
//               )}
//             </ButtonCustom>
//           </div>
//         </form>
//       </CardContent> */}

//     </Card>
//   );
// };

// export default AssignmentSubmissionForm;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import baseUrl from "@/config/Config";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const MCQForm = ({ courseId }: { courseId: string }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= OPTION SELECT ================= */
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  /* ================= NEXT ================= */
  const handleNextQuestion = () => {
    if (
      selectedOption ===
      questions[currentQuestionIndex].correctAnswer
    ) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  /* ================= UPDATE SCORE ================= */
  useEffect(() => {
    if (showResult && questions.length > 0) {
      updateTestScore((score / questions.length) * 100);
    }
  }, [showResult]);

  const updateTestScore = async (percentage: number) => {
    try {
      await fetch(`${baseUrl}/update-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: "takkhush6@gmail.com",
          courseId,
          testId: courseId,
          score: percentage,
          totalMarks: 100,
        }),
      });
    } catch (err) {
      console.error("Progress update failed", err);
    }
  };

  /* ================= FORMAT API DATA ================= */
  const formatQuestionsData = (tests: any[]) => {
    return tests.flatMap(test =>
      test.questions.map((q: any) => ({
        question: q.questionText,
        options: q.options,
        correctAnswer: q.options[Number(q.correctOptionIndex)],
      }))
    );
  };

  /* ================= FETCH QUESTIONS ================= */
  const getQuestionsByCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}/get-questions/${courseId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      const formatted = formatQuestionsData(data.tests);
      setQuestions(formatted);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Questions load failed",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestionsByCourse();
  }, [courseId]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          Loading questions...
        </CardContent>
      </Card>
    );
  }

  /* ================= NO QUESTIONS ================= */
  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          No questions available
        </CardContent>
      </Card>
    );
  }

  /* ================= RESULT ================= */
  if (showResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Result</CardTitle>
          <CardDescription>Your performance</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Score: {score}/{questions.length}
          </h3>
          <ButtonCustom
            onClick={() => {
              setScore(0);
              setCurrentQuestionIndex(0);
              setSelectedOption(null);
              setShowResult(false);
            }}
          >
            Restart Quiz
          </ButtonCustom>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  /* ================= QUIZ UI ================= */
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1}
        </CardTitle>
        <CardDescription>
          {currentQuestion.question}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`flex items-center p-4 border rounded-lg cursor-pointer
                ${
                  selectedOption === option
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-muted/50"
                }`}
            >
              <span className="flex-1">{option}</span>
              {selectedOption === option && (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              )}
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="flex justify-end gap-2">
          <Link to="/student/assignments">
            <ButtonCustom variant="outline">Cancel</ButtonCustom>
          </Link>

          <ButtonCustom
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestionIndex < questions.length - 1 ? (
              <>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Finish <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            )}
          </ButtonCustom>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCQForm;

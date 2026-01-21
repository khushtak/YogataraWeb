
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
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import baseUrl from '@/config/Config';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const MCQForm = ({ courseId }: { courseId: string }) => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    setScore(prevScore =>
      selectedOption === questions[currentQuestionIndex].correctAnswer
        ? prevScore + 1
        : prevScore
    );

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    if (showResult) {
      // console.log("Final Score:", score);
      // console.log("Final Percentage:", (score / questions.length) * 100);
      updateTestScore((score / questions.length) * 100);
    }
  }, [showResult, score]); // Runs only when `showResult` or `score` updates



  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
  };

  const updateTestScore = async (score: number) => {
    try {
      const response = await fetch(`${baseUrl}/update-progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: "sayanmyself50@gmail.com",
          courseId: courseId,
          testId: courseId,
          score: score,
          totalMarks: 100,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update progress");
      }

      // console.log("Progress updated:", data);
      return data;
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };


  useEffect(() => {

    getQuestionsByCourse(courseId);

  }, [])


  const formatQuestionsData = (data: any[]) => {
    return data.flatMap(test =>
      test.questions.map((q: any) => ({
        question: q.questionText,
        options: q.options,
        correctAnswer: q.options[Number(q.correctOptionIndex)], // Extract correct answer
      }))
    );
  };

  const getQuestionsByCourse = async (courseId: string) => {
    try {
      const response = await fetch(`${baseUrl}/get-questions/${courseId}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch questions",
          });
        }
        throw new Error(data.message || "Failed to fetch questions");
      }

      // console.log(data.tests);



      const questions = formatQuestionsData(data.tests);

      // console.log(questions);
      setQuestions(questions);

      return formatQuestionsData(data.tests); // Format data before returning
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };


  if (showResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Result</CardTitle>
          <CardDescription>Your performance summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Your Score: {score}/{questions.length}</h3>
            <ButtonCustom onClick={handleRestart} className="mt-4">
              Restart Quiz
            </ButtonCustom>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions && questions[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
        <CardDescription>{currentQuestion?.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center p-4 border rounded-lg cursor-pointer ${selectedOption === option
                  ? 'bg-primary/10 border-primary'
                  : 'bg-background hover:bg-muted/50'
                  }`}
                onClick={() => handleOptionSelect(option)}
              >
                <div className="flex-1">
                  <p className="font-medium">{option}</p>
                </div>
                {selectedOption === option && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-end space-x-2">
            <Link to="/student/assignments">
              <ButtonCustom variant="outline" type="button">
                Cancel
              </ButtonCustom>
            </Link>
            <ButtonCustom
              type="button"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
              className="min-w-[120px]"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Finish <CheckCircle2 className="h-4 w-4 ml-2" />
                </>
              )}
            </ButtonCustom>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MCQForm;
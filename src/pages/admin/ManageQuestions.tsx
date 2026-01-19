
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload as UploadIcon, Download, Sparkles } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import QuestionBulkUploader from '@/components/admin/questions/QuestionBulkUploader';
import AIQuestionGenerator from '@/components/admin/questions/AIQuestionGenerator';
import QuestionFilters from '@/components/admin/questions/QuestionFilters';
import QuestionsTable from '@/components/admin/questions/QuestionsTable';
import AddQuestionDialog from '@/components/admin/questions/AddQuestionDialog';
import { getQuestions, getCoursesList } from '@/utils/dataUtils';
import { Question } from '@/utils/data/types';
import baseUrl from '@/config/Config';

// Define the admin course type to match the components expectations
interface AdminCourse {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

const ManageQuestions = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openBulkUploader, setOpenBulkUploader] = useState(false);
  const [openAIGenerator, setOpenAIGenerator] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSection, setSelectedSection] = useState('all');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  // Get questions and apply filters
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);

  // Map our Course type to Admin Course type
  const [courses, setCourses] = useState<AdminCourse[]>(() => {
    const coursesList = getCoursesList();
    return coursesList.map(course => ({
      id: parseInt(course.id),
      title: course.title,
      sections: course.sections || []
    }));
  });

  const transformQuestions = (questions: any[], courseName: string) => {
    return questions.map((q, index) => ({
      id: index + 1,
      question: q.questionText,
      type: "Multiple Choice",
      difficulty: "Medium",
      category: "General",
      course: courseName, // Use the fetched course name
      section: "Basics",
      usedIn: 1,
      hasImage: false,
    }));
  };

  const getAllQuestions = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-all-questions`);
      const data = await response.json();

      if (data.success) {
        // console.log("Raw Data:", data.questions);

        // Extract course IDs and questions
        const courseQuestionMap = data.questions.map((test: any) => ({
          courseId: test.courseId,
          questions: test.questions,
        }));

        let allFormattedQuestions: any[] = [];

        // Fetch course names for each courseId and transform questions
        for (const { courseId, questions } of courseQuestionMap) {
          const courseData = await getCourseById(courseId);
          const courseName = courseData?.courseName || "Unknown Course";

          const formattedQuestions = transformQuestions(questions, courseName);
          allFormattedQuestions.push(...formattedQuestions);
        }

        setAllQuestions(allFormattedQuestions);
        return allFormattedQuestions;
      } else {
        console.error("Failed to fetch questions:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };

  const getCourseById = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/get-course/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch course");
      }

      const course = await response.json();
      return course;
    } catch (error) {
      console.error("Error fetching course:", error);
      return null;
    }
  };


  const getAllCourses = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      // console.log(data);

      const formattedCourses = data.map((course) => ({
        id: course.courseId || course._id,
        title: course.courseName,
        sections: course.section || []
      }));

      setCourses(formattedCourses);
    } catch (error) {
      console.error("Error retrieving courses:", error);
    }
  };


  useEffect(() => {
    getAllQuestions();
    getAllCourses();

  }, [])

  // Apply filters whenever search term, course, section, or tab changes
  useEffect(() => {
    let filtered = allQuestions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply course filter
    if (selectedCourse !== 'all') {
      filtered = filtered.filter(q => {
        // Find the course by id
        const course = courses.find(c => c.id.toString() === selectedCourse);
        // Match course title
        return course && q.course === course.title;
      });
    }

    // Apply section filter if a course is selected
    if (selectedCourse !== 'all' && selectedSection !== 'all') {
      filtered = filtered.filter(q => {
        // Find the course and section
        const course = courses.find(c => c.id.toString() === selectedCourse);
        const section = course?.sections.find(s => s.id.toString() === selectedSection);
        // Match section title
        return section && q.section === section.title;
      });
    }

    // Filter by tab/question type
    if (selectedTab !== 'all') {
      if (selectedTab === 'multiplechoice') {
        filtered = filtered.filter(q => q.type === 'Multiple Choice');
      } else if (selectedTab === 'truefalse') {
        filtered = filtered.filter(q => q.type === 'True/False');
      } else if (selectedTab === 'essay') {
        filtered = filtered.filter(q => q.type === 'Essay');
      } else if (selectedTab === 'matching') {
        filtered = filtered.filter(q => q.type === 'Matching');
      } else if (selectedTab === 'withimage') {
        filtered = filtered.filter(q => q.hasImage);
      }
    }

    setFilteredQuestions(filtered);
  }, [searchTerm, selectedCourse, selectedSection, selectedTab, allQuestions, courses]);

  const handleExportQuestions = () => {
    toast({
      title: "Questions exported",
      description: "All questions have been exported to CSV format.",
    });
  };

  const handleAddQuestion = (newQuestion: Question) => {
    // Add a new question to the list
    const updatedQuestions = [...allQuestions, newQuestion];
    setAllQuestions(updatedQuestions);
    toast({
      title: "Question added",
      description: "The new question has been added successfully.",
    });
    // console.log("New question added:", newQuestion.courseId, [
    //   {
    //     questionId: newQuestion.id,
    //     questionText: newQuestion.question,
    //     options: newQuestion.options,
    //     correctOptionIndex: newQuestion.selectedOption,
    //   }
    // ]);
    addQuestions(newQuestion.courseId, [
      {
        questionId: newQuestion.id,
        questionText: newQuestion.question,
        options: newQuestion.options,
        correctOptionIndex: newQuestion.selectedOption,
      }
    ]);

  };

  const handleDeleteQuestion = (id: number) => {
    // Remove the question with the given id
    const updatedQuestions = allQuestions.filter(q => q.id !== id);
    setAllQuestions(updatedQuestions);
    toast({
      title: "Question deleted",
      description: `Question #${id} has been removed.`,
    });
  };

  const handleBulkUpload = (questions: Question[]) => {
    // Add multiple questions at once
    const updatedQuestions = [...allQuestions, ...questions];
    setAllQuestions(updatedQuestions);
    toast({
      title: "Questions uploaded",
      description: `${questions.length} questions were added successfully.`,
    });
  };

  const handleAIGenerate = (questions: Question[]) => {
    // Add AI generated questions
    const updatedQuestions = [...allQuestions, ...questions];
    setAllQuestions(updatedQuestions);
    toast({
      title: "Questions generated",
      description: `${questions.length} questions were generated and added successfully.`,
    });
  };

  const generateId = (name: string): string => {
    const initials = name
      .split(" ")
      .map(word => word[0].toUpperCase())
      .join("");

    const randomNumber = Math.floor(Math.random() * 90) + 10; // Generates a random number between 10-99

    return `${initials}${randomNumber}`;
  };

  const addQuestions = async (courseId: string, questions: any) => {
    try {
      // const testId = generateId(courseId);
      const response = await fetch(`${baseUrl}/add-questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, testId: courseId, questions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add questions");
      }

      console.log("Questions added successfully:", data);
      return data; // Return response for further use
    } catch (error) {
      console.error("Error adding questions:", error);
      return null;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Manage Questions</h1>
        <div className="flex flex-wrap items-center gap-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenBulkUploader(true)}
          >
            <UploadIcon className="mr-2 h-4 w-4" /> Bulk Upload
          </Button> */}
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setOpenAIGenerator(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" /> AI Generate
          </Button> */}
          {/* <Button
            variant="outline"
            size="sm"
            onClick={handleExportQuestions}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button> */}
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Question
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <QuestionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          filtersExpanded={filtersExpanded}
          setFiltersExpanded={setFiltersExpanded}
          courses={courses}
        />

        <div className="overflow-x-auto">
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="mb-4 flex flex-wrap gap-2">
              <TabsTrigger value="all">All Questions</TabsTrigger>
              <TabsTrigger value="multiplechoice">Multiple Choice</TabsTrigger>
              <TabsTrigger value="truefalse">True/False</TabsTrigger>
              <TabsTrigger value="essay">Essay</TabsTrigger>
              <TabsTrigger value="matching">Matching</TabsTrigger>
              <TabsTrigger value="withimage">With Images</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className="overflow-hidden">
                <QuestionsTable
                  questions={filteredQuestions}
                  onDelete={handleDeleteQuestion}
                />
              </Card>
            </TabsContent>

            <TabsContent value="multiplechoice">
              <Card className="overflow-hidden">
                <QuestionsTable
                  questions={filteredQuestions}
                  onDelete={handleDeleteQuestion}
                />
              </Card>
            </TabsContent>

            <TabsContent value="truefalse">
              <Card className="overflow-hidden">
                <QuestionsTable
                  questions={filteredQuestions}
                  onDelete={handleDeleteQuestion}
                />
              </Card>
            </TabsContent>

            <TabsContent value="essay">
              <Card className="overflow-hidden">
                <QuestionsTable
                  questions={filteredQuestions}
                  onDelete={handleDeleteQuestion}
                />
              </Card>
            </TabsContent>

            <TabsContent value="matching">
              <Card className="overflow-hidden">
                <QuestionsTable
                  questions={filteredQuestions}
                  onDelete={handleDeleteQuestion}
                />
              </Card>
            </TabsContent>

            <TabsContent value="withimage">
              <Card className="overflow-hidden">
                <QuestionsTable
                  questions={filteredQuestions}
                  onDelete={handleDeleteQuestion}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {open && (
        <AddQuestionDialog
          open={open}
          onOpenChange={setOpen}
          courses={courses}
          onAddQuestion={handleAddQuestion}
        />
      )}

      {openBulkUploader && (
        <QuestionBulkUploader
          open={openBulkUploader}
          onOpenChange={setOpenBulkUploader}
          courses={courses}
          onUpload={handleBulkUpload}
        />
      )}

      {openAIGenerator && (
        <AIQuestionGenerator
          open={openAIGenerator}
          onOpenChange={setOpenAIGenerator}
          courses={courses}
          onGenerate={handleAIGenerate}
        />
      )}
    </AdminLayout>
  );
};

export default ManageQuestions;

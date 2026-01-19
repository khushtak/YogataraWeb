
import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { BarChart, BookOpen, PieChart, TrendingUp } from 'lucide-react';
import GradeSummaryCard from '@/components/student/grades/GradeSummaryCard';
import CourseGradesList from '@/components/student/grades/CourseGradesList';
import CourseGradeDetails from '@/components/student/grades/CourseGradeDetails';
import GradeStatistics, { GradeData } from '@/components/student/grades/GradeStatistics';
import { 
  getGradeStatistics,
  getStudentCourseGrades,
  getGradeDistributionForChart,
  getRecentGradesForChart
} from '@/utils/data/gradesUtils';
import baseUrl from '@/config/Config';

const StudentGrades = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get grade data from our utilities
  const stats = getGradeStatistics("student-1"); // Using a default student ID
  // const courseGrades = getStudentCourseGrades("student-1");
  const [courseGrades, setCourseGrades] = useState([])
  const selectedCourse = "Introduction to React"; // This would come from state in a real app
  
  // Mock data for the currently selected course details
  const courseDetails = {
    instructor: "John Doe, PhD",
    assignments: [
      { title: "Quiz 1", type: "Quiz", grade: "90", maxGrade: "100", status: "Completed" },
      { title: "Project 1", type: "Project", grade: "85", maxGrade: "100", status: "Completed" },
      { title: "Homework 1", type: "Homework", grade: "92", maxGrade: "100", status: "Completed" },
      { title: "Quiz 2", type: "Quiz", grade: "88", maxGrade: "100", status: "Completed" },
      { title: "Mid-term Exam", type: "Exam", grade: "78", maxGrade: "100", status: "Completed" },
      { title: "Project 2", type: "Project", grade: "94", maxGrade: "100", status: "In Progress" }
    ]
  };
  
  // Transform data for the charts
  const gradeDistributionData: GradeData[] = getGradeDistributionForChart();
  const performanceTrendData: GradeData[] = getRecentGradesForChart();

  // Calculate weighted course grade for display
  const weightedGrade = "88.5";

  useEffect(() => {
    getUserProgress("sayanmyself50@gmail.com")
  
  }, [])
  

  const getUserProgress = async (userEmail: string) => {
    try {
      const response = await fetch(`${baseUrl}/user-progress/${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      console.log("User progress fetched successfully:", data);
      
      // return transformedData;
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Grades</h1>
          <p className="text-muted-foreground">Track your academic performance</p>
        </div>

        {/* Overall Grade Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GradeSummaryCard 
            title="Current GPA" 
            value={stats.gpa.toString()} 
            icon={TrendingUp} 
            iconColor="bg-primary/10 text-primary" 
          />
          
          <GradeSummaryCard 
            title="Average Grade" 
            value={stats.averageGrade.toString()} 
            icon={BarChart} 
            iconColor="bg-green-500/10 text-green-500" 
          />
          
          <GradeSummaryCard 
            title="Courses Completed" 
            value={stats.coursesCompleted.toString()} 
            icon={BookOpen} 
            iconColor="bg-blue-500/10 text-blue-500" 
          />
          
          <GradeSummaryCard 
            title="Grade Distribution" 
            value={`A: ${stats.gradeDistribution[0].count}, B: ${stats.gradeDistribution[1].count}`} 
            icon={PieChart} 
            iconColor="bg-amber-500/10 text-amber-500" 
          />
        </div>

        {/* Main content section */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Course grades list */}
          <div className="lg:col-span-5">
            <CourseGradesList courseGrades={courseGrades} />
          </div>

          {/* Detailed course view */}
          <div className="lg:col-span-7 space-y-6">
            <CourseGradeDetails 
              courseTitle={selectedCourse}
              instructor={courseDetails.instructor}
              overallGrade={`${weightedGrade}% (A)`}
              assignments={courseDetails.assignments}
            />
            
            <div className="grid gap-6 md:grid-cols-2">
              <GradeStatistics 
                title="Grade Distribution" 
                chartType="pie"
                data={gradeDistributionData} 
              />
              <GradeStatistics 
                title="Performance Trend" 
                chartType="line"
                data={performanceTrendData} 
              />
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentGrades;

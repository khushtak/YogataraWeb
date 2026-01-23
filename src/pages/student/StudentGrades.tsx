import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { BarChart, BookOpen, PieChart, TrendingUp } from 'lucide-react';
import GradeSummaryCard from '@/components/student/grades/GradeSummaryCard';
import CourseGradesList from '@/components/student/grades/CourseGradesList';
import CourseGradeDetails from '@/components/student/grades/CourseGradeDetails';
import GradeStatistics, { GradeData } from '@/components/student/grades/GradeStatistics';

const StudentGrades = () => {
  // COURSE LIST - empty for fresh student
  const [courseGrades, setCourseGrades] = useState([]);

  // SUMMARY CARDS DATA
  const stats = {
    gpa: 0,
    averageGrade: 0,
    coursesCompleted: 0,
    gradeDistribution: [
      { grade: 'A', count: 0 },
      { grade: 'B', count: 0 }
    ]
  };

  // SELECTED COURSE DETAILS
  const selectedCourse = 'Introduction to React';
  const courseDetails = {
    instructor: 'John Doe, PhD',
    overallGrade: '0% (N/A)',
    assignments: [
      { title: 'Quiz 1', type: 'Quiz', grade: '0', maxGrade: '100', status: 'Not Attempted' },
      { title: 'Project 1', type: 'Project', grade: '0', maxGrade: '100', status: 'Not Attempted' },
      { title: 'Homework 1', type: 'Homework', grade: '0', maxGrade: '100', status: 'Not Attempted' },
      { title: 'Quiz 2', type: 'Quiz', grade: '0', maxGrade: '100', status: 'Not Attempted' },
      { title: 'Mid-term Exam', type: 'Exam', grade: '0', maxGrade: '100', status: 'Not Attempted' },
      { title: 'Project 2', type: 'Project', grade: '0', maxGrade: '100', status: 'Not Attempted' }
    ]
  };

  // CHART DATA
  const gradeDistributionData: GradeData[] = [
    { label: 'A', value: 0 },
    { label: 'B', value: 0 },
    { label: 'C', value: 0 },
    { label: 'D', value: 0 },
    { label: 'F', value: 0 }
  ];
  const performanceTrendData: GradeData[] = []; // empty for fresh student

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-4 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold mb-1">My Grades</h1>
          <p className="text-muted-foreground">
            Track your academic performance
          </p>
        </div>

        {/* SUMMARY CARDS */}
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

        {/* MAIN CONTENT */}
        <div className="grid gap-6 lg:grid-cols-12 items-start">

          {/* LEFT: COURSE LIST */}
          <div className="lg:col-span-4">
            <CourseGradesList courseGrades={courseGrades} />
          </div>

          {/* RIGHT: DETAILS + CHARTS */}
          <div className="lg:col-span-8 space-y-6">
            <CourseGradeDetails
              courseTitle={selectedCourse}
              instructor={courseDetails.instructor}
              overallGrade={courseDetails.overallGrade}
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

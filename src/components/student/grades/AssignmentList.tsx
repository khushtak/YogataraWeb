
import React from 'react';

interface Assignment {
  name: string;
  grade: number;
  maxGrade: number;
  weight: number;
}

interface AssignmentListProps {
  assignments: Assignment[];
}

// Helper function to determine color based on grade
const getGradeColor = (grade: number) => {
  if (grade >= 90) return 'text-green-500';
  if (grade >= 80) return 'text-blue-500';
  if (grade >= 70) return 'text-yellow-500';
  if (grade >= 60) return 'text-orange-500';
  return 'text-red-500';
};

const AssignmentList = ({ assignments }: AssignmentListProps) => {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b">
          <th className="text-left py-2 font-medium">Assignment</th>
          <th className="text-right py-2 font-medium">Grade</th>
          <th className="text-right py-2 font-medium">Weight</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment, index) => (
          <tr key={index} className="border-b border-border/40">
            <td className="py-2">{assignment.name}</td>
            <td className="text-right py-2">
              <span className={getGradeColor(assignment.grade)}>
                {assignment.grade}/{assignment.maxGrade}
              </span>
            </td>
            <td className="text-right py-2">{assignment.weight}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AssignmentList;


import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, FileText, Clock } from 'lucide-react';

interface AssignmentHeaderProps {
  assignment: {
    title: string;
    course: string;
    dueDate: string;
    points: number;
    timeLimit?: number;
    type?: string;
  };
}

const AssignmentHeader = ({ assignment }: AssignmentHeaderProps) => {
  return (
    <div>
      <Link to="/student/assignments" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-flex items-center">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Assignments
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {assignment.course}
            </Badge>
            {assignment.type && (
              <Badge className="capitalize" variant="default">
                {assignment.type}
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-1">{assignment.title}</h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mt-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-primary" />
              <span>Due: {assignment.dueDate}</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1 text-blue-500" />
              <span>{assignment.points} points</span>
            </div>
            {assignment.timeLimit && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-amber-500" />
                <span>{assignment.timeLimit} minute time limit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentHeader;

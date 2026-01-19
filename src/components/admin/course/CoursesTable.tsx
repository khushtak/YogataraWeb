
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, DollarSign, Clock, Users } from 'lucide-react';
import CourseActionsMenu from './CourseActionsMenu';

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
  price: number;
  status: string;
  lastUpdated: string;
}

interface CoursesTableProps {
  courses: Course[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">
              <div className="flex items-center">
                Course
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Instructor
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Students
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Price
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Last Updated
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-primary/10">
                  {course.category}
                </Badge>
              </TableCell>
              <TableCell>{course.students.toLocaleString()}</TableCell>
              <TableCell>${course.price.toFixed(2)}</TableCell>
              <TableCell>{course.lastUpdated}</TableCell>
              <TableCell>
                <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </TableCell>
              <TableCell>
                <CourseActionsMenu courseId={course.id} status={course.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoursesTable;

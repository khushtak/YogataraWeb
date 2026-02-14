import React from "react";
import CourseActionsMenu from "./CourseActionsMenu";

interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
  price: number;
  status: string;
}

interface CoursesTableProps {
  courses: Course[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ courses }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Instructor</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b hover:bg-muted">
              <td className="p-3">{course.title}</td>
              <td className="p-3 text-center">{course.instructor}</td>
              <td className="p-3 text-center">{course.category}</td>
              <td className="p-3 text-center">₹{course.price}</td>
              <td className="p-3 text-center">{course.status}</td>
              <td className="p-3 text-right">
                <CourseActionsMenu courseId={course.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;

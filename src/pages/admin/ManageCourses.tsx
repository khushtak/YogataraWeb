
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { coursesData } from '@/data/coursesData';
import CoursesPageHeader from '@/components/admin/course/CoursesPageHeader';
import CourseFilters from '@/components/admin/course/CourseFilters';
import CoursesTable from '@/components/admin/course/CoursesTable';
import baseUrl from '@/config/Config';

const ManageCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCourses, setAllCourses] = useState([]);

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
        instructor: course.courseInStructure[0]?.name || "Unknown Instructor",
        category: course.courseCategory,
        students: Math.floor(Math.random() * 1000), // Mock student count
        price: parseFloat(course.coursePrice) || 0,
        status: "Published", // Randomized status
      }));

      setAllCourses(formattedCourses);

    } catch (error) {
      console.error("Error retrieving courses:", error);
      throw error;
    }
  };

  useEffect(() => {
    getAllCourses();

  }, [])



  // Mock data from our courses data
  const courses = Object.values(coursesData).map(course => ({
    id: course.id,
    title: course.title,
    instructor: course.instructor,
    category: course.category,
    students: course.students,
    price: course.price,
    status: Math.random() > 0.3 ? 'Published' : 'Draft',
    lastUpdated: course.lastUpdated
  }));

  // Add a few more mock courses for better UI demonstration
  const mockCourses = [
    ...courses,
    {
      id: '2',
      title: 'Numerology: Unlock the Power of Numbers',
      instructor: 'Aanya Patel',
      category: 'Numerology',
      students: 926,
      price: 129.99,
      status: 'Published',
      lastUpdated: 'April 2023'
    },
    {
      id: '3',
      title: 'Introduction to Tarot Reading',
      instructor: 'Rohan Sharma',
      category: 'Tarot',
      students: 1243,
      price: 99.99,
      status: 'Published',
      lastUpdated: 'May 2023'
    },
    {
      id: '4',
      title: 'Vaastu Shastra for Modern Living',
      instructor: 'Vivek Joshi',
      category: 'Vaastu Shastra',
      students: 754,
      price: 149.99,
      status: 'Draft',
      lastUpdated: 'February 2023'
    },
    {
      id: '5',
      title: 'Palm Reading: The Complete Guide',
      instructor: 'Leela Reddy',
      category: 'Palmistry',
      students: 542,
      price: 79.99,
      status: 'Published',
      lastUpdated: 'June 2023'
    }
  ];

  const filteredCourses = allCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <CoursesPageHeader />

      <div className="bg-card rounded-xl border border-border">
        <CourseFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CoursesTable courses={filteredCourses} />
      </div>
    </AdminLayout>
  );
};

export default ManageCourses;

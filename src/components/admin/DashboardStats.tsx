
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Users, BookOpen, Clock, Award } from 'lucide-react';
import baseUrl from '@/config/Config';

const DashboardStats = () => {

  const [totalCourses, setTotalCourses] = useState(0)

  useEffect(() => {
    getAllCourses();
  }, [])


  const getAllCourses = async () => {

    try {
      const response = await fetch(`${baseUrl}/get-courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      // console.log(data.length);
      setTotalCourses(data.length);
    } catch (error) {
      console.error("Error retrieving courses:", error);
    }
  };

  const stats = [
    {
      title: 'Total Students',
      value: '2,845',
      change: '+12.5%',
      icon: <Users className="h-5 w-5 text-primary" />,
      isPositive: true
    },
    {
      title: 'Active Courses',
      value: totalCourses,
      change: '+4.3%',
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      isPositive: true
    },
    {
      title: 'Avg. Completion Time',
      value: '23 days',
      change: '-2.7%',
      icon: <Clock className="h-5 w-5 text-primary" />,
      isPositive: true
    },
    {
      title: 'Completion Rate',
      value: '68%',
      change: '+5.2%',
      icon: <Award className="h-5 w-5 text-primary" />,
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-primary/10 rounded-lg">
              {stat.icon}
            </div>
            <div className={`flex items-center text-xs ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{stat.change}</span>
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;

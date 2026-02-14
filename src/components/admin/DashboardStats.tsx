import React from "react";
import { ArrowUpRight, Users, BookOpen, Clock, Award } from "lucide-react";

const DashboardStats = ({
  totalStudents,
  activeCourses,
  avgCompletionDays,
  completionRate,
}) => {

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      change: "+12.5%",
      icon: <Users className="h-5 w-5 text-primary" />,
      isPositive: true,
    },
    {
      title: "Active Courses",
      value: activeCourses,
      change: "+4.3%",
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      isPositive: true,
    },
    {
      title: "Avg. Completion Time",
      value: `${avgCompletionDays} days`,
      change: "-2.7%",
      icon: <Clock className="h-5 w-5 text-primary" />,
      isPositive: true,
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      change: "+5.2%",
      icon: <Award className="h-5 w-5 text-primary" />,
      isPositive: true,
    },
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
            <div
              className={`flex items-center text-xs ${
                stat.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
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

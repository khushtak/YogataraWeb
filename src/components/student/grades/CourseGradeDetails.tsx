import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CourseGradeDetailsProps {
  courseTitle: string;
  instructor: string;
  overallGrade: string;
  assignments: {
    title: string;
    type: string;
    grade: string;
    maxGrade: string;
    status: string;
  }[];
}

const CourseGradeDetails = ({
  courseTitle,
  instructor,
  overallGrade,
  assignments,
}: CourseGradeDetailsProps) => {
  const chartData = assignments.map((assignment) => ({
    name: assignment.title,
    grade: Number(assignment.grade),
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{courseTitle}</CardTitle>
        <div className="text-sm text-muted-foreground">{instructor}</div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* OVERALL GRADE */}
        <div>
          <h3 className="text-lg font-medium mb-2">Overall Grade</h3>
          <div className="text-2xl font-bold">{overallGrade}</div>
        </div>

        <Separator />

        {/* GRADE BREAKDOWN */}
        <div>
          <h3 className="text-lg font-medium mb-4">Grade Breakdown</h3>

          {/* 🔥 FIXED HEIGHT + OVERFLOW */}
          <div className="h-[320px] w-full overflow-hidden">
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 0, bottom: 60 }} // 🔥 IMPORTANT
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={60}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="grade"
                    radius={[6, 6, 0, 0]}
                    fill="#8b5cf6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>

        <Separator />

        {/* ASSIGNMENTS LIST */}
        <div>
          <h3 className="text-lg font-medium mb-4">Assignments</h3>

          <div className="space-y-3">
            {assignments.map((assignment, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 py-2 items-center"
              >
                <div className="col-span-6 md:col-span-5">
                  <div className="font-medium">{assignment.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {assignment.type}
                  </div>
                </div>

                <div className="col-span-3 md:col-span-4">
                  {assignment.grade} / {assignment.maxGrade}
                </div>

                <div className="col-span-3 flex justify-end">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                      ${
                        assignment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "Missing"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseGradeDetails;

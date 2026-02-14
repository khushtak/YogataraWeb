import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "@/components/admin/AdminLayout";
import DashboardStats from "@/components/admin/DashboardStats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import baseUrl from "@/config/Config";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState({
    totalStudents: 0,
    activeCourses: 0,
    avgCompletionDays: 0,
    completionRate: 0,
  });

  const [enrollmentData, setEnrollmentData] = useState<any[]>([]);
  const [completionData, setCompletionData] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [popularQuestions, setPopularQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(`${baseUrl}/dashboard`);
        const data = res.data;

        // console.log("Dashboard Data:", data);

        /* ================= CARDS ================= */
        setCards({
          totalStudents: data.cards.totalStudents,
          activeCourses: data.cards.activeCourses,
          avgCompletionDays: data.cards.avgCompletionDays,
          completionRate: data.cards.completionRate,
        });

        /* ================= LINE CHART ================= */
        const enrollments =
          data.charts.courseEnrollments.labels.map(
            (month: string, index: number) => ({
              name: month,
              value: data.charts.courseEnrollments.values[index],
            })
          );

        setEnrollmentData(enrollments);

        /* ================= BAR CHART ================= */
        const completionRates =
          data.charts.courseCompletionRates.map((item: any) => ({
            name: item._id,
            value: item.rate,
          }));

        setCompletionData(completionRates);

        /* ================= OPTIONAL DATA ================= */
        setRecentActivity(data.recentActivity || []);
        setPopularQuestions(data.popularQuestions || []);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard API Error:", err);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-muted-foreground">
          Loading dashboard...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">AdminDashboard</h1>
        {/* <Tabs defaultValue="weekly">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs> */}
      </div>

      {/* STATS */}
      <DashboardStats
        totalStudents={cards.totalStudents}
        activeCourses={cards.activeCourses}
        avgCompletionDays={cards.avgCompletionDays}
        completionRate={cards.completionRate}
      />

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>Total enrollments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Completion Rates</CardTitle>
            <CardDescription>
              Percentage of students who complete each course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RECENT + POPULAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions from students and instructors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 pb-4 border-b border-border last:border-0 last:pb-0"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">
                        {item.studentName}
                      </span>{" "}
                      completed{" "}
                      <span className="font-medium">
                        {item.courseName}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Questions</CardTitle>
            <CardDescription>
              Most frequently used in tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularQuestions.map((q, index) => (
                <div
                  key={index}
                  className="pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  <p className="text-sm font-medium">{q.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used in {q.usedCount} tests
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;


import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export interface GradeData {
  name: string;
  value: number;
  color?: string;
}

interface GradeStatisticsProps {
  title: string;
  chartType: "pie" | "line";
  data: GradeData[];
}

const GRADE_COLORS = ['#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#F44336'];
const DEFAULT_LINE_COLOR = '#8884d8';

const GradeStatistics = ({ title, chartType, data }: GradeStatisticsProps) => {
  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          labelLine={false}
          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || GRADE_COLORS[index % GRADE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, 'Grade']} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={DEFAULT_LINE_COLOR} 
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Grade (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full">
          {chartType === "pie" ? renderPieChart() : renderLineChart()}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeStatistics;

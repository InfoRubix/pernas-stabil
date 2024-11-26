"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const solicitorData = [
  {
    name: "Sarah Wilson",
    activeCases: 12,
    completedCases: 156,
    successRate: 94,
    avgCaseTime: 45,
  },
  {
    name: "Michael Chen",
    activeCases: 15,
    completedCases: 142,
    successRate: 91,
    avgCaseTime: 38,
  },
  {
    name: "Emma Thompson",
    activeCases: 10,
    completedCases: 168,
    successRate: 96,
    avgCaseTime: 42,
  },
  {
    name: "James Miller",
    activeCases: 14,
    completedCases: 134,
    successRate: 89,
    avgCaseTime: 48,
  },
];

const monthlyPerformance = [
  { month: "Jan", cases: 42, success: 38 },
  { month: "Feb", cases: 38, success: 35 },
  { month: "Mar", cases: 45, success: 42 },
  { month: "Apr", cases: 40, success: 37 },
  { month: "May", cases: 35, success: 33 },
  { month: "Jun", cases: 48, success: 45 },
];

const CustomXAxis = (props: any) => (
  <XAxis
    {...props}
    stroke="#888888"
    fontSize={12}
    tickLine={false}
    axisLine={false}
    padding={{ left: 10, right: 10 }}
  />
);

const CustomYAxis = (props: any) => (
  <YAxis
    {...props}
    stroke="#888888"
    fontSize={12}
    tickLine={false}
    axisLine={false}
    padding={{ top: 10, bottom: 10 }}
  />
);

const CustomTooltip = (props: any) => (
  <Tooltip
    {...props}
    contentStyle={{
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "var(--radius)",
    }}
    labelStyle={{ color: "hsl(var(--foreground))" }}
  />
);

const CustomLegend = (props: any) => (
  <Legend
    {...props}
    wrapperStyle={{
      paddingTop: "20px",
    }}
  />
);

export function SolicitorAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active vs Completed Cases</CardTitle>
            <CardDescription>Per solicitor comparison</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={solicitorData}>
                <CustomXAxis dataKey="name" />
                <CustomYAxis />
                <CustomTooltip />
                <CustomLegend />
                <Bar dataKey="activeCases" name="Active Cases" fill="#4f46e5" />
                <Bar
                  dataKey="completedCases"
                  name="Completed Cases"
                  fill="#22c55e"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Percentage of successful cases</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={solicitorData}>
                <CustomXAxis dataKey="name" />
                <CustomYAxis />
                <CustomTooltip />
                <Bar dataKey="successRate" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
          <CardDescription>Cases handled and success rate</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyPerformance}>
              <CustomXAxis dataKey="month" />
              <CustomYAxis />
              <CustomTooltip />
              <CustomLegend />
              <Line
                type="monotone"
                dataKey="cases"
                name="Total Cases"
                stroke="#4f46e5"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="success"
                name="Successful Cases"
                stroke="#22c55e"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
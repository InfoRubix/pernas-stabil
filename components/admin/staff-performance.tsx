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
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const performanceData = [
  {
    name: "Sarah Wilson",
    casesHandled: 45,
    completionRate: 92,
    clientSatisfaction: 4.8,
    responseTime: 2.3,
  },
  {
    name: "Michael Chen",
    casesHandled: 38,
    completionRate: 88,
    clientSatisfaction: 4.6,
    responseTime: 1.8,
  },
  {
    name: "Emma Thompson",
    casesHandled: 42,
    completionRate: 95,
    clientSatisfaction: 4.9,
    responseTime: 2.1,
  },
  {
    name: "James Miller",
    casesHandled: 35,
    completionRate: 87,
    clientSatisfaction: 4.5,
    responseTime: 2.5,
  },
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

export function StaffPerformance() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Cases Handled</CardTitle>
          <CardDescription>Total cases per staff member</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <CustomTooltip />
              <Bar dataKey="casesHandled" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completion Rate</CardTitle>
          <CardDescription>Case completion percentage</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <CustomTooltip />
              <Bar dataKey="completionRate" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Satisfaction</CardTitle>
          <CardDescription>Average rating out of 5</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <CustomTooltip />
              <Bar dataKey="clientSatisfaction" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Time</CardTitle>
          <CardDescription>Average hours to respond</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CustomXAxis dataKey="name" />
              <CustomYAxis />
              <CustomTooltip />
              <Bar dataKey="responseTime" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
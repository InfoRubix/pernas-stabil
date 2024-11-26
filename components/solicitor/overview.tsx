"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", total: 12 },
  { name: "Feb", total: 15 },
  { name: "Mar", total: 18 },
  { name: "Apr", total: 14 },
  { name: "May", total: 16 },
  { name: "Jun", total: 19 },
  { name: "Jul", total: 22 },
  { name: "Aug", total: 20 },
  { name: "Sep", total: 24 },
  { name: "Oct", total: 21 },
  { name: "Nov", total: 25 },
  { name: "Dec", total: 28 },
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
    tickFormatter={(value) => `${value}`}
    padding={{ top: 10, bottom: 10 }}
  />
);

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CustomXAxis dataKey="name" />
        <CustomYAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Line
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
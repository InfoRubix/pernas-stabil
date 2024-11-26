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
  { name: "Jan", total: 245 },
  { name: "Feb", total: 356 },
  { name: "Mar", total: 421 },
  { name: "Apr", total: 478 },
  { name: "May", total: 387 },
  { name: "Jun", total: 452 },
  { name: "Jul", total: 512 },
  { name: "Aug", total: 467 },
  { name: "Sep", total: 512 },
  { name: "Oct", total: 478 },
  { name: "Nov", total: 534 },
  { name: "Dec", total: 623 },
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
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ChartBox() {
  const data = [
    { name: "Jan", sales: 4000, expenses: 2400 },
    { name: "Feb", sales: 3000, expenses: 1398 },
    { name: "Mar", sales: 2000, expenses: 9800 },
    { name: "Apr", sales: 2780, expenses: 3908 },
    { name: "May", sales: 1890, expenses: 4800 },
    { name: "Jun", sales: 2390, expenses: 3800 },
    { name: "Jul", sales: 3490, expenses: 4300 },
  ];

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 w-full flex-1">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">Sales Chart</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import React from "react";
import AverageBox from "../../components/features/AverageBox";
import SalesBox from "../../components/features/SalesBox";
import ExpensesBox from "../../components/features/ExpensesBox";
import ChartBox from "../../components/features/ChartBox";
import UsersBox from "../../components/features/UsersBox";
import NotificationsBox from "../../components/features/NotificationsBox";

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col transition-all">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">Dashboard Overview</h1>

      {/* 3 باکس بالا */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-10">
        <AverageBox />
        <SalesBox />
        <ExpensesBox />
      </div>

      {/* چارت */}
      <ChartBox />

      {/* دو باکس زیر چارت */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 w-full">
        <UsersBox />
        <NotificationsBox />
      </div>
    </div>
  );
}

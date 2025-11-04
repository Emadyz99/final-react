import React from "react";

export default function ExpensesBox() {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition w-full">
      <h2 className="text-lg font-semibold text-gray-500 mb-2">Expenses</h2>
      <p className="text-3xl font-bold text-red-600">$8,230</p>
    </div>
  );
}

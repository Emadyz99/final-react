import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function NotificationsBox() {
  const notifications = [
    { id: 1, message: "New order received" },
    { id: 2, message: "User John updated profile" },
    { id: 3, message: "Low stock on product #302" },
  ];

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-md transition w-full">
      <h2 className="text-lg font-semibold text-gray-500 mb-4 flex items-center gap-2">
        <NotificationsNoneIcon /> Notifications
      </h2>

      <ul className="space-y-2">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="text-gray-700 bg-gray-50 rounded-lg p-2 hover:bg-gray-100"
          >
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

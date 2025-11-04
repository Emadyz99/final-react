import React from "react";
import "./Topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import { useTheme } from "../../assets/hooks/useTheme"; // مسیر شما درست بود

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-sm transition-colors">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        {/* لوگو */}
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse text-gray-800 dark:text-gray-100"
        >
          <img
            src="../../../img/logom.png"
            className="h-8"
            alt="Logo"
          />
          <span className="font-semibold text-lg">Admin Panel</span>
        </a>

        {/* آیکون‌ها + دکمه تم */}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {/* اعلان‌ها */}
          <button
            className="relative text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
            title="Notifications"
          >
            <NotificationsNoneIcon />
            <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">
              3
            </span>
          </button>

          {/* تنظیمات */}
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
            title="Settings"
          >
            <SettingsIcon />
          </button>

          {/* زبان */}
          <button
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
            title="Language"
          >
            <LanguageIcon />
          </button>

          {/* آواتار */}
          <img
            src="../../../img/photo-1535713875002-d1d0cf377fde.jpg"
            className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700"
            alt="Avatar"
          />

          {/* دکمه تغییر تم */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white dark:bg-yellow-400 dark:text-black transition-colors hover:opacity-90"
          >
            {theme === "dark" ? "Light ☀️" : "Dark 🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

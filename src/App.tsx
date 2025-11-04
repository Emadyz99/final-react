import React from 'react'
import './App.css'
import routs from './routs'
import { useRoutes } from 'react-router-dom'
import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import { ThemeProvider } from "./assets/context/ThemeContext";

export default function App() {
  const router = useRoutes(routs);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md sticky top-0 h-screen">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Topbar />
          {router}
        </main>
      </div>
    </ThemeProvider>
  );
}

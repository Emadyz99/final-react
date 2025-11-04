import React, { useState } from "react";
import './Sidebar.css'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";


type OpenMenusType = {
  [key: string]: boolean;
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // زیرمنوها پیش‌فرض باز هستند
  const [openMenus, setOpenMenus] = useState<OpenMenusType>({
    dashboard: true,
    users: true,
    products: true,
    settings: true,
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu: string) =>
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

  return (
    <>
      <button
        onClick={toggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                   dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="sidebar"
        aria-expanded={isOpen}
      >
        
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 
               10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 
               1.5h-7.5a.75.75 0 01-.75-.75zM2 
               10a.75.75 0 01.75-.75h14.5a.75.75 0 
               010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* سایدبار */}
      <aside
        id="sidebar"
        className={`fixed left-0 z-40 w-64 h-screen mt-0 transition-transform bg-gray-50 dark:bg-gray-800 
        shadow-sm sm:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <button
                onClick={() => toggleSubmenu("dashboard")}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white 
                           hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SpaceDashboardIcon />
                <span className=" flex-1 text-left">Dashboard</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openMenus.dashboard ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenus.dashboard && (
                <ul className="pl-8 mt-2 space-y-1">
                   <Link to="/">
                       <li className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><HomeTwoToneIcon />Home</li>
                  </Link>
                  <li><a href="#" className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><AttachMoneyTwoToneIcon />Sale</a></li>
                </ul>
              )}
            </li>

            {/* Users */}
            <li>
              <button
                onClick={() => toggleSubmenu("users")}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white 
                           hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <GroupIcon /><span className=" flex-1 text-left">Users</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openMenus.users ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenus.users && (
                <ul className="pl-8 mt-2 space-y-1">
                    
                        <li className="block p-2 text-sm text-gray-500 hover:bg-gray-200      rounded"><Link to="/Users"><SupervisedUserCircleTwoToneIcon />All Users</Link></li>
                    
                    <Link to="/NewUsers">
                        <li className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><PersonAddAltTwoToneIcon />Add New</li>
                    </Link>

                </ul>
              )}
            </li>

            {/* Products */}
            <li>
              <button
                onClick={() => toggleSubmenu("products")}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white 
                           hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
               <CategoryIcon /> <span className="ms-3 flex-1 text-left">Products</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openMenus.products ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenus.products && (
                <ul className="pl-8 mt-2 space-y-1">
                 <Link to="/Products">
                     <li className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><StoreTwoToneIcon />All Products</li>
                  </Link>

                  <li><a href="#" className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><AddShoppingCartTwoToneIcon />Add New</a></li>
                </ul>
              )}
            </li>
            {/* Settings */}
            <li>
              <button
                onClick={() => toggleSubmenu("settings")}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white 
                           hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className=" flex-1 text-left"><SettingsIcon />Settings</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openMenus.settings ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenus.settings && (
                <ul className="pl-8 mt-2 space-y-1">
                  <li><a href="#" className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><AccountCircleTwoToneIcon />Profile</a></li>
                  <li><a href="#" className="block p-2 text-sm text-gray-500 hover:bg-gray-200 rounded"><ReportTwoToneIcon />Report</a></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

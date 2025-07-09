import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboradSidebar from "../components/DashboradSidebar";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Mobile Navbar with menu icon */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-b shadow-sm bg-white">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <Menu
          className="w-6 h-6 cursor-pointer"
          onClick={() => setSidebarOpen((prev) => !prev)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`md:block ${
          sidebarOpen ? "block" : "hidden"
        } w-full md:w-64 border-r border-gray-200 bg-white z-10`}
      >
        <DashboradSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

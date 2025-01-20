import { Outlet } from "react-router-dom";
import Sidebar from "./SideNavbar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto p-8 lg:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

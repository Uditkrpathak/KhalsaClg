import { Outlet } from "react-router-dom";
import Topbar from "./partials/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">



      {/* Main Section */}
      <div className="flex flex-1 flex-col">

        {/* Topbar */}
        <header className="h-16 bg-white border-b">
          <Topbar />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;

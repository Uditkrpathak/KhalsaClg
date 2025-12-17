import { Outlet } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Topbar from "./partials/Topbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      
      {/* Header */}
      <Topbar/>
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default MainLayout;

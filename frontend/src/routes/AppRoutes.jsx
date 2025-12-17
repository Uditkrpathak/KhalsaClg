import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import AdminDashboard from "../dashboards/admin/pages/AdminDashboard";
import UserDashboard from "../dashboards/user/pages/UserDashboard";

import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ===== Public Routes ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* ===== Admin Dashboard ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ===== User Dashboard ===== */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ===== Global 404 ===== */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;

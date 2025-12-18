import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import AdminDashboard from "../dashboards/admin/pages/AdminDashboard";
import AddStudent from "../dashboards/admin/pages/AddStudent";
import AddAdmin from "../dashboards/admin/pages/AddAdmin";
import StudentList from "../dashboards/admin/pages/StudentList";

import StudentDashboard from "../dashboards/user/pages/StudentDashboard";

import Gallery from "../layouts/Gallery/Gallery";
import EventImages from "../layouts/Gallery/EventImages";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/Login";
import ContactSection from "../pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ===== Public Routes ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactSection/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:id" element={<EventImages />} />
      </Route>

      {/* ===== Admin Dashboard ===== */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-student"
        element={
          <ProtectedRoute role="admin">
            <AddStudent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-admin"
        element={
          <ProtectedRoute role="admin">
            <AddAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/students"
        element={
          <ProtectedRoute role="admin">
            <StudentList />
          </ProtectedRoute>
        }
      />

      {/* ===== Student Dashboard ===== */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* ===== Global 404 ===== */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;

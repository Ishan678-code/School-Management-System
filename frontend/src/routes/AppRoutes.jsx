import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Pages
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import TeacherDashboard from "../pages/TeacherDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import ParentDashboard from "../pages/ParentDashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* 1. LOGIN ROUTE: If logged in, go to SPECIFIC role dashboard */}
      <Route
        path="/login"
        element={
          user ? <Navigate to={`/${user.role}`} replace /> : <LoginPage />
        }
      />

      {/* 2. ROOT ROUTE: If logged in, go to SPECIFIC role dashboard */}
      <Route
        path="/"
        element={
          user ? <Navigate to={`/${user.role}`} replace /> : <Navigate to="/login" replace />
        }
      />

      {/* 3. PROTECTED ADMIN ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      {/* 4. PROTECTED TEACHER ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Route>

      {/* 5. PROTECTED STUDENT ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student" element={<StudentDashboard />} />
      </Route>

      {/* 6. PROTECTED PARENT ROUTES */}
      <Route element={<ProtectedRoute allowedRoles={["parent"]} />}>
        <Route path="/parent" element={<ParentDashboard />} />
      </Route>

      {/* 7. 404 CATCH-ALL */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
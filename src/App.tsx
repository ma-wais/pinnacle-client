import { Navigate, Route, Routes } from "react-router-dom";
import ApplyPage from "./pages/ApplyPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUserManagement from "./pages/AdminUserManagement";
import Layout from "./ui/Layout";
import RequireAuth from "./ui/RequireAuth";
import RequireAdmin from "./ui/RequireAdmin";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<ApplyPage />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboardPage />
            </RequireAdmin>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RequireAdmin>
              <AdminUserManagement />
            </RequireAdmin>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

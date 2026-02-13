import { Navigate, Route, Routes } from "react-router-dom";
import ApplyPage from "./pages/ApplyPage";
import LoginPage from "./pages/LoginPage";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage.jsx";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUserManagement from "./pages/AdminUserManagement";
import Layout from "./ui/Layout";
import RequireAuth from "./ui/RequireAuth";
import RequireUser from "./ui/RequireUser";
import RequireAdmin from "./ui/RequireAdmin";
import { useAuth } from "./lib/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* <Route path="/quote" element={<QuotePage />} /> */}
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/register" element={<ApplyPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        <Route
          path="/dashboard"
          element={
            <RequireUser>
              <DashboardPage />
            </RequireUser>
          }
        />

        <Route
          path="/settings"
          element={
            <RequireAuth>
              <SettingsPage />
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

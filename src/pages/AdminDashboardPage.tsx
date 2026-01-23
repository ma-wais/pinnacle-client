import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardShell from "../ui/DashboardShell";
import { Link } from "react-router-dom";

type Stats = {
  totalUsers: number;
  unverifiedUsers: number;
  totalDocuments: number;
  pendingDocuments: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const usersData = await apiFetch<{ users: any[] }>("/api/admin/users");
        // This is a bit inefficient but works for now as we don't have a stats endpoint
        const unverified = usersData.users.filter(
          (u) => u.verificationStatus === "unverified",
        ).length;

        // We could add a proper stats endpoint in backend, but let's just fetch users for now
        setStats({
          totalUsers: usersData.users.length,
          unverifiedUsers: unverified,
          totalDocuments: 0, // Placeholder
          pendingDocuments: 0, // Placeholder
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load stats");
      }
    })();
  }, []);

  return (
    <DashboardShell title="Admin Dashboard">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row gy-24">
        <div className="col-xl-4 col-sm-6">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-25 text-main-600 text-24 rounded-circle border border-main-100">
                <i className="ph-fill ph-users"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Total Users</h6>
            <h4 className="mb-16">{stats?.totalUsers || 0}</h4>
            <Link
              to="/admin/users"
              className="text-main-600 text-sm fw-bold hover-text-main-700"
            >
              Manage Users <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>

        <div className="col-xl-4 col-sm-6">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-warning-50 text-warning-600 text-24 rounded-circle border border-warning-100">
                <i className="ph-fill ph-clock"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Unverified Users
            </h6>
            <h4 className="mb-16">{stats?.unverifiedUsers || 0}</h4>
            <Link
              to="/admin/users"
              className="text-main-600 text-sm fw-bold hover-text-main-700"
            >
              Review Now <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

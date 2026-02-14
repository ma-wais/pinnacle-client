import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import DashboardShell from "../ui/DashboardShell";
import { Link } from "react-router-dom";

type Stats = {
  totalUsers: number;
  unverifiedUsers: number;
  verifiedUsers: number;
  totalDocuments: number;
  pendingDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
};

type PriceData = {
  price: number;
  lastUpdated: string;
  rawPrice?: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [statsData, pData] = await Promise.all([
          apiFetch<Stats>("/api/admin/stats"),
          apiFetch<PriceData>("/api/prices/copper"),
        ]);
        setStats(statsData);
        setPriceData(pData);
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
        {/* Box 1: Total Users */}
        <div className="col-xl-3 col-sm-6 mt-8">
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

        {/* Box 2: Unverified Users */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-warning-50 text-warning-600 text-24 rounded-circle border border-warning-100">
                <i className="ph-fill ph-user-circle-plus"></i>
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
              Review Users <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Box 3: Verified Users */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-success-50 text-success-600 text-24 rounded-circle border border-success-100">
                <i className="ph-fill ph-check-circle"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Verified Users</h6>
            <h4 className="mb-16">{stats?.verifiedUsers || 0}</h4>
            <div className="text-success-600 text-sm fw-bold">
              Active Members
            </div>
          </div>
        </div>

        {/* Box 4: Total Documents */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-purple-50 text-purple-600 text-24 rounded-circle border border-purple-100">
                <i className="ph-fill ph-file-text"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Total Documents</h6>
            <h4 className="mb-16">{stats?.totalDocuments || 0}</h4>
            <div className="text-purple-600 text-sm fw-bold">
              System Repository
            </div>
          </div>
        </div>

        {/* Box 5: Pending Documents */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-danger-50 text-danger-600 text-24 rounded-circle border border-danger-100">
                <i className="ph-fill ph-clock-counter-clockwise"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Pending Review</h6>
            <h4 className="mb-16">{stats?.pendingDocuments || 0}</h4>
            <Link
              to="/admin/users"
              className="text-main-600 text-sm fw-bold hover-text-main-700"
            >
              Action Required <i className="ph ph-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Box 6: Approved Documents */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-50 text-main-600 text-24 rounded-circle border border-main-100">
                <i className="ph-fill ph-files"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Approved Docs</h6>
            <h4 className="mb-16">{stats?.approvedDocuments || 0}</h4>
            <div className="text-main-600 text-sm fw-bold">Compliant Files</div>
          </div>
        </div>

        {/* Box 7: Copper Price */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-orange-50 text-orange-600 text-24 rounded-circle border border-orange-100">
                <i className="ph-fill ph-chart-line-up"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Copper (LME)</h6>
            <h4 className="mb-4">
              £{(priceData?.price || 0).toLocaleString()}
            </h4>
            {priceData?.rawPrice && (
              <div className="text-neutral-400 text-xs mb-12">
                Raw: ${priceData.rawPrice.toFixed(5)} / lb
              </div>
            )}
            <div className="text-orange-600 text-sm fw-bold">
              Live Market Rate
            </div>
          </div>
        </div>

        {/* Box 8: Last Updated */}
        <div className="col-xl-3 col-sm-6 mt-8">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-neutral-50 text-neutral-600 text-24 rounded-circle border border-neutral-100">
                <i className="ph-fill ph-calendar"></i>
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Price Synchronized
            </h6>
            <h4 className="mb-16 text-18">
              {priceData?.lastUpdated
                ? new Date(priceData.lastUpdated).toLocaleDateString()
                : "Checking..."}
            </h4>
            <div className="text-neutral-500 text-sm fw-bold">
              {priceData?.lastUpdated
                ? new Date(priceData.lastUpdated).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Market Feed"}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

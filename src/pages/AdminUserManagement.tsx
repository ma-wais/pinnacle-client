import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Document, Profile, User } from "../lib/types";
import DashboardShell from "../ui/DashboardShell";

type UserRow = {
  _id: string;
  email: string;
  role: "user" | "admin";
  accountId: string;
  verificationStatus: "unverified" | "verified";
  createdAt: string;
};

export default function AdminUserManagement() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selected, setSelected] = useState<{
    user: User | null;
    profile: Profile | null;
    documents: Document[];
  } | null>(null);
  const [queueDocs, setQueueDocs] = useState<any[]>([]);
  const [queuePagination, setQueuePagination] = useState({ page: 1, pages: 1 });
  const [queueFilter, setQueueFilter] = useState<string>("pending");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const loadUsers = async (page = pagination.page, status = statusFilter) => {
    setLoading(true);
    try {
      const data = await apiFetch<{ users: UserRow[]; pagination: any }>(
        `/api/admin/users?page=${page}&limit=10${status !== "all" ? `&status=${status}` : ""}`,
      );
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const loadQueue = async (
    page = queuePagination.page,
    status = queueFilter,
  ) => {
    try {
      const data = await apiFetch<{ documents: any[]; pagination: any }>(
        `/api/admin/documents?page=${page}&limit=5${status !== "all" ? `&status=${status}` : ""}`,
      );
      setQueueDocs(data.documents);
      setQueuePagination(data.pagination);
    } catch (err) {
      console.error("Failed to load queue");
    }
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([loadUsers(1, "all"), loadQueue(1, "pending")]);
      setPageLoading(false);
    };
    init();
  }, []);

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    loadUsers(1, newStatus);
  };

  const handlePageChange = (newPage: number) => {
    loadUsers(newPage, statusFilter);
  };

  const handleQueueFilterChange = (newStatus: string) => {
    setQueueFilter(newStatus);
    loadQueue(1, newStatus);
  };

  const handleQueuePageChange = (newPage: number) => {
    loadQueue(newPage, queueFilter);
  };

  const loadUser = async (id: string) => {
    const data = await apiFetch<{
      user: User | null;
      profile: Profile | null;
      documents: Document[];
    }>(`/api/admin/users/${id}`);
    setSelected(data);
  };

  const select = async (id: string) => {
    setError(null);
    setSelectedUserId(id);
    try {
      await loadUser(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load user");
    }
  };

  const setVerification = async (status: "unverified" | "verified") => {
    if (!selectedUserId) return;
    setError(null);
    try {
      await apiFetch(`/api/admin/users/${selectedUserId}/verification`, {
        method: "PATCH",
        body: JSON.stringify({ verificationStatus: status }),
      });
      await loadUsers(pagination.page, statusFilter);
      await loadUser(selectedUserId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const updateDocStatus = async (id: string, status: string) => {
    setError(null);
    try {
      await apiFetch(`/api/admin/documents/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (selectedUserId) await loadUser(selectedUserId);
      await loadQueue(queuePagination.page, queueFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  const deleteUser = async (id: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user and all their data? This action cannot be undone.",
      )
    )
      return;
    setError(null);
    try {
      await apiFetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (selectedUserId === id) {
        setSelectedUserId(null);
        setSelected(null);
      }
      await loadUsers(pagination.page, statusFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const deleteDocument = async (docId: string) => {
    if (!window.confirm("Are you sure you want to delete this document?"))
      return;
    setError(null);
    try {
      await apiFetch(`/api/admin/documents/${docId}`, { method: "DELETE" });
      if (selectedUserId) await loadUser(selectedUserId);
      await loadQueue(queuePagination.page, queueFilter);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete document",
      );
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.accountId.toLowerCase().includes(search.toLowerCase()),
  );

  const exportUsers = async () => {
    try {
      const data = await apiFetch<{ users: any[] }>("/api/admin/users/export");
      const headers = [
        "Account ID",
        "Email",
        "Role",
        "Status",
        "Full Name",
        "Phone",
        "Business",
        "Created At",
      ];
      const csvContent = [
        headers.join(","),
        ...data.users.map((u) =>
          [
            u.accountId,
            u.email,
            u.role,
            u.verificationStatus,
            u.fullName || "",
            u.phone || "",
            `"${u.businessName || ""}"`,
            new Date(u.createdAt).toISOString(),
          ].join(","),
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pinnacle-users-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    } catch (err) {
      setError("Export failed");
    }
  };

  return (
    <DashboardShell title="Administration Control">
      {pageLoading ? (
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div
            className="spinner-border text-main-600 mb-16"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
          <p className="text-neutral-500 fw-medium">
            Initializing Admin Systems...
          </p>
        </div>
      ) : (
        <div className="row gy-32">
          <div className="col-lg-12">
            {error && (
              <div
                className="alert alert-danger bg-danger-50 border-danger-100 text-danger-600 rounded-12 mb-24 flex-between"
                role="alert"
              >
                <div className="flex-align gap-12">
                  <i className="ph-fill ph-warning-circle text-24"></i>
                  {error}
                </div>
                <button
                  onClick={() => setError(null)}
                  className="text-danger-600 bg-transparent border-0"
                >
                  <i className="ph ph-x"></i>
                </button>
              </div>
            )}

            <div className="row g-32">
              <div className={"col-xl-7 mt-12"}>
                <div className="bg-white rounded-24 border border-neutral-40 shadow-sm overflow-hidden h-100 transition-all position-relative">
                  {loading && (
                    <div
                      className="position-absolute inset-0 bg-white-75 z-2 flex-center"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.7)",
                        zIndex: 10,
                      }}
                    >
                      <div className="spinner-border text-main-600"></div>
                    </div>
                  )}
                  <div className="p-24 border-bottom border-neutral-40 flex-between flex-wrap gap-16">
                    <div className="flex-align gap-16">
                      <h5 className="mb-0">User Directory</h5>
                      <select
                        value={statusFilter}
                        onChange={(e) =>
                          handleStatusFilterChange(e.target.value)
                        }
                        className="form-select rounded-pill px-10 border-neutral-40 text-xs fw-bold h-36-px"
                        style={{ width: "110px" }}
                      >
                        <option value="all">All Status</option>
                        <option value="unverified">Unverified</option>
                        <option value="verified">Verified</option>
                      </select>
                    </div>
                    <div className="flex-align gap-10">
                      <div className="position-relative">
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-16 text-neutral-400">
                          <i className="ph ph-magnifying-glass"></i>
                        </span>
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          type="text"
                          style={{
                            padding: "5px 38px",
                            border: "2px solid #e2e8f0",
                            borderRadius: "20px",
                            fontSize: "16px",
                            color: "#1e293b",
                            transition: "all 0.2s ease",
                            outline: "none",
                            width: "180px",
                          }}
                          placeholder="Search users..."
                        />
                      </div>
                      <button
                        onClick={exportUsers}
                        style={{
                          padding: "2px 5px",
                          border: "2px solid green",
                          borderRadius: "20px",
                          fontSize: "16px",
                          color: "green",
                          transition: "all 0.2s ease",
                          outline: "none",
                          width: "90px",
                        }}
                      >
                        <i className="ph ph-export"></i> Export
                      </button>
                    </div>
                  </div>

                  <div className="p-24 overflow-x-auto">
                    <table className="table table-borderless vertical-middle mb-0">
                      <thead className="bg-neutral-10">
                        <tr>
                          <th className="px-16 py-12 text-neutral-600 fw-bold rounded-start-8">
                            Account ID
                          </th>
                          <th className="px-16 py-12 text-neutral-600 fw-bold">
                            Verification
                          </th>
                          {!selectedUserId && (
                            <th className="px-16 py-12 text-neutral-600 fw-bold">
                              Joined
                            </th>
                          )}
                          <th className="px-16 py-12 text-neutral-600 fw-bold rounded-end-8 text-end">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td
                              colSpan={selectedUserId ? 3 : 4}
                              className="text-center py-60"
                            >
                              <div className="spinner-border text-main-600 spinner-border-sm me-8"></div>{" "}
                              Syncing Data...
                            </td>
                          </tr>
                        ) : filteredUsers.length === 0 ? (
                          <tr>
                            <td
                              colSpan={selectedUserId ? 3 : 4}
                              className="text-center py-40 text-neutral-500 italic"
                            >
                              No matching records.
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((u) => (
                            <tr
                              key={u._id}
                              onClick={() => select(u._id)}
                              className={`border-bottom border-neutral-20 cursor-pointer hover-bg-main-25 transition-all ${selectedUserId === u._id ? "bg-main-50 border-main-200 shadow-sm" : ""}`}
                            >
                              <td className="px-16 py-20">
                                <p className="text-sm fw-bold text-main-600 mb-0">
                                  {u.accountId}
                                </p>
                                <p className="text-xs text-neutral-500 mb-0">
                                  {u.email}
                                </p>
                              </td>
                              <td className="px-16 py-20">
                                <span
                                  className={`px-12 py-4 rounded-pill text-10 fw-bold text-uppercase ${
                                    u.verificationStatus === "verified"
                                      ? "bg-success-50 text-success-600"
                                      : "bg-warning-50 text-warning-600"
                                  }`}
                                >
                                  {u.verificationStatus}
                                </span>
                              </td>
                              {!selectedUserId && (
                                <td className="px-16 py-20">
                                  <span className="text-xs text-neutral-500">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                  </span>
                                </td>
                              )}
                              <td className="px-16 py-20 text-end">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteUser(u._id);
                                  }}
                                  className="w-32 h-32 flex-end bg-white border border-neutral-30 rounded-circle text-neutral-400 hover-text-danger-600 hover-border-danger-600 transition-all shadow-xs"
                                >
                                  <i className="ph ph-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>

                    {pagination.pages > 1 && (
                      <div className="flex-between mt-24 px-8">
                        <p className="text-xs text-neutral-400">
                          Page {pagination.page} / {pagination.pages}
                        </p>
                        <div className="flex-align gap-8">
                          <button
                            disabled={pagination.page === 1}
                            onClick={() =>
                              handlePageChange(pagination.page - 1)
                            }
                            className="w-28 h-28 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-500 disabled-opacity-30"
                          >
                            <i className="ph ph-caret-left"></i>
                          </button>
                          <button
                            disabled={pagination.page === pagination.pages}
                            onClick={() =>
                              handlePageChange(pagination.page + 1)
                            }
                            className="w-28 h-28 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-500 disabled-opacity-30"
                          >
                            <i className="ph ph-caret-right"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected User Details - Side Column */}
              <div className="col-xl-5">
                {!selectedUserId ? (
                  <div className="bg-white rounded-24 border border-neutral-40 shadow-sm p-40 h-100 flex-center flex-column text-center">
                    <div className="w-80 h-80 rounded-circle bg-neutral-10 flex-center mb-24">
                      <i className="ph-fill ph-fingerprint text-40 text-neutral-200"></i>
                    </div>
                    <h6 className="mb-8">Directory Selection Required</h6>
                    <p className="text-neutral-500 text-sm max-w-280">
                      Select a user from the directory to access their
                      compliance vault, view profile details, and manage
                      verification status.
                    </p>
                  </div>
                ) : !selected ? (
                  <div className="bg-white rounded-24 border border-neutral-40 shadow-sm p-40 h-100 flex-center">
                    <div className="spinner-border text-main-600"></div>
                  </div>
                ) : (
                  <div className="sticky-details h-100 flex-column gap-24 d-flex mt-12">
                    {/* Documents Sidebox (Vault) - NOW ON TOP */}
                    <div
                      className="bg-white rounded-24 border border-neutral-40 shadow-sm p-24 flex-grow-1 overflow-auto"
                      style={{ maxHeight: "400px" }}
                    >
                      <div className="flex-between mb-20">
                        <h6 className="mb-0 fw-bold text-neutral-800">
                          Compliance Vault
                        </h6>
                        <span className="badge bg-neutral-10 text-neutral-500 rounded-pill px-12 py-6 text-10 uppercase fw-bold">
                          {selected.documents.length} Files Locked
                        </span>
                      </div>

                      {selected.documents.length === 0 ? (
                        <div className="text-center py-40 bg-neutral-10 rounded-20 border border-dashed border-neutral-30">
                          <i className="ph ph-cloud-slash text-32 text-neutral-200 mb-12"></i>
                          <p className="text-neutral-400 text-xs px-20">
                            Secure document storage is empty for this user.
                          </p>
                        </div>
                      ) : (
                        <div className="flex-column gap-12 ">
                          {selected.documents.map((d) => (
                            <div
                              key={d._id}
                              className="p-16 border border-neutral-30 rounded-20 hover-border-main-200 transition-all bg-neutral-10 hover-bg-white"
                            >
                              <div className="flex-between">
                                <span className="text-10 fw-bold text-uppercase text-main-600 letter-spacing-1">
                                  {d.type.replace("_", " ")}
                                </span>
                                <div className="flex-align gap-8">
                                  <a
                                    href={d.cloudinaryUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-28 h-28 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-400 hover-text-main-600 transition-all shadow-xs"
                                    title="See Document"
                                  >
                                    <i className="ph ph-eye text-14"></i>
                                  </a>
                                  <a
                                    href={d.cloudinaryUrl}
                                    download={d.originalName}
                                    target="_blank"
                                    className="w-28 h-28 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-400 hover-text-info-600 transition-all shadow-xs"
                                    title="Download File"
                                  >
                                    <i className="ph ph-download-simple text-14"></i>
                                  </a>
                                  <button
                                    onClick={() =>
                                      updateDocStatus(d._id, "approved")
                                    }
                                    className={`w-28 h-28 flex-center rounded-circle border transition-all ${
                                      d.status === "approved"
                                        ? "bg-success-600 border-success-600 text-white shadow-main-sm"
                                        : "bg-white border-neutral-30 text-neutral-400 hover-text-success-600 hover-border-success-600"
                                    }`}
                                    title="Approve"
                                  >
                                    <i className="ph-bold ph-check"></i>
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateDocStatus(d._id, "pending")
                                    }
                                    className={`w-28 h-28 flex-center rounded-circle border transition-all ${
                                      d.status === "pending"
                                        ? "bg-warning-600 border-warning-600 text-white shadow-sm"
                                        : "bg-white border-neutral-30 text-neutral-400 hover-text-warning-600 hover-border-warning-600"
                                    }`}
                                    title="Revoke Status"
                                  >
                                    <i className="ph ph-arrow-counter-clockwise"></i>
                                  </button>
                                  <button
                                    onClick={() => deleteDocument(d._id)}
                                    className="w-28 h-28 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-400 hover-text-danger-600 transition-all shadow-xs"
                                  >
                                    <i className="ph ph-trash text-14"></i>
                                  </button>
                                </div>
                              </div>

                              <div className="flex-between">
                                <div className="flex-align gap-8 overflow-hidden">
                                  <i className="ph-fill ph-file-pdf text-danger-600 text-18"></i>
                                  <a
                                    href={d.cloudinaryUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs fw-bold text-neutral-800 hover-text-main-600 text-truncate"
                                    style={{ maxWidth: "140px" }}
                                  >
                                    {d.originalName || "View Document"}
                                  </a>
                                </div>
                                <span
                                  className={`text-10 fw-bold px-8 py-2 rounded-4 ${
                                    d.status === "approved"
                                      ? "bg-success-50 text-success-600"
                                      : d.status === "rejected"
                                        ? "bg-danger-50 text-danger-600"
                                        : "bg-warning-50 text-warning-600"
                                  }`}
                                >
                                  {d.status === "approved"
                                    ? "Approved"
                                    : d.status === "rejected"
                                      ? "Rejected"
                                      : "Pending"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Profile Snapshot - NOW ON BOTTOM */}
                    <div className="bg-white rounded-24 border border-main-200 shadow-lg p-24 overflow-hidden position-relative">
                      <div className="flex-between mb-24">
                        <h6 className="mb-0 fw-bold text-neutral-800">
                          Profile Snapshot
                        </h6>
                        <button
                          onClick={() => setSelectedUserId(null)}
                          className="w-28 h-28 flex-center rounded-circle bg-neutral-10 text-neutral-500 hover-bg-neutral-100 transition-all"
                        >
                          <i className="ph ph-x"></i>
                        </button>
                      </div>

                      <div className="flex-align gap-16 mb-24 pb-24 border-bottom border-neutral-20">
                        <div className="w-60 h-60 bg-main-600 text-white rounded-20 flex-center text-24 fw-bold shadow-main-sm">
                          {(selected.profile?.fullName ||
                            selected.user?.email ||
                            "?")[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="mb-4 text-16 text-truncate">
                            {selected.profile?.fullName || "Identity Unset"}
                          </h6>
                          <p className="text-xs text-neutral-500 mb-0 text-truncate">
                            {selected.user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-16">
                        <div className="flex-between mb-12 py-12 px-16 bg-neutral-10 rounded-12 border border-neutral-20">
                          <span className="text-xs text-neutral-500 fw-bold text-uppercase">
                            Account Status
                          </span>
                          <span
                            className={`px-12 py-4 rounded-pill text-10 fw-bold text-uppercase ${
                              selected.user?.verificationStatus === "verified"
                                ? "bg-success-100 text-success-700"
                                : "bg-warning-100 text-warning-700"
                            }`}
                          >
                            {selected.user?.verificationStatus === "verified"
                              ? "Approved"
                              : "Unverified"}
                          </span>
                        </div>

                        <div className="px-4">
                          {/* <div className="flex-between mb-8">
                            <span className="text-xs text-neutral-400">
                              Business:
                            </span>
                            <span className="text-xs fw-bold text-neutral-800">
                              {selected.profile?.businessName || "N/A"}
                            </span>
                          </div> */}
                          <div className="flex-between mb-8">
                            <span className="text-xs text-neutral-400">
                              Phone:
                            </span>
                            <span className="text-xs fw-bold text-neutral-800">
                              {selected.profile?.phone || "N/A"}
                            </span>
                          </div>
                          <div className="flex-between">
                            <span className="text-xs text-neutral-400">
                              Location:
                            </span>
                            <span className="text-xs fw-bold text-neutral-800">
                              {selected.profile?.city || "Unknown"}
                            </span>
                          </div>
                        </div>

                        <div className="pt-24 flex-column gap-12 mt-16 border-top border-neutral-20">
                          {selected.user?.verificationStatus ===
                          "unverified" ? (
                            <button
                              onClick={() => setVerification("verified")}
                              className="btn btn-success-600 rounded-pill w-100 flex-center gap-8 py-12 shadow-main-sm fw-bold border-0"
                            >
                              <i className="ph-fill ph-seal-check text-18"></i>
                              Approve User Access
                            </button>
                          ) : (
                            <button
                              onClick={() => setVerification("unverified")}
                              className="btn btn-outline-danger-600 rounded-pill w-100 flex-center gap-8 py-12 fw-bold"
                            >
                              <i className="ph-fill ph-prohibit text-18"></i>
                              Revoke User Access
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Global Compliance Pipeline Section */}
            <div className="row mt-32">
              <div className="col-12">
                <div className="bg-white rounded-24 border border-neutral-40 shadow-sm overflow-hidden h-100 transition-all position-relative">
                  <div className="p-24 border-bottom border-neutral-40 flex-between flex-wrap gap-16 bg-neutral-10">
                    <div className="flex-align gap-12">
                      <div className="w-40 h-40 bg-main-100 text-main-600 rounded-circle flex-center">
                        <i className="ph-fill ph-shield-check text-20"></i>
                      </div>
                      <h5 className="mb-0">Global Compliance Pipeline</h5>
                    </div>
                    <div className="flex-align gap-12">
                      <span className="text-xs fw-bold text-neutral-500">
                        Filter Queue:
                      </span>
                      <select
                        value={queueFilter}
                        onChange={(e) =>
                          handleQueueFilterChange(e.target.value)
                        }
                        className="form-select rounded-pill px-20 border-neutral-40 h-40-px text-xs fw-bold"
                        style={{ width: "160px" }}
                      >
                        <option value="all">All Submissions</option>
                        <option value="pending">Pending Review</option>
                        <option value="approved">Approved Files</option>
                        {/* <option value="rejected">Rejected Files</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="p-24 overflow-x-auto">
                    <table className="table table-borderless vertical-middle mb-0">
                      <thead className="bg-neutral-20">
                        <tr>
                          <th className="px-16 py-12 text-neutral-600 fw-bold rounded-start-8">
                            User & Account
                          </th>
                          <th className="px-16 py-12 text-neutral-600 fw-bold">
                            Document Type
                          </th>
                          <th className="px-16 py-12 text-neutral-600 fw-bold">
                            Date Uploaded
                          </th>
                          <th className="px-16 py-12 text-neutral-600 fw-bold">
                            Status
                          </th>
                          <th className="px-16 py-12 text-neutral-600 fw-bold rounded-end-8 text-end">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {queueDocs.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="text-center py-60 text-neutral-400 italic"
                            >
                              No documents currently in the {queueFilter}{" "}
                              pipeline.
                            </td>
                          </tr>
                        ) : (
                          queueDocs.map((d: any) => (
                            <tr
                              key={d._id}
                              className="border-bottom border-neutral-20 hover-bg-neutral-10 transition-all document-row"
                            >
                              <td className="px-16 py-20">
                                <div className="flex-align gap-12">
                                  <div className="w-32 h-32 bg-main-50 text-main-600 rounded-circle flex-center text-xs fw-bold">
                                    {(d.userId?.profile?.fullName ||
                                      d.userId?.email ||
                                      "?")[0].toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm fw-bold text-neutral-800 mb-0">
                                      {d.userId?.profile?.fullName || "No Name"}
                                    </p>
                                    <p className="text-10 text-neutral-400 uppercase fw-bold mb-0">
                                      {d.userId?.accountId || "No ID"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-16 py-20">
                                <div className="flex-align gap-8">
                                  <i className="ph-fill ph-file-pdf text-danger-600 text-18"></i>
                                  <span className="text-sm fw-medium text-neutral-700">
                                    {d.type.replace("_", " ")}
                                  </span>
                                </div>
                                <p className="text-10 text-neutral-400 mb-0 ps-26">
                                  {d.originalName}
                                </p>
                              </td>
                              <td className="px-16 py-20">
                                <span className="text-xs text-neutral-500">
                                  {new Date(d.uploadedAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="px-16 py-20">
                                <span
                                  className={`px-12 py-4 rounded-pill text-10 fw-bold text-uppercase ${
                                    d.status === "approved"
                                      ? "bg-success-50 text-success-600"
                                      : d.status === "rejected"
                                        ? "bg-danger-50 text-danger-600"
                                        : "bg-warning-50 text-warning-600"
                                  }`}
                                >
                                  {d.status === "approved"
                                    ? "Approved"
                                    : d.status === "rejected"
                                      ? "Rejected"
                                      : "Pending"}
                                </span>
                              </td>
                              <td className="px-16 py-20 text-end">
                                <div className="flex-align gap-8 justify-content-end">
                                  <button
                                    onClick={() => select(d.userId?._id)}
                                    className="w-32 h-32 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-400 hover-text-main-600 transition-all"
                                    title="View User Context"
                                  >
                                    <i className="ph ph-user-focus"></i>
                                  </button>
                                  <a
                                    href={d.cloudinaryUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-32 h-32 flex-center rounded-circle border border-neutral-30 bg-white text-neutral-400 hover-text-main-600 transition-all"
                                    title="View Original"
                                  >
                                    <i className="ph ph-eye"></i>
                                  </a>
                                  <button
                                    onClick={() =>
                                      updateDocStatus(d._id, "approved")
                                    }
                                    className={`w-32 h-32 flex-center rounded-circle border transition-all ${
                                      d.status === "approved"
                                        ? "bg-success-600 border-success-600 text-white"
                                        : "bg-white border-neutral-30 text-neutral-400 hover-text-success-600"
                                    }`}
                                    title="Quick Approve"
                                  >
                                    <i className="ph-bold ph-check"></i>
                                  </button>
                                  <button
                                    onClick={() =>
                                      updateDocStatus(d._id, "pending")
                                    }
                                    className={`w-32 h-32 flex-center rounded-circle border transition-all ${
                                      d.status === "pending"
                                        ? "bg-warning-600 border-warning-600 text-white"
                                        : "bg-white border-neutral-30 text-neutral-400 hover-text-warning-600"
                                    }`}
                                    title="Reset to Pending"
                                  >
                                    <i className="ph ph-arrow-counter-clockwise"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>

                    {queuePagination.pages > 1 && (
                      <div className="flex-between mt-24 px-8">
                        <p className="text-xs text-neutral-400">
                          Record {queuePagination.page} of{" "}
                          {queuePagination.pages}
                        </p>
                        <div className="flex-align gap-12">
                          <button
                            disabled={queuePagination.page === 1}
                            onClick={() =>
                              handleQueuePageChange(queuePagination.page - 1)
                            }
                            className="w-32 h-32 flex-center rounded-8 border border-neutral-30 bg-white text-neutral-500 disabled-opacity-30 hover-border-main-600"
                          >
                            <i className="ph ph-caret-left"></i>
                          </button>
                          <button
                            disabled={
                              queuePagination.page === queuePagination.pages
                            }
                            onClick={() =>
                              handleQueuePageChange(queuePagination.page + 1)
                            }
                            className="w-32 h-32 flex-center rounded-8 border border-neutral-30 bg-white text-neutral-500 disabled-opacity-30 hover-border-main-600"
                          >
                            <i className="ph ph-caret-right"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

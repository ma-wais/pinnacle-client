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

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selected, setSelected] = useState<{
    user: User | null;
    profile: Profile | null;
    documents: Document[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    const data = await apiFetch<{ users: UserRow[] }>("/api/admin/users");
    setUsers(data.users);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.accountId.toLowerCase().includes(search.toLowerCase()),
  );

  const loadUser = async (id: string) => {
    const data = await apiFetch<{
      user: User | null;
      profile: Profile | null;
      documents: Document[];
    }>(`/api/admin/users/${id}`);
    setSelected(data);
  };

  useEffect(() => {
    (async () => {
      try {
        await loadUsers();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load admin data",
        );
      }
    })();
  }, []);

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
      await loadUsers();
      await loadUser(selectedUserId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const updateDocStatus = async (id: string, status: string) => {
    if (!selectedUserId) return;
    setError(null);
    try {
      await apiFetch(`/api/admin/documents/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadUser(selectedUserId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    }
  };

  return (
    <DashboardShell title="Administration Control">
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
            className="text-danger-600 hover-text-danger-800 bg-transparent border-0"
          >
            <i className="ph ph-x"></i>
          </button>
        </div>
      )}

      {/* Admin Stats */}
      <div className="row gy-24 mb-32">
        <div className="col-xl-4 col-sm-6">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm  item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-25 text-main-600 text-24 rounded-circle border border-main-100 shadow-sm">
                <i className="ph-fill ph-users"></i>
              </span>
              <span className="text-neutral-400 text-sm">System Wide</span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Total Registered Users
            </h6>
            <h4 className="mb-0">{users.length} Accounts</h4>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm  item-hover h-100">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-two-25 text-main-two-600 text-24 rounded-circle border border-main-two-100 shadow-sm">
                <i className="ph-fill ph-shield-checkered"></i>
              </span>
              <span className="text-neutral-400 text-sm">Pending Approval</span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Pending Verifications
            </h6>
            <h4 className="mb-0">
              {
                users.filter((u) => u.verificationStatus === "unverified")
                  .length
              }{" "}
              Requests
            </h4>
          </div>
        </div>
      </div>

      <div className="row gy-24">
        <div className="col-lg-6">
          <div className="bg-white rounded-24 p-32 border border-neutral-40 shadow-sm h-100">
            <div className="flex-between mb-32 border-bottom border-neutral-30 pb-16 gap-16 flex-wrap">
              <h5 className="mb-0 text-neutral-700 font-bold">
                User Directory
              </h5>
              <div className="input-group w-auto">
                <span className="input-group-text bg-white border-neutral-30 border-end-0 rounded-start-pill ps-16">
                  <i className="ph ph-magnifying-glass text-neutral-400"></i>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control border-neutral-30 border-start-0 rounded-end-pill px-12 h-40-px text-14"
                  placeholder="Search email or ID..."
                />
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="text-center py-60">
                <i className="ph ph-users-three text-44 text-neutral-200"></i>
                <p className="text-neutral-400 mt-16">
                  {users.length === 0
                    ? "No users found in the system."
                    : "No users match your search."}
                </p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover">
                  <thead>
                    <tr>
                      <th className="py-16 text-neutral-500 text-12 border-0">
                        USER
                      </th>
                      <th className="py-16 text-neutral-500 text-12 border-0">
                        STATUS
                      </th>
                      <th className="py-16 text-neutral-500 text-12 border-0 text-end">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr
                        key={u._id}
                        className={selectedUserId === u._id ? "bg-main-25" : ""}
                      >
                        <td className="py-16">
                          <div className="flex-align gap-12">
                            <div className="w-40 h-40 bg-neutral-10 text-neutral-500 rounded-circle flex-center font-bold">
                              {u.email[0].toUpperCase()}
                            </div>
                            <div className="overflow-hidden">
                              <div
                                className="text-neutral-700 font-bold text-14 truncate"
                                style={{ maxWidth: 180 }}
                              >
                                {u.email}
                              </div>
                              <div className="text-12 text-neutral-400">
                                ID: {u.accountId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-16">
                          <span
                            className={`badge ${u.verificationStatus === "verified" ? "text-bg-success" : "text-bg-warning"} px-12 py-6 rounded-pill text-12`}
                          >
                            {u.verificationStatus}
                          </span>
                        </td>
                        <td className="py-16 text-end">
                          <button
                            onClick={() => select(u._id)}
                            className="text-sm btn btn-main rounded-pill px-6 py-8"
                          >
                            {selectedUserId === u._id ? (
                              <p
                                style={{
                                  fontWeight: "bold",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Selected
                              </p>
                            ) : (
                              // no-wrap text to prevent button width jump
                              <span
                                style={{
                                  whiteSpace: "nowrap",
                                  padding: "0 6px",
                                }}
                              >
                                Select
                              </span>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-white rounded-24 p-32 border border-neutral-40 shadow-sm h-100">
            <h5 className="mb-32 text-neutral-700 font-bold">
              Verification Workshop
            </h5>

            {!selectedUserId ? (
              <div className="text-center py-80 border-2 border-neutral-30 border-dashed rounded-24 bg-neutral-5">
                <div className="w-80 h-80 bg-white rounded-circle flex-center mx-auto mb-20 text-main-600 text-40 shadow-sm border border-neutral-30">
                  <i className="ph ph-fingerprint"></i>
                </div>
                <h6 className="text-neutral-500 fw-medium">
                  Select a user from the directory to review documents.
                </h6>
              </div>
            ) : !selected ? (
              <div className="text-center py-80">
                <div className="spinner-border text-main-600"></div>
                <p className="mt-16 text-neutral-400">Fetching user vault...</p>
              </div>
            ) : (
              <div className="d-grid gap-32">
                <div className="p-24 bg-main-25 border border-main-100 rounded-20">
                  <div className="flex-between flex-wrap gap-12 mb-20">
                    <h6 className="mb-0 text-main-600">Manual Override</h6>
                    <span className="text-neutral-400 text-sm">
                      Update verification status instantly
                    </span>
                  </div>
                  <div className="d-flex gap-12">
                    <button
                      onClick={() => setVerification("verified")}
                      disabled={
                        selected.user?.verificationStatus === "verified"
                      }
                      className="btn btn-main flex-grow-1 rounded-pill py-12"
                    >
                      Verify Account
                    </button>
                    <button
                      onClick={() => setVerification("unverified")}
                      disabled={
                        selected.user?.verificationStatus === "unverified"
                      }
                      className="btn btn-neutral-100 text-neutral-700 flex-grow-1 rounded-pill py-12 border border-neutral-30"
                    >
                      Revoke
                    </button>
                  </div>
                </div>

                <div className="document-vault">
                  <h6 className="mb-20 text-neutral-700">Uploaded Evidences</h6>
                  <div className="d-grid gap-16">
                    {selected.documents.length === 0 ? (
                      <div className="p-20 text-center border border-neutral-30 rounded-20 italic text-neutral-400">
                        No documents presented.
                      </div>
                    ) : (
                      selected.documents.map((d) => (
                        <div
                          key={d._id}
                          className="p-16 border border-neutral-40 rounded-16 bg-neutral-5 hover-bg-white"
                        >
                          <div className="flex-between mb-12">
                            <div className="flex-align gap-12">
                              <div className="w-40 h-40 flex-center bg-white border border-neutral-30 rounded-circle text-xl text-neutral-500 shadow-sm">
                                <i className="ph ph-file-doc"></i>
                              </div>
                              <div className="overflow-hidden">
                                <div
                                  className="text-14 fw-bold text-neutral-700 truncate"
                                  style={{ maxWidth: 200 }}
                                >
                                  {d.type.toUpperCase().replace("_", " ")}
                                </div>
                                <div
                                  className="text-12 text-neutral-400 truncate"
                                  style={{ maxWidth: 200 }}
                                >
                                  {d.originalName}
                                </div>
                              </div>
                            </div>
                            <div className="flex-align gap-8">
                              <span
                                className={`text-10 text-uppercase fw-bold px-8 py-4 rounded-4 ${
                                  d.status === "accepted"
                                    ? "bg-success-50 text-success-600"
                                    : d.status === "rejected"
                                      ? "bg-danger-50 text-danger-600"
                                      : "bg-warning-50 text-warning-600"
                                }`}
                              >
                                {d.status}
                              </span>
                              <a
                                href={`/api/admin/documents/${d._id}/download`}
                                className="w-32 h-32 flex-center bg-white border border-neutral-30 rounded-circle text-neutral-500 hover-text-main-600 shadow-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Download / Open"
                              >
                                <i className="ph ph-download-simple"></i>
                              </a>
                            </div>
                          </div>
                          <div className="d-flex gap-8 mt-12 pt-12 border-top border-neutral-30">
                            <button
                              onClick={() => updateDocStatus(d._id, "accepted")}
                              disabled={d.status === "accepted"}
                              className="btn btn-sm btn-outline-success flex-grow-1 rounded-pill py-4 text-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateDocStatus(d._id, "rejected")}
                              disabled={d.status === "rejected"}
                              className="btn btn-sm btn-outline-danger flex-grow-1 rounded-pill py-4 text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="profile-snapshot">
                  <h6 className="mb-20 text-neutral-700">Profile Snapshot</h6>
                  <div className="bg-neutral-10 border border-neutral-30 rounded-20 p-24">
                    <div className="row gy-16">
                      <div className="col-6">
                        <span className="text-12 text-neutral-400 text-uppercase d-block mb-4">
                          Email
                        </span>
                        <span className="text-14 fw-bold text-neutral-700">
                          {selected.user?.email}
                        </span>
                      </div>
                      <div className="col-6">
                        <span className="text-12 text-neutral-400 text-uppercase d-block mb-4">
                          Full Name
                        </span>
                        <span className="text-14 fw-bold text-neutral-700">
                          {selected.profile?.fullName || "N/A"}
                        </span>
                      </div>
                      <div className="col-12 border-top border-neutral-30 pt-16 mt-8">
                        <span className="text-12 text-neutral-400 text-uppercase d-block mb-4">
                          Verification State
                        </span>
                        <span
                          className={`badge ${selected.user?.verificationStatus === "verified" ? "text-bg-success" : "text-bg-warning"} px-12 rounded-pill`}
                        >
                          {selected.user?.verificationStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

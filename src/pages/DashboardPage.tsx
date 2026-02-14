import { useEffect, useState } from "react";
import { apiFetch, apiFetchForm } from "../lib/api";
import type { Document, DocumentType, Profile, User } from "../lib/types";
import DashboardShell from "../ui/DashboardShell";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [priceData, setPriceData] = useState<{
    price: number;
    lastUpdated: string;
    rawPrice?: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [docType, setDocType] = useState<DocumentType>("all");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const data = await apiFetch<{ user: User; profile: Profile }>(
      "/api/account",
    );
    const docs = await apiFetch<{ documents: Document[] }>("/api/documents");
    const price = await apiFetch<{ price: number; lastUpdated: string }>(
      "/api/prices/copper",
    );
    setUser(data.user);
    setProfile(data.profile);
    setDocuments(docs.documents);
    setPriceData(price);
  };

  useEffect(() => {
    (async () => {
      try {
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
    })();
  }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Select a file");
      return;
    }

    setBusy(true);
    try {
      const form = new FormData();
      form.append("type", docType);
      form.append("file", file);
      await apiFetchForm("/api/documents", form);
      setFile(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <DashboardShell title="My Portal">
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

      <div className="row gy-24 mb-32">
        <div className="col-xl-3 col-sm-6 mt-10">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100 animation-scalation">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-25 text-main-600 text-24 rounded-circle border border-main-100 shadow-sm">
                <i className="ph-fill ph-user-focus"></i>
              </span>
              <span
                className={`badge ${user?.verificationStatus === "verified" ? "text-bg-success" : "text-bg-warning"} rounded-pill px-12 py-6 shadow-sm`}
              >
                {user?.verificationStatus || "Pending"}
              </span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Verification</h6>
            <h4 className="mb-0 text-18">
              {user?.verificationStatus === "verified"
                ? "Verified Account"
                : "Action Required"}
            </h4>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mt-10">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100 animation-scalation">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-two-25 text-main-two-600 text-24 rounded-circle border border-main-two-100 shadow-sm">
                <i className="ph-fill ph-file-text"></i>
              </span>
              <span className="text-neutral-400 text-sm">Total Docs</span>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">
              Compliance Items
            </h6>
            <h4 className="mb-0 text-18">{documents.length} Uploaded</h4>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mt-10">
          <div className="bg-white rounded-20 p-24 border border-neutral-40 shadow-sm item-hover h-100 animation-scalation">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-main-three-25 text-main-three-600 text-24 rounded-circle border border-main-three-100 shadow-sm">
                <i className="ph-fill ph-identification-card"></i>
              </span>
              <div className="text-neutral-400 text-sm">Valid UID</div>
            </div>
            <h6 className="text-neutral-500 mb-4 fw-medium">Account ID</h6>
            <h4 className="mb-0 text-main-three-600 font-bold letter-spacing-1 text-16">
              {user?.accountId || "---"}
            </h4>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mt-10">
          <div className="bg-main-600 rounded-20 p-24 shadow-sm item-hover h-100 animation-scalation text-white border-0">
            <div className="flex-between mb-16">
              <span className="w-52 h-52 flex-center bg-white bg-opacity-20 text-white text-24 rounded-circle border border-white border-opacity-25 shadow-sm">
                <i className="ph-fill ph-chart-line-up"></i>
              </span>
              <div className="text-white text-opacity-80 text-sm">
                Live Feed
              </div>
            </div>
            <h6 className="text-white text-opacity-80 mb-4 fw-medium font-bold">
              LME Copper
            </h6>
            <h4 className="mb-0 text-white text-18">
              £{priceData?.price?.toLocaleString() || "---"}
            </h4>
            {priceData?.rawPrice && (
              <div className="text-xs text-white text-opacity-70 mt-4">
                Raw: ${priceData.rawPrice.toFixed(5)} / lb
              </div>
            )}
            <div className="text-xs text-white text-opacity-50 mt-4">
              Updated:{" "}
              {priceData
                ? new Date(priceData.lastUpdated).toLocaleTimeString()
                : "---"}
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-24">
        <div className="col-lg-5">
          <div className="bg-white rounded-24 p-32 border border-neutral-40 shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-32 border-bottom border-neutral-30 pb-16">
              <h5 className="mb-0 text-neutral-700 font-bold">
                Account Details
              </h5>
              <div className="w-40 h-40 bg-main-25 text-main-600 rounded-circle flex-center">
                <i className="ph ph-user-circle-gear text-24"></i>
              </div>
            </div>

            <div className="d-grid gap-24">
              <div className="profile-detail">
                <span className="text-neutral-400 text-12 text-uppercase fw-bold mb-4 d-block">
                  Login Email
                </span>
                <div className="text-neutral-700 fw-bold">{user?.email}</div>
              </div>
              <div className="profile-detail">
                <span className="text-neutral-400 text-12 text-uppercase fw-bold mb-4 d-block">
                  Contact Name
                </span>
                <div className="text-neutral-700">
                  {profile?.fullName || "---"}
                </div>
              </div>
              <div className="profile-detail">
                <span className="text-neutral-400 text-12 text-uppercase fw-bold mb-4 d-block">
                  Phone
                </span>
                <div className="text-neutral-700">
                  {profile?.phone || "---"}
                </div>
              </div>
              {/* <div className="profile-detail">
                <span className="text-neutral-400 text-12 text-uppercase fw-bold mb-4 d-block">
                  Business Info
                </span>
                <div className="text-neutral-700">
                  {profile?.businessName || "N/A"}
                </div>
                <div className="text-neutral-500 text-sm mt-4">
                  {profile?.addressLine1}, {profile?.city}
                </div>
              </div> */}

              <div className="mt-12 p-20 bg-main-25 rounded-16 border border-main-100 border-dashed">
                <p className="text-sm text-neutral-600 mb-0 d-flex gap-8">
                  <i className="ph-fill ph-info text-main-600 text-lg"></i>
                  Need to update your details? Contact our yard team at
                  info@pinnaclemetals.co.uk
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="bg-white rounded-24 p-32 border border-neutral-40 shadow-sm h-100">
            <h5 className="mb-32 text-neutral-700 font-bold">
              Documents & Compliance
            </h5>

            <form
              onSubmit={upload}
              className="mb-40 p-24 bg-neutral-10 rounded-20 border border-neutral-30"
            >
              <div className="row gy-24">
                <div className="col-md-6">
                  <label className="form-label text-neutral-500 text-sm fw-bold mb-12">
                    Document Type
                  </label>
                  <select
                    className="form-select rounded-pill px-20 border-neutral-40 h-40-px text-xs fw-bold"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as DocumentType)}
                  >
                    <option value="all">All</option>
                    <option value="id">Photo ID</option>
                    <option value="proof_of_address">Proof of Address</option>
                    <option value="business_doc">Business Document</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label text-neutral-500 text-sm fw-bold mb-12">
                    File upload
                  </label>
                  <div className="position-relative">
                    <input
                      className="border p-8 rounded-pill px-20 border-neutral-40 h-40-px text-xs fw-bold"
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>
                <div className="col-12 text-end">
                  <button
                    disabled={busy}
                    type="submit"
                    className="btn btn-main rounded-pill px-32 py-12 flex-align gap-8 d-inline-flex mt-10"
                  >
                    {busy ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <i className="ph-bold ph-upload-simple"></i>
                    )}
                    {busy ? "Uploading..." : "Upload Document"}
                  </button>
                </div>
              </div>
            </form>

            <div className="table-responsive">
              <table className="table align-middle table-hover m-0">
                <thead className="bg-neutral-10">
                  <tr>
                    <th className="ps-24 py-16 text-neutral-500 text-12 border-0">
                      NAME
                    </th>
                    <th className="py-16 text-neutral-500 text-12 border-0">
                      TYPE
                    </th>
                    <th className="py-16 text-neutral-500 text-12 border-0">
                      STATUS
                    </th>
                    <th className="py-16 pe-24 text-neutral-500 text-12 border-0 text-end">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-40 text-neutral-400 italic font-medium"
                      >
                        No documents uploaded yet.
                      </td>
                    </tr>
                  ) : (
                    documents.map((d) => (
                      <tr key={d._id}>
                        <td className="ps-24 py-16">
                          <div
                            className="text-truncate text-neutral-700 font-bold"
                            style={{ maxWidth: 200 }}
                          >
                            {d.originalName}
                          </div>
                          <span className="text-12 text-neutral-400">
                            {new Date(d.uploadedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-16">
                          <span className="badge bg-main-25 text-main-600 border border-main-100 rounded-pill text-10 px-8 py-4">
                            {String(d.type).replaceAll("_", " ").toUpperCase()}
                          </span>
                        </td>
                        <td className="py-16">
                          <span
                            className={`badge ${d.status === "approved" ? "text-bg-success" : d.status === "rejected" ? "text-bg-danger" : "text-bg-warning"} px-12 rounded-pill text-12`}
                          >
                            {d.status}
                          </span>
                        </td>
                        <td className="pe-24 py-16 text-end">
                          <a
                            className="btn btn-main rounded-circle w-32 h-32 flex-center p-0 d-inline-flex border-neutral-30 hover-bg-main-600 hover-text-white"
                            href={`${((window as any).API_BASE || "").replace(/\/+$/, "")}/api/documents/${d._id}/download?token=${localStorage.getItem("token")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="ph ph-download-simple"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

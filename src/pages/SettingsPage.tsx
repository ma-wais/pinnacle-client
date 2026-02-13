import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { Profile, User } from "../lib/types";
import DashboardShell from "../ui/DashboardShell";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    postcode: "",
    businessName: "",
  });

  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await apiFetch<{ user: User; profile: Profile }>(
          "/api/account",
        );
        setUser(data.user);
        if (data.profile) {
          setProfile(data.profile);
        }
      } catch (err) {
        setError("Failed to load account information");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setBusy(true);

    try {
      await apiFetch("/api/account/profile", {
        method: "PUT",
        body: JSON.stringify(profile),
      });
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (passForm.newPassword !== passForm.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setBusy(true);
    try {
      await apiFetch("/api/account/change-password", {
        method: "POST",
        body: JSON.stringify(passForm),
      });
      setSuccess("Password changed successfully");
      setPassForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Password change failed");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <DashboardShell title="Settings">
        <div className="p-32 text-center text-neutral-400">
          Loading your profile...
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Account Settings">
      <div className="row gy-32">
        <div className="col-12">
          {error && (
            <div className="alert alert-danger bg-danger-50 border-danger-100 text-danger-600 rounded-12 mb-24 flex-between">
              <div className="flex-align gap-12">
                <i className="ph-fill ph-warning-circle text-24"></i>
                {error}
              </div>
              <button
                onClick={() => setError(null)}
                className="btn-close shadow-none"
              ></button>
            </div>
          )}
          {success && (
            <div className="alert alert-success bg-success-50 border-success-100 text-success-600 rounded-12 mb-24 flex-between">
              <div className="flex-align gap-12">
                <i className="ph-fill ph-check-circle text-24"></i>
                {success}
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="btn-close shadow-none"
              ></button>
            </div>
          )}
        </div>

        <div className="col-lg-8">
          <div className="bg-white rounded-24 p-32 border border-neutral-40 shadow-sm">
            <h5 className="mb-32 text-neutral-700 font-bold border-bottom pb-16">
              Profile Information
            </h5>

            <form onSubmit={handleProfileSubmit}>
              <div className="row gy-20">
                <div className="col-12">
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Login Email
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill bg-neutral-10 border-neutral-40 h-48-px"
                    value={user?.email}
                    disabled
                  />
                  <small className="text-neutral-400 mt-4 d-block">
                    Email cannot be changed.
                  </small>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-neutral-40 h-48-px"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-neutral-40 h-48-px"
                    value={profile.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Business Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-neutral-40 h-48-px"
                    value={profile.businessName || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, businessName: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-8">
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-neutral-40 h-48-px"
                    value={profile.addressLine1 || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, addressLine1: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill border-neutral-40 h-48-px"
                    value={profile.city || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, city: e.target.value })
                    }
                  />
                </div>

                <div className="col-12 text-end mt-12">
                  <button
                    disabled={busy}
                    type="submit"
                    className="btn btn-main rounded-pill px-40 py-12 fw-bold"
                  >
                    {busy ? (
                      <span className="spinner-border spinner-border-sm me-8"></span>
                    ) : null}
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="bg-white rounded-24 p-32 border border-neutral-40 shadow-sm">
            <h5 className="mb-32 text-neutral-700 font-bold border-bottom pb-16">
              Security
            </h5>

            <form onSubmit={handlePasswordSubmit}>
              <div className="d-grid gap-20">
                <div>
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill border-neutral-40 h-40-px"
                    value={passForm.currentPassword}
                    onChange={(e) =>
                      setPassForm({
                        ...passForm,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill border-neutral-40 h-40-px"
                    value={passForm.newPassword}
                    onChange={(e) =>
                      setPassForm({ ...passForm, newPassword: e.target.value })
                    }
                    required
                    minLength={8}
                  />
                  <small className="text-neutral-400 mt-4 d-block">
                    Minimum 8 characters.
                  </small>
                </div>

                <div>
                  <label className="form-label text-neutral-500 text-sm fw-bold">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill border-neutral-40 h-40-px"
                    value={passForm.confirmPassword}
                    onChange={(e) =>
                      setPassForm({
                        ...passForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="mt-8">
                  <button
                    disabled={busy}
                    type="submit"
                    className="btn btn-outline-main rounded-pill w-100 py-12 fw-bold"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

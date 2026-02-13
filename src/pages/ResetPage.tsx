import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

export default function ResetPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const res = await apiFetch<{ message: string }>(
        "/api/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify({ token, password }),
        },
      );
      setSuccess(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="login-page bg-main-25 min-vh-100 d-flex align-items-center justify-content-center p-20">
        <div
          className="bg-white rounded-24 p-40 shadow-sm border border-neutral-40 w-100 text-center"
          style={{ maxWidth: 450 }}
        >
          <i className="ph-fill ph-warning-circle text-danger-600 text-64 mb-20"></i>
          <h3 className="mb-8 text-neutral-700 font-bold">Invalid Token</h3>
          <p className="text-neutral-600 mb-32">
            The password reset link is missing its token.
          </p>
          <Link
            to="/forgot-password"
            title="Return to forgot password page"
            className="text-main-600 fw-bold"
          >
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page bg-main-25 min-vh-100 d-flex align-items-center justify-content-center p-20">
      <div
        className="bg-white rounded-24 p-40 shadow-sm border border-neutral-40 w-100"
        style={{ maxWidth: 450 }}
      >
        <div className="text-center mb-32">
          <Link to="/">
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              style={{ maxHeight: 80 }}
            />
          </Link>
          <h3 className="mt-24 mb-8 text-neutral-700 font-bold">
            New Password
          </h3>
          <p className="text-neutral-400">Set your new account password.</p>
        </div>

        {error && (
          <div className="alert alert-danger bg-danger-50 border-danger-100 text-danger-600 rounded-12 mb-24">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center pt-20">
            <div className="w-64 h-64 bg-success-50 text-success-600 rounded-circle flex-center mx-auto mb-20">
              <i className="ph-fill ph-check-circle text-32"></i>
            </div>
            <p className="text-neutral-600 mb-32">{success}</p>
            <Link
              to="/login"
              className="btn btn-main rounded-pill w-100 py-12 fw-bold"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-20">
              <label className="form-label text-neutral-500 text-sm fw-bold">
                New Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill border-neutral-40 h-48-px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="mb-32">
              <label className="form-label text-neutral-500 text-sm fw-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control rounded-pill border-neutral-40 h-48-px"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button
              disabled={busy}
              type="submit"
              className="btn btn-main rounded-pill w-100 py-12 fw-bold flex-center gap-10"
            >
              {busy ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Save New Password"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiFetch } from "../lib/api";
import "./AuthPages.css";

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
      <div className="pm-auth-centered">
        <div className="pm-auth-card pm-auth-centered-header">
          <div className="pm-auth-icon-circle error">
            <i className="ph-fill ph-warning-circle"></i>
          </div>
          <h1 className="pm-auth-title-small">Invalid Token</h1>
          <p className="pm-auth-status-text">
            The password reset link is missing its token or is invalid.
          </p>
          <Link to="/forgot-password" className="pm-auth-link">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pm-auth-centered">
      <div className="pm-auth-card">
        <div className="pm-auth-centered-header">
          <Link to="/">
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              className="pm-auth-logo-small"
            />
          </Link>
          <h1 className="pm-auth-title-small">New Password</h1>
          <p className="pm-auth-desc-small">Set your new account password.</p>
        </div>

        {error && <div className="pm-auth-error">{error}</div>}

        {success ? (
          <div className="pm-auth-status-container">
            <div className="pm-auth-icon-circle success">
              <i className="ph-fill ph-check-circle"></i>
            </div>
            <p className="pm-auth-status-text">{success}</p>
            <Link to="/login" className="pm-auth-btn pm-auth-btn-block">
              Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="pm-auth-input-group">
              <label className="pm-auth-label">New Password</label>
              <input
                type="password"
                className="pm-auth-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="pm-auth-input-group">
              <label className="pm-auth-label">Confirm Password</label>
              <input
                type="password"
                className="pm-auth-input"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <button disabled={busy} type="submit" className="pm-auth-btn">
              {busy ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

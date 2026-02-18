import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import "./AuthPages.css";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await apiFetch<{ message: string }>(
        "/api/auth/forgot-password",
        {
          method: "POST",
          body: JSON.stringify({ email }),
        },
      );
      setSuccess(res.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

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
          <h1 className="pm-auth-title-small">Forgot Password</h1>
          <p className="pm-auth-desc-small">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {error && <div className="pm-auth-error">{error}</div>}

        {success ? (
          <div className="pm-auth-status-container">
            <div className="pm-auth-icon-circle success">
              <i className="ph-fill ph-check-circle"></i>
            </div>
            <p className="pm-auth-status-text">{success}</p>
            <Link to="/login" className="pm-auth-btn pm-auth-btn-block">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="pm-auth-input-group">
              <label className="pm-auth-label">Email Address</label>
              <input
                type="email"
                className="pm-auth-input"
                placeholder="yours@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button disabled={busy} type="submit" className="pm-auth-btn">
              {busy ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="pm-auth-footer">
              <Link to="/login" className="pm-auth-link pm-auth-link-small">
                Back to Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

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
            Forgot Password
          </h3>
          <p className="text-neutral-400">
            Enter your email and we'll send you a reset link.
          </p>
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
              className="btn w-100 py-12 fw-bold"
              style={{
                background: "#BA932A",
                color: "#fff",
              }}
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-24">
              <label className="form-label text-neutral-500 text-sm fw-bold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control border-neutral-40 h-48-px"
                placeholder="yours@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              disabled={busy}
              type="submit"
              className="btn  w-100 py-12 fw-bold flex-center gap-10"
              style={{
                background: "#BA932A",
              }}
            >
              {busy ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center mt-32">
              <span className="text-neutral-500">Remembered it? </span>
              <Link
                to="/login"
                style={{
                  color: "#BA932A",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

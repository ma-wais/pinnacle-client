import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import "./AuthPages.css";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const user = await login(email, password);
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pm-auth-page">
      <div className="pm-auth-info">
        <div className="pm-auth-info-content">
          <img
            src="/eduall/assets/images/logo/logo.png"
            alt="Pinnacle Metals"
            className="pm-auth-logo"
            onClick={() => navigate("/")}
          />
          <p className="pm-auth-title">
            The Global Standard <br /> in Metal Trading
          </p>
          <p className="pm-auth-subtitle-text">
            Real-time insights, secure document management, and seamless
            commodity trading at your fingertips.
          </p>
          <div className="pm-auth-stats-row">
            <div>
              <div className="pm-auth-stat-value">500+</div>
              <div className="pm-auth-stat-label">Global Partners</div>
            </div>
            <div>
              <div className="pm-auth-stat-value">24/7</div>
              <div className="pm-auth-stat-label">Market Support</div>
            </div>
            <div>
              <div className="pm-auth-stat-value">100%</div>
              <div className="pm-auth-stat-label">Secure Trading</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pm-auth-form-container">
        <div className="pm-auth-card">
          <h1>Sign in</h1>

          <p className="subtitle">
            Don't have an account?{" "}
            <Link to="/apply" className="pm-auth-link">
              Get started
            </Link>
          </p>

          {error && (
            <div className="pm-auth-error">
              <i className="ph ph-warning-circle"></i>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="pm-auth-input-group">
              <label className="pm-auth-label">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="yours@example.com"
                className="pm-auth-input"
              />
            </div>

            <div className="pm-auth-input-group pm-auth-input-container">
              <div className="pm-auth-label-row">
                <label className="pm-auth-label">Password</label>
                <Link
                  to="/forgot-password"
                  className="pm-auth-link pm-auth-link-small"
                >
                  Forgot?
                </Link>
              </div>
              <div className="pm-auth-input-container">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="pm-auth-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="pm-auth-show-hide-btn"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="pm-auth-checkbox-group">
              <input
                type="checkbox"
                id="keepLoggedIn"
                className="pm-auth-checkbox"
              />
              <label htmlFor="keepLoggedIn" className="pm-auth-checkbox-label">
                Keep me signed in
              </label>
            </div>

            <button type="submit" disabled={busy} className="pm-auth-btn">
              {busy ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="pm-auth-footer">
            <a
              href="/"
              className="pm-auth-back-link"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <i className="ph ph-arrow-left me-8"></i>
              Back to website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

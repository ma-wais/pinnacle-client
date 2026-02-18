import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import "./AuthPages.css";

export default function ApplyPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setBusy(true);
    try {
      await register({
        email,
        password,
        fullName,
        phone: phone || undefined,
        city: city || undefined,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply");
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
            Create an account to gain full access to our trading platform,
            real-time metal rates, and secure document verification processes.
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
          <h1>Create Account</h1>

          <p className="subtitle">
            Already have an account?{" "}
            <Link to="/login" className="pm-auth-link">
              Log in
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
              <label className="pm-auth-label">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                required
                placeholder="e.g. John Doe"
                className="pm-auth-input"
              />
            </div>

            <div className="pm-auth-input-group">
              <label className="pm-auth-label">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="name@company.com"
                className="pm-auth-input"
              />
            </div>

            <div className="pm-auth-flex-row">
              <div className="pm-auth-flex-item">
                <label className="pm-auth-label">Contact Number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+44"
                  className="pm-auth-input"
                />
              </div>
              <div className="pm-auth-flex-item">
                <label className="pm-auth-label">City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                  className="pm-auth-input"
                />
              </div>
            </div>

            <div className="pm-auth-flex-row mb-24">
              <div className="pm-auth-flex-item">
                <label className="pm-auth-label">Password</label>
                <div className="pm-auth-input-container">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="8+ chars"
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
              <div className="pm-auth-flex-item">
                <label className="pm-auth-label">Confirm</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Repeat"
                  className="pm-auth-input"
                />
              </div>
            </div>

            <button type="submit" disabled={busy} className="pm-auth-btn">
              {busy ? "Creating account..." : "Create Account"}
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

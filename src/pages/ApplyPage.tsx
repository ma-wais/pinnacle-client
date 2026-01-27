import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

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

  const inputStyle = {
    padding: "12px 20px",
    border: "2px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#1e293b",
    outline: "none",
    width: "100%",
    transition: "all 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "15px",
    color: "#1f2937",
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px", // More padding for longer form
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "48px",
          width: "100%",
          maxWidth: "600px", // Slightly wider for registration
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontFamily: "'Times New Roman', serif",
            marginBottom: "16px",
            color: "#1f2937",
            fontWeight: "400",
            lineHeight: "1",
          }}
        >
          Sign up
        </h1>

        <p style={{ marginBottom: "32px", fontSize: "15px", color: "#374151" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#007C89",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            Log in
          </Link>
        </p>

        {error && (
          <div
            className="alert alert-danger"
            style={{
              marginBottom: "20px",
              fontSize: "14px",
              padding: "10px",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Full Legal Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              required
              placeholder="e.g. John Doe"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007C89")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Portal Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="name@company.com"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007C89")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Contact Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="+44 7XXX XXXXXX"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#007C89")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                placeholder="e.g. London"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#007C89")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                placeholder="8+ characters"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#007C89")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#007C89",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007C89")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#007C89",
              color: "white",
              border: "none",
              borderRadius: "30px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.7 : 1,
              transition: "background-color 0.2s",
              marginBottom: "24px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#00606b")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007C89")
            }
          >
            {busy ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center" }}>
          By clicking "Sign Up", you agree to our{" "}
          <a href="#" style={{ color: "#007C89", textDecoration: "underline" }}>
            Terms
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "#007C89", textDecoration: "underline" }}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

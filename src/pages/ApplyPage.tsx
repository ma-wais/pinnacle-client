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
    padding: "10px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#1e293b",
    outline: "none",
    width: "100%",
    transition: "all 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "13px",
    color: "#475569",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Left side: Image/Info */}
      <div
        className="d-none d-lg-flex"
        style={{
          flex: "1.2",
          background: "#818384",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "80px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "550px" }}>
          <img
            src="/eduall/assets/images/logo/logo.png"
            alt="Pinnacle Metals"
            className="mb-40"
            style={{ maxHeight: "120px", filter: "" }}
          />
          <p
            style={{
              fontSize: "56px",
              fontWeight: "700",
              marginBottom: "24px",
              lineHeight: "1.1",
            }}
          >
            The Global Standard <br /> in Metal Trading
          </p>
          <p
            style={{
              fontSize: "20px",
              opacity: "0.9",
              lineHeight: "1.6",
              marginBottom: "40px",
            }}
          >
            Create an account to gain full access to our trading platform,
            real-time metal rates, and secure document verification processes.
          </p>
          <div className="d-flex gap-32 border-top border-white border-opacity-25 pt-40">
            <div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>500+</div>
              <div style={{ fontSize: "14px", opacity: "0.7" }}>
                Global Partners
              </div>
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>24/7</div>
              <div style={{ fontSize: "14px", opacity: "0.7" }}>
                Market Support
              </div>
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "700" }}>100%</div>
              <div style={{ fontSize: "14px", opacity: "0.7" }}>
                Secure Trading
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Apply Form */}
      <div
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "24px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #f1f5f9",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              marginBottom: "8px",
              color: "#1f2937",
              fontWeight: "700",
            }}
          >
            Create Account
          </h1>

          <p
            style={{ marginBottom: "24px", fontSize: "14px", color: "#64748b" }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#BA932A",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Log in
            </Link>
          </p>

          {error && (
            <div
              style={{
                marginBottom: "20px",
                fontSize: "13px",
                padding: "14px",
                backgroundColor: "#fef2f2",
                color: "#991b1b",
                borderRadius: "12px",
                border: "1px solid #fee2e2",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <i
                className="ph ph-warning-circle"
                style={{ fontSize: "18px" }}
              ></i>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                required
                placeholder="e.g. John Doe"
                style={{
                  ...inputStyle,
                  backgroundColor: "#f8fafc",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#BA932A")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={labelStyle}>Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="name@company.com"
                style={{
                  ...inputStyle,
                  backgroundColor: "#f8fafc",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#BA932A")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Contact Number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="+44"
                  style={{
                    ...inputStyle,
                    backgroundColor: "#f8fafc",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#BA932A")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                  style={{
                    ...inputStyle,
                    backgroundColor: "#f8fafc",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#BA932A")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="8+ chars"
                    style={{
                      ...inputStyle,
                      backgroundColor: "#f8fafc",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#BA932A")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      fontWeight: "500",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Confirm</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  required
                  placeholder="Repeat"
                  style={{
                    ...inputStyle,
                    backgroundColor: "#f8fafc",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#BA932A")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#BA932A",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: busy ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 6px -1px rgba(186, 147, 42, 0.2)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#A8821F")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#BA932A")
              }
            >
              {busy ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #f1f5f9",
              textAlign: "center",
            }}
          >
            <a
              href="https://dev4.inserito.com/pinnaclemetals/"
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: "500",
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

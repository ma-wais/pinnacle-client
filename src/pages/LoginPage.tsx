import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

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

  return (
    <div
      style={{
        minHeight: "90vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "48px",
          width: "100%",
          maxWidth: "450px",
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
          Log in
        </h1>

        <p style={{ marginBottom: "32px", fontSize: "15px", color: "#374151" }}>
          Need a Pinnacle account?{" "}
          <Link
            to="/apply"
            style={{
              color: "#007C89",
              textDecoration: "underline",
              fontWeight: "500",
            }}
          >
            Create an account
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
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                fontSize: "15px",
                color: "#1f2937",
              }}
            >
              Username or Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007C89")}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>

          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                fontSize: "15px",
                color: "#1f2937",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "32px",
            }}
          >
            <input
              type="checkbox"
              id="keepLoggedIn"
              style={{
                width: "18px",
                height: "18px",
                marginRight: "10px",
                accentColor: "#007C89",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="keepLoggedIn"
              style={{ fontSize: "14px", color: "#4b5563", cursor: "pointer" }}
            >
              Keep me logged in
            </label>
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
            {busy ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "13px",
          }}
        >
          {/* <a href="#" style={{ color: "#007C89", textDecoration: "underline" }}>
            Forgot username?
          </a>
          <a href="#" style={{ color: "#007C89", textDecoration: "underline" }}>
            Forgot password?
          </a> */}
        </div>
        <div style={{ marginTop: "16px", fontSize: "13px" }}>
          <a
            href="https://dev4.inserito.com/pinnaclemetals/"
            style={{ color: "#007C89", textDecoration: "underline" }}
          >
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}

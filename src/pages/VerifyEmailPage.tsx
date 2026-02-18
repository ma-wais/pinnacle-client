import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiFetch } from "../lib/api";
import "./AuthPages.css";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }

    (async () => {
      try {
        const res = await apiFetch<{ message: string }>(
          `/api/auth/verify-email?token=${token}`,
        );
        setStatus("success");
        setMessage(res.message);
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Verification failed.");
      }
    })();
  }, [token]);

  return (
    <div className="pm-auth-centered">
      <div className="pm-auth-card pm-auth-centered-header">
        <div className="pm-auth-centered-header">
          <Link to="/">
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              className="pm-auth-logo-small"
            />
          </Link>
        </div>

        {status === "loading" && (
          <div className="pm-auth-status-container">
            <div
              className="spinner-border text-main-600 mb-20"
              role="status"
            ></div>
            <p className="pm-auth-status-text">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="pm-auth-status-container">
            <div className="pm-auth-icon-circle success">
              <i className="ph-fill ph-check-circle"></i>
            </div>
            <h3 className="pm-auth-title-small">Verified!</h3>
            <p className="pm-auth-status-text">{message}</p>
            <Link to="/login" className="pm-auth-btn pm-auth-btn-block">
              Continue to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="pm-auth-status-container">
            <div className="pm-auth-icon-circle error">
              <i className="ph-fill ph-x-circle"></i>
            </div>
            <h3 className="pm-auth-title-small">Error</h3>
            <p className="pm-auth-status-text">{message}</p>
            <Link to="/login" className="pm-auth-link pm-auth-link-small">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

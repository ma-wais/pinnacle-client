import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

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
    <div className="login-page bg-main-25 min-vh-100 d-flex align-items-center justify-content-center p-20">
      <div
        className="bg-white rounded-24 p-40 shadow-sm border border-neutral-40 w-100 text-center"
        style={{ maxWidth: 450 }}
      >
        <div className="mb-32 text-center">
          <Link to="/">
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              style={{ maxHeight: 80 }}
            />
          </Link>
        </div>

        {status === "loading" && (
          <div className="py-40">
            <div
              className="spinner-border text-main-600 mb-20"
              role="status"
            ></div>
            <p className="text-neutral-600">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="py-20">
            <div className="w-64 h-64 bg-success-50 text-success-600 rounded-circle flex-center mx-auto mb-20">
              <i className="ph-fill ph-check-circle text-32"></i>
            </div>
            <h3 className="mb-8 text-neutral-700 font-bold">Verified!</h3>
            <p className="text-neutral-600 mb-32">{message}</p>
            <Link
              to="/login"
              className="btn btn-main rounded-pill w-100 py-12 fw-bold"
            >
              Continue to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="py-20">
            <div className="w-64 h-64 bg-danger-50 text-danger-600 rounded-circle flex-center mx-auto mb-20">
              <i className="ph-fill ph-x-circle text-32"></i>
            </div>
            <h3 className="mb-8 text-neutral-700 font-bold">Error</h3>
            <p className="text-neutral-600 mb-32">{message}</p>
            <Link to="/login" className="text-main-600 fw-bold">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

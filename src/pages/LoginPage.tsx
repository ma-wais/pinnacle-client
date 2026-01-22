import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="account py-120 position-relative"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <img
        src="/eduall/assets/images/shapes/shape1.png"
        alt=""
        className="shape one animation-scalation"
      />
      <img
        src="/eduall/assets/images/shapes/shape6.png"
        alt=""
        className="shape six animation-rotation"
      />

      <div className="container">
        <div className="row gy-5 align-items-center justify-content-between">
          <div className="col-lg-5 order-lg-1 order-2">
            <div className="account-img text-center position-relative">
              <div className="bg-main-600 w-480-px h-480-px rounded-circle position-absolute top-50 start-50 translate-middle z-n1 opacity-10 blur-70"></div>
              <img
                src="/eduall/assets/images/thumbs/account-img.png"
                alt="Login Graphic"
                className="img-fluid animation-updown"
              />

              <div className="account-stat bg-white rounded-20 p-20 border border-neutral-30 shadow-lg position-absolute bottom-0 start-0 mb-40 ms-n20 animation-scalation">
                <div className="flex-align gap-12">
                  <span className="w-44 h-44 flex-center bg-main-25 text-main-600 text-2xl rounded-circle">
                    <i className="ph-fill ph-check-circle"></i>
                  </span>
                  <div className="text-start">
                    <h6 className="mb-0">Secure Portal</h6>
                    <p className="text-xs text-neutral-400 mb-0">
                      Identity Protected
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-lg-2 order-1">
            <div className="bg-white border border-neutral-30 rounded-32 p-48 shadow-xl">
              <div className="mb-40 text-center text-lg-start">
                <div className="logo mb-32 d-lg-none">
                  <img
                    src="/eduall/assets/images/logo/logo.png"
                    style={{ maxHeight: "40px" }}
                    alt=""
                  />
                </div>
                <h2 className="mb-12 text-neutral-700">Client Login</h2>
                <p className="text-neutral-500 text-lg">
                  Access your recycling dashboard and view market rates.
                </p>
              </div>

              <form onSubmit={onSubmit}>
                <div className="mb-24">
                  <label
                    htmlFor="email"
                    className="fw-bold text-neutral-700 mb-12 d-block"
                  >
                    Email Address
                  </label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                      <i className="ph ph-envelope-simple"></i>
                    </span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="common-input rounded-pill ps-52 h-60-px border-neutral-40"
                      id="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-16">
                  <label
                    htmlFor="password"
                    className="fw-bold text-neutral-700 mb-12 d-block"
                  >
                    Password
                  </label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                      <i className="ph ph-lock-simple"></i>
                    </span>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="common-input rounded-pill ps-52 pe-52 h-60-px border-neutral-40"
                      id="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div
                    className="alert alert-danger border-0 bg-danger-50 text-danger-600 rounded-pill px-24 py-12 mt-24 mb-0 flex-align gap-12"
                    role="alert"
                  >
                    <i className="ph-fill ph-warning-circle text-xl"></i>
                    {error}
                  </div>
                )}

                <div className="mt-40">
                  <button
                    disabled={busy}
                    type="submit"
                    className="btn btn-main rounded-pill h-60-px w-100 flex-center gap-12 font-bold text-lg shadow-sm"
                  >
                    {busy ? "Authenticating..." : "Sign Into Portal"}
                    {!busy && <i className="ph-bold ph-sign-in text-xl"></i>}
                  </button>
                </div>

                <div className="mt-32 pt-32 border-top border-neutral-30 text-center">
                  <p className="text-neutral-500 mb-0">
                    Need an account for your business?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/apply")}
                      className="fw-bold text-main-600 hover-text-main-700 bg-transparent border-0"
                    >
                      Process Application
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <main className="mb-28">
      <div className="common-hero">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-lg-6 m-auto">
              <div className="main-heading">
                <h1>Client Login</h1>
                <div className="space16"></div>
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" />
                  Secure access to your recycling portal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space100"></div>
      <div className="contact-page">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="contact-boxs">
                <div className="heading1">
                  <h2>Access Your Portal</h2>
                  <div className="space16"></div>
                  <p>
                    View verification status, upload documents, and track your
                    account with Pinnacle Metals.
                  </p>
                </div>
                <div className="contact-box">
                  <div className="icon">
                    <img
                      src="/assets/img/icons/contact-page-icon1.png"
                      alt=""
                    />
                  </div>
                  <div className="heading">
                    <h5>Need help?</h5>
                    <a href="tel:07398071934" className="text">
                      07398 071934
                    </a>
                  </div>
                </div>
                <div className="contact-box">
                  <div className="icon">
                    <img
                      src="/assets/img/icons/contact-page-icon2.png"
                      alt=""
                    />
                  </div>
                  <div className="heading">
                    <h5>Email support</h5>
                    <a href="mailto:info@pinnaclemetals.co.uk" className="text">
                      info@pinnaclemetals.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-form-details">
                <form onSubmit={onSubmit}>
                  <div className="row g-24">
                    <div className="col-lg-12">
                      <div className="flex-column gap-8">
                        <label className="text-md fw-bold text-neutral-600">
                          Email Address
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          style={{
                            marginLeft: '10px',
                            padding: "10px 15px",
                            border: "2px solid #e2e8f0",
                            borderRadius: "25px",
                            fontSize: "16px",
                            color: "#1e293b",
                            transition: "all 0.2s ease",
                            outline: "none",
                            width: "250px",
                          }}
                          placeholder="name@company.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 mt-12">
                      <div className="flex-column gap-8">
                        <label className="text-md fw-bold text-neutral-600">
                          Security Password
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          style={{
                            marginLeft: '10px',
                            marginBottom: '10px',
                            padding: "10px 15px",
                            border: "2px solid #e2e8f0",
                            borderRadius: "25px",
                            fontSize: "16px",
                            color: "#1e293b",
                            transition: "all 0.2s ease",
                            outline: "none",
                            width: "250px",
                          }}
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="col-lg-12 mt-12">
                        <div
                          className="alert alert-danger bg-danger-50 border-danger-100 text-danger-600 rounded-12 flex-align gap-8"
                          role="alert"
                        >
                          <i className="ph ph-warning-circle"></i>
                          {error}
                        </div>
                      </div>
                    )}

                    <div className="col-lg-12 mt-12">
                      <button
                        className="btn btn-main rounded-pill w-100 h-60-px flex-center gap-12 text-16 fw-bold shadow-main-sm"
                        type="submit"
                        disabled={busy}
                      >
                        {busy ? "Authenticating..." : "Sign In"}{" "}
                        <i className="ph ph-arrow-right"></i>
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <div className="flex-center flex-column gap-16 mt-24 pt-24 border-top border-neutral-20">
                        <p className="text-neutral-500 mb-0">
                          Don't have an account?
                        </p>
                        <button
                          type="button"
                          onClick={() => navigate("/apply")}
                          className="btn btn-outline-main rounded-pill px-32 py-12 fw-bold"
                        >
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

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
    <main>
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
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single-input">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email Address"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-input">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="col-lg-12">
                        <div className="alert alert-danger mt-20" role="alert">
                          {error}
                        </div>
                      </div>
                    )}

                    <div className="col-lg-12">
                      <button
                        className="theme-btn1"
                        type="submit"
                        disabled={busy}
                      >
                        {busy ? "Authenticating..." : "Sign In"}{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <p className="text-center mt-16">
                        Need an account?{" "}
                        <button
                          type="button"
                          onClick={() => navigate("/apply")}
                          className="btn btn-link"
                        >
                          Register here
                        </button>
                      </p>
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

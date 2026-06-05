import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import type { AccountType } from "../lib/types";
import "./AuthPages.css";

type ApplicationFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  addressLine1: string;
  postcode: string;
  bankName: string;
  sortCode: string;
  bankAccountNumber: string;
  password: string;
  confirmPassword: string;
  photoIdType: "passport" | "driving_licence";
  proofOfAddressType: "utility_bill" | "bank_statement";
};

const initialFields: ApplicationFields = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  addressLine1: "",
  postcode: "",
  bankName: "",
  sortCode: "",
  bankAccountNumber: "",
  password: "",
  confirmPassword: "",
  photoIdType: "passport",
  proofOfAddressType: "utility_bill",
};

export default function ApplyPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [fields, setFields] = useState<ApplicationFields>(initialFields);
  const [photoId, setPhotoId] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const updateField = <K extends keyof ApplicationFields>(
    key: K,
    value: ApplicationFields[K],
  ) => {
    setFields((current) => ({ ...current, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (fields.password !== fields.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!photoId || !proofOfAddress) {
      setError("Please upload both required documents");
      return;
    }

    const form = new FormData();
    form.append("accountType", accountType);
    form.append("firstName", fields.firstName);
    form.append("lastName", fields.lastName);
    form.append("phone", fields.phone);
    form.append("email", fields.email);
    form.append("addressLine1", fields.addressLine1);
    form.append("postcode", fields.postcode);
    form.append("bankName", fields.bankName);
    form.append("sortCode", fields.sortCode);
    form.append("bankAccountNumber", fields.bankAccountNumber);
    form.append("password", fields.password);
    form.append("photoIdType", fields.photoIdType);
    form.append("proofOfAddressType", fields.proofOfAddressType);
    form.append("photoId", photoId);
    form.append("proofOfAddress", proofOfAddress);

    setBusy(true);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pm-auth-page pm-auth-application-page">
      <div className="pm-auth-info">
        <div className="pm-auth-info-content">
          <img
            src="/eduall/assets/images/logo/logo.png"
            alt="Pinnacle Metals"
            className="pm-auth-logo"
            onClick={() => navigate("/")}
          />
          <p className="pm-auth-title">
            Open Your Account <br /> Online
          </p>
          <p className="pm-auth-subtitle-text">
            Become a Pinnacle Metals member online and securely submit the
            details needed to receive payments.
          </p>
          <div className="pm-auth-stats-row">
            <div>
              <div className="pm-auth-stat-value">Online</div>
              <div className="pm-auth-stat-label">Account Application</div>
            </div>
            <div>
              <div className="pm-auth-stat-value">Secure</div>
              <div className="pm-auth-stat-label">Document Uploads</div>
            </div>
            <div>
              <div className="pm-auth-stat-value">Fast</div>
              <div className="pm-auth-stat-label">Member Review</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pm-auth-form-container pm-auth-form-container-application">
        <div className="pm-auth-card pm-auth-application-card">
          <h1>Membership Application</h1>

          <p className="subtitle">
            Already have an account?{" "}
            <Link to="/login" className="pm-auth-link">
              Log in
            </Link>
          </p>

          <div className="pm-auth-account-toggle" aria-label="Account type">
            {(["individual", "business"] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={accountType === type ? "active" : ""}
                onClick={() => setAccountType(type)}
              >
                {type === "individual" ? "Individual" : "Business"}
              </button>
            ))}
          </div>

          {error && <div className="pm-auth-error">{error}</div>}

          <form onSubmit={onSubmit}>
            <section className="pm-auth-section">
              <h2>Your Details</h2>
              <div className="pm-auth-flex-row">
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">First Name</label>
                  <input
                    value={fields.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    type="text"
                    required
                    autoComplete="given-name"
                    className="pm-auth-input"
                  />
                </div>
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">Last Name</label>
                  <input
                    value={fields.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    type="text"
                    required
                    autoComplete="family-name"
                    className="pm-auth-input"
                  />
                </div>
              </div>

              <div className="pm-auth-flex-row">
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">Phone Number</label>
                  <input
                    value={fields.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    type="tel"
                    required
                    autoComplete="tel"
                    className="pm-auth-input"
                  />
                </div>
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">Email Address</label>
                  <input
                    value={fields.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    type="email"
                    required
                    autoComplete="email"
                    className="pm-auth-input"
                  />
                </div>
              </div>

              <div className="pm-auth-input-group">
                <label className="pm-auth-label">Home Address</label>
                <input
                  value={fields.addressLine1}
                  onChange={(e) => updateField("addressLine1", e.target.value)}
                  type="text"
                  required
                  autoComplete="street-address"
                  className="pm-auth-input"
                />
              </div>

              <div className="pm-auth-input-group">
                <label className="pm-auth-label">Postcode</label>
                <input
                  value={fields.postcode}
                  onChange={(e) => updateField("postcode", e.target.value)}
                  type="text"
                  required
                  autoComplete="postal-code"
                  className="pm-auth-input"
                />
              </div>
            </section>

            <section className="pm-auth-section">
              <h2>Payment Details</h2>
              <p>Enter the bank account where you want payments sent.</p>

              <div className="pm-auth-input-group">
                <label className="pm-auth-label">Bank Name</label>
                <input
                  value={fields.bankName}
                  onChange={(e) => updateField("bankName", e.target.value)}
                  type="text"
                  required
                  autoComplete="organization"
                  className="pm-auth-input"
                />
              </div>

              <div className="pm-auth-flex-row">
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">Sort Code</label>
                  <input
                    value={fields.sortCode}
                    onChange={(e) => updateField("sortCode", e.target.value)}
                    type="text"
                    required
                    inputMode="numeric"
                    placeholder="12-34-56"
                    pattern="\d{2}-?\d{2}-?\d{2}"
                    className="pm-auth-input"
                  />
                </div>
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">Account Number</label>
                  <input
                    value={fields.bankAccountNumber}
                    onChange={(e) =>
                      updateField("bankAccountNumber", e.target.value)
                    }
                    type="text"
                    required
                    inputMode="numeric"
                    maxLength={8}
                    pattern="\d{8}"
                    className="pm-auth-input"
                  />
                </div>
              </div>
            </section>

            <section className="pm-auth-section">
              <h2>Identity Documents</h2>
              <p>
                Upload one photo ID and one proof of address. Images and PDFs
                up to 10 MB are accepted.
              </p>

              <div className="pm-auth-document-grid">
                <div className="pm-auth-document-field">
                  <label className="pm-auth-label">Photo ID</label>
                  <select
                    value={fields.photoIdType}
                    onChange={(e) =>
                      updateField(
                        "photoIdType",
                        e.target.value as ApplicationFields["photoIdType"],
                      )
                    }
                    className="pm-auth-input"
                  >
                    <option value="passport">Passport</option>
                    <option value="driving_licence">Driving licence</option>
                  </select>
                  <input
                    type="file"
                    required
                    accept="image/*,.pdf,application/pdf"
                    onChange={(e) =>
                      setPhotoId(e.target.files?.[0] ?? null)
                    }
                    className="pm-auth-file-input"
                  />
                </div>

                <div className="pm-auth-document-field">
                  <label className="pm-auth-label">Proof of Address</label>
                  <select
                    value={fields.proofOfAddressType}
                    onChange={(e) =>
                      updateField(
                        "proofOfAddressType",
                        e.target
                          .value as ApplicationFields["proofOfAddressType"],
                      )
                    }
                    className="pm-auth-input"
                  >
                    <option value="utility_bill">Utility bill</option>
                    <option value="bank_statement">Bank statement</option>
                  </select>
                  <input
                    type="file"
                    required
                    accept="image/*,.pdf,application/pdf"
                    onChange={(e) =>
                      setProofOfAddress(e.target.files?.[0] ?? null)
                    }
                    className="pm-auth-file-input"
                  />
                </div>
              </div>
            </section>

            <section className="pm-auth-section">
              <h2>Account Security</h2>
              <div className="pm-auth-flex-row mb-24">
                <div className="pm-auth-flex-item">
                  <label className="pm-auth-label">Password</label>
                  <div className="pm-auth-input-container">
                    <input
                      value={fields.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      autoComplete="new-password"
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
                  <label className="pm-auth-label">Confirm Password</label>
                  <input
                    value={fields.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    type="password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="pm-auth-input"
                  />
                </div>
              </div>
            </section>

            <button type="submit" disabled={busy} className="pm-auth-btn">
              {busy ? "Submitting application..." : "Submit Application"}
            </button>
          </form>

          <div className="pm-auth-footer">
            <Link to="/" className="pm-auth-back-link">
              Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

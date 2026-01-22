import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function ApplyPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await register({
        email,
        password,
        fullName,
        phone: phone || undefined,
        addressLine1: addressLine1 || undefined,
        city: city || undefined,
        postcode: postcode || undefined,
        businessName: businessName || undefined,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="account py-120 position-relative bg-neutral-10">
      <img src="/eduall/assets/images/shapes/shape1.png" alt="" className="shape one animation-scalation opacity-25" />
      <img src="/eduall/assets/images/shapes/shape6.png" alt="" className="shape six animation-rotation opacity-25" />

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="bg-white border border-neutral-30 rounded-32 shadow-xl overflow-hidden mt-n40 position-relative z-1">
              <div className="p-48 p-md-60">
                <div className="text-center mb-60">
                    <div className="logo mb-32">
                        <img src="/eduall/assets/images/logo/logo.png" style={{ maxHeight: '50px' }} alt="" />
                    </div>
                    <h2 className="mb-16">Scrap Metal Account Setup</h2>
                    <p className="text-neutral-500 max-w-640-px mx-auto text-lg">
                        Compliance is key in our industry. Complete this form to initiate your 
                        digital verification. Once approved, you'll gain access to our secure portal.
                    </p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="row gy-32">
                        <div className="col-12">
                            <h5 className="mb-8 text-neutral-700 border-bottom border-neutral-30 pb-16">Personal Details</h5>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-neutral-700 font-bold mb-12">Full Legal Name</label>
                            <div className="position-relative">
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                                    <i className="ph ph-user"></i>
                                </span>
                                <input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    type="text"
                                    className="common-input rounded-pill ps-52 h-60-px border-neutral-40 bg-neutral-5"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-700 font-bold mb-12">Contact Number</label>
                            <div className="position-relative">
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                                    <i className="ph ph-phone"></i>
                                </span>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="tel"
                                    className="common-input rounded-pill ps-52 h-60-px border-neutral-40 bg-neutral-5"
                                    placeholder="07xxx xxxxxx"
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-48">
                            <h5 className="mb-8 text-neutral-700 border-bottom border-neutral-30 pb-16">Account Access</h5>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-700 font-bold mb-12">Portal Email</label>
                            <div className="position-relative">
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                                    <i className="ph ph-envelope-simple"></i>
                                </span>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="common-input rounded-pill ps-52 h-60-px border-neutral-40 bg-neutral-5"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-700 font-bold mb-12">Secure Password</label>
                            <div className="position-relative">
                                <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                                    <i className="ph ph-lock-key"></i>
                                </span>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="common-input rounded-pill ps-52 h-60-px border-neutral-40 bg-neutral-5"
                                    placeholder="Min 8 characters"
                                    required
                                    minLength={8}
                                />
                            </div>
                        </div>

                        <div className="col-12 mt-48">
                            <h5 className="mb-8 text-neutral-700 border-bottom border-neutral-30 pb-16">Trading Information (Optional)</h5>
                        </div>

                        <div className="col-12">
                            <label className="form-label text-neutral-700 font-bold mb-12">Business / Trading Name</label>
                            <input
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                type="text"
                                className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
                                placeholder="Enter Company Name"
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label text-neutral-700 font-bold mb-12">Trading Address</label>
                            <input
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                type="text"
                                className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
                                placeholder="Street Address"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-700 font-bold mb-12">City</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
                                placeholder="City"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label text-neutral-700 font-bold mb-12">Postcode</label>
                            <input
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                                type="text"
                                className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
                                placeholder="e.g. S72 7PE"
                            />
                        </div>

                        {error && (
                            <div className="col-12 mt-24">
                                <div className="alert alert-danger border-0 bg-danger-50 text-danger-600 rounded-pill px-24 py-12 flex-align gap-12" role="alert">
                                    <i className="ph-fill ph-warning-circle text-xl"></i>
                                    {error}
                                </div>
                            </div>
                        )}

                        <div className="col-12 mt-60 text-center">
                            <button
                                disabled={busy}
                                type="submit"
                                className="btn btn-main rounded-pill h-60-px px-100 flex-center gap-12 font-bold text-lg shadow-sm mx-auto"
                            >
                                {busy ? "Processing Application..." : "Create Account"}
                                {!busy && <i className="ph-bold ph-paper-plane-tilt ms-8"></i>}
                            </button>
                            <p className="mt-24 text-neutral-500 mb-0">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="fw-bold text-main-600 bg-transparent border-0"
                                >
                                    Log In Instead
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
    </div>
  );
  //                       {error}
  //                     </div>
  //                   </div>
  //                 )}

  //                 <div className="col-sm-12">
  //                   <div className="mt-20">
  //                     <button
  //                       disabled={busy}
  //                       type="submit"
  //                       className="btn btn-main rounded-pill flex-center gap-8 w-100 py-16"
  //                     >
  //                       {busy ? "Applying..." : "Submit Application"}
  //                       {!busy && (
  //                         <i className="ph-bold ph-arrow-up-right d-flex text-lg"></i>
  //                       )}
  //                     </button>
  //                   </div>
  //                 </div>

  //                 <div className="col-sm-12 text-center mt-24">
  //                   <p className="text-neutral-500">
  //                     Already have an account?{" "}
  //                     <button
  //                       type="button"
  //                       onClick={() => navigate("/login")}
  //                       className="fw-semibold text-main-600 hover-text-decoration-underline bg-transparent border-0"
  //                     >
  //                       Sign In
  //                     </button>
  //                   </p>
  //                 </div>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

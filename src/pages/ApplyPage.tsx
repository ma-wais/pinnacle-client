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
  const [city, setCity] = useState("");
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
        city: city || undefined,
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
          <div className="col-xl-8">
            <div className="bg-white border border-neutral-30 rounded-32 shadow-xl overflow-hidden mt-n40 position-relative z-1">
              <div className="p-48 p-md-60">
                <div className="text-center mb-60">
                    <div className="logo mb-32">
                        <img src="/eduall/assets/images/logo/logo.png" style={{ maxHeight: '50px' }} alt="" />
                    </div>
                    <h2 className="mb-16">Trade Account Registration</h2>
                    <p className="text-neutral-500 max-w-640-px mx-auto text-lg">
                        Compliance is key in our industry. Complete this form to initiate your 
                        digital verification. Once approved, you'll gain access to our secure portal.
                    </p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="row gy-24">
                        <div className="col-md-6">
                            <label className="form-label text-neutral-800 fw-bold mb-8">Full Legal Name</label>
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                type="text"
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
                            width: "200px",
                          }}
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-800 fw-bold mb-8">Contact Number</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
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
                            width: "200px",
                          }}
                                placeholder="e.g. +44 7XXX XXXXXX"
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-800 fw-bold mb-8">Portal Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
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
                            width: "200px",
                          }}
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label text-neutral-800 fw-bold mb-8">City</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
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
                            width: "200px",
                          }}
                                placeholder="Enter City"
                            />
                        </div>

                        <div className="col-12 mt-8">
                            <label className="form-label text-neutral-800 fw-bold mb-8">Secure Password</label>
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
                            width: "200px",
                          }}
                                placeholder="Create a secure password"
                                required
                                minLength={8}
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
}
//                                 className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
//                                 placeholder="Enter Company Name"
//                             />
//                         </div>

//                         <div className="col-md-12">
//                             <label className="form-label text-neutral-700 font-bold mb-12">Trading Address</label>
//                             <input
//                                 value={addressLine1}
//                                 onChange={(e) => setAddressLine1(e.target.value)}
//                                 type="text"
//                                 className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
//                                 placeholder="Street Address"
//                             />
//                         </div>

//                         <div className="col-md-6">
//                             <label className="form-label text-neutral-700 font-bold mb-12">City</label>
//                             <input
//                                 value={city}
//                                 onChange={(e) => setCity(e.target.value)}
//                                 type="text"
//                                 className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
//                                 placeholder="City"
//                             />
//                         </div>
//                         <div className="col-md-6">
//                             <label className="form-label text-neutral-700 font-bold mb-12">Postcode</label>
//                             <input
//                                 value={postcode}
//                                 onChange={(e) => setPostcode(e.target.value)}
//                                 type="text"
//                                 className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
//                                 placeholder="e.g. S72 7PE"
//                             />
//                         </div>

//                         {error && (
//                             <div className="col-12 mt-24">
//                                 <div className="alert alert-danger border-0 bg-danger-50 text-danger-600 rounded-pill px-24 py-12 flex-align gap-12" role="alert">
//                                     <i className="ph-fill ph-warning-circle text-xl"></i>
//                                     {error}
//                                 </div>
//                             </div>
//                         )}

//                         <div className="col-12 mt-60 text-center">
//                             <button
//                                 disabled={busy}
//                                 type="submit"
//                                 className="btn btn-main rounded-pill h-60-px px-100 flex-center gap-12 font-bold text-lg shadow-sm mx-auto"
//                             >
//                                 {busy ? "Processing Application..." : "Create Account"}
//                                 {!busy && <i className="ph-bold ph-paper-plane-tilt ms-8"></i>}
//                             </button>
//                             <p className="mt-24 text-neutral-500 mb-0">
//                                 Already have an account?{" "}
//                                 <button
//                                     type="button"
//                                     onClick={() => navigate("/login")}
//                                     className="fw-bold text-main-600 bg-transparent border-0"
//                                 >
//                                     Log In Instead
//                                 </button>
//                             </p>
//                         </div>
//                     </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
        // <main>
        //     <div className="common-hero">
        //         <div className="container">
        //             <div className="row align-items-center text-center">
        //                 <div className="col-lg-6 m-auto">
        //                     <div className="main-heading">
        //                         <h1>Register</h1>
        //                         <div className="space16"></div>
        //                         <span className="span">
        //                             <img src="/assets/img/icons/span1.png" alt="" />
        //                             Open a Pinnacle Metals trade account
        //                         </span>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="space100"></div>
        //     <div className="contact-page">
        //         <div className="container">
        //             <div className="row align-items-start">
        //                 <div className="col-lg-5">
        //                     <div className="contact-boxs">
        //                         <div className="heading1">
        //                             <h2>Trade Account Registration</h2>
        //                             <div className="space16"></div>
        //                             <p>
        //                                 We operate in a regulated industry. Complete this form to
        //                                 start your digital verification. Once approved, you will
        //                                 gain secure portal access.
        //                             </p>
        //                         </div>
        //                         <div className="contact-box">
        //                             <div className="icon">
        //                                 <img src="/assets/img/icons/contact-page-icon1.png" alt="" />
        //                             </div>
        //                             <div className="heading">
        //                                 <h5>Need help?</h5>
        //                                 <a href="tel:07398071934" className="text">
        //                                     07398 071934
        //                                 </a>
        //                             </div>
        //                         </div>
        //                         <div className="contact-box">
        //                             <div className="icon">
        //                                 <img src="/assets/img/icons/contact-page-icon2.png" alt="" />
        //                             </div>
        //                             <div className="heading">
        //                                 <h5>Email support</h5>
        //                                 <a href="mailto:info@pinnaclemetals.co.uk" className="text">
        //                                     info@pinnaclemetals.co.uk
        //                                 </a>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className="col-lg-7">
        //                     <div className="contact-form-details">
        //                         <form onSubmit={onSubmit}>
        //                             <div className="row">
        //                                 <div className="col-lg-6">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={fullName}
        //                                             onChange={(e) => setFullName(e.target.value)}
        //                                             type="text"
        //                                             placeholder="Full Legal Name"
        //                                             required
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-lg-6">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={phone}
        //                                             onChange={(e) => setPhone(e.target.value)}
        //                                             type="tel"
        //                                             placeholder="Phone"
        //                                         />
        //                                     </div>
        //                                 </div>

        //                                 <div className="col-lg-6">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={email}
        //                                             onChange={(e) => setEmail(e.target.value)}
        //                                             type="email"
        //                                             placeholder="Email"
        //                                             required
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-lg-6">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={password}
        //                                             onChange={(e) => setPassword(e.target.value)}
        //                                             type="password"
        //                                             placeholder="Password (min 8 characters)"
        //                                             required
        //                                             minLength={8}
        //                                         />
        //                                     </div>
        //                                 </div>

        //                                 <div className="col-lg-12">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={businessName}
        //                                             onChange={(e) => setBusinessName(e.target.value)}
        //                                             type="text"
        //                                             placeholder="Business / Trading Name"
        //                                         />
        //                                     </div>
        //                                 </div>

        //                                 <div className="col-lg-12">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={addressLine1}
        //                                             onChange={(e) => setAddressLine1(e.target.value)}
        //                                             type="text"
        //                                             placeholder="Trading Address"
        //                                         />
        //                                     </div>
        //                                 </div>

        //                                 <div className="col-lg-6">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={city}
        //                                             onChange={(e) => setCity(e.target.value)}
        //                                             type="text"
        //                                             placeholder="City"
        //                                         />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-lg-6">
        //                                     <div className="single-input">
        //                                         <input
        //                                             value={postcode}
        //                                             onChange={(e) => setPostcode(e.target.value)}
        //                                             type="text"
        //                                             placeholder="Postcode"
        //                                         />
        //                                     </div>
        //                                 </div>

        //                                 {error && (
        //                                     <div className="col-lg-12">
        //                                         <div className="alert alert-danger mt-20" role="alert">
        //                                             {error}
        //                                         </div>
        //                                     </div>
        //                                 )}

        //                                 <div className="col-lg-12">
        //                                     <button className="theme-btn1" type="submit" disabled={busy}>
        //                                         {busy ? "Submitting..." : "Submit Application"} <span><i className="bi bi-arrow-right"></i></span>
        //                                     </button>
        //                                 </div>
        //                                 <div className="col-lg-12">
        //                                     <p className="text-center mt-16">
        //                                         Already have an account?{" "}
        //                                         <button
        //                                             type="button"
        //                                             onClick={() => navigate("/login")}
        //                                             className="btn btn-link"
        //                                         >
        //                                             Login here
        //                                         </button>
        //                                     </p>
        //                                 </div>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </main>

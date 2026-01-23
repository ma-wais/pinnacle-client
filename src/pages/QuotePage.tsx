import { useState } from "react";
import { Link } from "react-router-dom";

export default function QuotePage() {
  const [metalType, setMetalType] = useState("");

  return (
    <main>
      <div className="common-hero">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-lg-6 m-auto">
              <div className="main-heading">
                <h1>Get a Quote</h1>
                <div className="space16"></div>
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" />
                  <Link to="/">Home</Link>
                  <span className="arrow">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                  Get a Quote
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space100"></div>
      <div className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-boxs">
                <div className="heading1">
                  <h2>Request a Scrap Quote</h2>
                  <div className="space16"></div>
                  <p>
                    Send your material details and estimated weights. We will
                    respond quickly with a live market rate and collection
                    options.
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
                    <h5>Call for Instant Pricing</h5>
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
                    <h5>Email Your List</h5>
                    <a href="mailto:info@pinnaclemetals.co.uk" className="text">
                      info@pinnaclemetals.co.uk
                    </a>
                  </div>
                </div>

                <div className="contact-box">
                  <div className="icon">
                    <img
                      src="/assets/img/icons/contact-page-icon3.png"
                      alt=""
                    />
                  </div>
                  <div className="heading">
                    <h5>Collections Available</h5>
                    <span className="text">
                      Trade and industrial pickups across South Yorkshire.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-form-details">
                <form action="#">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="single-input">
                        <select
                          value={metalType}
                          onChange={(e) => setMetalType(e.target.value)}
                          className="p-10 border border-white my-8"
                        >
                          <option value="">Select Material Type</option>
                          <option value="copper">Copper (Bright Wire)</option>
                          <option value="aluminum">Aluminium</option>
                          <option value="brass">Brass</option>
                          <option value="steel">Steel / Ferrous</option>
                          <option value="lead">Lead / Batteries</option>
                          <option value="cable">Insulated Cable</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-input">
                        <input
                          type="number"
                          placeholder="Estimated Weight (kg)"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="text" placeholder="Collection Postcode" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="text" placeholder="Your Name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="tel" placeholder="Phone" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-input">
                        <textarea
                          cols={30}
                          rows={5}
                          placeholder="Describe your materials"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="theme-btn1" type="button">
                        Request Quote{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta mt-48">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="heading1-w">
                <h2 className="title tg-element-title">
                  Transparent weighing. Fair rates. Fast payments.
                </h2>
                <div className="space16"></div>
                <p>
                  Our team uses certified scales and live pricing to ensure your
                  quote matches the market on the day.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="buttons">
                <Link className="cta-btn1" to="/contact">
                  Call the Yard{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                      />
                    </svg>
                  </span>
                </Link>
                <Link className="cta-btn2" to="/apply">
                  Open a Trade Account{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-arrow-right-short"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
//                       <i className="ph ph-certificate"></i>
//                     </div>
//                     <h5 className="mb-8">Licensed Yard</h5>
//                     <p className="text-sm text-neutral-500 mb-0">
//                       Fully environmental agency compliant and local authority
//                       approved.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

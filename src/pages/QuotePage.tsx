import React, { useState } from "react";

export default function QuotePage() {
  const [metalType, setMetalType] = useState("");

  return (
    <main className="quote-page bg-neutral-10">
      {/* Breadcrumb */}
      <section
        className="breadcrumb py-110 bg-main-600 position-relative overflow-hidden"
        style={{
          backgroundImage: "url('/eduall/assets/images/shapes/shape9.png')",
          backgroundSize: "cover",
        //   backgroundBlendMode: "multiply",
        }}
      >
        <div className="container">
          <div className="breadcrumb-content text-center">
            <h1 className="mb-16 text-white display-4">
              Instant Scrap Valuation
            </h1>
            <p className="text-white opacity-75 text-lg mb-0 max-w-640-px mx-auto">
              Get the most accurate market rates for your scrap metal.
              Transparent, fast, and professional.
            </p>
          </div>
        </div>
        <img
          src="/eduall/assets/images/shapes/shape1.png"
          alt=""
          className="shape one animation-scalation opacity-25"
        />
      </section>

      <section className="quote-section py-120 mt-n120 position-relative z-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-11">
              <div className="bg-white rounded-32 shadow-xl overflow-hidden border border-neutral-30">
                <div className="row g-0">
                  <div className="col-lg-7">
                    <div className="p-48 p-sm-60">
                      <div className="flex-align gap-12 mb-32">
                        <span className="w-40 h-40 bg-main-25 text-main-600 rounded-circle flex-center font-bold">
                          01
                        </span>
                        <h4 className="mb-0">Metal Details</h4>
                      </div>

                      <form className="row gy-24">
                        <div className="col-md-6">
                          <label className="form-label text-neutral-700 font-bold mb-12">
                            Metal Category
                          </label>
                          <div className="position-relative">
                            <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                              <i className="ph ph-hash"></i>
                            </span>
                            <select
                              className="common-input rounded-pill h-60-px ps-52 px-24 border-neutral-40 bg-neutral-5"
                              value={metalType}
                              onChange={(e) => setMetalType(e.target.value)}
                            >
                              <option value="">Select Category</option>
                              <option value="copper">Bright Wire Copper</option>
                              <option value="aluminum">
                                Aluminum Wheels/Sheet
                              </option>
                              <option value="lead">Lead Acid Batteries</option>
                              <option value="steel">Heavy Melting Steel</option>
                              <option value="brass">Mixed Brass/Honey</option>
                              <option value="cable">
                                Household Cable (40%)
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label text-neutral-700 font-bold mb-12">
                            Estimated Weight
                          </label>
                          <div className="position-relative">
                            <span className="position-absolute top-50 start-0 translate-middle-y ms-20 text-neutral-400 text-xl">
                              <i className="ph ph-scales"></i>
                            </span>
                            <input
                              type="number"
                              className="common-input rounded-pill h-60-px ps-52 px-24 border-neutral-40 bg-neutral-5"
                              placeholder="e.g. 150"
                            />
                            <span className="position-absolute top-50 end-0 translate-middle-y me-24 text-main-600 font-bold">
                              KG
                            </span>
                          </div>
                        </div>

                        <div className="col-md-6 mt-24">
                          <label className="form-label text-neutral-700 font-bold mb-12">
                            Description of Items
                          </label>
                          <textarea
                            className="common-input rounded-24 h-120-px p-24 border-neutral-40 bg-neutral-5"
                            placeholder="4x alloy wheels, bucket of copper piping"
                          ></textarea>
                        </div>

                        <div className="col-12 mt-48">
                          <div className="flex-align gap-12 mb-32 border-top border-neutral-30 pt-48">
                            <span className="w-40 h-40 bg-main-25 text-main-600 rounded-circle flex-center font-bold">
                              02
                            </span>
                            <h4 className="mb-0">Contact Information</h4>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label text-neutral-700 font-bold mb-12">
                            Your Name
                          </label>
                          <input
                            type="text"
                            className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label text-neutral-700 font-bold mb-12">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5"
                            placeholder="07xxx xxxxxx"
                          />
                        </div>

                        <div className="col-12 mt-48">
                          <button
                            type="button"
                            className="btn btn-main rounded-pill px-64 h-60-px w-100 flex-center gap-12 font-bold text-lg"
                          >
                            Send Request
                            <i className="ph ph-paper-plane-tilt"></i>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="bg-main-600 h-100 p-48 p-sm-60 text-white position-relative">
                      <img
                        src="/eduall/assets/images/shapes/shape9.png"
                        className="position-absolute bottom-0 end-0 opacity-10"
                        alt=""
                      />

                      <h3 className="text-white mb-24 font-bold">
                        Why Pinnacle?
                      </h3>
                      <p className="text-white opacity-75 mb-40">
                        We use certified digital scales and live LME market data
                        to ensure you get paid the exact value of your metal.
                      </p>

                      <div className="d-grid gap-32">
                        <div className="flex-align gap-20">
                          <div className="w-52 h-52 flex-center bg-white bg-opacity-10 rounded-circle text-24 border border-white border-opacity-20 flex-shrink-0">
                            <i className="ph ph-wallet"></i>
                          </div>
                          <div>
                            <h6 className="text-white mb-4">
                              Instant Payments
                            </h6>
                            <p className="text-sm opacity-75 mb-0">
                              Direct Bank Transfer (BACS) processed on-site.
                            </p>
                          </div>
                        </div>
                        <div className="flex-align gap-20">
                          <div className="w-52 h-52 flex-center bg-white bg-opacity-10 rounded-circle text-24 border border-white border-opacity-20 flex-shrink-0">
                            <i className="ph ph-shield-check"></i>
                          </div>
                          <div>
                            <h6 className="text-white mb-4">
                              Certified Weighing
                            </h6>
                            <p className="text-sm opacity-75 mb-0">
                              Trading Standards approved weighing systems.
                            </p>
                          </div>
                        </div>
                        <div className="flex-align gap-20">
                          <div className="w-52 h-52 flex-center bg-white bg-opacity-10 rounded-circle text-24 border border-white border-opacity-20 flex-shrink-0">
                            <i className="ph ph-truck"></i>
                          </div>
                          <div>
                            <h6 className="text-white mb-4">
                              Collection Available
                            </h6>
                            <p className="text-sm opacity-75 mb-0">
                              Free pickups for loads over 500kg.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-60 p-24 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-20">
                        <div className="flex-align gap-12 mb-16">
                          <i className="ph ph-info text-24"></i>
                          <h6 className="mb-0 text-white">Market Update</h6>
                        </div>
                        <p className="text-sm opacity-75 mb-0">
                          Metal prices are currently volatile. Quotes provided
                          are valid for 24 hours from submission.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row gy-24 mt-48">
                <div className="col-md-4">
                  <div className="bg-main-25 rounded-24 p-32 border border-neutral-30 text-center">
                    <div className="w-60 h-60 bg-white rounded-circle flex-center mx-auto mb-20 text-main-600 text-2xl shadow-sm border border-neutral-40">
                      <i className="ph ph-lightning"></i>
                    </div>
                    <h5 className="mb-8">Fast Response</h5>
                    <p className="text-sm text-neutral-500 mb-0">
                      Our team usually responds within 15 minutes during yard
                      hours.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-main-25 rounded-24 p-32 border border-neutral-30 text-center">
                    <div className="w-60 h-60 bg-white rounded-circle flex-center mx-auto mb-20 text-main-two-600 text-2xl shadow-sm border border-neutral-40">
                      <i className="ph ph-bank"></i>
                    </div>
                    <h5 className="mb-8">Same Day Cashless</h5>
                    <p className="text-sm text-neutral-500 mb-0">
                      Direct bank transfers processed immediately upon weigh-in.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-main-25 rounded-24 p-32 border border-neutral-30 text-center">
                    <div className="w-60 h-60 bg-white rounded-circle flex-center mx-auto mb-20 text-main-three-600 text-2xl shadow-sm border border-neutral-40">
                      <i className="ph ph-certificate"></i>
                    </div>
                    <h5 className="mb-8">Licensed Yard</h5>
                    <p className="text-sm text-neutral-500 mb-0">
                      Fully environmental agency compliant and local authority
                      approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );

           
}

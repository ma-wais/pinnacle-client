import { useEffect, useState } from "react";

export default function HomePage() {
  const [priceData, setPriceData] = useState<{
    price: number;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/prices/copper")
      .then((res) => res.json())
      .then((data) => setPriceData(data))
      .catch(() => {});
  }, []);

  return (
    <main>
      <section className="banner-two pt-80 p-40 position-relative overflow-hidden">
        <img
          src="/eduall/assets/images/shapes/banner-two-shape-1.png"
          className="position-absolute inset-block-end-0 inset-inline-end-0 w-100 h-100 d-lg-block d-none z-n1"
          alt=""
        />

        <img
          src="/eduall/assets/images/shapes/shape8.png"
          alt=""
          className="shape three animation-rotation z-n1"
        />
        <img
          src="/eduall/assets/images/shapes/shape8.png"
          alt=""
          className="shape five animation-scalation"
        />

        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-xl-6">
              <div className="banner-content pe-md-4">
                <div className="flex-align gap-8 mb-16">
                  <h5 className="text-main-600 mb-0">
                    Professional Metal Recycling Services
                  </h5>
                </div>

                <h1 className="display2 mb-24">
                  Scrap. <span className="text-main-two-600">Weigh.</span>{" "}
                  <span className="text-main-three-600">Paid.</span>
                </h1>

                <p className="text-neutral-500 text-line-2">
                  Fast, reliable scrap metal recycling with same-day payments
                  and competitive prices.
                </p>

                <div className="buttons-wrapper flex-align flex-wrap gap-24 mt-40">
                  <a
                    href="#quote"
                    className="btn btn-main rounded-pill flex-align gap-8"
                  >
                    Get a Quote
                  </a>
                  <a
                    href="tel:07398071934"
                    className="btn btn-outline-main rounded-pill flex-align gap-8"
                  >
                    Call: 07398 071934
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="banner-thumb position-relative">
                <img
                  src="/eduall/assets/images/thumbs/banner-img-2.png"
                  alt=""
                  className="banner-thumb__img rounded-12"
                />
                <img
                  src="/eduall/assets/images/shapes/shape9.png"
                  className="position-absolute inset-block-end-0 start-0 z-n1"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="info py-40 bg-main-600">
        <div className="container">
          <div className="row gy-4">
            <div className="col-xl-3 col-sm-6">
              <div className="info-item animation-item flex-align gap-20">
                <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0 font-bold">
                  18+
                </span>
                <div className="flex-grow-1">
                  <h5 className="mb-0 text-white fw-medium">
                    Years Experience
                  </h5>
                  <span className="text-sm text-white opacity-75">
                    Licensed carrier
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="info-item animation-item flex-align gap-20">
                <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0 font-bold">
                  99%
                </span>
                <div className="flex-grow-1">
                  <h5 className="mb-0 text-white fw-medium">Satisfaction</h5>
                  <span className="text-sm text-white opacity-75">
                    Fast, fair service
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="info-item animation-item flex-align gap-20">
                <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0 font-bold">
                  £
                </span>
                <div className="flex-grow-1">
                  <h5 className="mb-0 text-white fw-medium">Quick Payouts</h5>
                  <span className="text-sm text-white opacity-75">
                    Same-day transfers
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="info-item animation-item flex-align gap-20">
                <span className="w-60 h-60 flex-center bg-white text-main-600 text-28 rounded-circle flex-shrink-0 font-bold">
                  <i className="ph ph-leaf"></i>
                </span>
                <div className="flex-grow-1">
                  <h5 className="mb-0 text-white fw-medium">Responsible</h5>
                  <span className="text-sm text-white opacity-75">
                    Eco-first recycling
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-120 bg-neutral-10 position-relative">
        <img
          src="/eduall/assets/images/shapes/shape2.png"
          alt=""
          className="shape two animation-scalation opacity-50"
        />
        <div className="container">
          <div className="section-heading text-center mb-60">
            <h5 className="text-main-600 mb-16 font-bold uppercase letter-spacing-2">
              Why Choose Us
            </h5>
            <h2 className="mb-24">Specialized Recycling Solutions</h2>
            <p className="text-neutral-500 max-w-640-px mx-auto text-lg leading-relaxed">
              From individual drop-offs to large-scale industrial clearances, we
              provide the infrastructure for a cleaner tomorrow.
            </p>
          </div>
          <div className="row gy-4 mx-lg-0">
            <div className="col-xl-3 col-sm-6">
              <div className="features-item style-two text-center transition-1 item-hover animation-item bg-white border border-neutral-30 rounded-32 p-32 shadow-sm h-100">
                <div className="features-item__icon w-100 h-100 flex-center bg-main-25 rounded-circle mx-auto mb-32 transition-1 text-main-600 text-48 max-w-100-px max-h-100-px border border-main-100">
                  <i className="ph ph-truck"></i>
                </div>
                <h5 className="mb-16 transition-2 font-bold text-neutral-700">
                  Collection Service
                </h5>
                <span className="text-neutral-500 text-md transition-2 leading-relaxed">
                  Prompt pickup for larger loads across Barnsley and South
                  Yorkshire.
                </span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="features-item style-two text-center transition-1 item-hover animation-item bg-white border border-neutral-30 rounded-32 p-32 shadow-sm h-100">
                <div className="features-item__icon w-100 h-100 flex-center bg-main-two-25 rounded-circle mx-auto mb-32 transition-1 text-main-two-600 text-48 max-w-100-px max-h-100-px border border-main-two-100">
                  <i className="ph ph-scales"></i>
                </div>
                <h5 className="mb-16 transition-2 font-bold text-neutral-700">
                  Onsite Weighing
                </h5>
                <span className="text-neutral-500 text-md transition-2 leading-relaxed">
                  Accurate and transparent digital weighing at your premises.
                </span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="features-item style-two text-center transition-1 item-hover animation-item bg-white border border-neutral-30 rounded-32 p-32 shadow-sm h-100">
                <div className="features-item__icon w-100 h-100 flex-center bg-main-three-25 rounded-circle mx-auto mb-32 transition-1 text-main-three-600 text-48 max-w-100-px max-h-100-px border border-main-three-100">
                  <i className="ph ph-currency-gbp"></i>
                </div>
                <h5 className="mb-16 transition-2 font-bold text-neutral-700">
                  Same-Day Payment
                </h5>
                <span className="text-neutral-500 text-md transition-2 leading-relaxed">
                  Fast bank transfers as soon as processing and ID check is
                  complete.
                </span>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="features-item style-two text-center transition-1 item-hover animation-item bg-white border border-neutral-30 rounded-32 p-32 shadow-sm h-100">
                <div className="features-item__icon w-100 h-100 flex-center bg-danger-25 rounded-circle mx-auto mb-32 transition-1 text-danger-600 text-48 max-w-100-px max-h-100-px border border-danger-100">
                  <i className="ph ph-recycle"></i>
                </div>
                <h5 className="mb-16 transition-2 font-bold text-neutral-700">
                  Eco-Processing
                </h5>
                <span className="text-neutral-500 text-md transition-2 leading-relaxed">
                  Responsible handling and sorting for maximum circular economy
                  impact.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works py-80 bg-neutral-5">
        <div className="container">
          <div className="section-heading text-center mb-60">
            <div className="flex-align d-inline-flex gap-8 mb-16">
              <span className="text-main-600 text-2xl d-flex">
                <i className="ph-bold ph-gear"></i>
              </span>
              <h5 className="text-main-600 mb-0 font-bold uppercase">
                Our Process
              </h5>
            </div>
            <h2 className="mb-24">How It Works</h2>
            <p className="max-w-640-px mx-auto text-neutral-500">
              Selling your scrap metal to Pinnacle is straightforward and
              secure. Follow these three simple steps to turn your waste into
              wealth.
            </p>
          </div>

          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="step-item p-32 bg-white rounded-32 border border-neutral-30 shadow-sm text-center h-100 animation-item transition-1">
                <div className="w-80 h-80 flex-center bg-main-600 text-white rounded-circle mx-auto mb-24 text-32 shadow-main-600 transition-1">
                  1
                </div>
                <h4 className="mb-16 font-bold text-neutral-700">Contact Us</h4>
                <p className="text-neutral-500 mb-0">
                  Call us or fill out the online quote form. We'll provide an
                  estimated price based on the current market rates and your
                  metal type.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="step-item p-32 bg-white rounded-32 border border-neutral-30 shadow-sm text-center h-100 animation-item transition-1">
                <div className="w-80 h-80 flex-center bg-main-two-600 text-white rounded-circle mx-auto mb-24 text-32 shadow-main-two-600 transition-1">
                  2
                </div>
                <h4 className="mb-16 font-bold text-neutral-700">
                  Evaluate & Weigh
                </h4>
                <p className="text-neutral-500 mb-0">
                  Bring your scrap to us or schedule a collection. We use
                  precision digital scales to weigh your metal and verify the
                  quality on the spot.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="step-item p-32 bg-white rounded-32 border border-neutral-30 shadow-sm text-center h-100 animation-item transition-1">
                <div className="w-80 h-80 flex-center bg-main-three-600 text-white rounded-circle mx-auto mb-24 text-32 shadow-main-three-600 transition-1">
                  3
                </div>
                <h4 className="mb-16 font-bold text-neutral-700">
                  Instant Payment
                </h4>
                <p className="text-neutral-500 mb-0">
                  Once weighed and ID checked, we process your payment
                  instantly via secure bank transfer. No waiting, no hidden
                  fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="prices" className="favorite-course py-80">
        <div className="container">
          <div className="section-heading text-center mb-60">
            <div className="flex-align d-inline-flex gap-8 mb-16">
              <span className="text-main-600 text-2xl d-flex">
                <i className="ph-bold ph-chart-line-up"></i>
              </span>
              <h5 className="text-main-600 mb-0 font-bold uppercase">
                Daily Rates
              </h5>
            </div>
            <h2 className="mb-24">Scrap Metal Prices</h2>
            <p className="max-w-640-px mx-auto">
              We pay top prices for all scrap metals. Rates updated regularly
              based on LME spot prices.
            </p>
          </div>

          <div className="row gy-4">
            <div className="col-xl-4 col-md-6">
              <div className="bg-white border border-neutral-30 animation-item rounded-16 p-12">
                <div className="bg-main-25 p-32 rounded-16 transition-2 border border-neutral-30 overflow-hidden position-relative text-center h-100">
                  <span className="positioned-rotation text-main-600 fw-bold text-lg bg-white d-block text-center p-6 shadow-sm">
                    Red Metals
                  </span>
                  <div className="w-84 h-84 bg-white p-16 box-shadow-md rounded-circle mx-auto d-inline-flex align-items-center justify-content-center position-relative text-main-600 text-44 border border-neutral-30">
                    <i className="ph-bold ph-sketch-logo"></i>
                  </div>
                  <h3 className="fw-bold mb-0 mt-32 text-neutral-700 transition-2">
                    Copper & Brass
                  </h3>
                  <span className="d-block border border-neutral-30 my-24 border-dashed"></span>
                  <ul className="d-flex flex-column gap-16 text-start">
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Dry Bright Copper
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        {priceData
                          ? `£${(priceData.price * 0.95).toFixed(0)} /T`
                          : "£/Tonne"}
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Heavy Brass
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        £/Tonne
                      </span>
                    </li>
                  </ul>
                  <div className="mt-40 pt-20">
                    <a
                      href="/quote"
                      className="btn btn-main rounded-pill flex-center gap-8 w-100 shadow-main-600"
                    >
                      Get Today's Rates
                      <i className="ph-bold ph-arrow-right d-flex text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="bg-white border border-neutral-30 animation-item rounded-16 p-12">
                <div className="bg-main-two-25 p-32 rounded-16 transition-2 border border-neutral-30 overflow-hidden position-relative text-center h-100">
                  <span className="positioned-rotation text-main-two-600 fw-bold text-lg bg-white d-block text-center p-6 shadow-sm">
                    High Volume
                  </span>
                  <div className="w-84 h-84 bg-white p-16 box-shadow-md rounded-circle mx-auto d-inline-flex align-items-center justify-content-center position-relative text-main-two-600 text-44 border border-neutral-30">
                    <i className="ph-bold ph-car"></i>
                  </div>
                  <h3 className="fw-bold mb-0 mt-32 text-neutral-700 transition-2">
                    Aluminium & Steel
                  </h3>
                  <span className="d-block border border-neutral-30 my-24 border-dashed"></span>
                  <ul className="d-flex flex-column gap-16 text-start">
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Clean Aluminium
                      </span>
                      <span className="fw-bold text-main-two-600 font-bold">
                        £/Tonne
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Stainless Steel
                      </span>
                      <span className="fw-bold text-main-two-600 font-bold">
                        £/Tonne
                      </span>
                    </li>
                  </ul>
                  <div className="mt-40 pt-20">
                    <a
                      href="/quote"
                      className="btn btn-main-two rounded-pill flex-center gap-8 w-100 shadow-main-two-600"
                    >
                      Check LME Pricing
                      <i className="ph-bold ph-arrow-right d-flex text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="bg-white border border-neutral-30 animation-item rounded-16 p-12">
                <div className="bg-main-three-25 p-32 rounded-16 transition-2 border border-neutral-30 overflow-hidden position-relative text-center h-100">
                  <span className="positioned-rotation text-main-three-600 fw-bold text-lg bg-white d-block text-center p-6 shadow-sm">
                    Industrial
                  </span>
                  <div className="w-84 h-84 bg-white p-16 box-shadow-md rounded-circle mx-auto d-inline-flex align-items-center justify-content-center position-relative text-main-three-600 text-44 border border-neutral-30">
                    <i className="ph-bold ph-factory"></i>
                  </div>
                  <h3 className="fw-bold mb-0 mt-32 text-neutral-700 transition-2">
                    Lead & Batteries
                  </h3>
                  <span className="d-block border border-neutral-30 my-24 border-dashed"></span>
                  <ul className="d-flex flex-column gap-16 text-start">
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Soft Scrap Lead
                      </span>
                      <span className="fw-bold text-main-three-600 font-bold">
                        £/Tonne
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Lead Acid Batteries
                      </span>
                      <span className="fw-bold text-main-three-600 font-bold">
                        Best Rate
                      </span>
                    </li>
                  </ul>
                  <div className="mt-40 pt-20">
                    <a
                      href="/quote"
                      className="btn btn-main-three rounded-pill flex-center gap-8 w-100 shadow-main-three-600"
                    >
                      Industrial Quotes
                      <i className="ph-bold ph-arrow-right d-flex text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
                  <h3 className="fw-bold mb-0 mt-32 text-neutral-700 transition-2">
                    Aluminum
                  </h3>
                  <span className="d-block border border-neutral-30 my-24 border-dashed"></span>
                  <ul className="d-flex flex-column gap-16 text-start">
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Alloy Wheels
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        Best Price
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Cast Aluminum
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        Market Price
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Painted / Clean
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        Call Today
                      </span>
                    </li>
                  </ul>
                  <div className="mt-40 pt-20">
                    <a
                      href="#quote"
                      className="btn btn-main rounded-pill flex-center gap-8 w-100"
                    >
                      Get Best Quote
                      <i className="ph-bold ph-arrow-right d-flex text-lg"></i>
                    </a>
                  </div>
                {/* </div>
              </div>
            </div> */}

            <div className="col-xl-4 col-md-6">
              <div className="bg-white border border-neutral-30 animation-item rounded-16 p-12">
                <div className="bg-main-25 p-32 rounded-16 transition-2 border border-neutral-30 overflow-hidden position-relative text-center h-100">
                  <span className="positioned-rotation text-main-600 fw-bold text-lg bg-white d-block text-center p-6 shadow-sm">
                    Bulk Iron
                  </span>
                  <div className="w-84 h-84 bg-white p-16 box-shadow-md rounded-circle mx-auto d-inline-flex align-items-center justify-content-center position-relative text-main-three-600 text-44 border border-neutral-30">
                    <i className="ph-bold ph-crown"></i>
                  </div>
                  <h3 className="fw-bold mb-0 mt-32 text-neutral-700 transition-2">
                    Steel / Iron
                  </h3>
                  <span className="d-block border border-neutral-30 my-24 border-dashed"></span>
                  <ul className="d-flex flex-column gap-16 text-start">
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Steel HMS 1 & 2
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        Per Tonne
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Light Iron
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        Per Tonne
                      </span>
                    </li>
                    <li className="flex-align gap-12">
                      <span className="text-neutral-500 text-md fw-medium flex-grow-1">
                        Mixed Scrap
                      </span>
                      <span className="fw-bold text-main-600 font-bold">
                        Best Price
                      </span>
                    </li>
                  </ul>
                  <div className="mt-40 pt-20">
                    <a
                      href="#quote"
                      className="btn btn-main rounded-pill flex-center gap-8 w-100"
                    >
                      Call for Bulk Price
                      <i className="ph-bold ph-arrow-right d-flex text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          {/* </div>
        </div>
      </section> */}

      <section id="why" className="py-120 bg-main-25">
        <div className="container">
          <div className="row align-items-center gy-40">
            <div className="col-lg-6">
              <div className="why-choose-content">
                <h2 className="mb-24 display-4">Why Pinnacle Metals?</h2>
                <div className="why-choose-list d-grid gap-24">
                  <div className="flex-align gap-20 animation-item transition-1 item-hover bg-white rounded-12 p-32 border border-neutral-30 shadow-sm">
                    <span className="w-60 h-60 flex-center bg-main-600 text-white text-28 rounded-circle flex-shrink-0">
                      <i className="ph ph-clock"></i>
                    </span>
                    <div className="flex-grow-1">
                      <h5 className="mb-4">Time-Saving Service</h5>
                      <p className="text-neutral-500 text-sm">
                        Efficient processing and same-day payments directly to
                        your bank.
                      </p>
                    </div>
                  </div>
                  <div className="flex-align gap-20 animation-item transition-1 item-hover bg-white rounded-12 p-32 border border-neutral-30 shadow-sm">
                    <span className="w-60 h-60 flex-center bg-main-two-600 text-white text-28 rounded-circle flex-shrink-0">
                      <i className="ph ph-shield-check"></i>
                    </span>
                    <div className="flex-grow-1">
                      <h5 className="mb-4">Fully Licensed & Insured</h5>
                      <p className="text-neutral-500 text-sm">
                        Operating with full environmental permits and regulatory
                        compliance.
                      </p>
                    </div>
                  </div>
                  <div className="flex-align gap-20 animation-item transition-1 item-hover bg-white rounded-12 p-32 border border-neutral-30 shadow-sm">
                    <span className="w-60 h-60 flex-center bg-main-three-600 text-white text-28 rounded-circle flex-shrink-0">
                      <i className="ph ph-users"></i>
                    </span>
                    <div className="flex-grow-1">
                      <h5 className="mb-4">Professional Support</h5>
                      <p className="text-neutral-500 text-sm">
                        Our friendly team is here to help with any queries or
                        price quotes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="why-choose-thumb ps-lg-4">
                <div className="position-relative">
                  <img
                    src="/eduall/assets/images/thumbs/course-img1.png"
                    alt=""
                    className="rounded-24 w-100 shadow-xl"
                  />
                  <div className="bg-main-600 p-32 rounded-24 position-absolute bottom-0 start-0 m-40 text-white d-none d-md-block shadow-lg">
                    <h3 className="text-white mb-8">Trustworthy</h3>
                    <p className="text-white opacity-90 mb-0">
                      The leading scrap metal recycler in Barnsley.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="quote"
        className="py-120 overflow-hidden position-relative bg-neutral-10"
      >
        <img
          src="/eduall/assets/images/shapes/shape1.png"
          alt=""
          className="shape one animation-scalation opacity-25"
        />
        <img
          src="/eduall/assets/images/shapes/shape6.png"
          alt=""
          className="shape six animation-rotation opacity-25"
        />
        <img
          src="/eduall/assets/images/shapes/shape8.png"
          alt=""
          className="shape eight animation-updown opacity-25"
        />

        <div className="container">
          <div className="row gy-48 align-items-center">
            <div className="col-lg-6">
              <div className="bg-white rounded-32 p-48 border border-neutral-30 shadow-xl h-100 position-relative">
                <div className="position-absolute top-0 start-50 translate-middle-x mt-n24">
                  {/* <span className="badge bg-main-600 text-white px-24 py-12 rounded-pill shadow-lg text-lg">
                    Contact Us
                  </span> */}
                </div>
                <h2 className="mb-40 text-neutral-700">
                  Connect With Our Yard
                </h2>
                <div className="row gy-40">
                  <div className="col-sm-12">
                    <div className="contact-info flex-align gap-20 animation-item">
                      <span className="w-68 h-68 flex-center bg-main-25 text-main-600 rounded-circle text-28 border border-main-100 shadow-sm transition-1">
                        <i className="ph ph-phone"></i>
                      </span>
                      <div>
                        <span className="text-neutral-400 text-sm d-block mb-4 font-bold uppercase">
                          Call Us Now
                        </span>
                        <a
                          href="tel:07398071934"
                          className="text-2xl font-bold text-neutral-700 hover-text-main-600 transition-1"
                        >
                          07398 071934
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="contact-info flex-align gap-20 animation-item my-28">
                      <span className="w-68 h-68 flex-center bg-main-two-25 text-main-two-600 rounded-circle text-28 border border-main-two-100 shadow-sm transition-1">
                        <i className="ph ph-envelope-open"></i>
                      </span>
                      <div>
                        <span className="text-neutral-400 text-sm d-block font-bold uppercase">
                          Email Us
                        </span>
                        <a
                          href="mailto:info@pinnaclemetals.co.uk"
                          className="text-xl font-bold text-neutral-700 hover-text-main-600 transition-1"
                        >
                          info@pinnaclemetals.co.uk
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="contact-info flex-align gap-20 animation-item">
                      <span className="w-68 h-68 flex-center bg-main-three-25 text-main-three-600 rounded-circle text-28 border border-main-three-100 shadow-sm transition-1">
                        <i className="ph ph-map-pin"></i>
                      </span>
                      <div>
                        <span className="text-neutral-400 text-sm d-block mb-4 font-bold uppercase">
                          Main Yard Location
                        </span>
                        <span className="text-lg font-bold text-neutral-700 d-block">
                          Acorn Way, Grimethorpe
                        </span>
                        <span className="text-neutral-500">
                          Barnsley, S72 7PE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-main-600 rounded-32 p-48 h-100 text-white shadow-xl border border-neutral-30 position-relative overflow-hidden animation-rotation--hover">
                <img
                  src="/eduall/assets/images/shapes/shape9.png"
                  className="position-absolute bottom-0 end-0 opacity-10"
                  alt=""
                />

                <div className="position-relative z-1">
                  <h3 className="text-white mb-32 border-bottom border-white border-opacity-20 pb-24 display-6">
                    Business Hours
                  </h3>
                  <div className="d-grid gap-24">
                    <div className="flex-between">
                      <span className="text-lg opacity-80">
                        Monday - Friday
                      </span>
                      <span className="fw-bold font-bold text-xl bg-white bg-opacity-10 px-16 py-4 rounded-pill">
                        7:00 AM - 4:00 PM
                      </span>
                    </div>
                    <div className="flex-between border-top border-white border-opacity-10 pt-24 text-white-50">
                      <span className="text-lg">Saturday</span>
                      <span className="fw-medium font-medium italic">
                        By Appointment Only
                      </span>
                    </div>
                    <div className="flex-between text-white-50">
                      <span className="text-lg">Sunday</span>
                      <span className="fw-medium font-medium italic">
                        Closed
                      </span>
                    </div>
                  </div>
                  <div className="mt-60 pt-40 border-top border-white border-opacity-20">
                    <p className="text-white opacity-80 text-lg leading-relaxed">
                      Need a weight ticket for compliance? Register an
                      industrial account to manage documents and view payment
                      history on our secure portal.
                    </p>
                    <a
                      href="/apply"
                      className="btn btn-white rounded-pill mt-32 px-40 h-60-px flex-center gap-12 text-main-600 font-bold hover-bg-neutral-100 transition-1 shadow-lg"
                    >
                      Process Account Setup
                      <i className="ph ph-arrow-right font-bold text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <footer className="footer bg-main-25 py-60 border-top border-neutral-30">
        <div className="container">
          <div className="flex-between flex-wrap gap-24 text-center text-sm-start">
            <div className="logo-section">
              <img
                src="/eduall/assets/images/logo/logo.png"
                alt="Pinnacle Metals"
                className="mb-16"
                style={{ maxHeight: 40 }}
              />
              <p className="text-neutral-500 mb-0">
                © {new Date().getFullYear()} Pinnacle Metals. Licensed Waste
                Carrier.
              </p>
            </div>
            <div className="social-links flex-align gap-24">
              <a
                href="#"
                className="text-main-600 text-2xl hover-text-main-two-600 transition-1"
              >
                <i className="ph-bold ph-facebook-logo"></i>
              </a>
              <a
                href="#"
                className="text-main-600 text-2xl hover-text-main-two-600 transition-1"
              >
                <i className="ph-bold ph-instagram-logo"></i>
              </a>
              <a
                href="#"
                className="text-main-600 text-2xl hover-text-main-two-600 transition-1"
              >
                <i className="ph-bold ph-twitter-logo"></i>
              </a>
            </div>
          </div>
        </div>
      </footer> */}
    </main>
  );
}

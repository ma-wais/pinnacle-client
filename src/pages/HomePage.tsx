import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="home-page1">
      <section className="hero_main_area1">
        <div
          className="hero1"
          style={{ backgroundImage: "url('/assets/img/bg/hero1-bg.png')" }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5">
                <div className="main-headding">
                  <span className="span">
                    <img src="/assets/img/icons/span1.png" alt="" />
                    Pinnacle Metals Recycling
                  </span>
                  <h1 className="title tg-element-title">
                    Scrap metal recycling that delivers
                    <span className="after"> same-day payouts</span>
                  </h1>
                  <div className="space16"></div>
                  <p>
                    Serving Barnsley and South Yorkshire with transparent
                    weighing, competitive rates and compliant processing for
                    ferrous and non-ferrous scrap.
                  </p>

                  <div className="space30"></div>
                  <div className="buttons">
                    <Link className="theme-btn1" to="/quote">
                      Get A Quote{" "}
                      <span>
                        <i className="bi bi-arrow-right"></i>
                      </span>
                    </Link>
                    <a className="play-btn" href="tel:07398071934">
                      <span>
                        <i className="bi bi-telephone"></i>
                      </span>{" "}
                      Call 07398 071934
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="hero1-all-images">
                  {/* <div className="image1">
                    <img src="/assets/img/hero/hero1-image1.png" alt="" />
                  </div> */}
                  <div className="image2">
                    <img src="/assets/img/hero/hero2-main-img1.png" alt="" />
                  </div>
                  <div className="image3 shape-animaiton3">
                    <img src="/assets/img/hero/hero1-image3.png" alt="" />
                  </div>
                  {/* <div className="image4 shape-animaiton3">
                    <img src="/assets/img/hero/hero1-image4.png" alt="" />
                  </div> */}
                  <div className="shape1">
                    <img src="/assets/img/shapes/header1-shape1.png" alt="" />
                  </div>
                  <div className="shape2">
                    <img src="/assets/img/shapes/header1-shape2.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row hero-bottom-area">
            <div className="col-lg-3">
              <div className="single-box">
                <div className="icon">
                  <img src="/assets/img/icons/hero-bottom-icon1.png" alt="" />
                </div>
                <div className="headding">
                  <h5>Licensed & Compliant</h5>
                  <p>
                    Fully registered and aligned with UK recycling standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="single-box">
                <div className="icon">
                  <img src="/assets/img/icons/hero-bottom-icon2.png" alt="" />
                </div>
                <div className="headding">
                  <h5>Transparent Weights</h5>
                  <p>Certified digital scales with clear on-site receipts.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="single-box">
                <div className="icon">
                  <img src="/assets/img/icons/hero-bottom-icon3.png" alt="" />
                </div>
                <div className="headding">
                  <h5>Same-Day Payments</h5>
                  <p>
                    BACS payments processed as soon as your load is weighed.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="single-box">
                <div className="icon">
                  <img src="/assets/img/icons/hero-bottom-icon4.png" alt="" />
                </div>
                <div className="headding">
                  <h5>Local Collections</h5>
                  <p>Fast pickups for trade and industrial volume loads.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about1 sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-image">
                {/* <div className="image1">
                  <img src="/assets/img/about/about1-img1.png" alt="" />
                </div> */}
                <div className="image2 image-anime">
                  <img src="/assets/img/hero/hero2-main-img2.png" alt="" />
                </div>
                <div className="icon-box">
                  <img src="/assets/img/icons/about1-shape-icon.png" alt="" />
                  <h4>24/7 Support</h4>
                  <p>We respond fast for urgent collections.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="heading1">
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" /> About Us
                </span>
                <h2 className="title tg-element-title">
                  A trusted scrap metal partner for households and industry
                </h2>
                <div className="space16"></div>
                <p>
                  Pinnacle Metals is a licensed recycling yard in Barnsley. We
                  serve contractors, fabricators, demolition teams and the local
                  community with honest weights, clear pricing, and rapid
                  payments.
                </p>
                <ul className="list">
                  <li>
                    <span>
                      <i className="bi bi-check-lg"></i>
                    </span>{" "}
                    Certified digital weighbridge and trade receipts.
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check-lg"></i>
                    </span>{" "}
                    Domestic and commercial acceptance with ID verification.
                  </li>
                  <li>
                    <span>
                      <i className="bi bi-check-lg"></i>
                    </span>{" "}
                    South Yorkshire collection for bulk loads.
                  </li>
                </ul>
                <div className="space30"></div>
                <div>
                  <Link className="theme-btn1" to="/contact">
                    Talk to the Yard{" "}
                    <span>
                      <i className="bi bi-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service sp">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto text-center">
              <div className="heading1">
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" /> Our Services
                </span>
                <h2 className="title tg-element-title">
                  Reliable recycling services for every type of load
                </h2>
              </div>
            </div>
          </div>

          <div className="space30"></div>
          <div className="row">
            {[
              {
                icon: "/assets/img/icons/service-icon1.png",
                title: "Ferrous & Non-Ferrous",
                desc: "Steel, copper, brass, aluminium, lead and alloys with clear grading.",
              },
              {
                icon: "/assets/img/icons/service-icon2.png",
                title: "Site Clearances",
                desc: "Demolition and factory clearances with scheduled collections.",
              },
              {
                icon: "/assets/img/icons/service-icon3.png",
                title: "Cable & Cat Converters",
                desc: "Insulated cable, catalytic converters, and specialist materials.",
              },
              {
                icon: "/assets/img/icons/service-icon4.png",
                title: "Trade Accounts",
                desc: "Dedicated pricing and account access for regular suppliers.",
              },
            ].map((item) => (
              <div key={item.title} className="col-lg-3 col-md-6">
                <div className="single-box">
                  <div className="icon">
                    <img src={item.icon} alt="" />
                  </div>
                  <div className="heading1">
                    <h4>{item.title}</h4>
                    <div className="space16"></div>
                    <p>{item.desc}</p>
                    <div className="space16"></div>
                    <Link to="/quote" className="learn">
                      Get Quote{" "}
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
            ))}
          </div>
        </div>
      </section>

      <section className="work sp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="heading1">
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" /> Our Process
                </span>
                <h2 className="title tg-element-title">
                  A simple, transparent recycling experience
                </h2>
                <div className="space16"></div>
                <p>
                  From arrival to payout, we follow a clear process that keeps
                  you informed and compliant.
                </p>

                {[
                  {
                    img: "/assets/img/icons/work-iocn1.png",
                    title: "Check-In & ID",
                    desc: "We confirm identification and classify your load accurately.",
                  },
                  {
                    img: "/assets/img/icons/work-iocn2.png",
                    title: "Certified Weighing",
                    desc: "Digital weighing with trade receipts and material grades.",
                  },
                  {
                    img: "/assets/img/icons/work-iocn3.png",
                    title: "Instant Payment",
                    desc: "BACS payment processed promptly after weighing.",
                  },
                ].map((item) => (
                  <div key={item.title} className="single-items">
                    <div className="icon">
                      <img src={item.img} alt="" />
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <div className="space10"></div>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space30"></div>
              <Link className="theme-btn1" to="/contact">
                Arrange Collection{" "}
                <span>
                  <i className="bi bi-arrow-right"></i>
                </span>
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="work-images">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="image image-anime">
                      <img src="/assets/img/work/crypto.png" alt="dawd" />
                    </div>
                    <div className="image image-anime">
                      <img src="/assets/img/work/mining.png" alt="dawda" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="image image-anime">
                      <img src="/assets/img/work/pick.png" alt="dawda" />
                    </div>
                  </div>
                </div>
                <img
                  src="/assets/img/bg/work-bg.png"
                  alt=""
                  className="bg-image shape-animaiton4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial sp testimonial_area1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto text-center">
              <div className="heading1">
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" /> Testimonials
                </span>
                <h2 className="title tg-element-title">
                  What our customers say about Pinnacle Metals
                </h2>
              </div>
            </div>
          </div>
          <div className="space30"></div>
          <div className="row">
            {[
              {
                name: "Barnsley Fabrication Ltd",
                text: "Clear pricing, quick turnaround and smooth collections. We rely on Pinnacle for consistent payouts.",
              },
              {
                name: "South Yorkshire Demolition",
                text: "Site clearances were handled fast and safely. We got paid the same day without delays.",
              },
              {
                name: "Independent Trades",
                text: "Friendly yard team, fair weights and honest grading. The process is always transparent.",
              },
            ].map((item) => (
              <div key={item.name} className="col-lg-4">
                <div className="single-box">
                  <div className="icon">
                    <img src="/assets/img/icons/qute.svg" alt="" />
                  </div>
                  <div className="heading1">
                    <p>{item.text}</p>
                    <div className="space20"></div>
                    <h4>{item.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="heading1-w">
                <h2 className="title tg-element-title">
                  Ready to recycle? Get a fast, transparent quote today.
                </h2>
                <div className="space16"></div>
                <p>
                  Send us your material details and estimated weight. We will
                  respond quickly with the latest market rate and collection
                  options.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="buttons">
                <Link className="cta-btn1" to="/quote">
                  Request a Quote{" "}
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
                <Link className="cta-btn2" to="/contact">
                  Speak to the Team{" "}
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
      </section>
    </main>
  );
}

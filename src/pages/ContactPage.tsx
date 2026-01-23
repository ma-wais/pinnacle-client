import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <main>
      <div className="common-hero">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-lg-6 m-auto">
              <div className="main-heading">
                <h1>Contact Us</h1>
                <div className="space16"></div>
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" />
                  <Link to="/">Home</Link>
                  <span className="arrow">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                  Contact Us
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="hero10-benar">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="marquee-wrap marquee-wrap-inner">
                <div className="marquee-text">
                  {[
                    "/assets/img/logo/slider-logo1.png",
                    "/assets/img/logo/slider-logo2.png",
                    "/assets/img/logo/slider-logo3.png",
                    "/assets/img/logo/slider-logo4.png",
                    "/assets/img/logo/slider-logo5.png",
                    "/assets/img/logo/slider-logo6.png",
                    "/assets/img/logo/slider-logo7.png",
                  ].map((logo, index) => (
                    <div key={`${logo}-${index}`} className="brand-single-box">
                      <img src={logo} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="slider-after"></div>
        </div>
      </section>

      <div className="space100"></div>
      <div className="contact-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-boxs">
                <div className="heading1">
                  <h2>Contact Information</h2>
                  <div className="space16"></div>
                  <p>
                    Speak to the yard team for same-day pricing, collections,
                    and compliance questions.
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
                    <h5>Call Us</h5>
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
                    <h5>Email Us</h5>
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
                    <h5>Yard Location</h5>
                    <span className="text">
                      Acorn Way, Grimethorpe, Barnsley, S72 7PE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-form-details">
                <form action="#">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="text" placeholder="First Name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="text" placeholder="Last Name" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="email" placeholder="Email" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="single-input">
                        <input type="tel" placeholder="Phone" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="single-input">
                        <input type="text" placeholder="Subject" />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="single-input">
                        <textarea
                          cols={30}
                          rows={5}
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <button className="theme-btn1" type="button">
                        Submit{" "}
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

      <div className="space100"></div>
      <div className="contact-map-page">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2363.344403666016!2d-1.391624!3d53.58661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48796da99846b97d%3A0xe679626359d9c24!2sAcorn%20Way%2C%20Barnsley%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="cta">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="heading1-w">
                <h2 className="title tg-element-title">
                  Need a collection or a same-day rate? We are ready.
                </h2>
                <div className="space16"></div>
                <p>
                  Send your material list and estimated weights. Our team will
                  respond quickly with pricing and pickup options.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <main className="contact-page bg-neutral-10">
      {/* Breadcrumb */}
      <section
        className="breadcrumb py-120 bg-main-600 position-relative overflow-hidden"
        style={{
          backgroundImage: "url('/eduall/assets/images/shapes/shape9.png')",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="container">
          <div className="breadcrumb-content text-center">
            <h1 className="mb-16 text-white display-4">
              Connect With Our Yard
            </h1>
            <p className="text-white opacity-75 text-lg mb-0 max-w-640-px mx-auto">
              Got a load of scrap or need a specialized industrial collection?
              We're just a message away.
            </p>
          </div>
        </div>
        <img
          src="/eduall/assets/images/shapes/shape1.png"
          alt=""
          className="shape one animation-scalation opacity-25"
        />
      </section>

      <section className="contact-section py-120 mt-n120 position-relative z-1">
        <div className="container">
          <div className="row gy-48">
            <div className="col-lg-5">
              <div className="contact-info-wrapper pe-lg-4">
                <div className="bg-white rounded-32 p-40 border border-neutral-30 shadow-xl mb-32">
                  <h3 className="mb-32">Location Details</h3>
                  <div className="d-grid gap-32">
                    <div className="contact-info-item d-flex gap-20">
                      <span className="w-52 h-52 flex-center bg-main-25 text-main-600 text-2xl rounded-circle flex-shrink-0 border border-main-100">
                        <i className="ph-fill ph-map-pin"></i>
                      </span>
                      <div>
                        <h6 className="mb-4">Main Yard</h6>
                        <p className="text-neutral-500 mb-0">
                          Acorn Way, Grimethorpe, Barnsley, S72 7PE
                        </p>
                      </div>
                    </div>

                    <div className="contact-info-item d-flex gap-20 border-top border-neutral-30 pt-32">
                      <span className="w-52 h-52 flex-center bg-main-two-25 text-main-two-600 text-2xl rounded-circle flex-shrink-0 border border-main-two-100">
                        <i className="ph-fill ph-phone-call"></i>
                      </span>
                      <div>
                        <h6 className="mb-4">Direct Line</h6>
                        <a
                          href="tel:07398071934"
                          className="text-xl font-bold text-neutral-700 hover-text-main-600 transition-1"
                        >
                          07398 071934
                        </a>
                      </div>
                    </div>

                    <div className="contact-info-item d-flex gap-20 border-top border-neutral-30 pt-32">
                      <span className="w-52 h-52 flex-center bg-main-three-25 text-main-three-600 text-2xl rounded-circle flex-shrink-0 border border-main-three-100">
                        <i className="ph-fill ph-envelope"></i>
                      </span>
                      <div>
                        <h6 className="mb-4">Support Email</h6>
                        <a
                          href="mailto:info@pinnaclemetals.co.uk"
                          className="text-neutral-500 hover-text-main-600 transition-1"
                        >
                          info@pinnaclemetals.co.uk
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-main-600 rounded-32 p-40 text-white shadow-xl overflow-hidden position-relative">
                  <img
                    src="/eduall/assets/images/shapes/shape9.png"
                    className="position-absolute end-0 bottom-0 opacity-10"
                    alt=""
                  />
                  <h4 className="text-white mb-24">Yard Access Hours</h4>
                  <div className="d-grid gap-16">
                    <div className="flex-between border-bottom border-white border-opacity-20 pb-12">
                      <span className="opacity-75">Monday - Friday</span>
                      <span className="fw-bold">07:00 - 16:00</span>
                    </div>
                    <div className="flex-between">
                      <span className="opacity-75">Saturday - Sunday</span>
                      <span className="badge bg-white text-main-600 rounded-pill px-16 py-8 ">
                        Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="bg-white p-48 p-sm-60 rounded-32 border border-neutral-30 shadow-xl h-100">
                <div className="mb-40">
                  <h3 className="mb-12">Send an Inquiry</h3>
                  <p className="text-neutral-500">
                    Expect a response within 2 business hours during yard hours.
                  </p>
                </div>

                <form className="row gy-32">
                  <div className="col-sm-12">
                    <label className="form-label text-neutral-700 font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="common-input rounded-pill  h-60-px px-24 border-neutral-40 mx-12"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-sm-12 my-12">
                    <label className="form-label text-neutral-700 font-bold mb-12">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5 mx-12"
                      placeholder="name@email.com"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-neutral-700 font-bold mb-12">
                      Communication Topic
                    </label>
                    <select className="common-input rounded-pill h-60-px px-24 border-neutral-40 bg-neutral-5 mx-12">
                      <option>General Inquiry</option>
                      <option>Industrial Collection Request</option>
                      <option>Waste Carriers License Verification</option>
                      <option>Billing / Invoicing Question</option>
                    </select>
                  </div>
                  <label className="mt-12">Your Message</label>
                  <div className="col-12">
                    <textarea
                      className=" rounded-24 h-160-px p-24 border-neutral-40 bg-neutral-5 my-12"
                      placeholder="How can our yard team assist you today?"
                    ></textarea>
                  </div>
                  <div className="col-12 mt-40">
                    <button
                      type="button"
                      className="btn btn-main rounded-pill h-60-px px-60 w-100 flex-center gap-12 font-bold text-lg shadow-sm"
                    >
                      Submit Message
                      <i className="ph ph-paper-plane-tilt text-xl"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section h-480-px w-100 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2363.344403666016!2d-1.391624!3d53.58661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48796da99846b97d%3A0xe679626359d9c24!2sAcorn%20Way%2C%20Barnsley%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}

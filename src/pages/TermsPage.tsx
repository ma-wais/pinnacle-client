import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <main>
      <div className="common-hero">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-lg-8 m-auto">
              <div className="main-heading">
                <h1>Terms & Conditions</h1>
                <div className="space16"></div>
                <span className="span">
                  <img src="/assets/img/icons/span1.png" alt="" />
                  <Link to="/">Home</Link>
                  <span className="arrow">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                  Terms & Conditions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space100"></div>
      <section className="about1">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="heading1">
                <h2>Overview</h2>
                <div className="space16"></div>
                <p>
                  These Terms & Conditions govern the use of the Pinnacle Metals
                  website and services. By accessing our site, requesting a
                  quote, or using our recycling services, you agree to the terms
                  below.
                </p>

                <div className="space30"></div>
                <h3>1. Service Eligibility</h3>
                <p>
                  We accept scrap metal from domestic, trade, and commercial
                  customers subject to ID verification and applicable UK
                  regulations. We may refuse loads that do not meet compliance
                  requirements or safety standards.
                </p>

                <div className="space20"></div>
                <h3>2. Weighing & Pricing</h3>
                <p>
                  Prices are based on material type, grade, and live market
                  rates. All weights are recorded on certified digital scales.
                  Quotes are indicative and may be adjusted after inspection.
                </p>

                <div className="space20"></div>
                <h3>3. Payments</h3>
                <p>
                  We process payments via BACS in accordance with UK scrap metal
                  regulations. Cash payments are not available. Payment details
                  must match verified customer information.
                </p>

                <div className="space20"></div>
                <h3>4. Collection Services</h3>
                <p>
                  Collection availability depends on load volume, location, and
                  scheduling. Customers must ensure safe access for our vehicles
                  and provide accurate load descriptions.
                </p>

                <div className="space20"></div>
                <h3>5. Compliance & Documentation</h3>
                <p>
                  We may request documentation such as proof of ownership, waste
                  transfer notes, or trade references where required. Failing to
                  provide documentation may delay or prevent processing.
                </p>

                <div className="space20"></div>
                <h3>6. Liability</h3>
                <p>
                  Pinnacle Metals is not liable for loss or damage arising from
                  inaccurate load descriptions, unsafe access, or delays beyond
                  our reasonable control. Customers remain responsible for any
                  hazardous materials not declared prior to delivery.
                </p>

                <div className="space20"></div>
                <h3>7. Updates to Terms</h3>
                <p>
                  We may update these terms periodically. The latest version
                  will always be posted on this page.
                </p>

                <div className="space40"></div>
                <p>
                  If you have questions about these terms, please contact us at
                  <a href="mailto:info@pinnaclemetals.co.uk">
                    {" "}
                    info@pinnaclemetals.co.uk
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

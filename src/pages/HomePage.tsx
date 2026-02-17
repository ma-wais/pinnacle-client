import { useEffect, useState } from "react";
import "./HomePage.css";

const quickStats = [
  "Licensed Recycler",
  "Fair Pricing",
  "Metal Collection",
  "Eco Recycling",
  "Valued Experts",
  "UK Coverage",
  "Private Metals",
  "Fast Payments",
];

const services = [
  {
    title: "Collection Service",
    description:
      "We collect scrap metal from your location. Pay for your collections and large quantities.",
    image: "/assets/img/work/service-collection.jpg",
  },
  {
    title: "Onsite Weighing",
    description:
      "Accurate on-site weighing ensures secure weight and fair pricing for all materials.",
    image: "/assets/img/work/service-weighing.jpg",
  },
  {
    title: "Same-Day Payment",
    description:
      "Get paid instantly when your scrap is processed. Bank transfer available.",
    image: "/assets/img/work/service-payment.jpg",
  },
  {
    title: "Responsible Recycling",
    description:
      "All materials are processed in an environmentally responsible manner.",
    image: "/assets/img/work/service-recycling.jpg",
  },
  {
    title: "Scrap Collection",
    description:
      "We offer a convenient collection service for businesses and large quantities.",
    image: "/assets/img/work/service-scrap.jpg",
  },
  {
    title: "Commercial Services",
    description:
      "Tailored solutions for businesses with regular scrap metal needs and volume loads.",
    image: "/assets/img/work/service-commercial.jpg",
  },
];

const materialTags = [
  "Copper",
  "Aluminium",
  "Brass",
  "Lead",
  "Steel",
  "Iron",
  "Stainless Steel",
  "Car Batteries",
];

const testimonials = [
  {
    name: "Kristie Abernathy",
    role: "Legacy Mobility Owner",
    text: "Their team is friendly, the process was efficient, and we were paid quickly. Highly recommend Pinnacle Metals.",
    src: "/assets/img/work/testimonial-1.jpg",
  },
  {
    name: "Stacy Bach",
    role: "Legacy Mobility Officer",
    text: "Pinnacle Metals consistently delivers fast quality service to our team. Their team is responsive and transparent.",
    src: "/assets/img/work/testimonial-2.jpg",
  },
  {
    name: "Shelly Schmitt",
    role: "Customer Relations Specialist",
    text: "The quality and reliability of the team are unmatched. Their customer service is always prompt and professional.",
    src: "/assets/img/work/testimonial-3.jpg",
  },
  {
    name: "Megan Harper",
    role: "Procurement Manager",
    text: "Excellent communication, competitive prices and fast processing. Their service is dependable every time.",
    src: "/assets/img/work/testimonial-4.jpg",
  },
  {
    name: "Noah Flynn",
    role: "Operations Supervisor",
    text: "Smooth collection scheduling and transparent payment process. We trust the team for regular loads.",
    src: "/assets/img/work/testimonial-5.jpg",
  },
];

function getSlidesPerView() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 860) return 1;
  if (window.innerWidth < 1120) return 2;
  return 3;
}

export default function HomePage() {
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView);
  const [slideIndex, setSlideIndex] = useState(0);

  const maxStartIndex = Math.max(0, testimonials.length - slidesPerView);

  useEffect(() => {
    const onResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setSlideIndex((prev) => Math.min(prev, maxStartIndex));
  }, [maxStartIndex]);

  useEffect(() => {
    if (maxStartIndex === 0) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 4500);

    return () => window.clearInterval(timer);
  }, [maxStartIndex]);

  const handlePrev = () => {
    setSlideIndex((prev) => (prev <= 0 ? maxStartIndex : prev - 1));
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
  };

  return (
    <main className="pm-home">
      <section className="pm-hero" id="home">
        <div className="pm-hero-overlay" />

        <div className="pm-hero-content">
          <p className="pm-hero-eyebrow">
            Pinnacle Metal Services Trusted Across The UK
          </p>
          <h1>
            Trusted Scrap Metal Recycling &amp;
            <br /> Collection Services Across The UK
          </h1>
          <p className="pm-hero-copy">
            Pinnacle Metals provides reliable, fast turnover scrap metal
            recycling solutions for businesses and individuals. With precision
            weighing, transparent rates and eco-friendly processing, we deliver
            secure, convenient and compliant recycling.
          </p>
          <div className="pm-hero-buttons">
            <a href="#quote" className="pm-btn pm-btn-secondary">
              Get A Quote{" "}
              <i
                className="bi bi-arrow-right-short"
                style={{
                  fontSize: "20px",
                  padding: "0",
                }}
              />
            </a>
            <a href="#services" className="pm-btn pm-btn-primary">
              View All Services{" "}
              <i
                className="bi bi-arrow-right-short"
                style={{
                  fontSize: "20px",
                  padding: "0",
                }}
              />
            </a>
          </div>
        </div>
      </section>

      <section className="pm-quick-strip">
        <div className="pm-container pm-quick-grid">
          {quickStats.map((item) => (
            <div key={item} className="pm-quick-item">
              <li>{item}</li>
            </div>
          ))}
        </div>
      </section>

      <div className="pm-process-section">
        <div className="pm-process-container">
          <div className="pm-process-item">
            <div className="pm-process-icon">
              <img src="/assets/img/work/collect.png" alt="Collect" />
            </div>
            <div className="pm-process-content">
              <h3 className="pm-process-title">Collect</h3>
              <p className="pm-process-text">
                We arrange convenient scrap metal collections from sites,
                businesses, and individuals.
              </p>
            </div>
          </div>

          <div className="pm-process-divider"></div>

          <div className="pm-process-item">
            <div className="pm-process-icon">
              <img src="/assets/img/work/justice.png" alt="Weigh" />
            </div>
            <div className="pm-process-content">
              <h3 className="pm-process-title">Weigh & Value</h3>
              <p className="pm-process-text">
                All materials are accurately weighed and priced at competitive
                market rates.
              </p>
            </div>
          </div>

          <div className="pm-process-divider"></div>

          <div className="pm-process-item">
            <div className="pm-process-icon">
              <img src="/assets/img/work/Layer.png" alt="Recycle" />
            </div>
            <div className="pm-process-content">
              <h3 className="pm-process-title">Recycle & Pay</h3>
              <p className="pm-process-text">
                Metals are responsibly recycled with fast, secure payments made
                promptly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="about" className="pm-about">
        <div className="pm-container pm-about-grid">
          <div className="pm-about-copy">
            <p className="pm-section-eyebrow">About Us</p>
            <h2>Trusted Experts In Scrap Metal Recycling</h2>
            <p>
              Pinnacle Metals is a professional scrap metal recycling company
              providing reliable collection and recycling services across the
              UK. With a strong focus on transparency, fair pricing, and
              responsible recycling, we help businesses and individuals maximise
              the value of their scrap metal while supporting sustainable
              practices.
            </p>
            <ul>
              <li>Fully licensed and compliant scrap metal recycler</li>
              <li>Competitive market-based pricing and real value</li>
              <li>Reliable collections for commercial and industrial sites</li>
            </ul>
            <div className="pm-about-mini-grid">
              <div>
                <img src="/assets/img/hero/waste.png" alt="" />
                <h4>Scrap Metal Services</h4>
                <p>
                  Trusted and dependable metal recycling with reliable
                  collections.
                </p>
              </div>
              <div>
                <img src="/assets/img/hero/recycle-sign.png" alt="" />
                <h4>Responsible Recycling</h4>
                <p>
                  Environmentally compliant recycling with sustainable
                  practices.
                </p>
              </div>
            </div>
            <a
              href="#services"
              className="pm-btn pm-btn-primary"
              style={{
                backgroundColor: "#ba932a",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#fff";
              }}
            >
              Learn More
            </a>
          </div>

          <div className="pm-about-image-wrap">
            <img
              src="/assets/img/hero/hero2-main-img3.jpg"
              alt="Scrap metal team"
            />
            <div className="pm-exp-box">
              <h3>20+</h3>
              <span>Years Of Experience</span>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="pm-services">
        <div className="pm-container">
          <div className="pm-section-header">
            <div>
              <p className="pm-section-eyebrow">Our Services</p>
              <h2>
                Waste Management Solutions Tailored <br /> To You
              </h2>
            </div>
            <a href="#" className="pm-btn pm-btn-primary mb-22">
              View All
            </a>
          </div>

          <div className="pm-services-grid">
            {services.map((service) => (
              <article key={service.title} className="pm-service-card">
                <img src={service.image} alt={service.title} />
                <div className="pm-service-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#" className="pm-read-more">
                    Read More{" "}
                    <i
                      className="bi bi-arrow-right "
                      style={{
                        fontSize: "20px",
                        marginTop: "4px",
                      }}
                    />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="pm-process">
        <div className="pm-container">
          <div className="pm-process-top">
            <div className="pm-process-image">
              <img
                src="/assets/img/work/metal-piece.jpg"
                alt="Industrial precision cutting"
              />
              <div className="pm-rating">
                4.8+ <span>Total Rating</span>
              </div>
            </div>
            <div className="pm-process-copy">
              <p className="pm-section-eyebrow color-gold">Why Choose Us</p>
              <h2>
                Trusted Metal Solutions With Quality, Expertise &amp;
                Reliability
              </h2>
              <p>
                At Pinnacle Metals, we combine trusted industry expertise with
                modern recycling methods to deliver a professional, fast and
                secure service for our clients. Every stage is managed with
                precision to ensure fair pricing and long-term client
                confidence.
              </p>
              <a
                href="#"
                className="pm-btn pm-btn-primary mt-20"
                style={{
                  backgroundColor: "#ba932a",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#fff";
                }}
              >
                See Our Process
              </a>
            </div>
          </div>

          <div className="pm-benefits-grid">
            <article>
              <img src="/assets/img/work/medal.png" alt="" />
              <h4>Superior Quality</h4>
              <p>High-grade metal and precise market-focused services.</p>
            </article>
            <article>
              <img src="/assets/img/work/professional-services.png" alt="" />
              <h4>Experienced Team</h4>
              <p>Skilled professionals with years of industry expertise.</p>
            </article>
            <article>
              <img src="/assets/img/work/delivery-truck.png" alt="" />
              <h4>Timely Delivery</h4>
              <p>Reliable supply chain ensuring projects stay on schedule.</p>
            </article>
            <article>
              <img src="/assets/img/work/love.png" alt="" />
              <h4>Customer Focused</h4>
              <p>Personalized service with attention to every detail.</p>
            </article>
          </div>

          <div className="pm-how-it-works pt-20">
            <p className="pm-section-eyebrow color-gold">How It Works</p>
            <h3>How Our Metal Recycling Process Works</h3>
            <p>
              Simple steps from drop-off to payment — fast, transparent, and
              responsible.
            </p>
            <div className="pm-steps-grid">
              <article>
                <img src="/assets/img/work/one.png" alt="" />
                <h4>Arrive At Our Yard</h4>
                <p>
                  Bring your scrap to our trusted facility for fast sorting and
                  intake.
                </p>
              </article>
              <article>
                <img src="/assets/img/work/two.png" alt="" />
                <h4>Get Weighed</h4>
                <p>
                  We use certified digital scales for transparent and accurate
                  measurements.
                </p>
              </article>
              <article>
                <img src="/assets/img/work/three.png" alt="" />
                <h4>Unload Your Scrap</h4>
                <p>
                  Our team assists with safe offloading and efficient material
                  separation.
                </p>
              </article>
              <article>
                <img src="/assets/img/work/four.png" alt="" />
                <h4>Get Paid Instantly</h4>
                <p>
                  Receive same-day payment once your materials are processed.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="materials" className="pm-materials">
        <div className="pm-container pm-materials-grid">
          <div>
            <p className="pm-section-eyebrow color-gold">What We Accept</p>
            <h2>Materials We Work With</h2>
            <p className="my-30">
              At Pinnacle Metals, we combine industry-leading expertise with
              state-of-the-art technology to deliver premium metal products and
              solutions. Our commitment to quality, efficiency, and customer
              satisfaction ensures that every project is completed to the
              highest standards, on time, and within budget. We pride ourselves
              on innovative approaches that meet the evolving needs of our
              clients. With a focus on sustainability and precision, we aim to
              provide solutions that are not only reliable but also
              environmentally responsible.
            </p>
            <a href="#" className="pm-btn pm-btn-primary">
              Full List of Materials
            </a>
          </div>
          <div className="pm-tags-grid">
            {materialTags.map((tag) => (
              <div key={tag}>
                <img src="/assets/img/work/settings.png" alt="" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-testimonials">
        <div className="pm-container">
          <div className="pm-section-header">
            <div className="mx-20">
              <p className="pm-section-eyebrow">Testimonial</p>
              <h2>Hear It From Our Clients</h2>
              <p className="text-testimonials">
                We take pride in delivering high-quality metal solutions and
                exceptional service. Hear directly from our satisfied clients
                about their experience working with Pinnacle Metals.
              </p>
            </div>

            <div className="pm-slider-arrows">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <i className="bi bi-arrow-left" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <i className="bi bi-arrow-right" />
              </button>
            </div>
          </div>

          <div className="pm-testimonial-slider">
            <div
              className="pm-testimonial-track"
              style={{
                transform: `translateX(-${(slideIndex * 100) / slidesPerView}%)`,
              }}
            >
              {testimonials.map((item) => (
                <article key={item.name} className="pm-testimonial-slide">
                  <div className="pm-testimonial-avatar">
                    <img src={item.src} alt={item.name} />
                  </div>
                  <p className="pm-stars">★★★★★</p>
                  <p className="pm-testimonial-text">“{item.text}”</p>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pm-contact-map-wrap">
        <div className="pm-map-bg" aria-hidden="true">
          <img src="/assets/img/bg/europe-map.svg" alt="Europe map" />
        </div>

        <div className="pm-container pm-contact-overlays">
          <article className="pm-contact-card">
            <div>
              <h3>Contact Us</h3>
              <p>
                Have questions or need a custom metal solution? Reach out to
                Pinnacle Metals.
              </p>
            </div>
            <ul>
              <li>
                <i className="bi bi-geo-alt" /> Acorn Way, Grimethorpe Barnsley, <br />
                S72 7PE
              </li>
              <li>
                <i className="bi bi-envelope" /> info@pinnaclemetals.co.uk
              </li>
              <li>
                <i className="bi bi-telephone" /> 07398 071934
              </li>
            </ul>
          </article>

          <article id="quote" className="pm-quote-card">
            <h3>Get A Quote</h3>
            <form>
              <div className="pm-form-grid">
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
                <input type="email" placeholder="Email address" />
                <input type="text" placeholder="Subject" />
              </div>
              <textarea placeholder="Comments / Questions *" rows={4} />
              <button type="button" className="pm-btn pm-btn-primary pm-btn-sm">
                Send Message
              </button>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}

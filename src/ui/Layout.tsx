import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { companyDetails } from "../lib/company";
import "./Layout.css";
import WhatsAppWidget from "./WhatsAppWidget";

export default function Layout() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  const navItems = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Materials", href: "/#materials" },
    { label: "How It Works", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ];

  const isAdminArea =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/settings");

  useEffect(() => {
    const linkDefs = [
      {
        id: "techxen-bootstrap",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      },
      {
        id: "techxen-icons",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css",
      },
      // Note: Removed local /assets/css/main.css injection as it's often too heavy for dynamic loading on mobile
    ];

    const removeLinks = () => {
      linkDefs.forEach(({ id }) => {
        const existing = document.getElementById(id);
        if (existing) existing.remove();
      });
    };

    if (isAdminArea) {
      removeLinks();
      return;
    }

    linkDefs.forEach(({ id, href }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = href;
        link.media = "all";
        document.head.appendChild(link);
      }
    });

    return () => removeLinks();
  }, [isAdminArea]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const movingDown = currentY > lastY;
      const passedThreshold = currentY > 90;
      const delta = Math.abs(currentY - lastY);

      if (delta > 8) {
        setHeaderHidden(movingDown && passedThreshold);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (isAdminArea) {
    return <Outlet />;
  }

  return (
    <div className="pm-layout">
      <header
        className={`pm-global-header-wrap ${headerHidden ? "pm-header-hidden" : ""}`}
      >
        <div className="pm-global-header pm-container">
          <a
            href="#home"
            className="pm-logo-wrap"
            aria-label="Pinnacle Metals Home"
          >
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              className="pm-logo"
            />
          </a>

          <nav className="pm-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pm-header-actions">
            <button
              type="button"
              className="pm-burger-btn"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <i
                className="bi bi-list"
                style={{
                  fontSize: "25px",
                }}
              />
            </button>
            <Link to="/login" className="pm-circle-icon" aria-label="Login">
              <i
                className="bi bi-person"
                style={{
                  fontSize: "20px",
                  color: "#ba932a",
                }}
              />
            </Link>
            <a href="/#quote" className="pm-quote-btn">
              Get A Quote
            </a>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="pm-mobile-overlay"
          role="button"
          tabIndex={0}
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setMobileMenuOpen(false);
            }
          }}
        >
          <aside
            className="pm-mobile-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pm-mobile-drawer-head">
              <img
                src="/eduall/assets/images/logo/logo.png"
                alt="Pinnacle Metals"
                className="pm-mobile-logo"
              />
              <button
                type="button"
                className="pm-drawer-close"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <i
                  className="bi bi-x-lg"
                  style={{
                    color: "#fff",
                  }}
                />
              </button>
            </div>

            <nav className="pm-mobile-nav" aria-label="Mobile menu">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}

      <Outlet />

      <footer className="pm-footer">
        <div className="pm-container pm-footer-grid">
          <div>
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              className="pm-footer-logo"
            />
            <p>
              {companyDetails.name} is committed to delivering high-quality metal
              solutions with expertise, reliability and exceptional customer
              service.
            </p>
            <ul className="pm-footer-company-meta">
              <li>Company No: {companyDetails.companyNumber}</li>
              <li>Est: {companyDetails.established}</li>
            </ul>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/#home">Home</a>
              </li>
              <li>
                <a href="/#about">About</a>
              </li>
              <li>
                <a href="/#materials">Materials</a>
              </li>
              <li>
                <a href="/#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Contact Us</h4>
            <ul>
              <li>
                <i className="bi bi-whatsapp" />
                <span style={{ marginLeft: "5px" }}>
                  <a href={`tel:${companyDetails.phoneHref}`}>
                    {companyDetails.phoneDisplay}
                  </a>
                  <a
                    href={companyDetails.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    style={{ marginLeft: "10px" }}
                  ></a>
                </span>
              </li>
              <li>
                <i className="bi bi-telephone" />
                <span style={{ marginLeft: "5px" }}>
                  <a href={`tel:${companyDetails.phoneHref}`}>
                    {companyDetails.phoneDisplay}
                  </a>
                </span>
              </li>
              <li>
                {" "}
                <i className="bi bi-envelope" />{" "}
                <span style={{ marginLeft: "5px" }}>
                  <a href={`mailto:${companyDetails.email}`}>
                    {companyDetails.email}
                  </a>
                </span>
              </li>
              <li>
                {" "}
                <i className="bi bi-geo-alt" />{" "}
                <span style={{ marginLeft: "5px" }}>
                  {companyDetails.addressShort}
                </span>
              </li>
              <li>
                {" "}
                <i className="bi bi-globe2" />{" "}
                <span style={{ marginLeft: "5px" }}>
                  <a href={companyDetails.websiteUrl}>
                    {companyDetails.website}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Licensing</h4>
            <ul className="pm-footer-company-meta">
              {companyDetails.licenses.map((license) => (
                <li key={license.label}>
                  <span>{license.label}:</span> {license.value}
                </li>
              ))}
            </ul>
            <h4>Newsletter</h4>
            <div className="pm-newsletter">
              <input type="email" placeholder="Email" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="pm-footer-bottom">
          <p>&copy; 2026 {companyDetails.name}. All Rights Reserved.</p>
        </div>
      </footer>
   <WhatsAppWidget />

    </div>
  );
}

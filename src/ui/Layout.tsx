import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import WhatsAppWidget from "./WhatsAppWidget";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {
        id: "techxen-main",
        href: "/assets/css/main.css",
      },
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
        // Optimization: For larger Safari compatibility, ensure CSS is loaded correctly
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

  if (isAdminArea) {
    return (
      <>
        <Outlet />
        <WhatsAppWidget />
      </>
    );
  }

  return (
    <div className="pm-layout">
      <header className="pm-global-header-wrap">
        <div className="pm-global-header pm-container">
          <Link
            to="/"
            className="pm-logo-wrap"
            aria-label="Pinnacle Metals Home"
          >
            <img
              src="/eduall/assets/images/logo/logo.png"
              alt="Pinnacle Metals"
              className="pm-logo"
            />
          </Link>

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
                <a key={item.label} href={item.href}>
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
              Pinnacle Metals is committed to delivering high-quality metal
              solutions with expertise, reliability and exceptional customer
              service.
            </p>
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
                <i className="bi bi-telephone" />{" "}
                <span style={{ marginLeft: "5px" }}>07398 071934</span>
              </li>
              <li>
                {" "}
                <i className="bi bi-envelope" />{" "}
                <span style={{ marginLeft: "5px" }}>
                  info@pinnaclemetals.co.uk
                </span>
              </li>
              <li>
                {" "}
                <i className="bi bi-geo-alt" />{" "}
                <span style={{ marginLeft: "5px" }}>
                  Acorn Way, Grimethorpe, S72 7PE
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="pm-socials">
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin" />
              </a>
            </div>
            <h4>Newsletter</h4>
            <div className="pm-newsletter">
              <input type="email" placeholder="Email" />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="pm-footer-bottom">
          <p>© 2026 Pinnacle Metals. All Rights Reserved.</p>
        </div>
      </footer>

      <WhatsAppWidget />
    </div>
  );
}

import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import WhatsAppWidget from "./WhatsAppWidget";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();

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
        document.head.appendChild(link);
      }
    });

    return () => removeLinks();
  }, [isAdminArea]);

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
            <a href="/#home">Home</a>
            <a href="/#about">About</a>
            <a href="/#services">Services</a>
            <a href="/#materials">Materials</a>
            <a href="/#process">How It Works</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div className="pm-header-actions">
            <Link to="/login" className="pm-circle-icon" aria-label="Login">
              <i className="bi bi-person" />
            </Link>
            <a href="/#quote" className="pm-quote-btn">
              Get A Quote
            </a>
          </div>
        </div>
      </header>

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
              <li>07398 071934</li>
              <li>info@pinnaclemetals.co.uk</li>
              <li>Acorn Way, Grimethorpe Barnsley, S72 7PE</li>
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

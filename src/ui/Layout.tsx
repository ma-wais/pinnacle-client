import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

function TopLink({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <li className="nav-menu__item">
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
          ["", isActive ? "text-main-600 fw-semibold" : "text-black"].join(" ")
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

export default function Layout() {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPortal =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (isPortal) return <Outlet />;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div
      className={`page-wrapper ${isMobileMenuOpen ? "mobile-menu-active" : ""}`}
    >
      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: 998,
          display: isMobileMenuOpen ? "block" : "none",
        }}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isMobileMenuOpen ? 0 : "-600px",
          height: "100%",
          background: "#fff",
          zIndex: 999,
          transition: "0.3s ease-in-out",
          padding: "30px",
          boxShadow: "-5px 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex-between mb-30">
          <img
            src="/eduall/assets/images/logo/logo.png"
            style={{ maxHeight: "100px" }}
            alt=""
          />
          <button
            onClick={toggleMobileMenu}
            className="w-40 h-40 flex-center bg-neutral-10 border-0 rounded-circle"
          >
            <i className="ph ph-x text-24"></i>
          </button>
        </div>

        <ul className="">
          <Link
            to="/"
            onClick={toggleMobileMenu}
            className="d-block mb-18 text-black"
          >
            Home
          </Link>
          <Link
            to="/quote"
            onClick={toggleMobileMenu}
            className="d-block mb-18 text-black"
          >
            Get Quote
          </Link>
          <Link
            to="/contact"
            onClick={toggleMobileMenu}
            className="d-block mb-18 text-black"
          >
            Contact
          </Link>
          {!loading && !user && (
            <Link
              to="/apply"
              onClick={toggleMobileMenu}
              className="d-block mb-18 text-black"
            >
              Industrial Account
            </Link>
          )}
        </ul>

        {!loading && (
          <div className="mt-40 pt-40 border-top border-neutral-30">
            {!user ? (
              <Link
                to="/login"
                onClick={toggleMobileMenu}
                className="btn btn-main rounded-pill w-100 py-16"
              >
                Login
              </Link>
            ) : (
              <Link
                to="/dashboard"
                onClick={toggleMobileMenu}
                className="btn btn-main-outline rounded-pill w-100 py-16"
              >
                Go to Portal
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="header-top bg-main-600 s1-header-top d-sm-block d-none">
        <div className="container container--xl">
          <div className="header-top-inner flex-between">
            <div className="header-top-left flex-align gap-24">
              <div className="d-flex align-items-center gap-8">
                <span className="text-white text-md d-flex">
                  <i className="ph-fill ph-phone-call"></i>
                </span>
                <a href="tel:07398071934" className="text-white text-sm">
                  07398 071934
                </a>
              </div>
              <div className="d-flex align-items-center gap-8">
                <span className="text-white text-md d-flex">
                  <i className="ph-fill ph-envelope"></i>
                </span>
                <a
                  href="mailto:info@pinnaclemetals.co.uk"
                  className="text-white text-sm"
                >
                  info@pinnaclemetals.co.uk
                </a>
              </div>
            </div>
            <div className="flex-align gap-24">
              <div className="d-flex align-items-center gap-8">
                <span className="text-white text-md d-flex">
                  <i className="ph-fill ph-map-pin"></i>
                </span>
                <span className="text-white text-sm">
                  Acorn Way, Barnsley, S72 7PE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="container container--xl">
          <nav className="header-inner flex-between gap-8">
            <div className="header-content-wrapper flex-align flex-grow-1">
              <div className="logo">
                <Link to="/" className="link">
                  <img
                    src="/eduall/assets/images/logo/logo.png"
                    alt="Pinnacle Metals"
                    style={{ maxHeight: "100px" }}
                  />
                </Link>
              </div>

              <div className="header-menu d-lg-block d-none">
                <ul className="nav-menu flex-align">
                  <TopLink to="/" label="Home" />
                  <TopLink to="/quote" label="Get Quote" />
                  <TopLink to="/contact" label="Contact" />
                  {!loading && !user && (
                    <>
                      <TopLink to="/apply" label="Industrial Account" />
                    </>
                  )}
                </ul>
              </div>
            </div>

            <div className="header-right flex-align">
              {!loading && !user ? (
                <Link
                  to="/login"
                  className="btn btn-main rounded-pill d-sm-flex d-none align-items-center gap-8 px-24 py-12"
                >
                  Login
                  <i className="ph-bold ph-user-circle text-xl"></i>
                </Link>
              ) : (
                <div className="flex-align gap-12">
                  <Link
                    to="/dashboard"
                    className="btn btn-main-outline rounded-pill px-20 py-8 text-14"
                  >
                    Portal
                  </Link>
                  <button
                    onClick={() => (window.location.href = "/dashboard")}
                    className="info-action w-44 h-44 bg-main-25 border border-neutral-30 rounded-circle flex-center text-xl text-neutral-500 hover-bg-main-600 hover-text-white"
                  >
                    <i className="ph ph-user"></i>
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="toggle-mobileMenu d-lg-none text-neutral-500 flex-center w-44 h-44 bg-neutral-10 rounded-circle border-0"
              >
                <i className="ph ph-list text-24"></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className="main-content">
        <Outlet />
      </div>

      <footer className="bg-main-25 position-relative z-1 pt-60">
        <div className="footer-top p-20 border-bottom border-neutral-30">
          <div className="container">
            <div className="row gy-40">
              <div className="col-xl-4 col-sm-6 md:mt-0 mt-24">
                <div className="footer-item">
                  <div className="footer-item__logo mb-24">
                    <img
                      src="/eduall/assets/images/logo/logo.png"
                      alt="Pinnacle Metals"
                      style={{ maxHeight: "100px" }}
                    />
                  </div>
                  <p className="footer-item__desc text-neutral-500 mb-24">
                    Leading scrap metal recycling center in Barnsley. We provide
                    same-day payments and professional service for both domestic
                    and industrial clients.
                  </p>
                  <div className="flex-align gap-16">
                    <a
                      href="#"
                      className="w-44 h-44 bg-white border border-neutral-30 rounded-circle flex-center text-xl text-main-600 hover-bg-main-600 hover-text-white transition-2"
                    >
                      <i className="ph-fill ph-facebook-logo"></i>
                    </a>
                    <a
                      href="#"
                      className="w-44 h-44 bg-white border border-neutral-30 rounded-circle flex-center text-xl text-main-600 hover-bg-main-600 hover-text-white transition-2"
                    >
                      <i className="ph-fill ph-twitter-logo"></i>
                    </a>
                    <a
                      href="#"
                      className="w-44 h-44 bg-white border border-neutral-30 rounded-circle flex-center text-xl text-main-600 hover-bg-main-600 hover-text-white transition-2"
                    >
                      <i className="ph-fill ph-instagram-logo"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 ps-xl-80 mt-24">
                <div className="footer-item">
                  <h6 className="footer-item__title mb-24 uppercase">
                    Quick links
                  </h6>
                  <ul className="footer-menu d-grid gap-12">
                    <li>
                      <Link
                        to="/"
                        className="text-neutral-500 hover-text-main-600"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/quote"
                        className="text-neutral-500 hover-text-main-600"
                      >
                        Get a Quote
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/apply"
                        className="text-neutral-500 hover-text-main-600"
                      >
                        Open Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="text-neutral-500 hover-text-main-600"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-5 col-sm-12 ps-xl-80 mt-24">
                <div className="footer-item">
                  <h6 className="footer-item__title mb-24 uppercase">
                    Our Location
                  </h6>
                  <div className="footer-contact d-grid gap-16">
                    <div className="flex-align gap-16">
                      <span className="w-44 h-44 flex-center bg-white border border-neutral-30 text-main-600 text-xl rounded-circle flex-shrink-0">
                        <i className="ph-fill ph-map-pin"></i>
                      </span>
                      <span className="text-neutral-500">
                        Acorn Way, Grimethorpe, Barnsley, S72 7PE
                      </span>
                    </div>
                    <div className="flex-align gap-16">
                      <span className="w-44 h-44 flex-center bg-white border border-neutral-30 text-main-600 text-xl rounded-circle flex-shrink-0">
                        <i className="ph-fill ph-phone"></i>
                      </span>
                      <a
                        href="tel:07398071934"
                        className="text-neutral-500 hover-text-main-600 font-bold"
                      >
                        07398 071934
                      </a>
                    </div>
                    <div className="flex-align gap-16">
                      <span className="w-44 h-44 flex-center bg-white border border-neutral-30 text-main-600 text-xl rounded-circle flex-shrink-0">
                        <i className="ph-fill ph-envelope"></i>
                      </span>
                      <a
                        href="mailto:info@pinnaclemetals.co.uk"
                        className="text-neutral-500 hover-text-main-600"
                      >
                        info@pinnaclemetals.co.uk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-24">
          <div className="container">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-12 text-center text-sm-start">
              <span className="text-neutral-500 text-14 w-100">
                © {new Date().getFullYear()} Pinnacle Metals. Registered Waste
                Carrier. All legal recycling regulations observed.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useState } from "react";
import { 
  // Link, NavLink, 
  Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "../lib/AuthContext";

// const navClass = ({ isActive }: { isActive: boolean }) =>
//   isActive ? "active" : "";

export default function Layout() {
  // const { user, loading } = useAuth();
  const { pathname } = useLocation();
  // const [mobileToggle, setMobileToggle] = useState(false);
  // const [isSticky, setIsSticky] = useState<string | undefined>();
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const isPortal =
    pathname.startsWith("/dashboard") || pathname.startsWith("/admin");

  useEffect(() => {
    if (isPortal) return;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos) {
        // setIsSticky("cs-gescout_sticky");
      } else if (currentScrollPos !== 0) {
        // setIsSticky("cs-gescout_show cs-gescout_sticky");
      } else {
        // setIsSticky(undefined);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPortal, prevScrollPos]);

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

    if (isPortal) {
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
  }, [isPortal]);

  if (isPortal) return <Outlet />;

  // const closeMobile = () => setMobileToggle(false);

  return (
    <div className="main-page-area">
      {/* <div className="header-area2 header_nav_03">
        <header
          className={`cs_site_header cs_style_1 cs_sticky_header cs_site_header_full_width ${isSticky ? isSticky : ""}`}
        >
          <div className="cs_top_header">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pera">
                    <p>
                      <img src="/assets/img/icons/header-top-span.png" alt="" />
                      Fully licensed scrap metal recycling in South Yorkshire.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cs_main_header cs_accent_bg">
            <div className="container">
              <div className="cs_main_header_in">
                <div className="cs_main_header_left">
                  <Link className="cs_site_branding" to="/">
                    <img
                      src="/eduall/assets/images/logo/logo.png"
                      alt="Pinnacle Metals"
                      style={{ maxHeight: 100 }}
                    />
                  </Link>
                </div>

                <div className="cs_main_header_center1">
                  <div className="cs_nav cs_primary_font fw-medium">
                    <span
                      className={
                        mobileToggle
                          ? "cs-munu_toggle cs_teggle_active"
                          : "cs-munu_toggle"
                      }
                      onClick={() => setMobileToggle(!mobileToggle)}
                    >
                      <span></span>
                    </span>

                    <ul className="cs_nav_list fw-medium">
                      <li>
                        <NavLink
                          to="/"
                          className={navClass}
                          onClick={closeMobile}
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/quote"
                          className={navClass}
                          onClick={closeMobile}
                        >
                          Get Quote
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/contact"
                          className={navClass}
                          onClick={closeMobile}
                        >
                          Contact
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/terms"
                          className={navClass}
                          onClick={closeMobile}
                        >
                          Terms
                        </NavLink>
                      </li>
                      {!loading && !user && (
                        <li>
                          <NavLink
                            to="/apply"
                            className={navClass}
                            onClick={closeMobile}
                          >
                            Register
                          </NavLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="cs_main_header_right header_right_one">
                  <div className="header1-buttons">
                    <div className="contact-btn">
                      <div className="icon">
                        <img src="/assets/img/icons/header1-icon.png" alt="" />
                      </div>
                      <div className="headding">
                        <p>Call the Yard</p>
                        <a href="tel:07398071934">07398 071934</a>
                      </div>
                    </div>
                    <div className="button">
                      <Link to="/quote" className="theme-btn1">
                        Get A Quote{" "}
                        <span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                    {!loading && (
                      <li>
                        <NavLink
                          to={user ? "/dashboard" : "/login"}
                          className={navClass}
                          onClick={closeMobile}
                        >
                          {user ? (
                            <div className="px-10 text-black">
                              <p className="bi bi-person-circle">
                                <span className="ms-2">Portal</span>
                              </p>
                            </div>
                          ) : (
                            <p className="text-black px-10">Login</p>
                          )}
                        </NavLink>
                      </li>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div> */}

      <Outlet />

      {/* <div className="footer1 _relative">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-footer-items footer-logo-area">
                <div className="footer-logo">
                  <Link to="/">
                    <img
                      src="/eduall/assets/images/logo/logo.png"
                      alt="Pinnacle Metals"
                    />
                  </Link>
                </div>
                <div className="space20"></div>
                <div className="heading1">
                  <p>
                    Pinnacle Metals provides compliant scrap metal recycling for
                    trade, construction and household customers across Barnsley
                    and South Yorkshire. Same-day payments, transparent weights,
                    and responsible processing.
                  </p>
                </div>
                <ul className="social-icon">
                  <li>
                    <a href="#">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg col-md-6 col-12">
              <div className="single-footer-items">
                <h3>Recycling Services</h3>
                <ul className="menu-list">
                  <li>
                    <Link to="/quote">Ferrous & Non-Ferrous Scrap</Link>
                  </li>
                  <li>
                    <Link to="/quote">Industrial Collections</Link>
                  </li>
                  <li>
                    <Link to="/quote">Factory & Site Clearances</Link>
                  </li>
                  <li>
                    <Link to="/quote">Cable & Catalytic Converters</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg col-md-6 col-12">
              <div className="single-footer-items">
                <h3>Useful Links</h3>
                <ul className="menu-list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/quote">Get Quote</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/terms">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-footer-items">
                <h3>Contact Us</h3>

                <div className="contact-box">
                  <div className="icon">
                    <img src="/assets/img/icons/footer1-icon1.png" alt="" />
                  </div>
                  <div className="pera">
                    <a href="tel:07398071934">07398 071934</a>
                  </div>
                </div>

                <div className="contact-box">
                  <div className="icon">
                    <img src="/assets/img/icons/footer1-icon3.png" alt="" />
                  </div>
                  <div className="pera">
                    <a href="mailto:info@pinnaclemetals.co.uk">
                      info@pinnaclemetals.co.uk
                    </a>
                  </div>
                </div>

                <div className="contact-box">
                  <div className="icon">
                    <img src="/assets/img/icons/footer1-icon4.png" alt="" />
                  </div>
                  <div className="pera">
                    <span>Acorn Way, Grimethorpe, Barnsley, S72 7PE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space40"></div>
        </div>

        <div className="copyright-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="coppyright">
                  <p>Copyright @2026 Pinnacle Metals. All Rights Reserved</p>
                </div>
              </div>
              <div className="col-md-7">
                <div className="coppyright right-area">
                  <Link to="/terms">Terms & Conditions</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

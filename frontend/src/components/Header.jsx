import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader";
import { setLogout } from "../state";
import { Ripple } from "primereact/ripple";
import { Link } from "react-router-dom";
import { getBookingChargesWithCouponCodeAndCorrespondingDiscount } from "../utils/chargesAndCouponCode";
import { performLogout } from "../utils/logoutUtil";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [pageLoading, setPageLoading] = useState(false);

  const [couponCodeAndDiscount, setCouponCodeAndDiscount] = useState(null);
  const couponCodeDiscountObj = useSelector(
    (state) => state.bookingChargeCouponCode.couponCode
  );

  useEffect(() => {
    if (couponCodeDiscountObj) setCouponCodeAndDiscount(couponCodeDiscountObj);
  }, [couponCodeDiscountObj]);

  const handleNavigate = (url) => {
    setPageLoading(true);
    setTimeout(() => {
      navigate(url);
      setPageLoading(false);
    }, 800);
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdowMenuRef = useRef(null);

  const toggleDropdownMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (
      dropdowMenuRef.current &&
      !dropdowMenuRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getBookingChargesWithCouponCodeAndCorrespondingDiscount(dispatch);
  }, [dispatch]);

  // useEffect(() => {
  //     const preloader = document.getElementById('preloader');
  //     if (preloader) {
  //         setTimeout(() => {
  //             preloader.style.transition = 'opacity 0.5s';
  //             preloader.style.opacity = '0';
  //             setTimeout(() => {
  //                 preloader.remove();
  //             }, 800);
  //         }, 800);
  //     }
  // }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goToLink = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* <div className="loader-area" id="preloader">
                <div class="loader"></div>
            </div> */}
      <header>
        {/* {(couponCodeAndDiscount && couponCodeAndDiscount?.bannerStatus) && (
          <div className="promotion-label">
            <h6>
              Use <b>{couponCodeAndDiscount.couponCode}</b> promo code to get{" "}
              {couponCodeAndDiscount.discount}% off for your bookings
            </h6>
          </div>
        )} */}

        {/* <div className="promotion-label">
          <h6>
          <b>Spring into Savings!</b> Enjoy <b>30% Off</b> for All Customers – Limited Time Only!🌸✨<b>Book now!</b>
          </h6>
        </div> */}
        <nav className={`nav-section ${scrolled ? "scrolled" : ""}`}>
          <div className="container-md">
            <div className="row">
              <div className="col-12">
                <div className="nav-container">
                  <button
                    onClick={() => goToLink("/")}
                    className="nav-logo-link"
                  >
                    <img
                      src="assets/images/logo.png"
                      className="nav-logo"
                      alt="Logo"
                    />
                    <img
                      src="assets/images/logo.png"
                      className="scrolled-logo"
                      alt="Logo"
                    />
                  </button>
                  <ul className="nav-link-area">
                    <li className="nav-link-item">
                      <button
                        onClick={() => goToLink("/about-us")}
                        className={`nav-link ${window.location.pathname === "/about-us"
                            ? "active"
                            : ""
                          }`}
                      >
                        About Us
                      </button>
                    </li>

                    <li className="nav-link-item">
                      <button
                        onClick={() => goToLink("/services")}
                        className={`nav-link ${window.location.pathname === "/services"
                            ? "active"
                            : ""
                          }`}
                      >
                        Services
                      </button>
                    </li>

                    <li className="nav-link-item">
                      <button
                        onClick={() => goToLink("/contact-us")}
                        className={`nav-link ${window.location.pathname === "/contact-us"
                            ? "active"
                            : ""
                          }`}
                      >
                        Contact Us
                      </button>
                    </li>
                  </ul>

                  {!user ? (
                    <ul className="nav-button-grp">
                      {/* <li className="nav-button-grp-item">
                        <button
                          onClick={() => goToLink("/sign-up")}
                          className="nav-link-button with-outline text-uppercase letter-spaced"
                        >
                          Sign up
                        </button>
                      </li> */}
                      <li className="nav-button-grp-item">
                        <button
                          onClick={() => goToLink("/sign-in")}
                          className="nav-link-button with-bg text-uppercase letter-spaced"
                        >
                          Sign in
                        </button>
                      </li>
                    </ul>
                  ) : (
                    <ul className="nav-button-grp">
                      <li
                        className="nav-button-grp-item position-relative"
                        ref={dropdowMenuRef}
                      >
                        <button
                          type="button"
                          className="elegant-profile-toggle p-ripple"
                          onClick={toggleDropdownMenu}
                        >
                          <div className="profile-avatar-container">
                            <img
                              src={user?.dp || "assets/images/user.png"}
                              className="profile-avatar"
                              alt="User Avatar"
                            />
                            <div className="avatar-status-indicator"></div>
                          </div>
                          <div className="profile-info">
                            <span className="profile-greeting">Welcome back</span>
                            <span className="profile-name">{user?.firstName || "User"}</span>
                          </div>
                          <div className="dropdown-arrow">
                            <i
                              className={`bi bi-chevron-down ${isOpen ? "rotated" : ""}`}
                            ></i>
                          </div>
                          <Ripple />
                        </button>

                        <div
                          className={`elegant-dropdown-menu ${isOpen ? "show" : ""}`}
                        >
                          <div className="dropdown-header">
                            <div className="dropdown-avatar">
                              <img
                                src={user?.dp || "assets/images/user.png"}
                                className="dropdown-avatar-img"
                                alt="User"
                              />
                              <div className="avatar-overlay">
                                <i className="bi bi-camera-fill"></i>
                              </div>
                            </div>
                            <div className="dropdown-user-info">
                              <h6 className="dropdown-user-name">
                                {user?.firstName || "User"} {user?.lastName || ""}
                              </h6>
                              <p className="dropdown-user-email">
                                {user?.email || "user@example.com"}
                              </p>
                            </div>
                          </div>

                          <div className="dropdown-divider"></div>

                          <div className="dropdown-menu-items">
                            <button
                              onClick={() => goToLink("/dashboard")}
                              className="elegant-dropdown-item p-ripple"
                            >
                              <div className="item-icon dashboard">
                                <i className="bi bi-grid-3x3-gap-fill"></i>
                              </div>
                              <div className="item-content">
                                <span className="item-title">Dashboard</span>
                                <span className="item-subtitle">View your overview</span>
                              </div>
                              <div className="item-arrow">
                                <i className="bi bi-chevron-right"></i>
                              </div>
                              <Ripple />
                            </button>

                            <button
                              onClick={() => goToLink("/dashboard?tab=bookings")}
                              className="elegant-dropdown-item p-ripple"
                            >
                              <div className="item-icon bookings">
                                <i className="bi bi-calendar-check-fill"></i>
                              </div>
                              <div className="item-content">
                                <span className="item-title">My Bookings</span>
                                <span className="item-subtitle">View reservations</span>
                              </div>
                              <div className="item-arrow">
                                <i className="bi bi-chevron-right"></i>
                              </div>
                              <Ripple />
                            </button>
                          </div>

                          <div className="dropdown-divider"></div>

                          <div className="dropdown-footer">
                            <button
                              className="elegant-logout-btn p-ripple"
                              type="button"
                              onClick={() => {
                                performLogout(dispatch, navigate);
                              }}
                            >
                              <div className="logout-icon">
                                <i className="bi bi-box-arrow-right"></i>
                              </div>
                              <span>Sign Out</span>
                              <Ripple />
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}

                  <ul className="menu-toggle-btn-area">
                    <li className="nav-button-grp-item">
                      <button
                        className={`menu-toggle-button ${menuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                      >
                        <span className="hamburger-line"></span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div
          className={`menu-backdrop ${menuOpen ? "show" : ""}`}
          onClick={closeMenu}
        ></div>

        <div className={`modern-mobile-menu ${menuOpen ? "show" : ""}`}>
          <div className="mobile-menu-header">
            <button onClick={() => goToLink("/")} className="mobile-menu-logo">
              <img src="assets/images/logo-light.png" alt="Platinum Holiday" />
              <span className="brand-text">Platinum Holiday</span>
            </button>
            <button className="modern-close-button" onClick={closeMenu}>
              <span className="close-line"></span>
              <span className="close-line"></span>
            </button>
          </div>

          <nav className="mobile-nav-area">
            <ul className="mobile-nav-list">
              <li className="mobile-nav-item">
                <button
                  onClick={() => {
                    goToLink("/");
                    closeMenu();
                  }}
                  className={`mobile-nav-link ${window.location.pathname === "/" ? "active" : ""
                    }`}
                >
                  <i className="bi bi-house-fill"></i>
                  <span>Home</span>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
              <li className="mobile-nav-item">
                <button
                  onClick={() => {
                    goToLink("/about-us");
                    closeMenu();
                  }}
                  className={`mobile-nav-link ${window.location.pathname === "/about-us" ? "active" : ""
                    }`}
                >
                  <i className="bi bi-info-circle-fill"></i>
                  <span>About Us</span>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
              <li className="mobile-nav-item">
                <button
                  onClick={() => {
                    goToLink("/services");
                    closeMenu();
                  }}
                  className={`mobile-nav-link ${window.location.pathname === "/services" ? "active" : ""
                    }`}
                >
                  <i className="bi bi-gear-fill"></i>
                  <span>Services</span>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
              <li className="mobile-nav-item">
                <button
                  onClick={() => {
                    goToLink("/contact-us");
                    closeMenu();
                  }}
                  className={`mobile-nav-link ${window.location.pathname === "/contact-us" ? "active" : ""
                    }`}
                >
                  <i className="bi bi-telephone-fill"></i>
                  <span>Contact Us</span>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>

          {user ? (
            <div className="mobile-user-section">
              <div className="mobile-user-card">
                <div className="mobile-user-info">
                  <div className="mobile-user-avatar">
                    <img src={user?.dp || "assets/images/user.png"} alt="User" />
                  </div>
                  <div className="mobile-user-details">
                    <h6 className="mobile-user-greeting">👋 Welcome back</h6>
                    <h5 className="mobile-user-name">
                      {user?.firstName || "User"}
                    </h5>
                  </div>
                </div>
                <div className="mobile-user-actions">
                  <button
                    onClick={() => {
                      goToLink("/dashboard");
                      closeMenu();
                    }}
                    className="mobile-action-btn primary"
                  >
                    <i className="bi bi-speedometer2"></i>
                    Dashboard
                  </button>
                  <button
                    type="button"
                    className="mobile-action-btn danger"
                    onClick={() => {
                      performLogout(dispatch, navigate);
                      closeMenu();
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mobile-auth-section">
              <div className="mobile-auth-buttons">
                <button
                  onClick={() => {
                    goToLink("/sign-up");
                    closeMenu();
                  }}
                  className="mobile-auth-btn secondary"
                >
                  <i className="bi bi-person-plus"></i>
                  Create Account
                </button>
                <button
                  onClick={() => {
                    goToLink("/sign-in");
                    closeMenu();
                  }}
                  className="mobile-auth-btn primary"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  Sign In
                </button>
              </div>
            </div>
          )}

          <div className="mobile-menu-footer">
            <div className="mobile-contact-info">
              <a href="tel:+447375551666" className="mobile-contact-item">
                <i className="bi bi-telephone-fill"></i>
                +44 7375 551666
              </a>
              <a href="mailto:info@platinumholiday.co.uk" className="mobile-contact-item">
                <i className="bi bi-envelope-fill"></i>
                info@platinumholiday.co.uk
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

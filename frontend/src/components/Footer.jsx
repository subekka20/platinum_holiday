import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "bootstrap";
import { useForm } from "react-hook-form";
import api from "../api";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleShow = () => {
      setShowBackToTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleShow, { passive: true });
    handleShow();
    return () => window.removeEventListener("scroll", handleShow);
  }, []);

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltips = nodes.map((el) => new Tooltip(el));
    return () => tooltips.forEach((t) => t.dispose());
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/user/submit-subscribed-user", data);
      toast.current.show({
        severity: "success",
        summary: "Thanks for subscribing",
        detail: "You will be notified!",
        life: 3000,
      });
      reset();
    } catch (e) {
      toast.current.show({
        severity: "error",
        summary: "Failed!",
        detail: "Failed to subscribe!",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const goToLink = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Preloader />

      {/* Back to top */}
      <button
        className={`back-to-top-btn ${showBackToTop ? "show" : ""}`}
        id="back_to_top"
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        <svg className="svgIcon" viewBox="0 0 384 512" width="20" height="20" aria-hidden="true">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
        </svg>
      </button>

      <footer className="modern-footer">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="container-fluid">
            <div className="row g-4">
              {/* Brand Section */}
              <div className="col-12 col-lg-4">
                <div className="footer-brand">
                  <div className="brand-header">
                    <button
                      onClick={() => goToLink("/")}
                      className="footer-logo-btn"
                      aria-label="Go to homepage"
                    >
                      <img
                        src="../assets/images/logo-light.png"
                        className="footer-logo-img"
                        alt="Platinum Holiday Service"
                      />
                    </button>
                    <div className="brand-info">
                      <h3 className="brand-name">Platinum Holiday</h3>
                      <p className="brand-tagline">Premium Airport Parking</p>
                    </div>
                  </div>
                  <p className="brand-description">
                    Experience hassle-free airport parking with our premium services. 
                    We provide secure, convenient, and affordable parking solutions 
                    tailored for every traveler's needs.
                  </p>
                  
                  {/* Social Media Links */}
                  {/* <div className="social-links">
                    <span className="social-label">Follow Us:</span>
                    <div className="social-icons">
                      <a href="#" className="social-link" aria-label="Facebook">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a href="#" className="social-link" aria-label="Twitter">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#" className="social-link" aria-label="Instagram">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#" className="social-link" aria-label="LinkedIn">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-12 col-sm-6 col-lg-2">
                <div className="footer-section">
                  <h4 className="footer-section-title">
                    <i className="bi bi-building"></i>
                    Company
                  </h4>
                  <ul className="footer-links">
                    <li>
                      <button onClick={() => goToLink("/about-us")} className="footer-nav-link">
                        <i className="bi bi-chevron-right"></i>
                        About Us
                      </button>
                    </li>
                    <li>
                      <button onClick={() => goToLink("/contact-us")} className="footer-nav-link">
                        <i className="bi bi-chevron-right"></i>
                        Contact Us
                      </button>
                    </li>
                    <li>
                      <button onClick={() => goToLink("/faq")} className="footer-nav-link">
                        <i className="bi bi-chevron-right"></i>
                        FAQs
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Support Links */}
              <div className="col-12 col-sm-6 col-lg-2">
                <div className="footer-section">
                  <h4 className="footer-section-title">
                    <i className="bi bi-headset"></i>
                    Support
                  </h4>
                  <ul className="footer-links">
                    <li>
                      <button onClick={() => goToLink("/terms-and-conditions")} className="footer-nav-link">
                        <i className="bi bi-chevron-right"></i>
                        Terms & Conditions
                      </button>
                    </li>
                    <li>
                      <button onClick={() => goToLink("/privacy-policy")} className="footer-nav-link">
                        <i className="bi bi-chevron-right"></i>
                        Privacy Policy
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="col-12 col-lg-4">
                <div className="footer-section">
                  <h4 className="footer-section-title">
                    <i className="bi bi-telephone-fill"></i>
                    Get In Touch
                  </h4>
                  
                  <div className="contact-cards">
                    <div className="contact-card">
                      <div className="contact-icon phone">
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <div className="contact-info">
                        <span className="contact-label">Phone</span>
                        <a href="tel:+447375551666" className="contact-value">
                          +447375551666
                        </a>
                      </div>
                    </div>
                    
                    <div className="contact-card">
                      <div className="contact-icon email">
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <div className="contact-info">
                        <span className="contact-label">Email</span>
                        <a href="mailto:info@platinumholidayservice.co.uk" className="contact-value">
                          info@platinumholidayservice.co.uk
                        </a>
                      </div>
                    </div>

                    {/* <div className="contact-card">
                      <div className="contact-icon location">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div className="contact-info">
                        <span className="contact-label">Service Area</span>
                        <span className="contact-value">UK Airports</span>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            {/* <div className="newsletter-section">
              <div className="row align-items-center">
                <div className="col-12 col-md-6">
                  <div className="newsletter-content">
                    <h4 className="newsletter-title">
                      <i className="bi bi-envelope-paper"></i>
                      Stay Updated
                    </h4>
                    <p className="newsletter-description">
                      Get the latest deals and parking tips delivered to your inbox.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <form className="newsletter-form" onSubmit={handleSubmit(submit)}>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control newsletter-input"
                        placeholder="Enter your email address"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                      <Button
                        type="submit"
                        className="newsletter-btn"
                        loading={loading}
                        label="Subscribe"
                        icon="pi pi-send"
                      />
                    </div>
                    {errors.email && (
                      <small className="text-danger">{errors.email.message}</small>
                    )}
                  </form>
                </div>
              </div>
            </div> */}
          </div>
          <Toast ref={toast} />
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container-fluid">
            <div className="row align-items-center">
              {/* <div className="col-12 col-md-6"> */}
                <p className="copyright">
                  © <span className="currentYear">{currentYear}</span> Platinum Holiday. All rights reserved.
                </p>
              {/* </div> */}
              {/* <div className="col-12 col-md-6">
                <div className="footer-badges">
                  <span className="badge-item">
                    <i className="bi bi-shield-check"></i>
                    Secure Booking
                  </span>
                  <span className="badge-item">
                    <i className="bi bi-clock"></i>
                    24/7 Support
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

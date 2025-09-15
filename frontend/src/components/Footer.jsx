import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "bootstrap";
import { useForm } from "react-hook-form";
import api from "../api";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Preloader from "../Preloader";

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

      <footer className="footer-section custom-footer overflow-hidden">
        <div className="footer-sub-section">
          <div className="container-md">
            <div className="row gy-4">
              {/* Intro */}
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="d-flex align-items-start gap-3">
                  <div className="d-flex flex-column align-items-center">
                    <h6 className="footer-link-head mb-2 mb-sm-3">Intro</h6>
                    <button
                      onClick={() => goToLink("/")}
                      className="footer-logo-link"
                      style={{ padding: 0, background: "none", border: "none", marginTop: 12 }}
                      aria-label="Go to homepage"
                    >
                      <img
                        src="../assets/images/logo-light.png"
                        className="footer-logo"
                        alt="Platinum Holiday Service"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "contain",
                          display: "block",
                          boxShadow: "0 4px 24px 0 #b3c9c0",
                          borderRadius: 16,
                        }}
                      />
                    </button>
                  </div>
                  <div className="footer-desc">
                    Platinum Holiday delivers hassle-free, affordable airport parking with reliable, tailored solutions for every traveler.
                  </div>
                </div>
              </div>

              {/* Company */}
              <div className="col-12 col-sm-6 col-lg-3">
                <h6 className="footer-link-head">Company</h6>
                <ul className="footer-link-area">
                  <li className="footer-link-item">
                    <button onClick={() => goToLink("/about-us")} className="footer-link">About Us</button>
                  </li>
                  <li className="footer-link-item">
                    <button onClick={() => goToLink("/contact-us")} className="footer-link">Contact Us</button>
                  </li>
                  <li className="footer-link-item">
                    <button onClick={() => goToLink("/faqs")} className="footer-link">FAQs</button>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="col-12 col-sm-6 col-lg-3">
                <h6 className="footer-link-head">Support</h6>
                <ul className="footer-link-area">
                  <li className="footer-link-item">
                    <button onClick={() => goToLink("/terms-and-conditions")} className="footer-link">
                      Terms &amp; Conditions
                    </button>
                  </li>
                  <li className="footer-link-item">
                    <button onClick={() => goToLink("/privacy-policy")} className="footer-link">
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="col-12 col-sm-6 col-lg-3">
                <h6 className="footer-link-head text-sm-center text-lg-start">Contact Info</h6>
                <ul className="footer-link-area contact-detail">
                  <li className="footer-link-item">
                    <a href="tel:+447375551666" className="footer-link with-icon">
                      <div className="link-icon-area"><i className="bi bi-telephone-fill"></i></div>
                      <span>+44 7375 551666</span>
                    </a>
                  </li>
                  <li className="footer-link-item">
                    <a href="mailto:info@platinumholiday.co.uk" className="footer-link with-icon">
                      <div className="link-icon-area"><i className="bi bi-envelope-fill"></i></div>
                      <span>info@platinumholiday.co.uk</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter (optional) */}
            {/* <form className="row mt-4 g-2" onSubmit={handleSubmit(submit)}>
              ...
            </form> */}
          </div>
          <Toast ref={toast} />
        </div>

        <div className="sub-footer">
          <p>© <span className="currentYear">{currentYear}</span> All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

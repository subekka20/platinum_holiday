import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "bootstrap";
import { useForm } from "react-hook-form";
import api from "../api";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Navigate, useNavigate } from "react-router-dom";
import Preloader from "../Preloader";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleShow = () => {
      const isShow = window.scrollY > 100;
      setShowBackToTop(isShow);
    };

    window.addEventListener("scroll", handleShow);

    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = async (data) => {
    // Handle form submission
    setLoading(true);
    console.log(data);

    try {
      const response = await api.post("/api/user/submit-subscribed-user", data);
      console.log(response.data);
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
      <button
        className={`back-to-top-btn ${showBackToTop ? "show" : ""}`}
        id="back_to_top"
        onClick={handleBackToTop}
      >
        <svg className="svgIcon" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
        </svg>
      </button>

      <footer className="footer-section custom-footer overflow-hidden">
        <div className="footer-sub-section">
          <div className="container-md">
            <div className="row">
              {/* Four columns in a single row, evenly spaced */}
              <div
                className="col-12 d-flex flex-nowrap align-items-start"
                style={{
                  gap: "0",
                  justifyContent: "space-evenly",
                  alignItems: "flex-start",
                }}
              >
                {/* Company Content */}
                <div
                  className="footer-col col-12 col-md-3 mb-4 mb-md-0"
                  style={{
                    flex: 1,
                    minWidth: 220,
                    maxWidth: 320,
                    margin: "0 16px",
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h6 className="footer-link-head">Intro</h6>
                      <button
                        onClick={() => goToLink("/")}
                        className="footer-logo-link"
                        style={{ padding: 0, background: 'none', border: 'none', marginTop: 20 }}
                      >
                        <img
                          src="../assets/images/logo-light.png"
                          className="footer-logo"
                          alt="Platinum Holiday Service"
                          style={{ width: 80, height: 80, objectFit: 'contain', display: 'block', boxShadow: '0 4px 24px 0 #b3c9c0', borderRadius: '16px' }}
                        />
                      </button>
                    </div>
                    <div className="footer-desc">
                      Platinum Holiday delivers hassle-free, affordable airport parking with reliable, tailored solutions for every traveler.
                    </div>
                  </div>
                </div>
                {/* Company Links */}
                <div
                  className="footer-col col-12 col-md-3 mb-4 mb-md-0"
                  style={{
                    flex: 1,
                    minWidth: 180,
                    maxWidth: 260,
                    margin: "0 16px",
                  }}
                >
                  <h6 className="footer-link-head">Company</h6>
                  <ul className="footer-link-area">
                    <li className="footer-link-item">
                      <button
                        onClick={() => goToLink("/about-us")}
                        className="footer-link"
                      >
                        About Us
                      </button>
                    </li>
                    <li className="footer-link-item">
                      <button
                        onClick={() => goToLink("/contact-us")}
                        className="footer-link"
                      >
                        Contact Us
                      </button>
                    </li>
                    <li className="footer-link-item">
                      <button
                        onClick={() => goToLink("/faqs")}
                        className="footer-link"
                      >
                        FAQs
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Support Links */}
                <div
                  className="footer-col col-12 col-md-3 mb-4 mb-md-0"
                  style={{
                    flex: 1,
                    minWidth: 180,
                    maxWidth: 260,
                    margin: "0 16px",
                  }}
                >
                  <h6 className="footer-link-head">Support</h6>
                  <ul className="footer-link-area">
                    <li className="footer-link-item">
                      <button
                        onClick={() => goToLink("/terms-and-conditions")}
                        className="footer-link"
                      >
                        Terms & Conditions
                      </button>
                    </li>
                    <li className="footer-link-item">
                      <button
                        onClick={() => goToLink("/privacy-policy")}
                        className="footer-link"
                      >
                        Privacy Policy
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Contact Info */}
                <div
                  className="footer-col col-12 col-md-3"
                  style={{
                    flex: 1,
                    minWidth: 180,
                    maxWidth: 260,
                    margin: "0 16px",
                  }}
                >
                  <h6 className="footer-link-head text-sm-center text-lg-start">
                    Contact Info
                  </h6>
                  <ul className="footer-link-area contact-detail">
                    <li className="footer-link-item">
                      <a
                        href="tel:+44 7375 551666"
                        className="footer-link with-icon"
                      >
                        <div className="link-icon-area">
                          <i className="bi bi-telephone-fill"></i>
                        </div>
                        <span>+44 7375 551666</span>
                      </a>
                    </li>
                    <li className="footer-link-item">
                      <a
                        href="mailto:info@platinumholiday.co.uk"
                        className="footer-link with-icon"
                      >
                        <div className="link-icon-area">
                          <i className="bi bi-envelope-fill"></i>
                        </div>
                        <span>info@platinumholiday.co.uk</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Toast ref={toast} />
        </div>
        <div className="sub-footer">
          <p>
            © <span className="currentYear">{currentYear}</span> All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

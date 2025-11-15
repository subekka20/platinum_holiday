import React, { useState, useRef, useEffect } from "react";
import "./ContactUs.css";
import "./ContactUs-responsive.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import api from "../../api";
import Preloader from "../../Preloader";

const ContactUs = () => {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactInfo = [
    {
      icon: "bi-envelope-fill",
      title: "Email Us",
      content: "info@platinumholidayservice.co.uk",
      href: "mailto:info@platinumholidayservice.co.uk",
      description: "Send us an email anytime"
    },
    {
      icon: "bi-telephone-fill", 
      title: "Call Us",
      content: "+447375551666",
      href: "tel:+447375551666",
      description: "24/7 customer support"
    },
    {
      icon: "bi-clock-fill",
      title: "Business Hours",
      content: "24/7 Available",
      href: "#",
      description: "Always here to help"
    }
  ];

  const sendMessage = () => {
    setLoading(true);
    setShowError(true);

    setTimeout(() => {
      setLoading(false);
      setShowError(false);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Message sent successfully",
        life: 3000,
      });
    }, 2000);
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
      const response = await api.post("/api/user/submit-contact-or-faq-form", {
        ...data,
        type: "contact",
      });
      console.log(response.data);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Message sent successfully",
        life: 3000,
      });
      reset();
    } catch (e) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Message sent failed!",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Preloader />
      <Header />

      <Toast ref={toast} />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Get In Touch</div>
            <h1 className="hero-title">
              Contact Our
              <span className="gradient-text"> Expert Team</span>
            </h1>
            <p className="hero-description">
              We're here to help make your parking experience seamless. 
              Reach out to us anytime for assistance, questions, or support.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-icon">
                  <i className={info.icon}></i>
                </div>
                <div className="contact-details">
                  <h4 className="contact-title">{info.title}</h4>
                  <a href={info.href} className="contact-link">
                    {info.content}
                  </a>
                  <p className="contact-description">{info.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="main-contact-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="contact-content">
                <div className="section-badge">Contact Support</div>
                <h2 className="section-title">We're Here to Help</h2>
                <p className="contact-text">
                  At Platinum Holiday Service, your journey comes first. We go
                  beyond reservations to create stress-free, memorable
                  experiences. From the moment you connect with us until the end
                  of your stay, our team is committed to ensuring everything
                  feels seamless, supportive, and enjoyable.
                </p>
                
                <div className="contact-features">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="bi bi-lightning-fill"></i>
                    </div>
                    <div className="feature-text">
                      <h5>Quick Response</h5>
                      <p>We respond to all inquiries within 2 hours</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="feature-text">
                      <h5>Trusted Support</h5>
                      <p>Professional and reliable customer service</p>
                    </div>
                  </div>
                  
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="bi bi-chat-dots-fill"></i>
                    </div>
                    <div className="feature-text">
                      <h5>Multiple Channels</h5>
                      <p>Reach us via phone, email, or contact form</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact-form-wrapper">
                <div className="contact-form-card">
                  <h3 className="form-title">Send us a Message</h3>
                  <p className="form-subtitle">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                  
                  <form
                    className="modern-contact-form"
                    onSubmit={handleSubmit(submit)}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Full Name *
                        </label>
                        <InputText
                          id="name"
                          className="modern-input"
                          placeholder="Enter your full name"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                        {errors.name && (
                          <small className="error-message">
                            {errors.name.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email Address *
                        </label>
                        <InputText
                          id="email"
                          className="modern-input"
                          placeholder="Enter your email address"
                          keyfilter="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <small className="error-message">
                            {errors.email.message}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="mobileNumber" className="form-label">
                          Phone Number *
                        </label>
                        <InputText
                          id="mobileNumber"
                          className="modern-input"
                          placeholder="Enter your phone number"
                          keyfilter="num"
                          {...register("mobileNumber", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^\d{10}$/,
                              message: "Phone number must be 10 digits",
                            },
                          })}
                        />
                        {errors.mobileNumber && (
                          <small className="error-message">
                            {errors.mobileNumber.message}
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="subject" className="form-label">
                          Subject *
                        </label>
                        <InputText
                          id="subject"
                          className="modern-input"
                          placeholder="Enter message subject"
                          {...register("subject", {
                            required: "Subject is required",
                          })}
                        />
                        {errors.subject && (
                          <small className="error-message">
                            {errors.subject.message}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Message *
                      </label>
                      <InputTextarea
                        id="message"
                        className="modern-textarea"
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        {...register("message", {
                          required: "Message is required",
                        })}
                      />
                      {errors.message && (
                        <small className="error-message">
                          {errors.message.message}
                        </small>
                      )}
                    </div>

                    <Button
                      label="Send Message"
                      className="modern-submit-btn"
                      loading={loading}
                      type="submit"
                      icon="bi bi-send"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;

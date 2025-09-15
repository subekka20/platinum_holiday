import React, { useState, useRef } from "react";
import "./ContactUs.css";
import "./ContactUs-responsive.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tilt from "react-parallax-tilt";
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

      {/* Breadcrumb Section Start */}
      {/* <section className="breadcrumb-section overflow-hidden">
        <div className="container-md">
          <div className="row">
            <div className="col-12">
              <h3 className="breadcrumb-title">Contact us</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section> */}
      {/* Breadcrumb Section End */}

      <Toast ref={toast} />

      {/* Contact us Section Start */}
      <section className="section-padding overflow-hidden">
        <div className="container-md">
          <div className="row">
            <div className="col-12">
              <h3
                className="section-heading text-center mx-auto text-purple"
                data-aos="zoom-out"
              >
                Contact Us
              </h3>
            </div>

            {/* <div className="col-12 col-xl-6 col-lg-6 mx-auto">
              <div className="section-main-image-area mt-5" data-aos="zoom-out">
                <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8}>
                  <img
                    src="assets/images/contact/contact-us-pink.svg"
                    className="section-main-image animate-image"
                    alt="Contact Us"
                  />
                </Tilt>
              </div>
            </div> */}

            <div className="col-12 mb-4 mb-lg-5">
              <div className="mt-4 mt-sm-4 mt-lg-5">
                <p
                  className="section-paragraph text-center mb-0"
                  data-aos="fade"
                >
                  At Platinum Holiday Service, your journey comes first. We go
                  beyond reservations to create stress-free, memorable
                  experiences. From the moment you connect with us until the end
                  of your stay, our team is committed to ensuring everything
                  feels seamless, supportive, and enjoyable. Every detail
                  matters — and we're here to make sure your holiday is as
                  smooth as it is unforgettable.
                </p>
              </div>
            </div>

            <div className="col-12">
              <article className="contact-card">
                <div className="row">
                  <div className="col-12 col-xl-5">
                    <div className="contact-detail-section">
                      <div className="contact-image mb-3 text-center">
                        <img
                          src="/assets/images/contact/contactus.png"
                          alt="Contact Us"
                          style={{ width: "100%" }}
                        />
                      </div>
                      <h4 className="contact-card-head">Reach us</h4>

                      <p
                        className="content-card-desc mt-4 mb-0"
                        data-aos="fade"
                      >
                        Reach Out, We’re Listening Drop your details and message
                        in the form below — that’s all it takes. Our team will
                        connect with you swiftly to provide the support you
                        need.
                      </p>

                      <div className="contact-content-area">
                        {/* <div className="contact-content" data-aos="fade-left">
                                                    <i className="bi bi-geo-alt-fill"></i>
                                                    <a href="#" target="_blank" className="contact-content-link">
                                                        9-13 Wensum St, Burnham-on-Sea <br />
                                                        Somerset County <br />
                                                        TA8 1AL
                                                    </a>
                                                </div> */}

                        <div className="contact-content" data-aos="fade-left">
                          <i className="bi bi-envelope-fill"></i>
                          <a
                            href="mailto:info@platinumholiday.co.uk"
                            className="contact-content-link"
                          >
                            info@platinumholiday.co.uk
                          </a>
                        </div>

                        <div className="contact-content" data-aos="fade-left">
                          <i className="bi bi-telephone-fill"></i>
                          <a
                            href="tel:+44 7375 551666"
                            className="contact-content-link"
                          >
                            +44 7375 551666
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-7">
                    <div className="contact-form-section" data-aos="fade-up">
                      <h4 className="contact-card-head">
                        Get in touch with us
                      </h4>

                      <form
                        action=""
                        className="contact-form-area"
                        onSubmit={handleSubmit(submit)}
                      >
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <div className="custom-form-group mb-3 mb-sm-4">
                              <label
                                htmlFor="name"
                                className="custom-form-label form-required"
                              >
                                Name
                              </label>
                              <InputText
                                id="name"
                                className="custom-form-input"
                                {...register("name", {
                                  required: "Name is required",
                                })}
                              />
                              {errors.name && (
                                <small className="text-danger form-error-msg">
                                  {errors.name.message}
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="custom-form-group mb-3 mb-sm-4">
                              <label
                                htmlFor="email"
                                className="custom-form-label form-required"
                              >
                                Email
                              </label>
                              <InputText
                                id="email"
                                className="custom-form-input"
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
                                <small className="text-danger form-error-msg">
                                  {errors.email.message}
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="custom-form-group mb-3 mb-sm-4">
                              <label
                                htmlFor="phoneNumber"
                                className="custom-form-label form-required"
                              >
                                Phone number
                              </label>
                              <InputText
                                id="mobileNumber"
                                className="custom-form-input"
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
                                <small className="text-danger form-error-msg">
                                  {errors.mobileNumber.message}
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="col-12 col-sm-6">
                            <div className="custom-form-group mb-3 mb-sm-4">
                              <label
                                htmlFor="subject"
                                className="custom-form-label form-required"
                              >
                                Subject
                              </label>
                              <InputText
                                id="subject"
                                className="custom-form-input"
                                {...register("subject", {
                                  required: "Subject is required",
                                })}
                              />
                              {errors.subject && (
                                <small className="text-danger form-error-msg">
                                  {errors.subject.message}
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="custom-form-group mb-3 mb-sm-4">
                              <label
                                htmlFor="message"
                                className="custom-form-label form-required"
                              >
                                Message
                              </label>
                              <InputTextarea
                                id="message"
                                className="custom-form-input"
                                rows={5}
                                cols={30}
                                {...register("message", {
                                  required: "Message is required",
                                })}
                              />
                              {errors.message && (
                                <small className="text-danger form-error-msg mt-0">
                                  {errors.message.message}
                                </small>
                              )}
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="">
                              <Button
                                label="SEND"
                                className="submit-button theme-pink ps-5 pe-5 justify-content-center contact-btn"
                                loading={loading}
                                type="submit"
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* Contact us Section End */}

      {/* <section className="pb-5 overflow-hidden">
                <div className="w-100 map-section">
                    <iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=London+(The%20Parking%20Deals)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </section> */}

      <Footer />
    </>
  );
};

export default ContactUs;

import React from "react";
import "./AboutUs.css";
import "./AboutUs-responsive.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Tilt from "react-parallax-tilt";
import Preloader from "../../Preloader";

const AboutUs = () => {
  return (
    <>
      <Preloader />
      <Header />

      {/* Breadcrumb Section Start */}
      {/* <section className="breadcrumb-section overflow-hidden">
                <div className="container-md">
                    <div className="row">
                        <div className="col-12">
                            <h3 className='breadcrumb-title'>About us</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">About us</li>
                                </ol>
                            </nav>

                        </div>
                    </div>
                </div>
            </section> */}
      {/* Breadcrumb Section End */}

      {/* About us Section Start */}
      <section className="section-padding overflow-hidden">
        <div className="container">
          <h3 className="section-heading text-center mx-auto text-white">
            About Us
          </h3>

          <div className="row content-margin-top">
            {/* <div className="col-12 mx-auto">
                            <div className="section-image-area">
                                <Tilt>
                                    <img src="assets/images/logo.png" className='about-img animate-scale-image' alt="Platinum Holiday Service" />
                                </Tilt>
                            </div>
                        </div> */}

            <div className="col-12 ">
              <p className="section-paragraph text-center mb-0" style={{color:"#FFF"}}>
                Platinum Holiday Service is your trusted partner for stress-free
                airport parking. Our goal is to make every journey start and end
                with ease by offering reliable, affordable, and convenient
                parking solutions tailored to your needs. We carefully select
                and evaluate parking options to guarantee secure facilities and
                the best value for money. With our simple 24/7 online platform,
                you can book, manage, and confirm your space in just a few
                clicks—anytime, anywhere. From short-stay and long-stay to valet
                and self-parking, we provide flexible choices designed around
                modern travelers. Thank you for choosing Platinum Holiday
                Service—we look forward to making your travel smoother with
                parking you can depend on
              </p>
            </div>
          </div>

          <div className="row content-margin-top content-card-row">
            <div className="col-12 mx-auto">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-100"> */}
                <article className="about-content-card">
                  <div className="content-card-header">
                    <div className="content-icon-area">
                      <img
                        src="assets/images/about/promise.png"
                        alt="Our Promise"
                      />
                    </div>
                    <h4 className="content-card-head">Our Promise</h4>
                  </div>
                  <p className="content-card-desc">
                    At Platinum Holiday Service, we specialize in providing
                    exceptional airport parking solutions. By rigorously
                    evaluating available parking options, we ensure that you
                    receive unparalleled service at the most competitive rates.
                    Our website is designed for ease of use, offering a secure,
                    comprehensive, and 24/7 accessible platform.
                  </p>
                </article>
              {/* </Tilt> */}
            </div>

            <div className="col-12 mx-auto">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-100"> */}
                <article className="about-content-card">
                  <div className="content-card-header">
                    <div className="content-icon-area">
                      <img
                        src="assets/images/about/service.png"
                        alt="Our Services"
                      />
                    </div>
                    <h4 className="content-card-head">Our Services</h4>
                  </div>
                  <p className="content-card-desc">
                    We cater to a diverse clientele including business
                    professionals, families, and solo travelers, offering a
                    variety of parking services tailored to meet different
                    needs. Our offerings include Valet Parking, Self-Park
                    Options, Long-Term Parking, all chosen to maximize your
                    convenience and security.
                  </p>
                </article>
              {/* </Tilt> */}
            </div>

            <div className="col-12 mx-auto">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-100"> */}
                <article className="about-content-card">
                  <div className="content-card-header">
                    <div className="content-icon-area">
                      <img
                        src="assets/images/about/technology.png"
                        alt="Innovative Technology"
                      />
                    </div>
                    <h4 className="content-card-head">Innovative Technology</h4>
                  </div>
                  <p className="content-card-desc">
                    Our state-of-the-art booking system is intuitive and
                    user-friendly, facilitating a quick and easy search process
                    to help you find exactly what you need. We are committed to
                    leveraging cutting-edge technology to enhance your
                    experience and interaction with our services.
                  </p>
                </article>
              {/* </Tilt> */}
            </div>

            <div className="col-12 mx-auto">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-100"> */}
                <article className="about-content-card">
                  <div className="content-card-header">
                    <div className="content-icon-area">
                      <img
                        src="assets/images/about/safety.png"
                        alt="Commitment to Safety"
                      />
                    </div>
                    <h4 className="content-card-head">Commitment to Safety</h4>
                  </div>
                  <p className="content-card-desc">
                    At Platinum Holiday Service, your vehicle’s safety is our
                    top priority. We conduct thorough inspections of each
                    facility to ensure robust security measures are always in
                    place. Additionally, we regularly verify that all
                    operational practices and necessary insurance and liability
                    documentation of our partners adhere to strict industry
                    standards.
                  </p>
                </article>
              {/* </Tilt> */}
            </div>

            <div className="col-12 mx-auto">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-100"> */}
                <article className="about-content-card">
                  <div className="content-card-header">
                    <div className="content-icon-area">
                      <img
                        src="assets/images/about/customer-service.png"
                        alt="Superior Customer Service"
                      />
                    </div>
                    <h4 className="content-card-head">
                      Superior Customer Service
                    </h4>
                  </div>
                  <p className="content-card-desc">
                    We pride ourselves on delivering superior customer service.
                    Our expert team is dedicated to efficiently resolving your
                    inquiries and addressing any issues with professionalism and
                    care. Your satisfaction is our foremost priority, and we
                    strive to exceed your expectations in every interaction.
                  </p>
                </article>
              {/* </Tilt> */}
            </div>
          </div>
        </div>
      </section>
      {/* About us Section End */}

      <Footer />
    </>
  );
};

export default AboutUs;

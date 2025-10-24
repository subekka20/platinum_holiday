import React, { useEffect } from "react";
import "./AboutUs.css";
import "./AboutUs-responsive.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Tilt from "react-parallax-tilt";
import Preloader from "../../Preloader";

const AboutUs = () => {
  useEffect(() => {
    // Add scroll animations or other effects here if needed
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Preloader />
      <Header />

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="story-content">
                <div className="section-badge">Our Story</div>
                <h2 className="section-title">
                  Built on Trust, Driven by Excellence
                </h2>
                <p className="story-text">
                  Founded with a simple mission: to eliminate the stress of airport parking. 
                  We understand that every journey begins with a single step, and that step 
                  shouldn't be worrying about where to park your car.
                </p>
                <p className="story-text">
                  Today, we've grown into a trusted network of premium parking partners, 
                  serving thousands of travelers with the same commitment to quality and 
                  reliability that started our journey.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-visual">
                <Tilt
                  className="tilt-container"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1000}
                >
                  <div className="visual-card">
                    <div className="card-content">
                      <i className="bi bi-building"></i>
                      <h3>Platinum Holiday Service</h3>
                      <p>Your trusted parking partner</p>
                    </div>
                  </div>
                </Tilt>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Values</div>
            <h2 className="section-title">What Drives Us Forward</h2>
            <p className="section-subtitle">
              Our core values shape everything we do, from selecting partners 
              to delivering exceptional customer experiences.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-heart-fill"></i>
              </div>
              <h3>Trust & Security</h3>
              <p>
                Every parking facility undergoes rigorous security assessments. 
                Your vehicle's safety is our top priority with 24/7 monitoring 
                and comprehensive insurance coverage.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-lightning-charge"></i>
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously evolve our platform with cutting-edge technology, 
                ensuring seamless booking experiences and real-time updates for 
                complete transparency.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-people-fill"></i>
              </div>
              <h3>Customer First</h3>
              <p>
                Your journey matters to us. From instant booking confirmations 
                to responsive support, we're committed to exceeding your 
                expectations at every touchpoint.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <i className="bi bi-graph-up-arrow"></i>
              </div>
              <h3>Reliability</h3>
              <p>
                Count on us for consistent, dependable service. Our proven track 
                record and partner network ensure your parking is always 
                guaranteed and hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="services-content">
                <div className="section-badge">Services</div>
                <h2 className="section-title">
                  Comprehensive Parking Solutions
                </h2>
                <p className="services-description">
                  From quick drop-offs to extended stays, we offer flexible 
                  parking options designed to fit every travel need and budget.
                </p>

                <div className="service-features">
                  <div className="feature-row">
                    <div className="feature-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Meet & Greet Valet</h4>
                      <p>Premium service with doorstep pickup and delivery</p>
                    </div>
                  </div>

                  <div className="feature-row">
                    <div className="feature-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Self-Park Options</h4>
                      <p>Secure, affordable parking with shuttle transfers</p>
                    </div>
                  </div>

                  <div className="feature-row">
                    <div className="feature-icon">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="feature-content">
                      <h4>Long-Stay Deals</h4>
                      <p>Special rates for extended parking periods</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="services-visual">
                <div className="service-cards">
                  <div className="service-mini-card card-1">
                    <i className="bi bi-car-front-fill"></i>
                    <span>Valet Service</span>
                  </div>
                  <div className="service-mini-card card-2">
                    <i className="bi bi-shield-check"></i>
                    <span>24/7 Security</span>
                  </div>
                  <div className="service-mini-card card-3">
                    <i className="bi bi-bus-front"></i>
                    <span>Free Shuttle</span>
                  </div>
                  <div className="service-mini-card card-4">
                    <i className="bi bi-credit-card"></i>
                    <span>Easy Payment</span>
                  </div>
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

export default AboutUs;

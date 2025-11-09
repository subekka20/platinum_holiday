import React, { useEffect } from "react";
import "./Services.css";
import "./Services-responsive.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Preloader from "../../Preloader";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: 1,
      icon: "bi-person-vcard",
      title: "Meet & Greet",
      price: "From £15",
      badge: "Premium",
      features: [
        "Professional valet service",
        "Terminal pickup & drop-off",
        "Secure covered parking",
        "Luggage assistance",
        "Priority service"
      ],
      description: "Premium door-to-door service where our professional valet meets you at the terminal entrance.",
      popular: true
    },
    {
      id: 2,
      icon: "bi-car-front-fill",
      title: "Valet Parking",
      price: "From £12",
      badge: "Popular",
      features: [
        "Drop off at terminal",
        "Professional valet team",
        "24/7 CCTV monitoring",
        "Quick return service",
        "Fully insured facility"
      ],
      description: "Drive to the terminal, hand over your keys, and we'll park your car securely."
    },
    {
      id: 3,
      icon: "bi-p-square",
      title: "Self-Parking",
      price: "From £8",
      badge: "Budget",
      features: [
        "Park yourself",
        "Free shuttle service",
        "24/7 security",
        "Flexible booking",
        "Easy terminal access"
      ],
      description: "Park your own vehicle in our secure facility with complimentary shuttle transfers."
    },
    {
      id: 4,
      icon: "bi-calendar-range",
      title: "Long-Term Parking",
      price: "From £5/day",
      badge: "Extended",
      features: [
        "Extended stay discounts",
        "Weekly rates available",
        "Covered parking option",
        "Vehicle maintenance check",
        "Flexible return dates"
      ],
      description: "Perfect for extended trips with special rates for longer stays and extra vehicle care."
    }
  ];
  return (
    <>
      <Preloader />
      <Header />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">Our Services</div>
            <h1 className="hero-title">
              Premium Parking Solutions
              <span className="gradient-text"> Made Simple</span>
            </h1>
            <p className="hero-description">
              Choose from our comprehensive range of parking services designed to make 
              your travel experience seamless, secure, and stress-free.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">4</div>
                <div className="stat-label">Service Options</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Security</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-highlight-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="features-content">
                <div className="section-badge">Why Choose Us</div>
                <h2 className="section-title">Security & Excellence Combined</h2>
                <p className="features-description">
                  Every parking solution comes with our unwavering commitment to security, 
                  reliability, and exceptional customer service that exceeds expectations.
                </p>
                
                <div className="features-list">
                  <div className="feature-row">
                    <div className="feature-icon-small">
                      <i className="bi bi-shield-check"></i>
                    </div>
                    <div className="feature-text">
                      <h4>Advanced Security</h4>
                      <p>24/7 CCTV surveillance, security personnel, and fully monitored facilities</p>
                    </div>
                  </div>
                  
                  <div className="feature-row">
                    <div className="feature-icon-small">
                      <i className="bi bi-lightning-charge"></i>
                    </div>
                    <div className="feature-text">
                      <h4>Instant Confirmation</h4>
                      <p>Real-time availability check and immediate booking confirmation</p>
                    </div>
                  </div>
                  
                  <div className="feature-row">
                    <div className="feature-icon-small">
                      <i className="bi bi-headset"></i>
                    </div>
                    <div className="feature-text">
                      <h4>24/7 Support</h4>
                      <p>Round-the-clock customer support for any questions or assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="features-visual">
                <div className="visual-cards">
                  <div className="visual-card">
                    <i className="bi bi-shield-check-fill"></i>
                    <h5>100% Secure</h5>
                    <p>Advanced security monitoring</p>
                  </div>
                  <div className="visual-card">
                    <i className="bi bi-clock-history"></i>
                    <h5>24/7 Available</h5>
                    <p>Round the clock access</p>
                  </div>
                  <div className="visual-card">
                    <i className="bi bi-star-fill"></i>
                    <h5>Premium Quality</h5>
                    <p>Exceptional service standards</p>
                  </div>
                  <div className="visual-card">
                    <i className="bi bi-geo-alt-fill"></i>
                    <h5>Prime Location</h5>
                    <p>Close to all major airports</p>
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

export default Services;

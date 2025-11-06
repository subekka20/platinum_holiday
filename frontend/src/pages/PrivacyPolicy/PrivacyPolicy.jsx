import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ScrollTop } from "primereact/scrolltop";
import { Chip } from "primereact/chip";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const privacyData = [
    {
      id: 1,
      title: "Information Collection",
      icon: "📊",
      sections: [
        {
          subtitle: "Personal Information",
          content:
            "We collect personal information such as your name, email address, phone number, and payment details when you make a booking. This information is necessary to provide our services and process your reservations.",
        },
        {
          subtitle: "Non-Personal Information", 
          content:
            "We automatically collect non-personal information including browser type, IP address, device information, and usage data to improve our website functionality and user experience.",
        },
        {
          subtitle: "Location Data",
          content:
            "With your consent, we may collect location data to provide location-based services, find nearby parking facilities, and enhance our service offerings.",
        },
      ],
    },
    {
      id: 2,
      title: "Information Usage",
      icon: "⚙️",
      sections: [
        {
          subtitle: "Service Provision",
          content:
            "We use your information to provide and manage your parking reservations, process payments, send confirmation emails, and communicate about your bookings.",
        },
        {
          subtitle: "Service Improvement",
          content:
            "Your data helps us improve our website, analyze user behavior, personalize your experience, and develop new features and services.",
        },
        {
          subtitle: "Communication",
          content:
            "We may use your contact information to send you updates about your bookings, promotional offers, service announcements, and important policy changes.",
        },
      ],
    },
    {
      id: 3,
      title: "Data Protection & Security", 
      icon: "🛡️",
      sections: [
        {
          subtitle: "Security Measures",
          content:
            "We implement industry-standard security measures including SSL encryption, secure payment processing, regular security audits, and access controls to protect your personal information.",
        },
        {
          subtitle: "Data Storage",
          content:
            "Your data is stored on secure servers with restricted access. We use encryption for sensitive information and maintain regular backups to ensure data integrity.",
        },
        {
          subtitle: "Third-Party Security",
          content:
            "All third-party service providers we work with are required to maintain appropriate security standards and comply with data protection regulations.",
        },
      ],
    },
    {
      id: 4,
      title: "Information Sharing",
      icon: "🤝",
      sections: [
        {
          subtitle: "Service Providers",
          content:
            "We share necessary information with parking facility operators, payment processors, and customer support services to fulfill your bookings and provide assistance.",
        },
        {
          subtitle: "Legal Requirements", 
          content:
            "We may disclose your information when required by law, to protect our rights, comply with legal proceedings, or respond to government requests.",
        },
        {
          subtitle: "Business Transfers",
          content:
            "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, subject to the same privacy protections.",
        },
      ],
    },
    {
      id: 5,
      title: "Your Privacy Rights",
      icon: "⚖️", 
      sections: [
        {
          subtitle: "Access and Update",
          content:
            "You have the right to access, update, or correct your personal information at any time through your account settings or by contacting our support team.",
        },
        {
          subtitle: "Data Deletion",
          content:
            "You can request the deletion of your personal data, subject to legal and contractual obligations. We will respond to such requests within 30 days.",
        },
        {
          subtitle: "Opt-Out Options",
          content:
            "You can opt out of marketing communications at any time by using the unsubscribe links in emails or updating your communication preferences in your account.",
        },
      ],
    },
    {
      id: 6,
      title: "Cookies & Tracking",
      icon: "🍪",
      sections: [
        {
          subtitle: "Cookie Usage",
          content:
            "We use cookies and similar technologies to enhance your browsing experience, remember your preferences, analyze site traffic, and provide personalized content.",
        },
        {
          subtitle: "Cookie Types",
          content:
            "Our website uses essential cookies for functionality, analytics cookies for performance measurement, and marketing cookies for personalized advertising.",
        },
        {
          subtitle: "Cookie Control",
          content:
            "You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our website.",
        },
      ],
    },
  ];

  return (
    <>
      <Header />

      {/* Modern Privacy Policy Section */}
      <section className="privacy-section">
        <div className="container">
          {/* Privacy Content */}
          <div className="row">
            <div className="col-12 col-xl-10 mx-auto">
              <Card className="privacy-main-card">
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="privacy-hero">
                      <h1 className="privacy-hero-title">Privacy Policy</h1>
                      <p className="privacy-hero-subtitle">
                        Your privacy is important to us. Learn how we protect and handle your personal information.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Overview */}
                <div className="privacy-overview">
                  <h5 className="privacy-overview-title">🛡️ Privacy Overview</h5>
                  <p className="privacy-overview-text">
                    This privacy policy explains how Platinum Holiday Service collects, uses, and protects your information when you use our website and services. We are committed to ensuring your privacy is protected.
                  </p>
                </div>

                {/* Accordion Privacy */}
                <Accordion
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                  className="privacy-accordion"
                >
                  {privacyData.map((privacy, index) => (
                    <AccordionTab
                      key={privacy.id}
                      header={
                        <div className="privacy-header">
                          <span className="privacy-header-icon">{privacy.icon}</span>
                          <span className="privacy-header-text">
                            {String(privacy.id).padStart(2, "0")}. {privacy.title}
                          </span>
                        </div>
                      }
                    >
                      <div className="privacy-content">
                        {privacy.sections.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="privacy-section-item"
                          >
                            <h6 className="privacy-section-title">
                              {privacy.id}.{sectionIndex + 1} {section.subtitle}
                            </h6>
                            <p className="privacy-section-text">
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionTab>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        {/* <ScrollTop threshold={100} className="privacy-scroll-top" /> */}
      </section>

      <Footer />
    </>
  );
};
export default PrivacyPolicy;

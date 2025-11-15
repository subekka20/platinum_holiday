import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ScrollTop } from "primereact/scrolltop";
import { Chip } from "primereact/chip";
import "./TermsAndConditions.css";
import { Divider } from "primereact/divider";

const TermsAndConditions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const termsData = [
    {
      id: 1,
      title: "Booking Conditions",
      icon: "📋",
      sections: [
        {
          subtitle: "Confirmation and Receipt",
          content:
            "Upon completing your booking, a confirmation voucher will be sent to the email address you provided. If you do not receive this voucher, please contact our support team immediately. Refunds are not available for no-shows or cancellations made less than 48 hours before your scheduled service.",
        },
        {
          subtitle: "Agency Role",
          content:
            "Our company acts as an agent for various service providers, including car parks. Your agreement will be directly with the individual service provider, and you will be bound by their specific terms and conditions, which include limitations and exclusions of liability.",
        },
        {
          subtitle: "Liability for Vehicle",
          content:
            "Service providers will accept liability for any proven negligence on their part. We advise you to inspect your vehicle upon collection thoroughly, as claims cannot be considered once the vehicle leaves the premises.",
        },
      ],
    },
    {
      id: 2,
      title: "Complaints Procedure",
      icon: "📝",
      sections: [
        {
          subtitle: "Submitting Complaints",
          content:
            "Please submit any grievances in writing with as much detail as possible.",
        },
        {
          subtitle: "Response Time",
          content:
            "We aim to respond to all complaints within 7 business days.",
        },
        {
          subtitle: "Vehicle Safety",
          content:
            "Our company is not responsible for the safety of vehicles or items left within while under the care of a service provider. Customers should use their insurance for claims concerning damages or losses.",
        },
        {
          subtitle: "Immediate Reporting",
          content:
            "Any damages identified at the time of vehicle return should be reported to the service operator before leaving the site to be eligible for potential claims.",
        },
      ],
    },
    {
      id: 3,
      title: "Cancellation Policy",
      icon: "❌",
      sections: [
        {
          subtitle: "Cancellation Process",
          content:
            "Cancellations must be made directly through our platform to be considered valid.",
        },
        {
          subtitle: "Cancellation Notice",
          content:
            "Full refunds are provided for cancellations made more than 48 hours before the scheduled service. Cancellations made within 48 hours of the service date will not be eligible for a refund.",
        },
        {
          subtitle: "Non-refundable Fees",
          content:
            "Booking fees, SMS charges, and special promotional offers are non-refundable.",
        },
      ],
    },
    {
      id: 4,
      title: "Limitation of Liability",
      icon: "⚖️",
      sections: [
        {
          subtitle: "Booking Liability",
          content:
            "Our company, acting solely as a booking agent, is liable only for direct damages caused by our negligence in processing bookings. Our total liability is limited to the cost of your booking, including any fees paid.",
        },
      ],
    },
  ];

  return (
    <>
      <Header />

      {/* Modern Terms & Conditions Section */}
      <section className="terms-section">
        <div className="container">
          {/* Hero Section */}

          {/* Terms Content */}
          <div className="row">
            <div className="col-12 col-xl-10 mx-auto">
              <Card className="terms-main-card">
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="terms-hero">
                      <h1 className="terms-hero-title">Terms & Conditions</h1>
                      <p className="terms-hero-subtitle">
                        Welcome to Platinum Holiday Service! Please review our
                        terms and conditions below
                      </p>
                      {/* <Chip 
                  label="Last updated: June 18, 2024" 
                  className="terms-updated-chip"
                /> */}
                    </div>
                  </div>
                </div>
                {/* Quick Overview */}
                <div className="terms-overview">
                  <h5 className="terms-overview-title">📖 Quick Overview</h5>
                  <p className="terms-overview-text">
                    By using our website and services, you agree to comply with
                    the following terms and conditions. These terms protect both
                    you and our service providers.
                  </p>
                </div>

                {/* Accordion Terms */}
                <Accordion
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                  className="terms-accordion"
                >
                  {termsData.map((term, index) => (
                    <AccordionTab
                      key={term.id}
                      header={
                        <div className="terms-header">
                          <span className="terms-header-icon">{term.icon}</span>
                          <span className="terms-header-text">
                            {String(term.id).padStart(2, "0")}. {term.title}
                          </span>
                        </div>
                      }
                    >
                      <div className="terms-content">
                        {term.sections.map((section, sectionIndex) => (
                          <div
                            key={sectionIndex}
                            className="terms-section-item"
                          >
                            <h6 className="terms-section-title">
                              {term.id}.{sectionIndex + 1} {section.subtitle}
                            </h6>
                            <p className="terms-section-text">
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </AccordionTab>
                  ))}
                </Accordion>

                {/* Contact Section */}
                <div className="terms-contact">
                  <h5 className="terms-contact-title">📧 Have Questions?</h5>
                  <p className="terms-contact-text">
                    If you have any questions about these Terms & Conditions,
                    please contact us at  <a href="tel:+447375551666" className="contact-value">
                          +447375551666
                        </a>
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Scroll to Top */}
        {/* <ScrollTop threshold={100} className="terms-scroll-top" /> */}
      </section>

      <Footer />
    </>
  );
};
export default TermsAndConditions;

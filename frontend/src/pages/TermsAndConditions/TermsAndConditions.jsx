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
      title: "Introduction",
      icon: "📋",
      sections: [
        {
          subtitle: "Purpose and Agreement",
          content:
            "These terms and conditions govern the use of our parking booking services provided through Platinum Holiday Service. By accessing or using our services, you agree to comply with these terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.",
        },
        {
          subtitle: "Service Overview",
          content:
            "Our platform provides an online booking service that allows users to search for, compare, and reserve parking spaces at various locations. We act as an intermediary between customers and parking facility operators.",
        },
      ],
    },
    {
      id: 2,
      title: "Definitions",
      icon: "📖",
      sections: [
        {
          subtitle: "Key Terms",
          content:
            "User: Any individual or entity that books parking through our platform. Service: The online platform that allows users to search for and book parking spaces. Booking: A confirmed reservation for a parking space. Provider: The parking facility operator or owner.",
        },
        {
          subtitle: "Platform Definitions",
          content:
            "Platform: Our website, mobile application, and related services. Confirmation: Electronic receipt acknowledging your parking reservation. Cancellation: The process of voiding a confirmed booking before the scheduled parking period.",
        },
      ],
    },
    {
      id: 3,
      title: "User Obligations",
      icon: "👥",
      sections: [
        {
          subtitle: "Accurate Information",
          content:
            "Users must provide accurate personal and vehicle information during the booking process. This includes correct contact details, vehicle registration numbers, and payment information. Users are responsible for updating any changes to their information.",
        },
        {
          subtitle: "Payment Responsibility",
          content:
            "Users must ensure payment is made in full and on time according to the specified payment terms. All booking fees, service charges, and additional costs must be settled before the parking period commences.",
        },
        {
          subtitle: "Legal Compliance",
          content:
            "Users must comply with all applicable laws and regulations regarding parking, including local traffic laws, parking restrictions, and facility-specific rules. Users are solely responsible for any violations or fines incurred.",
        },
      ],
    },
    {
      id: 4,
      title: "Booking Process",
      icon: "🚗",
      sections: [
        {
          subtitle: "Reservation Steps",
          content:
            "To complete a booking, users must: 1) Select a location and date, 2) Provide accurate vehicle details, 3) Complete payment process, 4) Receive confirmation via email or SMS. Bookings are only confirmed upon successful payment processing.",
        },
        {
          subtitle: "Confirmation and Receipt",
          content:
            "Upon completing your booking, a confirmation voucher will be sent to the email address you provided. This confirmation serves as your parking permit. If you do not receive this confirmation within 24 hours, please contact our support team immediately.",
        },
        {
          subtitle: "Booking Modifications",
          content:
            "Changes to existing bookings may be subject to availability and additional charges. Requests for modifications must be made through our platform or customer service team with adequate notice.",
        },
      ],
    },
    {
      id: 5,
      title: "Payment Terms",
      icon: "💳",
      sections: [
        {
          subtitle: "Accepted Payment Methods",
          content:
            "We accept major credit and debit cards, and secure online payment systems. All payments are processed through encrypted, secure payment gateways to protect your financial information.",
        },
        {
          subtitle: "Fees and Charges",
          content:
            "Booking fees and service charges may apply to your reservation. These fees will be clearly displayed before payment confirmation. Additional costs for extended parking, premium services, or facility-specific charges may apply.",
        },
        {
          subtitle: "Payment Processing",
          content:
            "Payment must be completed at the time of booking to secure your reservation. Failed payments will result in booking cancellation. Currency conversion charges may apply for international transactions.",
        },
      ],
    },
    {
      id: 6,
      title: "Cancellation and Modifications",
      icon: "❌",
      sections: [
        {
          subtitle: "Cancellation Policy",
          content:
            "Cancellations must be made directly through our platform to be considered valid. Full refunds are provided for cancellations made more than 48 hours before the scheduled service. Cancellations made within 48 hours of the service date will not be eligible for a refund.",
        },
        {
          subtitle: "Modification Requests",
          content:
            "Changes to booking dates, times, or vehicle details may be accommodated subject to availability. Modification fees may apply depending on the nature and timing of the requested changes.",
        },
        {
          subtitle: "No-Show Policy",
          content:
            "Refunds are not available for no-shows or late arrivals beyond the grace period specified by the parking provider. Users who fail to utilize their booked parking space forfeit their payment.",
        },
      ],
    },
    {
      id: 7,
      title: "Liability Limitation",
      icon: "⚖️",
      sections: [
        {
          subtitle: "Service Provider Liability",
          content:
            "Our company acts as an agent for various service providers, including car parks. Your primary agreement is directly with the individual service provider, and you are bound by their specific terms and conditions, which include limitations and exclusions of liability.",
        },
        {
          subtitle: "Platform Liability",
          content:
            "Our company, acting solely as a booking agent, is liable only for direct damages caused by our negligence in processing bookings. Our total liability is limited to the cost of your booking, including any fees paid.",
        },
        {
          subtitle: "Vehicle Safety",
          content:
            "We are not responsible for the safety of vehicles or items left within while under the care of a service provider. Service providers will accept liability for any proven negligence on their part. Users should maintain appropriate insurance coverage for their vehicles.",
        },
      ],
    },
    {
      id: 8,
      title: "Parking Regulations",
      icon: "🚦",
      sections: [
        {
          subtitle: "Local Law Compliance",
          content:
            "Users must adhere to all posted parking signs, local traffic regulations, and facility-specific rules. Violation of parking regulations may result in fines, towing, or other penalties for which users are solely responsible.",
        },
        {
          subtitle: "Facility Rules",
          content:
            "Each parking facility may have specific operational rules regarding vehicle size restrictions, prohibited items, operating hours, and access procedures. Users must comply with all facility requirements.",
        },
        {
          subtitle: "Inspection Requirements",
          content:
            "Users should inspect their vehicle thoroughly upon collection. Any damages identified at the time of vehicle return should be reported to the service operator immediately before leaving the premises to be eligible for potential claims.",
        },
      ],
    },
    {
      id: 9,
      title: "Privacy Policy",
      icon: "🔒",
      sections: [
        {
          subtitle: "Data Collection",
          content:
            "We collect personal information necessary to process your booking, including contact details, payment information, and vehicle details. This information is used solely for service provision and customer support purposes.",
        },
        {
          subtitle: "Data Protection",
          content:
            "Your personal data is stored securely and protected using industry-standard encryption. We do not sell, rent, or share your personal information with third parties except as necessary to provide our services or as required by law.",
        },
        {
          subtitle: "Data Retention",
          content:
            "We retain your personal information only for as long as necessary to provide our services and comply with legal obligations. You have the right to request access, correction, or deletion of your personal data.",
        },
      ],
    },
    {
      id: 10,
      title: "Dispute Resolution",
      icon: "🤝",
      sections: [
        {
          subtitle: "Complaints Procedure",
          content:
            "Please submit any grievances in writing with as much detail as possible through our customer service channels. We aim to respond to all complaints within 7 business days and resolve issues fairly and promptly.",
        },
        {
          subtitle: "Governing Law",
          content:
            "These terms and conditions are governed by the laws of the United Kingdom. Any disputes arising from these terms will be subject to the exclusive jurisdiction of UK courts.",
        },
        {
          subtitle: "Alternative Resolution",
          content:
            "Before pursuing legal action, parties agree to attempt resolution through mediation or arbitration when appropriate. This can provide a faster and more cost-effective solution for both parties.",
        },
      ],
    },
    {
      id: 11,
      title: "Amendments and Updates",
      icon: "📝",
      sections: [
        {
          subtitle: "Right to Modify",
          content:
            "We reserve the right to update these terms and conditions at any time to reflect changes in our services, legal requirements, or business practices. Material changes will be communicated to users in advance.",
        },
        {
          subtitle: "Notification Process",
          content:
            "Users will be notified of significant changes via email, website notifications, or other appropriate communication methods. Continued use of our services after notification constitutes acceptance of the updated terms.",
        },
        {
          subtitle: "Review Responsibility",
          content:
            "Users are encouraged to review these terms periodically to stay informed of any changes. The most current version will always be available on our website with the last revision date clearly indicated.",
        },
      ],
    },
    {
      id: 12,
      title: "Contact Information",
      icon: "📞",
      sections: [
        {
          subtitle: "Customer Support",
          content:
            "For questions, concerns, or support regarding these terms or our services, please contact our customer service team. We are committed to providing prompt and helpful assistance to all users.",
        },
        {
          subtitle: "Business Hours",
          content:
            "Our customer support team is available 24/7 to assist with urgent matters and during regular business hours for general inquiries. Response times may vary depending on the complexity of your inquiry.",
        },
        {
          subtitle: "Communication Channels",
          content:
            "You can reach us via phone at +447375551666, email through our website contact form, or by visiting our physical office during business hours. We strive to provide multiple convenient ways to contact us.",
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
                      {/* <p className="terms-hero-subtitle">
                        Welcome to Platinum Holiday Service! Please review our
                        comprehensive terms and conditions below. Last updated: November 24, 2024
                      </p> */}
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
                    By using our website and parking booking services, you agree to comply with
                    the following comprehensive terms and conditions. These terms protect both
                    you as our valued customer and our service providers, ensuring a safe and
                    reliable parking experience. Please read these terms carefully as they contain
                    important information about your rights and obligations when using our platform.
                  </p>
                  {/* <div className="terms-highlight">
                    <p><strong>Important:</strong> These terms constitute a legally binding agreement.
                    If you do not agree with any part of these terms, please do not use our services.</p>
                  </div> */}
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

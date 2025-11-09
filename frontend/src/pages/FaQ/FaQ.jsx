import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { ScrollTop } from 'primereact/scrolltop';
import { Chip } from 'primereact/chip';
import './FaQ.css';

const FaQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    { id: 1, question: 'What is Platinum Holiday?', answer: 'Platinum Holiday is a premium travel service that offers comprehensive travel planning, booking, and management services. We specialize in creating exceptional travel experiences with personalized service.' },
    { id: 2, question: 'How do I make a booking?', answer: 'You can book through our website by selecting your service and following the checkout steps. For assistance, contact our support team.' },
    { id: 3, question: 'What payment methods do you accept?', answer: 'We accept major credit cards, PayPal and bank transfers. All payments are processed securely.' },
    { id: 4, question: 'Can I cancel or modify my booking?', answer: 'Cancellations and modifications depend on the service and timing. Check your booking confirmation for terms or contact support.' },
    { id: 5, question: 'Do you offer travel insurance?', answer: 'Yes — we provide optional travel insurance covering cancellations, medical emergencies, and lost luggage.' },
    { id: 6, question: 'How far in advance should I book?', answer: 'We recommend booking early (2–3 months) for popular dates. We can assist with last-minute bookings where possible.' },
    { id: 7, question: 'Do you offer group discounts?', answer: 'Group discounts are available for larger bookings — contact our group travel team for a quote.' },
    { id: 8, question: 'What if I need to change my travel dates?', answer: 'Date changes depend on availability and provider rules; fees may apply. Contact us ASAP to discuss options.' },
    { id: 9, question: 'Is shuttle service to the airport available?', answer: 'Many partner facilities provide complimentary shuttle service. Details are included in your reservation confirmation.' },
    { id: 10, question: 'What if my flight is delayed or I need to extend my parking stay?', answer: 'Contact the parking facility directly for extensions; charges may apply. For booking changes, reach out to our support.' },
    { id: 11, question: 'How can I contact customer service?', answer: 'Email us at info@theparkingdeals.uk or call +44 1234567890. Our support team is available during business hours.' },
    { id: 12, question: 'Do you offer discounts or promotions?', answer: 'Yes — subscribe to our newsletter and follow our social channels for the latest offers.' }
  ];

  return (
    <>
      <Header />

      <section className="faq-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-10 mx-auto">
              <Card className="faq-main-card">
                <div className="faq-hero">
                  {/* <span className="faq-hero-icon">❓</span> */}
                  <h1 className="faq-hero-title">Frequently Asked Questions</h1>
                  <p className="faq-hero-subtitle">Find quick answers about bookings, payments and our services.</p>
                  {/* <Chip label={`${faqData.length} Questions`} className="faq-count-chip" /> */}
                </div>

                <div className="faq-overview">
                  <h5 className="faq-overview-title">💡 Quick Help</h5>
                  <p className="faq-overview-text">Can’t find an answer? Contact our support at <strong>+44 1234567890</strong> or <strong>info@theparkingdeals.uk</strong>.</p>
                </div>

                <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="faq-accordion">
                  {faqData.map((f) => (
                    <AccordionTab key={f.id} header={<div className="faq-header"><span className="faq-header-number">{String(f.id).padStart(2, '0')}</span><span className="faq-header-text">{f.question}</span></div>}>
                      <div className="faq-content"><p className="faq-answer">{f.answer}</p></div>
                    </AccordionTab>
                  ))}
                </Accordion>

                {/* <div className="faq-contact">
                  <h5 className="faq-contact-title">🎯 Still Need Help?</h5>
                  <p className="faq-contact-text">Our support team is ready to assist you.</p>
                  <div className="faq-contact-buttons">
                    <a href="tel:+447375551666" className="faq-contact-btn phone-btn">📞 Call Us</a>
                    <a href="mailto:info@theparkingdeals.uk" className="faq-contact-btn email-btn">📧 Email Us</a>
                  </div>
                </div> */}
              </Card>
            </div>
          </div>
        </div>

        <ScrollTop threshold={100} className="faq-scroll-top" />
      </section>

      <Footer />
    </>
  );
};

export default FaQ;

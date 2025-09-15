import React from "react";
import "./Services.css";
import "./Services-responsive.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Preloader from "../../Preloader";

import Tilt from "react-parallax-tilt";

const Services = () => {
  return (
    <>
      <Preloader />
      <Header />

      {/* Breadcrumb Section Start */}
      {/* <section className="breadcrumb-section overflow-hidden">
                <div className="container-md">
                    <div className="row">
                        <div className="col-12">
                            <h3 className='breadcrumb-title'>Services</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Services</li>
                                </ol>
                            </nav>

                        </div>
                    </div>
                </div>
            </section> */}
      {/* Breadcrumb Section End */}

      {/* Services Section Start */}
      <section className="section-padding overflow-hidden">
        <div className="container-md">
          <div className="column">
            <div className="col-12">
              <h3
                className="section-heading text-center mx-auto text-purple"
                data-aos="zoom-out"
              >
                Services
              </h3>
            </div>

            <div className="col-12 mb-4 mb-lg-5">
              <div className="mt-4 mt-sm-4 mt-lg-5">
                <p
                  className="section-paragraph text-center mb-0"
                  data-aos="fade"
                >
                  At Platinum Holiday Service, we believe parking should be the
                  easiest part of your journey. That’s why we’ve redefined the
                  experience with tailored options for every traveler. Glide in
                  with our Valet Parking for a touch of luxury, choose Self-Park
                  for independence and speed, or settle into Long-Term Parking
                  designed for extended adventures. Each service blends
                  security, convenience, and care, ensuring your trip begins and
                  ends without stress. With us, parking isn’t just a
                  necessity—it’s part of the Platinum experience.
                </p>
              </div>
            </div>
          </div>

          <div className="row content-card-row mt-5">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <article className="service-card">
                {/* <div className="service-card-img-area">
                                    <img src="assets/images/services/valet-parking.jpg" className="service-card-img" alt="Meet and Greet Service" />
                                </div> */}
                <div className="service-card-body">
                  <h4 className="service-card-head">Meet and Greet</h4>
                  <p className="service-card-desc">
                    Begin and end your journey effortlessly with our exclusive
                    Meet & Greet service. The moment you arrive at the airport,
                    a courteous professional will be waiting at the terminal
                    entrance, ready to assist with your luggage and handle your
                    vehicle with care. While your car is safely parked in a
                    secure facility, you can head straight to check-in without
                    the usual stress or delays. On your return, your vehicle
                    will be brought back to the terminal, ready and waiting for
                    you. This service blends personalized care, convenience, and
                    peace of mind, ensuring your travel feels smooth from start
                    to finish.
                  </p>
                </div>
              </article>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              <article className="service-card">
                {/* <div className="service-card-img-area">
                                    <img src="assets/images/services/valet-parking.jpg" className="service-card-img" alt="Valet Parking" />
                                </div> */}
                <div className="service-card-body">
                  <h4 className="service-card-head">Valet Parking</h4>
                  <p className="service-card-desc">
                    Enjoy effortless travel with our Valet Parking service.
                    Drive straight to the terminal and hand over your keys to
                    our trusted valet team—while you head directly to check-in,
                    we’ll ensure your vehicle is parked securely. Designed for
                    travelers who value time and comfort, this service removes
                    the stress of searching for a spot and guarantees a seamless
                    start to your journey. On your return, your car will be
                    ready and waiting at the terminal, making your exit as
                    smooth as your arrival.
                  </p>
                </div>
              </article>
            </div>

            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'> */}
              <article className="service-card">
                {/* <div className="service-card-img-area">
                                        <img src="assets/images/services/self-parking.jpg" className="service-card-img" alt="Self-Parking" />
                                    </div> */}
                <div className="service-card-body">
                  <h4 className="service-card-head">Self-Parking</h4>
                  <p className="service-card-desc">
                    For travelers who enjoy flexibility and independence, our
                    Self-Park option is the perfect fit. Choose from
                    conveniently located lots just minutes from the airport,
                    park your vehicle yourself, and keep your keys for complete
                    peace of mind. With 24/7 surveillance and secure facilities,
                    your car stays protected while you travel. Our reliable
                    shuttle service ensures a quick and easy transfer between
                    your vehicle and the terminal, giving you a smooth,
                    stress-free start to your journey.
                  </p>
                </div>
              </article>
              {/* </Tilt> */}
            </div>

            <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
              {/* <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'> */}
              <article className="service-card">
                {/* <div className="service-card-img-area">
                                        <img src="assets/images/services/long-term-parking.jpg" className="service-card-img" alt="Long-Term Parking" />
                                    </div> */}
                <div className="service-card-body">
                  <h4 className="service-card-head">Long-Term Parking</h4>
                  <p className="service-card-desc">
                    Travel with confidence knowing your vehicle is safe with our
                    Long-Term Parking service. Perfect for vacations, business
                    trips, or extended stays, this option offers a secure,
                    cost-effective solution for leaving your car behind. Our
                    facilities are monitored 24/7, giving you complete peace of
                    mind while you’re away. With competitive rates and reliable
                    security, you can focus on your journey knowing your vehicle
                    will be ready and waiting when you return.
                  </p>
                </div>
              </article>
              {/* </Tilt> */}
            </div>

            {/* <div className="col-12 col-xl-4 col-lg-6 col-md-8 col-sm-8 mx-auto" data-aos="fade-up">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'>
                                <article className="service-card">
                                    <div className="service-card-img-area">
                                        <img src="assets/images/services/short-term-parking.jpg" className="service-card-img" alt="Short-Term Parking" />
                                    </div>
                                    <div className="service-card-body">
                                        <h4 className="service-card-head">Short-Term Parking</h4>
                                        <p className="service-card-desc">
                                            For those needing parking for a few hours or a day, our Short-Term Parking service is the perfect solution. Located close to the airport terminals, our short-term parking options are convenient and easy to access. Whether you’re picking up a loved one or attending a meeting, our short-term parking ensures your vehicle is nearby, safe, and easily accessible.
                                        </p>
                                    </div>
                                </article>
                            </Tilt>
                        </div>

                        <div className="col-12 col-xl-4 col-lg-6 col-md-8 col-sm-8 mx-auto" data-aos="fade-up">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'>
                                <article className="service-card">
                                    <div className="service-card-img-area">
                                        <img src="assets/images/services/covered-parking.jpg" className="service-card-img" alt="Covered Parking" />
                                    </div>
                                    <div className="service-card-body">
                                        <h4 className="service-card-head">Covered Parking</h4>
                                        <p className="service-card-desc">
                                            Protect your vehicle from the elements with our Covered Parking service. Ideal for long-term and short-term stays, our covered parking facilities shield your car from weather damage, such as sun exposure, rain, and snow. Enjoy peace of mind knowing your vehicle is well-protected while you travel.
                                        </p>
                                    </div>
                                </article>
                            </Tilt>
                        </div>

                        <div className="col-12 col-xl-4 col-lg-6 col-md-8 col-sm-8 mx-auto" data-aos="fade-up">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'>
                                <article className="service-card">
                                    <div className="service-card-img-area">
                                        <img src="assets/images/services/ev-charging.jpg" className="service-card-img" alt="Electric Vehicle (EV) Charging Stations" />
                                    </div>
                                    <div className="service-card-body">
                                        <h4 className="service-card-head">Electric Vehicle (EV) Charging Stations</h4>
                                        <p className="service-card-desc">
                                            For eco-conscious travelers, we offer parking spots equipped with Electric Vehicle (EV) Charging Stations. Charge your electric vehicle while you’re away, ensuring it’s ready to go when you return. Our EV charging stations are conveniently located and easy to use, providing a seamless experience for electric vehicle owners.
                                        </p>
                                    </div>
                                </article>
                            </Tilt>
                        </div>

                        <div className="col-12 col-xl-4 col-lg-6 col-md-8 col-sm-8 mx-auto" data-aos="fade-up">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'>
                                <article className="service-card">
                                    <div className="service-card-img-area">
                                        <img src="assets/images/services/premium-parking.jpg" className="service-card-img" alt="Premium Parking" />
                                    </div>
                                    <div className="service-card-body">
                                        <h4 className="service-card-head">Premium Parking</h4>
                                        <p className="service-card-desc">
                                            Enjoy the best of the best with our Premium Parking service. Located in the most convenient areas close to the terminals, our premium parking spots offer extra-wide spaces, enhanced security, and expedited shuttle service. This service is perfect for those looking to maximize convenience and minimize time spent in transit.
                                        </p>
                                    </div>
                                </article>
                            </Tilt>
                        </div>

                        <div className="col-12 col-xl-4 col-lg-6 col-md-8 col-sm-8 mx-auto" data-aos="fade-up">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'>
                                <article className="service-card">
                                    <div className="service-card-img-area">
                                        <img src="assets/images/services/business-parking.jpg" className="service-card-img" alt="Business Parking" />
                                    </div>
                                    <div className="service-card-body">
                                        <h4 className="service-card-head">Business Parking</h4>
                                        <p className="service-card-desc">
                                            Designed specifically for business travelers, our Business Parking service offers dedicated spaces close to the terminals, priority shuttle service, and access to business facilities such as Wi-Fi and meeting rooms. Ensure your travel experience is efficient and productive with our specialized business parking solutions.
                                        </p>
                                    </div>
                                </article>
                            </Tilt>
                        </div>

                        <div className="col-12 col-xl-4 col-lg-6 col-md-8 col-sm-8 mx-auto" data-aos="fade-up">
                            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className='h-100'>
                                <article className="service-card">
                                    <div className="service-card-img-area">
                                        <img src="assets/images/services/family-parking.jpg" className="service-card-img" alt="Family Parking" />
                                    </div>
                                    <div className="service-card-body">
                                        <h4 className="service-card-head">Family Parking</h4>
                                        <p className="service-card-desc">
                                            Our Family Parking service caters to travelers with children, offering larger parking spots for easier loading and unloading, proximity to terminal entrances, and priority shuttle service with child-friendly amenities. Start your family trip smoothly and conveniently with our tailored parking solutions.
                                        </p>
                                    </div>
                                </article>
                            </Tilt>
                        </div> */}
          </div>
        </div>
      </section>
      {/* Services Section End */}

      <Footer />
    </>
  );
};

export default Services;

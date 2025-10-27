import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Home-responsive.css";
import Header from "../../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Preloader from "../../Preloader";
import SmoothScroll from "smooth-scroll";

import Tilt from "react-parallax-tilt";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { fetchAllAirports, getAvailableQuotes } from "../../utils/vendorUtil";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import Footer from "../../components/Footer";
import { getBookingChargesWithCouponCodeAndCorrespondingDiscount } from "../../utils/chargesAndCouponCode";
// import { SocketContext } from '../../context/SocketContext';
import ReactGA from "react-ga";

const Home = () => {
  // const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const reservationRef = useRef(null);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropOffDate, setDropOffDate] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropOffDateStr, setDropOffDateStr] = useState("");
  const [pickupDateStr, setPickupDateStr] = useState("");
  const [dayDifference, setDayDifference] = useState(0);
  const [showError, setShowError] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const today = new Date();
  const [dropOffTime, setDropOffTime] = useState(null);
  const [pickupTime, setPickupTime] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  const airports = useSelector((state) => state.vendor.airport);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const couponCodeObj = useSelector(
    (state) => state.bookingChargeCouponCode.couponCode?.couponCode
  );

  // useEffect(() => {setCouponCode(couponCodeObj)},[couponCodeObj]);

  const times = [
    { time: "00:00" },
    { time: "00:30" },
    { time: "01:00" },
    { time: "01:30" },
    { time: "02:00" },
    { time: "02:30" },
    { time: "03:00" },
    { time: "03:30" },
    { time: "04:00" },
    { time: "04:30" },
    { time: "05:00" },
    { time: "05:30" },
    { time: "06:00" },
    { time: "06:30" },
    { time: "07:00" },
    { time: "07:30" },
    { time: "08:00" },
    { time: "08:30" },
    { time: "09:00" },
    { time: "09:30" },
    { time: "10:00" },
    { time: "10:30" },
    { time: "11:00" },
    { time: "11:30" },
    { time: "12:00" },
    { time: "12:30" },
    { time: "13:00" },
    { time: "13:30" },
    { time: "14:00" },
    { time: "14:30" },
    { time: "15:00" },
    { time: "15:30" },
    { time: "16:00" },
    { time: "16:30" },
    { time: "17:00" },
    { time: "17:30" },
    { time: "18:00" },
    { time: "18:30" },
    { time: "19:00" },
    { time: "19:30" },
    { time: "20:00" },
    { time: "20:30" },
    { time: "21:00" },
    { time: "21:30" },
    { time: "22:00" },
    { time: "22:30" },
    { time: "23:00" },
    { time: "23:30" },
  ];

  console.log(dropOffDate);
  console.log(pickupDate);

  const parseTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date;
  };

  const selectedTimeTemplate = (option, props) => {
    if (option) {
      const time = parseTime(option.time);
      return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return props.placeholder;
  };

  const timeTemplate = (option) => {
    const time = parseTime(option.time);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  function normalizeDate(dateString) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  useEffect(() => {
    const normalizedPickupDate = normalizeDate(pickupDate);
    const normalizedDropOffDate = normalizeDate(dropOffDate);

    const timeDifference = normalizedPickupDate - normalizedDropOffDate;
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    console.log(dayDifference);

    setDayDifference(dayDifference);
  }, [dropOffDate, pickupDate]);

  useEffect(() => {
    fetchAllAirports(dispatch);
  }, [dispatch]);

  // useEffect(() => {
  //     socket.on('checkout.session.completed', (session) => {
  //       console.log('Checkout session completed');

  //     });

  //     socket.on('payment_intent.payment_failed', (paymentIntent) => {
  //       console.log('Payment intent failed');

  //     });

  //     return () => {
  //       socket.off('checkout.session.completed');
  //       socket.off('payment_intent.payment_failed');
  //     };
  //   }, [socket]);

  const selectedAirportTemplate = (option, props) => {
    if (option) {
      return (
        <div className="">
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const airportOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <div>{option.name}</div>
      </div>
    );
  };

  const handleGetQuote = async (e) => {
    e.preventDefault();
    setShowError(false);
    
    // Check if user is signed in
    if (!user || !token) {
      toast.current.show({
        severity: "warn",
        summary: "Sign In Required",
        detail: "Please sign in to make a reservation. Redirecting to sign in page...",
        life: 4000,
      });
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
      return;
    }

    if (
      !selectedAirport ||
      !dropOffDate ||
      !dropOffTime ||
      !pickupDate ||
      !pickupTime
    ) {
      setShowError(true);
      toast.current.show({
        severity: "error",
        summary: "Error in Submission",
        detail: "Please fill all required fields!",
        life: 3000,
      });
      return;
    }

    const quoteInfo = {
      selectedAirport,
      dropOffDate,
      dropOffDateStr,
      dropOffTime: dropOffTime?.time,
      pickupDate,
      pickupDateStr,
      pickupTime: pickupTime?.time,
      couponCode,
      dayDifference,
    };
    navigate("/results", { state: { quoteInfo } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDropOffDateChange = (e) => {
    const newDropOffDate = e.value;
    setDropOffDate(newDropOffDate);
    setDropOffDateStr(newDropOffDate.toLocaleDateString("en-GB"));

    if (newDropOffDate) {
      const newPickupDate = new Date(newDropOffDate);
      newPickupDate.setDate(newPickupDate.getDate() + 7);
      setPickupDate(newPickupDate);
      setPickupDateStr(newPickupDate.toLocaleDateString("en-GB"));
    } else {
      setPickupDate(null);
      setPickupDate("");
    }
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const scroll = new SmoothScroll();
    scroll.animateScroll(reservationRef.current, null, { offset: 120 });
  };

  const goToLink = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      {/* {pageLoading && <Preloader />} */}
      <Preloader />
      <Header />

      {/* <section className="hero-section overflow-hidden">
        <img
          src="assets/images/home/hero-section-image.svg"
          className="hero-section-img"
          data-aos="fade"
          alt=""
        />
        <img
          src="assets/images/home/map-pointer.svg"
          className="hero-section-dec-img"
          data-aos="fade-down"
          alt=""
        />
        <div className="container-md hero-slider-area">
          <Swiper
            className="hero-swiper-area"
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={false}
            speed={1500}
            navigation={{
              nextEl: ".swiper-button-next2",
              prevEl: ".swiper-button-prev2",
            }}
            grabCursor={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            autoplay={{
              delay: 5000,
              waitForTransition: true,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <div className="hero-section-title-area">
                <h3 className="hero-section-title" data-aos="fade-up">
                  Unmatched Airport Parking Solutions
                </h3>
                <p className="hero-section-para" data-aos="fade-up">
                  Discover the easiest way to secure airport parking with The
                  Parking Deals. We specialize in providing top-notch parking
                  solutions tailored to meet your needs, ensuring your travel
                  experience starts off on the right foot. Book now and enjoy
                  unparalleled convenience and security.
                </p>
                <div className="hero-section-btn-area" data-aos="fade-up">
                  <button
                    onClick={() => goToLink("/about-us")}
                    className="nav-link-button text-no-wrap with-bg"
                  >
                    More detail
                  </button>
                  <a
                    href="#reservation"
                    onClick={handleScroll}
                    className="nav-link-button text-no-wrap with-outline"
                  >
                    Make Reservation
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hero-section-title-area">
                <h3 className="hero-section-title" data-aos="fade-up">
                  Unmatched Airport Parking Solutions
                </h3>
                <p className="hero-section-para" data-aos="fade-up">
                  Welcome to Platinum Holiday Service, your premier choice for airport
                  parking. We provide a range of tailored services including
                  Valet Parking, Self-Park Options, and Long-Term Parking. Enjoy
                  peace of mind knowing your vehicle is secure, and experience
                  the convenience of our premium features designed to make your
                  travel stress-free.
                </p>
                <div className="hero-section-btn-area" data-aos="fade-up">
                  <button
                    onClick={() => goToLink("/services")}
                    className="nav-link-button text-no-wrap with-bg"
                  >
                    More detail
                  </button>
                  <a
                    href="#reservation"
                    onClick={handleScroll}
                    className="nav-link-button text-no-wrap with-outline"
                  >
                    Make Reservation
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hero-section-title-area">
                <h3 className="hero-section-title" data-aos="fade-up">
                  Easy and Convenient Contact
                </h3>
                <p className="hero-section-para" data-aos="fade-up">
                  Have questions or need assistance? We're here to help! Reach
                  out to us via email call us. Our dedicated customer service
                  team ensure you have a smooth and stress-free parking
                  experience. Visit our website for more information and
                  support.
                </p>
                <div className="hero-section-btn-area" data-aos="fade-up">
                  <button
                    onClick={() => goToLink("/contact-us")}
                    className="nav-link-button text-no-wrap with-bg"
                  >
                    More detail
                  </button>
                  <a
                    href="#reservation"
                    onClick={handleScroll}
                    className="nav-link-button text-no-wrap with-outline"
                  >
                    Make Reservation
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hero-section-title-area">
                <h3 className="hero-section-title" data-aos="fade-up">
                  Convenience at Your Fingertips
                </h3>
                <p className="hero-section-para" data-aos="fade-up">
                  At Platinum Holiday Service, we prioritize your convenience. Our
                  user-friendly online booking system makes reserving your spot
                  quick and easy. With 24/7 access, covered parking options, and
                  complimentary shuttle services, we ensure that your parking
                  experience is seamless from start to finish.
                </p>
                <div className="hero-section-btn-area" data-aos="fade-up">
                  <button
                    onClick={() => goToLink("/services")}
                    className="nav-link-button text-no-wrap with-bg"
                  >
                    More detail
                  </button>
                  <a
                    href="#reservation"
                    onClick={handleScroll}
                    className="nav-link-button text-no-wrap with-outline"
                  >
                    Make Reservation
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hero-section-title-area">
                <h3 className="hero-section-title" data-aos="fade-up">
                  Secure and Affordable Parking
                </h3>
                <p className="hero-section-para" data-aos="fade-up">
                  Your vehicle's safety is our top priority. Platinum Holiday Service
                  offers secure parking facilities with round-the-clock
                  surveillance at competitive rates. Whether you're traveling
                  for a day or an extended period, our short-term and long-term
                  parking solutions provide the security and affordability you
                  need.
                </p>
                <div className="hero-section-btn-area" data-aos="fade-up">
                  <button
                    onClick={() => goToLink("/services")}
                    className="nav-link-button text-no-wrap with-bg"
                  >
                    More detail
                  </button>
                  <a
                    href="#reservation"
                    onClick={handleScroll}
                    className="nav-link-button text-no-wrap with-outline"
                  >
                    Make Reservation
                  </a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="hero-section-title-area">
                <h3 className="hero-section-title" data-aos="fade-up">
                  Premium Parking for Business Travelers
                </h3>
                <p className="hero-section-para" data-aos="fade-up">
                  Business travel just got easier with Platinum Holiday Service. Our
                  Business Parking service features dedicated spots close to the
                  terminal, priority shuttle services, and access to business
                  facilities. Maximize your productivity and minimize travel
                  stress with our premium parking solutions.
                </p>
                <div className="hero-section-btn-area" data-aos="fade-up">
                  <button
                    onClick={() => goToLink("/services")}
                    className="nav-link-button text-no-wrap with-bg"
                  >
                    More detail
                  </button>
                  <a
                    href="#reservation"
                    onClick={handleScroll}
                    className="nav-link-button text-no-wrap with-outline"
                  >
                    Make Reservation
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section> */}

      <Toast ref={toast} />

      <section className="ph-hero overflow-hidden">
        <div className="container-md">
          <div className="row align-items-center">
            <div className="col-12 col-xl-6 col-lg-6 pe-xl-5 mt-4">
              <h1 className="ph-hero-title">Reserve your parking space</h1>
              <p className="ph-hero-desc">
                Make your travel planning effortless with Platinum Holiday Service. Our fast and
                user-friendly booking process gives you an instant quote to airport parking in seconds.
                Just choose your airport. Set entry and exit details to secure the best deal. Enjoy peace of mind.
              </p>
            </div>
            <div className="col-12 col-xl-6 col-lg-6">
              {/* <article
                className="custom-card border-top-primary p-3"
                id="reservation"
                ref={reservationRef}
                data-aos="fade-up"
              > */}
              <form
                action=""
                className="ph-card get-quote-form mt-0 p-3"
                onSubmit={handleGetQuote}
              >
                <div className="ph-card-head mb-3">
                  <h3>Grab Your Space</h3>
                </div>

                <div className="form-head-input-area">
                  <div className="row">
                    <div className="col-12 col-xl-8 col-lg-10 col-md-8 col-sm-8 mx-auto">
                      <div className="custom-form-group mb-0 input-with-icon">
                        <label
                          htmlFor="airport"
                          className="custom-form-label form-required text-sm-center ph-label"
                        >
                          Select your airport
                        </label>
                        <div className="form-icon-group">
                          <i className="bi bi-airplane-fill input-grp-icon"></i>
                          <Dropdown
                            id="airport"
                            value={selectedAirport}
                            onChange={(e) => setSelectedAirport(e.value)}
                            options={
                              Array.isArray(airports)
                                ? airports.map((airport) => ({
                                    ...airport,
                                    name: capitalizeFirstLetter(airport.name),
                                  }))
                                : []
                            }
                            optionLabel="name"
                            placeholder="Select a Airport"
                            //   valueTemplate={selectedAirportTemplate}
                            //   itemTemplate={airportOptionTemplate}
                            className="w-full w-100 custom-form-dropdown ph-input"
                            invalid={showError}
                            style={{ color: "#000" }}
                          />
                        </div>
                        {showError && !selectedAirport && (
                          <small className="text-danger form-error-msg text-sm-center">
                            This field is required
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row col-12 mt-3 mb-2">
                  {/* <div className="col-12">
                      <Divider className="mt-4 mb-4" />
                    </div> */}

                  <div className="col-12 col-sm-6 col-xl-6">
                    <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                      <label
                        htmlFor="dropOffDate"
                        className="custom-form-label form-required ph-label"
                      >
                        Entry date
                      </label>
                      <div className="form-icon-group">
                        <i className="bi bi-calendar-check-fill input-grp-icon"></i>
                        <Calendar
                          id="dropOffDate"
                          value={dropOffDate}
                          onChange={handleDropOffDateChange}
                          placeholder="dd/mm/yyyy"
                          dateFormat="dd/mm/yy"
                          minDate={today}
                          className="w-100 ph-input"
                          invalid={showError}
                          style={{ color: "#000" }}
                        />
                      </div>
                      {showError && !dropOffDate && (
                        <small className="text-danger form-error-msg">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-xl-6">
                    <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                      <label
                        htmlFor="dropOffTime"
                        className="custom-form-label form-required ph-label"
                      >
                        Entry time
                      </label>
                      <div className="form-icon-group">
                        <i className="bi bi-clock-fill input-grp-icon"></i>
                        {/* <Calendar id="dropOffTime" className='w-100' value={dropOffTime} onChange={(e) => setDropOffTime(e.value)} placeholder='hh:mm' timeOnly invalid={showError} /> */}
                        <Dropdown
                          id="dropOffTime"
                          value={dropOffTime}
                          onChange={(e) => setDropOffTime(e.value)}
                          options={times}
                          optionLabel="time"
                          placeholder="Select the time"
                          valueTemplate={selectedTimeTemplate}
                          itemTemplate={timeTemplate}
                          className="w-full w-100 custom-form-dropdown ph-input"
                          invalid={showError}
                          style={{ color: "#000" }}
                        />
                      </div>
                      {showError && !dropOffTime && (
                        <small className="text-danger form-error-msg">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-xl-6">
                    <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                      <label
                        htmlFor="pickupDate"
                        className="custom-form-label form-required ph-label"
                      >
                        Exit date
                      </label>
                      <div className="form-icon-group">
                        <i className="bi bi-calendar-check-fill input-grp-icon"></i>
                        <Calendar
                          id="pickupDate"
                          value={pickupDate}
                          onChange={(e) => {
                            setPickupDate(e.value);
                            setPickupDateStr(
                              e.value.toLocaleDateString("en-GB")
                            );
                          }}
                          placeholder="dd/mm/yyyy"
                          dateFormat="dd/mm/yy"
                          minDate={dropOffDate}
                          disabled={!dropOffDate}
                          className="w-100 ph-input"
                          invalid={showError}
                        />
                      </div>
                      {showError && !pickupDate && (
                        <small className="text-danger form-error-msg">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-sm-6 col-xl-6">
                    <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                      <label
                        htmlFor="pickupTime"
                        className="custom-form-label form-required ph-label"
                      >
                        Exit time
                      </label>
                      <div className="form-icon-group">
                        <i className="bi bi-clock-fill input-grp-icon"></i>
                        {/* <Calendar id="pickupTime" className='w-100' value={pickupTime} onChange={(e) => setPickupTime(e.value)} placeholder='hh:mm' timeOnly invalid={showError} /> */}
                        <Dropdown
                          id="pickupTime"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.value)}
                          options={times}
                          optionLabel="time"
                          placeholder="Select the time"
                          valueTemplate={selectedTimeTemplate}
                          itemTemplate={timeTemplate}
                          className="w-full w-100 custom-form-dropdown ph-input"
                          invalid={showError}
                        />
                      </div>
                      {showError && !pickupTime && (
                        <small className="text-danger form-error-msg">
                          This field is required
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <div className="custom-form-group contains-float-input mb-0">
                  <Button
                    label={user && token ? "Reserve Now" : "Sign In to Reserve"}
                    className="w-100 submit-button justify-content-center ph-btn"
                    loading={loading}
                  />
                  {!user && !token && (
                    <small className="text-info d-block text-center mt-2">
                      <i className="bi bi-info-circle me-1"></i>
                      You need to be signed in to make a reservation. 
                      <a href="/sign-in" className="text-decoration-none ms-1">Sign In</a> or 
                      <a href="/sign-up" className="text-decoration-none ms-1">Create Account</a>
                    </small>
                  )}
                </div>
              </form>
              {/* </article> */}
            </div>
          </div>
        </div>

        {/* Enhanced Process Section */}
        <div className="process-section">
          <div className="process-container">
            <div className="process-header">
              <span className="process-badge">Simple Process</span>
              <h2 className="process-title">Book Your Parking in 3 Easy Steps</h2>
              <p className="process-subtitle">
                Experience hassle-free airport parking with our streamlined booking process
              </p>
            </div>
            
            <div className="process-timeline">
              {/* Step 1 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <i className="bi bi-search"></i>
                  </div>
                  <div className="timeline-info">
                    <h4 className="timeline-title">Search & Compare</h4>
                    <p className="timeline-description">
                      Select your airport, choose dates and times. 
                      Compare prices from multiple parking providers instantly.
                    </p>
                    <div className="timeline-features">
                      <span className="feature-tag">Real-time availability</span>
                      <span className="feature-tag">Best price guarantee</span>
                    </div>
                  </div>
                </div>
                <div className="timeline-connector"></div>
              </div>

              {/* Step 2 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>
                  <div className="timeline-info">
                    <h4 className="timeline-title">Book & Pay Securely</h4>
                    <p className="timeline-description">
                      Choose your preferred parking option and complete your booking 
                      with our secure payment system.
                    </p>
                    <div className="timeline-features">
                      <span className="feature-tag">Instant confirmation</span>
                      <span className="feature-tag">Secure payment</span>
                    </div>
                  </div>
                </div>
                <div className="timeline-connector"></div>
              </div>

              {/* Step 3 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-icon">
                    <i className="bi bi-airplane"></i>
                  </div>
                  <div className="timeline-info">
                    <h4 className="timeline-title">Park & Travel</h4>
                    <p className="timeline-description">
                      Arrive at your reserved parking space, drop off your vehicle, 
                      and enjoy your stress-free journey.
                    </p>
                    <div className="timeline-features">
                      <span className="feature-tag">24/7 security</span>
                      <span className="feature-tag">Free shuttle service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h5>Secure & Safe</h5>
                <p>CCTV monitored facilities</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <h5>Save Time</h5>
                <p>Quick online booking</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <h5>Best Prices</h5>
                <p>Guaranteed lowest rates</p>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="bi bi-headset"></i>
                </div>
                <h5>24/7 Support</h5>
                <p>Always here to help</p>
              </div>
            </div>
          </div>

          {/* Enhanced Component Styles */}
          <style>{`
    .process-section {
      background: transparent;
      padding: 80px 0 60px 0;
      margin: 0;
    }
    
    .process-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .process-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .process-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .process-title {
      font-size: 40px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }
    
    .process-subtitle {
      font-size: 18px;
      color: rgba(255,255,255,0.8);
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .process-timeline {
      margin-bottom: 60px;
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 40px;
    }
    
    .timeline-item:last-child .timeline-connector {
      display: none;
    }
    
    .timeline-content {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 32px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s ease;
    }
    
    .timeline-content:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255,255,255,0.2);
      transform: translateX(8px);
    }
    
    .timeline-icon {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      flex-shrink: 0;
      box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
    }
    
    .timeline-info {
      flex: 1;
    }
    
    .timeline-title {
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 12px 0;
    }
    
    .timeline-description {
      font-size: 16px;
      color: rgba(255,255,255,0.8);
      line-height: 1.6;
      margin: 0 0 16px 0;
    }
    
    .timeline-features {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .feature-tag {
      background: rgba(102, 126, 234, 0.2);
      color: #a5b4fc;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid rgba(102, 126, 234, 0.3);
    }
    
    .timeline-connector {
      position: absolute;
      left: 54px;
      top: 100%;
      width: 2px;
      height: 40px;
      background: linear-gradient(to bottom, rgba(102, 126, 234, 0.5), transparent);
    }
    
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-top: 40px;
    }
    
    .benefit-item {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      transition: all 0.3s ease;
    }
    
    .benefit-item:hover {
      background: rgba(255, 255, 255, 0.12);
      transform: scale(1.02);
    }
    
    .benefit-icon {
      background: rgba(102, 126, 234, 0.2);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      color: #a5b4fc;
      font-size: 20px;
    }
    
    .benefit-item h5 {
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 8px 0;
    }
    
    .benefit-item p {
      font-size: 14px;
      color: rgba(255,255,255,0.7);
      margin: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .process-title {
        font-size: 32px;
      }
      
      .timeline-content {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }
      
      .timeline-connector {
        left: 50%;
        transform: translateX(-50%);
      }
      
      .benefits-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }
    }
    
    @media (max-width: 480px) {
      .process-container {
        padding: 0 16px;
      }
      
      .timeline-content {
        padding: 24px 20px;
      }
      
      .process-title {
        font-size: 28px;
      }
      
      .process-subtitle {
        font-size: 16px;
      }
    }
  `}</style>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;

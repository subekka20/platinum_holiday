import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./VendorList.css";
import "./VendorList-responsive.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Tooltip } from "bootstrap";
import Preloader from "../../Preloader";

import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Rating } from "primereact/rating";
import { Dialog } from "primereact/dialog";
import { fetchAllAirports, getAvailableQuotes } from "../../utils/vendorUtil";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import withComponentName from "../../withComponentName";

const VendorList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { quoteInfo } = location.state || {};
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dropOffDate, setDropOffDate] = useState(
    quoteInfo?.dropOffDate || null
  );
  const [pickupDate, setPickupDate] = useState(quoteInfo?.pickupDate || null);
  const [dropOffDateStr, setDropOffDateStr] = useState(
    quoteInfo?.dropOffDateStr || ""
  );
  const [pickupDateStr, setPickupDateStr] = useState(
    quoteInfo?.pickupDateStr || ""
  );
  const [dayDifference, setDayDifference] = useState(
    quoteInfo?.dayDifference || 0
  );
  const [showError, setShowError] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState(
    quoteInfo?.selectedAirport || null
  );
  const today = new Date();
  const [dropOffTime, setDropOffTime] = useState(
    { time: quoteInfo?.dropOffTime } || null
  );
  const [pickupTime, setPickupTime] = useState(
    { time: quoteInfo?.pickupTime } || null
  );
  const [couponCode, setCouponCode] = useState(quoteInfo?.couponCode || "");

  const airports = useSelector((state) => state.vendor.airport);
  const quotes = useSelector((state) => state.vendor.quotes);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedVendor, setSelectedVendor] = useState(null);

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

  const [discountPercentage, setDiscountPercentage] = useState(30);

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

  console.log(dropOffDate);
  console.log(pickupDate);

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

  const handleFunctionForApi = (
    selectedAirport,
    dropOffDate,
    dropOffTime,
    pickupDate,
    pickupTime
  ) => {
    console.log(dropOffDate);
    console.log(pickupDate);
    // const queryParams = new URLSearchParams({
    //   airport: selectedAirport,
    //   fromDate: new Date(dropOffDate).toISOString(),
    //   fromTime: dropOffTime,
    //   // fromTime: new Date(dropOffTime).toTimeString().split(' ')[0], // Format time to HH:MM:SS
    //   toDate: new Date(pickupDate).toISOString(),
    //   toTime: pickupTime
    //   // toTime: new Date(pickupTime).toTimeString().split(' ')[0], // Format time to HH:MM:SS
    // });
    const queryParams = {
      airportId: selectedAirport?._id || "",
      serviceType: parkingOption.name || "",
      day: dayDifference,
      filterOption: filterOption.name,
    };
    setLoading(true);
    setPageLoading(true);
    getAvailableQuotes(
      queryParams,
      dispatch,
      toast,
      setLoading,
      setPageLoading,
      setShowEditModal
    );
    setShowEditModal(false);
  };

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

  const parking_options = [
    { name: "All Parking" },
    { name: "Meet and Greet" },
    { name: "Park and Ride" },
  ];

  const filter_options = [
    { name: "Recommended" },
    { name: "Price: Low to High" },
    { name: "Price: High to Low" },
  ];

  const [parkingOption, setParkingOption] = useState(parking_options[0]);
  const [filterOption, setFilterOption] = useState(filter_options[0]);

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
      setPickupDateStr("");
    }
  };

  const handleEditSearch = async (e) => {
    e.preventDefault();
    setShowError(false);
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

    handleFunctionForApi(
      selectedAirport,
      dropOffDate,
      dropOffTime?.time,
      pickupDate,
      pickupTime?.time
    );
  };

  const handleBooking = (
    companyId,
    companyName,
    companyImg,
    bookingQuote,
    serviceType
  ) => {
    // setPageLoading(true);
    // setTimeout(() => {
    //     // navigate('/booking');
    //     window.location.assign('/booking');
    //     // setPageLoading(false);
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // }, 800);
    const bookingDetails = {
      airportName: selectedAirport || quoteInfo?.selectedAirport,
      // dropOffDate: new Date(dropOffDate || quoteInfo?.dropOffDate).toISOString(),
      dropOffDate: dropOffDateStr || quoteInfo?.dropOffDateStr,
      dropOffTime: dropOffTime?.time || quoteInfo?.dropOffTime,
      // dropOffTime: new Date(dropOffTime || quoteInfo?.dropOffTime).toTimeString().split(' ')[0],
      // pickUpDate: new Date(pickupDate || quoteInfo?.pickupDate).toISOString(),
      pickUpDate: pickupDateStr || quoteInfo?.pickupDateStr,
      pickupTime: pickupTime?.time || quoteInfo?.pickupTime,
      // pickUpTime: new Date(pickupTime || quoteInfo?.pickupTime).toTimeString().split(' ')[0],
      couponCode,
      companyId,
      companyName,
      companyImg,
      bookingQuote,
      serviceType,
    };
    navigate("/booking", { state: { bookingDetails } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
  }, []);

  const editModalHeader = () => {
    return (
      <div className="modern-edit-modal-header">
        <div className="edit-header-content">
          <div className="edit-header-icon">
            <i className="bi bi-pencil-square"></i>
          </div>
          <div className="edit-header-info">
            <h2 className="edit-modal-title">Edit Your Search</h2>
            <p className="edit-modal-subtitle">Modify your parking preferences</p>
          </div>
        </div>
        <button
          type="button"
          className="modern-edit-close-btn"
          onClick={() => setShowEditModal(false)}
          title="Close"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    );
  };

  const viewModalHeader = () => {
    return (
      <div className="modal-header p-2">
        <h1 className="modal-title fs-5" id="editModalLabel">
          {selectedVendor?.companyName}
        </h1>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowViewModal(false)}
        ></button>
      </div>
    );
  };

  useEffect(() => {
    if (quoteInfo) {
      handleFunctionForApi(
        selectedAirport || quoteInfo.selectedAirport,
        quoteInfo.dropOffDate,
        quoteInfo.dropOffTime,
        quoteInfo.pickupDate,
        quoteInfo.pickupTime
      );
    }
  }, [quoteInfo, parkingOption, filterOption]);

  console.log(selectedAirport);

  const handleCalculateDiscountPercentage = (finalQuote, quote) => {
    if (!quote || !finalQuote || quote <= finalQuote) return "0";

    const discountPercentage = ((quote - finalQuote) / quote) * 100;
    return Math.round(discountPercentage).toString();
  };

  return (
    <>
      {!quoteInfo && <Navigate to="/" />}
      {pageLoading && <Preloader />}
      <Header />

      {/* Breadcrumb Section Start */}
      {/* <section className="breadcrumb-section overflow-hidden">
        <div className="container-md">
          <div className="row"></div>
        </div>
      </section> */}
      {/* Breadcrumb Section End */}

      <section className="modern-results-section" data-aos="fade-up">
        <div className="container-md">
          <div className="row">
            <div className="col-12">
              <div className="modern-results-container">
                {/* Header Section */}
                <div className="results-header">
                  <div className="header-content">
                    <div className="header-icon">
                      <i className="bi bi-search"></i>
                    </div>
                    <div className="header-text">
                      <h2>Your Search Results</h2>
                      <p>Refine your parking options below</p>
                    </div>
                  </div>
                  
                  <button
                    className="modern-edit-btn"
                    onClick={() => setShowEditModal(true)}
                    title="Edit Search"
                  >
                    <i className="bi bi-pencil-square"></i>
                    <span>Edit Search</span>
                  </button>
                </div>

                {/* Filter Options */}
                <div className="filter-options-section">
                  <div className="filter-grid">
                    <div className="filter-card">
                      <div className="filter-icon">
                        <i className="bi bi-p-square-fill"></i>
                      </div>
                      <div className="filter-content">
                        <label className="filter-label">Parking Type</label>
                        <Dropdown
                          value={parkingOption}
                          onChange={(e) => setParkingOption(e.value)}
                          options={parking_options}
                          optionLabel="name"
                          placeholder="Select Type"
                          className="modern-dropdown"
                        />
                      </div>
                    </div>

                    <div className="filter-card">
                      <div className="filter-icon">
                        <i className="bi bi-funnel-fill"></i>
                      </div>
                      <div className="filter-content">
                        <label className="filter-label">Sort By</label>
                        <Dropdown
                          value={filterOption}
                          onChange={(e) => setFilterOption(e.value)}
                          options={filter_options}
                          optionLabel="name"
                          placeholder="Sort Options"
                          className="modern-dropdown"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search Summary */}
                <div className="search-summary">
                  <div className="summary-header">
                    <h3>
                      <i className="bi bi-info-circle-fill me-2"></i>
                      Booking Summary
                    </h3>
                  </div>
                  
                  <div className="summary-content">
                    {/* Airport Information */}
                    <div className="summary-card airport-card">
                      <div className="card-icon">
                        <i className="bi bi-airplane-fill"></i>
                      </div>
                      <div className="card-content">
                        <h4>Airport</h4>
                        <p>{selectedAirport?.name || quoteInfo?.selectedAirport.name}</p>
                      </div>
                      <button 
                        className="edit-detail-btn"
                        onClick={() => setShowEditModal(true)}
                        title="Edit Airport"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>

                    {/* Trip Timeline */}
                    <div className="trip-timeline">
                      {/* Drop-off Details */}
                      <div className="timeline-item departure">
                        <div className="timeline-dot">
                          <i className="bi bi-box-arrow-down"></i>
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <h4>Drop-off</h4>
                            <button 
                              className="edit-detail-btn"
                              onClick={() => setShowEditModal(true)}
                              title="Edit Drop-off"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                          <div className="timeline-details">
                            <div className="detail-item">
                              <i className="bi bi-calendar3"></i>
                              <span>
                                {dropOffDate?.toLocaleDateString("en-GB") ||
                                  quoteInfo?.dropOffDate.toLocaleDateString("en-GB")}
                              </span>
                            </div>
                            <div className="detail-item">
                              <i className="bi bi-clock"></i>
                              <span>{dropOffTime?.time || quoteInfo?.dropOffTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="timeline-connection">
                        <div className="connection-line">
                          <div className="connection-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                        <div className="duration-badge">
                          <i className="bi bi-hourglass-split"></i>
                          <span>{dayDifference} days</span>
                        </div>
                      </div>

                      {/* Pick-up Details */}
                      <div className="timeline-item arrival">
                        <div className="timeline-dot">
                          <i className="bi bi-box-arrow-up"></i>
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <h4>Pick-up</h4>
                            <button 
                              className="edit-detail-btn"
                              onClick={() => setShowEditModal(true)}
                              title="Edit Pick-up"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                          <div className="timeline-details">
                            <div className="detail-item">
                              <i className="bi bi-calendar3"></i>
                              <span>
                                {pickupDate?.toLocaleDateString("en-GB") ||
                                  quoteInfo?.pickupDate.toLocaleDateString("en-GB")}
                              </span>
                            </div>
                            <div className="detail-item">
                              <i className="bi bi-clock"></i>
                              <span>{pickupTime?.time || quoteInfo?.pickupTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Counter */}
                <div className="results-counter">
                  <div className="counter-content">
                    <i className="bi bi-list-ul"></i>
                    <span>
                      Found <strong>{quotes?.length || 0}</strong> parking options
                    </span>
                  </div>
                  <div className="counter-badges">
                    <div className="badge secure">
                      <i className="bi bi-shield-check"></i>
                      <span>Secure</span>
                    </div>
                    <div className="badge instant">
                      <i className="bi bi-lightning"></i>
                      <span>Instant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding results-section overflow-hidden">
        <div className="container-md">
          {quotes && quotes.length > 0 ? (
            <div className="row result-card-view-row">
              {quotes.map((quote) => {
                return (
                  <div
                    className="col-12 col-lg-6 col-sm-10 mx-auto"
                    data-aos="fade-up"
                    key={quote._id}
                  >
                    <article className="modern-result-card">
                      {/* Header Section with Service Type Badge */}
                      <div className="card-header-section">
                        <div className="service-type-badge">
                          <i className="bi bi-shield-check me-2"></i>
                          {quote.serviceType}
                        </div>
                        {quote?.quote > 0 && quote?.finalQuote < quote?.quote && (
                          <div className="discount-badge">
                            -{handleCalculateDiscountPercentage(
                              quote?.finalQuote ?? 0,
                              quote?.quote ?? 0
                            )}% OFF
                          </div>
                        )}
                      </div>

                      {/* Main Content Section */}
                      <div className="card-main-content">
                        <div className="company-info-section">
                          <div className="company-logo-wrapper">
                            <img
                              src={quote.dp || "assets/images/lion-parking.png"}
                              alt={quote.companyName}
                              className="company-logo"
                            />
                          </div>
                          <div className="company-details">
                            <h3 className="company-name">{quote.companyName}</h3>
                            <div className="rating-wrapper">
                              <Rating
                                value={quote.rating}
                                readOnly
                                cancel={false}
                                className="custom-rating"
                              />
                              <span className="rating-text">({quote.rating || 4.5})</span>
                            </div>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="price-section">
                          <div className="price-main">
                            <span className="currency">£</span>
                            <span className="price-value">{quote.finalQuote}</span>
                            {quote.quote > 0 && (
                              <span className="original-price">£{quote.quote}</span>
                            )}
                          </div>
                          {quote.quote > 0 && (
                            <div className="savings-info">
                              <i className="bi bi-piggy-bank me-1"></i>
                              Save £{quote.quote - quote.finalQuote} Today
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Features Section */}
                      <div className="features-section">
                        <h5 className="features-title">
                          <i className="bi bi-list-check me-2"></i>
                          What's Included
                        </h5>
                        <div className="features-grid">
                          {quote.facilities.slice(0, 4).map((facility, index) => (
                            <div key={index} className="feature-item">
                              <i className="bi bi-check-circle-fill me-2"></i>
                              {facility}
                            </div>
                          ))}
                          {quote.facilities.length > 4 && (
                            <div className="feature-item more-features">
                              <i className="bi bi-plus-circle me-2"></i>
                              +{quote.facilities.length - 4} more features
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Security Features */}
                      <div className="security-section">
                        <div className="security-features">
                          <div className="security-item" title="Secure Barrier">
                            <img src="assets/images/features/secure-barrier.png" alt="Secure Barrier" />
                            <span>Secure</span>
                          </div>
                          <div className="security-item" title="CCTV Cameras">
                            <img src="assets/images/features/cctv-camera.png" alt="CCTV" />
                            <span>CCTV</span>
                          </div>
                          <div className="security-item" title="Disability Access">
                            <img src="assets/images/features/disability.png" alt="Accessible" />
                            <span>Accessible</span>
                          </div>
                          <div className="security-item" title="Fencing">
                            <img src="assets/images/features/fence.png" alt="Fenced" />
                            <span>Fenced</span>
                          </div>
                        </div>
                      </div>

                      {/* Benefits Section */}
                      <div className="benefits-section">
                        <div className="benefit-item">
                          <i className="bi bi-lightning-fill benefit-icon"></i>
                          <span>Free Cancellation</span>
                        </div>
                        <div className="benefit-item">
                          <i className="bi bi-clock-fill benefit-icon"></i>
                          <span>24/7 Support</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="action-section">
                        <Button
                          label="View Details"
                          severity="secondary"
                          outlined
                          className="view-btn"
                          onClick={() => {
                            setSelectedVendor(quote);
                            setShowViewModal(true);
                          }}
                        />
                        <Button
                          label="Book Now"
                          className="book-btn"
                          onClick={() =>
                            handleBooking(
                              quote._id,
                              quote.companyName,
                              quote.dp,
                              quote.finalQuote,
                              quote.serviceType
                            )
                          }
                        />
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ) : (
            <h6>No Quotes found</h6>
          )}
        </div>
      </section>

      <Toast ref={toast} />

      {/* quote form modal */}
      <Dialog
        header={editModalHeader}
        visible={showEditModal}
        onHide={() => {
          if (!showEditModal) return;
          setShowEditModal(false);
        }}
        className="custom-modal modal_dialog modal_dialog_md"
        style={{ backgroundColor: "#1a2332" }}>
        <div className="modern-edit-modal-body">
          <form
            action=""
            className="modern-edit-form"
            onSubmit={handleEditSearch}
          >
            <div className="form-head-input-area" style={{backgroundColor:"#26667f1a"}}>
              <div className="row">
                <div className="col-12 col-xl-8 col-lg-6 mx-auto">
                  <div className="custom-form-group mb-0 input-with-icon">
                    <label
                      htmlFor="airport"
                      className="custom-form-label form-required text-sm-center text-white"
                      style={{ color: "#fff" }}
                    >
                      Select airport
                    </label>
                    <div className="form-icon-group">
                      <i class="bi bi-airplane-fill input-grp-icon"></i>
                      <Dropdown
                        id="airport"
                        value={selectedAirport}
                        onChange={(e) => setSelectedAirport(e.value)}
                        options={airports}
                        optionLabel="name"
                        placeholder="Select a Airport"
                        // valueTemplate={selectedAirportTemplate}
                        // itemTemplate={airportOptionTemplate}
                        className="w-full w-100 custom-form-dropdown"
                        invalid={showError}
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
            <div className="row">
              <div className="col-12">
                <Divider className="mt-4 mb-4" />
              </div>

              <div className="col-12 col-sm-11 col-lg-6 mx-auto">
                <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                  <label
                    htmlFor="dropOffDate"
                    className="custom-form-label form-required"
                  >
                    Drop off date
                  </label>
                  <div className="form-icon-group">
                    <i class="bi bi-calendar-check-fill input-grp-icon"></i>
                    <Calendar
                      id="dropOffDate"
                      value={dropOffDate}
                      onChange={handleDropOffDateChange}
                      placeholder="dd/mm/yyyy"
                      dateFormat="dd/mm/yy"
                      minDate={today}
                      className="w-100"
                      invalid={showError}
                    />
                  </div>
                  {showError && !dropOffDate && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-11 col-lg-6 mx-auto">
                <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                  <label
                    htmlFor="dropOffTime"
                    className="custom-form-label form-required"
                  >
                    Drop off time
                  </label>
                  <div className="form-icon-group">
                    <i class="bi bi-clock-fill input-grp-icon"></i>
                    {/* <Calendar
                          id="dropOffTime"
                          className="w-100"
                          value={dropOffTime}
                          onChange={(e) => setDropOffTime(e.value)}
                          placeholder="hh:mm"
                          timeOnly
                          invalid={showError}
                        /> */}

                    <Dropdown
                      id="dropOffTime"
                      value={dropOffTime}
                      onChange={(e) => setDropOffTime(e.value)}
                      options={times}
                      optionLabel="time"
                      placeholder="Select the time"
                      valueTemplate={selectedTimeTemplate}
                      itemTemplate={timeTemplate}
                      className="w-full w-100 custom-form-dropdown"
                      invalid={showError}
                    />
                  </div>
                  {showError && !dropOffTime && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-11 col-lg-6 mx-auto">
                <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                  <label
                    htmlFor="pickupDate"
                    className="custom-form-label form-required"
                  >
                    Pickup date
                  </label>
                  <div className="form-icon-group">
                    <i class="bi bi-calendar-check-fill input-grp-icon"></i>
                    <Calendar
                      id="pickupDate"
                      value={pickupDate}
                      onChange={(e) => {
                        setPickupDate(e.value);
                        setPickupDateStr(e.value.toLocaleDateString("en-GB"));
                      }}
                      placeholder="dd/mm/yyyy"
                      minDate={dropOffDate}
                      disabled={!dropOffDate}
                      dateFormat="dd/mm/yy"
                      className="w-100"
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

              <div className="col-12 col-sm-11 col-lg-6 mx-auto">
                <div className="custom-form-group mb-3 mb-sm-4 input-with-icon">
                  <label
                    htmlFor="pickupTime"
                    className="custom-form-label form-required"
                  >
                    Pickup time
                  </label>
                  <div className="form-icon-group">
                    <i class="bi bi-clock-fill input-grp-icon"></i>
                    {/* <Calendar
                          id="pickupTime"
                          className="w-100"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.value)}
                          placeholder="hh:mm"
                          timeOnly
                          invalid={showError}
                        /> */}

                    <Dropdown
                      id="pickupTime"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.value)}
                      options={times}
                      optionLabel="time"
                      placeholder="Select the time"
                      valueTemplate={selectedTimeTemplate}
                      itemTemplate={timeTemplate}
                      className="w-full w-100 custom-form-dropdown"
                      invalid={showError}
                      style={{color:"#FFF"}}
                    />
                  </div>
                  {showError && !pickupTime && (
                    <small className="text-danger form-error-msg">
                      This field is required
                    </small>
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-11 col-xl-6 col-lg-6 mx-auto">
                <div className="custom-form-group mb-2 mb-sm-2 input-with-icon">
                  <label
                    htmlFor="couponCode"
                    className="custom-form-label form-required text-lg-center"
                  >
                    Coupon Code
                  </label>
                  <div className="form-icon-group">
                    <i class="bi bi-gift-fill input-grp-icon"></i>
                    <InputText
                      id="couponCode"
                      className="custom-form-input"
                      placeholder="Enter promo code"
                      invalid={showError}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  {/* {showError && (
                          <small className="text-danger form-error-msg text-sm-center">
                            This field is required
                          </small>
                        )} */}
                </div>
              </div>

              <div className="col-12">
                <Divider className="mb-4" />
              </div>
            </div>

            <div className="custom-form-group contains-float-input d-flex justify-content-center mb-0">
              <Button
                label="SUBMIT"
                className="submit-button justify-content-center btn-width"
                loading={loading}
              />
            </div>
          </form>
        </div>
      </Dialog>
      {/*  */}

      {/* vendor detail modal - Modern UI */}
      <Dialog
        header={() => (
          <div className="modern-modal-header">
            <div className="header-content">
              <div className="company-header">
                <div className="company-logo-wrapper">
                  <img 
                    src={selectedVendor?.dp || "assets/images/default-company.png"} 
                    alt={selectedVendor?.companyName}
                    className="company-logo-header"
                  />
                </div>
                <div className="company-info-header">
                  <h2 className="company-name-header">{selectedVendor?.companyName}</h2>
                  <div className="service-type-badge-header">
                    <i className="bi bi-shield-check me-2"></i>
                    {selectedVendor?.serviceType}
                  </div>
                </div>
              </div>
              <div className="price-section-header">
                <div className="price-main-header">
                  <span className="currency-header">£</span>
                  <span className="price-value-header">{selectedVendor?.finalQuote}</span>
                  {selectedVendor?.quote > 0 && (
                    <span className="original-price-header">£{selectedVendor?.quote}</span>
                  )}
                </div>
                {selectedVendor?.quote > 0 && selectedVendor?.finalQuote < selectedVendor?.quote && (
                  <div className="discount-badge-header">
                    -{handleCalculateDiscountPercentage(
                      selectedVendor?.finalQuote ?? 0,
                      selectedVendor?.quote ?? 0
                    )}% OFF
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              className="modern-close-btn"
              onClick={() => setShowViewModal(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}
        visible={showViewModal}
        onHide={() => {
          if (!showViewModal) return;
          setShowViewModal(false);
        }}
        className="modern-vendor-modal"
        style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
        }}
        maximizable
      >
        <div className="modern-modal-body">
          {/* Quick Info Cards */}
          <div className="quick-info-section">
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>
              <div className="info-content">
                <span className="info-label">Location</span>
                <span className="info-value">{selectedAirport?.name}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="info-content">
                <span className="info-label">Rating</span>
                <span className="info-value">
                  <Rating
                    value={selectedVendor?.rating || 4.5}
                    readOnly
                    cancel={false}
                    className="header-rating"
                  />
                </span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-clock-fill"></i>
              </div>
              <div className="info-content">
                <span className="info-label">Support</span>
                <span className="info-value">24/7 Available</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="info-content">
                <span className="info-label">Security</span>
                <span className="info-value">Fully Secured</span>
              </div>
            </div>
          </div>

          {/* Main Content with Modern Tabs */}
          <div className="modern-tabs-container">
            <div className="modern-tab-navigation">
              <button
                className="modern-tab-btn active"
                onClick={(e) => {
                  document.querySelectorAll('.modern-tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.modern-tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('modern-overview').classList.add('active');
                }}
              >
                <i className="bi bi-info-circle me-2"></i>
                Overview
              </button>
              <button
                className="modern-tab-btn"
                onClick={(e) => {
                  document.querySelectorAll('.modern-tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.modern-tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('modern-dropoff').classList.add('active');
                }}
              >
                <i className="bi bi-box-arrow-down me-2"></i>
                Drop-Off
              </button>
              <button
                className="modern-tab-btn"
                onClick={(e) => {
                  document.querySelectorAll('.modern-tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.modern-tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('modern-pickup').classList.add('active');
                }}
              >
                <i className="bi bi-box-arrow-up me-2"></i>
                Pick-Up
              </button>
              <button
                className="modern-tab-btn"
                onClick={(e) => {
                  document.querySelectorAll('.modern-tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.modern-tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('modern-reviews').classList.add('active');
                }}
              >
                <i className="bi bi-star me-2"></i>
                Reviews
              </button>
              <button
                className="modern-tab-btn"
                onClick={(e) => {
                  document.querySelectorAll('.modern-tab-btn').forEach(btn => btn.classList.remove('active'));
                  document.querySelectorAll('.modern-tab-content').forEach(content => content.classList.remove('active'));
                  e.target.classList.add('active');
                  document.getElementById('modern-terms').classList.add('active');
                }}
              >
                <i className="bi bi-file-text me-2"></i>
                Terms
              </button>
            </div>

            <div className="modern-tab-contents">
              {/* Overview Tab */}
              <div id="modern-overview" className="modern-tab-content active">
                <div className="content-card">
                  <h3 className="content-title">
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Service Overview
                  </h3>
                  <div className="content-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedVendor?.overView || "<p>No overview information available for this vendor.</p>",
                      }}
                    />
                  </div>
                </div>
                
                {/* Facilities Grid */}
                {selectedVendor?.facilities && selectedVendor.facilities.length > 0 && (
                  <div className="facilities-section">
                    <h3 className="content-title">
                      <i className="bi bi-list-check me-2"></i>
                      Available Facilities
                    </h3>
                    <div className="facilities-grid">
                      {selectedVendor.facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                          <i className="bi bi-check-circle-fill facility-icon"></i>
                          <span className="facility-text">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drop-Off Procedure Tab */}
              <div id="modern-dropoff" className="modern-tab-content">
                <div className="content-card">
                  <h3 className="content-title">
                    <i className="bi bi-box-arrow-down me-2"></i>
                    Drop-Off Procedure
                  </h3>
                  <div className="content-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedVendor?.dropOffProcedure || "<p>No drop-off procedure information available.</p>",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Pick-Up Procedure Tab */}
              <div id="modern-pickup" className="modern-tab-content">
                <div className="content-card">
                  <h3 className="content-title">
                    <i className="bi bi-box-arrow-up me-2"></i>
                    Pick-Up Procedure
                  </h3>
                  <div className="content-body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedVendor?.pickUpProcedure || "<p>No pick-up procedure information available.</p>",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Reviews Tab */}
              <div id="modern-reviews" className="modern-tab-content">
                <div className="content-card">
                  <h3 className="content-title">
                    <i className="bi bi-star me-2"></i>
                    Customer Reviews
                  </h3>
                  <div className="reviews-section">
                    <div className="no-reviews-state">
                      <div className="no-reviews-icon">
                        <i className="bi bi-chat-quote"></i>
                      </div>
                      <h4>No Reviews Yet</h4>
                      <p>Be the first to review this parking service and help other travelers!</p>
                      <Button
                        label="Write a Review"
                        className="review-btn"
                        icon="bi bi-pencil-fill"
                        outlined
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions Tab */}
              <div id="modern-terms" className="modern-tab-content">
                <div className="content-card">
                  <h3 className="content-title">
                    <i className="bi bi-file-text me-2"></i>
                    Terms & Conditions
                  </h3>
                  <div className="content-body">
                    <div className="terms-notice">
                      <i className="bi bi-info-circle-fill me-2"></i>
                      <span>
                        For <strong>Platinum Holiday Service</strong> Terms & Conditions, please visit our{" "}
                        <a
                          href="https://theparkingdeals.co.uk/terms-and-conditions"
                          target="_blank"
                          rel="noreferrer"
                          className="terms-link"
                        >
                          official terms page
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="modal-footer-section">
            <div className="savings-highlight">
              {selectedVendor?.quote > 0 && (
                <div className="savings-card">
                  <div className="savings-icon">
                    <i className="bi bi-piggy-bank-fill"></i>
                  </div>
                  <div className="savings-text">
                    <span className="savings-label">You Save</span>
                    <span className="savings-amount">
                      £{selectedVendor.quote - selectedVendor.finalQuote} Today
                    </span>
                  </div>
                </div>
              )}
              <div className="guarantee-card">
                <div className="guarantee-icon">
                  <i className="bi bi-shield-check-fill"></i>
                </div>
                <div className="guarantee-text">
                  <span className="guarantee-label">Free Cancellation</span>
                  <span className="guarantee-desc">Up to 24 hours before</span>
                </div>
              </div>
            </div>
            
            <div className="action-buttons">
              <Button
                label="Compare Prices"
                severity="secondary"
                outlined
                className="compare-btn"
                icon="bi bi-arrow-left-right"
                onClick={() => setShowViewModal(false)}
              />
              <Button
                label={`Book for £${selectedVendor?.finalQuote}`}
                className="book-now-btn"
                icon="bi bi-credit-card-fill"
                onClick={() => {
                  handleBooking(
                    selectedVendor?._id,
                    selectedVendor?.companyName,
                    selectedVendor?.dp,
                    selectedVendor?.finalQuote,
                    selectedVendor?.serviceType
                  );
                  setShowViewModal(false);
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
      {/*  */}

      <Footer />
    </>
  );
};

export default withComponentName(VendorList, "VenderList");

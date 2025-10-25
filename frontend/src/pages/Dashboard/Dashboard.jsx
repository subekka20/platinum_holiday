import React, { useState, useEffect, useRef } from "react";
import './Dashboard.css';
import './Dashboard-responsive.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Tooltip } from 'bootstrap';
import SmoothScroll from 'smooth-scroll';

import { Ripple } from 'primereact/ripple';
import { Image } from 'primereact/image';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Panel } from 'primereact/panel';
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
import { InputText } from "primereact/inputtext";
import { Calendar } from 'primereact/calendar';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { SampleData } from '../../BookingData';
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "../../state";
import { Toast } from 'primereact/toast';
import api from "../../api";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
    const editProfile = useRef(null);
    const toast = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const [showError, setShowError] = useState(false);
    const [showEditArea, setShowEditArea] = useState(false);
    const [filterDate, setFilterDate] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const today = new Date();
    const navigate = useNavigate();

    // Check URL parameters to set initial tab
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tabParam = searchParams.get('tab');
        if (tabParam === 'bookings') {
            setActiveTab('bookings');
        }
    }, [location]);

    const titles = [
        { name: 'Mr.' },
        { name: 'Mrs.' },
        { name: 'Ms.' },
        { name: 'Miss.' },
    ];
    const [title, setTitle] = useState(titles[0]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    // const [addressL1, setAddressL1] = useState('');
    // const [addressL2, setAddressL2] = useState('');
    // const [city, setCity] = useState('');
    // const [country, setCountry] = useState('');
    // const [postCode, setPostCode] = useState('');

    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const [imgFile, setImgFile] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("Paid");
    const [bookings, setBookings] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [rows, setRows] = useState(10);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [rowPerPage, setRowsPerPage] = useState([5]);
    const [bookingDate, setBookingDate] = useState(null);
    const [searchKey, setSearchKey] = useState(null);

    const initialUserInfo = {
        title: user?.title || titles[0].name,
        firstName: user?.firstName || "",
        lastName: user?.lastname || "",
        mobileNumber: user?.mobileNumber || "",
        // addressL1: user?.addressL1 || "",
        // addressL2: user?.addressL2 || "",
        // city: user?.city || "",
        // country: user?.country || "",
        // postCode: user?.postCode || "",
    };

    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl));
    }, []);

    const logOut = () => {
        confirmDialog({
            message: 'Are you sure you want to Sign out?',
            header: 'Logout Confirmation',
            icon: 'bi bi-trash-fill',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: () => {
                dispatch(setLogout());
            },
        });
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });

    };

    const onUpload = (event) => {
        const uploadedFiles = event.files;
        console.log(uploadedFiles);
        if (uploadedFiles.length > 0) {
            const file = uploadedFiles[0];

        }
    };

    const dpUploadHandler = ({ files }) => {
        const [file] = files;
        console.log(file);
        setImgFile(file);
        // const fileReader = new FileReader();
        // fileReader.onload = (e) => {
        //     setFile(e.target.result);
        // };
        // fileReader.readAsDataURL(file);
    };

    const updatingUserInfo = async (info) => {
        setLoading(true);
        try {
            const response = await api.put("/api/user/update-user-info", info, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.current.show({
                severity: 'success',
                summary: 'User Info Updated',
                detail: "Your user info has been updated successfully",
                life: 3000
            });
            dispatch(
                setLogin({
                    user: response.data.user,
                    token: response.data.token
                })
            );
        } catch (err) {
            console.log(err);
            toast.current.show({
                severity: 'error',
                summary: 'Error in UserInfo Update',
                detail: err.response.data.error,
                life: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = () => {
        if (!userInfo.firstName || !userInfo.mobileNumber || !userInfo.title) {
            setShowError(true);
            toast.current.show({
                severity: 'error',
                summary: 'Error in Submission',
                detail: "Please fill all required fields!",
                life: 3000
            });
            return;
        }

        let formData = new FormData();
        formData.append('title', userInfo.title);
        formData.append('firstName', userInfo.firstName);
        formData.append('lastName', userInfo.lastName);
        formData.append('mobileNumber', userInfo.mobileNumber);
        // formData.append('addressL1', userInfo.addressL1);
        // formData.append('addressL2', userInfo.addressL2);
        // formData.append('city', userInfo.city);
        // formData.append('country', userInfo.country);
        // formData.append('postCode', userInfo.postCode);

        if (imgFile) {
            formData.append('dp', imgFile);
        }

        updatingUserInfo(formData);
    };

    const togglePanel = (e) => {
        setShowEditArea(!showEditArea);
        editProfile.current.toggle();
        if (showEditArea) {
            e.preventDefault();
            const scroll = new SmoothScroll();
            scroll.animateScroll(editProfile.current, null, { offset: 120 });
            setShowEditArea(!showEditArea);
        }
    };

    const handleFilterByDate = (e) => {
      const date = e.value ? e.value.toLocaleDateString('en-GB') : null;
      fetchBookings(null, date);
  };

    const fetchBookings = async (bookingId, date) => {
      console.log(bookingId);   
      console.log(date);
      setLoading(true);
      const data = await SampleData.getData(token, bookingId, date);
      console.log(data.bookings);
      setBookings(data.bookings);
      setTotalRecords(data.totalRecords);
      const newRowPerPage = ([5,10,25,50].filter(x => x<Number(data.totalRecords)));
      setRowsPerPage([...newRowPerPage, Number(data.totalRecords)])
      setLoading(false);
  };

    // console.log(rowPerPage);

    useEffect(() => {
      fetchBookings(null, null);
  }, []);

    const onPageChange = (event) => {
        setPage(event.page + 1);
        setRows(event.rows);
    };

    const dateTimeTemplate = (rowData) => {
        return `${rowData.date} ${rowData.time}`;
    };

    // const statusBodyTemplate = (rowData) => {
    //     return <span>{rowData.status}</span>;
    // };

    // const cancelBodyTemplate = (rowData) => {
    //     return <button>Cancel</button>;
    // };

    const searchBodyTemplate = (rowData) => {
        return (
            <Button
                icon="bi bi-eye-fill"
                className="data-view-button"
                data-bs-toggle="modal"
                data-bs-target="#bookingDetailModal"
                onClick={() => setSelectedBooking(rowData.details)}
            />
        );
    };

    const cancelBodyTemplate = (rowData) => {
        return (
            rowData.details.cancellationCoverFee ?
            <Button
                label="Cancel"
                severity="danger"
                className="cancel-button"
                // onClick={cancelBooking}
            /> : null
        );
    };

    // const dateTimeTemplate = (booking) => {
    //     return (
    //         <>
    //             {booking.date + "/" + booking.time}
    //         </>
    //     );
    // };

    const statusBodyTemplate = (booking) => {
        return (
            <Tag value={booking.status} severity={getSeverity(booking)}></Tag>
        );
    };

    const getSeverity = (booking) => {
        switch (booking.status) {
            case 'Pending':
                return 'warning';
                
            case 'Paid':
                return 'success';

            case 'Failed':
                return 'danger';

            default:
                return null;
        }
    };

    // const cancelBooking = () => {
    //     confirmDialog({
    //         message: 'Are you sure you want to cancel the booking?',
    //         header: 'Booking Cancellation Confirmation',
    //         icon: 'bi bi-trash-fill',
    //         defaultFocus: 'reject',
    //         acceptClassName: 'p-button-danger',
    //         accept: cancel
    //     });
    // }

    const cancel = () => { };

    const goToLink = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <>
        <Header />

        <ConfirmDialog />
        <Toast ref={toast} />

        {/* Modern Dashboard Section */}
        <section className="modern-dashboard-section">
          <div className="container-fluid">
            <div className="dashboard-container">
              {/* Dashboard Header */}
              <div className="dashboard-header">
                <div className="welcome-section">
                  <h1 className="dashboard-title">
                    Welcome back, {user?.firstName || "User"}!
                  </h1>
                  <p className="dashboard-subtitle">
                    Manage your profile and view your bookings
                  </p>
                </div>
                <div className="dashboard-stats">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="bi bi-calendar-check"></i>
                    </div>
                    <div className="stat-info">
                      <h3>{bookings?.length || 0}</h3>
                      <p>Total Bookings</p>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon active">
                      <i className="bi bi-check-circle"></i>
                    </div>
                    <div className="stat-info">
                      <h3>{bookings?.filter(b => b.status === 'Paid')?.length || 0}</h3>
                      <p>Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="dashboard-navigation">
                <button
                  className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  type="button"
                >
                  <i className="bi bi-person-circle"></i>
                  <span>Profile</span>
                </button>
                <button
                  className={`nav-tab ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                  data-tab="bookings"
                  type="button"
                >
                  <i className="bi bi-calendar2-week"></i>
                  <span>My Bookings</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="dashboard-content">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="profile-dashboard">
                    {/* Profile Card */}
                    <div className="modern-profile-card">
                      <div className="profile-header">
                        <div className="profile-avatar-section">
                          <div className="avatar-container">
                            {user?.dp ? (
                              <Image
                                src={user.dp}
                                className="profile-avatar-img"
                                alt="Profile"
                                preview
                              />
                            ) : (
                              <img
                                src="assets/images/user.png"
                                className="profile-avatar-default"
                                alt="User"
                              />
                            )}
                            <div className="avatar-badge">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                          </div>
                        </div>
                        <div className="profile-info">
                          <h2 className="profile-name">
                            {user?.title}. {user?.firstName} {user?.lastName}
                          </h2>
                          <p className="profile-email">{user?.email}</p>
                          <div className="profile-badges">
                            <span className="badge verified">
                              <i className="bi bi-shield-check"></i>
                              Verified
                            </span>
                          </div>
                        </div>
                        <div className="profile-actions">
                          <button
                            className="action-btn primary"
                            onClick={togglePanel}
                            title={showEditArea ? "Cancel Edit" : "Edit Profile"}
                            // style={{color:"yellow"}}
                          >
                            <i className={`bi ${showEditArea ? "bi-x-lg" : "bi-pencil"}`}></i>
                          </button>
                        </div>
                      </div>

                      <div className="profile-details">
                        <div className="detail-grid">
                          <div className="detail-item">
                            <div className="detail-icon">
                              <i className="bi bi-telephone-fill"></i>
                            </div>
                            <div className="detail-content">
                              <span className="detail-label">Phone</span>
                              <span className="detail-value">{user?.mobileNumber || "Not provided"}</span>
                            </div>
                          </div>
                          <div className="detail-item">
                            <div className="detail-icon">
                              <i className="bi bi-envelope-fill"></i>
                            </div>
                            <div className="detail-content">
                              <span className="detail-label">Email</span>
                              <span className="detail-value">{user?.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="profile-footer">
                        <button
                          className="footer-btn secondary"
                          onClick={() => goToLink("/change-password")}
                        >
                          <i className="bi bi-lock"></i>
                          Change Password
                        </button>
                        <button
                          className="footer-btn danger"
                          onClick={logOut}
                        >
                          <i className="bi bi-box-arrow-right"></i>
                          Sign Out
                        </button>
                      </div>
                    </div>

                    {/* Edit Profile Panel */}
                    <Panel
                      ref={editProfile}
                      id="editProfile"
                      header="Edit Profile"
                      className="modern-edit-panel"
                      toggleable
                      collapsed
                    >
                      <div className="edit-form-container">
                        <div className="form-section">
                          <h6 className="section-title">Profile Picture</h6>
                          <div className="upload-section">
                            <FileUpload
                              name="dp"
                              accept="image/*"
                              customUpload={true}
                              uploadHandler={dpUploadHandler}
                              className="modern-file-upload"
                              mode="basic"
                              auto={true}
                              chooseLabel="Choose Photo"
                            />
                          </div>
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label className="modern-label required">Title</label>
                            <Dropdown
                              value={{ name: userInfo.title }}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  title: e.value?.name,
                                })
                              }
                              options={titles}
                              optionLabel="name"
                              placeholder="Select Title"
                              className="modern-dropdown"
                            />
                            {showError && !userInfo.title && (
                              <small className="error-message">This field is required</small>
                            )}
                          </div>

                          <div className="form-group">
                            <label className="modern-label required">First Name</label>
                            <InputText
                              className="modern-input"
                              name="firstName"
                              placeholder="Enter first name"
                              value={userInfo.firstName}
                              onChange={handleInputChange}
                            />
                            {showError && !userInfo.firstName && (
                              <small className="error-message">This field is required</small>
                            )}
                          </div>

                          <div className="form-group">
                            <label className="modern-label">Last Name</label>
                            <InputText
                              className="modern-input"
                              name="lastName"
                              placeholder="Enter last name"
                              value={userInfo.lastName}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group">
                            <label className="modern-label required">Mobile Number</label>
                            <InputText
                              keyfilter="num"
                              className="modern-input"
                              name="mobileNumber"
                              placeholder="Enter mobile number"
                              value={userInfo.mobileNumber}
                              onChange={handleInputChange}
                            />
                            {showError && !userInfo.mobileNumber && (
                              <small className="error-message">This field is required</small>
                            )}
                            {!/^\d{9,}$/.test(userInfo.mobileNumber) && userInfo.mobileNumber && (
                              <small className="error-message">Enter valid phone number</small>
                            )}
                          </div>
                        </div>

                        <div className="form-actions">
                          <Button
                            label="Update Profile"
                            className="update-btn"
                            onClick={handleProfileUpdate}
                            loading={loading}
                          />
                        </div>
                      </div>
                    </Panel>
                  </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                  <div className="bookings-dashboard">
                    <div className="bookings-header">
                      <h3 className="bookings-title">My Bookings</h3>
                      <div className="bookings-filters">
                        <div className="filter-group">
                          <label className="filter-label">Filter by Date</label>
                          <Calendar
                            value={bookingDate}
                            onChange={(e) => {
                              setBookingDate(e.value);
                              handleFilterByDate(e);
                            }}
                            placeholder="Select date"
                            dateFormat="dd/mm/yy"
                            maxDate={today}
                            className="filter-calendar"
                          />
                        </div>
                        <div className="filter-group">
                          <label className="filter-label">Search Booking</label>
                          <InputText
                            className="filter-search"
                            name="searchKey"
                            placeholder="Enter booking ID"
                            value={searchKey}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSearchKey(value);
                              const bookingId = value ? value : null;
                              fetchBookings(bookingId, null);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bookings-content">
                      {loading && (
                        <div className="loading-state">
                          <div className="loading-spinner"></div>
                          <p>Loading bookings...</p>
                        </div>
                      )}

                      {!loading && bookings && bookings.length > 0 && (
                        <div className="bookings-grid">
                          {bookings.map((booking, index) => (
                            <div key={index} className="booking-card">
                              <div className="booking-header">
                                <div className="booking-id">
                                  <span className="id-label">Booking ID</span>
                                  <span className="id-value">{booking.id}</span>
                                </div>
                                <div className={`booking-status ${booking.status.toLowerCase()}`}>
                                  {booking.status}
                                </div>
                              </div>
                              <div className="booking-details">
                                <div className="booking-date">
                                  <i className="bi bi-calendar-event"></i>
                                  <span>{booking.date} {booking.time}</span>
                                </div>
                                <div className="booking-location">
                                  <i className="bi bi-geo-alt"></i>
                                  <span>{booking.details?.airportName || "Airport"}</span>
                                </div>
                              </div>
                              <div className="booking-actions">
                                <button
                                  className="action-btn view"
                                  data-bs-toggle="modal"
                                  data-bs-target="#bookingDetailModal"
                                  onClick={() => setSelectedBooking(booking.details)}
                                >
                                  <i className="bi bi-eye"></i>
                                  View Details
                                </button>
                                {booking.details?.cancellationCoverFee && (
                                  <button className="action-btn cancel">
                                    <i className="bi bi-x-circle"></i>
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {!loading && bookings && bookings.length === 0 && (
                        <div className="empty-state">
                          <div className="empty-icon">
                            <i className="bi bi-calendar-x"></i>
                          </div>
                          <h4>No bookings found</h4>
                          <p>You haven't made any bookings yet. Start by making your first reservation!</p>
                          <button className="cta-btn" onClick={() => goToLink("/")}>
                            Make a Booking
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {/*  */}

        {/* Booking detail modal */}
        {/* <div
                class="modal fade"
                id="bookingDetailModal"
                tabindex="-1"
                aria-labelledby="bookingDetailModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                    <div class="modal-content custom-modal">
                        <div class="modal-header p-2">
                            <h1 class="modal-title fs-5" id="bookingDetailModalLabel">
                                Booking Info
                            </h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div class="modal-body p-2">
                            <div className="data-view-area">
                                <h5 className="data-view-head">Booking Details</h5>

                                <div className="row mt-4">
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-3">
                                            <h6 className="data-view-title">Provider :</h6>
                                            <h6 className="data-view-data">Luton 247 Meet & Greet</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-3">
                                            <h6 className="data-view-title">Location :</h6>
                                            <h6 className="data-view-data">Luton</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-3 mb-lg-0">
                                            <h6 className="data-view-title">Drop Off Date & Time :</h6>
                                            <h6 className="data-view-data">13/07/2024 12:56</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-0">
                                            <h6 className="data-view-title">Return Date & Time :</h6>
                                            <h6 className="data-view-data">20/07/2024 12:50</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="data-view-sub mt-3">
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3">
                                                <h6 className="data-view-title">Booking Quote :</h6>
                                                <h6 className="data-view-data">£ 159</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3">
                                                <h6 className="data-view-title">Booking Fee :</h6>
                                                <h6 className="data-view-data">£ 0.99</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3 mb-lg-0">
                                                <h6 className="data-view-title">Discount :</h6>
                                                <h6 className="data-view-data">---</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-0">
                                                <h6 className="data-view-title">Total :</h6>
                                                <h6 className="data-view-data">£ 160</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Divider className="mt-4 mb-4" />

                                <h5 className="data-view-head">Travel Details</h5>

                                <div className="row mt-4">
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-3">
                                            <h6 className="data-view-title">Depart Terminal :</h6>
                                            <h6 className="data-view-data">Terminal 1</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-3">
                                            <h6 className="data-view-title">Arrival Terminal :</h6>
                                            <h6 className="data-view-data">Terminal 2</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-3 mb-lg-0">
                                            <h6 className="data-view-title">Outbound Flight/Vessel :</h6>
                                            <h6 className="data-view-data">Flight 2</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <div className="data-view mb-0">
                                            <h6 className="data-view-title">Inbound Flight/Vessel :</h6>
                                            <h6 className="data-view-data">Flight 2</h6>
                                        </div>
                                    </div>
                                </div>

                                <Divider className="mt-4 mb-4" />

                                <h5 className="data-view-head">Vehicle Details</h5>

                                <div className="data-view-sub mt-3">
                                    <h6 className="data-view-sub-head">Vehicle 1</h6>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3">
                                                <h6 className="data-view-title">Registration Number :</h6>
                                                <h6 className="data-view-data">123456789</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3">
                                                <h6 className="data-view-title">Make :</h6>
                                                <h6 className="data-view-data">Audi</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3 mb-lg-0">
                                                <h6 className="data-view-title">Model :</h6>
                                                <h6 className="data-view-data">A6</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-0">
                                                <h6 className="data-view-title">Color :</h6>
                                                <h6 className="data-view-data">Black</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="data-view-sub mt-2">
                                    <h6 className="data-view-sub-head">Vehicle 2</h6>
                                    <div className="row">
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3">
                                                <h6 className="data-view-title">Registration Number :</h6>
                                                <h6 className="data-view-data">123456789</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3">
                                                <h6 className="data-view-title">Make :</h6>
                                                <h6 className="data-view-data">Honda</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-3 mb-lg-0">
                                                <h6 className="data-view-title">Model :</h6>
                                                <h6 className="data-view-data">CIVIC</h6>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <div className="data-view mb-0">
                                                <h6 className="data-view-title">Color :</h6>
                                                <h6 className="data-view-data">Black</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        {selectedBooking && (
          <div
            className="modal fade"
            id="bookingDetailModal"
            tabIndex="-1"
            aria-labelledby="bookingDetailModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
              <div className="modal-content custom-modal">
                <div className="modal-header p-2">
                  <h1 className="modal-title fs-5" id="bookingDetailModalLabel">
                    Booking Info
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body p-2">
                  <div className="data-view-area">
                    <h5 className="data-view-head">Booking Details</h5>
                    <div className="row mt-4">
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-3">
                          <h6 className="data-view-title">Provider :</h6>
                          <h6 className="data-view-data">
                            {selectedBooking.company.companyName}
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-3">
                          <h6 className="data-view-title">Location :</h6>
                          <h6 className="data-view-data">
                            {selectedBooking.airportName}
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-3 mb-lg-0">
                          <h6 className="data-view-title">
                            Drop Off Date & Time :
                          </h6>
                          {/*<h6 className="data-view-data">
                            {new Date(
                              selectedBooking.dropOffDate
                            ).toLocaleString().split(",")[0]} & {selectedBooking.dropOffTime}
                          </h6>*/}
                          <h6 className="data-view-data">
                            {
                              selectedBooking.dropOffDate
                            } & {selectedBooking.dropOffTime}
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-0">
                          <h6 className="data-view-title">
                            Return Date & Time :
                          </h6>
                          <h6 className="data-view-data">
                            {
                              selectedBooking.pickUpDate
                            } & {selectedBooking.pickUpTime}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="data-view-sub mt-3">
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <div className="data-view mb-3">
                            <h6 className="data-view-title">Booking Quote :</h6>
                            <h6 className="data-view-data">
                              £ {selectedBooking.bookingQuote}
                            </h6>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="data-view mb-3">
                            <h6 className="data-view-title">Booking Fee :</h6>
                            <h6 className="data-view-data">
                              £ {selectedBooking.bookingFee}
                            </h6>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="data-view mb-3 mb-lg-0">
                            <h6 className="data-view-title">Discount :</h6>
                            <h6 className="data-view-data">
                              £ {selectedBooking.couponDiscount}
                            </h6>
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="data-view mb-0">
                            <h6 className="data-view-title">Total :</h6>
                            <h6 className="data-view-data">
                              £ {selectedBooking.totalPayable}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Divider className="mt-4 mb-4" />
                    <h5 className="data-view-head">Travel Details</h5>
                    <div className="row mt-4">
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-3">
                          <h6 className="data-view-title">Depart Terminal :</h6>
                          <h6 className="data-view-data">
                            {selectedBooking.travelDetail.departureTerminal}
                          </h6>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-3">
                          <h6 className="data-view-title">
                            Arrival Terminal :
                          </h6>
                          <h6 className="data-view-data">
                            {selectedBooking.travelDetail.arrivalTerminal}
                          </h6>
                        </div>
                      </div>
                      {/* <div className="col-12 col-lg-6">
                        <div className="data-view mb-3 mb-lg-0">
                          <h6 className="data-view-title">
                            Outbound Flight/Vessel :
                          </h6>
                          <h6 className="data-view-data">
                            {selectedBooking.travelDetail.outBoundFlight}
                          </h6>
                        </div>
                      </div> */}
                      <div className="col-12 col-lg-6">
                        <div className="data-view mb-0">
                          <h6 className="data-view-title">
                            Inbound Flight/Vessel :
                          </h6>
                          <h6 className="data-view-data">
                            {selectedBooking.travelDetail.inBoundFlight || "-"}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <Divider className="mt-4 mb-4" />
                    <h5 className="data-view-head">Vehicle Details</h5>
                    {selectedBooking.vehicleDetail.map((vehicle, index) => (
                      <div key={index} className="data-view-sub mt-3">
                        <h6 className="data-view-sub-head">
                          Vehicle {index + 1}
                        </h6>
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="data-view mb-3">
                              <h6 className="data-view-title">
                                Registration Number :
                              </h6>
                              <h6 className="data-view-data">
                                {vehicle.regNo}
                              </h6>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="data-view mb-3">
                              <h6 className="data-view-title">Make :</h6>
                              <h6 className="data-view-data">{vehicle.make || "-"}</h6>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="data-view mb-3 mb-lg-0">
                              <h6 className="data-view-title">Model :</h6>
                              <h6 className="data-view-data">
                                {vehicle.model || "-"}
                              </h6>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="data-view mb-0">
                              <h6 className="data-view-title">Color :</h6>
                              <h6 className="data-view-data">
                                {vehicle.color}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Divider className="mt-4 mb-4" />
                        <h5 className="data-view-head">Vendor Details</h5>
                        <div className="row mt-4">
                            <div className="col-12 col-lg-6">
                                <div className="data-view mb-3">
                                    <h6 className="data-view-title">Vendor :</h6>
                                    <h6 className="data-view-data">
                                        {selectedBooking.company.companyName}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="data-view mb-3">
                                    <h6 className="data-view-title">
                                        Email :
                                    </h6>
                                    <h6 className="data-view-data">
                                        {selectedBooking.company.email}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="data-view mb-0">
                                    <h6 className="data-view-title">
                                        Mobile Number :
                                    </h6>
                                    <h6 className="data-view-data">
                                        {selectedBooking.company.mobileNumber}
                                    </h6>
                                </div>
                            </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*  */}

        <Footer />
      </>
    );
}

export default Dashboard;
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from "primereact/checkbox";
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import { Toast } from 'primereact/toast';
import api from "../../api";
import { sendVerificationEmail, verifyOTP } from "../../utils/authUtil";
import withComponentName from "../../withComponentName";
import Preloader from "../../Preloader";


const Signup = () => {
  const navigate = useNavigate();
  const toast = useRef(null);
  const [page, setPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const [reSendLoading, setReSendLoading] = useState(false);

  const [otp, setOTP] = useState();
  const [seconds, setSeconds] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [showError, setShowError] = useState(false);
  const [checked, setChecked] = useState(false);

  const header = <div className="font-bold mb-3">Password Strength</div>;
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="ps-4 mt-0 mb-0 pb-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li className="mb-0">Minimum 8 characters</li>
      </ul>
    </>
  );

  const titles = [
    { name: 'Mr.' },
    { name: 'Mrs.' },
    { name: 'Ms.' },
    { name: 'Miss.' },
  ];



  const initialSignUpInfo = {
    email: '',
    title: titles[0].name,
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    // addressL1: "",
    // addressL2: "",
    // city: "",
    // country: "",
    // postCode: "",
    role: "User"
  };
  const [signUpInfo, setSignUpInfo] = useState(initialSignUpInfo);
  const [emailExists, setEmailExist] = useState(false);

  // console.log(signUpInfo);
  const [title, setTitle] = useState(titles[0]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
    if (name === "email") {
      setShowError(false);
      setEmailExist(false);
      try {
        const response = await api.post("/api/auth/check-user-registerd", { email: value });
        console.log(response.data);
        setEmailExist(response.data?.emailExists);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    await sendVerificationEmail(
      signUpInfo.email,
      setShowError,
      setLoading,
      setReSendLoading,
      setPage,
      setSeconds,
      setIsButtonDisabled,
      null,
      setSignUpInfo,
      toast
    );
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    await verifyOTP(otp, setShowError, setOTP, signUpInfo.email, setLoading, setPage, toast, false, false);
  };

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsButtonDisabled(false);
    }
  }, [seconds]);

  const handleResendCode = () => {
    setOTP();
    setSeconds(60);
    setIsButtonDisabled(true);
    handleVerifyEmail()
  };

  const goBack = () => {
    if (page === 2) {
      setPage(1);
    } else if (page === 3) {
      setPage(2);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const register = async (signUpInfo) => {
    try {
      setLoading(true);
      console.log(signUpInfo);
      const response = await api.post("/api/auth/register", signUpInfo);
      console.log(response.data);
      toast.current.show({
        severity: 'success',
        summary: 'Register Success',
        detail: "You have been registered successfully",
        life: 3000
      });
      // Redirect to home page after successful registration
      setTimeout(() => {
        navigate("/")
      }, 2000);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.error || err.message || 'An unexpected error occurred';
      toast.current.show({
        severity: 'error',
        summary: 'Failed to Register',
        detail: errorMessage,
        life: 3000
      });
    } finally {
      setLoading(false);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUpInfo.email || !signUpInfo.firstName || !signUpInfo.password || !signUpInfo.confirmPassword || !signUpInfo.mobileNumber || !signUpInfo.title) {
      setShowError(true);
      toast.current.show({
        severity: 'error',
        summary: 'Error in Submission',
        detail: "Please fill all required fields!",
        life: 3000
      });
      return;
    }
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      toast.current.show({
        severity: 'error',
        summary: 'Error in Submission',
        detail: "Password & Confirm Password do not match!",
        life: 3000
      });
      return;
    }
    if (signUpInfo.password.length < 8) {
      toast.current.show({
        severity: 'error',
        summary: 'Error in Submission',
        detail: "Password must be atleast 8 characters long!",
        life: 3000
      });
      return;
    }
    if (!checked) {
      toast.current.show({
        severity: 'error',
        summary: 'Error in Submission',
        detail: "You have to agree the Terms & Privacy Policy before Register",
        life: 3000
      });
      return;
    }

    const { confirmPassword, ...updatedSignUpInfo } = signUpInfo;

    await register(updatedSignUpInfo);

    setSignUpInfo(initialSignUpInfo);

  };

  return (
    <>
      <Header />
      <Toast ref={toast} />

      {/* Split Screen Signup Section */}
      <section className="split-signin-section">
        <div className="split-container">
          {/* Left Panel - Signup Forms */}
          <div className="signin-left-panel">
            <div className="signin-form-container">
              {page === 1 ? (
                <>
                  {/* Logo Section */}
                  <div className="signin-brand">
                    <img
                      src="assets/images/logo.png"
                      className="brand-logo"
                      alt="Platinum Holiday Service"
                    />
                    <h1 className="brand-name-j">Platinum Holiday Service</h1>
                  </div>

                  {/* Welcome Section */}
                  <div className="welcome-section">
                    <h2 className="welcome-title">Account Verification</h2>
                    <p className="welcome-subtitle">
                      Enter your email address below for verification
                    </p>
                  </div>

                  {/* Form Section */}
                  <form className="split-signin-form" onSubmit={handleVerifyEmail}>
                    <div className="input-group">
                      <label htmlFor="verify_email" className="input-label">
                        Email Address
                      </label>
                      <InputText
                        id="verify_email"
                        keyfilter="email"
                        className="split-input"
                        placeholder="Enter your email address"
                        name="email"
                        value={signUpInfo.email}
                        onChange={handleInputChange}
                      />
                      {(showError && !signUpInfo.email) && (
                        <small className="error-text">This field is required</small>
                      )}
                      {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpInfo.email) && signUpInfo.email && (
                        <small className="error-text">Enter valid email</small>
                      )}
                      {emailExists && (
                        <small className="error-text">Email already exists</small>
                      )}
                    </div>

                    <Button
                      label={loading ? "Processing..." : "VERIFY EMAIL"}
                      className="split-signin-button"
                      loading={loading}
                      disabled={!signUpInfo.email || emailExists}
                      type="submit"
                    />

                    <div className="signup-section">
                      <p className="signup-text">
                        Already have an account?{" "}
                        <a href="/sign-in" className="signup-link">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </form>
                </>
              ) : page === 2 ? (
                <>
                  {/* Logo Section */}
                  <div className="signin-brand">
                    <img
                      src="assets/images/logo.png"
                      className="brand-logo"
                      alt="Platinum Holiday Service"
                    />
                    <h1 className="brand-name-j">Platinum Holiday Service</h1>
                  </div>

                  {/* Back Button */}
                  <div className="signup-section" style={{ marginBottom: '20px' }}>
                    <button
                      type="button"
                      onClick={goBack}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <i className="ri-arrow-left-line"></i>
                      Back
                    </button>
                  </div>

                  {/* Welcome Section */}
                  <div className="welcome-section">
                    <h2 className="welcome-title">OTP Verification</h2>
                    <p className="welcome-subtitle">
                      Enter the OTP verification code sent to your email address
                    </p>
                  </div>

                  {/* Form Section */}
                  <form className="split-signin-form" onSubmit={handleVerifyOTP}>
                    <div className="input-group">
                      <label className="input-label">Enter OTP</label>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <InputOtp
                          value={otp}
                          onChange={(e) => {
                            setShowError(false);
                            setOTP(e.value);
                          }}
                          numInputs={6}
                          className="split-otp-input"
                        />
                      </div>
                      {(showError && !otp) && (
                        <small className="error-text">This field is required</small>
                      )}
                    </div>

                    <Button
                      label={reSendLoading ? "Processing..." : loading ? "Verifying..." : "VERIFY OTP"}
                      className="split-signin-button"
                      loading={loading}
                      disabled={!otp}
                      type="submit"
                    />
                    
                    <div className="signup-section">
                      <p className="signup-text">
                        Didn't receive the code?{" "}
                        <button
                          type="button"
                          onClick={handleResendCode}
                          disabled={isButtonDisabled}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#667eea',
                            textDecoration: 'underline',
                            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
                            opacity: isButtonDisabled ? 0.5 : 1
                          }}
                        >
                          Resend Code {isButtonDisabled && `(${seconds}s)`}
                        </button>
                      </p>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Logo Section */}
                  <div className="signin-brand">
                    <img
                      src="assets/images/logo.png"
                      className="brand-logo"
                      alt="Platinum Holiday Service"
                    />
                    <h1 className="brand-name-j">Platinum Holiday Service</h1>
                  </div>
                  <Divider></Divider>

                  {/* Back Button */}
                  {/* <div className="signup-section" style={{ marginBottom: '20px' }}>
                    <button
                      type="button"
                      onClick={goBack}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <i className="ri-arrow-left-line"></i>
                      Back
                    </button>
                  </div> */}

                  {/* Welcome Section */}
                  <div className="welcome-section">
                    <h2 className="welcome-title">Create Your Account</h2>
                    <p className="welcome-subtitle">
                      Complete your registration details below
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', margin: '8px 0 0 0' }}>
                      <span style={{ color: 'red' }}>*</span> All fields are required
                    </p>
                  </div>

                  {/* Form Section */}
                  <form className="split-signin-form signup-form" onSubmit={handleSubmit}>
                    <div className="signup-form-grid">
                      <div className="input-group-row">
                        <div className="input-group" style={{ flex: '0 0 30%' }}>
                          <label className="input-label">Title</label>
                          <Dropdown 
                            value={{ name: signUpInfo.title }} 
                            onChange={(e) => setSignUpInfo({ ...signUpInfo, title: e.value?.name })} 
                            options={titles} 
                            optionLabel="name"
                            placeholder="Select"
                            className="split-dropdown"
                          />
                          {(showError && !signUpInfo.title) && (
                            <small className="error-text">This field is required</small>
                          )}
                        </div>
                        <div className="input-group" style={{ flex: '1' }}>
                          <label className="input-label">First Name</label>
                          <InputText
                            className="split-input"
                            name="firstName"
                            value={signUpInfo.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                          />
                          {(showError && !signUpInfo.firstName) && (
                            <small className="error-text">This field is required</small>
                          )}
                        </div>
                      </div>

                      <div className="input-group-row">
                        <div className="input-group">
                          <label className="input-label">Last Name</label>
                          <InputText
                            className="split-input"
                            name="lastName"
                            value={signUpInfo.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div className="input-group">
                          <label className="input-label">Mobile Number</label>
                          <InputText
                            keyfilter="num"
                            className="split-input"
                            name="mobileNumber"
                            value={signUpInfo.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your mobile number"
                          />
                          {(showError && !signUpInfo.mobileNumber) && (
                            <small className="error-text">This field is required</small>
                          )}
                          {(!(/^\d{9,}$/.test(signUpInfo.mobileNumber)) && signUpInfo.mobileNumber) && (
                            <small className="error-text">Enter valid phone number</small>
                          )}
                        </div>
                      </div>

                      <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <InputText
                          keyfilter="email"
                          className="split-input"
                          name="email"
                          value={signUpInfo.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                        />
                        {(showError && !signUpInfo.email) && (
                          <small className="error-text">This field is required</small>
                        )}
                        {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpInfo.email) && signUpInfo.email && (
                          <small className="error-text">Enter valid email</small>
                        )}
                        {emailExists && (
                          <small className="error-text">Email already exists</small>
                        )}
                      </div>

                      <div className="input-group-row">
                        <div className="input-group">
                          <label className="input-label">Password</label>
                          <Password
                            className="split-input"
                            name="password"
                            value={signUpInfo.password}
                            onChange={handleInputChange}
                            header={header}
                            footer={footer}
                            toggleMask
                            placeholder="Enter your password"
                            feedback={true}
                          />
                          {(showError && !signUpInfo.password) && (
                            <small className="error-text">This field is required</small>
                          )}
                          {(signUpInfo.password.length < 8 && signUpInfo.password) && (
                            <small className="error-text">Password must be at least 8 characters long</small>
                          )}
                        </div>
                        <div className="input-group">
                          <label className="input-label">Confirm Password</label>
                          <Password
                            className="split-input"
                            name="confirmPassword"
                            value={signUpInfo.confirmPassword}
                            onChange={handleInputChange}
                            feedback={false}
                            toggleMask
                            placeholder="Re-enter your password"
                          />
                          {(showError && !signUpInfo.confirmPassword) && (
                            <small className="error-text">This field is required</small>
                          )}
                          {(signUpInfo.password !== signUpInfo.confirmPassword && signUpInfo.confirmPassword) && (
                            <small className="error-text">Password & Confirm Password must match</small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-extras" style={{ marginTop: '20px' }}>
                      <div className="remember-section">
                        <Checkbox
                          inputId="terms"
                          onChange={(e) => setChecked(e.checked)}
                          checked={checked}
                          className="split-checkbox"
                        />
                        <label htmlFor="terms" className="remember-label" style={{ fontSize: '13px' }}>
                          I accept the{" "}
                          <a href="/terms-and-conditions" target="_blank" style={{ color: '#667eea' }}>
                            Terms
                          </a>{" "}
                          and{" "}
                          <a href="/privacy-policy" target="_blank" style={{ color: '#667eea' }}>
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </div>

                    <Button
                      label="CREATE ACCOUNT"
                      disabled={!checked}
                      className="split-signin-button"
                      loading={loading}
                      type="submit"
                    />

                    <div className="signup-section">
                      <p className="signup-text">
                        Already have an account?{" "}
                        <a href="/sign-in" className="signup-link">
                          Sign In
                        </a>
                      </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Background Image */}
          <div className="signin-right-panel">
            <div className="image-overlay">
              <div className="overlay-content">
                <h3 className="overlay-title">Join Platinum Holiday Service</h3>
                <p className="overlay-description">
                  Create your account to access premium airport parking services and exclusive travel benefits
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default withComponentName(Signup, 'Signup');
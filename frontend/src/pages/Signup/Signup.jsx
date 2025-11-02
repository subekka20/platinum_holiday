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

      {/* Clean Signup Section */}
      <section className="clean-signin-section">
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            {page === 1 ? (
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="clean-signin-card" data-aos="fade-up">
                  <div className="clean-card-header">
                    <img
                      src="assets/images/logo.png"
                      className="clean-card-logo"
                      alt="Platinum Holiday Service"
                    />
                    <h2 className="clean-card-title">Account Verification</h2>
                    <p className="clean-card-subtitle">
                      Enter your email address below for verification
                    </p>
                  </div>
                  
                  <form className="clean-signin-form" onSubmit={handleVerifyEmail}>
                    <div className="clean-input-group">
                      <InputText
                        id="verify_email"
                        keyfilter="email"
                        className="clean-input"
                        placeholder="Enter your email address"
                        name="email"
                        value={signUpInfo.email}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="verify_email" className="clean-label">
                        Email Address *
                      </label>
                      
                      {(showError && !signUpInfo.email) && (
                        <small className="clean-error-msg">
                          This field is required
                        </small>
                      )}
                      {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpInfo.email) && signUpInfo.email && (
                        <small className="clean-error-msg">
                          Enter valid email
                        </small>
                      )}
                      {emailExists && (
                        <small className="clean-error-msg">
                          Email already exists
                        </small>
                      )}
                    </div>

                    <Button
                      label={loading ? "Processing..." : "VERIFY EMAIL"}
                      className="clean-submit-btn"
                      loading={loading}
                      disabled={!signUpInfo.email || emailExists}
                      type="submit"
                    />
                                    </form>
                </div>
              </div>
            ) : page === 2 ? (
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="clean-signin-card" data-aos="fade-up">
                  <button
                    className="clean-back-btn"
                    onClick={goBack}
                  >
                    <i className="ri ri-arrow-left-line"></i>
                    Back
                  </button>
                  
                  <div className="clean-card-header">
                    <img
                      src="assets/images/logo.png"
                      className="clean-card-logo"
                      alt="Platinum Holiday Service"
                    />
                    <h2 className="clean-card-title">OTP Verification</h2>
                    <p className="clean-card-subtitle">
                      Enter the OTP verification code sent to your email address
                    </p>
                  </div>
                  
                  <form className="clean-signin-form" onSubmit={handleVerifyOTP}>
                    <div className="clean-otp-group">
                      <label className="clean-otp-label">Enter OTP *</label>
                      <div className="clean-otp-container">
                        <InputOtp
                          value={otp}
                          onChange={(e) => {
                            setShowError(false);
                            setOTP(e.value);
                          }}
                          numInputs={6}
                          className="clean-otp-input"
                        />
                      </div>
                      {(showError && !otp) && (
                        <small className="clean-error-msg">
                          This field is required
                        </small>
                      )}
                    </div>

                    <Button
                      label={reSendLoading ? "Processing..." : loading ? "Verifying..." : "VERIFY OTP"}
                      className="clean-submit-btn"
                      loading={loading}
                      disabled={!otp}
                      type="submit"
                    />
                    
                    <div className="clean-resend-section">
                      <p>
                        Didn't receive the code?{" "}
                        <button
                          type="button"
                          className="clean-link-btn"
                          onClick={handleResendCode}
                          disabled={isButtonDisabled}
                        >
                          Resend Code {isButtonDisabled && `(${seconds}s)`}
                        </button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="col-12 col-lg-10 col-xl-8 mx-auto">
                <div className="clean-signin-card signup-form-card" data-aos="fade-up">
                  <div className="clean-card-header">
                    <img
                      src="assets/images/logo.png"
                      className="clean-card-logo"
                      alt="Platinum Holiday Service"
                    />
                    <h2 className="clean-card-title">Create Your Account</h2>
                    <p className="clean-card-subtitle">
                      Complete your registration details below
                    </p>

                    <h6 style={{color:"white", fontSize:"12px"}}><span style={{ color: "red" }}>* </span >All fields are required</h6>
                  </div>
                  
                  <form className="clean-signin-form signup-form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-3 col-sm-4">
                        <div className="clean-input-group">
                          <Dropdown 
                            value={{ name: signUpInfo.title }} 
                            onChange={(e) => setSignUpInfo({ ...signUpInfo, title: e.value?.name })} 
                            options={titles} 
                            optionLabel="name"
                            placeholder="Select"
                            className="clean-dropdown"
                          />
                          {/* <label className="clean-label">Title *</label> */}
                          {(showError && !signUpInfo.title) && (
                            <small className="clean-error-msg">This field is required</small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-4 col-sm-8">
                        <div className="clean-input-group">
                          {/* <label className="clean-label">First Name *</label> */}
                          <InputText
                            className="clean-input"
                            name="firstName"
                            value={signUpInfo.firstName}
                            onChange={handleInputChange}
                            placeholder="Enter your first name"
                          />
                          {(showError && !signUpInfo.firstName) && (
                            <small className="clean-error-msg">This field is required</small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="clean-input-group">
                          <InputText
                            className="clean-input"
                            name="lastName"
                            value={signUpInfo.lastName}
                            onChange={handleInputChange}
                            placeholder="Enter your last name"
                          />
                          {/* <label className="clean-label">Last Name</label> */}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="clean-input-group">
                          <InputText
                            keyfilter="email"
                            className="clean-input"
                            name="email"
                            value={signUpInfo.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                          />
                          {/* <label className="clean-label">Email Address *</label> */}
                          {(showError && !signUpInfo.email) && (
                            <small className="clean-error-msg">This field is required</small>
                          )}
                          {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpInfo.email) && signUpInfo.email && (
                            <small className="clean-error-msg">Enter valid email</small>
                          )}
                          {emailExists && (
                            <small className="clean-error-msg">Email already exists</small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="clean-input-group">
                          <InputText
                            keyfilter="num"
                            className="clean-input"
                            name="mobileNumber"
                            value={signUpInfo.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your mobile number"
                          />
                          {/* <label className="clean-label">Mobile Number *</label> */}
                          {(showError && !signUpInfo.mobileNumber) && (
                            <small className="clean-error-msg">This field is required</small>
                          )}
                          {(!(/^\d{9,}$/.test(signUpInfo.mobileNumber)) && signUpInfo.mobileNumber) && (
                            <small className="clean-error-msg">Enter valid phone number</small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="clean-input-group">
                          <Password
                            className="clean-password"
                            name="password"
                            value={signUpInfo.password}
                            onChange={handleInputChange}
                            header={header}
                            footer={footer}
                            toggleMask
                            placeholder="Enter your password"
                            feedback={true}
                          />
                          {/* <label className="clean-label">Password *</label> */}
                          {(showError && !signUpInfo.password) && (
                            <small className="clean-error-msg">This field is required</small>
                          )}
                          {(signUpInfo.password.length < 8 && signUpInfo.password) && (
                            <small className="clean-error-msg">Password must be at least 8 characters long</small>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="clean-input-group">
                          <Password
                            className="clean-password"
                            name="confirmPassword"
                            value={signUpInfo.confirmPassword}
                            onChange={handleInputChange}
                            feedback={false}
                            toggleMask
                            placeholder="Re-enter your password"
                          />
                          {/* <label className="clean-label">Confirm Password *</label> */}
                          {(showError && !signUpInfo.confirmPassword) && (
                            <small className="clean-error-msg">This field is required</small>
                          )}
                          {(signUpInfo.password !== signUpInfo.confirmPassword && signUpInfo.confirmPassword) && (
                            <small className="clean-error-msg">Password & Confirm Password must match</small>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="clean-checkbox-group">
                      <Checkbox
                        inputId="terms"
                        onChange={(e) => setChecked(e.checked)}
                        checked={checked}
                      />
                      <label htmlFor="terms" className="clean-checkbox-label">
                        I accept the use of cookies in accordance with the{" "}
                        <a href="/terms-and-conditions" target="_blank" className="clean-link">
                          Terms
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" target="_blank" className="clean-link">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <Button
                      label="CREATE ACCOUNT"
                      disabled={!checked}
                      className="clean-submit-btn"
                      loading={loading}
                      type="submit"
                    />

                    <div className="clean-form-footer">
                      <p>
                        Already have an account?{" "}
                        <a href="/sign-in" style={{ textDecoration:"none", color:"purple", fontSize: "16px", fontWeight: "bold" }}>
                          Sign in
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Signup Section End */}

      <Footer />
    </>
  );
}

export default withComponentName(Signup, 'Signup');
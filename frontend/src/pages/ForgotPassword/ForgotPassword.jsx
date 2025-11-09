import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { sendVerificationEmail } from "../../utils/authUtil";
import withComponentName from "../../withComponentName";

const ForgotPassword = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reSendLoading, setReSendLoading] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showError, setShowError] = useState(false);

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

  const initialResetPasswordInfo = {
    email: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [resetPasswordInfo, setResetPasswordInfo] = useState(
    initialResetPasswordInfo
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetPasswordInfo({ ...resetPasswordInfo, [name]: value });
  };

  const handleVerifyEmail = (e) => {
    e.preventDefault();

    const email = resetPasswordInfo.email?.trim();
    if (!email) {
      setShowError(true);
      return;
    }

    const looksLikeEmail = /\S+@\S+\.\S+/.test(email);
    if (!looksLikeEmail) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setPage(2);
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

  const goBack = () => {
    if (page === 3) setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resettingPassword = async (resetInfo) => {
    try {
      const response = await api.post("/api/user/reset-password", resetInfo);
      console.log(response.data);
      // toast.current.show({
      //   severity: "success",
      //   summary: "Reset Successfully",
      //   detail: "Your account password reset successfully",
      //   life: 3000,
      // });
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (err) {
      console.log(err);
      // toast.current.show({
      //   severity: "error",
      //   summary: "Failed to Reset",
      //   detail: err.response?.data?.error || "Something went wrong",
      //   life: 3000,
      // });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !resetPasswordInfo.email ||
      !resetPasswordInfo.newPassword ||
      !resetPasswordInfo.confirmPassword
    ) {
      setShowError(true);
      // toast.current.show({
      //   severity: "error",
      //   summary: "Error in Submission",
      //   detail: "Please fill all required fields!",
      //   life: 3000,
      // });
      return;
    }
    if (resetPasswordInfo.newPassword !== resetPasswordInfo.confirmPassword) {
      // toast.current.show({
      //   severity: "error",
      //   summary: "Error in Submission",
      //   detail: "Password & Confirm Password do not match!",
      //   life: 3000,
      // });
      return;
    }
    if (resetPasswordInfo.newPassword.length < 8) {
      // toast.current.show({
      //   severity: "error",
      //   summary: "Error in Submission",
      //   detail: "Password must be at least 8 characters long!",
      //   life: 3000,
      // });
      return;
    }

    const { confirmPassword, ...updatedResetInfo } = resetPasswordInfo;
    await resettingPassword(updatedResetInfo);
    setResetPasswordInfo(initialResetPasswordInfo);
  };

  return (
    <>
      <Header />
      <Toast ref={toast} />

      {/* Split Screen Forgot Password Section */}
      <section className="split-signin-section">
        <div className="split-container">
          {/* Left Panel - Forgot Password Forms */}
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
                    <h2 className="welcome-title">Reset Password</h2>
                    <p className="welcome-subtitle">
                      Enter your email address to receive password reset
                      instructions
                    </p>
                  </div>

                  {/* Form Section */}
                  <form
                    className="split-signin-form"
                    onSubmit={handleVerifyEmail}
                  >
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
                        value={resetPasswordInfo.email}
                        onChange={handleInputChange}
                      />
                      {showError && !resetPasswordInfo.email && (
                        <small className="error-text">
                          This field is required
                        </small>
                      )}
                      {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        resetPasswordInfo.email
                      ) &&
                        resetPasswordInfo.email && (
                          <small className="error-text">
                            Enter valid email
                          </small>
                        )}
                    </div>

                    <Button
                      label={loading ? "Processing..." : "CHANGE PASSWORD"}
                      className="split-signin-button"
                      loading={loading}
                      disabled={!resetPasswordInfo.email}
                      type="submit"
                    />

                    <div className="signup-section">
                      <p className="signup-text">
                        Remember your password?{" "}
                        <a href="/sign-in" className="signup-link">
                          Sign In
                        </a>
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
                    <h2 className="welcome-title">Create New Password</h2>
                    <p className="welcome-subtitle">
                      Please enter your new password below
                    </p>
                  </div>

                  {/* Form Section */}
                  <form className="split-signin-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <label className="input-label">New Password</label>
                      <Password
                        className="split-input"
                        name="newPassword"
                        value={resetPasswordInfo.newPassword}
                        onChange={handleInputChange}
                        header={header}
                        footer={footer}
                        toggleMask
                        placeholder="Enter your new password"
                        feedback={true}
                      />
                      {showError && !resetPasswordInfo.newPassword && (
                        <small className="error-text">
                          This field is required
                        </small>
                      )}
                      {resetPasswordInfo.newPassword.length < 8 &&
                        resetPasswordInfo.newPassword && (
                          <small className="error-text">
                            Password must be at least 8 characters long
                          </small>
                        )}
                    </div>

                    <div className="input-group">
                      <label className="input-label">Confirm Password</label>
                      <Password
                        className="split-input"
                        name="confirmPassword"
                        value={resetPasswordInfo.confirmPassword}
                        onChange={handleInputChange}
                        feedback={false}
                        toggleMask
                        placeholder="Re-enter your new password"
                      />
                      {showError && !resetPasswordInfo.confirmPassword && (
                        <small className="error-text">
                          This field is required
                        </small>
                      )}
                      {resetPasswordInfo.newPassword !==
                        resetPasswordInfo.confirmPassword &&
                        resetPasswordInfo.confirmPassword && (
                          <small className="error-text">
                            Passwords do not match
                          </small>
                        )}
                    </div>

                    <Button
                      label="RESET PASSWORD"
                      className="split-signin-button"
                      loading={loading}
                      type="submit"
                    />

                    <div className="signup-section">
                      <p className="signup-text">
                        Remember your password?{" "}
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
                <h3 className="overlay-title">Password Recovery</h3>
                <p className="overlay-description">
                  Securely reset your password and regain access to your
                  Platinum Holiday Service account
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default withComponentName(ForgotPassword, "ForgotPassword");

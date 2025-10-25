import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { setLogin } from "../../state";
import api from "../../api";
import withComponentName from "../../withComponentName";

const Signin = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [checked, setChecked] = useState(false);
  const [require, setRequire] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialSigInInfo = {
    email: "",
    password: "",
    role: "User",
  };
  const [signInInfo, setSignInInfo] = useState(initialSigInInfo);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setSignInInfo({ ...signInInfo, [name]: value });
  };

  const login = async (loginInfo) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", loginInfo);
      console.log(response.data);
      toast.current.show({
        severity: "success",
        summary: "Login Successful",
        detail: "You have been logged in successfully",
        life: 3000,
      });
      setTimeout(() => {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Failed to Logged In",
        detail: err.response.data.error,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signInInfo.email || !signInInfo.password) {
      setRequire(true);
      toast.current.show({
        severity: "error",
        summary: "Error in Submission",
        detail: "Please fill all required fields!",
        life: 3000,
      });
      return;
    }

    await login(signInInfo);
    setSignInInfo(initialSigInInfo);
  };

  return (
    <>
      <Header />
      <Toast ref={toast} />

      {/* Clean Signin Section */}
      <section className="clean-signin-section">
        <div className="signin-container">
          <div className="signin-card">
            {/* Logo Section */}
            <div className="logo-section">
              <img
                src="assets/images/logo.png"
                className="signin-logo"
                alt="Platinum Holiday Service"
              />
              <h1 className="company-name">Platinum Holiday Service</h1>
            </div>

            {/* Form Section */}
            <div className="form-section">
              <div className="form-header">
                <h2 className="form-title">Sign In</h2>
                <p className="form-subtitle">
                  Welcome back! Please sign in to your account
                </p>
              </div>

              <form className="signin-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="email" className="input-label form-required">
                    Email 
                  </label>
                  <InputText
                    id="email"
                    keyfilter="email"
                    className="clean-input"
                    name="email"
                    value={signInInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                  {require && !signInInfo.email && (
                    <small className="error-text">This field is required</small>
                  )}
                  {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInInfo.email) &&
                    signInInfo.email && (
                      <small className="error-text">Enter valid email</small>
                    )}
                </div>

                <div className="input-group">
                  <label
                    htmlFor="password"
                    className="input-label form-required"
                  >
                    Password
                  </label>
                  <Password
                    id="password"
                    className="clean-input"
                    name="password"
                    value={signInInfo.password}
                    onChange={handleInputChange}
                    toggleMask
                    feedback={false}
                    placeholder="Enter your password"
                  />
                  {require && !signInInfo.password && (
                    <small className="error-text">
                      This field is required
                    </small>
                  )}
                </div>

                <div className="form-extras">
                  <div className="remember-section">
                    <Checkbox
                      inputId="rememberMe"
                      onChange={(e) => setChecked(e.checked)}
                      checked={checked}
                      className="clean-checkbox"
                    />
                    <label htmlFor="rememberMe" className="remember-label">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>

                <Button
                  label="Sign In"
                  className="signin-button"
                  loading={loading}
                  disabled={loading}
                />

                <div className="signup-section">
                  <p className="signup-text">
                    Don't have an account?{" "}
                    <a href="/sign-up" className="signup-link">
                      Sign Up 
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default withComponentName(Signin, "Signin");

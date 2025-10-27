import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../AdminLayout/Layout";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";

import Preloader from "../../Preloader";
import api from "../../api";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import withComponentName from "../../withComponentName";

// Import the new CSS file
import "./AdminLogin.css";

const AdminLogin = () => {
  const toast = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [require, setRequire] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialSigInInfo = {
    email: "",
    password: "",
    role: "",
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
      if (toast.current) {
        toast.current.show({
          severity: "success",
          summary: "Login Successful",
          detail: "You have been logged in successfully",
          life: 3000,
        });
      }
      setTimeout(() => {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
      }, 2000);
      // navigate('/admin-dashboard');
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
    if (!signInInfo.email || !signInInfo.password || !signInInfo.role) {
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
    setRequire(false);
  };

  return (
    <>
      <Toast ref={toast} />
      
      <div className="simple-admin-login">
        <div className="simple-login-container">
          <div className="simple-login-card">
            {/* Header */}
            <div className="simple-login-header">
              <img
                src="assets/images/logo.png"
                className="simple-login-logo"
                alt="Platinum Holiday Service"
              />
              <h1 className="simple-login-title">Admin Portal</h1>
              <p className="simple-login-subtitle">Sign in to continue</p>
            </div>

            {/* Form */}
            <form className="simple-login-form" onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="simple-form-field">
                <label className="simple-field-label">Access Level</label>
                <div className="simple-role-tabs">
                  <button
                    type="button"
                    className={`simple-role-tab ${signInInfo.role === "Admin" ? "active" : ""}`}
                    onClick={() => setSignInInfo({ ...signInInfo, role: "Admin" })}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className={`simple-role-tab ${signInInfo.role === "Moderator" ? "active" : ""}`}
                    onClick={() => setSignInInfo({ ...signInInfo, role: "Moderator" })}
                  >
                    Moderator
                  </button>
                </div>
                {require && !signInInfo.role && (
                  <span className="simple-error">Please select access level</span>
                )}
              </div>

              {/* Email */}
              <div className="simple-form-field">
                <label className="simple-field-label form-required">Email</label>
                <InputText
                  className={`simple-input ${require && !signInInfo.email ? 'error' : ''}`}
                  name="email"
                  value={signInInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
                {require && !signInInfo.email && (
                  <span className="simple-error">Email is required</span>
                )}
                {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInInfo.email) && signInInfo.email && (
                  <span className="simple-error">Please enter a valid email</span>
                )}
              </div>

              {/* Password */}
              <div className="simple-form-field">
                <label className="simple-field-label form-required">Password</label>
                {/* <div className="simple-password-wrapper"> */}
                  <Password
                    className={`simple-password ${require && !signInInfo.password ? 'error' : ''}`}
                    name="password"
                    value={signInInfo.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    feedback={false}
                    toggleMask
                    inputClassName={`simple-password-input ${require && !signInInfo.password ? 'error' : ''}`}
                  />
                {/* </div> */}
                {require && !signInInfo.password && (
                  <span className="simple-error">Password is required</span>
                )}
              </div>

              {/* Remember Me */}
              <div className="simple-form-field">
                <div className="simple-checkbox-wrapper">
                  <Checkbox
                    inputId="rememberMe"
                    onChange={(e) => setChecked(e.checked)}
                    checked={checked}
                  />
                  <label htmlFor="rememberMe" className="simple-checkbox-label">
                    Remember Me
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                label={loading ? "Signing in..." : "Sign In"}
                className="simple-submit-btn"
                loading={loading}
                disabled={loading}
              />
            </form>

            {/* Footer */}
            {/* <div className="simple-login-footer">
              <p>Need help? Contact IT support</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default withComponentName(AdminLogin, "AdminLogin");

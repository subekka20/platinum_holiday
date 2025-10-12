import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../AdminLayout/Layout";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
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

      <div className="login_bg">
        <div className="col-sm-8 col-md-88 mx-auto">
          <article
            className="custom-card"
            data-aos="fade-up"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1016%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='%23DDF4E7'%3e%3c/rect%3e%3cpath d='M0%2c816.835C152.696%2c810.118%2c204.143%2c599.733%2c326.936%2c508.722C437.943%2c426.446%2c624.575%2c437.134%2c681.912%2c311.419C739.252%2c185.696%2c640.831%2c45.43%2c598.181%2c-86.005C562.551%2c-195.807%2c511.378%2c-293.045%2c453.378%2c-392.854C381.503%2c-516.54%2c347.906%2c-682.012%2c217.57%2c-740.975C86.394%2c-800.318%2c-65.002%2c-732.344%2c-202.471%2c-689.553C-337.978%2c-647.373%2c-477.888%2c-601.874%2c-571.628%2c-495.318C-665.689%2c-388.396%2c-698.5%2c-244.299%2c-718.239%2c-103.267C-737.919%2c37.343%2c-755.977%2c189.896%2c-684.72%2c312.701C-615.221%2c432.475%2c-457.471%2c456.218%2c-345.958%2c538.321C-224.276%2c627.911%2c-150.96%2c823.475%2c0%2c816.835' fill='%2367C090'%3e%3c/path%3e%3cpath d='M1920 1948.745C2082.81 1977.812 2251.237 1900.358 2382.858 1800.22 2509.386 1703.957 2572.996 1552.868 2633.553 1405.869 2692.103 1263.742 2737.769 1117.279 2727.376 963.917 2716.437 802.49 2663.077 648.552 2573.12 514.068 2474.504 366.64 2356.746 220.942 2189.982 160.527 2019.131 98.632 1828.235 123.102 1656.302 181.926 1489.03 239.155 1313.713 328.392 1235.672 487.026 1160.746 639.327 1285.43 817.284 1261.093 985.263 1236.714 1153.535 1027.106 1300.876 1095.188 1456.679 1162.92 1611.682 1407.153 1565.297 1552.422 1651.962 1690.457 1734.311 1761.769 1920.496 1920 1948.745' fill='%2326667F'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1016'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="custom-card-logo-area">
              <img
                src="assets/images/logo.png"
                className="custom-card-logo"
                alt="Platinum Holiday Service"
              />
            </div>
            <h3 className="custom-card-tile" style={{ textAlign:"center", color:"#124170"}}>Admin Login</h3>
            <h6 className="custom-card-sub-tile" style={{ textAlign:"center", color:"#124170"}}>
              Welcome Back! Please enter your credentials to access the admin
              dashboard
            </h6>
            <form
              action=""
              className="custom-card-form"
              onSubmit={handleSubmit}
            >
              <div className="custom-form-group contains-float-input">
                <div
                  className="custom-role-group"
                  style={{ textAlign: "center", marginBottom: "20px" }}
                >
                  <label
                    className="custom-role-label"
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      lineHeight: "1.5",
                      color: "#333",
                    }}
                  >
                    Role
                  </label>
                  <div
                    className="custom-role-options"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "20px",
                    }}
                  >
                    <div
                      className="custom-role-option"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <RadioButton
                        inputId="roleAdmin"
                        name="role"
                        value="Admin"
                        onChange={handleInputChange}
                        checked={signInInfo.role === "Admin"}
                      />
                      <label
                        htmlFor="roleAdmin"
                        className="custom-role-label"
                        style={{
                          fontSize: "14px",
                          fontWeight: "normal",
                          lineHeight: "1.5",
                          color: "#333",
                        }}
                      >
                        Admin
                      </label>
                    </div>
                    <div
                      className="custom-role-option"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <RadioButton
                        inputId="roleModerator"
                        name="role"
                        value="Moderator"
                        onChange={handleInputChange}
                        checked={signInInfo.role === "Moderator"}
                      />
                      <label
                        htmlFor="roleModerator"
                        className="custom-role-label"
                        style={{
                          fontSize: "14px",
                          fontWeight: "normal",
                          lineHeight: "1.5",
                          color: "#333",
                        }}
                      >
                        Moderator
                      </label>
                    </div>
                    {/* <div 
                                            className="custom-role-option" 
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <RadioButton 
                                                inputId="roleUser" 
                                                name="role" 
                                                value="Admin-User"
                                                onChange={handleInputChange} 
                                                checked={signInInfo.role === 'Admin-User'} 
                                            />
                                            <label htmlFor="roleUser" className="custom-role-label"
                                            style={{
                                                fontSize: '14px',  
                                                fontWeight: 'normal', 
                                                lineHeight: '1.5',   
                                                color: '#333',       
                                            }}>User</label>
                                        </div> */}
                  </div>
                  {require && !signInInfo.role && (
                    <small className="text-danger form-error-msg">
                      Please select a role
                    </small>
                  )}
                </div>
              </div>

              <div className="custom-form-group contains-float-input">
                <FloatLabel>
                  <InputText
                    id="email"
                    keyfilter="email"
                    className="custom-form-input"
                    name="email"
                    value={signInInfo.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="email" className="custom-float-label">
                    Email
                  </label>
                </FloatLabel>
                {require && !signInInfo.email && (
                  <small className="text-danger form-error-msg">
                    This field is required
                  </small>
                )}
                <small className="text-danger form-error-msg">
                  {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInInfo.email) &&
                  signInInfo.email
                    ? "Enter valid email"
                    : ""}
                </small>
              </div>

              <div className="custom-form-group contains-float-input">
                <FloatLabel>
                  <Password
                    className="custom-form-input"
                    name="password"
                    value={signInInfo.password}
                    onChange={handleInputChange}
                    feedback={false}
                    toggleMask
                  />
                  <label htmlFor="username" className="custom-float-label">
                    Password
                  </label>
                </FloatLabel>
                {require && !signInInfo.password && (
                  <small className="text-danger form-error-msg">
                    This field is required
                  </small>
                )}
              </div>

              <div className="custom-form-group contains-float-input">
                <div className="custom-check-group">
                  <div className="custom-check-area">
                    <Checkbox
                      inputId="rememberMe"
                      onChange={(e) => setChecked(e.checked)}
                      checked={checked}
                    ></Checkbox>
                    <label htmlFor="rememberMe" className="custom-check-label">
                      Remember me
                    </label>
                  </div>
                </div>
              </div>

              <div className="custom-form-group contains-float-input mb-0">
                <Button
                  label="LOGIN"
                  className="w-100 submit-button justify-content-center"
                  loading={loading}
                />
              </div>
            </form>
          </article>
        </div>
      </div>
    </>
  );
};

export default withComponentName(AdminLogin, "AdminLogin");

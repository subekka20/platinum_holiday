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
import Preloader from "../../Preloader";

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
      <Preloader />
      <Header />

      <Toast ref={toast} />

      {/* Sign in Section Start */}
      <section className="section-padding overflow-hidden auth-section">
        <div className="container-md">
          <div className="row">
            <div className="col-12 mb-4 mb-lg-5">
              <h3
                className="section-heading text-center mx-auto text-white"
                data-aos="zoom-out"
              >
                Sign In
              </h3>
              <div className="mt-5 mb-2 mb-sm-4">
                <p
                  className="section-paragraph text-center mb-0"
                  data-aos="fade"
                >
                  Welcome Back to Platinum Holiday Service Sign in to access
                  your bookings and manage your parking reservations with ease.
                  Our secure platform ensures a smooth, hassle-free experience
                  every time. Need help? Our support team is always here for
                  you. Thank you for choosing Platinum Holiday Service — your
                  journey starts here.
                </p>
              </div>
            </div>

            {/* <div className="col-12 col-xl-6 col-lg-6 my-auto">
              <div
                className="section-main-image-area mb-5 mb-sm-5 mb-lg-0"
                data-aos="fade-up"
              >
                <img
                  src="/assets/images/account/signin-illustration.svg"
                  alt="Sign in"
                  className="section-main-image animate-image"
                />
              </div>
            </div> */}
            <div className="col-12 col-xl-9 col-lg-9 col-sm-10 col-md-10 mx-auto">
              <article className="custom-card auth-card" data-aos="fade-up">
                <div className="custom-card-logo-area">
                  <img
                    src="assets/images/logo.png"
                    className="custom-card-logo"
                    alt="Platinum Holiday Service"
                  />
                </div>
                <h3
                  className="custom-card-tile"
                  style={{ textAlign: "center" , color: "#FFF"}}
                >
                  Welcome to <span>Platinum Holiday Service</span>
                </h3>
                <form
                  action=""
                  className="custom-card-form"
                  onSubmit={handleSubmit}
                >
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
                        <label
                          htmlFor="rememberMe"
                          className="custom-check-label"
                          style={{ color: "#FFF" }}
                        >
                          Remember me
                        </label>
                      </div>

                      <a
                        href="/forgot-password"
                        style={{
                          color: "#ff0000ff",
                          fontSize: "15px",
                          textDecoration: "none",
                          fontWeight: 500,
                          transition: "ease 0.5s",
                          border: "none",
                          outline: "none",
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div className="custom-form-group contains-float-input">
                    <Button
                      label="SIGN IN"
                      className="w-100 submit-button justify-content-center auth-btn"
                      loading={loading}
                    />
                  </div>

                  <div className="custom-form-link-area text-center" >
                    <p>
                      Don't have an account?{" "}
                      <a href="/sign-up" className="custom-form-link" style={{ color: "#FFF" }}>
                        <b>Sign up</b>
                      </a>
                    </p>
                  </div>
                </form>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default withComponentName(Signin, "Signin");

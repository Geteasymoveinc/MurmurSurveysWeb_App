import React from "react";

//reactstrap
import { Alert, Modal } from "reactstrap";

// Redux
import { connect } from "react-redux";

import { FirebaseAuth } from "../../../helpers/firebaseAuth/firebaseAuth";

// action
import { addUser } from "../../../store/actions";

//router
import { withRouter, Link } from "react-router-dom";

//import assets

import Google from "../../../assets/css/common/icons/google.svg";
import Logo from "../../../assets/css/common/icons/logo.svg";
import Car from "../../../assets/css/common/icons/car.png";
import SMS from "../../../assets/css/common/icons/sms.svg";
import Lock from "../../../assets/css/common/icons/lock.svg";
import Eye from "../../../assets/css/common/icons/icon.svg";
import EyeSlash from "../../../assets/css/common/icons/eye-slash.svg";
import Copyright from "../../../assets/css/common/icons/copyright.svg";
import Phone from "../../../assets/css/Authentication/Register/mobile.svg";
import Company from "../../../assets/css/Authentication/Register/bank.svg";
import User from "../../../assets/css/Authentication/Register/user.svg";

//import classes
import classes from "../../../assets/css/Authentication/Register/Signup.module.css";
import { google_signup } from "../../../store/helpers/actions";

import Slider from "../slider";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phone_number: "",
      fullName: "",
      company: "",
      text: false,
      error: [],
      modalStatus: true,
    };

    // handleValidSubmit
    this.toggleEye = this.toggleEye.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();
    let error = [];
    for (let state in this.state) {
      if (this.state[state].length === 0 && state !== "error") {
        error.push(state);
      } else if (
        state === "phone_number" &&
        !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
          this.state[state]
        )
      ) {
        error.push(state);
      } else if (
        state === "password" &&
        !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          this.state[state]
        )
      ) {
        error.push(state);
      }
    }
    if (!error.length) {
      this.props.addUser(
        {
          email: this.state.email,
          password: this.state.password,
          fullName: this.state.fullName,
          company: this.state.company,
          phone_number: this.state.phone_number,
        },
        this.props.history
      );
    } else {
      this.setState({ ...this.state, error: error });
    }
  }

  handleInputChange(event) {
    const name = event.target.name;

    this.setState({ ...this.state, [name]: event.target.value });
    if (
      this.state.error.includes(name) &&
      name !== "email" &&
      name !== "password" &&
      name !== "phone_number" &&
      event.target.value.length > 0
    ) {
      const error = this.state.error.filter((el) => el !== name);
      this.setState({
        ...this.state,
        [name]: event.target.value,
        error: error,
      });
    } else if (
      this.state.error.includes(name) &&
      name === "phone_number" &&
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
        event.target.value
      )
    ) {
      const error = this.state.error.filter((el) => el !== name);
      this.setState({
        ...this.state,
        [name]: event.target.value,
        error: error,
      });
    } else if (
      this.state.error.includes(name) &&
      name === "email" &&
      /@/i.test(event.target.value)
    ) {
      const error = this.state.error.filter((el) => el !== name);
      this.setState({
        ...this.state,
        [name]: event.target.value,
        error: error,
      });
    } else if (
      this.state.error.includes(name) &&
      name === "password" &&
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        event.target.value
      )
    ) {
      const error = this.state.error.filter((el) => el !== name);
      this.setState({
        ...this.state,
        [name]: event.target.value,
        error: error,
      });
    }
  }

  toggleEye() {
    this.setState({ ...this.state, text: !this.state.text });
  }
  componentDidMount() {
    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }
  componentDidUpdate(previousProps, previousState) {
    if (previousProps.googleSignupAction !== this.props.googleSignupAction) {
      this.setState({
        ...this.state,
        email: this.props.email,
        fullName: this.props.fullName,
        modalStatus: this.props.signupModalStatus,
      });
    }
  }
  render() {
    console.log(this.state.error.includes("fullName"));
    return (
      <React.Fragment>
        {/* <Modal isOpen={this.props.signupModalStatus}>
          <div className={classes.signup_section}>
            <h1 className={classes.signup_h1}>Is this information correct?</h1>
            <form onSubmit={this.handleSignupModal}>
              <div className={classes.signup_form}>
                <div className={`${classes.signup_relative} ${classes.mb_24}`}>
                  <input
                    type="text"
                    className={classes.signup_form_item}
                    name="fullName"
                    id="fullname"
                    placeholder="Full Name"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                  />
                  <img
                    src={User}
                    alt="user-form icon"
                    className={classes.signup_email_icon}
                  />
                </div>
                <div className={`${classes.signup_relative} ${classes.mb_24}`}>
                  <input
                    type="email"
                    className={classes.signup_form_item}
                    name="email"
                    id="login-email"
                    placeholder="Enter your E-mail"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <img
                    src={SMS}
                    alt="email icon"
                    className={classes.signup_email_icon}
                  />
                </div>
                <button type="submit" className={classes.signup_form_btn}>
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </Modal> */}
        <div className={classes.login_register}>
          <div className={classes.log_reg_left}>
            <img src={Car} alt="" className={classes.log_reg_img} />
            <div className={classes.login_layer}>
              <img src={Logo} alt="" className={classes.white_logo} />
              {/*} <div className={classes.log_reg_slider}>
                <div className={classes.left_slide_item}>
                  <h4 className={classes.slide_h4}>
                    Grow Business By Getting In Front of Your Ideal Customers
                  </h4>
                  <div className={classes.slide_txt}>
                    Explore audience on streets via real-time street-level data
                    and connect with them via smart digital car-top billboards,
                    engage with viewers in real-time, collect data in exchange
                    of rewards and discounts and retarget them via retargeting
                    online Ads dynamically.
                  </div>
                </div>
                  </div>*/} 
              <Slider />
              <p
                className={`${classes.footer_copyright} ${classes.mur_flex} ${classes.log_reg_footer}`}
              >
                <img src={Copyright} alt="" />
                <span>{new Date().getFullYear()}, MurmurCars</span>
              </p>
            </div>
          </div>
          <div className={classes.log_reg_right}>
            <div className={classes.signup_section}>
              <h1 className={classes.signup_h1}>Signup</h1>
              <form onSubmit={this.handleValidSubmit}>
                <div className={classes.signup_form}>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="text"
                      className={`${classes.signup_form_item} ${
                        this.state.error.includes("fullName") &&
                        classes.signup_form_item_error
                      }`}
                      name="fullName"
                      id="fullname"
                      placeholder="Full Name"
                      value={this.state.fullName}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={User}
                      alt="user-form icon"
                      className={classes.signup_email_icon}
                    />
                    {this.state.error.includes("fullName") && (
                      <span className={classes.pass_error}>
                        Please type your name
                      </span>
                    )}
                  </div>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="text"
                      className={`${classes.signup_form_item} ${
                        this.state.error.includes("company") &&
                        classes.signup_form_item_error
                      }`}
                      name="company"
                      id="company-name"
                      placeholder="Company Name"
                      value={this.state.company}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={Company}
                      alt="bank icon"
                      className={classes.signup_email_icon}
                    />
                    {this.state.error.includes("company") && (
                      <span className={classes.pass_error}>
                        Please type your company name
                      </span>
                    )}
                  </div>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="text"
                      className={`${classes.signup_form_item} ${
                        this.state.error.includes("phone_number") &&
                        classes.signup_form_item_error
                      }`}
                      name="phone_number"
                      id="phone-number"
                      placeholder="Phone number"
                      value={this.state.phone_number}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={Phone}
                      alt="phone icon"
                      className={classes.signup_email_icon}
                    />
                    {this.state.error.includes("phone_number") && (
                      <span className={classes.pass_error}>
                        Please type your current working phone number
                      </span>
                    )}
                  </div>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="text"
                      className={`${classes.signup_form_item} ${
                        this.state.error.includes("email") &&
                        classes.signup_form_item_error
                      }`}
                      name="email"
                      id="login-email"
                      placeholder="Enter your E-mail"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={SMS}
                      alt="email icon"
                      className={classes.signup_email_icon}
                    />
                    {this.state.error.includes("email") && (
                      <span className={classes.pass_error}>
                        Please type a valid email address
                      </span>
                    )}
                  </div>
                  <div className={classes.signup_relative}>
                    <input
                      type={`${this.state.text ? "text" : "password"}`}
                      className={`${classes.signup_form_item} ${
                        this.state.error.includes("password") &&
                        classes.signup_form_item_error
                      }`}
                      name="password"
                      id="login-password"
                      placeholder="Enter your Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={Lock}
                      alt="password icon"
                      className={classes.signup_email_icon}
                    />
                    {this.state.error.includes("password") && (
                      <span className={classes.pass_error}>
                        1 lovercase, uppercase English letter, digit and a
                        special character, at least 8 long
                      </span>
                    )}
                    <button
                      type="button"
                      className={classes.pass_eye}
                      onClick={this.toggleEye}
                    >
                      <img src={`${this.state.text ? EyeSlash : Eye}`} alt="" />
                    </button>
                    {/* <span class="pass-error">Must be at least 8 characters.</span>*/}
                  </div>
                  <button type="submit" className={classes.signup_form_btn}>
                    Continue
                  </button>
                  <div className={classes.or_block}>
                    <span>or</span>
                  </div>
                  <button
                    type="button"
                    className={classes.signup_google}
                    onClick={() =>
                      FirebaseAuth("GoogleLoginRegister", {
                        google: this.props.google_signup,
                        history: this.props.history,
                      })
                    }
                  >
                    <img src={Google} alt="" />
                    <span>Signup with Google</span>
                  </button>
                  <p className={classes.have_account}>
                    Have an account?{" "}
                    <Link className={classes.have_acc_link} to="/login">
                      {" "}
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <ul className={`${classes.footer_links} ${classes.login_footer}`}>
              <li>
                <a href="#" className={classes.footer_link}>
                  All rights reserved
                </a>
              </li>
              <li>
                <a href="#" className={classes.footer_link}>
                  Privacy Policy
                </a>
              </li>
            </ul>

            {/*  <p
                className={`${classes.footer_copyright} ${classes.mur_flex} ${classes.log_reg_footer}`}
              >
                <img src={Vector2} alt="copyright icon" />
                <span>2021, MurmurCars</span>
            </p>*/}
          </div>
        </div>
        {/*  <div className={classes.log_reg_right}>
            <div className={classes.signup_section}>
              {this.state.error.length !== 0 &&
                this.state.error.map((state, i) => (
                  <Alert color="danger" key={i}>
                    {state + " is wrong"}
                  </Alert>
                ))}
              {this.props.error && (
                <Alert color="danger">{this.props.error}</Alert>
              )}
              <h1 className={classes.signup_h1}>Signup</h1>
              <form onSubmit={this.handleValidSubmit}>
                <div className={classes.signup_form}>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="text"
                      className={classes.signup_form_item}
                      name="fullName"
                      id="fullname"
                      placeholder="Full Name"
                      value={this.state.fullName}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={User}
                      alt="user-form icon"
                      className={classes.signup_email_icon}
                    />
                  </div>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="text"
                      className={classes.signup_form_item}
                      name="company"
                      id="company-name"
                      placeholder="Company Name"
                      value={this.state.company}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={Company}
                      alt="bank icon"
                      className={classes.signup_email_icon}
                    />
                  </div>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="number"
                      className={classes.signup_form_item}
                      name="phone_number"
                      id="phone-number"
                      placeholder="Phone number"
                      value={this.state.phone_number}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={Phone}
                      alt="phone icon"
                      className={classes.signup_email_icon}
                    />
                  </div>
                  <div
                    className={`${classes.signup_relative} ${classes.mb_24}`}
                  >
                    <input
                      type="email"
                      className={classes.signup_form_item}
                      name="email"
                      id="login-email"
                      placeholder="Enter your E-mail"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={SMS}
                      alt="email icon"
                      className={classes.signup_email_icon}
                    />
                  </div>
                  <div className={classes.signup_relative}>
                    <input
                      type={`${this.state.text ? "text" : "password"}`}
                      className={classes.signup_form_item}
                      name="password"
                      id="login-password"
                      placeholder="Enter your Password"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                    <img
                      src={Lock}
                      alt="password icon"
                      className={classes.signup_email_icon}
                    />
                    <button
                      type="button"
                      className={classes.pass_eye}
                      onClick={this.toggleEye}
                    >
                      <img src={Password} alt="password eye icon" />
                    </button>
                     <span class="pass-error">Must be at least 8 characters.</span>
                  </div>
                  <button type="submit" className={classes.signup_form_btn}>
                    Continue
                  </button>

                  {this.props.googleSignupAction ? null : (
                    <React.Fragment>
                      <div className={classes.or_block}>
                        <span>or</span>
                      </div>
                      <button
                        type="submit"
                        name="GoogleLoginRegister"
                        id="GoogleLoginRegister"
                        className={classes.signup_google}
                        onClick={(e) => FirebaseAuth(e.target.id, this.props)}
                      >
                        <img src={Google} alt="" />
                        <span name="GoogleLogin" id="GoogleLoginRegister">
                          Signup with Google
                        </span>
                      </button>
                    </React.Fragment>
                  )}
                  <p className={classes.have_account}>
                    Have an account?{" "}
                    <Link className={classes.have_acc_link} to="/login">
                      {" "}
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <ul className={`${classes.footer_links} ${classes.login_footer}`}>
              <li>
                <a href="#" className={classes.footer_link}>
                  All rights reserved
                </a>
              </li>
              <li>
                <a href="#" className={classes.footer_link}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
                  </div>*/}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user, loading, error } = state.Account;
  const { email, fullName, googleSignupAction, signupModalStatus } =
    state.GoogleAuth;
  return {
    user,
    loading,
    error,
    email,
    fullName,
    googleSignupAction,
    signupModalStatus,
  };
};

export default connect(mapStatetoProps, {
  addUser,
  google_signup,
})(withRouter(Register));

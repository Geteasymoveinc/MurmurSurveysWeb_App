import React from "react";

import { Alert, Button } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//import axios from "axios";

import { FirebaseAuth } from "../../../helpers/firebaseAuth/firebaseAuth";

// actions
import { loginUser, google_login } from "../../../store/actions";

// availity-reactstrap-validation
//import { AvForm, AvField } from "availity-reactstrap-validation";

//import assets
import Google from "../../../assets/css/common/icons/google.svg";
import Logo from "../../../assets/images/LogoWhiteTheme.png";
import Survey from "../../../assets/css/common/icons/Survey.png";
import Eye from "../../../assets/css/common/icons/icon.svg";
import EyeSlash from "../../../assets/css/common/icons/eye-slash.svg";
import Vector2 from "../../../assets/css/common/icons/vector2.svg";
import SMS from "../../../assets/css/common/icons/sms.svg";
import Lock from "../../../assets/css/common/icons/lock.svg";

//import classes
import classes from "../../../assets/css/Authentication/Login/Login.module.css";

import Slider from "../slider";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      text: false,
      errorEmail: false,
      errorPassword: false,
      error: false,
      rememberMe: true,
    };

    // handleValidSubmit
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.toggleEye = this.toggleEye.bind(this);
    this.googleAuth = this.googleAuth.bind(this);
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ ...this.state, [name]: event.target.value.trim() });
    if (
      name === "email" &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(event.target.value)
    ) {
      this.setState({
        ...this.state,
        [name]: event.target.value.trim(),
        errorEmail: false,
      });
    } else if (
      name === "password" &&
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        event.target.value.trim()
      )
    ) {
      this.setState({
        ...this.state,
        [name]: event.target.value.trim(),
        errorPassword: false,
      });
    }
  };

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();

    if (
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.state.email) &&
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        this.state.password
      )
    ) {
      this.props.loginUser(
        { email: this.state.email, password: this.state.password },
        this.props.history
      );
    } else {
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.state.email) &&
        !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          this.state.password
        )
      ) {
        this.setState({ ...this.state, errorEmail: true, errorPassword: true });
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.state.email)) {
        this.setState({ ...this.state, errorEmail: true });
      } else if (
        !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
          this.state.password
        )
      ) {
        this.setState({ ...this.state, errorPassword: true });
      }
    }
  }

  toggleEye() {
    this.setState({ ...this.state, text: !this.state.text });
  }

  googleAuth() {
    FirebaseAuth("GoogleLogin", {
      history: this.props.history,
      login: this.props.google_login,
    });
  }
  changeRememberMeState = () => {
    this.setState({
      ...this.state,
     rememberMe: !this.state.rememberMe
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.error !== prevProps.error) {
      this.setState({ ...this.state, error: true });
    }
  }
  componentDidMount() {
    //this.props.apiError("");

    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        {(this.props.loading || this.props.loading2) && (
          <div id="preloader">
            <div id="status">
              <div className="spinner-chase">
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
              </div>
            </div>
          </div>
        )}
        {(!this.props.loading || !this.props.loading2) && (
          <div className={classes.login_register}>
            <div className={classes.log_reg_left}>
              <img src={Survey} alt="" className={classes.log_reg_img} />
              <div className={classes.login_layer}>
                <img src={Logo} alt="" className={classes.white_logo} />

                <Slider />
                <p
                  className={`${classes.footer_copyright} ${classes.mur_flex} ${classes.log_reg_footer}`}
                >
                  <img src={Vector2} alt="" />
                  <span>{new Date().getFullYear()},  InsightsIQ</span>
                </p>
              </div>
            </div>

            <div className={classes.log_reg_right}>
              <div className={classes.login_section}>
                {this.state.error ? (
                  <Alert
                    color="danger"
                    className="d-flex justify-content-between align-items-center"
                    style={{ padding: "0 1rem" }}
                  >
                    <span style={{ fontFamily: "Montserrat" }}>
                      {this.props.error}
                    </span>
                    <Button
                      color="link"
                      onClick={() =>
                        this.setState({ ...this.state, error: false })
                      }
                    >
                      Close
                    </Button>
                  </Alert>
                ) : null}
                <h1 className={classes.login_h1}>Welcome</h1>

                <form onSubmit={this.handleValidSubmit}>
                  <div className={classes.login_form}>
                    <div
                      className={`${classes.login_relative} ${classes.mb_24}`}
                    >
                      <input
                        type="email"
                        className={`${classes.login_form_item} ${
                          this.state.errorEmail && classes.login_form_item_error
                        }`}
                        name="email"
                        id="login-email"
                        value={this.state.email}
                        placeholder="Enter your E-mail"
                        onChange={this.handleInputChange}
                      />
                      <img
                        src={SMS}
                        alt=""
                        className={classes.login_email_icon}
                      />
                      {this.state.errorEmail && (
                        <span className={classes.pass_error}>
                          Please type a valid email address
                        </span>
                      )}
                    </div>
                    <div className={classes.login_relative}>
                      <input
                        type={`${this.state.text ? "text" : "password"}`}
                        className={`${classes.login_form_item} ${
                          this.state.errorPassword &&
                          classes.login_form_item_error
                        }`}
                        name="password"
                        id="login-password"
                        value={this.state.password}
                        placeholder="Enter your Password"
                        onChange={this.handleInputChange}
                      />
                      <img
                        src={Lock}
                        alt=""
                        className={classes.login_email_icon}
                      />
                      {this.state.errorPassword && (
                        <span className={classes.pass_error}>
                          lowercase, upercase, special character and at least 8
                          long
                        </span>
                      )}
                      <button
                        onClick={this.toggleEye}
                        type="button"
                        className={classes.pass_eye}
                      >
                        <img
                          src={`${this.state.text ? EyeSlash : Eye}`}
                          alt=""
                        />
                      </button>
                    </div>
                    <div className={classes.remember_forgot}>
                      <div className={classes.form_group_log}>
                        <input
                          type="checkbox"
                          id="remember-me"
                          checked={this.state.rememberMe}
                          onChange={this.changeRememberMeState}
                        />
                        <label htmlFor="remember-me">
                          <span>Remember me</span>
                        </label>
                      </div>
                      <Link
                        to="/forgot-password"
                        className={classes.forgot_pass}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <button type="submit" className={classes.login_form_btn}>
                      Log in
                    </button>
                    <div className={classes.or_block}>
                      <span>or</span>
                    </div>
                    <button
                      name="GoogleLogin"
                      type="button"
                      className={classes.login_google}
                      onClick={this.googleAuth}
                    >
                      <img src={Google} alt="" />
                      <span>Log In with Google</span>
                    </button>
                    <p className={classes.have_account}>
                      {" "}
                      Don’t have an account?{" "}
                      <Link to="/register" className={classes.have_acc_link}>
                        {" "}
                        Signup here{" "}
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
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { error, loading } = state.Login;
  const { loading: loading2 } = state.GoogleAuth;

  return { error, loading, loading2 };
};

export default withRouter(
  connect(mapStatetoProps, { loginUser, google_login })(Login)
);

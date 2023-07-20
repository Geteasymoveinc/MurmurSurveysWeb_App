import React, { Component } from "react";

// Redux
import { connect } from "react-redux";

//router
import { withRouter, Link } from "react-router-dom";

// action
import { resetPwd } from "../../../store/actions";

//styles and icons
import classes from "../../../assets/css/Authentication/resetPassword/index.module.css";

import Logo from "../../../assets/images/LogoWhiteThemeQuestions.png";
import Eye from "../../../assets/css/common/icons/icon.svg";
import EyeSlash from "../../../assets/css/common/icons/eye-slash.svg";
import Resetkey from "../../../assets/css/Authentication/ForgotPassword/icons/resetkey.svg";
import Slash from "../../../assets/css/common/icons/slash.svg";
import Copyright from "../../../assets/css/common/icons/copyrightblack.svg";
import Arrowleft from "../../../assets/css/common/icons/arrowleft.svg";
import Lock from "../../../assets/css/common/icons/lock.svg";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirm_password: "",
      errorPassword: false,
      errorConfirm: false,
      text: false,
      textReset: false,
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handlePasswordChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
    if (
      name === "password" &&
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        value
      )
    ) {
      this.setState({
        ...this.state,
        [name]: value,
        errorPassword: false,
      });
    } else if (name === "confirm_password" && value === this.state.password) {
      this.setState({
        ...this.state,
        [name]: value,
        errorConfirm: false,
      });
    }
  }

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();

    if (
      !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/.test(
        this.state.password
      )
    ) {
      this.setState({ ...this.state, errorPassword: true });
    } else if (this.state.password !== this.state.confirm_password) {
      this.setState({ ...this.state, errorConfirm: true });
    } else {
      this.props.resetPwd({
        token: this.state.token,
        password: this.state.password,
        history: this.props.history,
      });
    }
  }

  toggleEye = () => {
    this.setState({ ...this.state, text: !this.state.text });
  };

  toggleEyeSecond = () => {
    this.setState({ ...this.state, textReset: !this.state.textReset });
  };

  componentDidMount() {
    document.body.classList.add("bg-transparent");
    let token = ''
    if(this.props.location.search){
     const pattern = /token=/
     if(!pattern.test(this.props.location.search)) return
     const splited = this.props.location.search.split("?token=")
     token = splited[1].split("&")[0];
     
    }
    this.setState({ ...this.state, token });
    
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }

  render() {

    return (
      <React.Fragment>
        {this.props.loading && (
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
        )}
        {!this.props.loading && (
          <React.Fragment>
            {" "}
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={Logo} alt="logo" />
                </a>
              </div>
            </header>
            <div className={classes.new_password}>
              <div className={classes.newpass_contain}>
                <div className={classes.newpass_top}>
                  <div className={classes.newpass_top_icon}>
                    <img src={Resetkey} alt="" />
                  </div>
                </div>
                <h1 className={classes.newpass_h1}>Set new password</h1>
                <h4 className={classes.newpass_h2}>
                  Your new password must be different to previously used
                  passwords.
                </h4>
                <form onSubmit={this.handleValidSubmit}>
                  <div className={classes.newpass_form}>
                    <div
                      className={`${classes.newpass_relative}  ${classes.mb_24}`}
                    >
                      <input
                        type={`${this.state.text ? "text" : "password"}`}
                        className={`${classes.newpass_form_item} ${
                          this.state.errorPassword &&
                          classes.newpass_form_item_error
                        }`}
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={this.handlePasswordChange}
                        value={this.state.password}
                      />
                      <img
                        src={Lock}
                        alt=""
                        className={classes.newpass_email_icon}
                      />
                      {this.state.errorPassword && (
                        <span className={classes.pass_error}>
                          at least 1 upercase, special character and 8 long
                        </span>
                      )}
                      <button
                        type="button"
                        className={classes.pass_eye}
                        onClick={this.toggleEye}
                      >
                        <img
                          src={`${this.state.text ? EyeSlash : Eye}`}
                          alt=""
                        />
                      </button>
                    </div>
                    <div className={classes.newpass_relative}>
                      <input
                        type={`${this.state.textReset ? "text" : "password"}`}
                        className={`${classes.newpass_form_item} ${
                          this.state.errorConfirm &&
                          classes.newpass_form_item_error
                        }`}
                        name="confirm_password"
                        id="confirm-password"
                        placeholder="Confirm password"
                        value={this.state.confirm_password}
                        onChange={this.handlePasswordChange}
                      />
                      {this.state.errorConfirm && (
                        <span className={classes.pass_error}>
                          Passwords do not match.
                        </span>
                      )}
                      <img
                        src={Lock}
                        alt=""
                        className={classes.newpass_email_icon}
                      />
                      <button
                        type="button"
                        className={classes.pass_eye}
                        onClick={this.toggleEyeSecond}
                      >
                        <img
                          src={`${this.state.textReset ? EyeSlash : Eye}`}
                          alt=""
                        />
                      </button>
                    </div>
                    <button type="submit" className={classes.newpass_form_btn}>
                      Reset password
                    </button>
                    <div className={classes.newpass_center}>
                      <Link to="/login" className={classes.newpass_back_lgn}>
                        <img src={Arrowleft} alt="" />
                        <span>Back to login</span>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <img src={Slash} alt="" className={classes.slash_detail1} />
              <img src={Slash} alt="" className={classes.slash_detail2} />
            </div>
            <footer className={classes.footer}>
              <div className={`${classes.mur_contain} ${classes.mur_flex}`}>
                <p
                  className={`${classes.footer_copyright} ${classes.mur_flex}`}
                >
                  <img src={Copyright} alt="copyright icon" />
                  <span>{new Date().getFullYear()},  InsightsIQ</span>
                </p>
                <ul className={classes.footer_links}>
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
            </footer>{" "}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { error, loading } = state.ResetPassword;
  return { error, loading };
};

export default withRouter(
  connect(mapStatetoProps, { resetPwd })(ResetPassword)
);

import React, { Component } from "react";

// Redux
import { connect } from "react-redux";

//router
import { withRouter, Link } from "react-router-dom";

import { Alert, Button } from "reactstrap";

// action
import { userForgetPassword } from "../../../store/actions";

//styles and icons
import classes from "../../../assets/css/Authentication/ForgotPassword/index.module.css";

import Logo from "../../../assets/css/common/icons/logoBlue.svg";
import Resetkey from "../../../assets/css/Authentication/ForgotPassword/icons/resetkey.svg";
import Slash from "../../../assets/css/common/icons/slash.svg";
import SMS from "../../../assets/css/common/icons/sms.svg";
import Copyright from "../../../assets/css/common/icons/copyrightblack.svg";
import Arrowleft from "../../../assets/css/common/icons/arrowleft.svg";

class ForgetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleEmailChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value.trim() });
  }

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();

    console.log(this.state.email);
    this.props.userForgetPassword({
      email: this.state.email,
      history: this.props.history,
    });
  }

  componentDidMount() {
    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }

  componentDidUpdate(prevProps) {
    if (this.props.forgetError !== prevProps.forgetError) {
      this.setState({ ...this.state, error: true });
    }
  }
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.loading && (
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
            <div className={classes.reset_password}>
              <div className={classes.reset_contain}>
                <div className={classes.reset_top}>
                  <div className={classes.reset_top_icon}>
                    <img src={Resetkey} alt="reset icon" />
                  </div>
                </div>
                <h1 className={classes.reset_h1}>Forgot your Password?</h1>
                <h4 className={classes.reset_h2}>
                  No worries, we’ll send you reset Instructions
                </h4>
                {this.state.error ? (
                  <Alert
                    color="danger"
                    className="d-flex justify-content-between align-items-center"
                    style={{ padding: "0 1rem" }}
                  >
                    <span style={{ fontFamily: "Montserrat" }}>
                      {this.props.forgetError}
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
                <form onSubmit={this.handleValidSubmit}>
                  <div className={classes.reset_form}>
                    <div className={classes.rst_email}>
                      <input
                        type="email"
                        className={classes.rst_form_item}
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        name="email"
                        id="email"
                        placeholder="E-mail"
                      />
                      <img
                        src={SMS}
                        alt="email icon"
                        className={classes.rst_email_icon}
                      />
                    </div>
                    <button type="submit" className={classes.rst_form_btn}>
                      Reset password
                    </button>
                    <div className={classes.rst_center}>
                      <Link to="/login" className={classes.rst_back_lgn}>
                        <img src={Arrowleft} alt="reset password icon" />
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
                  <span>{new Date().getFullYear()}, Murmur</span>
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
            </footer>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { forgetError, forgetSuccess, loading } = state.ForgetPassword;
  return { forgetError, forgetSuccess, loading };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
);

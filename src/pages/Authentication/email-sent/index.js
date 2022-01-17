import React, { Component } from "react";

//router
import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";

//styles and icons
import classes from "../../../assets/css/Authentication/email-sent/index.module.css";

import Logo from "../../../assets/css/common/icons/logoBlue.svg";
import Slash from "../../../assets/css/common/icons/slash.svg";
import Vector2 from "../../../assets/css/common/icons/copyrightblack.svg";
import EmailSent from "../../../assets/css/Authentication/email-sent/email-sent.svg";

class EmailWasSent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();

    // axios
    //   .post("http://localhost:4000/api/v1/users/signup", this.state)
    //   .then((res) => console.log({ res }))
    //   .catch((err) => console.log({ err }));
  }

  componentDidMount() {
    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <header className={classes.header}>
          <div className={classes.mur_contain}>
            <a href="#" className={classes.logo}>
              <img src={Logo} alt="logo" />
            </a>
          </div>
        </header>
        <div className={classes.sent_email}>
          <div className={classes.sent_contain}>
            <div className={classes.sent_top}>
              <div className={classes.sent_top_icon}>
                <img src={EmailSent} alt="" />
              </div>
            </div>
            <h1 className={classes.sent_h1}>Check your Email</h1>
            <h4 className={classes.sent_h2}>
              We sent a password resent link to{" "}
              <span>
                {this.props.forgetSuccess && this.props.forgetSuccess.user}
              </span>
            </h4>
            <button
              type="button"
              onClick={() => this.props.history.replace("/login")}
              className={classes.sent_form_btn}
            >
              Back to Login
            </button>
            <div className={classes.sent_center}>
              <span className={classes.receive_email}>
                Didn’t receive the email?
                <Link to="/forgot-password" className={classes.click_resend}>
                  Click to resend
                </Link>
              </span>
            </div>
          </div>
          <img src={Slash} alt="" className={classes.slash_detail1} />
          <img src={Slash} alt="" className={classes.slash_detail2} />
        </div>
        <footer className={classes.footer}>
          <div className={`${classes.mur_contain} ${classes.mur_flex}`}>
            <p className={`${classes.footer_copyright} ${classes.mur_flex}`}>
              <img src={Vector2} alt="copyright icon" />
              <span>{new Date().getFullYear()}, MurmurCars</span>
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
    );
  }
}

const mapStatetoProps = (state) => {
  const { forgetSuccess } = state.ForgetPassword;

  return { forgetSuccess };
};

export default connect(mapStatetoProps, null)(withRouter(EmailWasSent));

import React from "react";

//reactstrap
import { Alert } from "reactstrap";

// Redux
import { connect } from "react-redux";

import { FirebaseAuth } from "../../../helpers/firebaseAuth/firebaseAuth";

// action
import { addUser } from "../../../store/actions";

//router
import { Link } from "react-router-dom";

//import assets

import Google from "../../../assets/css/common/icons/google.svg";
import Logo from "../../../assets/css/common/icons/logo.svg";
import Car from "../../../assets/css/common/icons/car.png";
import Ellipses from "../../../assets/css/common/icons/ellipse.svg";
import Ellipse from "../../../assets/css/common/icons/ellipse2.svg";
import SMS from "../../../assets/css/common/icons/sms.svg";
import Lock from "../../../assets/css/common/icons/lock.svg";
import Password from "../../../assets/css/common/icons/icon.svg";
import Vector2 from "../../../assets/css/common/icons/vector2.svg";
import Phone from "../../../assets/css/Authentication/Register/mobile.svg";
import Company from "../../../assets/css/Authentication/Register/bank.svg";
import Name from "../../../assets/css/Authentication/Register/user.svg";

//import classes
import classes from "../../../assets/css/Authentication/Register/Signup.module.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phone_number: "",
      fullName: "",
      company: "",
      toggle: false,
    };

    // handleValidSubmit
    this.toggle = this.toggle.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();

    this.props.addUser(
      {
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        company: this.state.company,
        phone_number: this.state.phone_number,
        role: "1",
      },
      this.props.history
    );
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  toggle() {
    this.setState({ ...this.state, toggle: !this.state.toggle });
  }

  render() {
    return (
      <div className={classes.main__container}>
        <div
          className={classes.leftSideContainer}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #3F2B89 100%),url(${Car})`,
            opacity: "0.8",
            backgroundPosition: "80% 25%",
          }}
        >
          <header className={classes.logo__header}>
            <div className={classes.logo__container}>
              <img src={Logo} className={classes.logo} />
              <span className={classes.logo__span}>urmur</span>
            </div>
          </header>
          <section className={classes.leftContainer__main}>
            <div>
              <h6 className={classes.main__head}>
                Grow Business By Getting In Front of Your Ideal Customers{" "}
              </h6>
              <p className={classes.main__paragraph}>
                Explore audience on streets via real-time street-level data and
                connect with them via smart digital car-top billboards, engage
                with viewers in real-time, collect data in exchange of rewards
                and discounts and retarget them via retargeting online Ads
                dynamically.
              </p>
            </div>
          </section>
          <section className={classes.ellipses}>
            <img src={Ellipses} className={classes.ellipse1} />
            <img src={Ellipse} className={classes.ellipse2} />
            <img src={Ellipses} className={classes.ellipse3} />
          </section>
          <footer className={classes.footer}>
            <div className={classes.copyright}>
              <span className={classes.footer__copyright__icon}>
                {" "}
                <img className={classes.footer__icon} src={Vector2} />
              </span>

              <div className={classes.footer__copyright}>
                <p>
                  {new Date().getFullYear()}{" "}
                  <span className={classes.companyName}>MurmurCars</span>
                </p>
              </div>
            </div>
            <span className={classes.copyright__right}>
              All rights reserved
            </span>
            <span>Privacy Policy</span>
          </footer>
        </div>

        <div className={classes.formContainer}>
          <div className={classes.form__header}>
            <span className={classes.head}>SIGNUP</span>
          </div>

          <form
            className={classes.form}
            onSubmit={this.handleValidSubmit}
            //onValidSubmit={this.handleLogin}
          >
            {/* {this.props.user && this.props.user ? (
              <Alert color="success">Register User Successfully</Alert>
            ) : null}
            {this.props.registrationError && this.props.registrationError ? (
              <Alert color="danger">{this.props.registrationError}</Alert>
            ) : null}*/}

            <div className="input-group" style={{ marginBottom: "20px" }}>
              <div className="input-group-prepend border border-0">
                <img className="input-group-text border border-0" src={Name} />
              </div>

              <input
                className="form-control bg-light border border-0"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  color: "#8F9BB3",
                }}
                name="fullName"
                //value="admin@themesbrand.com"
                value={this.state.fullName}
                placeholder="Full Name"
                type="text"
                required
                onChange={(event) => this.handleInputChange(event)}
              />
            </div>

            <div className="input-group" style={{ marginBottom: "20px" }}>
              <div className="input-group-prepend border border-0">
                <img
                  className="input-group-text border border-0"
                  src={Company}
                />
              </div>

              <input
                className="form-control bg-light border border-0"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  color: "#8F9BB3",
                }}
                name="company"
                //value="admin@themesbrand.com"
                value={this.state.company}
                placeholder="Company"
                type="text"
                required
                onChange={(event) => this.handleInputChange(event)}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "20px" }}>
              <div className="input-group-prepend border border-0">
                <img className="input-group-text border border-0" src={Phone} />
              </div>

              <input
                className="form-control bg-light border border-0"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  color: "#8F9BB3",
                }}
                name="phone_number"
                value={this.state.phone_number}
                placeholder="Phone number"
                type="phone"
                required
                onChange={(event) => this.handleInputChange(event)}
              />
            </div>
            <div className="input-group" style={{ marginBottom: "20px" }}>
              <div className="input-group-prepend border border-0">
                <img className="input-group-text border border-0" src={SMS} />
              </div>

              <input
                className="form-control bg-light border border-0"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  color: "#8F9BB3",
                }}
                name="email"
                placeholder="E-mail"
                value={this.state.email}
                type="email"
                required
                onChange={(event) => this.handleInputChange(event)}
              />
            </div>
            <div className="input-group  mb-4">
              <div className="input-group-prepend ">
                <img className="input-group-text border border-0" src={Lock} />
              </div>

              <input
                className={`form-control bg-light border border-0 `}
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: "normal",
                  fontSize: "14px",
                  color: "#8F9BB3",
                }}
                value={this.state.password}
                name="password"
                placeholder="Password"
                type={this.state.toggle ? "text" : "password"}
                required
                onChange={(event) => this.handleInputChange(event)}
              />
              <div className="input-group-append ">
                <img
                  className="input-group-text border border-0 "
                  src={Password}
                  onClick={this.toggle}
                />
              </div>
            </div>

            <button className={classes.form__button}>Continue</button>
          </form>

          <fieldset className={classes.fieldset}>
            <div className={classes.legend__container}>
              <legend className={classes.legend} align="center">
                or
              </legend>
            </div>
          </fieldset>
          <button
            id="GoogleLogin"
            className={classes.google__button}
            onClick={(e) => FirebaseAuth(e.target.id, this.props.history)}
          >
            <img src={Google} className={classes.google__logo} />
            <span className={classes.button__text}>Signup with Google</span>
          </button>
          <div className={classes.toLogIn}>
            <p>
              Have an account ? <Link to="/login"> Login here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user } = state.Account;
  return { user };
};

export default connect(mapStatetoProps, {
  addUser,
})(Register);

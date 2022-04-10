import React from "react";

//reactstrap
import { Alert, Button } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

//import axios from "axios";
import axios from "axios";

import { FirebaseAuth } from "../../../helpers/firebaseAuth/firebaseAuth";

// actions
import { loginUser, apiError } from "../../../store/actions";

// availity-reactstrap-validation
//import { AvForm, AvField } from "availity-reactstrap-validation";

//import assets

import Google from "../../../assets/css/common/icons/google.svg";
import Logo from "../../../assets/css/common/icons/logo.svg";
import Car from "../../../assets/css/common/icons/car.png";
import Ellipses from "../../../assets/css/common/icons/ellipse.svg";
import Ellipse from "../../../assets/css/common/icons/ellipse2.svg";
import Password from "../../../assets/css/common/icons/icon.svg";
import Vector2 from "../../../assets/css/common/icons/vector2.svg";
import SMS from "../../../assets/css/common/icons/sms.svg";
import Lock from "../../../assets/css/common/icons/lock.svg";

//import classes
import classes from "../../../assets/css/Authentication/Login/Login.module.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      toggle: false,
    };

    // handleValidSubmit
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ ...this.state, [name]: event.target.value });
  };

  // handleValidSubmit
  handleValidSubmit(event) {
    event.preventDefault();

    this.props.loginUser(
      { email: this.state.email, password: this.state.password },
      this.props.history
    );
  }

  toggle() {
    this.setState({ ...this.state, toggle: !this.state.toggle });
  }

  componentDidMount() {
    this.props.apiError("");

    document.body.classList.add("bg-transparent");
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
            backgroundRepeat: "no-repeat",
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
                connect with them via smart digital screens, engage with viewers
                in real-time, collect data in exchange of rewards and discounts
                and retarget them via retargeting online Ads dynamically.
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
                  <span className={classes.companyName}>Murmur</span>
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
            {" "}
            <span className={classes.head}>Welcome </span>
          </div>

          <form
            className={classes.form}
            onSubmit={this.handleValidSubmit}
            //onValidSubmit={this.handleLogin}
          >
            <div className="input-group" style={{ marginBottom: "38px" }}>
              <div className="input-group-prepend border border-0">
                <img
                  className="input-group-text border border-0 pr-0"
                  src={SMS}
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
                <img
                  className="input-group-text border border-0 pr-0"
                  src={Lock}
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
            <div className={classes.checkbox__container}>
              <div
                className="custom-control custom-checkbox "
                style={{ position: "absolute", left: "9px" }}
              >
                <input
                  type="checkbox"
                  className={`custom-control-input ${classes.checkbox__input}`}
                  id="customControlInline"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customControlInline"
                >
                  Remember me
                </label>
              </div>
              <div className={classes.forgetpassword__container}>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            </div>

            <button className={`${classes.form__button}`}>Log in</button>
          </form>

          <fieldset className={classes.fieldset}>
            <div className={classes.legend__container}>
              <legend className={classes.legend} align="center">
                or
              </legend>
            </div>
          </fieldset>
          <button
            name="GoogleLogin"
            value="GoogleLogin"
            className={classes.google__button}
            onClick={(e) => FirebaseAuth(e.target.name, this.props.history)}
          >
            <img src={Google} className={classes.google__logo} />
            <span className={classes.button__text}>Log in with Google</span>
          </button>
          <div className={classes.signup__container}>
            <p>
              Don't have an account ? <Link to="/register"> Signup here </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  const { error } = state.Login;

  return { error };
};

export default withRouter(
  connect(mapStatetoProps, { loginUser, apiError })(Login)
);

import React, { Component } from "react";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import {
  registerUser,
  apiError,
  registerUserFailed,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/murmuricon.png";
import axios from "axios";

//import { handleInputChange } from "react-select/src/utils";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phoneNumber: "",
      fullName: "",
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    console.log(values);
    this.props.registerUser(values, this.props.history);
    // axios
    //   .post("http://localhost:4000/api/v1/users/signup", this.state)
    //   .then((res) => console.log({ res }))
    //   .catch((err) => console.log({ err }));
  }

  componentDidMount() {
    this.props.apiError("");
    this.props.registerUserFailed("");
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">
                            Murmur is Programmatic Outdoor Advertising
                          </h5>
                          <p>Register now.</p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logoImg}
                              alt=""
                              className="rounded-circle"
                              height="80"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                        //onValidSubmit={this.handleSignup}
                      >
                        {this.props.user && this.props.user ? (
                          <Alert color="success">
                            Register User Successfully
                          </Alert>
                        ) : null}
                        {this.props.registrationError &&
                        this.props.registrationError ? (
                          <Alert color="danger">
                            {this.props.registrationError}
                          </Alert>
                        ) : null}
                        <div className="form-group">
                          <AvField
                            name="fullName"
                            label="Full Name"
                            className="form-control"
                            placeholder="Enter Full Name"
                            type="fullName"
                            value={this.state.fullName}
                            required
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            value={this.state.email}
                            required
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>
                        <div className="form-group">
                          <AvField
                            name="phoneNumber"
                            label="Phone Number"
                            type="number"
                            required
                            placeholder="Enter your phone number"
                            value={this.state.phoneNumber}
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <p className="mb-0">
                            By registering you agree to the Murmur{" "}
                            <Link to="#" className="text-primary">
                              Terms of Use
                            </Link>
                          </p>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} Murmur. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> in Chicago, IL
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register);

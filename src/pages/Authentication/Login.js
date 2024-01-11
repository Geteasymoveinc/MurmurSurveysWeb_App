import React, { Component } from "react";
//import axios from "axios";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import GoogleLogin from "../../assets/images/GoogleLogin.png";

// actions
import { loginUser, apiError } from "../../store/actions";

// import images
import logo from "../../assets/images/murmuricon.png";
import { FirebaseAuth } from "../../helpers/firebaseAuth/firebaseAuth";
//import { SocketFunction } from "./../../helpers/Socket/socket";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  // handleValidSubmit
  handleValidSubmit(event, values) {
  
    this.props.loginUser(values, this.props.history);
  }

  componentDidMount() {
    this.props.apiError("");
    //SocketFunction();
  }

  // handleLogin = () => {
  //   console.log("this is state,", this.state);
  //   axios
  //     .post(
  //       "https://backendapp.getinsightiq.com/api/v1/users/login",
  //       {
  //         email: this.state.email,
  //         password: this.state.password,
  //         role: 0,
  //       },
  //       { headers: { appversion: 1.5 } }
  //     )
  //     .then((response) => console.log({ response }))
  //     .catch((error) => console.log({ error }));
  // };

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="fas fa-home h2"></i>
          </Link>
        </div>
        <div className="account-pages  my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Murmur</h5>
                          <p>
                            The easiest & smartest way to react your audience on
                            streets
                          </p>
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
                              src={logo}
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
                        //onValidSubmit={this.handleLogin}
                      >
                        {this.props.error && this.props.error ? (
                          <Alert color="danger">{this.props.error}</Alert>
                        ) : null}

                        <div className="mt-3">
                          <img
                            src={GoogleLogin}
                            id="GoogleLogin"
                            style={{
                              width: 200,
                              height: 45,
                              alignContent: "center",
                            }}
                            onClick={(e) =>
                              FirebaseAuth(e.target.id, this.props.history)
                            }
                          />
                        </div>
                        <div className="mt-3">
                          <p>or</p>
                        </div>
                        <div className="form-group">
                          <AvField
                            name="email"
                            label="Email"
                            //value="admin@themesbrand.com"
                            value={this.state.email}
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name='password'
                            label="Password"
                            //value="123456"
                            valur={this.state.password}
                            type="password"
                            required
                            placeholder="Enter Password"
                            onChange={(event) => this.handleInputChange(event)}
                          />
                        </div>

                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customControlInline"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock mr-1"></i> Forgot your
                            password?
                          </Link>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Don't have an account ?{" "}
                    <Link
                      to="register"
                      className="font-weight-medium text-primary"
                    >
                      {" "}
                      Signup now{" "}
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
  const { error } = state.Login;

  return { error };
};

export default withRouter(
  connect(mapStatetoProps, { loginUser, apiError })(Login)
);

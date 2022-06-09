import React, { Component } from "react";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
const firebase = require("firebase/app");
const io = require("socket.io-client");
const socket = io.connect("https://backendapp.murmurcars.com/", {
  path: "/socket.io",
});

//const socket = io.connect("http://localhost:7444");

const firebaseConfig = {
  apiKey: "AIzaSyCufaPUqLeJ83iRcMEoq9wZoXxP8jyF2OY",
  authDomain: "murmurdriverreactnativeapp.firebaseapp.com",
  databaseURL: "https://murmurdriverreactnativeapp-default-rtdb.firebaseio.com",
  projectId: "murmurdriverreactnativeapp",
  storageBucket: "murmurdriverreactnativeapp.appspot.com",
  messagingSenderId: "476698745619",
  appId: "1:476698745619:web:32c16fa59b7df52a0818e6",
  measurementId: "G-B6HKFHXVNN",
};
//const firebaseApp = firebase.initializeApp(firebaseConfig);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

class GEOCODE_Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      latitude: null,
      longitude: null,
      crd: null,
      keyValue: null,
      submitted: false,
      _id: null,
    };

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.success = this.success.bind(this);
  }

  handleInputChange = (event) => {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  };

  // handleValidSubmit
  handleValidSubmit(event, values) {
    //this.handleFirebase();
    this.handleStartWork();

    this.setState({ submitted: true });
  }

  AskGeoTracking = () => {
    setInterval(
      () =>
        navigator.geolocation.getCurrentPosition(
          this.success,
          this.error,
          options
        ),
      2000
    );
  };

  componentDidMount() {
    this.AskGeoTracking();

    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    } else console.log(firebase.apps);
  }

  handleFirebase = () => {
    let keyValue = firebase
      .database()
      .ref(
        `backpackwalkers/${moment().format("MMM Do YY")}/${this.state.fullName}`
      )
      .push({
        Starttime: moment().format(" h:mm:ss a"),
        EndTime: moment().format(" h:mm:ss a"),
        Name: this.state.fullName,
        Status: "online",
        StartedGeoCordinates: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        StoppedGeoCordinates: { latitude: "", longitude: "" },
      })
      .getKey();

    this.setState({ keyValue });
    this.handleSocketConnectivity();
  };

  success(pos) {
    var crd = pos.coords;
    this.setState({ latitude: crd.latitude, longitude: crd.longitude, crd });
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  handleSocketConnectivity = () => {
    socket.on("connect", (socket) => {});

    let Info = {
      date: moment().format("MMM Do YY"),
      time: moment().format(" h:mm:ss a"),
      fullName: this.state.fullName,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      keyValue: this.state.keyValue,
    };
    setInterval(() => socket.emit("BackpackWalker_tracking", Info), 10000);
  };

  handleStartWork = () => {
    this.setState({ submitted: true });
    axios
      .post(
        "https://backendapp.murmurcars.com/api/v1/gps/receive-initial-gps",
        {
          fullName: this.state.fullName,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          startDate: moment().format("MMM Do YY"),
          time: moment().format(" h:mm:ss a"),
        }
      )
      .then((response) => {
        this.setState({ _id: response.data.response._id });

        let Info = {
          date: moment().format("MMM Do YY"),
          time: moment().format(" h:mm:ss a"),
          fullName: this.state.fullName,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          keyValue: this.state.keyValue,
        };
        setInterval(() => socket.emit("BackpackWalker_tracking", Info), 10000);
        //setInterval(() => this.handleUpdateWork(), 15000);
      });
  };

  handleUpdateWork = () => {
    axios
      .put(
        `https://backendapp.murmurcars.com/api/v1/gps/update-gps/${this.state._id}`,
        {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        }
      )
      .then((response) => console.log("Updated", response));
  };

  render() {
    return (
      <React.Fragment>
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
                    <div></div>
                    {!this.state.submitted ? (
                      <div className="p-2">
                        <AvForm
                          className="form-horizontal"
                          onValidSubmit={this.handleValidSubmit}
                          //onValidSubmit={this.handleStartWork}
                        >
                          {this.props.error && this.props.error ? (
                            <Alert color="danger">{this.props.error}</Alert>
                          ) : null}

                          <div className="form-group">
                            <AvField
                              name="fullName"
                              label="Email"
                              value={this.state.fullName}
                              className="form-control"
                              placeholder="Enter Full Name"
                              type="text"
                              required
                              onChange={(event) =>
                                this.handleInputChange(event)
                              }
                            />
                          </div>

                          <div className="mt-3">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="submit"
                            >
                              Start working
                            </button>
                          </div>
                        </AvForm>
                      </div>
                    ) : (
                      <p>You started Working,</p>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(GEOCODE_Tracking);
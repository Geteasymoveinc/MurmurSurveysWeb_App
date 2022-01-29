import React, { Component } from "react";

import { Button, Alert } from "reactstrap";

import Pie from "./pieChart";
import Bar from "./peopleReachedByWeekDays";

import GoogleMap from "./google-map";


import firebase from "firebase";
import Geocode from "react-geocode";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import Close from "../../assets/css/Dashboard/close.svg";

import classes from "../../assets/css/Dashboard/dashboard.module.css";
//import "../../assets/css/app.css";
import axios from "axios";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

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

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NumberOfDrivers: "",
      address: "",
      postalCode: "",

      errorZipCode: false,
      errorMessage: null,
      coordinates: [],
      toggleCartWithAreaInformation: false,

      center: {
        lat: 41.8781,
        lng: -87.6298,
      },
      zoom: 11,
      drivers: [],
      loaded: false,
      postCenter: {
        lat: 0,
        lng: 0,
      },
      statistic: {
        areaStatistic: [],
      },
    };

    this.zipIsWrongRef = React.createRef();
    this.toggleCard = this.toggleCard.bind(this);
    this.onChangeLocationToZoomIn = this.onChangeLocationToZoomIn.bind(this);
    this.submitLocationToZoomIn = this.submitLocationToZoomIn.bind(this);
  }

  handleConnectionToFirebaseRealTimeDatabase = () => {
    let ref = firebase.database().ref("users/");
    ref.on("value", (snapshot) => {
      const newValue = snapshot.val();

      //Convert Objects into Array
      let newArrayOfDrivers = Object.values(newValue);

      this.setState({
        ...this.state,
        drivers: newArrayOfDrivers,
        loaded: true,
        NumberOfDrivers: newArrayOfDrivers.length,
      });

      ref.off();
    });
  };

  handleReverseGeocode = () => {
    Geocode.fromLatLng(
      this.state.postCenter.lat,
      this.state.postCenter.lng
    ).then(
      (response) => {
        const address = response.results[5].formatted_address;
        this.setState({ ...this.state, address });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onChangeLocationToZoomIn(e) {
    this.setState({ ...this.state, postalCode: e.target.value });
  }

  submitLocationToZoomIn(e) {
    e.preventDefault();
    if (
      this.state.postalCode.length > 0 &&
      /[1-9]/i.test(this.state.postalCode)
    ) {
      this.setState({ ...this.state, loaded: false });
      axios
        .post(
          "http://localhost:4000/api/v1/zipcode/get-zipcode-polygon-coords",
          { postalCode: this.state.postalCode }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status !== 204) {
            Geocode.fromAddress("" + this.state.postalCode)
              .then((response) => {
                const { lat, lng } = response.results[0].geometry.location;
                const areaStatistic = [];
              

                
                areaStatistic.push({
                  General: res.data.areaStatistic.Population.General,
                  population_age:
                    res.data.areaStatistic.Population.population_age,
                });
                const statistic = this.state.statistic;

                statistic.location = this.state.postalCode;
                statistic.areaStatistic = areaStatistic;
                this.setState({
                  ...this.state,
                  coordinates: res.data.polygon,
                  zoom: 13,
                  loaded: true,
                  postCenter: { lat, lng },
                  errorZipCode: false,
                  statistic,
                  toggleCartWithAreaInformation: true,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.setState({
              ...this.state,
              errorMessage: res.data.message,
              errorZipCode: true,
              hint: res.data.hints,
              loaded: true,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ ...this.state, loaded: false });
      axios
        .post(
          "http://localhost:4000/api/v1/zipcode/get-district-information",
          { district: this.state.postalCode }
        )
        .then((res) => {
          if (res.data.status !== 204) {
      
            

            const statistic = this.state.statistic;
            statistic.areaStatistic = [res.data.areaStatistic['Population']];
            statistic.location = this.state.postalCode;

            this.setState({
              ...this.state,
              errorZipCode: false,
              errorMessage: "",
              postalCode: "",
              hint: "",
              loaded: true,
              coordinates: res.data.polygons,
              postCenter: res.data.center,
              center: res.data.center,
              zoom: 12,
              toggleCartWithAreaInformation: true,
              statistic,
            });
          } else {
            this.setState({
              ...this.state,
              errorZipCode: true,
              errorMessage: res.data.message,
              loaded: true,
              hint: res.data.hints,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }
  toggleCard() {
    console.log("run");
    this.setState({
      ...this.state,
      toggle: !this.state.toggle,
    });
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    this.handleConnectionToFirebaseRealTimeDatabase();

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        postCenter: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
      this.handleReverseGeocode();
    });
  }

  render() {
    console.log(this.state);
    const { loaded } = this.state;
    let male,
      female,
      location = "";

    let labels,
      data = [];
    if (this.state.statistic.areaStatistic.length) {
      male =
        this.state.statistic.areaStatistic[0]["General"]["population_males"];
      female =
        this.state.statistic.areaStatistic[0]["General"]["population_females"];
      location = this.state.statistic.location;
      labels = Object.keys(
        this.state.statistic.areaStatistic[0]["population_age"]
      );
      data = Object.values(
        this.state.statistic.areaStatistic[0]["population_age"]
      );
      console.log(this.state.statistic.areaStatistic[0]);
    }

    return (
      <React.Fragment>
        {!loaded && (
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

        <div className={classes.dash_right}>
          <div className={classes.map}>
            <GoogleMap state={this.state} />
          </div>

          {loaded && (
            <React.Fragment>
              <div className={classes.head_search_dashboard}>
                <div className={classes.head_search}>
                  <form onSubmit={this.submitLocationToZoomIn}>
                    <div
                      className={`${classes.dash_relative} ${classes.search_box}`}
                    >
                      <input
                        type="text"
                        placeholder="Search"
                        value={`${
                          this.state.postalCode && this.state.postalCode
                        }`}
                        onChange={this.onChangeLocationToZoomIn}
                      />
                      <div className={classes.search_box_flex}>
                        <button type="submit" className={classes.search_icon}>
                          <img
                            src={SearchNormal}
                            alt=""
                            className={classes.search_img}
                          />
                        </button>
                        <button
                          type="button"
                          className={classes.search_maximize}
                        >
                          <img
                            src={SearchMaximize}
                            alt=""
                            className={classes.maximize_img}
                          />
                        </button>

                        <ProfileMenu scope={"global"} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={classes.dashboard_right}>
                {this.state.errorZipCode ? (
                  <Alert color="danger">
                    {this.state.errorMessage}
                    <div className="d-flex flex-wrap">
                      {this.state.hint &&
                        this.state.hint.map((el, i) => (
                          <a
                            className="mr-3"
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                postalCode: el,
                                errorZipCode: false,
                                toggleCartWithAreaInformation: false,
                              });
                            }}
                            href="#"
                            key={i}
                          >
                            {el}
                          </a>
                        ))}
                    </div>
                    <Button
                      color="link"
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          errorZipCode: false,
                        })
                      }
                    >
                      Close
                    </Button>
                  </Alert>
                ) : null}

                {!this.state.errorZipCode &&
                  this.state.toggleCartWithAreaInformation && (
                    <div className={classes.choosen_place}>
                      <h6 className={classes.choosen_h6}>
                        {`Statistics of the  ${location.toUpperCase()}:`}
                      </h6>
                      <div className={classes.choosen_flex}>
                        <div className={classes.choosen_item}>
                          <p className={classes.choosen_item_p}>
                            Number of cars:
                          </p>
                          <h5 className={classes.choosen_h5}>
                            {this.state.NumberOfDrivers}
                          </h5>
                        </div>
                        <div className={classes.choosen_item}>
                          <p className={classes.choosen_item_p}>
                            Gender rates:
                          </p>
                          <div className={classes.gender_rates}>
                            <div className={classes.graph_rate}>
                              <Pie
                                male={male}
                                female={female}
                                location={location}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.choosen_item}>
                          <p className={classes.choosen_item_p}>Age rates:</p>
                          <div className={classes.gender_rates}>
                            <div className={classes.graph_rate}>
                              {this.state.statistic.areaStatistic.length && (
                                <Bar
                                  labels={labels}
                                  data={data}
                                  location={location}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={classes.choosen_close}
                        onClick={() =>
                          this.setState({
                            ...this.state,
                            toggleCartWithAreaInformation: false,
                          })
                        }
                      >
                        <img
                          src={Close}
                          alt=""
                          className={classes.choosen_close_img}
                        />
                      </button>
                    </div>
                  )}
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleMaps;

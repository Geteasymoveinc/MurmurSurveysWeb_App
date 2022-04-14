import React, { Component } from "react";

import { Button, Alert, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

import Pie from "./pieChart";
import Bar from "./peopleReachedByWeekDays";

import GoogleMap from "./google-map";

import Geocode from "react-geocode";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import Close from "../../assets/css/Dashboard/close.svg";

import classes from "../../assets/css/Dashboard/dashboard.module.css";
import "../../assets/css/app.css";
import axios from "axios";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NumberOfDrivers: "",
      address: "",
      postalCode: "",
      alert_status: false,
      permission: false,
      errorZipCode: false, //false
      errorMessage: null,
      coordinates: [],
      toggleCartWithAreaInformation: false, //false

      center: {
        lat:0,
        lng:0,
      },
      zoom: 11,
      drivers: [],
      loaded: false, //temperorary shoudl to be false
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

  onChangeLocationToZoomIn(e) {
    this.setState({ ...this.state, postalCode: e.target.value });
  }

  submitLocationToZoomIn(e) {
    e.preventDefault();
    if (
      this.state.address.includes("Azerbaijan") ||
      this.state.address.includes("US")
    ) {
      if (this.state.address.includes("US")) {
        this.setState({ ...this.state, loaded: false });
        axios
          .post(
            "https://backendapp.murmurcars.com/api/v1/zipcode/get-zipcode-polygon-coords",
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
            "https://backendapp.murmurcars.com/api/v1/zipcode/get-district-information",
            {
              district: this.state.postalCode,
            }
          )
          .then((res) => {
            if (res.data.status !== 204) {
              const statistic = this.state.statistic;
              statistic.areaStatistic = [res.data.areaStatistic["Population"]];
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
    } else {
      this.setState({ ...this.state, alert_status: true });
      return;
    }
  }
  toggleCard() {
    console.log("run");
    this.setState({
      ...this.state,
      toggleCartWithAreaInformation: !this.state.toggleCartWithAreaInformation,
    });
  }

  handleReverseGeocode = () => {
    Geocode.fromLatLng(
      this.state.postCenter.lat,
      this.state.postCenter.lng
    ).then(
      (response) => {
        console.log(response);
        const address = response.results[5].formatted_address;
       
        this.setState({ ...this.state, address, loaded: true });
  
      },
      (error) => {
        this.setState({ ...this.state, loaded: true });
      }
    );
  };

  componentDidMount() {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({
          ...this.state,
          postCenter: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          permission: true,
        });
        this.handleReverseGeocode();
      },
      (err) => {
        this.setState({
          ...this.state,
          loaded: true,
          alert_status: true,
          permission: false,
        });
      }
    );
  }

  render() {
    console.log(this.state);
    const { loaded, alert_status, permission, statistic, address } = this.state;
    const { areaStatistic } = statistic;
    let male,
      female,
      location,
      population = "";

    let labels,
      data = [];
    if (areaStatistic.length) {
      population = areaStatistic[0]["General"]["population"];
      male = areaStatistic[0]["General"]["population_males"];
      female = areaStatistic[0]["General"]["population_females"];
      location = statistic.location;
      labels = Object.keys(areaStatistic[0]["population_age"]).map((el) => {
        if (el.includes("_")) {
          return el
            .split("_")
            .slice(1, el.length)
            .reduce((total, el2) => total + "-" + el2);
        } else {
          return el;
        }
      });
      data = Object.values(areaStatistic[0]["population_age"]);
    }

    return (
      <React.Fragment>
        {!loaded && (
          <div id="preloader" style={{ opacity: 0.7 }}>
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
            <GoogleMap state={this.state} location={address} toggle={this.toggleCard} />
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
                {alert_status && (
                  <Alert className="d-flex align-items-center justify-content-between">
                    {!permission
                      ? "Please activate geolocation in order to fetch data"
                      : "We are not providing data in your region"}

                    <Button
                      color="link"
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          alert_status: false,
                        })
                      }
                    >
                      Close
                    </Button>
                  </Alert>
                )}
                {!this.state.errorZipCode &&
                  this.state.toggleCartWithAreaInformation && (
                    <div className={classes.choosen_place}>
                      <h6 className={classes.choosen_h6}>
                        {`Better understand audiences in ${location.toUpperCase()}`}
                      </h6>
                      <div className={classes.choosen_flex}>
                        <div className={classes.choosen_item}>
                          <p className={classes.choosen_item_p}>Population:</p>
                          <h5 className={classes.choosen_h5}>{population}</h5>
                        </div>
                        <div className={classes.choosen_item}>
                          <p className={classes.choosen_item_p}>
                            Population Gender:
                          </p>
                          <div className={classes.gender_rates}>
                            <div className={classes.graph_rate}>
                              <Pie
                                male={male}
                                female={female}
                                location={location}
                                labels={["males", "females"]}
                              />
                            </div>
                          </div>
                        </div>
                        <div className={classes.choosen_item}>
                          <p className={classes.choosen_item_p}>
                            Population Age :
                          </p>
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
                          alt="Hello"
                          className={classes.choosen_close_img}
                        />
                      </button>
                    </div>
                  )}
                {this.state.toggleCartWithAreaInformation ? null : this.state
                    .statistic.areaStatistic.length ? (
                  <div
                    className={classes.show_place}
                    onClick={() => {
                      this.setState({ toggleCartWithAreaInformation: true });
                    }}
                  >
                    <p className={classes.choosen_show_text}>
                      Show Street Data
                    </p>
                  </div>
                ) : null}
                <Link to="/ad-manager">
                  <div className={classes.show_create_ad_place}>
                    <p className={classes.choosen_create_ad_text}>
                      Create Outdoor Ad
                    </p>
                  </div>
                </Link>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleMaps;

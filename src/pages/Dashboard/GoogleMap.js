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

//import Socket from './SocketBackpackers/index'

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NumberOfDrivers: "",
      address: "",
      country: "",
      location: "",
      alert_status: false,
      permission: false,
      errorZipCode: false, //false
      errorMessage: null,
      coordinates: [],
      toggleCartWithAreaInformation: false, //false

      center: {
        lat: 0,
        lng: 0,
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
    const location = e.target.value
    this.setState({ ...this.state, location});
  }

  submitLocationToZoomIn(e) {
    e.preventDefault();
    const statistic = this.state.statistic;
    statistic.location = this.state.location;
    const location = this.state.location;
    const country = this.state.country;
    if (!this.state.address.length) {
      this.setState({ ...this.state, alert_status: true });
      return;
    }
    this.setState({ ...this.state, loaded: false });
    if (this.state.address.includes("US")) {
      axios
        .post(
          `https://backendapp.murmurcars.com/api/v1/zipcode/get-zipcode-polygon-coords/${country}`,
          { postalCode: location }
        )
        .then((res) => {
          if (res.data.status === 204) {
            this.setState({
              ...this.state,
              errorMessage: res.data.message,
              errorZipCode: true,
              hint: res.data.hints,
              loaded: true,
            });
            return;
          }
          const areaStatistic = [];

          areaStatistic.push({
            General: res.data.areaStatistic.Population.General,
            population_age: res.data.areaStatistic.Population.population_age,
          });

          statistic.areaStatistic = areaStatistic;
          const polygons = res.data.polygons;
          this.handleGeocode(location, statistic, polygons);
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            errorZipCode: true,
            toggleCartWithAreaInformation: false,
            loaded: true,
          });
        });
    } else {
      axios
        .post(
          `http://localhost:4000/api/v1/zipcode/get-district-information/${country}`,
          {
            district: location,
          }
        )
        .then((res) => {
          if (res.data.status === 204) {
            this.setState({
              ...this.state,
              errorZipCode: true,
              errorMessage: res.data.messag,
              toggleCartWithAreaInformation: false,
              loaded: true,
              hint: res.data.hints,
            });

            return;
          }
          statistic.areaStatistic = [res.data.areaStatistic["Population"]];

          const polygons = res.data.polygons;
          this.handleGeocode(location, statistic, polygons);
        })
        .catch((err) => {
          this.setState({
            ...this.state,
            errorZipCode: true,
            toggleCartWithAreaInformation: false,
            loaded: true,
          });
        });
    }
  }

  toggleCard() {
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
        let country;
        const address = response.results[5].formatted_address;

        if (address.includes("Azerbaijan")) country = "Azerbaijan";
        else if (address.includes("Georgia")) country = "Georgia";
        else country = "US";

        this.setState({ ...this.state, address, country, loaded: true });
      },
      (error) => {
        this.setState({ ...this.state, loaded: true });
      }
    );
  };
  handleGeocode = (location, statistic, polygons) => {
    const { country } = this.state;
    let city;
    if (country === "Azerbaijan") city = "Baku";
    else city = "Tbilisi";
    Geocode.fromAddress(city + " " + location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;

        this.setState({
          ...this.state,
          loaded: true,
          zoom: 13,
          toggleCartWithAreaInformation: true,
          errorZipCode: false,
          errorMessage: "",
          hint: "",
          postCenter: { lat, lng },
          center: { lat, lng },
          location: "",
          statistic,
          coordinates: polygons,
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          loaded: true,
          toggleCartWithAreaInformation: false,
          errorZipCode: true,
          errorMessage: "invalid location name",
        });
      });
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
          alert_status: false,
          permission: true,
        });
      }
    );
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }
  render() {
    
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
            <GoogleMap
              state={this.state}
              location={address}
              toggle={this.toggleCard}
            />
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
                          this.state.location && this.state.location
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
                          onClick={this.toggleFullscreen}
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
                                location: el,
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

import React, { Component } from "react";

import { Button, Alert } from "reactstrap";

import Pie from "./pieChart";
import Bar from "./peopleReachedByWeekDays";

import GoogleMap from "./google-map";

import { LatLngSource } from "./ZipCoords";
import ZIP from "./ZipCoordinates";
import { demographics } from "./demographicsBaku";

import firebase from "firebase";
import Geocode from "react-geocode";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import Graph1 from "../../assets/css/Dashboard/graph1.png";
import Close from "../../assets/css/Dashboard/close.svg";

import classes from "../../assets/css/Dashboard/dashboard.module.css";
import "../../assets/css/app.css";

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
      console.log("test");
      const LatLng = [];

      let coordinates = ZIP.filter((coordinate) => {
        if (coordinate[10] === this.state.postalCode) {
          return coordinate[8];
        }
      });

      const location = [];

      for (let e = 0; e < ZIP.length; e++) {
        location.push(ZIP[e][10]);
      }
      console.log(location);

      if (coordinates.length) {
        coordinates = coordinates.map((coordinate) => {
          return { coordinate: coordinate[8] };
        });
        coordinates = coordinates[0].coordinate.split("(((")[1].split(",");
        coordinates = coordinates.map((coordinate) => coordinate.split(" "));
        for (let i = 0; i < coordinates.length; i++) {
          if (coordinates[i][0].length !== 0) {
            LatLng.push({
              lat: Number.parseFloat(coordinates[i][1]),
              lng: Number.parseFloat(coordinates[i][0]),
            });
          } else {
            LatLng.push({
              lat: Number.parseFloat(coordinates[i][2]),
              lng: Number.parseFloat(coordinates[i][1]),
            });
          }
        }
      }
      console.log(LatLng[0]);
      Geocode.fromAddress("" + this.state.postalCode)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          if (!LatLng.length) {
            this.setState({
              ...this.state,
              errorZipCode: true,
              errorMessage:
                "the location your are looking for does not exists in our databse! You are maybe looking for ",
              hint: location,
            });
          } else {
            this.setState({
              ...this.state,
              coordinates: LatLng,
              zoom: 13,
              postCenter: { lat, lng },
              errorZipCode: false,
            });
          }
        })
        .catch(() => {
          const location = [];

          for (let e = 0; e < ZIP.length; e++) {
            location.push(ZIP[e][10]);
          }
          console.log(location);
          this.setState({
            ...this.state,
            errorZipCode: true,
            errorMessage:
              "the location your are looking for does not exists in our databse! You are maybe looking for ",
            hint: location,
          });
        });
    } else {
      const location = Object.keys(LatLngSource);
      const search = this.state.postalCode.toLowerCase();
      const locationFromSource = location.filter((el) => el === search);
      if (!locationFromSource.length) {
        this.setState({
          ...this.state,

          errorZipCode: true,
          errorMessage:
            "the location your are looking for does not exists in our databse! You are maybe looking for ",
          hint: location,
        });
      } else {
        console.log(LatLngSource[locationFromSource[0]][0]);
        let areaStatistic = demographics.area;
        const length = areaStatistic.length;
        for (let i = 0; i < length; i++) {
          if (Object.keys(areaStatistic[i])[0] === search) {
            const data = areaStatistic[i][search];
            areaStatistic = [];
            areaStatistic.push(data);
            i = length;
          }
        }

        const statistic = this.state.statistic;
        statistic.areaStatistic = areaStatistic;
        statistic.district = this.state.postalCode;

        this.setState({
          ...this.state,
          errorZipCode: false,
          errorMessage: "",
          postalCode: "",
          hint: "",
          coordinates: LatLngSource[locationFromSource[0]][1],
          postCenter: LatLngSource[locationFromSource[0]][0],
          zoom: 13,
          toggleCartWithAreaInformation: true,
          statistic,
        });
      }
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
  componentWillUnmount() {
    let ref = firebase.database().ref("users/");
    ref.off();
  }

  render() {
    console.log(this.state);

    let male,
      female,
      district = "";

    let labels,
      data = [];
    if (this.state.statistic.areaStatistic.length) {
      male = this.state.statistic.areaStatistic[0].population_males;
      female = this.state.statistic.areaStatistic[0].population_females;
      district = this.state.statistic.district;
      labels = Object.keys(
        this.state.statistic.areaStatistic[0].population_age
      );
      data = Object.values(
        this.state.statistic.areaStatistic[0].population_age
      );
    }
    return (
      <div className={classes.dash_right}>
        <div className={classes.map}>
          <GoogleMap state={this.state} />
        </div>

        <div className={classes.head_search_dashboard}>
          <div className={classes.head_search}>
            <form onSubmit={this.submitLocationToZoomIn}>
              <div className={`${classes.dash_relative} ${classes.search_box}`}>
                <input
                  type="text"
                  placeholder="Search"
                  value={`${this.state.postalCode && this.state.postalCode}`}
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
                  <button type="button" className={classes.search_maximize}>
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
                        const input = this.state.postalCode
                          ? "postalCode"
                          : "location";
                        this.setState({
                          ...this.state,
                          [input]: el,
                          errorZipCode: false,
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
                  Statistics of the choosen Place:
                </h6>
                <div className={classes.choosen_flex}>
                  <div className={classes.choosen_item}>
                    <p className={classes.choosen_item_p}>Number of cars:</p>
                    <h5 className={classes.choosen_h5}>
                      {this.state.NumberOfDrivers}
                    </h5>
                  </div>
                  <div className={classes.choosen_item}>
                    <p className={classes.choosen_item_p}>Gender rates:</p>
                    <div className={classes.gender_rates}>
                      <div className={classes.graph_rate}>
                        <Pie male={male} female={female} district={district} />
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
                            district={district}
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
      </div>
    );
  }
}

export default GoogleMaps;

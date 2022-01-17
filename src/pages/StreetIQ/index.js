import React, { Component } from "react";
import StreetIQMap from "./map";

import { Button, Alert } from "reactstrap";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import Close from "../../assets/css/StreetIQ/close.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";
import classes from "../../assets/css/Dashboard/dashboard.module.css";
import classes2 from "../../assets/css/StreetIQ/index.module.css";
import MapMulti from "../../assets/css/StreetIQ/map-multi.svg";

import { LatLngSource } from "../Dashboard/ZipCoords";
import ZIP from "../Dashboard/ZipCoordinates";
import { demographics } from "../Dashboard/demographicsBaku";



import firebase from "firebase";
import Geocode from "react-geocode";

import Statistic from "./statistic";
import Filters from "./filters";

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

class StreetIQMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistic: {
        areaStatistic: {},
        display: false,
        district: "",
      },
      segments: [],
      filterMethod: {
        display: false,
        Population: "",
        Age: "",
        Gender: "",
        Marrige: "",
        Ethnisity: "",
        Birth: "",
        Places: [],
        Business: "",
        Small_Business: "",
        Retired: "",
        Non_Retired: "",
      },
      filter: {
        display: false,
        result: [],
      },
      showFilteredResults: {
        display: false,
      },
      google: {
        address: "",
        districts: [],
        center: {
          lat: 41.8781,
          lng: -87.6298,
        },
        places: [],
        zoom: 11,
        drivers: [],
        loaded: false,
        postCenter: {
          lat: 0,
          lng: 0,
        },
        postalCode: "",
        errorZipCode: false,
        errorMessage: null,
        coordinates: [],
      },
    };
  }

  selectActiveRadio = (option, type) => {
    const id = option.target.id;
    console.log(id);
    const filterMethod = this.state.filterMethod;
    filterMethod[type] = id;
    this.setState({ ...this.state, filterMethod });
  };

  switchToDifferentQueryMode = () => {
    const filterMethod = this.state.filterMethod;
    filterMethod.display = !filterMethod.display;
    const statistic = this.state.statistic;
    statistic.display = false;
    const google = this.state.google;
    const polygons = [];
    const districts = google.districts;
    for (let i = 0; i < districts.length; i++) {
      polygons.push(LatLngSource[districts[i]][1]);
    }
    google.postCenter = google.center;
    if (polygons.length && google.coordinates) {
      google.coordinates = polygons;
    }
    google.zoom = 10;
    google.places = [];
    this.setState({ ...this.state, filterMethod, statistic, google });
  };

  //filter method
  searchDistricts = () => {
    const filters = this.state.filterMethod;
    let areaStatistic, districts = []
    if(this.state.google.address.includes('Azerbaijan')){
    areaStatistic = demographics.area;
    
    districts = [
      "nizami",
      "nasimi",
      "khazar",
      "sabunchu",
      "qaradaq",
      "binaqadi",
      "narimanov",
      "sabayil",
      "pirallahı",
      "xətai",
      "yasamal",
      "suraxanı",
    ];
  }
    let filtered = areaStatistic;
    if (filters["Population"].length > 0 && districts.length) {
      if (filters.Population === ">100000") {
        filtered = areaStatistic.filter(
          (area, index) => area[districts[index]].population > 100000
        );
      } else {
        filtered = areaStatistic.filter(
          (area, index) => area[districts[index]].population < 100000
        );
      }
      districts = [];
      for (let i = 0; i < filtered.length; i++) {
        districts.push(Object.keys(filtered[i])[0]);
      }
    }
    if (filters["Age"].length > 0 && districts.length) {
      console.log("age");
      if (filters.Age === "20-34<30000") {
        console.log("less");
        filtered = filtered.filter(
          (area, index) =>
            Number.parseFloat(
              area[districts[index]].population_age["age_20_24"]
            ) +
              Number.parseFloat(
                area[districts[index]].population_age["age_20_24"]
              ) <=
            30000
        );
      } else {
        console.log("more");
        filtered = filtered.filter(
          (area, index) =>
            Number.parseFloat(
              area[districts[index]].population_age["age_20_24"]
            ) +
              Number.parseFloat(
                area[districts[index]].population_age["age_20_24"]
              ) >=
            30000
        );
      }
      districts = [];
      for (let i = 0; i < filtered.length; i++) {
        console.log(filtered[i]);
        districts.push(Object.keys(filtered[i])[0]);
      }
    }
    if (filters["Gender"].length > 0 && districts.length) {
      if (filters.Gender === "Males>Females") {
        filtered = filtered.filter(
          (area, index) =>
            Number.parseFloat(area[districts[index]].population_males) >
            Number.parseFloat(area[districts[index]].population_females)
        );
      } else {
        filtered = filtered.filter(
          (area, index) =>
            Number.parseFloat(area[districts[index]].population_males) <
            Number.parseFloat(area[districts[index]].population_females)
        );
      }
      districts = [];
      for (let i = 0; i < filtered.length; i++) {
        console.log(filtered[i]);
        districts.push(Object.keys(filtered[i])[0]);
      }
    }
    if (filters["Ethnisity"].length && districts.length) {
      if (filters.Ethnisity === "r>5000") {
        filtered = filtered.filter(
          (area, index) =>
            area[districts[index]].population_ethnicity["russian"] > 5000
        );
      } else {
        filtered = filtered.filter(
          (area, index) =>
            area[districts[index]].population_ethnicity["russian"] <= 5000
        );
      }
      districts = [];
      for (let i = 0; i < filtered.length; i++) {
        districts.push(Object.keys(filtered[i])[0]);
      }
    }


    const polygons = [];
    for (let i = 0; i < districts.length; i++) {
      polygons.push(LatLngSource[districts[i]][1]);
    }

    
    const google = this.state.google;
    google.coordinates = polygons;
    google.zoom = 10;
    google.districts = districts;
    const filter = this.state.filter;
    filter.result = filtered;
    filter.display = true;
    this.setState({ ...this.state, filter, google });
  };
  //filter method

  onChangeLocationToZoomIn = (e) => {
    const google = this.state.google;
    google.postalCode = e.target.value;

    this.setState({ ...this.state, google });
  };

  submitLocationToZoomIn = (e) => {
    e.preventDefault();
    if (
      this.state.google.postalCode.length > 0 &&
      /[1-9]/i.test(this.state.google.postalCode)
    ) {
      console.log("test");
      const LatLng = [];

      let coordinates = ZIP.filter((coordinate) => {
        if (coordinate[10] === this.state.google.postalCode) {
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
      Geocode.fromAddress("" + this.state.google.postalCode)
        .then((response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          if (!LatLng.length) {
            const google = this.state.google;
            google.errorMessage =
              "the location your are looking for does not exists in our databse! You are maybe looking for ";
            google.hint = location;
            google.errorZipCode = true;
            this.setState({
              ...this.state,
              google,
            });
          } else {
            console.log(LatLng);
            const google = this.state.google;
            google.zoom = 12;
            google.postCenter = { lat, lng };
            google.coordinates.push(LatLng);
            this.setState({
              ...this.state,
              google,
            });
          }
        })
        .catch(() => {
          const location = [];

          for (let e = 0; e < ZIP.length; e++) {
            location.push(ZIP[e][10]);
          }
          console.log(location);
          const google = this.state.google;
          google.errorZipCode = true;
          google.errorMessage =
            "the location your are looking for does not exists in our databse! You are maybe looking for";
          google.hint = location;
          this.setState({
            ...this.state,
            google,
          });
        });
    } else {
      const location = Object.keys(LatLngSource);
      const search = this.state.google.postalCode.toLowerCase();
      const locationFromSource = location.filter((el) => el === search);
      if (!locationFromSource.length) {
        const google = this.state.google;
        google.errorZipCode = true;
        google.errorMessage =
          "the location your are looking for does not exists in our databse! You are maybe looking for";
        google.hint = location;
        this.setState({
          ...this.state,
          google,
        });
      } else {
        console.log(LatLngSource[locationFromSource[0]][0]);
        const google = this.state.google;
        google.errorMessage = null;
        google.errorZipCode = false;
        google.hint = null;
        google.coordinates = []
        google.coordinates.push(LatLngSource[locationFromSource[0]][1]);
        google.zoom = 12;
        google.postCenter = LatLngSource[locationFromSource[0]][0];
        google.toggleCartWithAreaInformation = true;

        let areaStatistic = demographics.area;

        for (let i = 0; i < areaStatistic.length; i++) {
          if (Object.keys(areaStatistic[i])[0] === search) {
            areaStatistic = areaStatistic[i][search];
          }
        }

        const statistic = this.state.statistic;
        statistic.areaStatistic = areaStatistic;
        statistic.display = true;

        this.setState({
          ...this.state,
          google,
          statistic,
        });
      }
    }
  };

  selectedDistrictData = (district) => {
    console.log(district);
    let areaStatistic = demographics.area;

    for (let i = 0; i < areaStatistic.length; i++) {
      if (Object.keys(areaStatistic[i])[0] === district) {
        areaStatistic = areaStatistic[i][district];
      }
    }

    const statistic = this.state.statistic;
    statistic.areaStatistic = areaStatistic;
    statistic.district = district;
    statistic.display = true;
    const google = this.state.google;
    google.zoom = 12;
    const postCenter = LatLngSource[district][0];
    google.postCenter = postCenter;
    google.coordinates = [];
    const polygon = LatLngSource[district][1];
    google.coordinates.push(polygon);
    const filterMethod = this.state.filterMethod;
    filterMethod.display = false;
    this.setState({ ...this.state, statistic, filterMethod, google });
  };
  selectedDataSegment = (type) => {
    const google = this.state.google;
    if (type === "Places") {
      const statistic = this.state.statistic;
      if (statistic.areaStatistic.popular_places_in_area) {
        const popular_places_in_area =
          statistic.areaStatistic.popular_places_in_area;

        for (let i = 0; i < popular_places_in_area.length; i++) {
          const name = Object.keys(popular_places_in_area[i])[0];
          if (
            popular_places_in_area[i][name].position &&
            (this.state.filterMethod.Places.length > 0 &&
            this.state.filterMethod.Places === ">4"
              ? popular_places_in_area[i][name].rating > 4
              : popular_places_in_area[i][name].rating < 4)
          ) {
            google.places.push({
              name: name[i],
              position: popular_places_in_area[i][name].position,
              img: popular_places_in_area[i][name].image,
            });
          } else if (popular_places_in_area[i][name].position) {
            google.places.push({
              name: name[i],
              position: popular_places_in_area[i][name].position,
              img: popular_places_in_area[i][name].image,
            });
          }
        }
      }
    }
    if (type !== "Places") google.places = [];
    this.setState({ ...this.state, segments: [type], google });
  };

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    this.handleConnectionToFirebaseRealTimeDatabase();
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const google = this.state.google;
      google.postCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      google.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.setState({
        ...this.state,
        google,
      });
      this.handleReverseGeocode();
    });
  }
  componentWillUnmount() {
    let ref = firebase.database().ref("users/");
    ref.off();
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
      this.state.google.postCenter.lat,
      this.state.google.postCenter.lng
    ).then(
      (response) => {
        const address = response.results[5].formatted_address;
        const google = this.state.google;
        google.address = address;
        this.setState({ ...this.state, google });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  render() {
    console.log(this.state.google.address.includes('Azerbaijan'));
    return (
      <React.Fragment>
        <div className={classes.dash_right}>
          <div className={classes.map}>
            <StreetIQMap
              maping={this.state.google}
              selectedDistrictData={this.selectedDistrictData}
            />
          </div>
          {/* <!-- header search block -->*/}{" "}
          {/*with   <div className={classes.head_search_dashboard}></div> does not sit on the right edge*/}
          <div className={classes.head_search_dashboard}>
            <div className={classes.head_search}>
              <form onSubmit={this.submitLocationToZoomIn}>
                <div
                  className={`${classes.dash_relative} ${classes.search_box}`}
                >
                  <input
                    type="text"
                    placeholder="Search"
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
          <div className={`${classes.dashboard_right} ${classes.dash_856px}`}>
            {this.state.google.errorZipCode ? (
              <Alert color="danger">
                {this.state.google.errorMessage}
                <div className="d-flex flex-wrap">
                  {this.state.google.hint &&
                    this.state.google.hint.map((el, i) => (
                      <a
                        className="mr-3"
                        onClick={() => {
                          const google = this.state.google;
                          google.postalCode = el;
                          google.errorZipCode = false;
                          this.setState({ ...this.state, google });
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
                  onClick={() => {
                    const google = this.state.google;
                    google.errorZipCode = false;
                    this.setState({
                      ...this.state,
                      google,
                    });
                  }}
                >
                  Close
                </Button>
              </Alert>
            ) : null}
            {!this.state.google.errorZipCode && (
              <div
                className={`${classes.choosen_place} ${classes.choose_search_section}`}
              >
                {!this.state.filterMethod.display && (
                  <div className={classes2.stc_place_content}>
                    <div className={classes2.stc_place_head}>
                      <h5 className={classes2.stc_h5}>
                        {this.state.statistic.district}
                      </h5>
                      <a
                        onClick={this.switchToDifferentQueryMode}
                        className={classes2.stc_p}
                      >
                        Search using statistics
                        <img src={ArrowRight} alt="" />
                      </a>
                    </div>
                    <div className={classes2.stc_search_block}>
                      <input
                        type="text"
                        className={classes2.stc_search_input}
                        name="stc_search_input"
                        id="stc_search_input"
                        placeholder="Enter zipcode"
                        value={`${
                          this.state.google.postalCode &&
                          this.state.google.postalCode
                        }`}
                        onChange={this.onChangeLocationToZoomIn}
                      />
                      <button
                        type="button"
                        className={classes2.search_normal}
                        onClick={this.submitLocationToZoomIn}
                      >
                        <img src={SearchNormal} alt="" />
                      </button>
                      <button
                        type="button"
                        className={classes2.stc_srch_close}
                        onClick={() => {
                          const google = this.state.google;
                          google.postalCode = "";
                          this.setState({ ...this.state, google });
                        }}
                      >
                        <img src={Close} alt="" />
                      </button>
                    </div>
                    {!this.state.statistic.display && (
                      <div className={classes2.stc_zip_code}>
                        <img src={MapMulti} alt="" />
                        <p className={classes2.ztc_zip_p}>
                          Enter zip code or search using Statistics
                        </p>
                      </div>
                    )}
                    {this.state.statistic.display && (
                      
                        <Statistic
                          segments={this.state.segments}
                          selectedDataSegment={this.selectedDataSegment}
                          areaStatistic={this.state.statistic.areaStatistic}
                          Places={this.state.filterMethod.Places}
                        />
                      
                    )}
                  </div>
                )}
                {this.state.filterMethod.display && (
                  <div className={classes2.stc_plc_zipcode}>
                    <div className={classes2.stc_place_head}>
                      <h5 className={classes2.stc_h5}>
                        Statistics of the choosen Place:
                      </h5>
                      <a
                        onClick={this.switchToDifferentQueryMode}
                        className={classes2.stc_p}
                      >
                        Search using zipcode
                        <img src={ArrowRight} alt="" />
                      </a>
                    </div>
                    <div className={classes2.stc_place_drops}>
                      
                        <Filters
                          filterMethod={this.state.filterMethod}
                          searchDistricts={this.searchDistricts}
                          selectActiveRadio={this.selectActiveRadio}
                        />
                      
                      
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StreetIQMain;

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

import firebase from "firebase";
import Geocode from "react-geocode";

import axios from "axios";

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
        Places: "",
        Business: "",
        Small_Business: "",
        Retired: "",
        Non_Retired: "",
        Income: "",
        Race: "",
        Real_Estate: "",
        Education:''
      },
      filter: {
        display: false,
        result: [],
      },
      showFilteredResults: {
        display: false,
      },
      google: {
        country: "",
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

    if (polygons.length && google.coordinates) {
      google.coordinates = polygons;
    } else if (districts.length) {
      axios
        .post(
          "http://localhost:4000/api/v1/zipcode/get-multiple-polygon-coords",
          {
            districts, country: google.address
          }
        )
        .then((resp) => {
          google.coordinates = resp.data.polygons;

          google.zoom = 10;
          google.places = [];
          const segments = [];
          return this.setState({
            ...this.state,
            filterMethod:{
              display:  filterMethod.display,
              Population: "",
              Age: "",
              Gender: "",
              Marrige: "",
              Ethnisity: "",
              Birth: "",
              Places: "",
              Business: "",
              Small_Business: "",
              Retired: "",
              Non_Retired: "",
              Income: "",
              Race: "",
              Real_Estate: "",
              Education:''
            },
            statistic,
            google,
            segments,
          });
        })
        .catch((err) => console.log(err));
    }
    google.zoom = 10;
    google.places = [];
    const segments = [];
    this.setState({ ...this.state,   filterMethod:{
      ...this.state.filterMethod,
      display: filterMethod.display,
    }, statistic, google, segments });
  };
  //filter method
  searchDistricts = () => {
    const filters = this.state.filterMethod;
    const google = this.state.google;
    const Country = this.state.google.address;
    let url = "";

    if (Country.includes("Azerbaijan")) {
      url = "http://localhost:4000/api/v1/zipcode/filter-baku-demographics";
    } else {
      url = "http://localhost:4000/api/v1/zipcode/filter-us-demographics";
    }
    console.log(url);
    google.loaded = false;
    this.setState({ ...this.state, google });
    axios
      .post(url, {
        filters,
      })
      .then((res) => {
        Geocode.fromAddress(Country !== "US" ? "Baku" : "Chikago")
          .then((result) => {
            const { lat, lng } = result.results[0].geometry.location;
            google.center = { lat, lng };
            google.postCenter = { lat, lng };
            google.coordinates = res.data.polygons;
            google.districts = res.data.districts;
            google.zoom = 10;
            google.loaded = true;
            /*const filter = this.state.filter
        filter.result = res.data.filtered
        filter.display = true*/
            this.setState({
              ...this.state,
              google,
              // filter
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  //filter method

  onChangeLocationToZoomIn = (e) => {
    const google = this.state.google;
    google.postalCode = e.target.value;
    this.setState({ ...this.state, google });
  };

  submitLocationToZoomIn = (e) => {
    e.preventDefault();
    const statistic = this.state.statistic;
    const google = this.state.google;
    google.loaded = false
    let segments = this.state.segments;
    this.setState({...this.state, google})
    if (
      this.state.google.postalCode.length > 0 &&
      /[1-9]/i.test(this.state.google.postalCode)
    ) {
      axios
        .post(
          "http://localhost:4000/api/v1/zipcode/get-zipcode-polygon-coords",
          { postalCode: this.state.google.postalCode }
        )
        .then((res) => {
          if (res.data.status !== 204) {
            Geocode.fromAddress(this.state.google.postalCode)
              .then((response) => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(response);

                statistic.areaStatistic = res.data.areaStatistic;
                statistic.display = true;

                segments = [];
                google.zoom = 12;
                google.postCenter = { lat, lng };
                google.coordinates = [res.data.polygon];
                google.loaded = true;
                google.center = { lat, lng };
                google.toggleCartWithAreaInformation = true;
                this.setState({
                  ...this.state,
                  google,
                  statistic,
                  segments,
                });
              })
              .catch((err) => console.log(err));
          } else {
            google.loaded = true;
            google.hint = res.data.hints;
            google.zoom = 10;
            google.errorMessage = res.data.message;
            google.errorZipCode = true;
            google.toggleCartWithAreaInformation = false;
            this.setState({
              ...this.state,
              google,
            });
          }
        })
        .catch((err) => {
          const google = this.state.google;
          google.errorMessage = err.message;
          google.errorZipCode = true;
          this.setState({
            ...this.state,
            google,
          });
        });
    } else {
      
      axios
        .post("http://localhost:4000/api/v1/zipcode/get-district-information", {
          district: this.state.google.postalCode,
        })
        .then((res) => {
          if (res.data.status !== 204) {
            console.log(res.data);
            const google = this.state.google;

            google.errorMessage = null;
            google.errorZipCode = false;
            google.hint = null;
            google.coordinates = [res.data.polygons];
            google.zoom = 12;
            google.loaded = true
            google.districts = [];
            google.postCenter = res.data.center;
            google.center = res.data.center
            google.toggleCartWithAreaInformation = true;
            google.places = [];

            let segments = this.state.segments;
            segments = [];

            const statistic = this.state.statistic;
            statistic.areaStatistic = res.data.areaStatistic;
            statistic.district = this.state.google.postalCode;
            statistic.display = true;

            const filterMethod = this.state.filterMethod;
            filterMethod.Places = "";

            this.setState({
              ...this.state,
              google,
              statistic,
              segments,
              filterMethod,
            });
          } else {
            google.hint = res.data.hints
            google.toggleCartWithAreaInformation = false 
            google.errorMessage = res.data.message 
            google.errorZipCode = true 
            google.loaded = true 
            this.setState({
              ...this.state,
             google
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  selectedDistrictData = (district, index) => {
    const google = this.state.google;
    const country = google.address;
    let url = "";
    google.loaded = false;
    this.setState({ ...this.state, google });
    if (country.includes("Azerbaijan")) {
      url = "http://localhost:4000/api/v1/zipcode/get-district-information";
    } else {
      url = "http://localhost:4000/api/v1/zipcode/get-us-information";
    }
    axios.post(url, { district }).then((resp) => {
      Geocode.fromAddress(district).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(response);                                

        const statistic = this.state.statistic;
        statistic.areaStatistic = resp.data.areaStatistic;
        statistic.district = district;
        statistic.display = true;
        const polygon = google.coordinates[index];
        const filterMethod = this.state.filterMethod;
        filterMethod.display = false;

        google.zoom = 12 
        google.postCenter = {lat,lng}
        google.center = {lat, lng}
        google.coordinates = [polygon]
        google.loaded = true

        if(country.includes('Azerbaijan')){
          console.log('azer')
          google.postCenter = resp.data.center
          google.center = resp.data.center
        }

        this.setState({
          ...this.state,
          statistic,
          filterMethod,
          google
        });
      }).catch(err => console.log(err))
    });
  };
  selectedDataSegment = (type) => {
    const google = this.state.google;
    if (type === "Places") {
      const statistic = this.state.statistic;
      if (statistic.areaStatistic.Places) {
        const Places = this.state.statistic.areaStatistic.Places;
        const place_filter = this.state.filterMethod.Places;
        console.log(place_filter);

        console.log(Places[0].high_rated);
        const hight_rated = Places[0]["high_rated"];
        const low_rated = Places[1]["low_rated"];
        if (place_filter.length === 0 || place_filter === ">4") {
          for (let i = 0; i < hight_rated.length; i++) {
            google.places.push({
              name: Object.keys(hight_rated[i])[0],
              position: hight_rated[i][Object.keys(hight_rated[i])[0]].position,
            });
          }
        }
        if (place_filter.length === 0 || place_filter === "<4") {
          for (let i = 0; i < low_rated.length; i++) {
            google.places.push({
              name: Object.keys(low_rated[i])[0],
              position: low_rated[i][Object.keys(low_rated[i])[0]].position,
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
    this.setState({
      ...this.state,
      google: {
        ...this.state.google,
        address: "US",
      },
    });
  }

  handleConnectionToFirebaseRealTimeDatabase = () => {
    let ref = firebase.database().ref("users/");
    ref.on("value", (snapshot) => {
      const newValue = snapshot.val();
      //Convert Objects into Array
      let newArrayOfDrivers = Object.values(newValue);
      const google = this.state.google;
      google.loaded = true;
      google.drivers = newArrayOfDrivers;
      google.NumberOfDrivers = newArrayOfDrivers.length;
      this.setState({
        ...this.state,
        google,
      });
      ref.off();
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
    console.log(this.state);
    const { loaded } = this.state.google;
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
        {loaded && (
          <div className={classes.dash_right}>
            <div className={classes.map}>
              <StreetIQMap
                maping={this.state.google}
                selectedDistrictData={this.selectedDistrictData}
              />
            </div>

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
            <div
              className={`${classes.dashboard_right} ${classes2.dash_856px}`}
            >
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
                            google.coordinates = []
                            const statistic = this.state.statistic
                            statistic.display = false 

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
                          Statistics of the choosen Place:{" "}
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
                          Country={this.state.google.country}
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
                          Country={this.state.google.address}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default StreetIQMain;

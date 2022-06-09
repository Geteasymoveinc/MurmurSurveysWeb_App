import React, { Component } from "react";
import StreetIQMap from "./map";

import { Button, Alert } from "reactstrap";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import Close from "../../assets/css/StreetIQ/close.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";
import classes from "../../assets/css/Dashboard/dashboard.module.css";
import classes2 from "../../assets/css/StreetIQ/index.module.css";
import "./scroolbar.css";
import "../../assets/css/app.css";

import MapMulti from "../../assets/css/StreetIQ/map-multi.svg";


import Geocode from "react-geocode";

import axios from "axios";

import Statistic from "./statistic";
import Filters from "./filters";
import Charts from "./charts";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

let ref = null;
class StreetIQMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statistic: {
        areaStatistic: {},
        display: false,
        district: "",
        modal: false,
        loading: false,
        activeTab: "1",
        hasStatistic: true,
      },
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
        Education: "",
      },
      filters: [],
      showFilteredResults: {
        display: false,
      },
      google: {
        country: "Georgia",
        city: 'tbilisi',
        address: "Georgia Tbilisi",
        districts: [],
        hint: [],
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 12,
        drivers: [],
        loaded: false,
        postCenter: {
          lat: 0,
          lng: 0,
        },
        location: "",
        errorZipCode: false,
        errorMessage: null,
        coordinates: [],
        alert_status: false,
        permission: true,
      },
      places: {
        place: "",
        list_of_places: [],
      },
    };
  }

  //selecting options in filters
  selectFilterData = (option, type) => {
    const id = option.target.id;
    const filterMethod = this.state.filterMethod;
    filterMethod[type] = id; //segment(income,age and setera) and its filter value
    this.setState({ ...this.state, filterMethod });
  };

  //switching from seaching by filter and input
  switchToDifferentQueryMode = () => {
    const filterMethod = this.state.filterMethod;
    filterMethod.display = !filterMethod.display;
    const statistic = this.state.statistic;
    statistic.display = false;
    const google = this.state.google;
    const polygons = [];
    const districts = google.districts; //when send filter data to backend it returns districts with polygons we store districts in districts

    if (polygons.length && google.coordinates) {
      google.coordinates = polygons; //if we already cashed the polygons in state
    } /*else if (districts.length) {  //
      axios
        .post(
          "https://backendapp.murmurcars.com/api/v1/zipcode/get-multiple-polygon-coords",
          {
            districts,
            country: google.address,
          }
        )
        .then((resp) => {
          google.coordinates = resp.data.polygons;

          google.zoom = 10;
          google.places = [];
          const segments = [];
          return this.setState({
            ...this.state,
            filterMethod: {
              display: filterMethod.display,
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
              Education: "",
            },
            statistic,
            google,
            segments,
          });
        })
        .catch((err) => console.log(err));
    }*/
    google.zoom = 10;
    this.setState({ ...this.state, filterMethod, statistic, google });
  };

  //filter method (sending filter data to backend)
  searchLocationsByFilterData = () => {
    const filters = this.state.filterMethod;
    const google = this.state.google;
    const country = this.state.google.country;
    const city = this.state.google.city
    let url = "";
  
  
   if(country === 'US') url = "https://backendapp.murmurcars.com/api/v1/zipcode/filter-us-demographics";
   else   url = `http://localhost:4000/api/v1/zipcode/filter-${city}-demographics`;


    google.loaded = false;
    this.setState({ ...this.state, google });
    axios
      .post(url, {
        filters,
      })
      .then((res) => {
        Geocode.fromAddress(city)
          .then((result) => {
            const { lat, lng } = result.results[0].geometry.location;
            google.center = { lat, lng };
            google.postCenter = { lat, lng };
            google.coordinates = res.data.polygons;
            google.districts = res.data.districts;
            google.zoom = 10;
            google.loaded = true;
            this.setState({
              ...this.state,
              google,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  onPlaceSelected = (e) => {
    const value = e.target.value;

    this.setState({
      ...this.state,
      places: {
        ...this.state.places,
        place: value,
      },
    });
  };
  //location input
  onChangeLocationToZoomIn = (e) => {
    const google = this.state.google;
    google.location = e.target.value;
    this.setState({ ...this.state, google });
  };

  //submiting to backend and getting polygons and statistics
  submitLocationToZoomIn = (e) => {
    e.preventDefault();
    const statistic = this.state.statistic;
    const google = this.state.google;
    const places = this.state.places;

    google.loaded = false;

    const country = google.country;

    this.setState({ ...this.state, google });
    if (!google.address.length) return;
    if (google.address.includes("US")) {
      const location = this.state.google.location;
      const place = this.state.places.place;
      axios
        .post(
          `http://localhost:4000/api/v1/zipcode/get-zipcode-polygon-coords/${country}`,
          {
            location,
            place,
          }
        )
        .then((res) => {
          if (res.data.status === 204) {
            google.loaded = true;
            google.hint = res.data.hints;
            google.zoom = 10;
            google.errorMessage = res.data.message;
            google.errorZipCode = true;
            google.toggleCartWithAreaInformation = false;
            this.setState({
              ...this.state,
              google,
              places: [],
            });
            return;
          }

          places.list_of_places = res.data.places.list_of_places;
          if (res.data.polygon) google.coordinates = [res.data.polygon];
          statistic.hasStatistic = true;
          if (!res.data.areaStatistic.Population.General.population) {
            statistic.hasStatistic = false;
          }
          statistic.areaStatistic = res.data.areaStatistic;
          statistic.display = true;

          google.zoom = 12;

          places.place = "";
          this.handleGeocode(location, google, { statistic, places });
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
      const location = this.state.google.location;
      const place = this.state.places.place;
      axios
        .post(
          `http://localhost:4000/api/v1/zipcode/get-district-information/${country}`,
          {
            district: location,
            place,
          }
        )
        .then((res) => {
          if (res.data.status === 204) {
            google.hint = res.data.hints;
            google.toggleCartWithAreaInformation = false;
            google.errorMessage = res.data.message;
            google.errorZipCode = true;
            google.loaded = true;
            this.setState({
              ...this.state,
              google,
              places,
            });
            return;
          }
          if (res.data.places) {
            places.list_of_places = res.data.places.list_of_places;
          }

          google.errorMessage = null;
          google.errorZipCode = false;
          google.hint = null;
          google.coordinates = [res.data.polygons];
          google.zoom = 12;
          google.loaded = true;
          google.toggleCartWithAreaInformation = true;

          statistic.areaStatistic = res.data.areaStatistic;
          statistic.district = this.state.google.location;
          statistic.display = true;

          places.place = "";
          this.handleGeocode(location, google, { statistic, places });
        })
        .catch((err) => {
          google.toggleCartWithAreaInformation = false;
          google.errorZipCode = true;
          google.loaded = true;
          this.setState({
            ...this.state,
            google,
            places,
          });
        });
    }
  };

  //filter method dhows all location and this is method for selecting and rendering data
  selectedLocation = (district, index) => {
    const google = this.state.google;
    const address = google.address;

    let url = "";
    google.loaded = false;
    this.setState({ ...this.state, google });
    if (!address.includes("US")) {
      const country = google.country;
      url = `http://localhost:4000/api/v1/zipcode/get-district-information/${country}`;
    } else {
      url =
        "https://backendapp.murmurcars.com/api/v1/zipcode/get-us-information";
    }
    axios.post(url, { district }).then((resp) => {
      const statistic = this.state.statistic;
      statistic.areaStatistic = resp.data.areaStatistic;
      statistic.district = district;
      statistic.display = true;
      const polygon = google.coordinates[index];
      const filterMethod = this.state.filterMethod;
      filterMethod.display = false;

      google.zoom = 12;
      google.coordinates = [polygon];
      google.loaded = true;

      this.handleGeocode(district, google, { statistic, filterMethod });
    });
  };
  /*selectedDataSegment = (type) => {
    const google = this.state.google;
    this.setState({ ...this.state, segments: [type], google });
  };*/

  componentDidMount() {
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(firebaseConfig);
    // } else {
    //   firebase.app(); // if already initialized, use that one
    // }

    //this.handleConnectionToFirebaseRealTimeDatabase();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const google = this.state.google;
        google.postCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        google.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        google.permission = true;

        this.setState({
          ...this.state,
          google,
        });
        this.handleReverseGeocode();
      },
      (err) => {
        axios
        .get(`http://localhost:4000/api/v1/zipcode/get-filters/${'Georgia'}`)
        .then(
          (response) => {
            const { data } = response;
        this.setState({
          ...this.state,
          google: {
            ...this.state.google,
            alert_status: false,
            loaded: true,
            permission: true,
            
          },
          filters: data
        });
      })
      }
    
    );
  }

  /*handleConnectionToFirebaseRealTimeDatabase = () => {
    ref = firebase.database().ref("users/");
    ref.on("value", (snapshot) => {
      const newValue = snapshot.val();
      //Convert Objects into Array
      let newArrayOfDrivers = Object.values(newValue);
      const google = this.state.google;
      google.drivers = newArrayOfDrivers;
      google.NumberOfDrivers = newArrayOfDrivers.length;
      this.setState({
        ...this.state,
        google,
      });
    });
  };*/

  handleGeocode = (location, google, rest) => {
    const { city } = this.state.google;
    
    Geocode.fromAddress(city + " " + location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;

        google.loaded = true;
        google.toggleCartWithAreaInformation = true;
        google.postCenter = { lat, lng };
        google.center = { lat, lng };
        google.location = "";

        this.setState({
          ...this.state,
          google,
          ...rest,
        });
      })
      .catch((err) => {
        google.loaded = true;
        google.toggleCartWithAreaInformation = true;
        google.location = "";
        this.setState({
          ...this.state,
          google,
          ...rest,
        });
      });
  };

  handleReverseGeocode = () => {
    const google = this.state.google;
    Geocode.fromLatLng(
      this.state.google.postCenter.lat,
      this.state.google.postCenter.lng
    ).then((response) => {
      const address = response.results[5].formatted_address;
      let country = "";
      let city = ''
      if (address.includes("Azerbaijan")) {
        country = "Azerbaijan";
        city = 'baku'
      }
      else if (address.includes("Georgia")) {
        country = "Georgia";
        city = 'tbilisi'
        }
      else country = "US";
      axios
        .get(`http://localhost:4000/api/v1/zipcode/get-filters/${country}`)
        .then(
          (response) => {
            const { data } = response;
            google.address = address;
            google.country = country;
            google.city = city
            google.loaded = true;

            this.setState({ ...this.state, google, filters: data });
          },
          (error) => {
            google.loaded = true;
            this.setState({ ...this.state, google });
          }
        );
    });
  };
  showMoreInDatabox = () => {
    document.getElementById("scroll").scrollTop = 0;
    this.setState({
      ...this.state,
      statistic: {
        ...this.state.statistic,
        modal: !this.state.statistic.modal,
        loading: false,
      },
    });
  };

  /*componentWillUnmount() {
    ref.off();
  }*/
  render() {
    const { filterMethod, google, statistic, filters, places } = this.state;
    const { loaded, address, alert_status, permission, errorZipCode } = google;
    const { modal, activeTab, hasStatistic } = statistic;
  
    console.log(google)
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
            <StreetIQMap
              maping={google}
              selectedLocation={this.selectedLocation}
              list_of_places={places.list_of_places}
            />
          </div>

          {loaded && (
            <React.Fragment>
              <div className={classes.head_search_dashboard}>
                {/*<div className={classes.head_search}>
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
              </div>*/}
              </div>
              <div
                className={`${classes.dashboard_right}  ${classes2.dash_856px}`}
              >
                {this.state.google.errorZipCode ? (
                  <Alert color="danger">
                    {google.errorMessage}
                    <div className="d-flex flex-wrap">
                      {google.hint &&
                        google.hint.map((el, i) => (
                          <a
                            className="mr-3"
                            onClick={() => {
                            
                              google.location = el;
                              google.errorZipCode = false;
                              google.coordinates = [];
                              statistic.display = false;

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
                          google: { ...this.state.google, alert_status: false },
                        })
                      }
                    >
                      Close
                    </Button>
                  </Alert>
                )}
                {!errorZipCode && permission && (
                  <div
                    id="scroll"
                    className={`${classes.choosen_place} 
                    ${
                      modal
                        ? classes.choose_modal_section
                        : classes.choose_search_section
                    }

                    ${filterMethod.display ? classes.overflow_visible : null}
                    `}
                  >
                    {!this.state.filterMethod.display && (
                      <div className={classes2.stc_place_content}>
                        {!modal ? (
                          <>
                            {" "}
                            <div className={classes2.stc_place_head}>
                              <h5 className={classes2.stc_h5}>
                                Statistics of the Choosen Location:{" "}
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
                            <form onSubmit={this.submitLocationToZoomIn}>
                              <div className={classes2.stc_search_block}>
                                <input
                                  type="text"
                                  className={classes2.stc_search_input}
                                  name="stc_search_input"
                                  id="stc_search_input"
                                  placeholder={
                                    !address.includes("US")
                                      ? "Enter district name"
                                      : "Enter zipcode"
                                  }
                                  value={`${
                                    google.location && google.location
                                  }`}
                                  onChange={this.onChangeLocationToZoomIn}
                                />
                                <button
                                  type="submit"
                                  className={classes2.search_normal}
                                >
                                  <img src={SearchNormal} alt="" />
                                </button>
                                <button
                                  type="button"
                                  className={classes2.stc_srch_close}
                                  onClick={() => {
                                    const places = this.state.places;
                                    places.place = "";
                                    this.setState({ ...this.state, places });
                                  }}
                                >
                                  <img src={Close} alt="" />
                                </button>
                                <button
                                  type="button"
                                  className={classes2.stc_srch_close_2}
                                  onClick={() => {
                                    const google = this.state.google;
                                    google.location = "";
                                    this.setState({ ...this.state, google });
                                  }}
                                >
                                  <img src={Close} alt="" />
                                </button>
                                <input
                                  type="text"
                                  className={`${classes2.stc_search_input} ${classes2.stc_search_place}`}
                                  name="stc_search_input"
                                  id="stc_search_input"
                                  onChange={this.onPlaceSelected}
                                  placeholder="Type place"
                                  value={places.place && places.place}
                                />
                              </div>
                            </form>
                          </>
                        ) : (
                          <>
                            <div className={classes2.streetIQ}>
                              <ul className={classes2.streetIQ_menu}>
                                <li
                                  className={`${
                                    statistic.activeTab === "1" &&
                                    classes2.active
                                  }`}
                                >
                                  <a
                                    href="#"
                                    className={classes2.streetIQ_nav_a}
                                    onClick={() => {
                                      this.setState({
                                        ...this.state,
                                        statistic: {
                                          ...statistic,
                                          activeTab: "1",
                                        },
                                      });
                                    }}
                                  >
                                    Statistics
                                  </a>
                                </li>
                                <li
                                  className={`${
                                    this.state.statistic.activeTab === "2" &&
                                    classes2.active
                                  }`}
                                >
                                  <a
                                    href="#"
                                    className={classes2.streetIQ_nav_a}
                                    onClick={() => {
                                      this.setState({
                                        ...this.state,
                                        statistic: {
                                          ...statistic,
                                          activeTab: "2",
                                        },
                                      });
                                    }}
                                  >
                                    Charts
                                  </a>
                                </li>
                              </ul>
                            </div>

                            <>
                              {activeTab === "1" && modal && (
                                <Statistic
                                 // selectedDataSegment={this.selectedDataSegment}
                                  expandStatisticModalWithScrool={
                                    this.showMoreInDatabox
                                  }
                                  modal={true}
                                  areaStatistic={statistic.areaStatistic}
                                  //Places={this.state.filterMethod.Places}
                                  Country={google.country}
                                />
                              )}

                              {activeTab === "2" && modal && (
                                <Charts
                                  //  segments={this.state.segments}
                                  selectedDataSegment={this.selectedDataSegment}
                                  expandStatisticModalWithScrool={
                                    this.showMoreInDatabox
                                  }
                                  areaStatistic={
                                    this.state.statistic.areaStatistic
                                  }
                                  //Places={this.state.filterMethod.Places}
                                  Country={google.address}
                                  modal={true}
                                />
                              )}
                            </>
                          </>
                        )}

                        {!this.state.statistic.display && !modal && (
                          <div className={classes2.stc_zip_code}>
                            <img src={MapMulti} alt="" />
                            <p className={classes2.ztc_zip_p}>
                              {`Enter  ${
                                !address.includes("US")
                                  ? "District Name"
                                  : "Zip Code"
                              } or search using Statistics`}
                            </p>
                          </div>
                        )}
                        {statistic.display && !modal && hasStatistic && (
                          <Statistic
                            //segments={this.state.segments}
                            //selectedDataSegment={this.selectedDataSegment}
                            expandStatisticModalWithScrool={
                              this.showMoreInDatabox
                            }
                            areaStatistic={statistic.areaStatistic}
                            Country={google.country}
                          />
                        )}
                        {statistic.display && !modal && !hasStatistic && (
                          <h1 className={classes2.no_data}>
                            We do not yet have data for this Zip Code{" "}
                          </h1>
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
                            {`Search using ${
                              address !== "US" ? "district name" : "zipcode"
                            }`}
                            <img src={ArrowRight} alt="" />
                          </a>
                        </div>
                        <div className={classes2.stc_place_drops}>
                          <Filters
                            filterMethod={filterMethod}
                            filters={filters}
                            searchLocationsByFilterData={
                              this.searchLocationsByFilterData
                            }
                            selectFilterData={this.selectFilterData}
                            Country={google.country}
                          />
                        </div>
                      </div>
                    )}
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

export default StreetIQMain;

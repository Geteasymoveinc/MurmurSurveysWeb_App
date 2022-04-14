import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { add_settings } from "../../store/actions";

import { withRouter } from "react-router-dom";

import classes from "../../assets/css/surveys/index.module.scss";
import Map from "../../assets/images/surveys/map.png";
import Chevron_Down from "../../assets/images/surveys/chevron-down.svg";
import Location from "../../assets/images/surveys/marker.svg";
import GoogleMap from "./map";
import "../../assets/css/common/css/google-map.css";


import axios from 'axios'

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

class SurveySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        center: {
          lat: 0,
          lng: 0,
        },
        coordinates: [],
        zoom: 12,
        postCenter: {
          lat: 0,
          lng: 0,
        },
        address: "",
        marker: {
          position: {
            lat: 0,
            lng: 0,
          },
          name: "",
          image: Location,
        },
      },
      survey_settings: {
        active: true,
        target_audience: {
          gender: "Male",
          age: "18-25",
          location: "",
        },
      },
    };
  }
  toggleSurveyImportance = () => {
    let active = !this.state.survey_settings.active;
    this.setState({
      ...this.state,
      survey_settings: {
        ...this.state.survey_settings,
        active: active,
      },
    });
  };

  onTargetAudienceChange = (event, type) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      survey_settings: {
        ...this.state.survey_settings,
        target_audience: {
          ...this.state.survey_settings.target_audience,
          [type]: value,
        },
      },
    });
  };

  handleLocationChange = (event) => {
    const location = event.target.value;
    console.log(location)
    let address = this.state.map.address;
    let url = ''
    if (address.includes("Azerbaijan")) {
      url =  `http://localhost:4000/api/v1/zipcode/get-location?city=${'Baku'}`
    
    } else {
       url = `http://localhost:4000/api/v1/zipcode/get-location?city=${'Chikago'}`
    }
    axios({
      url,
      method:'POST',
      data: {location}
    })
    .then(response => {
      const {center} = response.data.location_center
      this.setState({
        ...this.state,
        map:{
          ...this.state.map,
          center: center,
          postCenter: center,
          marker: {
            ...this.state.map.marker,
            name: location,
            position: center
          }
        },
        survey_settings: {
          ...this.state.survey_settings,
          target_audience: {
            ...this.state.survey_settings.target_audience,
            location
          }
        }
      })
    })
    .catch(err => console.log(err))
  };

  componentDidUpdate(prevProps, prevState) {
    const { survey_settings } = this.state;
    const { target_audience, active } = survey_settings;

    const { active: prev_active, survey_settings: prev_survey_settings } =
      prevState;
    const { target_audience: prev_target_audience } = prev_survey_settings;
    if (
      active !== prev_active ||
      target_audience.gender !== prev_target_audience.gender ||
      target_audience.age !== prev_target_audience.age ||
      target_audience.location !== prev_target_audience.location
    ) {
      this.props.add_settings({
        active,
        settings: target_audience,
      });
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            loaded: true,
            postCenter: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
        });
        this.handleReverseGeocode();
      },
      (err) => {
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            loaded: true,
          },
        });
      }
    );
  }
  handleReverseGeocode = () => {
    Geocode.fromLatLng(
      this.state.map.postCenter.lat,
      this.state.map.postCenter.lng
    ).then(
      (response) => {
        console.log(response);
        const address = response.results[5].formatted_address;
        this.setState({ ...this.state, map: { ...this.state.map, address } });
      },
      (error) => {
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            loading: false,
          },
        });
      }
    );
  };

  render() {
    const { active } = this.state.survey_settings;
    const { address } = this.state.map;
    console.log(this.state);
    return (
      <div className={classes.container_center}>
        <div
          className={`${classes.settings_container} ${classes.settings_container_top}`}
        >
          <div
            className={`${classes.smaller_container} ${classes.smaller_container_top}`}
          >
            <div>
              <h3>Survey status:</h3>
            </div>
            <div className={classes.survey_status_container}>
              <p className={!active ? classes.active : null}>Deactive</p>
              <label className={classes.switch} htmlFor="checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={active}
                  onChange={this.toggleSurveyImportance}
                />
                <div className={`${classes.slider} ${classes.round}`}></div>
              </label>
              <p className={active ? classes.active : null}>Active</p>
            </div>
          </div>
        </div>
        <div className={classes.settings_container}>
          <div className={classes.smaller_container}>
            <h3>Location (Zip):</h3>
            <div className={classes.map_container}>
              <GoogleMap state={this.state.map} />
              <div
                className={`${classes.google_map_location_input} ${classes.google_map_location_select}`}
              >
                {address.includes("Azerbaijan") ? (
                  <>
                    <select
                      name="step-aud-location"
                      id="step-aud-location"
                      className={classes.location_select}
                      onChange={(e) => this.handleLocationChange(e)}
                    >
                      <option value="Select"> Select</option>
                      <option value="nizami">Nizami</option>
                      <option value="nasimi">Nasimi</option>
                      <option value="khazar">Khazar</option>
                      <option value="sabunchu">Sabunchu</option>
                      <option value="qaradaq">Qaradaq</option>
                      <option value="binaqadi">Binaqadi</option>
                      <option value="narimanov">Narimanov</option>
                      <option value="sabayil">Sabayil</option>
                      <option value="pirallahı">Pirallahı</option>
                      <option value="xətai">Xətai</option>
                      <option value="yasamal">Yasamal</option>
                      <option value="suraxanı">Suraxanı</option>
                    </select>
                    <img
                      src={Chevron_Down}
                      alt="arrow"
                      className={classes.details_edit_arrow}
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    onChange={(e) => this.handleLocationChange(e)}
                  />
                )}
              </div>
            </div>
            <p className={classes.audience_p}>Audience</p>
            <div className={classes.gender_age_container}>
              <div className={`${classes.details_edit_select} ${classes.mt_8}`}>
                <label>Age</label>
                <select
                  name="audienceAge"
                  onChange={(event) =>
                    this.onTargetAudienceChange(event, "age")
                  }
                >
                  {["18-25", "26-35", "36-45", "46-55", "56-65", "66+"].map(
                    (age, index) => (
                      <option key={index} value={age}>
                        {age}
                      </option>
                    )
                  )}
                </select>
                <img
                  src={Chevron_Down}
                  alt="arrow"
                  className={classes.details_edit_arrow}
                />
              </div>
              <div className={`${classes.details_edit_select} ${classes.mt_8}`}>
                <label>Gender</label>
                <select
                  name="audienceGender"
                  onChange={(event) =>
                    this.onTargetAudienceChange(event, "gender")
                  }
                >
                  {["Male", "Female", "Both"].map((gender, index) => (
                    <option value={gender} key={index}>
                      {gender}
                    </option>
                  ))}
                </select>
                <img
                  src={Chevron_Down}
                  alt="arrow"
                  className={classes.details_edit_arrow}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { add_settings })(withRouter(SurveySettings));

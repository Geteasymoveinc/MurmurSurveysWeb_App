import React, { Component } from "react";

import { connect } from "react-redux";
import { add_settings, fetch_map_position } from "../../../store/actions";

import { withRouter } from "react-router-dom";

import classes from "../../../assets/css/surveys/index.module.scss";
import Location from "../../../assets/images/surveys/marker.svg";
import Chevron_Down from "../../../assets/images/surveys/chevron-down.svg";
import GoogleMap from "./map";
import "../../../assets/css/common/css/google-map.css";

import Geocode from "react-geocode";
const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLEMAPSKEY;
Geocode.setApiKey(GOOGLE_MAP_KEY);

class SurveySettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: {
        address: this.props.map.address,
        center: this.props.map.center,
        zoom: 12,
        postCenter: this.props.map.center,
        marker: {
          position: this.props.map.center,
          name: this.props.survey_location,
          image: Location,
        },
      },
      survey_settings: {
        active: this.props.survey_active,
        survey_specific: this.props.survey_specific,
        hasSurvey: false,
        country: this.props.country,
        target_audience: {
          gender: this.props.survey_gender,

          age: this.props.survey_age,
          location: this.props.survey_location,
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

  componentDidUpdate(prevProps, prevState) {
    const { target_audience, active, survey_specific, country } =
      this.state.survey_settings;

    const {
      active: prev_active,
      survey_specific: prev_survey_specific,
      target_audience: prev_target_audience,
    } = prevState.survey_settings;

    if (
      active !== prev_active ||
      target_audience.gender !== prev_target_audience.gender ||
      target_audience.age !== prev_target_audience.age ||
      target_audience.location !== prev_target_audience.location ||
      survey_specific !== prev_survey_specific
    ) {
      this.props.add_settings({
        active,
        survey_specific,
        settings: target_audience,
      });
    }
  }
  getLocationForSurvey = (event) => {
    const location = event.target.value;
    this.setState({
      survey_settings: {
        ...this.state.survey_settings,
        target_audience: {
          ...this.state.survey_settings.target_audience,
          location,
        },
      },
    });
    this.handleLocationChange(location);
  };

  handleLocationChange = (location) => {
    let {map, country:count} = this.state;
    //let url = "";
    const country = map.address.length ? map.address.split(",").at(-1) : count;
    this.handleGeocode(map.address, country, location);

    /*if (address.includes("Azerbaijan")) {
      url = `https://backendapp.murmurcars.com/api/v1/zipcode/get-location?city=${"Baku"}`;
    } else {
      url = `https://backendapp.murmurcars.com/api/v1/zipcode/get-location?city=${"Chikago"}`;
    }
    axios({
      url,
      method: "POST",
      data: { location },
    })
      .then((response) => {
        const { center } = response.data.location_center;
        this.props.fetch_map_position(address, center);
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            center: center,
            postCenter: center,
            marker: {
              ...this.state.map.marker,
              name: location,
              position: center,
            },
          },
        });
      })
      .catch((err) => console.log(err));*/
  };

  handleGeocode = (address,country, location) => {
    console.log(address, " and ", location);
    Geocode.fromAddress(country + " " + location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const center = { lat, lng };
        this.props.fetch_map_position(address,country, center);
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            center,
            postCenter: center,
            marker: {
              ...this.state.map.marker,
              name: location,
              position: center,
            },
          },
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { survey_settings, map } = this.state;
    const { active, target_audience, survey_specific,country } = survey_settings;
    const { address } = map;
    const { location, age, gender } = target_audience;
  console.log(target_audience)
  console.log(survey_specific)
  console.log(country)
    return (
      <div className={classes.container_center}>
        <div
          className={`${classes.settings_container} ${classes.settings_container_top} `}
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

        <div
          className={`${classes.settings_container} ${
            !survey_specific ? classes.survey_target_everybody : null
          }`}
        >
          <div
            className={`${classes.smaller_container} ${classes.smaller_container_top}`}
          >
            <div>
              <h3>Target settings:</h3>
            </div>
            <div className={classes.survey_status_container}>
              <p className={!survey_specific ? classes.active : null}>
                Specific
              </p>
              <label className={classes.switch} htmlFor="target">
                <input
                  type="checkbox"
                  id="target"
                  checked={!survey_specific}
                  onChange={() => {
                    this.setState((state) => {
                      return {
                        ...state,
                        survey_settings: {
                          ...state.survey_settings,
                          survey_specific:
                            !state.survey_settings.survey_specific,

                          target_audience: {
                            age: survey_specific ? "all" : "18-25",
                            gender: "Both",
                            location: survey_specific ? "" : "nizami",
                          },
                        },
                      };
                    });
                  }}
                />
                <div className={`${classes.slider} ${classes.round}`}></div>
              </label>
              <p className={!survey_specific ? classes.active : null}>
                Everybody
              </p>
            </div>
          </div>
          {survey_specific && (
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
                        onChange={(e) => this.getLocationForSurvey(e)}
                      >
                        <option value={location.toLowerCase()}>
                          {location}
                        </option>
                        {[
                          "Nizami",
                          "Nasimi",
                          "Xəzər",
                          "Sabunchu",
                          "Qaradaq",
                          "Binaqadi",
                          "Narimanov",
                          "Sabayil",
                          "Pirallahı",
                          "Xətai",
                          "Yasamal",
                          "Suraxanı",
                        ].map((loc, i) => {
                          if (loc !== location) {
                            return (
                              <option value={loc.toLowerCase()} key={i}>
                                {loc}
                              </option>
                            );
                          }
                        })}
                      </select>
                      <img
                        src={Chevron_Down}
                        alt="arrow"
                        className={classes.details_edit_arrow}
                      />
                    </>
                  ) : address.includes("Georgia") ? (
                    <select
                      name="step-aud-location"
                      id="step-aud-location"
                      className={classes.location_select}
                      onChange={(e) => this.getLocationForSurvey(e)}
                    >
                      <option value="chughureti">Chughureti</option>
                      <option value="didube">Didube</option>
                      <option value="eldani">Eldani</option>
                      <option value="isani">Isani</option>
                      <option value="krtsanisi">Krtsanisi</option>
                      <option value="mtatsminda">Mtatsminda</option>
                      <option value="nadzaladevi">Nadzaladevi</option>
                      <option value="saburtalo">Saburtalo</option>
                      <option value="samgori">Samgori</option>
                      <option value="vake">Vake</option>
                    </select>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const { location } =
                          this.state.survey_settings.target_audience;
                        let address = this.state.map.address;
                        const country = address.length
                          ? address.split(",").at(-1)
                          : "US";
                        this.handleGeocode(address,country, location);
                      }}
                    >
                      <input
                        type="text"
                        defaultValue={location}
                        onChange={(e) => {
                          const value = e.target.value.trim()
                          this.setState((state) => ({
                            ...state,
                            survey_settings: {
                              ...state.survey_settings,
                              target_audience: {
                                ...state.survey_settings.target_audience,
                                location: value,
                              },
                            },
                          }));
                        }}
                      />
                      <button type="submit" hidden />
                    </form>
                  )}
                </div>
              </div>
              <p className={classes.audience_p}>Audience</p>

              <div className={classes.gender_age_container}>
                <div
                  className={`${classes.details_edit_select} ${classes.mt_8}`}
                >
                  <label>Age</label>

                  <select
                    name="audienceAge"
                    onChange={(event) =>
                      this.onTargetAudienceChange(event, "age")
                    }
                  >
                    <option value={age}>{age}</option>
                    {["18-25", "26-35", "36-45", "46-55", "56-65"].map(
                      (Age, index) => {
                        if (Age !== age) {
                          return (
                            <option key={index} value={Age}>
                              {Age}
                            </option>
                          );
                        }
                      }
                    )}
                  </select>
                  <img
                    src={Chevron_Down}
                    alt="arrow"
                    className={classes.details_edit_arrow}
                  />
                </div>
                <div
                  className={`${classes.details_edit_select} ${classes.mt_8}`}
                >
                  <label>Gender</label>
                  <select
                    name="audienceGender"
                    onChange={(event) =>
                      this.onTargetAudienceChange(event, "gender")
                    }
                  >
                    <option value={gender}>
                      {gender[0].toUpperCase() + gender.substring(1)}
                    </option>
                    {["Male", "Female", "Both"].map((Gender, index) => {
                      if (gender !== Gender) {
                        return (
                          <option value={Gender} key={index}>
                            {Gender}
                          </option>
                        );
                      }
                    })}
                  </select>
                  <img
                    src={Chevron_Down}
                    alt="arrow"
                    className={classes.details_edit_arrow}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { add_settings, fetch_map_position })(
  withRouter(SurveySettings)
);

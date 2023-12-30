import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  add_settings,
  fetch_map_position,
  addResearchContactDetails,
} from '../../../store/actions';

import { withRouter } from 'react-router-dom';

import classes from '../../../assets/css/surveys/index.module.scss';
import Location from '../../../assets/images/surveys/marker.svg';
import Chevron_Down from '../../../assets/images/surveys/chevron-down.svg';
import GoogleMap from './map';
import '../../../assets/css/common/css/google-map.css';
import '../../../assets/css/antd/range-slider.scss';

import { Slider } from 'antd';



import Geocode from 'react-geocode';
const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLEMAPSKEY;
Geocode.setApiKey(GOOGLE_MAP_KEY);

class SurveySettings extends Component {
  state = {
    map: {
      zoom: 12,
      marker: {},
    },
  };


  componentDidMount() {
    const { country, city, location } = this.props.target_audience;

    Geocode.fromAddress(
      `${country}, ${city}, ${location} ${
        country === "USA" ? "zip" : "district"
      }`
    ).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;

      const center = {
        lat,
        lng,
      };
      let zoom = this.state.map.zoom
      let marker = {
        image: Location,
        position: center,
        name: location,
      }
      if (country === 'all' && city === 'all') {
        zoom = 1;
        marker = {}
      } else if (city === 'all') {
        zoom = 3;
      }
  

      this.props.fetch_map_position(
        `${(country, city)}`,
        country,
        city,
        center
      );
      this.setState((state) => ({
        ...state,
        map: {
          ...state.map,
          zoom,
         marker
        },
      }));
    });
  }
  componentDidUpdate(prevProps) {
    const { center, address } = this.props.map;
    const { country, city } = this.props.target_audience;

    if (
      prevProps.target_audience.country === country &&
      prevProps.target_audience.city === city
    )
      return;
    let zoom = this.state.map.zoom;

    let marker = {
      image: Location,
      position: center,
      name: address,
    }

    if (country === 'all' && city === 'all') {
      zoom = 1;
      marker = {}
    } else if (city === 'all') {
      zoom = 3;
    }else{
      zoom=12
    }

    
    this.setState((state) => ({
      ...state,
      map: {
        zoom,
        marker
      },
    }));
  }

  toggleSurveyImportance = (e) => {
    let active = e.target.checked;
    /*his.setState({
      ...this.state,
      survey_settings: {
        ...this.state.survey_settings,
        active: active,
      },
    });*/

    this.props.add_settings({
      active,
      settings: {
        ...this.props.target_audience,
        country: this.props.target_audience.country,
        city: this.props.target_audience.city,
      },
      survey_specific: this.props.survey_specific,
    });
  };

  onTargetAudienceChange = (event, type) => {
    const value = event.target.value;
    /*this.setState({
      ...this.state,
      survey_settings: {
        ...this.state.survey_settings,
        target_audience: {
          ...this.state.survey_settings.target_audience,
          [type]: value,
        },
      },
    });*/

    this.props.add_settings({
      active: this.props.active,
      survey_specific: this.props.survey_specific,
      settings: {
        ...this.props.target_audience,
        country: this.props.target_audience.country,
        city: this.props.target_audience.city,
        [type]: value,
      },
    });
  };

  getLocationForSurvey = (country, city, location) => {
    /*  this.setState({
      survey_settings: {
        ...this.state.survey_settings,
        target_audience: {
          ...this.state.survey_settings.target_audience,
          location,
        },
      },
    });*/
    this.props.add_settings({
      active: this.props.active,
      survey_specific: this.props.survey_specific,
      settings: {
        ...this.props.target_audience,
        country: this.props.target_audience.country,
        city: this.props.target_audience.city,
        location,
      },
    });

    this.selectLocationAsTarget(country, city, location);
  };

  selectLocationAsTarget = (country, city, location) => {
    Geocode.fromAddress(
      `${country}, ${city}, ${location} ${
        country === 'USA' ? 'zip' : 'district'
      }`,
    )
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const center = {
          lat,
          lng,
        };
        this.props.fetch_map_position(
          `${(country, city)}`,
          country,
          city,
          center,
        );
        this.setState((state) => ({
          ...state,
          map: {
            ...state.map,
            marker: {
              image: Location,
              name: location,
              position: center,
            },
          },
        }));
      })
      .catch((err) => {});
  };

  render() {
    const { target_audience, active, survey_specific, supportedCountry } =
      this.props;
    const { age, gender, interest, income, country, city } = target_audience;
    const { map: thisMap } = this.state;

    return (
      <div
        className={`${classes.container_center} ${
          classes[this.props.layoutTheme]
        }`}
      >
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
              <label className={classes.switch} htmlFor="active-survey">
                <input
                  type="checkbox"
                  id="active-survey"
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
                Everybody
              </p>
              <label className={classes.switch} htmlFor="target">
                <input
                  type="checkbox"
                  id="target"
                  checked={survey_specific}
                  onChange={(e) => {
                    const active = e.target.checked;

                    const settings = {
                      age: active ? 'all' : this.props.target_audience.age,
                      gender: active
                        ? 'Both'
                        : this.props.target_audience.gender,
                      location: active
                        ? 'all'
                        : this.props.target_audience.location,
                      income: active
                        ? { min: 300, max: 3000 }
                        : this.props.target_audience.income,
                      interest: active
                        ? 'all'
                        : this.props.target_audience.interest,
                      country: active
                        ? 'all'
                        : this.props.target_audience.country,
                      city: active ? 'all' : this.props.target_audience.city,
                    };
                    this.props.add_settings({
                      active: this.props.active,
                      survey_specific: active,
                      settings,
                    });
                  }}
                />
                <div className={`${classes.slider} ${classes.round}`}></div>
              </label>
              <p className={!survey_specific ? classes.active : null}>
                Specific
              </p>
            </div>
          </div>

          <div className={classes.smaller_container}>
            <h5>Location (Zip):</h5>
            <div className={classes.map_container}>
              <GoogleMap
                state={{ ...thisMap, center: this.props.map.center }}
              />
              <div className={classes['map-custom-btns']}>
                <button
                  style={{
                    width: 'fit-content',
                    background: 'transparent',
                    border: 'none',
                  }}
                  onClick={() => {
                    this.props.toggleLocationModal();
                  }}
                >
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 128 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                      {' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M64.0311 88.4152C65.1357 88.4152 66.0311 89.3106 66.0311 90.4152V107.864C66.0311 108.969 65.1357 109.864 64.0311 109.864C62.9266 109.864 62.0311 108.969 62.0311 107.864V90.4152C62.0311 89.3106 62.9266 88.4152 64.0311 88.4152Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M65.2711 16.1606C65.4061 17.2569 64.6268 18.255 63.5305 18.39C60.5589 18.7559 57.5839 19.5132 54.6718 20.6921C36.7907 27.9302 28.1629 48.2933 35.401 66.1743C42.6391 84.0554 63.0022 92.6832 80.8832 85.4451C84.0763 84.1526 86.9714 82.4434 89.5332 80.4066C90.3978 79.7192 91.6559 79.8628 92.3433 80.7274C93.0307 81.592 92.8871 82.8502 92.0225 83.5376C89.1638 85.8105 85.9363 87.715 82.3841 89.1529C62.4553 97.2199 39.7602 87.604 31.6932 67.6752C23.6262 47.7464 33.2421 25.0513 53.1709 16.9843C56.4104 15.673 59.7259 14.8283 63.0416 14.42C64.1379 14.285 65.1361 15.0643 65.2711 16.1606Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M50.9752 15.3624C51.9606 14.8633 53.164 15.2574 53.6631 16.2428L89.4134 86.8209C89.9125 87.8063 89.5183 89.0097 88.533 89.5088C87.5476 90.0079 86.3442 89.6137 85.8451 88.6284L50.0948 18.0503C49.5957 17.0649 49.9899 15.8615 50.9752 15.3624Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        d="M97.1608 53.8614C97.1608 70.1632 83.9455 83.3785 67.6436 83.3785C51.3418 83.3785 38.1265 70.1632 38.1265 53.8614C38.1265 37.5595 51.3418 24.3442 67.6436 24.3442C83.9455 24.3442 97.1608 37.5595 97.1608 53.8614Z"
                        fill="white"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M99.1608 53.8614C99.1608 71.2678 85.0501 85.3785 67.6436 85.3785C50.2372 85.3785 36.1265 71.2678 36.1265 53.8614C36.1265 36.4549 50.2372 22.3442 67.6436 22.3442C85.0501 22.3442 99.1608 36.4549 99.1608 53.8614ZM67.6436 83.3785C83.9455 83.3785 97.1608 70.1632 97.1608 53.8614C97.1608 37.5595 83.9455 24.3442 67.6436 24.3442C51.3418 24.3442 38.1265 37.5595 38.1265 53.8614C38.1265 70.1632 51.3418 83.3785 67.6436 83.3785Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M58.2849 35.9429C58.5742 35.6151 59.0429 35.5132 59.4422 35.6913L67.751 39.3983C67.7644 39.4043 67.7777 39.4106 67.7908 39.4171L72.1369 41.5902C72.5723 41.8079 72.7876 42.3074 72.6471 42.7734L70.2184 50.8265C70.091 51.2488 69.702 51.5378 69.261 51.5378H64.8237L65.1763 53.5828L69.7173 55.9115C69.9917 56.0523 70.1859 56.3118 70.2434 56.6148C70.301 56.9178 70.2154 57.2304 70.0117 57.462L64.6366 63.5701V67.1554C64.6366 67.4465 64.5097 67.7232 64.2891 67.9131L59.6873 71.8758C59.3366 72.1778 58.8245 72.1997 58.4493 71.9287L53.8791 68.628L48.6714 65.4526C48.4588 65.323 48.3022 65.1187 48.2323 64.8797L46.6983 59.6388C46.6294 59.4032 46.6495 59.1505 46.7548 58.9288L48.9912 54.2207L46.7368 48.8815C46.6211 48.6073 46.6334 48.2958 46.7706 48.0317L50.2219 41.3847C50.243 41.344 50.2669 41.3048 50.2934 41.2675L52.4665 38.1996C52.654 37.9349 52.9582 37.7776 53.2825 37.7776H56.6661L58.2849 35.9429ZM59.2984 37.8172L57.8672 39.4392C57.6773 39.6544 57.4043 39.7776 57.1173 39.7776H53.7996L51.9652 42.3674L48.7621 48.5364L51.0081 53.8558C51.119 54.1186 51.1125 54.4162 50.9901 54.6738L48.7249 59.4427L50.043 63.9465L54.9536 66.9407C54.9757 66.9542 54.9974 66.9686 55.0184 66.9838L58.9804 69.8452L62.6366 66.6968V63.1927C62.6366 62.9495 62.7252 62.7147 62.8858 62.5321L67.6617 57.105L63.8194 55.1346C63.5396 54.9911 63.3436 54.7245 63.2902 54.4147L62.6511 50.7077C62.601 50.417 62.6817 50.1191 62.8717 49.8935C63.0617 49.668 63.3416 49.5378 63.6366 49.5378H68.5181L70.4891 43.0023L66.916 41.2158L59.2984 37.8172Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M90.44 47.7711C90.7467 47.9504 90.9352 48.279 90.9352 48.6343V55.7061C90.9352 55.8496 90.9043 55.9914 90.8446 56.1218L88.4754 61.3045V66.3138C88.4754 66.6926 88.2614 67.0388 87.9226 67.2082L80.8508 70.7441C80.5712 70.8839 80.2423 70.8849 79.9618 70.7468C79.6814 70.6087 79.4817 70.3474 79.422 70.0406L78.3458 64.5061C78.3095 64.3192 78.3273 64.1259 78.397 63.9487L80.2889 59.1463L79.4218 54.6662C79.3769 54.4342 79.4156 54.1938 79.5311 53.9876L81.6834 50.1442C81.8387 49.8669 82.1165 49.68 82.4319 49.6406L87.1564 49.05L89.4449 47.7627C89.7545 47.5885 90.1333 47.5917 90.44 47.7711ZM88.9352 50.3441L87.9657 50.8895C87.8526 50.9531 87.7282 50.9941 87.5994 51.0102L83.1814 51.5624L81.4549 54.6455L82.3078 59.052C82.3439 59.2386 82.3261 59.4317 82.2564 59.6085L80.3647 64.4105L81.1339 68.3665L86.4754 65.6958V61.0868C86.4754 60.9433 86.5063 60.8015 86.5659 60.6711L88.9352 55.4884V50.3441Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        d="M63.7411 101.7C54.3147 101.7 46.673 105.495 46.673 110.176H80.8093C80.8093 105.495 73.1676 101.7 63.7411 101.7Z"
                        fill="white"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M46.673 112.176C45.5684 112.176 44.673 111.281 44.673 110.176C44.673 106.663 47.4864 104.028 50.7826 102.391C54.2023 100.693 58.7866 99.7002 63.7411 99.7002C68.6957 99.7002 73.2799 100.693 76.6997 102.391C79.9959 104.028 82.8093 106.663 82.8093 110.176C82.8093 111.281 81.9139 112.176 80.8093 112.176H46.673ZM80.3314 108.176C78.5213 104.46 71.7803 101.7 63.7411 101.7C55.702 101.7 48.961 104.46 47.1509 108.176C46.8385 108.818 46.673 109.487 46.673 110.176H80.8093C80.8093 109.487 80.6438 108.818 80.3314 108.176Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        d="M41.9703 112.134C41.9703 111.605 42.3991 111.176 42.9282 111.176H85.1342C85.6632 111.176 86.0921 111.605 86.0921 112.134C86.0921 112.663 85.6632 113.092 85.1342 113.092H42.9282C42.3991 113.092 41.9703 112.663 41.9703 112.134Z"
                        fill="#2e3a59"
                      ></path>{' '}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M85.1342 113.092C85.6632 113.092 86.0921 112.663 86.0921 112.134C86.0921 111.605 85.6632 111.176 85.1342 111.176H42.9282C42.3991 111.176 41.9703 111.605 41.9703 112.134C41.9703 112.663 42.3991 113.092 42.9282 113.092H85.1342ZM42.9282 109.176H85.1342C86.7678 109.176 88.0921 110.501 88.0921 112.134C88.0921 113.768 86.7678 115.092 85.1342 115.092H42.9282C41.2946 115.092 39.9703 113.768 39.9703 112.134C39.9703 110.501 41.2946 109.176 42.9282 109.176Z"
                        fill="#2e3a59"
                      ></path>{' '}
                    </g>
                  </svg>
                </button>
                {country === 'all' || city === 'all' ? null :<div
                  className={`${classes.google_map_location_input} ${classes.google_map_location_select}`}
                >
                  <select
                    name="step-aud-location"
                    id="step-aud-location"
                    className={classes.location_select}
                    onChange={(e) =>
                      this.getLocationForSurvey(country, city, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    {Object.keys(supportedCountry.districts).map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}

                    {/*{country === "Azerbaijan"
                        ? [
                            { key: "Nizami", value: "nizami" },
                            { key: "Nasimi", value: "nasimi" },
                            { key: "Xazar", value: "xazar" },
                            { key: "Sabunchu", value: "sabunchu" },
                            { key: "Qaradaq", value: "qaradaq" },
                            { key: "Binaqadi", value: "binaqadi" },
                            { key: "Narimanov", value: "narimanov" },
                            { key: "Sabayil", value: "sabayil" },
                            { key: "Pirallahı", value: "pirallahı" },
                            { key: "Xətai", value: "xətai" },
                            { key: "Yasamal", value: "yasamal" },
                            { key: "Suraxanı", value: "suraxanı" },
                          ]
                            .filter((loc) => loc !== location)
                            .map((loc, i) => {
                              return (
                                <option value={loc.value} key={i}>
                                  {loc.key}
                                </option>
                              );
                            })
                        : country === "Georgia"
                        ? [
                            { key: "Chughureti", value: "chughureti" },
                            { key: "Didube", value: "didube" },
                            { key: "Isani", value: "isani" },
                            { key: "Krtsanisi", value: "krtsanisi" },
                            { key: "Mtatsminda", value: "mtatsminda" },
                            { key: "Nadzaladevi", value: "nadzaladevi" },
                            { key: "Saburtalo", value: "saburtalo" },
                            { key: "Samgori", value: "samgori" },
                            { key: "Vake", value: "vake" },
                          ]

                            .filter((loc) => loc !== location)
                            .map((loc, i) => {
                              return (
                                <option value={loc.value} key={i}>
                                  {loc.key}
                                </option>
                              );
                            })
                        : city === "Chicago"
                        ? [
                            60647, 60639, 60707, 60622, 60651, 60611, 60638,
                            60652, 60626, 60615, 60621, 60645, 60643, 60660,
                            60640, 60614, 60631, 60646, 60628, 60625, 60641,
                            60657, 60636, 60649, 60617, 60633, 60643, 60612,
                            60604, 60624, 60656, 60644, 60655, 60603, 60605,
                            60653, 60609, 60666, 60618, 60616, 60602, 60601,
                            60608, 60607, 60661, 60606, 60827, 60630, 60642,
                            60659, 60707, 60634, 60613, 60610, 60654, 60632,
                            60623, 60629, 60620, 60637, 60619
                          ]
                            .filter((loc) => loc !== location)
                            .map((loc, i) => {
                              return (
                                <option value={loc} key={i}>
                                  {loc}
                                </option>
                              );
                            })
                        : [
                            94102, 94103, 94104, 94105, 94107, 94108, 94109,
                            94110, 94111, 94112, 94114, 94115, 94116, 94117,
                            94118, 94119, 94120, 94121, 94122, 94123, 94124,
                            94125, 94126, 94127, 94128, 94129, 94130, 94131,
                            94132, 94133, 94134, 94137, 94139, 94140, 94140,
                            94141, 94142, 94143, 94144, 94145, 94146, 94147,
                            94151, 94158, 94159, 94160, 94161, 94163, 94164,
                            94172, 94177, 94188
                          ]
                            .filter((loc) => loc !== location)
                            .map((loc, i) => {
                              return (
                                <option value={loc} key={i}>
                                  {loc}
                                </option>
                              );
                            })}*/}
                    <option value="all">Select All</option>
                  </select>
                  <img
                    src={Chevron_Down}
                    alt="arrow"
                    className={classes.details_edit_arrow}
                  />
                </div>}
              </div>
            </div>
            {survey_specific && country ? (
              <h5 className={classes.audience_p}>Audience</h5>
            ) : null}
            {survey_specific && country ? (
              <div className={classes.gender_age_container}>
                <div
                  className={`${classes.details_edit_select} ${classes.mt_8}`}
                >
                  <label>Age</label>

                  <select
                    name="audienceAge"
                    onChange={(event) =>
                      this.onTargetAudienceChange(event, 'age')
                    }
                  >
                    <option value={age}>{age}</option>
                    {['18-25', '26-35', '36-45', '46-55', '56-65'].map(
                      (Age, index) => {
                        if (Age !== age) {
                          return (
                            <option key={index} value={Age}>
                              {Age}
                            </option>
                          );
                        }
                      },
                    )}
                    <option value="all">Select All</option>
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
                      this.onTargetAudienceChange(event, 'gender')
                    }
                  >
                    <option value={gender}>{gender}</option>
                    {['Male', 'Female'].map((Gender, index) => {
                      if (gender !== Gender) {
                        return (
                          <option value={Gender} key={index}>
                            {Gender}
                          </option>
                        );
                      }
                    })}
                    <option value="Both">Select Both</option>
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
                  <label>Interest</label>
                  <select
                    name="audienceGender"
                    onChange={(event) =>
                      this.onTargetAudienceChange(event, 'interest')
                    }
                  >
                    <option value={interest}>{interest}</option>
                    {supportedCountry.user_professions.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                    {/*[
                      "Maliyyə",
                      "Marketing",
                      "Müxtəlif",
                      "Satış",
                      "Xidmət",
                      "Dizayn",
                      "İnzibati",
                      "İnformasiya Texnologiyaları",
                      "Təhsil və elm",
                      "İnzibati",
                      "Sənaye və kənd təsərrüfatı",
                    ].map((interest, index) => {
                      if (gender !== interest) {
                        return (
                          <option value={interest} key={index}>
                            {interest}
                          </option>
                        );
                      }
                    })*/}
                    <option value="all">Select All</option>
                  </select>
                  <img
                    src={Chevron_Down}
                    alt="arrow"
                    className={classes.details_edit_arrow}
                  />
                </div>
              </div>
            ) : null}
            {survey_specific && country ? (
              <div className="icon-wrapper">
                <label htmlFor="income">Income</label>

                <Slider
                  id="income"
                  range
                  min={300}
                  max={3000}
                  step={10}
                  defaultValue={[income.min, income.max]}
                  onChange={(value) => {
                    /*this.setState((state) => {
                      return {
                        ...state,
                        survey_settings: {
                          ...state.survey_settings,
                          target_audience: {
                            ...state.survey_settings.target_audience,
                            income: { min: value[0], max: value[1] },
                          },
                        },
                      };
                    });*/

                    this.props.add_settings({
                      active,
                      survey_specific,
                      settings: {
                        ...target_audience,
                        country: this.props.target_audience.country,
                        city: this.props.target_audience.city,
                        income: { min: value[0], max: value[1] },
                      },
                    });
                  }}
                />
                <div className="slider_values">
                  <span>{income.min}</span>
                  <div className="slider_current_value">
                    <span>{`${target_audience.income.min}-${target_audience.income.max}`}</span>
                  </div>
                  <span>{income.max}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {this.props.researchConductedVia !== 'survey app' ? (
          <div
            className={`${classes.settings_container} mt-5`}
            style={{
              height: 'fit-content',
              paddingBottom: '30px',
              marginBottom: '30px',
            }}
          >
            <div
              className={`${classes.smaller_container} ${classes.smaller_container_top} flex-column justify-content-start`}
            >
              <h3>Research type</h3>
              <div className={classes.contacts}>
                {this.props.researchConductedVia === 'over phone' ? (
                  <>
                    {' '}
                    <h3 className="mb-3">Over the phone</h3>
                    <div className={classes.contacts__field}>
                      <label>Mobile</label>
                      <div>
                        <div className={classes.contacts__select}>
                          <select
                            onChange={(e) => {
                              const value = e.target.value.trim();
                              this.setState((state) => ({
                                ...state,
                                countryCode: value,
                              }));
                            }}
                          >
                            <option value={supportedCountry.countryCode}>
                              {supportedCountry.countryCode}
                            </option>
                          </select>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="#667085"
                              strokeWidth="1.66667"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="(00) 000 00 00"
                          defaultValue={this.props.researcherContacts.phone}
                          className={classes.contacts__mobile}
                          onChange={(e) => {
                            const value =
                              this.state.countryCode + e.target.value.trim();

                            this.props.addResearchContactDetails(
                              'phone',
                              value,
                            );
                          }}
                        />
                      </div>
                    </div>{' '}
                  </>
                ) : null}

                {this.props.researchConductedVia === 'in person' ? (
                  <>
                    {' '}
                    <h3 className="mb-3 mt-3">In person</h3>
                    <div className={classes.contacts__field}>
                      <label>Address</label>
                      <div>
                        <input
                          type="text"
                          placeholder="Add address here"
                          defaultValue={this.props.researcherContacts.location}
                          onChange={(e) => {
                            const value = e.target.value.trim();

                            this.props.addResearchContactDetails(
                              'location',
                              value,
                            );
                          }}
                        />
                      </div>
                    </div>{' '}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(null, {
  add_settings,
  fetch_map_position,
  addResearchContactDetails,
})(withRouter(SurveySettings));

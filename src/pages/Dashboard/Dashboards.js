import React from "react";
import { Component, Fragment } from "react";

//reactstrap and react-datepicker
import { Button } from "reactstrap";
//import { DatePicker } from "antd";
import DatePicker from "react-datepicker";

//router and redux
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

//assets and map
import GoogleMap from "./google-map";
import classes from "../../assets/css/Dashboard/dashboard.module.css";
import "../../assets/css/Dashboard/date_picker.css";
import ChevronDown from "../../assets/css/Dashboard/chevron-down.svg";
import ChevronUp from "../../assets/css/Dashboard/chevron-up.svg";
import PedestriansMeasure from "../../assets/css/Dashboard/pedestrians-measure.svg";
import Pedestrian from "../../assets/css/Dashboard/pedestrian.svg";
import Temperature from "../../assets/css/Dashboard/temperature.svg";
import DateIcon from "../../assets/css/Dashboard/date-icon.svg";
import NoiseLevel from "../../assets/css/Dashboard/noise-level.svg";
import AirQuality from "../../assets/css/Dashboard/air-quality.svg";
import ChevronRight from "../../assets/css/Dashboard/chevron-right.svg";
import Population_hight from "../../assets/css/Dashboard/population_high.svg";
import Population_avg from "../../assets/css/Dashboard/population-avg.svg";
import Population_low from "../../assets/css/Dashboard/population_low.svg";
import m_s28 from "../../assets/css/Dashboard/28.svg";
import Plus from "../../assets/css/Dashboard/plus.svg";
import Add from "../../assets/css/Dashboard/add.svg";
import Cloud from "../../assets/css/Dashboard/air_quality.svg";

//action
import { changeSideBar } from "../../store/actions";

//axiso
import axios from "axios";

import Geocode from 'react-geocode'

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

const getPopulation = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/v1/zipcode/get-population?city=Baku"
  );
  const { data } = response.data;
  const  {avg,max,min} = data
  let {all_location_population} = data 
  all_location_population = all_location_population.map(el => {
       if(el.population < (avg-avg*0.3)){
         return {
           position: el.coordinate,
           image: Population_low,
           population:el.population,
           name: el.name
         }
       }else if(el.population> (avg- avg*0.3) && el.population< (avg+avg*0.3)){
        return {
          position: el.coordinate,
          image: Population_avg,
          population:el.population,
          name: el.name
        }
       }else{
        return {
          position: el.coordinate,
          image: Population_hight,
          population:el.population,
          name: el.name
        }
       } 
  })

  return {avg,min,max, all_location_population}
};



class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        loading: true,
        center: {
          lng: 49.89201,
          lat: 40.37767,
        },
        zoom: 11,

        coordinates: [],
        markers: {
          pedestrian: [
            {
              name: "Nizami",
              position: {
                lat: 40.3722065,
                lng: 49.8377341,
              },

              image: m_s28,
            },
            {
              name: "28 m/s",
              position: {
                lat: 40.3798499,
                lng: 49.8485742,
              },
              image: Population_avg,
            },
            {
              name: "Matbuat",
              /*position:{
                lat:40.3728275,
                lng:49.8161603
            },*/
              position: {
                lat: 40.370794,
                lng: 49.8101598,
              },

              image: Population_hight,
            },
            {
              name: "Babek avenue",
              position: {
                lat: 40.3920846,
                lng: 49.9160292,
              },
              image: Population_low,
            },
          ],
          air_quality: [
            {
              name: "Baku",
              position: {
                lat: 40.3920846,
                lng: 49.9160292,
              },
              image: Cloud,
            },
          ],
        },
      },
      pedestrian: {
        display: false,
        min:0,
        max:0,
        avg:0,
      },
      temperature: {
        display: false,
        data: {
          avgtemp_c: "",
          mintemp_c: "",
          maxtemp_c: "",
        },
      },
      air_quality: {
        display: false,
      },
      noise_level: { display: false },
      user_input: {
        date_picked: "",
      },
    };
  }
  componentDidMount() {
    this.props.changeSideBar(false);
    this.setState({
      ...this.state,
      map: {
        ...this.state.map,
        loading: true,
      },
    });
    axios
      .get(
        "https://api.weatherapi.com/v1/forecast.json?key=273d1d3ea19940fcbc7184258223103&q=Baku&aqi=yes"
      )
      .then((fetched_data) => {
        //fetched data
        const { forecast, current } = fetched_data["data"];

        const { air_quality } = current;
        console.log(air_quality);

        const { forecastday } = forecast;
        const { day } = forecastday[0];
        const { maxtemp_c, avgtemp_c, mintemp_c } = day;


        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            this.setState({
              postCenter: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              permission:true,
              map: {
                ...this.state.map,
                loading: false,
              },
              temperature: {
                ...this.state.temperature,
                data: { maxtemp_c, mintemp_c, avgtemp_c },
              },
            });
            this.handleReverseGeocode();
          },
          (err) => {
            this.setState({
              ...this.state,

              alert_status: true,
              permission: false,
              map: {
                ...this.state.map,
                loading: false,
              },
              temperature: {
                ...this.state.temperature,
                data: { maxtemp_c, mintemp_c, avgtemp_c },
              },
            });
            });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            loading: false,
          },
        });
      });
  }


  

  toggleCollapse = async (input) => {
    const types = ["pedestrian", "temperature", "air_quality", "noise_level"];
    let types_state = {};
    if (input === "pedestrian") {
       const data = await getPopulation();
      
    for (let type = 0; type < types.length; type++) {
      if (types[type] === input) {
        if(input ==='pedestria'){
          types_state[types[type]] = {
            ...this.state[input],
            display:!this.state[types[type]].display,
            min: data.min, max:data.max,avg:data.avg
          }
        }
        else{
          types_state[types[type]] = {
          ...this.state[input],
          display: !this.state[types[type]].display
        }
      }
       }else{
        types_state[types[type]] = {
          ...this.state[input],
          display:false
        }
      }
      
    }
    this.setState({
      ...this.state, ...types_state, map: {
        ...this.state.map, loading:false, markers: {
          ...this.state.map.markers, pedestrian: data.all_location_population
        }
      }
    })
    }else{

    for (let type = 0; type < types.length; type++) {
      if (types[type] === input) {
       
        types_state[types[type]] = {
          ...this.state[input],
          display: !this.state[types[type]].display
        }
       }else{
        types_state[types[type]] = {
          ...this.state[input],
          display: false
        }
      }
      
    }
    this.setState({ ...this.state, ...types_state});
  }
  };

  handleDateChange = (data) => {
    this.setState({
      ...this.state,
      user_input: {
        ...this.state.user_input,
        date_picked: data,
      },
    });
  };
  handleResetDate = () => {
    console.log("reseting");
    this.setState({
      ...this.state,
      user_input: {
        ...this.state.user_input,
        date_picked: new Date(),
      },
    });
  };

  getTemperatureDataFromApi = () => {
    const { date_picked } = this.state.user_input;
    const str = date_picked.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const date = parts[3] + "-" + months[parts[1]] + "-" + parts[2];

    let url;

    if (
      new Date() < new Date(date_picked) ||
      new Date() === new Date(date_picked)
    ) {
      url = `https://api.weatherapi.com/v1/forecast.json?key=273d1d3ea19940fcbc7184258223103&q=Baku&days=7&dt=${date}`;
    } else {
      url = `https://api.weatherapi.com/v1/history.json?key=273d1d3ea19940fcbc7184258223103&q=Baku&dt=${date}`;
    }
    this.setState({
      ...this.state,
      map: {
        ...this.state.map,
        loading: true,
      },
    });
    axios
      .get(url)
      .then((fetched_data) => {
        const { forecast } = fetched_data["data"];
        const { forecastday } = forecast;
        const { day } = forecastday[0];

        const { maxtemp_c, avgtemp_c, mintemp_c } = day;

        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            loading: false,
          },
          temperature: {
            ...this.state.temperature,
            data: { maxtemp_c, avgtemp_c, mintemp_c },
          },
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          map: {
            ...this.state.map,
            loading: false,
          },
        });
      });
  };

  toAddCampaign = () => {
    window.location.reload();
    this.props.history.push("/ad-manager/campaign-objective");
  };






  handleReverseGeocode = () => {
    Geocode.fromLatLng(
      this.state.postCenter.lat,
      this.state.postCenter.lng
    ).then(
      (response) => {
        console.log(response);
        const address = response.results[5].formatted_address;
        this.setState({ ...this.state, address });
      },
      (error) => {
        this.setState({ ...this.state, map: {
          ...this.state.map, loading: false
        } });
      }
    );
  };

  render() {
    console.log(this.state);
    const {
      map,
      pedestrian,
      temperature,
      air_quality,
      noise_level,
      user_input,
    } = this.state;

    const {min,avg,max} = pedestrian
    const renderOnMap = pedestrian.display
      ? "pedestrian"
      : temperature.display
      ? "temperature"
      : air_quality.display
      ? "air_quality"
      : noise_level.display
      ? "noise_level"
      : null;
    const { loading } = map;
    const { mintemp_c, maxtemp_c, avgtemp_c } = temperature["data"];
    const { date_picked } = user_input;
    return (
      <Fragment>
        {loading && (
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

        {!loading && (
          <div className={`${classes.dash_right}`}>
            <div className={`${classes.map} `}>
              <GoogleMap state={map} segment={renderOnMap} />
            </div>
            {air_quality.display && (
              <div
                className={`${classes.dashboard_right} ${classes.black}`}
              ></div>
            )}
            <div
              className={`${classes.dashboard_right} ${classes.new_dashboard_right}`}
            >
              <div
                className={`${classes.dashboard_collapses} ${
                  !pedestrian.display && classes.fixed_height
                }`}
              >
                <div className={classes.colapsed_items_flex}>
                  <span>
                    <img src={Pedestrian} />
                  </span>
                  <span>
                    <h3>Population</h3>
                  </span>
                  <span>
                    <Button
                      color="white"
                      onClick={() => this.toggleCollapse("pedestrian")}
                      className={classes.collapse_btn}
                      aria-expanded={true}
                    >
                      <img
                        src={`${pedestrian.display ? ChevronDown : ChevronUp}`}
                        alt="collapse icon"
                      />
                    </Button>
                  </span>
                </div>
                <div className={classes.collapsed_item_open_flex}>
                  <div
                    className={`${classes.collapsed_item} ${
                      pedestrian.display && classes.collapsed_item_open
                    }`}
                  >
                    <p className={classes.collapsed_item_p}>
                      Number of Pedestrians:
                    </p>
                    <div className={classes.measures_and_img}>
                      <img src={PedestriansMeasure} alt="measure" />
                      <span className={classes.pedestrians_measures}>
                        <p>{min}</p>
                        <p>{avg}</p>
                        <p>{max}</p>
                      </span>
                    </div>
                    <p
                      className={`${classes.collapsed_item_p} ${classes.margin_bottom_null}`}
                    >
                      Most crowded places:
                    </p>
                    <ol>
                      <li> Landau str.</li>
                      <li> Nizami str.</li>
                      <li> Matbuat ave.</li>
                      <li> 28 May mt/s.</li>
                      <li> Landau str.</li>
                      <li> Nizami str.</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.dashboard_collapses} ${
                  !temperature.display && classes.fixed_height_temp
                }`}
              >
                <div className={classes.colapsed_items_flex}>
                  <span>
                    <img src={Temperature} />
                  </span>
                  <span>
                    <h3>Temperature</h3>
                  </span>
                  <span>
                    <Button
                      color="white"
                      onClick={() => this.toggleCollapse("temperature")}
                      className={classes.collapse_btn}
                      aria-expanded={true}
                    >
                      <img
                        src={`${temperature.display ? ChevronDown : ChevronUp}`}
                        alt="collapse icon"
                      />
                    </Button>
                  </span>
                </div>
                <div className={classes.temp_info_cont}>
                  <span className={classes.collapsed_item_border}></span>
                  <div className={classes.temp_measurements}>
                    <span>
                      <p>Average:</p>
                      <span>{`${avgtemp_c}°C`}</span>
                    </span>
                    <span>
                      <p>Lowest:</p>
                      <span>{`${mintemp_c}°C`}</span>
                    </span>
                    <span>
                      <p>Hottest:</p>
                      <span>{`${maxtemp_c}°C`}</span>
                    </span>
                  </div>
                </div>

                <div className={classes.collapsed_item_open_flex}>
                  <div
                    className={`${classes.collapsed_item} ${
                      temperature.display && classes.collapsed_item_open
                    }`}
                  >
                    <p
                      className={`${classes.collapsed_item_p} ${classes.margin_bottom_reduce}`}
                    >
                      Show tempature of:
                    </p>
                    <div className={classes.date_picker_cont} id="date-picker">
                      <DatePicker
                        className={`${classes.date_picker}`}
                        format="yyyy-MM-dd"
                        //picker="date"
                        isClearable
                        selected={date_picked}
                        minDate={
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() - 4
                          )
                        }
                        maxDate={
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate() + 6
                          )
                        }
                        onChange={(data) => this.handleDateChange(data)}
                        placeholderText="Select date"
                      />
                      <span className={classes.date_picker_icon}>
                        <img src={DateIcon} alt="date-picker icon" />
                      </span>
                    </div>
                    <div className={classes.data_picker_btn_group}>
                      <button onClick={this.handleResetDate}>Reset</button>
                      <button onClick={this.getTemperatureDataFromApi}>
                        Show <img src={ChevronRight} alt="button icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.dashboard_collapses} ${
                  !air_quality.display && classes.fixed_height
                }`}
              >
                <div className={classes.colapsed_items_flex}>
                  <span>
                    <img src={AirQuality} />
                  </span>
                  <span>
                    <h3>Airquality</h3>
                  </span>
                  <span>
                    <Button
                      color="white"
                      onClick={() => this.toggleCollapse("air_quality")}
                      className={classes.collapse_btn}
                      aria-expanded={true}
                    >
                      <img
                        src={`${air_quality.display ? ChevronDown : ChevronUp}`}
                        alt="collapse icon "
                      />
                    </Button>
                  </span>
                </div>
                <div className={classes.collapsed_item_open_flex}>
                  <div
                    className={`${classes.collapsed_item} ${
                      air_quality.display && classes.collapsed_item_open
                    }`}
                  >
                    <p className={classes.collapsed_item_p}>
                      Airquality diagram:
                    </p>
                    <div className={classes.measures_and_img}>
                      <img src={PedestriansMeasure} alt="measure" />
                      <span className={classes.pedestrians_measures}>
                        <p>Poor</p>
                        <p>Moderate</p>
                        <p>Good</p>
                      </span>
                    </div>
                    <p
                      className={`${classes.collapsed_item_p} ${classes.margin_bottom_null}`}
                    >
                      Best places:
                    </p>
                    <ol>
                      <li> Landau str.</li>
                      <li> Nizami str.</li>
                      <li> Matbuat ave.</li>
                      <li> 28 May mt/s.</li>
                      <li> Landau str.</li>
                      <li> Nizami str.</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.dashboard_collapses} ${
                  !noise_level.display && classes.fixed_height
                }`}
              >
                <div className={classes.colapsed_items_flex}>
                  <span>
                    <img src={NoiseLevel} />
                  </span>
                  <span>
                    <h3>NoiseLevel</h3>
                  </span>
                  <span>
                    <Button
                      color="white"
                      onClick={() => this.toggleCollapse("noise_level")}
                      className={classes.collapse_btn}
                      aria-expanded={true}
                    >
                      <img
                        src={`${noise_level.display ? ChevronDown : ChevronUp}`}
                        alt="collapse icon"
                      />
                    </Button>
                  </span>
                </div>
                <div className={classes.collapsed_item_open_flex}>
                  <div
                    className={`${classes.collapsed_item} ${
                      noise_level.display && classes.collapsed_item_open
                    }`}
                  >
                    <p className={classes.collapsed_item_p}>
                      Noise level diagram:
                    </p>
                    <div className={classes.measures_and_img}>
                      <img src={PedestriansMeasure} alt="measure" />
                      <span className={classes.pedestrians_measures}>
                        <p>Poor</p>
                        <p>Moderate</p>
                        <p>Good</p>
                      </span>
                    </div>
                    <p
                      className={`${classes.collapsed_item_p} ${classes.margin_bottom_null}`}
                    >
                      Best places:
                    </p>
                    <ol>
                      <li> Landau str.</li>
                      <li> Nizami str.</li>
                      <li> Matbuat ave.</li>
                      <li> 28 May mt/s.</li>
                      <li> Landau str.</li>
                      <li> Nizami str.</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div
                className={`${classes.dashboard_collapses} ${classes.fixed_height}`}
              >
                <div className={classes.colapsed_items_flex}>
                  <span>
                    <img src={Plus} />
                  </span>
                  <span>
                    <h3> Create Ad Campaign</h3>
                  </span>
                  <span>
                    <Button
                      onClick={this.toAddCampaign}
                      className={classes.collapse_btn}
                      color="white"
                      aria-expanded={true}
                    >
                      <img src={`${Add}`} alt="collapse icon" />
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(null, { changeSideBar })(withRouter(Dashboards));

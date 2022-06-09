import React, { Component, Fragment } from "react";

//Import Breadcrumb

import Chart from "react-apexcharts";
import firebase from "firebase";

import PieChart from "./pieChart";
import PeopleReachedByWeekDay from "./peopleReachedByWeekDays";
import SeenByWeekDay from "./seenbyWeekDay";
import AudienceDemographicsPieChart from "./audienceDemographics";
import AgeOfReachedDemographics from "./ageChartReachedDemographics";
import AdEngagements from "./adEngagements";

import ArrowRight from "../../assets/css/analitics/Vector.svg";
//import classes
import classes from "../../assets/css/analitics/index.module.css";
import "../../assets/css/app.css";
import axios from "axios";

import { Link } from "react-router-dom";
import Impressions_and_Views from "./peopleImpressionsAndViews";

import HeadSearch from '../../components/CommonForBoth/Headsearch'

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

class CampaignAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveAnalytics: false,
      peopleReached: "",
      audience: {
        audience_female_total: 0,
        audience_male_total: 0,
        audience_android_total: 0,
        audience_ios_total: 0,
        people_reached_total: 0,
        people_reached_total_Views: 0,
        people_reached_categories: "",
        audience_female: [],
        audience_male: [],
        audience_platformType: [],
        weekly_driven_mileage: [],
        weekly_driven_mileage_cat: [],
        people_reached: []
      },
      rasberry: [],
      seriesRadialBar: [76],
      optionsRadialBar: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5,
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Average Results"],
      },
      optionsMileage: {
        colors: ["#7356C0"],
        chart: {
          id: "apexchart-example",
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
          },
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: [
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
              ],
              fontSize: "12",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        title: {
          text: "Weekly Driven miles Report",
          style: {
            fontFamily: "Montserrat",
            color: "#192038",
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
        subtitle: {
          text: "How many miles weekly driven",
          style: {
            fontFamily: "Montserrat",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.0015em",
            color: "#8F9BB3",
          },
        },
        seriesMileage: [
          {
            name: "Driven Mileage",
            data: [],
          },
        ],
      },
      options: {
        chart: {
          id: "apexchart-example",
        },
        colors: ["#3F2B89"],
        stroke: {
          curve: "smooth",
          width: 2,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ["Mon", " Tue", "Wed", "Thu", "Fri", "Sat", " Sun"],
          labels: {
            style: {
              colors: [
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
                "#8F9BB3",
              ],
              fontSize: "12",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
        title: {
          text: "Weekly people reach Report",
          style: {
            fontFamily: "Montserrat",
            color: "#192038",
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
        subtitle: {
          text: "Campaign Weekly Performance",
          style: {
            fontFamily: "Montserrat",
            fontSize: "14px",
            lineHeight: "20px",
            letterSpacing: "0.0015em",
            color: "#8F9BB3",
          },
        },
      },
      series: [
        {
          name: "Reached People",
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }

    this.getAnbalyticsfromApi();

    //this.handleConnectionToFirebaseRealTimeDatabase();
  }

  handleConnectionToFirebaseRealTimeDatabase = () => {
    let ref = firebase.database().ref("wifi/RPCHICAGO01/Kismet");
    ref.on("value", (snapshot) => {
      const newValue = snapshot.val();
      //Convert Objects into Array
      let newArrayOfDrivers = Object.values(newValue);

      this.setState({
        ...this.state,
        rasberry: JSON.parse(newValue),
        loaded: true,
      });
    });
  };

  getAnbalyticsfromApi = () => {

    const email = sessionStorage.getItem('authUser')
    this.setState({ ...this.state, loaded: false });
    axios
      .get(
        `https://backendapp.murmurcars.com/api/v1/campaignanalytics/allcampaignAnalytics/${email}`
      )
      .then((analytics) => {
        
        const { resp } = analytics["data"];
        const { ad_analytics } = resp;
        
        let audience_female = [];
        let audience_male = [];
        let audience_platformType = [];
        let audience_female_total = 0;
        let audience_male_total = 0;
        let audience_ios_total = 0;
        let audience_android_total = 0;
        let people_reached_total = 0;
        let people_reached = [];
        let people_reached_categories = [];
        let people_reached_total_Views = [];
        const categories = [];
        const weekly_driven_mileage = [];
        for (let i = 0; i < ad_analytics.length; i++) {
          audience_female_total += Number.parseInt(
            ad_analytics[i].audience_female.count
          );

          audience_male_total += Number.parseInt(
            ad_analytics[i].audience_male.count
          );

          audience_ios_total += Number.parseInt(
            ad_analytics[i].audience_platformType.ios
          );

          audience_android_total += Number.parseInt(
            ad_analytics[i].audience_platformType.android
          );
          people_reached.push(
            Number.parseInt(ad_analytics[i].people_reached_Impressions)
          );
          people_reached_total += Number.parseInt(
            ad_analytics[i].people_reached_Impressions
          );
          people_reached_total_Views += Number.parseInt(
            ad_analytics[i].people_reached_Views
          );
          people_reached_categories.push(ad_analytics[i].date);
          audience_female.push(ad_analytics[i].audience_female);
          audience_male.push(ad_analytics[i].audience_male);
          audience_platformType.push(ad_analytics[i].audience_platformType);

          const category = new Date(ad_analytics[i].date)
            .toDateString()
            .split(" ")[0]

          weekly_driven_mileage.push(
            Number.parseInt(ad_analytics[i].driven_mileage)
          );
          categories.push(category);
        }


        this.setState({
          ...this.state,
          haveAnalytics: true,
          loaded: true,
          audience: {
            audience_male,
            audience_female,
            audience_platformType,
            audience_android_total,
            audience_ios_total,
            audience_female_total,
            audience_male_total,
            people_reached_total,
            people_reached_categories,
            weekly_driven_mileage,
            weekly_driven_mileage_cat: categories,
            people_reached,

          },
          series: [
            {
              name: "Reached People",
              data: people_reached,
            },
          ],
          optionsMileage: {
            ...this.state.optionsMileage,
            xaxis: {
              ...this.state.optionsMileage.xaxis,
              categories,
            },
            seriesMileage: [
              {
                name: "Driven Mileage",
                data: weekly_driven_mileage,
              },
            ],
          },
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, haveAnalytics: false, loaded: true });
      });
  };

  handleTimeFilter = (event, type) => {
    let seriesMileage = []
    let series = []
    let series_type =''
    let filter = event.target.value;
    let categories,
      colors = [];
    let text,
      subtext = "";
    if (filter === "Weekly") {
      categories = this.state.audience.weekly_driven_mileage_cat;
      colors = [
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
      ];
      if (type === "options") {
        text = "Weekly people reach Report";
        subtext = "Campaign Weekly Performance";
        series = [
          {
            name: "Reached People",
            data: this.state.audience.people_reached,
          },
        ]
      } else {
        text = "Weekly driven miles report";
        subtext = "How many miles weekly driven";
        seriesMileage = [
          {
            name: "Driven Mileage",
            data: this.state.audience.weekly_driven_mileage
          }
        ]
      }
  
    } else if (filter === "Monthly") {
      categories = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      colors = [
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
      ];
      if (type === "options") {
        text = "Monthly people reach Report";
        subtext = "Campaign Monthly Performance";
        series = [
          {
            name: "Reached People",
            data: 
            [
              this.state.audience.people_reached.reduce(
                (t, el) => t + el
              ),
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ]
          },
        ]
      } else {
        text = "Monthly driven miles report";
        subtext = "How many miles monthly driven";
        seriesMileage = [
          {
            name: "Driven Mileage",
            data:
                [
                    this.state.audience.weekly_driven_mileage.reduce(
                      (t, el) => t + el
                    ),
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                  ]
          }
        ]
      }

    } else if (filter === "Annualy") {
      categories = [
        "2000",
        "2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
      ];
      colors = [
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
        "#8F9BB3",
      ];
      if (type === "options") {
        text = "Annualy people reach Report";
        subtext = "Campaign Annualy Performance";
        series = [
          {
            name: "Reached People",
            data: 
            [
              this.state.audience.people_reached.reduce(
                (t, el) => t + el
              ),
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ]
          },
        ]
      } else {
        text = "Annualy driven miles report";
        subtext = "How many miles annualy driven";
        seriesMileage = [
          {
            name: "Driven Mileage",
            data:
             
                [
                    this.state.audience.weekly_driven_mileage.reduce(
                      (t, el) => t + el
                    ),
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                  ]
                
          }
        ]
      }
  
    }
    this.setState({
      ...this.state,
      [type]: {
        ...this.state[type],
        xaxis: {
          ...this.state[type].xaxis,
          categories,
          labels: {
            ...this.state[type].xaxis.labels,
            style: { ...this.state[type].xaxis.labels.style, colors },
          },
        },
        title: {
          ...this.state[type].title,
          text,
        },
        subtitle: {
          ...this.state[type].subtitle,
          text: subtext,
        },
        seriesMileage,
     
      },
      series
    });
  };

  render() {
    console.log(this.state);
    const { haveAnalytics, loaded, audience } = this.state;
    const {
      audience_male_total,
      audience_female_total,
      audience_android_total,
      audience_ios_total,
      people_reached_total,
      people_reached_total_Views,
      people_reached_categories,
    } = audience;
    return (
      <Fragment>
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
        {loaded && (
          <div className={classes.dash_right}>
            <HeadSearch/>

            {/* <!-- analytics block -->*/}
            <div
              className={`${classes.analytics_block} ${
                !haveAnalytics && classes.no_analytics_block
              }`}
            >
              {!haveAnalytics && (
                <React.Fragment>
                  <div className={classes.no_analytics_alert}>
                    <h1>No active campaign was found! Please create an ad!</h1>
                    <Link to="/ad-manager/campaign-objective">Create Ad +</Link>
                  </div>
                </React.Fragment>
              )}
              {haveAnalytics && (
                <React.Fragment>
                  {/* <div
                    className={`${classes.week_block} ${classes.analytics_item} ${classes.hide_toolbar}`}
                  >
                    <Chart
                      options={this.state.options}
                      series={this.state.series}
                      type="area"
                      width="100%"
                      height={400}
                    />
                    <span
                      style={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: "white",
                        position: "absolute",
                        top: "5px",
                        right: 0,
                        zIndex: 100,
                      }}
                    ></span>
                    <div className={classes.weekly_select}>
                      <div className="position-relative">
                        <select
                          name="adCategory"
                          id="step-categories"
                          className={classes.analytics_select_item}
                          onChange={(event) =>
                            this.handleTimeFilter(event, "options")
                          }
                        >
                           <option value="Weekly">Weekly</option> <option value="Monthly">Monthly</option> <option value="Annualy">Annualy</option> 
                        </select>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 16.8C11.3 16.8 10.6 16.53 10.07 16L3.55002 9.48001C3.26002 9.19001 3.26002 8.71001 3.55002 8.42001C3.84002 8.13001 4.32002 8.13001 4.61002 8.42001L11.13 14.94C11.61 15.42 12.39 15.42 12.87 14.94L19.39 8.42001C19.68 8.13001 20.16 8.13001 20.45 8.42001C20.74 8.71001 20.74 9.19001 20.45 9.48001L13.93 16C13.4 16.53 12.7 16.8 12 16.8Z"
                            fill="#2E3A59"
                          />
                        </svg>
                      </div>
                    </div>
                    <img src={ArrowDown} alt="" className={classes.step_select_icon} />
                  </div> */}
                  <div className={classes.analytics_row}>
                    <div
                      className={`${classes.analytic_col} ${classes.analytic_col_2}`}
                    >
                      <div className={classes.analytic_col_span}>
                        <h1>Impressions</h1>
                        <span>{people_reached_total}</span>
                        {/* <a>
                          View Details <img src={ArrowRight} />
                        </a> */}
                      </div>
                      <div
                        className={`${classes.analytics_item} ${classes.reach_item}`}
                      >
                        <PeopleReachedByWeekDay
                          categories={people_reached_categories}
                        />
                      </div>
                    </div>
                    <div
                      className={`${classes.analytic_col} ${classes.analytic_col_2}`}
                    >
                      <div className={classes.analytic_col_span}>
                        <h1>Views</h1>
                        <span>{people_reached_total_Views}</span>
                        {/* <a>
                          View Details <img src={ArrowRight} />
                        </a> */}
                      </div>
                      <div
                        className={`${classes.analytics_item} ${classes.reach_item}`}
                      >
                        <PeopleReachedByWeekDay
                          categories={people_reached_categories}
                        />
                      </div>
                    </div>

                    {/* <div
                      className={`${classes.analytic_col} ${classes.analytic_col_2}`}
                    >
                      <div className={classes.analytic_col_span}>
                        <h1>Avarage time seen</h1>
                        <span>10h</span>
                        <a href="#">
                          View Details <img src={ArrowRight} />
                        </a>
                      </div>
                      <div
                        className={`${classes.analytics_item} ${classes.reach_item}`}
                      >
                        <SeenByWeekDay />
                      </div>
                    </div> */}
                  </div>
                  {/* <div
                    className={`${classes.week_block} ${classes.analytics_item}`}
                  >
                     <Chart
                      options={this.state.optionsMileage}
                      series={this.state.optionsMileage.seriesMileage}
                      type="bar"
                      width="100%"
                      height={400}
                    /> 
                    <div className={classes.weekly_select}>
                      <div className="position-relative">
                        <select
                          name="adCategory"
                          id="step-categories"
                          className={classes.analytics_select_item}
                          onChange={(event) =>
                            this.handleTimeFilter(event, "optionsMileage")
                          }
                        >
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Annualy">Annualy</option>
                        </select>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 16.8C11.3 16.8 10.6 16.53 10.07 16L3.55002 9.48001C3.26002 9.19001 3.26002 8.71001 3.55002 8.42001C3.84002 8.13001 4.32002 8.13001 4.61002 8.42001L11.13 14.94C11.61 15.42 12.39 15.42 12.87 14.94L19.39 8.42001C19.68 8.13001 20.16 8.13001 20.45 8.42001C20.74 8.71001 20.74 9.19001 20.45 9.48001L13.93 16C13.4 16.53 12.7 16.8 12 16.8Z"
                            fill="#2E3A59"
                          />
                        </svg>
                      </div>
                    </div>
                  </div> */}
                  <div className={classes.audience_row}>
                    <div className={classes.audience_col}>
                      <div className={classes.audience_item}>
                        <p className={classes.audience_p}>
                          Audience Demographics
                        </p>
                        <div className={classes.audience_chart}>
                          <AudienceDemographicsPieChart
                            Male={audience_male_total}
                            Female={audience_female_total}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.audience_col}>
                      <div className={classes.audience_item}>
                        <p className={classes.audience_p}>
                          Audience by Platform
                        </p>
                        <div className={classes.audience_chart}>
                          <PieChart
                            Android={audience_android_total}
                            IOS={audience_ios_total}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={classes.audience_col}>
                      <div className={classes.audience_item}>
                        <p className={classes.audience_p}>
                          Audience Engagements
                        </p>
                        <div className={classes.audience_chart}>
                          <Impressions_and_Views
                            Impressions={Number(people_reached_total)}
                            Views={Number(people_reached_total_Views)}
                          />
                          {/* <AdEngagements
                           
                            campaign1={"Impressions"}
                            campaign2={"Views"}
                          />{" "} */}
                        </div>
                      </div>
                    </div>
                    {/* <div className={classes.audience_col}>
                      <div className={classes.audience_item}>
                        <p className={classes.audience_p}>Audience by Age</p>
                        <div className={classes.audience_chart}>
                          <AgeOfReachedDemographics
                            a={0}
                            b={0}
                            c={0}
                            d={0}
                            e={0}
                          />
                        </div>
                      </div>
                    </div> */}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default CampaignAnalytics;

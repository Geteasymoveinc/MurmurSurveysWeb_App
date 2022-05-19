import React, { Component, Fragment } from "react";

//Import Breadcrumb

import Chart from "react-apexcharts";

import PieChart from "../../assets/charts/pieChart";
import PeopleReachedByWeekDay from "../../assets/charts/peopleReachedByWeekDays";
import SeenByWeekDay from "../../assets/charts/seenbyWeekDay";
import AudienceDemographicsPieChart from "../../assets/charts/audienceDemographics";
import AgeOfReachedDemographics from "../../assets/charts/ageChartReachedDemographics";
import AdEngagements from "../../assets/charts/adEngagements";

import ArrowRight from "../../assets/css/analitics/Vector.svg";
//import classes
import classes from "../../assets/css/analitics/index.module.css";
import "../../assets/css/app.css";
import axios from "axios";

import { Link } from "react-router-dom";

class CampaignAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      haveAnalytics: true,
      peopleReached: "",
      audience: {
        ad_campaign_name: "",
        advertisers_email: "",
        audience_female_total: 0,
        audience_male_total: 0,
        audience_android_total: 0,
        audience_ios_total: 0,
        people_reached_total: 0,
        analytics_date: [],
        impressions: [],
        audience_female: [],
        audience_male: [],
        audience_platformType: [],
        weekly_driven_mileage: [],
        weekly_driven_mileage_cat: [],
        people_reached: [],
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
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
    this.getAnbalyticsfromApi();
  }

  getAnbalyticsfromApi = () => {
    this.setState({ ...this.state, loaded: false });
    axios
      .get(
        `https://backendapp.murmurcars.com/api/v1/campaignanalytics/allcampaignAnalytics/${this.props.email}`
      )
      .then((analytics) => {
      console.log(analytics)
        const data = analytics["data"];
        const {
          people_reached,
          analytics_date,
          impressions,
          audience_female,
          audience_male,
          ios,
          android,
          ad_campaign_name,
          people_reached_total,
          advertisers_email,
        } = data;
         
        this.setState({
          ...this.state,
          haveAnalytics: true,
          loaded: true,
          audience: {
            ad_campaign_name,
            advertisers_email,
            audience_male,
            audience_female,
            audience_android_total: android,
            audience_ios_total: ios,
            audience_female_total: audience_female,
            audience_male_total: audience_male,
            people_reached_total: people_reached_total,
            people_reached,
            analytics_date,
            impressions
          },
          series: [
            {
              name: "Reached People",
              data: Object.values(people_reached.week),
            },
          ],
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, haveAnalytics: false, loaded: true });
      });
  };

  handleTimeFilter = (event, type) => {
    let seriesMileage = [];
    let series = [];
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
            data: Object.values(this.state.audience.people_reached.week),
          },
        ];
        categories =Object.keys(this.state.audience.people_reached.week)
      } else {
        text = "Weekly driven miles report";
        subtext = "How many miles weekly driven";
        seriesMileage = [
          {
            name: "Driven Mileage",
            data: this.state.audience.weekly_driven_mileage,
          },
        ];
      }
    } else if (filter === "Monthly") {
      categories =Object.keys(this.state.audience.people_reached.month)
   
      if (type === "options") {
        text = "Monthly people reach Report";
        subtext = "Campaign Monthly Performance";
        series = [
          {
            name: "Reached People",
            data: Object.values(this.state.audience.people_reached.month)
          },
        ];
  
      } else {
        text = "Monthly driven miles report";
        subtext = "How many miles monthly driven";
        seriesMileage = [
          {
            name: "Driven Mileage",
            data: [
              this.state.audience.weekly_driven_mileage.reduce(
                (t, el) => t + el
              ),
              0,
              0,
              0,
              0,
              0,
              0,
            ],
          },
        ];
      }
    } else if (filter === "Annualy") {
      categories =Object.keys(this.state.audience.people_reached.year)
      
      if (type === "options") {
        text = "Annualy people reach Report";
        subtext = "Campaign Annualy Performance";
        series = [
          {
            name: "Reached People",
            data: Object.values(this.state.audience.people_reached.year),
          },
        ];
      } else {
        text = "Annualy driven miles report";
        subtext = "How many miles annualy driven";
        seriesMileage = [
          {
            name: "Driven Mileage",
            data: [
              this.state.audience.weekly_driven_mileage.reduce(
                (t, el) => t + el
              ),
            ],
          },
        ];
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
            style: { ...this.state[type].xaxis.labels.style },
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
      series,
    });
  };

  render() {
    const { haveAnalytics, loaded, audience } = this.state;
    const {
      audience_male_total,
      audience_female_total,
      audience_android_total,
      audience_ios_total,
      people_reached_total,
      analytics_date,
      ad_campaign_name,
      advertisers_email,
      impressions,
    } = audience;



    console.log(impressions, analytics_date)
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
                <h1 className={classes.analytics_campaign_name}>
                  {" "}
                  {`${ad_campaign_name} By
                  ${advertisers_email}`}
                </h1>
                <div
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
                  {/*<img src={ArrowDown} alt="" className={classes.step_select_icon} />*/}
                </div>
                <div className={classes.analytics_row}>
                  <div
                    className={`${classes.analytic_col} ${classes.analytic_col_2}`}
                  >
                    <div className={classes.analytic_col_span}>
                      <h1>People Reached</h1>
                      <span>{people_reached_total}</span>
                      <a>
                        View Details <img src={ArrowRight} />
                      </a>
                    </div>
                    <div
                      className={`${classes.analytics_item} ${classes.reach_item}`}
                    >
                   <PeopleReachedByWeekDay
                        categories={analytics_date}
                        series={impressions}
                      />
                    </div>
                  </div>

                  <div
                    className={`${classes.analytic_col} ${classes.analytic_col_2}`}
                  >
                    <div className={classes.analytic_col_span}>
                      <h1>Avarage time seen</h1>
                      <span>0</span>
                      <a href="#">
                        View Details <img src={ArrowRight} />
                      </a>
                    </div>
                    <div
                      className={`${classes.analytics_item} ${classes.reach_item}`}
                    >
                      <SeenByWeekDay />
                    </div>
                  </div>
                </div>
                {/*<div
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
                      </div>*/}
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
                      <p className={classes.audience_p}>Audience by Platform</p>
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
                  </div>
                  <div className={classes.audience_col}>
                    <div className={classes.audience_item}>
                      <p className={classes.audience_p}>Audience Engagements</p>
                      <div className={classes.audience_chart}>
                        <AdEngagements
                          engagements_campaign1={0}
                          engagements_campaign2={0}
                          campaign1={"Ad_A"}
                          campaign2={"Ad_B"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default CampaignAnalytics;

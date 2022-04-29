import React, { Component, Fragment } from "react";

import PulledSurveys from "./pulledSurveys";

import SearchNormal from "../../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

//import classes
import classes from "../../../assets/css/analitics/index.module.css";
import classes2 from "../../../assets/css/Dashboard/dashboard.module.css";
import classes3 from "../../../assets/css/CreateAd/index.module.css";
import classes4 from "../../../assets/css/surveys/index.module.css";

import "../../../assets/css/app.css";
import axios from "axios";

import Statistics_Chart from "./charts/line-chart";
import BarHorisontal from "./charts/bar-chart";

class CampaignAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      campaigns: {
        surveys: "week",
        campaigns: "week",
        week: {
          total: 250,
          improvement: 25,
          series: [1000, 2000, 4000, 2500, 6000],
        },
        month: {
          total: 870,
          improvement: 55,
          series: [4000, 7000, 5000, 8000, 12000],
        },
        year: {
          total: 1100,
          improvement: 78,
          series: [10000, 8700, 12000, 11000, 13000],
        },
      },
      users: {
        users: "week",
        chart: "week",
        week: {
          total: 1200,
          active: 800,
          improvement: 40,
          series: [1000, 2000, 4000, 2500, 6000,8000,7500],
          categories: ["Mon", " Tue", "Wed", "Thu", "Fri", "Sat", " Sun"],
        },
        month: {
          total: 5000,
          active: 2800,
          improvement: 30,
          series: [4000, 7000, 5000, 8000, 12000,9500,11000,12500,13000,112000,12000,125000],
          categories: [
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
          ],
        },
        year: {
          total: 9000,
          active: 6000,
          improvement: 60,
          series: [10000, 8700, 12000, 11000, 13000,15000,10000,11000,13000,9000,11000,11500],
          categories: [
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
          ],
        },
      },
    };
  }

  pickTimeFrame = (e, category, key) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [category]: {
        ...this.state[category],
        [key]: value,
      },
    });
  };

  render() {
    const { loaded } = this.state;
    const { surveys, campaigns } = this.state.campaigns;
    const { campaigns: campaigns_data, users: users_data } = this.state;
    const { users, chart } = this.state.users;
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
            <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Analytics</h1>
              <form onSubmit={this.submitLocationToZoomIn}>
                <div
                  className={`${classes.dash_relative} ${classes.search_box}`}
                >
                  <input type="text" placeholder="Search" />
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

            {/* <!-- analytics block -->*/}
            {this.props.match.isExact && !this.props.location.search && (
              <>
                <div
                  className={`${classes.analytics_block} ${classes.no_analytics_block} ${classes2.flex_analytics_container}`}
                >
                  <div className={classes2.analytics_block_row}>
                    <div className={classes2.card_analytics}>
                      <div className={classes2.card_analytics_data}>
                        <div>
                          <h1>Total active Outdoor Ads.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {campaigns_data[campaigns].total}
                          </p>
                        </div>
                        <p>
                          <strong>
                            {campaigns_data[campaigns].improvement}%{" "}
                          </strong>
                          improvement
                        </p>
                      </div>
                      <div className={classes2.card_analytics_chart}>
                        <div className={classes2.time_picker}>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "campaigns", "campaigns")
                            }
                          >
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="year">Last Year</option>
                          </select>
                        </div>
                        <Statistics_Chart
                          colors={["#3F2B89"]}
                          series={campaigns_data[campaigns].series}
                          time={campaigns}
                        />
                      </div>
                    </div>

                    <div
                      className={`${classes2.card_analytics} ${classes2.card_analytics_2}`}
                    >
                      <div className={classes2.card_analytics_data}>
                        <div>
                          <h1>Total active Surveys.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {campaigns_data[surveys].total}
                          </p>
                        </div>
                        <p>
                          <strong>
                            {campaigns_data[surveys].improvement}%{" "}
                          </strong>
                          improvement
                        </p>
                      </div>
                      <div className={classes2.card_analytics_chart}>
                        <div className={classes2.time_picker}>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "campaigns", "surveys")
                            }
                          >
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="year">Last Year</option>
                          </select>
                        </div>
                        <Statistics_Chart
                          colors={["#DB9841"]}
                          series={campaigns_data[surveys].series}
                          time={surveys}
                        />
                      </div>
                    </div>

                    <div className={classes2.analytics_info_box}>
                      <div className={classes2.flexbox_info_box}>
                        <div>
                          <h1>Total Users.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {users_data[users].total}
                          </p>
                        </div>
                        <div>
                          <p className={classes2.margin_bottom_zero}>
                            <strong>{users_data[users].improvement}% </strong>
                            improvement
                          </p>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "users", "users")
                            }
                          >
                            <option value="week">Since last week</option>
                            <option value="month">Since last month</option>
                            <option value="year">Since last year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={classes2.analytics_block_row}>
                    <div className={classes2.chart_and_info_box}>
                      <div className={classes2.header_info_box}>
                        <spam>
                          <label>Total users</label>
                          <p>{users_data[chart].total}</p>
                        </spam>
                        <spam>
                          <label>Period</label>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "users", "chart")
                            }
                          >
                            <option value="week">Last Week</option>
                            <option value="month">Last Month</option>
                            <option value="year">Last Year</option>
                          </select>
                        </spam>
                        <spam>
                          <label>Active users</label>
                          <p>{users_data[chart].active}</p>
                        </spam>
                        <spam>
                          <label>Change</label>
                          <p className={classes2.data_change_percent}>
                            {users_data[chart].improvement}%
                          </p>
                        </spam>
                      </div>
                      <div className={classes2.chart}>
                        <BarHorisontal
                          series={users_data[chart].series}
                          heighest={Math.max(...users_data[chart].series)}
                          categories = {users_data[chart].categories}
                          time={chart}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={classes3.ads_section}>
                    <div
                      className={`${classes3.cads_head} `}
                    >
                      <h4 className={classes3.cads_h4}>
                        Most recent Campaigns
                      </h4>
                    </div>
                    <PulledSurveys data={this.state} />
                  </div>
                </div>
              </>
            )}
            {this.props.match.isExact &&
              this.props.location.search.length > 0 && ( //details
                <PulledSurveys data={this.state} />
              )}
          </div>
        )}
      </Fragment>
    );
  }
}

export default CampaignAnalytics;

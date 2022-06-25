import React, { Component, Fragment } from "react";

import PulledCampaigns from "./pulledCampaigns";

import SearchNormal from "../../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

//import classes
import classes from "../../../assets/css/analitics/index.module.css";
import classes2 from "../../../assets/css/Dashboard/dashboard.module.css";
import classes3 from "../../../assets/css/CreateAd/index.module.css";
import "../../../assets/css/app.css";

import Statistics_Chart from "./charts/line-chart";
import BarHorisontal from "./charts/bar-chart";

import { connect } from "react-redux";
import { fetchUserAnalytics, fetchCampaigns } from "../../../store/actions";

class CampaignAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      campaigns: this.props.campaigns,
      surveys: this.props.surveys,
      users: this.props.users,
      partners: this.props.partners,
      ad_customers: this.props.ad_customers,
      ad_partners: this.props.ad_partners,
    };
    this.async = null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      const users = this.props.users;
      const campaigns = this.props.campaigns;
      const surveys = this.props.surveys;
      const partners = this.props.partners;
      const ad_customers = this.props.ad_customers;
      const ad_partners = this.props.ad_partners;
      this.setState({
        ...this.state,
        loaded: false,
        users,
        campaigns,
        surveys,
        partners,
        ad_customers,
        ad_partners,
      });

      this.async = setTimeout(() => {
        if (!this.state.loaded) {
          this.setState({
            ...this.state,
            loaded: true,
          });
        }
      }, 2000);
    }
  }
  componentDidMount() {
    this.props.fetchUserAnalytics(
      "https://backendapp.murmurcars.com/api/v1/admin/get-users-statistic"
    );
    this.props.fetchCampaigns(
      "https://backendapp.murmurcars.com/api/v1/admin/get-campaigns"
    );
  }

  componentWillUnmount() {
    clearTimeout(this.async);
  }

  pickTimeFrame = (e, category, key) => {
    const value = e.target.value;
    console.log(value, category, key)
    this.setState({
      ...this.state,
      [category]: {
        ...this.state[category],
        [key]: value,
      },
    });
  };

  render() {
    const { campaigns } = this.state.campaigns;
    const { surveys } = this.state.surveys;
    const { partners } = this.state.partners;
    const { time: ad_customers_time } = this.state.ad_customers;
    const { time: ad_partners_time } = this.state.ad_partners;

    const {
      campaigns: campaigns_data,
      users: users_data,
      surveys: survey_data,
      partners: partners_data,
      ad_customers,
      ad_partners,
      loaded,
    } = this.state;
    const { users, chart } = this.state.users;
 



    return (
      <Fragment>
        {(this.props.loading || !loaded) && (
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
        {!this.props.loading && loaded && (
          <div className={classes.dash_right}>
            <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Dashboard</h1>
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
                  className={`${classes.analytics_block} ${classes2.flex_analytics_container}`}
                >
                  <div className={classes2.analytics_block_flex}>
                    <div className={classes2.card_analytics}>
                      <div className={classes2.card_analytics_data}>
                        <div>
                          <h1>Total Outdoor Ads.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {campaigns_data[campaigns].total}
                          </p>
                        </div>
                        <p>
                          <strong>
                            {campaigns_data[campaigns].improvement}{" "}
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
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </div>
                        <Statistics_Chart
                          colors={["#3F2B89"]}
                          series={campaigns_data[campaigns].series}
                          categories={campaigns_data[campaigns].categories}
                          name={"Campaigns"}
                          time={campaigns}
                          loaded={this.state.loaded}
                        />
                      </div>
                    </div>

                    <div
                      className={`${classes2.card_analytics} ${classes2.card_analytics_2}`}
                    >
                      <div className={classes2.card_analytics_data}>
                        <div>
                          <h1>Total Surveys.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {survey_data[surveys].total}
                          </p>
                        </div>
                        <p>
                          <strong>{survey_data[surveys].improvement} </strong>
                          improvement
                        </p>
                      </div>
                      <div className={classes2.card_analytics_chart}>
                        <div className={classes2.time_picker}>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "surveys", "surveys")
                            }
                          >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </div>
                        <Statistics_Chart
                          colors={["#DB9841"]}
                          series={survey_data[surveys].series}
                          categories={survey_data[surveys].categories}
                          time={surveys}
                          name={"Surveys"}
                          loaded={this.state.loaded}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes2.analytics_block_grid}>
                    <div className={classes2.analytics_info_box}>
                      <div className={classes2.flexbox_info_box}>
                        <div>
                          <h1>Ad Portal Customers.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {users_data[users].total}
                          </p>
                        </div>
                        <div>
                          <p className={classes2.margin_bottom_zero}>
                            <strong>{users_data[users].improvement} </strong>
                            improvement
                          </p>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "users", "users")
                            }
                          >
                            <option value="week"> Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className={classes2.chart_and_info_box}>
                      <div className={classes2.header_info_box}>
                        <span>
                          <label>Ad Portal Customers</label>
                          <p>{users_data[chart].total}</p>
                        </span>
                        <span>
                          <label>Period</label>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "users", "chart")
                            }
                          >
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </span>
                        <span>
                          <label>Active users</label>
                          <p>{users_data[chart].active}</p>
                        </span>
                        <span>
                          <label>Change</label>
                          <p className={classes2.data_change_percent}>
                            {users_data[chart].improvement}
                          </p>
                        </span>
                      </div>
                      <div className={classes2.chart}>
                        <BarHorisontal
                          series={users_data[chart].series}
                          heighest={Math.max(...users_data[chart].series)}
                          categories={users_data[chart].categories}
                          time={chart}
                          loaded={this.state.loaded}
                        />
                      </div>
                    </div>
                    <div className={classes2.analytics_info_box_partners}>
                      <div className={classes2.flexbox_info_box}>
                        <div>
                          <h1>Survey Partners.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {partners_data[partners].total}
                          </p>
                        </div>
                        <div>
                          <p className={classes2.margin_bottom_zero}>
                            <strong>
                              {partners_data[partners].improvement}{" "}
                            </strong>
                            improvement
                          </p>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(e, "partners", "partners")
                            }
                          >
                            <option value="week"> Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={classes2.ad_partners}>
                      <div className={classes2.flexbox_info_box}>
                        <div>
                          <h1>Survey  Customers.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {ad_customers[ad_customers_time].total}
                          </p>
                        </div>
                        <div>
                          <p className={classes2.margin_bottom_zero}>
                            <strong>
                              {ad_customers[ad_customers_time].improvement}{" "}
                            </strong>
                            improvement
                          </p>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(
                                e,
                                "ad_customers",
                                "time"
                              )
                            }
                          >
                            <option value="week"> Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className={classes2.survey_users}>
                      <div className={classes2.flexbox_info_box}>
                        <div>
                          <h1>Ad Portal Partners.</h1>
                          <p className={classes2.data_total_active_ads}>
                            {ad_partners[ad_partners_time].total}
                          </p>
                        </div>
                        <div>
                          <p className={classes2.margin_bottom_zero}>
                            <strong>
                              {ad_partners[ad_partners_time].improvement}{" "}
                            </strong>
                            improvement
                          </p>
                          <select
                            onChange={(e) =>
                              this.pickTimeFrame(
                                e,
                                "ad_partners",
                                "time"
                              )
                            }
                          >
                            <option value="week"> Week</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes3.ads_section}>
                    <div
                      className={`${classes3.cads_head} ${classes3.cads_head_2}`}
                    >
                      <h4 className={classes3.cads_h4}>
                        Most recent Campaigns
                      </h4>
                    </div>
                    <PulledCampaigns data={this.state} />
                  </div>
                </div>
              </>
            )}
            {this.props.match.isExact &&
              this.props.location.search.length > 0 && ( //details
                <PulledCampaigns data={this.state} />
              )}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapstatetoprops = (state) => {
  const {
    users,
    campaigns,
    surveys,
    partners,
    ad_partners,
    ad_customers,
    loading,
  } = state.Users;

  return {
    users,
    campaigns,
    surveys,
    partners,
    ad_partners,
    ad_customers,
    loading,
  };
};
export default connect(mapstatetoprops, { fetchUserAnalytics, fetchCampaigns })(
  CampaignAnalytics
);

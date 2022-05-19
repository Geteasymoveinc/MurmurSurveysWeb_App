import React from "react";

import axios from "axios";

import { Link, withRouter } from "react-router-dom";

import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";
import classes from "../../../assets/css/CreateAd/index.module.css";

import CampaignAnalytics from "../../../components/analytics/analytics";
import { connect } from "react-redux";

class PulledCampaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: true,
      checked: false,
      pulledCampaigns: this.props.campaigns,
      adds: this.props.campaign_adds,
      loading: false,
    };

    this.settingInterval = null;
  }

  //ad-campaign
  handleCampaigns = () => {
    let murmurCampaigns = [];

    if (this.state.pulledCampaigns.length !== 0) {
      {
        this.state.pulledCampaigns.map((campaign, i) => {
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
            
                    <label htmlFor={campaign._id}>
                      {campaign.campaign_name}
                    </label>
                  
                </div>
              </td>
              <td className={classes.cads_td}>
                <span className={`${classes.td_data} ${classes.td_data_2}`}>
                  <img
                    src={campaign.customer.img}
                    alt="profile img"
                    className={classes.partner_profile_img}
                  />
                  {campaign.customer.fullName}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}> {campaign.ad_type}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.daily_budget}</span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/dashboard?campaign=${campaign._id}`}
                  className={classes.details_link}
                >
                  Analytics
                  <img
                    src={ArrowRight}
                    alt=""
                    className={classes.details_img}
                  />
                </Link>
              </td>
            </tr>
          );
        });
      }
    }

    return murmurCampaigns;
  };

  toggleSurveyWindow = (id) => {
    const active = this.state.active;
    let value = id;
    if (active === id) {
      value = "";
    }

    this.setState({
      ...this.state,
      active: value,
    });
  };

  componentDidUpdate(prevProps) {
    const { loading, campaign_adds, campaigns } = this.props;

    if (
      campaign_adds.length !== prevProps.campaign_adds.length ||
      campaigns.length !== prevProps.campaigns.length
    ) {
      this.setState({
        ...this.state,
        adds: campaign_adds,
        pulledCampaigns: campaigns,
        haveCampaigns: true,
      });
    }
  }

  render() {
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get("campaign"); //extracting id
    let campaign = {};
    if (id) {
      campaign = this.state.pulledCampaigns.filter((campaign) => {
        if (campaign._id === id) {
          return campaign;
        }
      })[0];
    }
  
    return (
      <React.Fragment>
        {/* this part is ad-manager STARTING*/}
        {this.state.loading && (
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
        {!this.props.location.search.length > 0 && !this.state.loading && (
          <div className={classes.cads_table} style={{ marginBottom: "100px" }}>
            <table>
              <thead>
                <tr className={classes.first_tr}>
                  <th className={`${classes.cads_th}`}>
                  <div
                        className={`${classes.invoice_th}`}
                      >
                      <label htmlFor="campaigns">Name</label>
                    </div>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Customer</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                    <span>Type</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Daily Budget</span>
                  </th>

                  <th></th>
                </tr>
              </thead>
              <tbody>{this.handleCampaigns()}</tbody>
            </table>
          </div>
        )}

        {this.props.location.search.length > 0 && ( //when user selects an add to check details
    <CampaignAnalytics email ={campaign.advertisers_email}/>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { campaigns, campaign_adds, loading } = state.Campaigns;
  return { campaigns, campaign_adds, loading };
};

export default connect(mapStateToProps, null)(withRouter(PulledCampaigns));

import axios from "axios";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";

import classes from "../../../assets/css/CreateAd/index.module.css";

import CampaignAnalytics from "./analytics";
import AdDetails from "./ad-details";

class PulledRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      haveCampaigns: true,
      checked: false,
      pullledRequests: this.props.requests,
    };
  }

  declineAllRequests = () => {
    this.setState({
      ...this.state,
      pullledRequest: [],
    });
  };
  declineRequest = (id) => {
    let { pullledRequests } = this.state;
    console.log(id);
    pullledRequests = pullledRequests.filter((campaign) => {
      if (campaign._id !== id) {
        return campaign;
      }
    });

    this.setState({
      ...this.state,
      pullledRequests,
    });
  };

  approveRequest = (campaign) => {
    this.props.approveRequest({
      campaign_name: campaign.campaign_name,
      _id: campaign._id,
      customer: campaign.customer,
      daily_budget: campaign.daily_budget,
      ad_type: campaign.ad_type,
    });

    this.declineRequest(campaign._id);
  };
  approveAllRequests = () => {
    this.props.approveAllRequests(this.state.pullledRequests, this.state.adds);
    this.declineAllRequests();
  };
  //ad-campaign
  handleCampaigns = () => {
    let murmurCampaigns = [];

    if (this.state.pullledRequests.length !== 0) {
      {
        this.state.pullledRequests.map((campaign, i) => {
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <label>{campaign.campaign_name}</label>
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
                <span className={classes.td_data}>
                  {" "}
                  {campaign.campaign_type}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {" "}
                  <button
                    type="button"
                    className={classes.decline_button}
                    onClick={() => this.declineRequest(campaign._id)}
                  >
                    Decline
                  </button>
                </span>
              </td>
              <td className={classes.cads_td}>
                <button
                  type="button"
                  className={classes.approve_button}
                  onClick={() => this.approveRequest(campaign)}
                >
                  Approve
                </button>
              </td>

              <td className={classes.cads_td}>
                <Link
                  to={`/campaigns?request=${campaign._id}`}
                  className={classes.details_link}
                >
                  Details
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

  render() {
    console.log(this.props);
    console.log(this.state);
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get('request') //extracting id 
 
    const campaigns = this.state.pullledRequests.filter(campaign => campaign.id ===id)
    
    return (
      <React.Fragment>
        {/* this part is ad-manager STARTING*/}
        {!this.state.loaded && (
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
        {!this.props.location.search.length > 0 &&
          this.state.loaded && ( //list all campaigns
            <div
              className={classes.cads_table}
              style={{ marginBottom: "30px" }}
            >
              <table>
                <thead>
                  <tr className={classes.first_tr}>
                    <th className={`${classes.cads_th}`}>
                      <div className={` ${classes.invoice_th}`}>
                        <label htmlFor="invoice-txt">Name</label>
                      </div>
                    </th>
                    <th className={classes.cads_th}>
                      <span>Customer</span>
                    </th>
                    <th
                      className={`${classes.cads_th} ${classes.cads_quantity}`}
                    >
                      <span>Type</span>
                    </th>
                    <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                      <span
                        className={classes.delete_table_header}
                        onClick={this.declineAllRequests}
                      >
                        Decline All
                      </span>
                    </th>
                    <th className={classes.cads_th}>
                      <span
                        className={classes.approve_table_header}
                        onClick={this.approveAllRequests}
                      >
                        Approve All
                      </span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{this.handleCampaigns()}</tbody>
              </table>
            </div>
          )}

        {this.props.location.search.length > 0 && ( //when user selects an add to check details
          <AdDetails
            campaigns={campaigns}
            adds={this.state.adds}
            loading={this.state.loading}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(PulledRequests);

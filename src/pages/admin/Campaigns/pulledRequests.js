import axios from "axios";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";

import classes from "../../../assets/css/CreateAd/index.module.css";

import CampaignAnalytics from "./analytics";

class PulledRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: true,
      checked: false,
      pullledCampaigns: [
        {
          _id: "6266d5a307c2ba1274d576888",
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          ad_type: "Backpack",
          daily_budget: "75",
          display_quantity: "200",
        },
        {
          _id: "6266d5a307c2ba1274d576887",
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          ad_type: "Backpack",
          daily_budget: "75",
          display_quantity: "200",
        },
      ],
      modalViewDetailsStatus: false,
      viewCampaign: {},
      adds: [
        {
          area: "khazar",
          checked: false,
          id: "6266d5a307c2ba1274d576888",
          toggled: false,
        },
        {
          area: "khazar",
          checked: false,
          id: "6266d5a307c2ba1274d576887",
          toggled: false,
        },
      ],
      editable: false,
      loading: false,
    };


    this.settingInterval = null;
  }




  declineAllRequests = () => {
    this.setState({
      ...this.state,
      pullledCampaigns: [],
      adds: [],
    });
  };
  declineRequest = (id) => {
    let { pullledCampaigns, adds } = this.state;

    pullledCampaigns = pullledCampaigns.filter((campaign) => {
      if (campaign._id !== id) {
        return campaign;
      }
    });
    adds = adds.filter((add) => {
      if (add.id !== id) {
        return add;
      }
    });

    this.setState({
      ...this.state,
      pullledCampaigns,
      adds,
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
        this.props.approveAllRequests(this.state.pullledCampaigns, this.state.adds)
        this.declineAllRequests()
  }
  //ad-campaign
  handleCampaigns = () => {
    const { multiple } = this.state;

    let murmurCampaigns = [];

    if (this.state.pullledCampaigns.length !== 0) {
      {
        this.state.pullledCampaigns.map((campaign, i) => {
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <label>
                    {campaign.campaign_name}
                  </label>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
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

 
 

  render() {
    let status = [];
    const url = this.props.location.search; //extracting billing id
    const params = url.split("?request=")[1]; // geting rid of left side
    const statusArray = this.state.adds.filter((el) => el.id === params); //looking for ad by ad campaign id

    if (statusArray.length) {
      status = Object.values(statusArray[0]);
    }
    const campaigns = this.state.pullledCampaigns.filter(
      (el) => el._id === params
    ); //looging for campaign by ad campaign id
    const { multiple } = this.state;
    console.log(this.state);
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
        {!this.props.location.search.length > 0 &&
          !this.state.loading && ( //list all campaigns
            <div
              className={classes.cads_table}
              style={{ marginBottom: "100px" }}
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
                        Delete All
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
        <CampaignAnalytics />
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(PulledRequests);

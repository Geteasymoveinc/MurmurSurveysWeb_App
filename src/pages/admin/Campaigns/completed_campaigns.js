import axios from "axios";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";
import Avatar from "../../../assets/images/avatar.png";
import classes from "../../../assets/css/CreateAd/index.module.css";

import CampaignAnalytics from "../../../components/analytics/analytics";

import { connect } from "react-redux";

class CompletedCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: true,
      checked: false,
      multiple: false,
      pulledCampaigns: this.props.completed_campaigns,
      adds: this.props.completed_adds,
      loading: false,
    };

    this.settingInterval = null;
  }

  deleteCampaign = (id) => {
    let { pulledCampaigns, adds } = this.state;

    pulledCampaigns = pulledCampaigns.filter((campaign) => {
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
      pulledCampaigns,
      adds,
    });
  };

  checkCampaign = (event) => {
    const id = event.target.id;
    const adds = this.state.adds;
    let multiple = false;
    let count = 0;
    for (let i = 0; i < adds.length; i++) {
      if (adds[i].checked && adds[i].id !== id) {
        count++;
      }
      if (adds[i].id === id) {
        adds[i].checked = !adds[i].checked;
        if (adds[i].checked) {
          count++;
        }
      }
    }
    if (count > 1) {
      multiple = true;
    }
    this.setState({
      ...this.state,
      adds,
      multiple,
    });
  };

  checkAllCampigns = () => {
    const adds = this.state.adds;
    let count = 0;
    let multiple = false;
    const checked = !this.state.checked;

    for (let i = 0; i < adds.length; i++) {
      if (
        (this.state.multiple && this.state.checked) ||
        (!this.state.multiple && !this.state.checked)
      ) {
        if (adds[i].checked === true && this.state.checked) {
          adds[i].checked = false;
        } else if (!this.state.checked) {
          count++;
          adds[i].checked = true;
        }
      } else if (!this.state.checked) {
        count++;
        adds[i].checked = true;
      } else {
        adds[i].checked = false;
      }
    }

    if (count > 1 && checked) {
      multiple = true;
    }

    this.setState({
      ...this.state,
      adds,
      multiple,
      checked,
    });
    /*const campaigns = this.state.pullledCampaigns.length;
    const adds = this.state.adds;

    for (let i = 0; i < campaigns; i++) {
      if (this.state.checked === true) {
        adds[i].toggled = false;
        adds[i].checked = false;

        this.setState({ checked: false, adds, multiple:false });
      } else {
        adds[i].toggled = true;
        adds[i].checked = true;
        this.setState({ checked: true, adds, multiple: true });
      }
    }*/
  };

  //ad-campaign
  handleCampaigns = () => {
    const { multiple } = this.state;

    let murmurCampaigns = [];

    if (this.state.pulledCampaigns.length !== 0) {
      {
        this.state.pulledCampaigns.map((campaign, i) => {
          let profile = campaign.customer.img;
          const hasImage =
            profile &&
            profile.split(
              "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
            )[1];
          if (hasImage === "null" || hasImage === "undefined") profile = Avatar;

          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <div className={classes.cads_check}>
                    <input
                      type="checkbox"
                      id={campaign._id}
                      checked={
                        (this.state.checked ||
                          (this.state.haveCampaigns &&
                            this.state.adds[i].checked)) &&
                        this.state.haveCampaigns &&
                        this.state.adds[i].checked
                      }
                      onChange={(e) => this.checkCampaign(e)}
                    />
                    <label htmlFor={campaign._id}>
                      {campaign.campaign_name}
                    </label>
                  </div>
                  <div className={`${classes.cads_radio_active}`}>
                    {this.state.adds[i].checked && !multiple && (
                      <button
                        type="button"
                        className={`${classes.check_remove}`}
                        onClick={() => this.toggleDeleteAd(campaign._id)}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                  </div>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span className={`${classes.td_data} ${classes.td_data_2}`}>
                  <img
                    src={profile ? profile : Avatar}
                    alt="profile img"
                    className={classes.partner_profile_img}
                  />
                  <span>{campaign.customer.fullName}</span>
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
                  to={`/campaigns?campaign=${campaign._id}&type=completed`}
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.completed_campaigns.length !== this.props.completed_campaigns.length) {
      this.setState({
        ...this.state,
        pulledCampaigns: this.props.completed_campaigns,
        adds: this.props.completed_adds
      });
    }
  }
  toggleDeleteAd = (id, type) => {
    this.setState({ ...this.state, loading: true });
    axios
      .delete(`https://backendapp.murmurcars.com/api/v1/campaigns/${id}`)
      .then(() => {
        window.location.reload();
        if (type === "from_details") {
          this.props.history.replace("/ad-manager");
          this.props.history.go("/ad-manager");
        }
        this.setState({ ...this.state, loading: false });
      })

      .catch((error) => console.log(error));
  };

  toggleDeleteMultipleAd = () => {
    const adds = this.state.adds;
    const list_of_ids = [];
    this.setState({ ...this.state, loading: true });
    for (let i = 0; i < adds.length; i++) {
      if (!adds[i].toggled) {
        list_of_ids.push(adds[i].id);
      }
    }

    axios
      .delete(
        `https://backendapp.murmurcars.com/api/v1/campaigns/delete/${list_of_ids}`
      )
      .then(() => {
        window.location.reload();
        this.setState({ ...this.state, loading: false });
      })
      .catch((err) =>
        this.setState({
          ...this.state,
          loading: false,
        })
      );
  };
  render() {
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get("campaign"); //extracting id
    const type = new URLSearchParams(url).get("type")
    const { multiple } = this.state;
    let campaign = {};
    if (id) {
      campaign = this.state.pulledCampaigns.filter(
        (campaign) => campaign._id === id
      )[0];
    }
  
    console.log(id)
    console.log(type)
    console.log(campaign)
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
              style={{ marginBottom: "30px" }}
            >
              <table>
                <thead>
                  <tr className={classes.first_tr}>
                    <th className={`${classes.cads_th}`}>
                      <div
                        className={`${classes.cads_check} ${classes.invoice_th}`}
                      >
                        <input
                          type="checkbox"
                          id="completed-campaigns"
                          onChange={this.checkAllCampigns}
                          checked={this.state.checked}
                        />
                        <label htmlFor="completed-campaigns">Name</label>
                        {multiple && (
                          <button
                            type="button"
                            className={`${classes.check_remove} ${classes.multiple_remove}`}
                            onClick={() => this.toggleDeleteMultipleAd()}
                          >
                            <img src={Trash} alt="" />
                          </button>
                        )}
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
          <CampaignAnalytics
            email={campaign.advertisers_email}
            campaign={campaign}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapstatetoprops = (state) => {
  const { completed_campaigns, completed_adds } = state.Campaigns;
  return { completed_campaigns, completed_adds };
};

export default  connect(mapstatetoprops, null)(withRouter(CompletedCampaigns));

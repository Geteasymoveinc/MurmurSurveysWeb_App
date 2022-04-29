import React, { Component } from "react";

import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";

import PulledCampaigns from "./pulledCampaigns";
import PulledRequests from "./pulledRequests";

import SearchNormal from "../../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import classes from "../../../assets/css/CreateAd/index.module.css";

class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      pullledCampaigns: [
        {
          _id: "6266d5a307c2ba1274d57108",
          ab_experiment: [],
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          ad_type: "Indoor",
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
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: true,
        },
        {
          _id: "6266d5a307c2ba1274d57100",
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          ad_type: "Backpack",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
        {
          _id: "6266d5a307c2ba12uhd57108",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          ad_type: "Backpack",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
        {
          _id: "6278d5a307c2ba1274d57108",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          ad_type: "Backpack",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
        {
          _id: "6266d5a307c2ba12jhld57108",
          ad_schedule: "2022-04-26 2022-05-02",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          ad_type: "Backpack",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
      ],
      adds: [
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba1274d57108",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba1274d57100",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba12uhd57108",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6278d5a307c2ba1274d57108",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba12jhld57108",
          toggled: false,
        },
      ],
      campaigns: 0,
      mode: "single",
    };
  }




  approveRequest = (data) => {
    this.setState({
      ...this.state,
      pullledCampaigns: [...this.state.pullledCampaigns, data],
      adds: [
        ...this.state.adds,
        {
          checked: false,
          id: data._id,
          toggled: false,
        },
      ],
    });
  };

  approveAllRequests = (campaigns, adds) => {
    this.setState({
      ...this.state,
      pullledCampaigns: [...this.state.pullledCampaigns, ...campaigns],
      adds: [...this.state.adds, ...adds],
    });
  };



  render() {
    const url = this.props.location.search;
    const request = url.split("?request=")[1];
    const campaign = url.split("?campaign=")[1];
    const { modal } = this.state;
    return (
      <React.Fragment>
        {!this.state.modal && ( //page where user see all its campaigns and can create new one
          <div className={classes.dash_right}>
            <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Campaigns</h1>

              <form>
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

            {this.props.match.isExact &&
              !this.props.location.search && ( //page where user see all its campaigns
                <div className={classes.create_ads}>
                  <div className={classes.ads_section}>
                  <div className={`${classes.cads_head} ${classes.cads_head_2}`}>
                      <div className={classes.cads_head_left}>
                        <h4 className={classes.cads_h4}>Current Reuqests</h4>
                        <p className={classes.cads_p}>
                          Here you can view the list of reuests for campaigns
                        </p>
                      </div>
                      </div>
                    <PulledRequests
                      data={this.state}
                      approveRequest={this.approveRequest}
                      approveAllRequests={this.approveAllRequests}
                    />
                  
                    <div className={`${classes.cads_head} ${classes.cads_head_2}`}>
                      <div className={classes.cads_head_left}>
                        <h4 className={classes.cads_h4}>Current Campaigns</h4>
                        <p className={classes.cads_p}>
                          Here you can view the list of aproved campaigns we
                          have
                        </p>
                      </div>
                      </div>
                    <PulledCampaigns
                      data={this.state}
                      campaigns={this.state.pullledCampaigns}
                      adds={this.state.adds}
                      mode={this.state.mode}
                    />
                  
                  </div>
                </div>
              )}

            {this.props.match.isExact &&
              this.props.location.search.length > 0 &&
              campaign && (
                <PulledCampaigns
      
                  data={this.state}
                  campaigns={this.state.pullledCampaigns}
                  adds={this.state.adds}
                  mode={this.state.mode}
                />
              )}
            {this.props.match.isExact &&
              this.props.location.search.length > 0 &&
              request && (
                <PulledRequests
                  data={this.state}
                  approveRequest={this.approveRequest}
                  approveAllRequests={this.approveAllRequests}
                />
              )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Campaigns);

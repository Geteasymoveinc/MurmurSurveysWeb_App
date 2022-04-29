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
      approvedRequests: [],
      adds: [],
      campaigns: 0,
      mode: "single",
    };
  }

  approveRequest = (data) => {
    this.setState({
      ...this.state,
      mode: "single",
      approvedRequests: [...this.state.approvedRequests, data],
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
      mode: "multiple",
      approvedRequests: [...this.state.approvedRequests, ...campaigns],
      adds: [...this.state.adds, ...adds],
    });
  };

  getCampaignsLength = (length) => {
    this.setState({
      ...this.state,
      campaigns: length,
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
                      getCampaignsLength={this.getCampaignsLength}
                      data={this.state}
                      approvedRequests={this.state.approvedRequests}
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
                  getCampaignsLength={this.getCampaignsLength}
                  data={this.state}
                  approvedRequests={this.state.approvedRequests}
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

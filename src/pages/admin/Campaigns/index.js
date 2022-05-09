import React, { Component } from "react";

import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";

import PulledCampaigns from "./pulledCampaigns";
import PulledRequests from "./pulledRequests";

import SearchNormal from "../../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import classes from "../../../assets/css/CreateAd/index.module.css";

import { connect } from "react-redux";
import { fetchCampaigns } from "../../../store/campaigns/actions";

class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      pulledCampaigns: [],
      adds: [],
      mode: "single",
      loaded: false,
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
  componentDidMount() {
    console.log("parent mounted");
    this.props.fetchCampaigns(
      "http://localhost:4000/api/v1/admin/get-campaigns"
    );
  }
  componentDidUpdate(prevProps) {
    const { campaigns, campaign_adds, loading } =
      this.props;
    if (
      prevProps.campaigns.length !== campaigns.length ||
      loading !== prevProps.loading
    ) {

      const pulledCampaigns = campaigns;

      this.setState({
        ...this.state,
        pulledCampaigns,
        adds: campaign_adds,

      });
    }
    this.timeout = setTimeout(() => {
      if (!this.state.loaded) {
        this.setState({
          ...this.state,
          loaded: true,
        });
      }
    }, 5000);
  }
  approveRequest = (data) => {
    this.setState({
      ...this.state,
      pulledCampaigns: [...this.state.pulledCampaigns, data],
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
      pulledCampaigns: [...this.state.pulledCampaigns, ...campaigns],
      adds: [...this.state.adds, ...adds],
    });
  };

  render() {
    const url = this.props.location.search;
    const request = url.split("?request=")[1];
    const campaign = url.split("?campaign=")[1];
    const { modal } = this.state;

    console.log(this.props);

    return (
      <React.Fragment>
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
        {!modal &&
          this.state.loaded && ( //page where user see all its campaigns and can create new one
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
                      <div
                        className={`${classes.cads_head} ${classes.cads_head_2}`}
                      >
                        <div className={classes.cads_head_left}>
                          <h4 className={classes.cads_h4}>Current Reuqests</h4>
                          <p className={classes.cads_p}>
                            Here you can view the list of reuests for campaigns
                          </p>
                        </div>
                      </div>
                      <PulledRequests
                        approveRequest={this.approveRequest}
                        approveAllRequests={this.approveAllRequests}
                      />

                      <div
                        className={`${classes.cads_head} ${classes.cads_head_2}`}
                      >
                        <div className={classes.cads_head_left}>
                          <h4 className={classes.cads_h4}>Current Campaigns</h4>
                          <p className={classes.cads_p}>
                            Here you can view the list of aproved campaigns we
                            have
                          </p>
                        </div>
                      </div>
                      <PulledCampaigns
                        campaigns={this.state.pulledCampaigns}
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
                    campaigns={this.state.pulledCampaigns}
                    adds={this.state.adds}
                    mode={this.state.mode}
                  />
                )}
              {this.props.match.isExact &&
                this.props.location.search.length > 0 &&
                request && (
                  <PulledRequests
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
const mapstatetoprops = (state) => {
  const { requests, campaigns, request_adds, campaign_adds, loading } =
    state.Campaigns;
  return { requests, loading, campaigns, request_adds, campaign_adds };
};

export default connect(mapstatetoprops, {
  fetchCampaigns,
})(withRouter(Campaigns));

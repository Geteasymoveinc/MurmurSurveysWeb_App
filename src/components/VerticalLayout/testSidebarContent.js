import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";



import Logo from "../../assets/css/common/icons/logoBlue.svg";
import Element4 from "../../assets/css/layout/element-4.svg";
import Location from "../../assets/css/layout/location.svg";
import Calendar from "../../assets/css/layout/calendar.svg";
import Frame from "../../assets/css/layout/frame.svg";
import Arrow2 from "../../assets/css/layout/arrow-2.svg";
import Routing2 from "../../assets/css/layout/routing-2.svg";
import Settings2 from "../../assets/css/layout/setting-2.svg";
import Billing from "../../assets/css/layout/refresh.svg";
import DashboardActive from "../../assets/css/layout/dashboard-active.svg";
import LocationActive from "../../assets/css/layout/location-active.svg";
import CreateAdActive from "../../assets/css/layout/create-ad-active.svg";
import AnalyticsActive from "../../assets/css/layout/analytics-active.svg";
import ABTestingActive from "../../assets/css/layout/abtesting-active.svg";
import DestinationActive from "../../assets/css/layout/destination-active.svg";
import SettingsActive from "../../assets/css/layout/settings-active.svg";
import BillingActive from "../../assets/css/layout/billing-active.svg";
import Copyright from "../../assets/css/common/icons/copyright-dashboard.svg";
import Gps from "../../assets/css/layout/gps.svg";
import GpsInactive from "../../assets/css/layout/gps-inactive.svg";

import classes from "../../assets/css/layout/sidebar-content.module.css";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = { matchingMenuItem: "" };
  }

  componentDidMount() {
    document.body.classList.add("dash_board");
    this.setState({ matchingMenuItem: this.props.match.path });
  }

  render() {

    return (
      <React.Fragment>
        <div className={classes.dash_menu}>
          <a href="#" className={classes.dash_logo}>
            <img src={Logo} alt="" />
          </a>
          <div className={classes.dash_menu_block}>
            <div className={classes.menu_block}>
              <ul className={classes.dash_menu_ul}>
                <li className={classes.menu_p}>{this.props.t("Menu")}</li>
                <li
                  name="/dashboard"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/dashboard"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/dashboard">
                    <div className={classes.dash_imgs}>
                      <img
                        src={Element4}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={DashboardActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Dashboard")}</span>
                  </Link>
                </li>
                <li
                  name="/streetIQ"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/streetIQ"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/streetIQ">
                    <div className={classes.dash_imgs}>
                      <img
                        src={Location}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={LocationActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Street IQ")}</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={classes.menu_block}>
              <ul className={classes.dash_menu_ul}>
                <li className={classes.menu_p}>
                  {this.props.t("Business Tools")}
                </li>
                <li
                  name="/ad-manager"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/ad-manager"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/ad-manager">
                    <div className={classes.dash_imgs}>
                      <img
                        src={Calendar}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={CreateAdActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Ads Manager")}</span>
                  </Link>
                </li>
                <li
                  name="/analytics"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/analytics"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/analytics">
                    <div className={classes.dash_imgs}>
                      <img src={Frame} alt="" className={classes.dash_img_1} />
                      <img
                        src={AnalyticsActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Analytics")}</span>
                  </Link>
                </li>
                <li
                  name="/tracking"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/tracking"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/gps-tracking">
                    <div className={classes.dash_imgs}>
                      <img
                        src={GpsInactive}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img src={Gps} alt="" className={classes.dash_img_2} />
                    </div>
                    <span>{this.props.t("Tracking")}</span>
                  </Link>
                </li>
                {/* <li
                  name="/testing"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/testing"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/testing">
                    <div className={classes.dash_imgs}>
                      <img src={Arrow2} alt="" className={classes.dash_img_1} />
                      <img
                        src={ABTestingActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("A/B Testing")}</span>
                  </Link>
                </li> */}
              </ul>
            </div>
            {/* <div className={classes.menu_block}>
              <ul className={classes.dash_menu_ul}>
                <li className={classes.menu_p}>
                  {this.props.t("Integrations")}
                </li>
                <li
                  name="/destination"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/destination"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/destination">
                    <div className={classes.dash_imgs}>
                      <img
                        src={Routing2}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={DestinationActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Destination")}</span>
                  </Link>
                </li>
                <li
                  name="/tracking"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/tracking"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/tracking">
                    <div className={classes.dash_imgs}>
                      <img
                        src={GpsInactive}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img src={Gps} alt="" className={classes.dash_img_2} />
                    </div>
                    <span>{this.props.t("Tracking")}</span>
                  </Link>
                </li>
              </ul>
            </div> */}
            <div className={classes.menu_block}>
              {/* <ul className={classes.dash_menu_ul}>
                <li className={classes.menu_p}>{this.props.t("Services")}</li>
                <li
                  name="/settings"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/settings"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/settings">
                    <div className={classes.dash_imgs}>
                      <img
                        src={Settings2}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={SettingsActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Settings")}</span>
                  </Link>
                </li>
                <li
                  name="/billing"
                  onClick={this.menuItemActive}
                  className={`${
                    this.state.matchingMenuItem === "/billing"
                      ? classes.active
                      : ""
                  }`}
                >
                  <Link to="/billing">
                    <div className={classes.dash_imgs}>
                      <img
                        src={Billing}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={BillingActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                    </div>
                    <span>{this.props.t("Billing History")}</span>
                  </Link>
                </li>
              </ul> */}
            </div>
          </div>
          <div className={classes.dash_copy}>
            <img src={Copyright} alt="" />
            <span>{new Date().getFullYear()}, Murmur</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNamespaces()(SidebarContent));

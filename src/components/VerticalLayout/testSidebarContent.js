import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

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
import AnalyticsActive  from "../../assets/css/layout/analytics-active.svg";
import ABTestingActive from  "../../assets/css/layout/abtesting-active.svg";
import DestinationActive  from "../../assets/css/layout/destination-active.svg";
import SettingsActive from "../../assets/css/layout/settings-active.svg";
import BillingActive  from "../../assets/css/layout/billing-active.svg";
import Copyright from '../../assets/css/common/icons/copyright-dashboard.svg'

import classes from "../../assets/css/layout/sidebar-content.module.css";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {matchingMenuItem: ''};

  }

  componentDidMount() {
    this.initMenu();
    document.body.classList.add("dash_board");
    this.setState({matchingMenuItem: this.props.match.path})
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.type, this.props.type);
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    //new MetisMenu("#side-menu");

    /* var matchingMenuItem = null;
    var ul = document.getElementById('side-menu');
    var items = ul.getElementsByTagName("a");
    console.log(items)
    for (var i = 0; i < items.length; ++i) {
      console.log(items[i].pathname )
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
   console.log(item)
    item.classList.add('active');
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;*/
  }

  render() {
    console.log( this.props)
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
                      <span>{this.props.t("Dashboards")}</span>
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
                    name='/ad-manager'
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
                      <span>{this.props.t("Ad Manager")}</span>
                    </Link>
                  </li>
                  <li name='/analytics'
                    onClick={this.menuItemActive}
                    className={`${
                      this.state.matchingMenuItem === "/analytics"
                        ? classes.active
                        : ""
                    }`}
                  >
                    <Link to="/analytics">
                      <div className={classes.dash_imgs}>
                        <img
                          src={Frame}
                          alt=""
                          className={classes.dash_img_1}
                        />
                        <img
                          src={AnalyticsActive}
                          alt=""
                          className={classes.dash_img_2}
                        />
                      </div>
                      <span>{this.props.t("Analytics")}</span>
                    </Link>
                  </li>
                  <li name='/testing'
                    onClick={this.menuItemActive}
                    className={`${
                      this.state.matchingMenuItem === "/testing"
                        ? classes.active
                        : ""
                    }`}
                  >
                    <Link to="/testing">
                      <div className={classes.dash_imgs}>
                        <img
                          src={Arrow2}
                          alt=""
                          className={classes.dash_img_1}
                        />
                        <img
                          src={ABTestingActive}
                          alt=""
                          className={classes.dash_img_2}
                        />
                      </div>
                      <span>{this.props.t("A/B Testing")}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={classes.menu_block}>
                <ul className={classes.dash_menu_ul}>
                  <li className={classes.menu_p}>
                    {this.props.t("Integrations")}
                  </li>
                  <li name='/destination'
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
                </ul>
              </div>
              <div className={classes.menu_block}>
                <ul className={classes.dash_menu_ul}>
                  <li className={classes.menu_p}>{this.props.t("Services")}</li>
                  <li name='/settings'
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
                  <li name='/billing'
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
                </ul>
              </div>
            </div>
            <div className={classes.dash_copy}>
              <img src={Copyright} alt="" />
              <span>{new Date().getFullYear()}, Murmurcars</span>
            </div>
     
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNamespaces()(SidebarContent));
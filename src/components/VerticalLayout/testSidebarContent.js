import React, { Component } from "react";


import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";



import Logo from "../../assets/css/common/icons/logoBlue.svg";
import classes from "../../assets/css/layout/sidebar-content.module.css";
import Element4 from "../../assets/css/layout/element-4.svg";
import DashboardActive from "../../assets/css/layout/dashboard-active.svg";
import Campaigns from "../../assets/css/layout/campaigns.svg";
import CampaignsActive from "../../assets/css/layout/campaigns-active.svg";
import Customers from "../../assets/css/layout/customers.svg";
import CustomersActive from "../../assets/css/layout/customers-active.svg";
import Surveys from "../../assets/css/layout/surveys.svg";
import SurveysActive from "../../assets/css/layout/surveys-active.svg";

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
             
                  <li name='/dashboard'
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
                      <span>{"Dashboard"}</span>
                    </Link>
                  </li>
                  {/*<li name='/customers'
                    onClick={this.menuItemActive}
                    className={`${
                      this.state.matchingMenuItem === "/customers"
                        ? classes.active
                        : ""
                    }`}
                  >
                    <Link to="/customers">
                      <div className={classes.dash_imgs}>
                      <img
                        src={Customers}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={CustomersActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                      </div>
                      <span>{"Customers"}</span>
                    </Link>
                  </li>*/}
                  <li name='/campaigns'
                    onClick={this.menuItemActive}
                    className={`${
                      this.state.matchingMenuItem === "/campaigns"
                        ? classes.active
                        : ""
                    }`}
                  >
                    <Link to="/campaigns">
                      <div className={classes.dash_imgs}>
                      <img
                        src={Campaigns}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={CampaignsActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                      </div>
                      <span>{"Campaigns"}</span>
                    </Link>
                  </li>
                  <li name='/surveys'
                    onClick={this.menuItemActive}
                    className={`${
                      this.state.matchingMenuItem === "/surveys"
                        ? classes.active
                        : ""
                    }`}
                  >
                    <Link to="/surveys">
                      <div className={classes.dash_imgs}>
                      <img
                        src={Surveys}
                        alt=""
                        className={classes.dash_img_1}
                      />
                      <img
                        src={SurveysActive}
                        alt=""
                        className={classes.dash_img_2}
                      />
                      </div>
                      <span>{"Surveys"}</span>
                    </Link>
                  </li>
                </ul>
              </div> 
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SidebarContent);

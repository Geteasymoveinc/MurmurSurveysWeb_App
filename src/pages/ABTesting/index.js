import React, { Component } from "react";

import {
  TabContent,
  TabPane,
} from "reactstrap";


import { queryForEmail } from "../../helpers/fakebackend_helper";

import ABTargets from "./abtarget";
import ABReporting from "./reporting";

import classes from "../../assets/css/ABTesting/index.module.css";
import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

class ABTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      user_id: "",
    };
  }

  toggle = (tab) => {
    console.log(tab)
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  /*componentDidMount(){
    this.setState({ ...this.state, loading: true });
    queryForEmail("https://backendapp.murmurcars.com/api/v1/users/checkEmail", {
      email: sessionStorage.getItem('userAuth')
    }).then(res => {console.log(res)})
  }*/

  render() {
    return (
      <React.Fragment>
        <div className={classes.dash_right}>
          <div className={classes.head_search}>
            <h1 className={classes.dash_h1}>A/B Testing</h1>
            <form onSubmit={this.submitLocationToZoomIn}>
              <div className={`${classes.dash_relative} ${classes.search_box}`}>
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

          <div className={classes.ab_testing}>
            <ul className={classes.testing_menu}>
              <li className={`${this.state.activeTab==='1' && classes.active}`}>
                <a
                  href="#"
                  className={classes.testing_nav_a}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Details
                </a>
              </li>
              <li className={`${this.state.activeTab==='2' && classes.active}`}>
                <a
                  href="#"
                  className={classes.testing_nav_a}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Report
                </a>
              </li>
            </ul>
            <div>
        
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <ABTargets />
                </TabPane>
                <TabPane tabId="2">
                  <ABReporting />
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ABTesting;

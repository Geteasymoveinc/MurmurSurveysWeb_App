import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  toggleRightSidebar,
  changeTopbarTheme,
  changeLayoutWidth,
  changeSideBar,
} from "../../store/actions";

// Layout Related Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Rightbar from "../CommonForBoth/Rightbar";

import LanguageDropdown from '../CommonForBoth/TopbarDropdown/LanguageDropdown' ;

import classes from "../../assets/css/common/css/common.module.css";
import classes2 from "../../assets/css/layout/sidebar-content.module.css";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    };
    this.toggleMenuCallback = this.toggleMenuCallback.bind(this);
    this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
  }

  toggleRightSidebar() {
    this.props.toggleRightSidebar();
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  componentDidMount() {

    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block";
      document.getElementById("status").style.display = "block";

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("status").style.display = "none";
      }, 2500);
    } else {
      document.getElementById("preloader").style.display = "none";
      document.getElementById("status").style.display = "none";
    }

    // Scroll Top to 0
    window.scrollTo(0, 0);
    let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

    document.title = currentage + " | Bridge Outddor Advertising with Online";
    if (this.props.leftSideBarTheme) {
      this.props.changeSidebarTheme(this.props.leftSideBarTheme);
    }

    if (this.props.layoutWidth) {
      this.props.changeLayoutWidth(this.props.layoutWidth);
    }

    if (this.props.leftSideBarType) {
      this.props.changeSidebarType(this.props.leftSideBarType);
    }
    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme);
    }

    if (this.props.showRightSidebar) {
      this.toggleRightSidebar();
    }
  }
  toggleMenuCallback = () => {
    if (this.props.leftSideBarType === "default") {
      this.props.changeSidebarType("condensed", this.state.isMobile);
    } else if (this.props.leftSideBarType === "condensed") {
      this.props.changeSidebarType("default", this.state.isMobile);
    }
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {this.props.isSideBarVisible && (
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

        {/*} <Header
            toggleMenuCallback={this.toggleMenuCallback}
            toggleRightSidebar={this.toggleRightSidebar}
          />*/}
        <div
          className={`${
            (this.props.location.pathname === "/dashboard" ||
            this.props.location.pathname === "/streetIQ") &&
              classes2.dashboard_page
          }`}
        >
          <div
            className={`${this.props.isSideBarVisible && classes.dash_cover}`}
          >
            {this.props.isSideBarVisible && (
              <Sidebar
                theme={this.props.leftSideBarTheme}
                type={this.props.leftSideBarType}
                isMobile={this.state.isMobile}
              />
            )}
            {this.props.children}
            {/*<LanguageDropdown/>*/}
          </div>{" "}
        </div>
        {/*className="main-content"*/}
        {/* <Footer /> */}

        <Rightbar />
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};
export default connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  toggleRightSidebar,
  changeTopbarTheme,
  changeLayoutWidth,
  changeSideBar,
})(withRouter(Layout));

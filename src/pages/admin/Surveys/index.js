import React, { Component } from "react";

import { withRouter } from "react-router-dom";

import PulledSurveys from "./pulledSurveys";

import SearchNormal from "../../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import classes from "../../../assets/css/CreateAd/index.module.css";
import classes2 from "../../../assets/css/surveys/index.module.css";
import MenuDefault from "../../../assets/images/surveys/menu-default.svg";
import MenuWindows from "../../../assets/images/surveys/menu-windows.svg";

import { connect } from "react-redux";
import { fetchSurveys } from "../../../store/actions";

import HeadSearch from "../../../components/CommonForBoth/Headsearch";

class Surveys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        table: false,
        windnows: true,
      },
      adds: [],
      surveys: [],
      loading: true,
    };
    this.async = null;
  }
  switchToDifferentView = (toggle, toggleOff) => {
    this.setState({
      ...this.state,
      menu: {
        [toggle]: true,
        [toggleOff]: false,
      },
    });
  };

  componentDidUpdate(prevProps) {
    const { adds, surveys } = this.props;

    if (
      prevProps.surveys.length !== this.props.surveys.length ||
      this.state.surveys.length !== this.props.surveys.length
    ) {
      this.setState({
        ...this.state,
        adds,
        surveys,
      });
    }
    this.async = setTimeout(() => {
      if (this.state.loading) {
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    }, 2500);
  }
  componentWillUnmount() {
    clearTimeout(this.async);
  }

  componentDidMount() {
    this.props.fetchSurveys("https://backendapp.murmurcars.com/api/v1/admin/get-surveys");
  }

  toggleToCreateSurveyMode = () => {
    this.props.history.push("/surveys?mode=create-survey");
  };

  render() {
    const { menu, loading, surveys, adds } = this.state;
    const { windnows, table } = menu;

    const url = this.props.location.search; //search property of history props
    const mode = new URLSearchParams(url).get("mode"); //extracting mode

  
    return (
      <React.Fragment>
        {loading && (
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

        {!loading && (
          <div
            className={`${classes.dash_right}  ${
              (mode === "create-survey" || mode === "update-survey") &&
              classes.full_width
            }`}
          >
            {/* <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Surveys</h1>

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
        </div>*/}
            {mode !== "create-survey" && mode !== "update-survey" && (
              <HeadSearch component={"Surveys"} />
            )}
            {this.props.match.isExact &&
              !this.props.location.search && ( //page where user see all its campaigns
                <div className={classes.create_ads}>
                  <div className={classes.ads_section}>
                    <div
                      className={`${classes.cads_head} ${classes2.cads_head_space_between}`}
                    >
                      <button
                        onClick={this.toggleToCreateSurveyMode}
                        type="button"
                        className={`${classes.create_ads_btn} ${classes.create_survey}`}
                        to={"/create-survey"}
                      >
                        Create Survey
                        <svg
                          width="20"
                          height="20"
                          className={classes.create_ads_img}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 10H15"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 15V5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <h4 className={classes.cads_h4}>
                        Number of Surveys {surveys.length}
                      </h4>
                      <div className={classes2.surveys_view}>
                        <label>View:</label>
                        <div className={classes2.surveys_view_menu}>
                          <span
                            className={`${classes2.menu_item} ${
                              windnows ? classes2.menu_item_active : null
                            }`}
                            onClick={() => {
                              this.switchToDifferentView("windnows", "table");
                            }}
                          >
                            <img src={MenuWindows} alt="menu" />
                          </span>
                          <span
                            className={`${classes2.menu_item} ${
                              table ? classes2.menu_item_active : null
                            }`}
                            onClick={() => {
                              this.switchToDifferentView("table", "windnows");
                            }}
                          >
                            <img src={MenuDefault} alt="menu" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <PulledSurveys
                      surveys={surveys}
                      adds={adds}
                      view={{ windnows, table }}
                      loading={loading}
                    />
                  </div>
                </div>
              )}

            {this.props.match.isExact &&
              this.props.location.search.length > 0 && ( //details
                <PulledSurveys
                  surveys={surveys}
                  adds={adds}
                  view={{ windnows, table }}
                  loading={loading}
                />
              )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  const { surveys, adds } = state.Surveys;
  return { surveys, adds };
};

export default connect(mapStateToProps, { fetchSurveys })(withRouter(Surveys));

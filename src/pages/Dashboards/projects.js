import React from "react";
import { Component, Fragment } from "react";

import LogoWhiteTheme from "../../assets/images/LogoWhiteTheme.png";
import classes from "../../assets/css/surveys/index.module.scss";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import { connect } from "react-redux";
import { Link, withRouter, Switch, Route } from "react-router-dom";

import PullSurveys from "./pullSurveys";
import Survey from "./create/index";

import { queryForEmail } from "../../helpers/fakebackend_helper";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_edit_survey: false,
      loading: true,
      payment: {},
      user_id: "",
      company: "",
      selectedCampaign: {},
    };
  }

  componentDidMount() {
    const url = this.props.location.search; //search property of history props
    const create_edit_survey = new URLSearchParams(url).get("survey_id");
    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
      {
        email: sessionStorage.getItem("authUser"),
        role: "2",
      }
    )
      .then((user) => {
        const { _id, payment, company } = user.resp;
        this.setState({
          ...this.state,
          user_id: _id,
          loading: false,
          //create_edit_survey_mode: true,
          create_edit_survey,
          payment,
          company,
        });
      })
      .catch((err) =>
        this.setState({
          ...this.state,
          loading: false,
        })
      );
  }

  toggleToCreateSurveyMode = () => {
    this.props.history.push("/");
    this.setState({
      ...this.state,
      create_edit_survey: true,
    });
  };

  toggleToEditAndViewMode = () => {
    this.setState({
      ...this.state,
      create_edit_survey: true,
    });
  };

  render() {
    const { create_edit_survey, loading, user_id, payment } = this.state;

    return (
      <Fragment>
        {loading && (
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
        )}
        {!loading && !create_edit_survey ? (
          <div className={classes.dash_right}>
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={LogoWhiteTheme} alt="logo" />
                </a>
              </div>
              <div className={classes.menu_self_flex}>
                <div className={`${classes.menu_flex}`}>
                  {" "}
                  <div className={classes.button_containers}>
                    <Link
                      to={`/`}
                      className={`${classes.navbar_btn} ${classes.main}`}
                    >
                      Main
                    </Link>
                  </div>
                  <div className={classes.button_containers}>
                    <Link
                      to={`/surveys`}
                      className={`${classes.navbar_btn} ${classes.main} ${classes.active}`}
                    >
                      Surveys
                    </Link>
                    <span className={`${classes.border_active}`} />
                  </div>
                </div>
              </div>
              <div className={classes.dash_relative}>
                <div className={classes.search_box_flex_end}>
                  <Profile scope={"survey"} />
                </div>
              </div>
            </header>

            <div className={classes.surveys_container}>
              <div className={classes.create_ads}>
                <div className={classes.ads_section}>
                  <div className={classes.cads_head}>
                    <div className={classes.cads_head_left}>
                      <h4 className={classes.cads_h4}>Your Current Surveys</h4>
                      <p className={classes.cads_p}>
                        Here you can view the status of your surveys with all
                        the necessary details
                      </p>
                    </div>
                    <button
                      onClick={this.toggleToCreateSurveyMode}
                      type="button"
                      className={classes.create_ads_btn}
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
                  </div>
                  <PullSurveys
                    toggleToEditAndViewMode={this.toggleToEditAndViewMode}
                    user_id={user_id}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <Switch>
          <Route path="/surveys/update-survey">
            <Survey
              survey={this.props.survey}
              user_id={user_id}
              company={this.state.company}
            />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}

const mapPropsToState = (state) => {
  const {
    survey_questions,
    survey_title,
    survey_caption,
    survey_earnings,
    survey_budget,
    survey_image,
    target_audience,
    survey_audience_number,
    survey_active,
    survey_specific,
    participants,
    researchConductedVia,
    targetUsersFrom,
    research,
    response,
    map,
    loading,
    message,
    payment,
    count,
    _id,
    researcherContacts,
  } = state.Survey;

  return {
    survey: {
      survey_questions,
      survey_title,
      survey_caption,
      survey_earnings,
      survey_budget,
      survey_image,
      target_audience,
      survey_audience_number,
      survey_active,
      survey_specific,
      participants,
      count,
      map,
      loading,
      message,
      payment,
      researchConductedVia,
      targetUsersFrom,
      research,
      response,
      _id,
      researcherContacts,
    },
    ...state.Layout,
  };
};

export default connect(mapPropsToState, null)(withRouter(Projects));

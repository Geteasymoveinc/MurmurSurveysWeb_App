import React from "react";
import { Component, Fragment } from "react";

import Logo from "../../../assets/images/surveys/logoBlue.svg";
import classes from "../../../assets/css/surveys/index.module.scss";
import classes2 from "../../../assets/css/CreateAd/index.module.css";
import Profile from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import { toggleSideBar } from "../../../store/actions";
import { connect } from "react-redux";
import { Link, withRouter, Switch, Route, useHistory } from "react-router-dom";

import PullSurveys from "./pullSurveys";
import Survey from "./index";

import { queryForEmail } from "../../../helpers/fakebackend_helper";

class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_edit_survey_mode: false,
      stripe: true,
      no_stripe_surveys: 0,
      user_id: "",
      loading: true,
    };
  }

  componentWillUnmount() {
    document.body.classList.remove("grey-background");
  }
  componentDidMount() {
    let create_edit_survey_mode = false;
    if (
      this.props.history.location.pathname.includes("/create-survey") ||
      this.props.history.location.pathname.includes("/update-survey")
    ) {
      create_edit_survey_mode = true;
    }
    document.body.classList.add("grey-background");
    this.props.toggleSideBar(false);

    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
      {
        email: sessionStorage.getItem("authUser"),
        role: "2",
      }
    )
      .then((user) => {
        const { _id, survey_payment } = user.resp;
        this.setState({
          ...this.state,
          user_id: _id,
          loading: false,
          create_edit_survey_mode,
          stripe: survey_payment.no_stripe_surveys === 0 ? true : false,
          no_stripe_surveys: survey_payment.no_stripe_surveys,
        });
      })
      .catch((err) =>
        this.setState({
          ...this.state,
          loading: false,
          create_edit_survey_mode,
        })
      );
  }

  componentDidUpdate(prevProps) {
    const current =
      this.props.history.location.pathname.includes("/create-survey") ||
      this.props.history.location.pathname.includes("/update-survey");
    if (current === false && this.state.create_edit_survey_mode === true) {
      window.location.reload();
    }
  }

  toggleToCreateSurveyMode = () => {
    this.props.history.push("/surveys/create-survey?publish=true");
    this.setState({
      ...this.state,
      create_edit_survey_mode: true,
    });
  };

  toggleToEditAndViewMode = () => {
    this.setState({
      ...this.state,
      create_edit_survey_mode: true,
    });
  };

  render() {
    const {
      create_edit_survey_mode,
      loading,
      user_id,
      stripe,
      no_stripe_surveys,
    } = this.state;
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
        {!loading && !create_edit_survey_mode && (
          <div className={classes.dash_right}>
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={Logo} alt="logo" />
                </a>
              </div>
              <div className={classes.menu_self_flex}></div>
              <div className={classes.dash_relative}>
                <div className={classes.search_box_flex_end}>
                  <Profile scope={"survey"} />
                </div>
              </div>
            </header>

            <div className={classes.surveys_container}>
              <div className={classes.create_ads}>
                <div className={classes2.ads_section}>
                  <div className={classes.cads_head}>
                    <div className={classes2.cads_head_left}>
                      <h4 className={classes2.cads_h4}>Your Current Surveys</h4>
                      <p className={classes2.cads_p}>
                        Here you can view the status of your surveys with all
                        the necessary details
                      </p>
                    </div>
                    <button
                      onClick={this.toggleToCreateSurveyMode}
                      type="button"
                      className={classes2.create_ads_btn}
                    >
                      Create Survey
                      <svg
                        width="20"
                        height="20"
                        className={classes2.create_ads_img}
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
        )}
        {create_edit_survey_mode && (
          <Switch>
            <Route path="/surveys/create-survey">
              <Survey
                survey={{ ...this.props.survey, loading: false }}
                payment={{
                  stripe,
                  no_stripe_surveys,
                }}
                user_id={user_id}
              />
            </Route>
            <Route path="/surveys/update-survey">
              <Survey
                survey={this.props.survey}
                payment={{
                  stripe,
                  no_stripe_surveys,
                }}
                user_id={user_id}
              />
            </Route>
          </Switch>
        )}
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
    country,
    analytics,
    map,
    loading,
    message,
    paid,
    stripe,
    _id,
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
      country,
      analytics,
      map,
      loading,
      message,
      paid,
      stripe,
      _id,
    },
  };
};

export default connect(mapPropsToState, { toggleSideBar })(withRouter(Surveys));

import React from "react";
import { Component, Fragment } from "react";

import LogoWhiteTheme from "../../assets/images/LogoWhiteTheme.png";
import classes from "../../assets/css/surveys/index.module.scss";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import { WarningFeedback } from "../../components/feedbacks";

import { connect } from "react-redux";
import { Link, withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import PullSurveys from "./pullSurveys";
import Survey from "./create/index";

import { queryForEmail } from "../../helpers/fakebackend_helper";


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {

      loading: true,
      user_id: "",
      company: "",
      selectedCampaign: {},
      subscription: null,
      warningFeedback: null
    };
  }

  componentDidMount() {

    queryForEmail(
      `https://backendapp.getinsightiq.com/api/v1/surveys/customer/checkEmail`,
      {
        email: sessionStorage.getItem("authUser")
      }
    )
      .then((user) => {
        const { _id, company, subscription } = user.resp;

       
        if (subscription == null) {
          this.setState( state => ({
            ...state,
            user_id: _id,
            loading: false,
            //create_edit_survey_mode: true,
            
            subscription: null,
            company,
          }));

          return;
        }
        
        axios
          .get(`https://backendapp.getinsightiq.com/api/v1/surveys/customer/subscriptions/${_id}`)
          .then((response) => {
            const { subscriptions } = response.data;

            const index = subscriptions.findIndex((el) => el.active);
            const paymentStatus = subscriptions[index]?.paymentStatus;
            const plan = subscriptions[index]?.package;
            const discount = subscriptions[index].discount;
 
  
            this.setState({
              ...this.state,
              user_id: _id,
              loading: false,
              //create_edit_survey_mode: true,
              subscription: { paymentStatus, plan, discount },
              warningFeedback: paymentStatus === 'incomplete',
              company,
            });
           

        setTimeout(() => {
              this.setState(state => ({

                ...state,
                warningFeedback: null
              }))
            }, 5000)

          })
          .catch((err) =>
            this.setState({
              ...this.state,
              loading: false,
              user_id: _id,
              //create_edit_survey_mode: true,
              subscription: null,
              company,
            })
          );
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
    const {loading, user_id, warningFeedback } = this.state;
    const url = this.props.location.search; //search property of history props
    const create_edit_survey = new URLSearchParams(url).get("survey_id");
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
                <WarningFeedback
              showFeedback={warningFeedback}
              feedback="You have unpaid subscription"
            />

          
            
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
                      Home
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
                  <Profile scope="global" />
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
          <Route path="/surveys/view-survey">
            <Survey
              survey={this.props.survey}
              user_id={user_id}
              company={this.state.company}
              subscription={this.state.subscription}
            />
          </Route>
          <Route path="/surveys/publish-survey">
            <Survey
              survey={this.props.survey}
              user_id={user_id}
              company={this.state.company}
              subscription={this.state.subscription}
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
    paid,
    hasAwsReports,
    answersCount
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
      paid,
      hasAwsReports,
      answersCount
    },
    ...state.Layout,
  };
};

export default connect(mapPropsToState, null)(withRouter(Projects));

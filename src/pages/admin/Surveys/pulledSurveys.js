import React from "react";

import axios from "axios";

import { Link, withRouter } from "react-router-dom";

import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";
import SurveyEye from "../../../assets/images/surveys/survey-eye.svg";
import SurveyEdit from "../../../assets/images/surveys/survey-edit.svg";
import SurveyPrice from "../../../assets/images/surveys/survey-price.svg";
import SampleImage2 from "../../../assets/images/surveys/sample-image2.png";
import Avatar from "../../../assets/images/avatar.png";
import classes from "../../../assets/css/CreateAd/index.module.css";
import classes2 from "../../../assets/css/surveys/surveys.module.css";

import Answers from "./answers";
import Details from "./details";
import View from "./question-answers";
import Survey from "./create/index";
import SurveyAnalytics from "./analytics";

class PulledSurveys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: false,
      checked: false,
      active: "",
      pulledSurveys: this.props.surveys,
      adds: this.props.adds,
      mode: "Answers",
    };

    this.async = null;
  }

  //ad-campaign
  handleSurveys = () => {
    const { pulledSurveys, mode } = this.state;

    let murmurCampaigns = [];

    if (pulledSurveys.length !== 0) {
      {
        pulledSurveys.map((campaign, i) => {
          let profile = campaign.customer.img;
          const hasImage =
            profile &&
            profile.split(
              "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
            )[1];
          if (hasImage === "null" || hasImage === "undefined") profile = Avatar;

          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <label>{campaign.survey_title}</label>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span className={`${classes.td_data} ${classes.td_data_2}`}>
                  <img
                    src={profile ? profile : Avatar}
                    alt="avatar"
                    className={classes.partner_profile_img}
                  />

                  <span>{campaign.customer.fullName}</span>
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {" "}
                  {campaign.answeredBy.length}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {campaign.survey_earnings}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {campaign.survey_status}
                </span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/surveys?survey=${campaign._id}&mode=${mode}`}
                  className={classes.details_link}
                >
                  {mode}
                  <img
                    src={ArrowRight}
                    alt=""
                    className={classes.details_img}
                  />
                </Link>
              </td>
            </tr>
          );
        });
      }
    }

    return murmurCampaigns;
  };
  handleWindowsView = () => {
    const murmurCampaigns = [];
    const { pulledSurveys } = this.state;
    if (pulledSurveys.length !== 0) {
      pulledSurveys.map((campaign, i) => {
        let profile = campaign.customer.img;
        let survey = campaign.survey_img;

        const hasImage =
          profile &&
          profile.split(
            "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
          )[1];
        if (hasImage === "null" || hasImage === "undefined") profile = Avatar;
        const hasSurveyImage =
          survey &&
          survey.split(
            "https://backendapp.murmurcars.com/advertisers/surveys/"
          )[1];
        if (hasSurveyImage === "null" || hasSurveyImage === "undefined")
          survey = SampleImage2;

        murmurCampaigns.push(
          <div
            key={i}
            className={`${classes2.window_container} ${
              this.state.active === campaign._id
                ? classes2.window_container_active
                : null
            }`}
            onClick={() => this.toggleSurveyWindow(campaign._id)}
          >
            <div className={classes2.survey_image_container}>
              <img
                src={survey ? survey : SampleImage2}
                alt="survey"
                className={classes2.survey_image}
              />
              <h1>{campaign.campaign_name}</h1>
              <span className={classes2.customer_personal_data}>
                by
                <img
                  src={profile ? profile : Avatar}
                  slt="avatar"
                  className={classes.partner_profile_img_smaller}
                />
                {`${campaign.customer.fullName}`}
              </span>
            </div>
            <div className={classes2.surveys_analytics}>
              <span>
                <img src={SurveyEye} alt="eye icon" /> {campaign.views}
              </span>
              <span>
                <img src={SurveyEdit} alt="eye icon" />{" "}
                {campaign.answeredBy.length}
              </span>
              <span>
                <img src={SurveyPrice} alt="eye icon" />{" "}
                {campaign.survey_earnings}
              </span>
            </div>
          </div>
        );
      });
    }
    return murmurCampaigns;
  };

  toggleSurveyWindow = (id) => {
    const active = this.state.active;
    let value = id;
    if (active === id) {
      value = "";
    }

    this.setState({
      ...this.state,
      active: value,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.surveys.length !== this.state.pulledSurveys.length
    ) {
      this.setState({
        ...this.state,
        pulledSurveys: this.props.surveys,
        adds: this.props.adds,
      });
    }
  }

  switchBetweenAnalyticsAndDetals = (e) => {
    const mode = e.target.value;

    this.setState({
      ...this.state,
      mode,
    });
  };

  returnComponent = () => {
    const { pulledSurveys } = this.state;

    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get("survey"); //extracting id
    const mode = new URLSearchParams(url).get("mode");
    let survey = [];
    if (id) {
      survey = pulledSurveys.filter((survey) => {
        if (survey._id === id) {
          return survey;
        }
      })[0];
    }

    let component;
    if (mode === "Answers")
      component = <Answers answers={survey.analytics} id={id} />;
    else if (mode === "Details")
      component = <Details survey={survey} id={id} />;
    else if (mode === "survey-view")
      component = <View surveys={survey.survey_questions} />;
    else if (mode === "update-survey") component = <Survey id={id} />;
    else if (mode === "create-survey") component = <Survey />;
    else if(mode === 'Analytics') component = <SurveyAnalytics id={id}/>
     return component;
  };

  render() {
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get("survey"); //extracting id
    let survey = [];
    if (id) {
      survey = this.state.pulledSurveys.filter((survey) => {
        if (survey._id === id) {
          return survey.analytics;
        }
      })[0];
    }

    const { mode } = this.state;
    const { view } = this.props;

    return (
      <React.Fragment>
        {!this.props.location.search.length && view.table ? (
          <div className={classes.cads_table} style={{ marginBottom: "100px" }}>
            <table>
              <thead>
                <tr className={classes.first_tr}>
                  <th className={`${classes.cads_th}`}>
                    <span> Name</span>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Customer</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                    <span>Answers</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Budget</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Status</span>
                  </th>
                  <th className={classes.select_mode}>
                    <select onChange={this.switchBetweenAnalyticsAndDetals}>
                      <option value={mode}>{mode}</option>
                      {["Answers",'Analytics', "Details"].map((el, i) => {
                        if (el !== mode) {
                          return (
                            <option key={i} value={el}>
                              {el}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody>{this.handleSurveys()}</tbody>
            </table>
          </div>
        ) : !this.props.location.search.length ? (
          <div className={classes2.surveys_windows_container}>
            {this.handleWindowsView()}
          </div>
        ) : (
          this.returnComponent()
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(PulledSurveys);

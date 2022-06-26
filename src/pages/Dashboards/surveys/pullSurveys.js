import React, { Component, Fragment } from "react";

import classes from "../../../assets/css/CreateAd/index.module.css";
import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";

import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class PullSurveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pulledSurveys: {
        hasSurveys: false,
        surveys: [],
      },
      surveys: [
        {
          "survey-1": true,
          toggled: false,
          id: "1111",
          checked: false,
        },
      ],
      multiple: false,
      checked: false,
    };
  }

  toggleDeleteSurvey = (id) => {
    axios.delete(
      `https://backendapp.murmurcars.com/api/v1/surveys/survey/delete-survey/${id}`
    )
    .then(() => {
      window.location.reload();
      this.setState({ ...this.state, loading: false });
    })
    .catch(err => {
      this.setState({ ...this.state, loading: false });
    })
  };
  componentDidMount() {
    const user_id = this.props.user_id;
    let hasSurveys = false;
    axios
      .get(
        `https://backendapp.murmurcars.com/api/v1/surveys/survey/fetch-admin-surveys/${user_id}`
      )
      .then((response) => {
        const { surveys: surveys_data } = response.data;
      
        const surveys = [];

        for (let i = 0; i < surveys_data.length; i++) {
          const name = `survey-${i + 1}`;
          console.log(surveys_data[i])
          hasSurveys = true;
          const survey = {
            [name]: surveys_data[i].survey_active,
            toggled: false,
            id: surveys_data[i].survey_id,
            checked: false,
          };
          surveys.push(survey);
        }
 
        this.setState({
          ...this.state,
          loading: false,
          pulledSurveys: {
            hasSurveys,
            surveys: surveys_data,
          },
          surveys,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
          pulledSurveys: {
            hasSurveys,
            surveys: [],
          },
        });
      });
  }

  changeSurveyStatus(id) {
    const target = id;
    const surveys = this.state.surveys;
    let count = 0;
    let multiple = false;
    let isSwitchRadiosInctive = false;

    for (let i = 0; i < surveys.length; i++) {
      const keys = Object.keys(surveys[i]);
      if (!surveys[i][keys[0]]) {
        count++;
      }
      if (surveys[i]["toggled"]) {
        count++;

        if (!surveys[i][keys[0]]) {
          isSwitchRadiosInctive = true;
        }
        surveys[i][keys[0]] = !surveys[i][keys[0]];
      } else if (surveys[i]["id"] === target) {
        count++;
        if (!surveys[i][keys[0]]) {
          isSwitchRadiosInctive = true;
        }
        surveys[i][keys[0]] = !surveys[i][keys[0]];
      }
    }
    if (count > 1 && !isSwitchRadiosInctive) {
      multiple = true;
    }
    this.setState({
      ...this.state,
      surveys,
      multiple,
    });
  }
  checkSurvey = (event) => {
    const id = event.target.id;
    const surveys = this.state.surveys;
    for (let i = 0; i < surveys.length; i++) {
      const keys = Object.keys(surveys[i]);

      if (keys[0] === id) {
        surveys[i].toggled = !surveys[i].toggled;
        surveys[i].checked = !surveys[i].checked;
      }
    }
    this.setState({
      ...this.state,
      surveys,
    });
  };

  checkAllSurveys = () => {
    const campaigns = this.state.pulledSurveys.surveys.length;
    const surveys = this.state.surveys;

    for (let i = 0; i < campaigns; i++) {
      if (this.state.checked === true) {
        surveys[i].toggled = false;
        surveys[i].checked = false;

        this.setState({ checked: false, surveys });
      } else {
        surveys[i].toggled = true;
        surveys[i].checked = true;
        this.setState({ checked: true, surveys });
      }
    }
  };

  handleSurveys = () => {
    const { multiple } = this.state;
    let murmurCampaigns = [];

    if (this.state.pulledSurveys.hasSurveys) {
      {
        this.state.pulledSurveys.surveys.map((survey, i) => {
          murmurCampaigns.push(
            <tr key={i}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <div className={classes.cads_check}>
                    <input
                      type="checkbox"
                      id={`survey-${i + 1}`}
                      checked={
                        (this.state.checked ||
                          (this.state.pulledSurveys.hasSurveys &&
                            this.state.surveys[i].checked)) &&
                        this.state.pulledSurveys.hasSurveys &&
                        this.state.surveys[i].checked
                      }
                      onChange={this.checkSurvey}
                    />
                    <label htmlFor={`survey-${i + 1}`}>
                      {survey.survey_title}
                    </label>
                  </div>
                  <div className={`${classes.cads_radio_active}`}>
                    {!this.state.surveys[i]["survey-" + (i + 1)] && !multiple && (
                      <button
                        type="button"
                        className={`${classes.check_remove}`}
                        onClick={() => this.toggleDeleteSurvey(survey.survey_id)}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                    <label
                      className={classes.switch}
                      htmlFor={`checkbox${i + 1}`}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox${i + 1}`}
                        name={`survey-${i + 1}`}
                        checked={this.state.surveys[i]["survey-" + (i + 1)]}
                        onChange={() => this.changeSurveyStatus(survey.survey_id)}
                      />
                      <div
                        className={`${classes.slider} ${classes.round}`}
                      ></div>
                    </label>
                  </div>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span
                  className={`${
                    this.state.surveys[i]["survey-" + (i + 1)]
                      ? classes.cads_active_dot
                      : classes.cads_deactive_dot
                  }`}
                >
                  <span className={classes.cads_dot}></span>{" "}
                  {`${
                    this.state.surveys[i]["survey-" + (i + 1)]
                      ? "Active"
                      : "Deactive"
                  }`}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {" "}
                  {survey.survey_audience_count}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{survey.survey_price}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {survey.survey_location}
                </span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/surveys/create-survey?survey_id=${survey.survey_id}`}
                  className={classes.details_link}
                  onClick={() =>
                    this.props.toggleToEditAndViewMode()
                  }
                >
                  Details
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


  toggleDeleteMultipleSurveys = () => {
    const surveys = this.state.surveys
    const list_of_ids = [] 
    this.setState({ ...this.state, loading: true });
    for(let i=0;i<surveys.length;i++){
        const keys = Object.keys(surveys[i])
        if(!surveys[i][keys[0]]){
            list_of_ids.push(surveys[i].id)
        }
    }
  
    axios.delete(`https://backendapp.murmurcars.com/api/v1/surveys/survey/delete-multiple-surveys/${list_of_ids}`)
    .then(() => {
      window.location.reload();
      this.setState({ ...this.state, loading: false });
    })
    .catch(err => {
      this.setState({ ...this.state, loading: false });
    })
  }
  render() {
    const { multiple } = this.state;
  
    return (
      <Fragment>
        {this.state.loading && (
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

        <div className={classes.cads_table}>
          <table>
            <thead>
              <tr className={classes.first_tr}>
                <th className={`${classes.cads_th}`}>
                  <div
                    className={`${classes.cads_check} ${classes.invoice_th}`}
                  >
                    <input
                      type="checkbox"
                      id="invoice-txt"
                      onChange={this.checkAllSurveys}
                      checked={this.state.checked}
                    />
                    <label htmlFor="invoice-txt">Name</label>
                    {multiple && (
                      <button
                        type="button"
                        className={`${classes.check_remove} ${classes.multiple_remove}`}
                        onClick={() => this.toggleDeleteMultipleSurveys()}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                  </div>
                </th>
                <th className={classes.cads_th}>
                  <span>Status</span>
                </th>
                <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                  <span>Number of people</span>
                </th>
                <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                  <span>Survey Budget</span>
                </th>
                <th className={classes.cads_th}>
                  <span>Area</span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.handleSurveys()}</tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

export default PullSurveys;

import React, { Component, Fragment } from 'react';

import classes from '../../assets/css/surveys/index.module.scss';
import Trash from '../../assets/images/trash.svg';
import ArrowRight from '../../assets/images/arrow-right.svg';

import { Link } from 'react-router-dom';

import axios from 'axios';

class PullSurveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      surveys: [],
      multiple_remove: false,
      multiple: false,
    };
  }

  toggleDeleteSurvey = (id) => {
    axios
      .delete(
        `https://stagingapp.murmurcars.com/api/v1/surveys/survey/delete-survey/${id}`,
      )
      .then(() => {
        window.location.reload();
        this.setState({ ...this.state, loading: false });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
      });
  };
  componentDidMount() {
    const user_id = this.props.user_id;

    axios
      .get(
        `https://stagingapp.murmurcars.com/api/v1/surveys/survey/fetch-surveys/${user_id}`,
      )
      .then((response) => {
        const { surveys: surveys_data } = response.data;
        for (let survey of surveys_data) {
          survey.checked = false;
        }

        this.setState({
          ...this.state,
          loading: false,

          surveys: surveys_data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,

          surveys: [],
        });
      });
  }

  /*changeSurveyStatus(id) {
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
  }*/
  checkSurvey = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;
    const surveys = [...this.state.surveys];
    let multiple = false;
    let count = 0;
    if (checked) {
      count++;
    }

    for (let i = 0; i < surveys.length; i++) {
      if (surveys[i]._id === id) {
        surveys[i].checked = checked;
      }

      if (surveys[i]._id !== id && surveys[i].checked) {
        count++;
      }
    }
    if (count > 1) {
      multiple = true;
    }
    this.setState((state) => ({
      ...state,
      surveys,
      multiple_remove: multiple,
    }));
  };

  checkAllSurveys = (e) => {
    const surveys = [...this.state.surveys];
    const checked = e.target.checked;

    for (let i = 0; i < surveys.length; i++) {
      surveys[i].checked = checked;
    }

    this.setState((state) => ({
      ...state,
      surveys,
      multiple: checked,
      multiple_remove: checked,
    }));
  };

  handleSurveys = () => {
    const { multiple, multiple_remove } = this.state;
    let murmurCampaigns = [];

    this.state.surveys.map((survey, i) => {
      murmurCampaigns.push(
        <tr key={survey._id}>
          <td className={classes.cads_td}>
            <div className={classes.cads_flex_th}>
              <div className={classes.cads_check}>
                <input
                  type="checkbox"
                  id={survey._id}
                  checked={(multiple && survey.checked) || survey.checked}
                  onChange={this.checkSurvey}
                />
                <label htmlFor={survey._id}>
                  <span className={classes.td_data}>{survey.survey_title}</span>
                </label>
              </div>
              <div className={`${classes.cads_radio_active}`}>
                {survey.checked && !multiple_remove ? (
                  <button
                    type="button"
                    className={`${classes.check_remove}`}
                    onClick={() => this.toggleDeleteSurvey(survey._id)}
                  >
                    <img src={Trash} alt="" />
                  </button>
                ) : null}
              </div>
            </div>
          </td>

          <td className={classes.cads_td}>
            <span
              className={`${
                survey.paid
                  ? classes.cads_active_dot
                  : survey.payment === 'free' ? null :  classes.cads_deactive_dot
              }`}
            >
              <span className={classes.cads_dot}></span>{' '}
              {`${survey.paid ? 'Paid' : survey.payment === 'free' ? '' :  'Not paid'}`}
            </span>
          </td>
          <td className={classes.cads_td}>
            <span
              className={`${
                survey.survey_active
                  ? classes.cads_active_dot
                  : classes.cads_deactive_dot
              }`}
            >
              <span className={classes.cads_dot}></span>{' '}
              {`${survey.survey_active ? 'Active' : 'Inactive'}`}
            </span>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>
              {' '}
              {survey.survey_audience_count}
            </span>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>{survey.survey_budget}</span>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>{survey.survey_location}</span>
          </td>
          {/*<td className={classes.cads_td}>
                <span className={`${classes.td_data} ${survey.paid ? classes.success : classes.failed}`}>
                  {survey.paid ? "Paid" : 'Not Paid'}
                </span>
                </td>*/}
          <td className={classes.cads_td}>
            {survey.survey_status !== 'In Review' ? (
              <span
                className={`${
                  survey.survey_status === 'Approved'
                    ? classes.cads_active_dot
                    : classes.cads_deactive_dot
                }`}
              >
                <span className={classes.cads_dot}></span>{' '}
                {`${
                  survey.survey_status === 'Approved'
                    ? 'Approved'
                    : survey.survey_status === 'Declined'
                    ? 'Declined'
                    : null
                }`}
              </span>
            ) : (
              <span className={classes.cads_review}>In Review</span>
            )}
          </td>
          <td className={classes.cads_td}>
            <Link
              to={`/surveys/view-survey?survey_id=${survey._id}`}
              className={classes.details_link}
              onClick={() => this.props.toggleToEditAndViewMode()}
            >
              Details
              <img src={ArrowRight} alt="" className={classes.details_img} />
            </Link>
          </td>
        </tr>,
      );
    });

    return murmurCampaigns;
  };

  toggleDeleteMultipleSurveys = () => {
    const surveys = this.state.surveys;
    const list_of_ids = [];

    this.setState({ ...this.state, loading: true });

    for (let survey of surveys) {
      if (survey.checked) {
        list_of_ids.push(survey._id);
      }
    }

    axios
      .delete(
        `https://stagingapp.murmurcars.com/api/v1/surveys/survey/delete-multiple-surveys/${list_of_ids}`,
      )
      .then(() => {
        window.location.reload();
        this.setState({ ...this.state, loading: false });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
      });
  };

  render() {
    const { multiple, multiple_remove } = this.state;

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
          <div />
          <table>
            <thead>
              <tr className={classes.first_tr}>
                <th className={`${classes.cads_th}`}>
                  <div
                    className={`${classes.cads_check} ${classes.invoice_th}`}
                  >
                    <input
                      type="checkbox"
                      id="survey"
                      onChange={this.checkAllSurveys}
                      checked={multiple}
                    />
                    <label htmlFor="survey">Name</label>
                    {multiple_remove && (
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
                  <span>Payment</span>
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
                {/*} <th className={classes.cads_th}>
                  <span>Payment</span>
                    </th>*/}
                <th></th>
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

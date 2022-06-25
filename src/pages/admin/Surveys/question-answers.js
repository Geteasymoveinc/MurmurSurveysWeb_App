import React, { Component, Fragment } from "react";

import { Link, withRouter } from "react-router-dom";

import classes from "../../../assets/css/surveys/index.module.scss";
import classes2 from "../../../assets/css/CreateAd/ads-details/index.module.css";
import Chevron_Down from "../../../assets/images/surveys/chevron-down.svg";
import Trash2 from "../../../assets/css/CreateAd/ads-details/trash.svg";

import DeclineSurvey from "./modals/decline-survey";
import axios from "axios";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: this.props.surveys,
      survey: {},
      modal: false,
      loading: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { surveys: prev_surveys } = prevProps;
    const { surveys } = this.props;

    if (prev_surveys.length !== surveys.length) {
      this.setState({
        ...this.state,
        surveys,
      });
    }
  }

  toggleDeclineSurveyReasoningModal = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
    });
  };

  putChangedStatusToBackend = (id, status, reason) => {
    const data = { survey_status: status };
    if (reason) {
      data.declining_reason = reason;
    }

    axios
      .put(
        `https://backendapp.murmurcars.com/api/v1/admin/change-survey-status/${id}`,
        {
          ...data,
        }
      )
      .then((response) => {
        this.props.history.push('/surveys')
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { surveys, modal, loading } = this.state;

    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get("survey"); //extracting id
    return (
      <Fragment>
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
          <div className={` ${classes.flexbox} `}>
            <div className={`${classes.rows} ${classes.rows_2}`}>
              <div className={`${classes.pies}`}>
                <div className={classes.survey_info}></div>
                <div className={classes.chart_contaioner_2}>
                  {surveys.length > 0 &&
                    surveys.map((survey, i) => {
                      return (
                        <div className={`${classes.item1}`} key={i}>
                          {/*container for survey*/}
                          <div className={classes.question_answer}>
                            {/*image*/}
                            {survey.image && survey.image.image_url && (
                              <div
                                className={` ${classes.survey_image_container}`}
                              >
                                {survey.image.image_url && (
                                  <img
                                    src={survey.image.image_url}
                                    alt="survey question image"
                                    className={` ${classes.survey_image_img}`}
                                  />
                                )}
                              </div>
                            )}
                            {/*question*/}
                            <h4
                              className={`${
                                survey.image &&
                                survey.image.image_url &&
                                classes.margin_top
                              }`}
                            >
                              {survey.question}
                            </h4>

                            {/*answers ---options*/}
                            <span
                              className={classes.question_answers_container}
                            >
                              {survey.type === "dropdown" ? (
                                <span
                                  className={
                                    classes.selection_options_container
                                  }
                                >
                                  <select
                                    className={`${classes.survey_input} ${classes.survey_selection}`}
                                  >
                                    {survey.answers.map((answer, index) => (
                                      <option key={index} value={answer}>
                                        {answer}
                                      </option>
                                    ))}
                                  </select>
                                  <img
                                    src={Chevron_Down}
                                    alt="arrow"
                                    className={classes.select_icon}
                                  />
                                </span>
                              ) : (
                                survey.answers.map((answer, index) => {
                                  return (
                                    <span
                                      className={classes.question_answer_span}
                                      key={index}
                                    >
                                      <input
                                        id={`answer${i + 1}-${index + 1}`}
                                        type={`${
                                          survey.type === "radio"
                                            ? "radio"
                                            : survey.type === "checkbox"
                                            ? "checkbox"
                                            : survey.type === "text"
                                            ? "text"
                                            : null
                                        }`}
                                        className={`${
                                          survey.type === "text" &&
                                          classes.survey_input
                                        } ${
                                          survey.type === "text" &&
                                          classes.survey_input_2
                                        }`}
                                        name={`options${i + 1}`}
                                        placeholder={`${
                                          survey.type === "text" && "Answer"
                                        }`}
                                      />
                                      {survey.type !== "text" && (
                                        <label
                                          htmlFor={`answer${i + 1}-${
                                            index + 1
                                          }`}
                                        >
                                          {" "}
                                          {answer}
                                        </label>
                                      )}
                                    </span>
                                  );
                                })
                              )}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <div className={classes2.delete_ads}>
                <button
                  type="button"
                  className={classes2.delete_ads_btn}
                  onClick={this.toggleDeclineSurveyReasoningModal}
                >
                  <span>Decline Survey</span>
                </button>
              </div>
              <div
                className={`${classes2.delete_ads} ${classes2.activate_customer}`}
              >
                <button
                  type="button"
                  className={classes2.delete_ads_btn}
                  onClick={() =>
                    this.putChangedStatusToBackend(id, "Approved", null)
                  }
                >
                  <span>Approve Survey</span>
                </button>
              </div>
            </div>
            <DeclineSurvey
              modal={modal}
              toggleModal={this.toggleDeclineSurveyReasoningModal}
              declineSurvey={this.putChangedStatusToBackend}
              id={id}
            />
          </div>
        )}
      </Fragment>
    );
  }
}

export default withRouter(View);

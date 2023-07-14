import React, { Component } from "react";

import classes from "../../assets/css/surveys/index.module.scss";
import Chevron_Down from "../../assets/images/surveys/chevron-down.svg";

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: this.props.surveys,
      survey: {},
    };
  }

  render() {
    const { surveys } = this.state;
    return (
      <div className={`${classes.flex_container_2}`}>
        <div className={` ${classes.flexbox} `}>
          <div className={`${classes.rows} ${classes.rows_2}`}>
            <div className={`${classes.pies}`}>
              <div className={classes.survey_info}></div>
              <div className={classes.chart_contaioner_2}>
                {surveys.length > 0 &&
                  surveys.map((survey, i) => {
                    return (
                      <div className={`${classes.item1}`}>
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
                          <span className={classes.question_answers_container}>
                            {survey.type === "dropdown" ? (
                              <span
                                className={classes.selection_options_container}
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
                                        htmlFor={`answer${i + 1}-${index + 1}`}
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
        </div>
      </div>
    );
  }
}

export default Preview;

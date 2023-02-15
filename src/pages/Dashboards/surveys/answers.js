import React, { Component } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";
import "../../../assets/css/surveys/modal.scss";
import BarDefault from "./pie-charts/bar-default";

import { Row, Col, Card, Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

import Pie from "./pie-charts/pie";

class SurveyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      haveAnalytics:false,
      answers: this.props.analytics,
      loading: false,
      analytics: {},
      survey: {},

    };
  }

  analyticsModal = (question, id) => {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
    });

    axios
      .get(
        `https://backendapp.murmurcars.com/api/v1/surveys/survey/survey-answer-analytics?id=${id}&question=${question}`
      )
      .then((response) => {
        const { Analytics } = response.data;
        this.setState({
          ...this.state,
          analytics: Analytics,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.setState((state) => {
      return {
        ...state,
        loading: true,
      };
    });
    const { id, survey_questions } = this.props;
    const questions = {};
    const types = {};

    for (let el of survey_questions) {
      const { answers, question, type, important } = el;
      questions[question] = {};
      types[question] = type;
      for (let answer of answers) {
        questions[question][answer] = 0;
      }
    }
  
    axios
      .post(
        `https://backendapp.murmurcars.com/api/v1/surveys/survey/survey-analytics/${id}`,
        {
          questions,
          types,
        }
      )
      .then((response) => {
        const { data} = response;
        console.log(data)
        this.setState((state) => {
          return {
            ...state,
            loading: false,
            survey: data.status !==204 ? data : [],
            hasAnalytics: data.status !== 204 ? true : false,
          };
        });
      })
      .catch((err) => {
        this.setState((state) => {
          return {
            ...state,
            loading: true,
            hasAnalytics: false,
          };
        });
      });
  }

  render() {
    const { id } = this.props;
    const { modal, analytics, survey, loading, hasAnalytics } = this.state;
    const questions = Object.keys(survey);
    return (
      <>
        {loading ? (
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
        ) : (
          <div className={` ${classes.flexbox} ${classes.flexbox_2}`}>
            {hasAnalytics ? (
              questions.map((el, i) => {
                const answers = Object.keys(survey[el]);
                const series = Object.values(survey[el]);
                console.log(answers)
                console.log(series)
                return (
                  <div key={i} className={`${classes.rows} ${classes.rows_2}`}>
                    <div className={`${classes.pies}`}>
                      <div className={classes.survey_info}>
                        <span>
                          Question:<h1> {el}</h1>
                        </span>
                        <button
                          className={classes.show_anal_button}
                          type="button"
                          onClick={() => this.analyticsModal(el, id)}
                        >
                          Analytics
                        </button>
                      </div>
                      <div className={classes.chart_contaioner_2}>
                        <BarDefault
                          categories={answers}
                          series={series}
                          title={el}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-100 ">
                <h1 className="text-center">Surey yet has no response </h1>
              </div>
            )}
            <div className="modal">
              <Modal
                isOpen={modal}
                //toggle={this.props.toggleModal}
                className={`setting_cancel_modal`}
              >
                <ModalBody>
                  <div className={` ${classes.flexbox} ${classes.flexbox_2}`}>
                    {Object.keys(analytics).map((analytic, i) => {
                      return (
                        <div className={classes.no_block_shadow} key={i}>
                          <h1 className={classes.question}>{analytic}</h1>
                          <div className="d-flex ">
                            <div className={`${classes.pies}`}>
                              <div className={classes.survey_info}>
                                <h1 className={classes.audience_segment}>
                                  Gender
                                </h1>
                              </div>
                              <div className={classes.chart_contaioner}>
                                <Pie
                                  series={Object.values(
                                    analytics[analytic].gender
                                  )}
                                  categories={Object.keys(
                                    analytics[analytic].gender
                                  )}
                                  show_categories={false}
                                />
                              </div>
                            </div>

                            <div className={classes.pies}>
                              <div className={classes.survey_info}>
                                <h1>Location</h1>
                              </div>
                              <div className={classes.chart_contaioner}>
                                <Pie
                                  series={Object.values(
                                    analytics[analytic].location
                                  )}
                                  categories={Object.keys(
                                    analytics[analytic].location
                                  )}
                                  show_categories={false}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* <div className={`${classes.rows} ${classes.rows_2}`}>
          <div className={`${classes.pies} ${classes.pies_2}`}>
          <div className={`${classes.survey_info} ${classes.survey_info_2}`}>
                <h1>Gender</h1>
                <span className={classes.chart__gender_groups}>
                       <button onClick={() => this.selectBarChartGenderGroup('All')}>All</button>
                       <button onClick={() => this.selectBarChartGenderGroup('Woman')}>Woman</button>
                       <button onClick={() => this.selectBarChartGenderGroup('Man')}>Man</button>
                </span>
            </div>
            <div className={classes.question_answer}>
          <Bar/>
            </div>
          </div>
          
          <div className={`${classes.pies} ${classes.pie_location}`}>
            <div className={classes.question_answer}>
              <BarHorisontal/>
            </div>
          </div>
          
      </div>*/}
                  </div>
                </ModalBody>
                <ModalFooter className={classes.modal_footer}>
                  <Row>
                    <Col></Col>
                  </Row>
                  <button
                    type="button"
                    className="reason_cancel_btn"
                    onClick={() => {
                      this.setState({ ...this.state, modal: false });
                    }}
                  >
                    Close
                  </button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SurveyAnswers;

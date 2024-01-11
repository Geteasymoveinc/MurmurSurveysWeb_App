import React, { Component, Fragment } from 'react';

import classes from '../../../assets/css/surveys/analytics.module.scss';
import classes2 from '../../../assets/css/surveys/analytics.module.scss';

import BarDefault from '../charts/bar-default';

import axios from 'axios';

class SurveyAWSReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveAnalytics: false,
      answers: this.props.analytics,
      loading: false,
      question: null,
      analytics: {},
      survey: {},
    };
  }

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
      .get(`https://backendapp.getinsightiq.com/api/v1/aws-recognition/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error();
        }
        const { data } = response;
        this.setState((state) => {
          return {
            ...state,
            loading: false,
            survey: data.reports,
            hasAnalytics: true,
          };
        });
      })
      .catch((err) => {
        this.setState((state) => {
          return {
            ...state,
            loading: false,
            hasAnalytics: false,
          };
        });
      });
  }

  render() {
    const { id, layoutTheme } = this.props;
    const { analytics, survey, loading, hasAnalytics, question } = this.state;
    const questions = Object.keys(survey);

    return (
      <Fragment>
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
        ) : question == null && hasAnalytics ? (
          <div
            className={`${classes2.flex_container_2} ${classes2[layoutTheme]}`}
          >
          
            <div className={` ${classes.flexbox} ${classes.flexbox_2}`}>
            
               { questions.map((el, i) => {
                  const answers = Object.keys(survey[el]);
                  const series = Object.values(survey[el]);

                  return (
                    <div
                      key={i}
                      className={`${classes.rows} ${classes.rows_2}`}
                    >
                      <div className={`${classes.pies} w-100 mb-3`}>
                      <div className={classes.survey_info}>
                    <h1>{el}</h1>
                  </div >
                        <div className={classes.chart_contaioner}>
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
              }
            </div>
          </div>
        ) :         <div className="w-100 ">
        <h1 className="text-center">Surey yet has no response </h1>
      </div>}
      </Fragment>
    );
  }
}

export default SurveyAWSReport;

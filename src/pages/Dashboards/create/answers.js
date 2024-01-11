import React, { Component, Fragment } from 'react';

import classes from '../../../assets/css/surveys/answers.module.scss';
import classes2 from '../../../assets/css/surveys/analytics.module.scss';
import classes3 from '../../../assets/css/surveys/index.module.scss';

import BarDefault from '../charts/bar-default';
import Pie from '../charts/pie';

import axios from 'axios';

class SurveyAnswers extends Component {
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

  analyticsModal = (question) => {
    const { user_professions, districts, id } = this.props;
    this.setState({
      ...this.state,
      modal: !this.state.modal,
      loading: true,
    });

    axios
      .post(
        `https://backendapp.getinsightiq.com/api/v1/admin/survey-answer-analytics?id=${id}&question=${question}`,
        { districts, user_professions },
      )
      .then((response) => {
        const { Analytics } = response.data;

        this.setState({
          ...this.state,
          analytics: Analytics,
          loading: false,
          question,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
    
          loading: false,
          
        });
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
        `https://backendapp.getinsightiq.com/api/v1/admin/survey-analytics/${id}`,
        {
          questions,
          types,
        },
      )
      .then((response) => {
        const { data } = response;

        this.setState((state) => {
          return {
            ...state,
            loading: false,
            survey: data.status !== 204 ? data : [],
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
    const { layoutTheme, surveyTitle, answersCount } = this.props;
    const { analytics, survey, loading, hasAnalytics, question } = this.state;
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
        ) : question == null ? (
          <div
            className={`${classes2.flex_container_2} ${classes2[layoutTheme]}`}
          >
            <div className={classes2.btns}>
              <button
                className="bg-transparent border-0"
                onClick={() => {
                  const { survey, id } = this.props;
                  this.setState((state) => ({
                    ...state,
                    loading: true,
                  }));
                  axios
                    .get(
                      `https://backendapp.getinsightiq.com/api/v1/admin/pdf?surveyTitle=${survey}&id=${id}&page=survey`,
                    )
                    .then((response) => {
                      const { link } = response.data;
                      window.open(link, '_blank');
                      this.setState((state) => ({
                        ...state,
                        loading: false,
                      }));
                    })
                    .catch((err) => {
                      this.setState((state) => ({
                        ...state,
                        loading: false,
                      }));
                    });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 64"
                  enableBackground="new 0 0 56 64"
                  fill="#000000"
                  width="50"
                  height="50"
                >
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    {' '}
                    <g>
                      {' '}
                      <path
                        fill="#8C181A"
                        d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"
                      ></path>{' '}
                      <path
                        fill="#6B0D12"
                        d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"
                      ></path>{' '}
                      <path
                        opacity="0.5"
                        fill="#FFFFFF"
                        enableBackground="new"
                        d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"
                      ></path>{' '}
                    </g>{' '}
                    <path
                      fill="#FFFFFF"
                      d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"
                    ></path>{' '}
                  </g>
                </svg>
              </button>
              <button
                className="bg-transparent border-0 mr-3 ml-3"
                onClick={() => {
                  axios
                    .post(
                      'https://backendapp.getinsightiq.com/api/v1/admin/generate-pptx',
                      {
                        analyticsCategory: 'options',
                        slideTitles: questions,
                        analytics: Object.values(survey),
                        title: surveyTitle,
                        totalAnswers: answersCount,
                      },
                    )
                    .then((res) => {
                      const { file } = res.data;

                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = file;
                      // the filename you want
                      a.download = `${surveyTitle}.pptx`;
                      document.body.appendChild(a);
                      a.click();
                    })
                    .catch((err) => {
                  
                    });
                }}
              >
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="1.41421"
                  viewBox="180 100 210 200"
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                >
                  <g fillRule="nonzero">
                    <path
                      d="m293.75 103.75c-52.743.154-96.096 43.507-96.25 96.25l121.942 25.692z"
                      fill="#ed6c47"
                    />
                    <path
                      d="m293.75 103.75c52.743.154 96.096 43.507 96.25 96.25l-48.125 32.711-48.125-32.711z"
                      fill="#ff8f6b"
                    />
                    <path
                      d="m293.75 296.25c52.743-.154 96.096-43.507 96.25-96.25h-192.5c.154 52.743 43.507 96.096 96.25 96.25z"
                      fill="#d35230"
                    />
                    <path
                      d="m284.579 138.125h-64.357c-32.429 38.213-29.609 95.765 6.4 130.625h57.964c5.021-.015 9.149-4.143 9.164-9.164v-112.29c-.015-5.022-4.143-9.149-9.164-9.164z"
                      fillOpacity=".098039"
                    />
                    <path
                      d="m277.704 145h-62.755c-29.264 41.526-20.581 99.496 19.566 130.625h43.189c5.022-.015 9.149-4.143 9.164-9.164v-112.29c-.015-5.022-4.142-9.149-9.164-9.164zm0 0h-62.755c-25.028 35.485-22.851 83.785 5.266 116.875h57.482c5.021-.015 9.149-4.143 9.164-9.164v-98.54c-.015-5.022-4.143-9.149-9.164-9.164zm-6.875 0h-55.88c-25.028 35.485-22.851 83.785 5.266 116.875h50.607c5.021-.015 9.149-4.143 9.164-9.164v-98.54c-.015-5.022-4.143-9.149-9.164-9.164z"
                      fillOpacity=".2"
                    />
                    <path
                      d="m179.164 145h91.665c5.027 0 9.164 4.137 9.164 9.164v91.665c0 5.027-4.137 9.164-9.164 9.164h-91.665c-5.027 0-9.164-4.137-9.164-9.164v-91.665c0-5.027 4.137-9.164 9.164-9.164z"
                      fill="#c43e1c"
                    />
                    <path
                      d="m224.979 165.625c6.768-.455 13.483 1.506 18.941 5.534 4.533 4.046 6.96 9.962 6.572 16.026.074 3.885-1.062 7.699-3.251 10.911-2.229 3.553-5.438 6.388-9.24 8.16-4.347 2.016-9.097 3.01-13.888 2.908h-13.138v25.204h-13.475v-68.75zm-14.004 32.196h11.598c3.674.268 7.322-.818 10.251-3.053 2.368-1.523 3.704-4.241 3.465-7.047 0-7.603-4.428-11.405-13.283-11.405h-12.031z"
                      fill="#f9f7f7"
                    />
                  </g>
                  <path d="m170 90h220v220h-220z" fill="none" />
                </svg>
              </button>
            </div>
            <div className={` ${classes.flexbox} ${classes.flexbox_2}`}>
              {hasAnalytics ? (
                questions.map((el, i) => {
                  const answers = Object.keys(survey[el]);
                  const series = Object.values(survey[el]);

                  return (
                    <div
                      key={i}
                      className={`${classes.rows} ${classes.rows_2}`}
                    >
                      <div className={`${classes.pies}`}>
                        <div className={classes.survey_info}>
                          <span>
                            Question:<h1> {el}</h1>
                          </span>
                          <button
                            className={classes.show_anal_button}
                            type="button"
                            onClick={() => this.analyticsModal(el)}
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
            </div>
          </div>
        ) : null}
        {question != null ? (
          <div className="d-flex align-items-center" style={{width: '95%', margin: 'auto'}}>
            <h1
              style={{
                color: '#7356c0',
                marginBottom: '5px',
                marginRight: '30px',
              }}
            >
              {surveyTitle}
            </h1>
            <button
              className={classes3.ads_back_icon}
              onClick={() => {
                this.setState((state) => ({
                  ...state,
                  question: null,
                }));
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.57 5.92999L3.5 12L9.57 18.07"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.4999 12H3.66992"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Back</span>
            </button>
          </div>
        ) : null}
        {question != null ? (
          <div
            className={`${classes2.flex_container_2} ${classes2[layoutTheme]}`}
          >
            <div className={classes2.btns} style={{ top: '130px' }}>
              <button
                className="bg-transparent border-0"
                onClick={() => {
                  const { survey, id } = this.props;
                  this.setState((state) => ({
                    ...state,
                    loading: true,
                  }));
                  axios
                    .get(
                      `https://backendapp.getinsightiq.com/api/v1/admin//pdf?surveyTitle=${survey}&id=${id}&page=option&question=${question}`,
                    )
                    .then((response) => {
                      const { link } = response.data;
                      window.open(link, '_blank');
                      this.setState((state) => ({
                        ...state,
                        loading: false,
                      }));
                    })
                    .catch((err) => {
                      this.setState((state) => ({
                        ...state,
                        loading: false,
                      }));
                    });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 64"
                  enableBackground="new 0 0 56 64"
                  fill="#000000"
                  width="50"
                  height="50"
                >
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    {' '}
                    <g>
                      {' '}
                      <path
                        fill="#8C181A"
                        d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"
                      ></path>{' '}
                      <path
                        fill="#6B0D12"
                        d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"
                      ></path>{' '}
                      <path
                        opacity="0.5"
                        fill="#FFFFFF"
                        enableBackground="new"
                        d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"
                      ></path>{' '}
                    </g>{' '}
                    <path
                      fill="#FFFFFF"
                      d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"
                    ></path>{' '}
                  </g>
                </svg>
              </button>
            </div>
            {Object.keys(analytics).map((el, i) => {
              const { gender, age, income, interest, location } = analytics[el];

              return (
                <Fragment key={i}>
                  <div className={classes2['option-label']}>
                    <p>{el}</p>
                  </div>

                  <div className={` ${classes2.flexbox} ml-0 mr-0`}>
                    <div className={classes2.rows}>
                      <div className={`${classes2.pies}`}>
                        <div className={classes2.survey_info}>
                          <h1>Gender</h1>
                        </div>
                        <div className={classes2.chart_contaioner}>
                          <Pie
                            series={Object.values(gender)}
                            categories={Object.keys(gender)}
                            show_categories={true}
                          />
                        </div>
                      </div>
                      <div className={`${classes2.pies}`}>
                        <div className={classes2.survey_info}>
                          <h1>Age</h1>
                        </div>
                        <div className={classes2.chart_contaioner}>
                          <BarDefault
                            categories={Object.keys(age)}
                            series={Object.values(age)}
                            max={Math.max(...Object.values(age))}
                            horizontal={true}
                          />
                        </div>
                      </div>
                      <div
                        className={`${classes2.pies} ml-3`}
                        style={{ maxWidth: '20%' }}
                      >
                        <div className={classes2.survey_info}>
                          <h1>Income</h1>
                        </div>
                        <div className={classes2.chart_contaioner}>
                          <BarDefault
                            series={Object.values(income)}
                            categories={Object.keys(income)}
                            max={Math.max(...Object.values(income))}
                            horizontal={true}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`${classes2.rows} mt-4 mb-4`}>
                      <div className={`${classes.pies} w-100`}>
                        <div className={classes2.survey_info}>
                          <h1>Interest</h1>
                        </div>
                        <div className={classes2.chart_contaioner}>
                          <BarDefault
                            categories={Object.keys(interest)}
                            series={Object.values(interest)}
                            max={Math.max(...Object.values(interest))}
                            horizontal={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes2.rows}>
                      <div className={`${classes2.pies} w-100 m-0`}>
                        <div className={classes2.survey_info}>
                          <h1>Location</h1>
                        </div>
                        <div className={`${classes2.chart_contaioner} w-100`}>
                          <BarDefault
                            categories={Object.keys(location)}
                            series={Object.values(location)}
                            max={Math.max(...Object.values(location))}
                            horizontal={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        ) : null}
      </>
    );
  }
}

export default SurveyAnswers;

import React, { Component, Fragment } from 'react';

import classes from '../../../assets/css/surveys/analytics.module.scss';

import Pie from '../charts/pie';
import BarDefault from '../charts/bar-default';

import axios from 'axios';

class SurveyAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      gender: {},
      interest: {},
      age: {},
      income: {},
      loading: false,
      hasAnalytics: false,
    };
  }

  selectBarChartGenderGroup = (gender) => {
    alert(gender);
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true,
    });
    const { user_professions, districts, id } = this.props;

    axios
      .post(
        `https://stagingapp.murmurcars.com/api/v1/admin/users-analytics/${id}`,
        {
          districts,
          user_professions,
        },
      )
      .then((response) => {
        const { location, gender, age, interest, income } = response.data;

        this.setState({
          ...this.state,
          location,
          gender,
          age,
          interest,
          income,
          loading: false,
          hasAnalytics: true,
        });
      });
  }

  render() {
    const { location, gender, age, interest, income, loading, hasAnalytics } =
      this.state;
    return (
      <Fragment>
        {loading ? (
          <div id="preloader" style={{ opacity: 0.6 }}>
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
        ) : null}
        {hasAnalytics ? (
          <div
            className={`${classes.flex_container_2} ${
              classes[this.props.layoutTheme]
            }`}
          >
            <div className={classes.btns}>
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
                      `https://stagingapp.murmurcars.com/api/v1/admin/pdf?surveyTitle=${survey}&id=${id}&page=survey`,
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
            <div className={` ${classes.flexbox} ml-0 mr-0`}>
              <div className={classes.rows}>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>Gender</h1>
                  </div>
                  <div className={classes.chart_contaioner}>
                    <Pie
                      series={Object.values(gender)}
                      categories={Object.keys(gender)}
                      show_categories={true}
                    />
                  </div>
                </div>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>Age</h1>
                  </div>
                  <div className={classes.chart_contaioner}>
                    <BarDefault
                      categories={Object.keys(age)}
                      series={Object.values(age)}
                      max={Math.max(...Object.values(age))}
                      horizontal={true}
                    />
                  </div>
                </div>
                <div
                    className={`${classes.pies} ml-3`}
                    style={{ maxWidth: '20%' }}
                  >
                    <div className={classes.survey_info}>
                      <h1>Income</h1>
                    </div>
                    <div className={classes.chart_contaioner}>
                      <BarDefault
                        series={Object.values(income)}
                        categories={Object.keys(income)}
                        max={Math.max(...Object.values(income))}
                        horizontal={true}
                      />
                    </div>
                  </div>
              </div>
              <div className={`${classes.rows} mt-4 mb-4`}>
                <div className={`${classes.pies} w-100`}>
                  <div className={classes.survey_info}>
                    <h1>Interest</h1>
                  </div>
                  <div className={classes.chart_contaioner}>
                    <BarDefault
                      categories={Object.keys(interest)}
                      series={Object.values(interest)}
                      max={Math.max(...Object.values(interest))}
                      horizontal={false}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.rows}>
                <div className={`${classes.pies} w-100 m-0`}>
                  <div className={classes.survey_info}>
                    <h1>Location</h1>
                  </div>
                  <div className={`${classes.chart_contaioner} w-100`}>
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
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default SurveyAnalytics;

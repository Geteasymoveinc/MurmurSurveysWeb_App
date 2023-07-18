import React, { Component, Fragment } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";

import Pie from "../charts/pie";
import BarDefault from "../charts/bar-default";

import axios from "axios";


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
    const { id } = this.props;

    axios
      .get(
        `https://backendapp.murmurcars.com/api/v1/admin/users-analytics/${id}`
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
          <div className={`${classes.flex_container_2} ${classes[this.props.layoutTheme]}`}>
            <div className="d-flex justify-content-center mt-4 pr-5">
              <div>
                <button
                  onClick={async () => {
                    this.setState((state) => ({
                      ...state,
                      loading: true,
                    }));
                    axios
                      .post(
                        "https://stagingapp.murmurcars.com/api/v1/admin/to_csv",
                        {
                          //analytics: survey,
                          surveyTitle: this.props.surveyTitle,
                          page: "analytics",
                          analytics: {
                            gender,
                            age,
                            location,
                            income,
                            interest,
                          },
                          header: [
                            { id: "Title", title: "SURVEY TITLE" },
                            { id: "Male", title: "MALE" },
                            { id: "Female", title: "FEMALE" },
                            { id: "Binaqadi", title: "BİNAQƏDİ" },
                            { id: "Nasimi", title: "NASİMİ" },
                            { id: "Nizami", title: "NİZAMİ" },
                            { id: "Narimanov", title: "NƏRİMANOV" },
                            { id: "Qaradaq", title: "QARADAQ" },
                            { id: "Sabayil", title: "SABAYİL" },
                            { id: "Sabunchu", title: "SABUNCHU" },
                            { id: "Suraxanı", title: "SURAXANI" },
                            { id: "Xətai", title: "XƏTAİ" },
                            { id: "Yasamal", title: "YASAMAL" },
                            { id: "Tbilisi", title: "TBİLİSİ" },
                            { id: "Istanbul", title: "ISTANBUL" },
                            { id: "Chicago", title: "CHICAGO" },
                            { id: "San Francisco", title: "SAN FRANCISCO" },
                            { id: "Los angeles", title: "LOS ANGELES" },
                            { id: "New york", title: "NEW YORK" },
                            { id: "Niami", title: "MIAMI" },
                            { id: "Maliyyə", title: "MALIYYƏ" },
                            { id: "Marketing", title: "MARKETING" },
                            { id: "Satış", title: "SATIŞ" },
                            { id: "Xidmət", title: "XİDMƏT" },
                            { id: "Dizayn", title: "DİZAYN" },
                            { id: "İnzibati", title: "İNZİBATİ" },
                            {
                              id: "İnformasiya texnologiyaları",
                              title: "İNFORMASİYA TEXNOLOGİYALARI",
                            },
                            { id: "Təhsil və elm", title: "TƏXSİL VƏ ELM" },
                            { id: "<350", title: "INCOME <350" },
                            { id: "<800", title: "INCOME <800" },
                            { id: "<1200", title: "INCOME <1200" },
                            { id: "1200+", title: "INCOME 1200+" },
                            { id: "<17", title: "AGE <25" },
                            { id: "<24", title: "AGE <35" },
                            { id: "<34", title: "AGE <34" },
                            { id: "<44", title: "AGE <44" },
                            { id: "<54", title: "AGE <54" },
                            { id: "<64", title: "AGE <64" },
                            { id: "64+", title: "AGE 64+" },
                          ],
                        }
                      )
                      .then((response) => {
                        const { link } = response.data;
                        window.open(link, "_blank");

                        this.setState((state) => ({
                          ...state,
                          loading: false,
                        }));
                      })
                      .catch((err) => alert("network error"));

                    /*   let index = 0;
                let generatedCSVTable = {};
                for (let question of questions) {
                  generatedCSVTable[question] = false;
                  axios
                    .get(
                      `http://localhost:4000/api/v1/admin/survey-answer-analytics?id=${id}&question=${question}`
                    )
                    .then((response) => {
                      const { Analytics } = response.data;
                      audienceAnalytics[question] = Analytics;

                      index++;

                      this.setState((state) => ({
                        ...state,
                        generatedCSVTable: [
                          ...state.generatedCSVTable,
                          question,
                        ],
                      }));
                      if (index === Object.keys(questions).length) {
                        axios
                          .post("http://localhost:4000/api/v1/admin/to_csv", {
                            analytics: survey,
                            survey: this.props.survey,
                            audienceAnalytics: audienceAnalytics,
                          })
                          .then((response) => {})
                          .catch((err) => {
                            (err);
                          });
                      }
                    })
                    .catch((err) => {
                      (err);
                    });
                }
                this.setState((state) => ({
                  ...state,
                  generateCSVProgressModal: true,
                  generatedCSVTable: [],
                }));*/
                  }}
                  className="bg-transparent border-0 mr-4"
                >
                  <svg
                    viewBox="-4 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    width="50"
                    height="50"
                  >
                    <g strokeWidth="0"></g>
                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                    <g>
                      {" "}
                      <path
                        d="M5.106 0c-2.802 0-5.073 2.272-5.073 5.074v53.841c0 2.803 2.271 5.074 5.073 5.074h45.774c2.801 0 5.074-2.271 5.074-5.074v-38.605l-18.903-20.31h-31.945z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#45B058"
                      ></path>{" "}
                      <path
                        d="M20.306 43.197c.126.144.198.324.198.522 0 .378-.306.72-.703.72-.18 0-.378-.072-.504-.234-.702-.846-1.891-1.387-3.007-1.387-2.629 0-4.627 2.017-4.627 4.88 0 2.845 1.999 4.879 4.627 4.879 1.134 0 2.25-.486 3.007-1.369.125-.144.324-.233.504-.233.415 0 .703.359.703.738 0 .18-.072.36-.198.504-.937.972-2.215 1.693-4.015 1.693-3.457 0-6.176-2.521-6.176-6.212s2.719-6.212 6.176-6.212c1.8.001 3.096.721 4.015 1.711zm6.802 10.714c-1.782 0-3.187-.594-4.213-1.495-.162-.144-.234-.342-.234-.54 0-.361.27-.757.702-.757.144 0 .306.036.432.144.828.739 1.98 1.314 3.367 1.314 2.143 0 2.827-1.152 2.827-2.071 0-3.097-7.112-1.386-7.112-5.672 0-1.98 1.764-3.331 4.123-3.331 1.548 0 2.881.467 3.853 1.278.162.144.252.342.252.54 0 .36-.306.72-.703.72-.144 0-.306-.054-.432-.162-.882-.72-1.98-1.044-3.079-1.044-1.44 0-2.467.774-2.467 1.909 0 2.701 7.112 1.152 7.112 5.636.001 1.748-1.187 3.531-4.428 3.531zm16.994-11.254l-4.159 10.335c-.198.486-.685.81-1.188.81h-.036c-.522 0-1.008-.324-1.207-.81l-4.142-10.335c-.036-.09-.054-.18-.054-.288 0-.36.323-.793.81-.793.306 0 .594.18.72.486l3.889 9.992 3.889-9.992c.108-.288.396-.486.72-.486.468 0 .81.378.81.793.001.09-.017.198-.052.288z"
                        fill="#ffffff"
                      ></path>{" "}
                      <g fillRule="evenodd" clipRule="evenodd">
                        {" "}
                        <path
                          d="M56.001 20.357v1h-12.8s-6.312-1.26-6.128-6.707c0 0 .208 5.707 6.003 5.707h12.925z"
                          fill="#349C42"
                        ></path>{" "}
                        <path
                          d="M37.098.006v14.561c0 1.656 1.104 5.791 6.104 5.791h12.8l-18.904-20.352z"
                          opacity=".5"
                          fill="#ffffff"
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
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
                        `https://stagingapp.murmurcars.com/api/v1/admin/pdf?surveyTitle=${survey}&id=${id}&page=survey`
                      )
                      .then((response) => {
                        const { link } = response.data;
                        window.open(link, "_blank");
                        this.setState((state) => ({
                          ...state,
                          loading: false,
                        }));
                      })
                      .catch((err) => {});
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
                      {" "}
                      <g>
                        {" "}
                        <path
                          fill="#8C181A"
                          d="M5.1,0C2.3,0,0,2.3,0,5.1v53.8C0,61.7,2.3,64,5.1,64h45.8c2.8,0,5.1-2.3,5.1-5.1V20.3L37.1,0H5.1z"
                        ></path>{" "}
                        <path
                          fill="#6B0D12"
                          d="M56,20.4v1H43.2c0,0-6.3-1.3-6.1-6.7c0,0,0.2,5.7,6,5.7H56z"
                        ></path>{" "}
                        <path
                          opacity="0.5"
                          fill="#FFFFFF"
                          enableBackground="new "
                          d="M37.1,0v14.6c0,1.7,1.1,5.8,6.1,5.8H56L37.1,0z"
                        ></path>{" "}
                      </g>{" "}
                      <path
                        fill="#FFFFFF"
                        d="M14.9,49h-3.3v4.1c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h3.7 c2.4,0,3.8,1.7,3.8,3.6C18.7,47.4,17.3,49,14.9,49z M14.8,43.1h-3.2v4.6h3.2c1.4,0,2.4-0.9,2.4-2.3C17.2,44,16.2,43.1,14.8,43.1z M25.2,53.8h-3c-0.6,0-1.1-0.5-1.1-1.1v-9.8c0-0.6,0.5-1.1,1.1-1.1h3c3.7,0,6.2,2.6,6.2,6C31.4,51.2,29,53.8,25.2,53.8z M25.2,43.1 h-2.6v9.3h2.6c2.9,0,4.6-2.1,4.6-4.7C29.9,45.2,28.2,43.1,25.2,43.1z M41.5,43.1h-5.8V47h5.7c0.4,0,0.6,0.3,0.6,0.7 s-0.3,0.6-0.6,0.6h-5.7v4.8c0,0.4-0.3,0.7-0.8,0.7c-0.4,0-0.7-0.3-0.7-0.7V42.9c0-0.6,0.5-1.1,1.1-1.1h6.2c0.4,0,0.6,0.3,0.6,0.7 C42.2,42.8,41.9,43.1,41.5,43.1z"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className={` ${classes.flexbox} `}>
              <div className={classes.rows}>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>Gender</h1>
                  </div>
                  <div className={classes.chart_contaioner}>
                    <Pie
                      series={Object.values(gender)}
                      categories={Object.keys(gender)}
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
                      xLabels={true}
                      horisontal={true}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.rows}>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>Income</h1>
                  </div>
                  <div className={classes.chart_contaioner}>
                    <BarDefault
                      series={Object.values(income)}
                      categories={Object.keys(income)}
                      max={Math.max(...Object.values(income))}
                      xLabels={true}
                      horisontal={true}
                    />
                  </div>
                </div>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>Interest</h1>
                  </div>
                  <div className={classes.chart_contaioner}>
                    <BarDefault
                      categories={Object.keys(interest)}
                      series={Object.values(interest)}
                      max={Math.max(...Object.values(interest))}
                      xLabels={true}
                      horisontal={true}
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
                      xLabels={true}
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

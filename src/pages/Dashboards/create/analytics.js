import React, { Component, Fragment } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";

import Pie from "../pie-charts/pie";

import axios from "axios";

class SurveyAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      gender: {},
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
      .get(`https://backendapp.murmurcars.com/api/v1/surveys/survey/users-analytics/${id}`)
      .then((response) => {
        const { status, location, gender } = response.data;

        this.setState({
          ...this.state,
          location,
          gender,
          hasAnalytics: status === 200,
          loading: false,
        });
      });
  }

  render() {
    const { hasAnalytics, location, gender, loading } = this.state;
    return (
      <Fragment>
        {loading && (
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
        )}
        {!loading && (
          <div className={`${classes.flex_container_2}`}>
            <div className={` ${classes.flexbox} `}>
              {hasAnalytics ? (
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

                  <div className={classes.pies}>
                    <div className={classes.survey_info}>
                      <h1>Location</h1>
                    </div>
                    <div className={classes.chart_contaioner}>
                      <Pie
                        series={Object.values(location)}
                        categories={Object.keys(location)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-100 ">
                  <h1 className="text-center">Surey yet has no response </h1>
                </div>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default SurveyAnalytics;

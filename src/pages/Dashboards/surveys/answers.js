import React, { Component } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";

import BarDefault from "./pie-charts/bar-default";

class SurveyAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analytics: this.props.analytics,
    };
  }

  render() {
    return (
      <div className={`${classes.flex_container_2}`}>
        <div className={` ${classes.flexbox} `}>
          {this.state.analytics.map((el, i) => {
            const question = Object.keys(el);
            const categories = Object.keys(el[question]);
            const series = Object.values(el[question]);
            return (
              <div key={i} className={`${classes.rows} ${classes.rows_2}`}>
                <div className={`${classes.pies}`}>
                  <div className={classes.survey_info}>
                    <h1>{question}</h1>
                  </div>
                  <div className={classes.chart_contaioner_2}>
                    <BarDefault categories={categories} series={series} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default SurveyAnswers;



import React, { Component } from "react";

import classes from "../../assets/css/surveys/index.module.scss";


import BarDefault from "./pie-charts/bar-default";

class SurveyAnswers extends Component {
 constructor(props){
   super(props)
   
 }
 
 selectBarChartGenderGroup = (gender) => {
   alert(gender)
 }


  render() {
    return (
      <div className={`${classes.flex_container_2}`}>
        <div className={` ${classes.flexbox} `}>
          <div className={`${classes.rows} ${classes.rows_2}`}>
          <div className={`${classes.pies}`}>
            <div className={classes.survey_info}>
                <h1>Gender</h1>

            </div>
            <div className={ classes.chart_contaioner_2}>
              <BarDefault/>
            </div>
          </div>
          </div>
          <div className={`${classes.rows} ${classes.rows_2}`}>
          <div className={classes.pies}>
          <div className={classes.survey_info}>
                <h1>Gender</h1>
        

            </div>
            <div className={ classes.chart_contaioner_2}>
              <BarDefault />
            </div>
          </div>
          </div>
     
        </div>
      </div>
    );
  }
}

export default SurveyAnswers;


import React, { Component } from "react";

import classes from "../../assets/css/surveys/index.module.scss";

import Pie from "./pie-charts/pie";
import Bar from './pie-charts/bar'
import BarHorisontal from "./pie-charts/bar-horisontal";

class SurveyAnalytics extends Component {
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
          <div className={classes.rows}>
          <div className={`${classes.pies}`}>
            <div className={classes.survey_info}>
                <h1>Gender</h1>

            </div>
            <div className={classes.chart_contaioner}>
              <Pie />
            </div>
          </div>

          <div className={classes.pies}>
          <div className={classes.survey_info}>
                <h1>Gender</h1>
        

            </div>
            <div className={classes.chart_contaioner}>
              <Pie />
            </div>
          </div>
          </div>
          <div className={`${classes.rows} ${classes.rows_2}`}>
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
          
      </div>
        </div>
      </div>
    );
  }
}

export default SurveyAnalytics;

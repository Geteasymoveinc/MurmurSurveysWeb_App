

import React, { Component } from "react";

import classes from "../../assets/css/surveys/index.module.scss";




class Preview extends Component {
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
         

            </div>
            <div className={ classes.chart_contaioner_2}>
     
            </div>
          </div>
          </div>
 
     
        </div>
      </div>
    );
  }
}

export default Preview;


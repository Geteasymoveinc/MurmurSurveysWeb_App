import React, { Component, Fragment } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";

import Pie from "./pie-charts/pie";
import Bar from './pie-charts/bar'
import BarHorisontal from "./pie-charts/bar-horisontal";
import axios from "axios";

class SurveyAnalytics extends Component {
 constructor(props){
   super(props)
   this.state = {
    location: {},
    gender: {},
    loading: false
   }
 }
 
 selectBarChartGenderGroup = (gender) => {
   alert(gender)
 }


 componentDidMount(){

  this.setState({
    ...this.state,
    loading:true
  })
  const {id} = this.props
  axios.get(`https://backendapp.murmurcars.com/api/v1/surveys/survey/users-analytics/${id}`)
  .then(response => {
    const {location, gender} = response.data

    this.setState({
      ...this.state,
      location,
      gender,
      loading:false
    })
  })
 }

  render() {

    const {location, gender, loading} = this.state
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
      {!loading && <div className={`${classes.flex_container_2}`}>
        <div className={` ${classes.flexbox} `}>
          <div className={classes.rows}>
          <div className={`${classes.pies}`}>
            <div className={classes.survey_info}>
                <h1>Gender</h1>

            </div>
            <div className={classes.chart_contaioner}>
              <Pie  series={Object.values(gender)}  categories={Object.keys(gender)}/>
            </div>
          </div>

          <div className={classes.pies}>
          <div className={classes.survey_info}>
                <h1>Location</h1>
        

            </div>
            <div className={classes.chart_contaioner}>
              <Pie  series={Object.values(location)} categories={Object.keys(location)}/>
            </div>
          </div>
          </div>
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
      </div>}
      </Fragment>
    );
  }
}

export default SurveyAnalytics;

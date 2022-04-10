import React, { Component, Fragment } from "react";

import classes from '../../assets/css/surveys/settings.module.scss'
import Map from '../../assets/images/surveys/map.png'
import Chevron_Down from "../../assets/images/surveys/chevron-down.svg";
import GoogleMap from "../Dashboard/google-map";
import '../../assets/css/common/css/google-map.css'


class SurveySettings extends Component{
  constructor(props){
    super(props)
    this.state = {
      map: {
        center: {
          lat: 41.8781,
          lng: -87.6298,
        },
        coordinates: [],
        zoom: 11,
        postCenter: {
          lat: 0,
          lng: 0,
        },
      },
    }
  }


    render(){
        return(
            <div className={classes.container_center}>
                  <div className={classes.settings_container}>
                       <div className={classes.smaller_container}>
                            <h3>Location (Zip):</h3>
                            <div className={classes.map_container}>
                               <GoogleMap state={this.state.map}/>
                               <div className={classes.google_map_location_input}>
                                 <input type='text'/>
                               </div>
                            </div>
                            <p className={classes.audience_p}>Audience</p>
                            <div className={classes.gender_age_container}>
                            <div
                              className={`${classes.details_edit_select} ${classes.mt_8}`}
                            >
                                <label>Age</label>
                              <select
                                name="audienceAge"
                                onChange={this.handleDetailsUpdate}
                              >
                               
                                {[
                                  "18-25",
                                  "26-35",
                                  "36-45",
                                  "46-55",
                                  "56-65",
                                  "66+",
                                ].map(
                                  (age, index) =>
                                  (
                                      <option key={index} value={age}>
                                        {age}
                                      </option>
                                    )
                                )}
                              </select>
                              <img
                                src={Chevron_Down}
                                alt="arrow"
                                className={classes.details_edit_arrow}
                              />
                            </div>
                            <div
                              className={`${classes.details_edit_select} ${classes.mt_8}`}
                            >
                            <label>Gender</label>
                              <select
                                name="audienceGender"
                                onChange={this.handleDetailsUpdate}
                              >
                              
                                {["Male", "Female", "Both"].map(
                                  (gender, index) =>
                                        (
                                      <option value={gender} key={index}>
                                        {gender}
                                      </option>
                                    )
                                )}
                              </select>
                              <img
                                src={Chevron_Down}
                                alt="arrow"
                                className={classes.details_edit_arrow}
                              />
                            </div>
                            </div>
                       </div>
                  </div>
            </div>

        )
    }
}


export default SurveySettings
import React from "react";

import axios from "axios";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";
import SurveyEye from "../../../assets/images/surveys/survey-eye.svg";
import SurveyEdit from "../../../assets/images/surveys/survey-edit.svg";
import SurveyPrice from "../../../assets/images/surveys/survey-price.svg";
import SampleImage from "../../../assets/images/surveys/sample-image.png";
import SampleImage2 from "../../../assets/images/surveys/sample-image2.png";
import classes from "../../../assets/css/CreateAd/index.module.css";
import classes2 from "../../../assets/css/surveys/surveys.module.css";

import CampaignAnalytics from "./analytics";
import { connect } from "react-redux";

class PulledCampaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: true,
      checked: false,
      pullledCampaigns: this.props.surveys,
      adds: this.props.adds,
      loading: false,
    };

    this.settingInterval = null;
  }




  //ad-campaign
  handleCampaigns = () => {
    const { multiple } = this.state;

    let murmurCampaigns = [];

    if (this.state.pullledCampaigns.length !== 0) {
      {
        this.state.pullledCampaigns.map((campaign, i) => {
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
         
                    <label>
                      {campaign.survey_title}
                    </label>
              
                </div>
              </td>
              <td className={classes.cads_td}>
              <span className={`${classes.td_data} ${classes.td_data_2}`}>
                  <img
                    src={campaign.customer.img}
                    alt="avatar"
                    className={classes.partner_profile_img}
                  />
                  {campaign.customer.fullName}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}> {campaign.views}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.answeredBy.length}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.survey_earnings}</span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/dashboard?campaign=${campaign._id}`}
                  className={classes.details_link}
                >
                  Analytics
                  <img
                    src={ArrowRight}
                    alt=""
                    className={classes.details_img}
                  />
                </Link>
              </td>
            </tr>
          );
        });
      }
    }

    return murmurCampaigns;
  };
  



  toggleSurveyWindow = (id) => {
      const active = this.state.active
      let value = id
      if(active === id){
          value = ''
      }

      this.setState({
          ...this.state,
          active: value
      })
  }

  
  componentDidUpdate(prevProps){
       
    const {loading, adds, surveys } = this.props
  
    if(adds.length!==prevProps.adds.length || surveys.length!==prevProps.surveys.length){
    
      this.setState({
        ...this.state,
        adds,
        pulledSurveys: surveys,
        haveCampaigns: true
      })
    }
  }

  render() {
    let status = [];
    const url = this.props.location.search; //extracting billing id
    const params = url.split("?campaign=")[1]; // geting rid of left side
    const statusArray = this.state.adds.filter((el) => el.id === params); //looking for ad by ad campaign id


    return (
      <React.Fragment>
        {/* this part is ad-manager STARTING*/}
        {this.state.loading && (
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
        )}
        {(!this.props.location.search.length > 0 &&
        !this.state.loading) &&(
          <div className={classes.cads_table} style={{ marginBottom: "100px" }}>
            <table>
              <thead>
                <tr className={classes.first_tr}>
                  <th className={`${classes.cads_th}`}>
                 <span> Name</span>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Customer</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                    <span>View</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Answers</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Budget</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.handleCampaigns()}</tbody>
            </table>
          </div>
        )}

        {this.props.location.search.length > 0 && ( //when user selects an add to check details
          <CampaignAnalytics />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const {surveys, adds, loading} = state.Surveys 
  return {surveys, adds, loading }
}


export default connect(mapStateToProps, null)(withRouter(PulledCampaigns));

import React from "react";

import axios from "axios";


import { Link, withRouter } from "react-router-dom";

import ArrowDown from "../../../assets/css/common/icons/arrow-down.svg";
import Trash2 from "../../../assets/css/CreateAd/ads-details/trash.svg";
import Edit from "../../../assets/css/CreateAd/ads-details/edit.svg";
import ImgEdit from "../../../assets/css/CreateAd/ads-details/image-edit.svg";
import ArrowLeft from "../../../assets/css/CreateAd/ads-details/arrow-left.svg";
import Avatar from '../../../assets/images/avatar.png'
import classes2 from "../../../assets/css/CreateAd/ads-details/index.module.css";

import Geocode from "react-geocode";
import { GOOGLE_MAP_KEY } from "../../../api";

import GoogleMap from './google-map'


Geocode.setApiKey(GOOGLE_MAP_KEY);


class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      customer:[this.props.customer],
    };
  }
  componentDidMount(){
    let area;
    const { customer } = this.props;
    

    this.setState({
      ...this.state,
      customer: [customer]
    })
 

  }

  render() {

    return (
      <React.Fragment>
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
        {!this.state.loading &&
          this.state.customer.map((customer, index) => (
            <div className={classes2.ads_details_section} key={index}>
              <Link to="/customers" className={classes2.ads_back_icon}>
                <img src={ArrowLeft} alt="" className={classes2.ads_left_img} />
                <span>Back</span>
              </Link>

             {/* <div className={classes2.current_ads_name}>
                <div className={classes2.crrnt_ads_title}>
                  <p>{campaign.campaign_name}</p>
                  <span
                    className={`${
                      status
                        ? classes2.cads_active_dot
                        : classes2.cads_deactive_dot
                    }`}
                  >
                    <span className={classes2.cads_dot}></span>
                    {status ? "Active" : "Deactive"}
                  </span>
        
                </div>
                  </div>*/}
              <div
                className={`${classes2.ads_detail_info} ${classes2.ads_detail_row}`}
              >
                <div className={classes2.ads_detail_image}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.detail_img}>
                      <img src={customer.profilePhoto ? customer.profilePhoto : Avatar} alt="" />
                    </div>
                    <div className={classes2.detail_img_title}>
                      <span>Current Image</span>
                    </div>
                  </div>
                </div>
                <div className={classes2.ads_detail_audience}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>         {customer.fullName}</h5>
                    </div>
                    <div
                      className={`${classes2.ads_details_content} `}
                    >
                      <ul className={classes2.ads_detail_age}>
             
        
                        <li>
                            <span>Phone Number</span>
                            <p className={classes2.detail_content_p}>
                              {customer.phone_number}
                            </p>
                          </li>
                   
                     
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${classes2.budget_category_are} ${classes2.ads_detail_row}`}
              >
                <div className={classes2.ads_detail_budget}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>Company</h5>
                    </div>
                    <div className={classes2.ads_details_content}>
                    
                        <p className={classes2.detail_content_p}>
                          ${customer.company}
                        </p>
                  
                    </div>
                  </div>
                </div>
                <div className={classes2.ads_detail_category}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>Ad Type</h5>
                    </div>
                    <div className={classes2.ads_details_content}>
                  
                        <p className={classes2.detail_content_p}>
                          {customer.advertise_options}
                        </p>
                
                    </div>
                  </div>
                </div>
                {/*<div className={classes2.ads_detail_area}>
                  <div className={classes2.ads_detail_col}>
                  <div className={classes2.detail_img}>
                      <GoogleMap
                        state={this.state.map}
                        location={campaign.area}
                      />
                    </div>
                    <div className={classes2.detail_map_title}>
                      <span>Targer Area</span>
                    
                        <small>{campaign.area}</small>
                      
                    </div>
                    </div>
                    </div>*/}
                                   <div className={`${classes2.ads_detail_quantity} ${classes2.customer_email}`}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>
                        Email
                      </h5>
                    </div>
                    <div
                      className={`${classes2.ads_details_content} ${
                        this.state.editable && classes2.edit_inline_flex
                      }`}
                    >
                  
                        <p className={classes2.detail_content_p}>
                          {customer.email}
                        </p>
                
                    </div>
                  </div>
                </div>
                    </div>

            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default withRouter(Details);

import React from "react";

import axios from "axios";


import { Link, withRouter } from "react-router-dom";

import ArrowDown from "../../../assets/css/common/icons/arrow-down.svg";
import Trash2 from "../../../assets/css/CreateAd/ads-details/trash.svg";
import Edit from "../../../assets/css/CreateAd/ads-details/edit.svg";
import ImgEdit from "../../../assets/css/CreateAd/ads-details/image-edit.svg";
import ArrowLeft from "../../../assets/css/CreateAd/ads-details/arrow-left.svg";

import classes2 from "../../../assets/css/CreateAd/ads-details/index.module.css";

import Geocode from "react-geocode";
import { GOOGLE_MAP_KEY } from "../../../api";

import GoogleMap from './google-map'


Geocode.setApiKey(GOOGLE_MAP_KEY);


class AdDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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
      updates: [
        {
          daily_budget: "",
          advertisers_email: "",
          audienceAge: "",
          audienceGender: "",
          campaign_name: "",
          campaign_type: "",
          artWork_url: "",
          display_quantity: "",
          area: "",
          image: '',
          file: {}
        },
      ],
      editable: false,
    };
  }
  componentDidMount(){
    let area;
    const { campaigns } = this.props;

      area = campaigns[0].area;
      console.log(area)
      let url = "";

      if (area) {
        if (/[1-9]/i.test(area)) {
          url =
            "https://backendapp.murmurcars.com/api/v1/zipcode/get-zipcode-polygon-coords";
        } else {
          url =
            "https://backendapp.murmurcars.com/api/v1/zipcode/get-district-polygon-coords";
        }

        axios
          .post(url, { postalCode: area, district: area })
          .then((res) => {
            console.log(res);

            if (/[1-9]/i.test(area)) {
              Geocode.fromAddress("" + area)
                .then((response) => {
                  const { lat, lng } = response.results[0].geometry.location;
                  this.setState({
                    ...this.state,
                    loaded: true,
                    map: {
                      ...this.state.map,
                      coordinates: [res.data],
                      postCenter: { lat, lng },
                      center: { lat, lng },
                      zoom: 10,
                    },
                    updates: [
                      {
                        ...this.state.updates,
                        daily_budget: campaigns[0].daily_budget,
                        ad_type: campaigns[0].ad_type,
                        ad_status: campaigns[0].ad_status,
                        advertisers_email: sessionStorage.getItem("authUser"),
                        audienceAge: campaigns[0].audienceAge,
                        audienceGender: campaigns[0].audienceGender,
                        campaign_name: campaigns[0].campaign_name,
                        campaign_type: campaigns[0].campaign_type,
                        image: campaigns[0].artWork_url,
                        display_quantity: campaigns[0].display_quantity,
                        area: campaigns[0].area,
                        artWork_url: campaigns[0].artWork_url.split('https://backendapp.murmurcars.com/advertisers/media/uploads/')[1]
                      
                      },
                    ],
                  });
                })
                .catch((err) => alert(err));
            } else {
              this.setState({
                ...this.state,
                loaded: true,
                map: {
                  ...this.state.map,
                  coordinates: [res.data.polygons],
                  postCenter: res.data.center,
                  center: res.data.center,
                  zoom: 8,
                },

                updates: [
                  {
                    ...this.state.updates,
                    daily_budget: campaigns[0].daily_budget,
                    ad_type: campaigns[0].ad_type,
                    ad_status: campaigns[0].ad_status,
                    advertisers_email: sessionStorage.getItem("authUser"),
                    audienceAge: campaigns[0].audienceAge,
                    audienceGender: campaigns[0].audienceGender,
                    campaign_name: campaigns[0].campaign_name,
                    campaign_type: campaigns[0].campaign_type,
                    image: campaigns[0].artWork_url,
                    display_quantity: campaigns[0].display_quantity,
                    area: campaigns[0].area,
                    artWork_url: campaigns[0].artWork_url.split('https://backendapp.murmurcars.com/advertisers/media/uploads/')[1]
                  },
                ],
              });
            }
          })
          .catch((err) => alert(err));
      }
    
  }

  render() {
    const { editable } = this.state;
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get('request') //extracting id 
    const campaign = this.props.campaigns.filter((el) => el._id === id);
    let status = [];

    if (campaign.length) {
      status =  campaign[0].active
    }
    console.log(this.props);
    return (
      <React.Fragment>
        {!this.state.loaded && (
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
        {this.state.loaded &&
          this.state.updates.map((campaign, index) => (
            <div className={classes2.ads_details_section} key={index}>
              <Link to="/campaigns" className={classes2.ads_back_icon}>
                <img src={ArrowLeft} alt="" className={classes2.ads_left_img} />
                <span>Back</span>
              </Link>

              <div className={classes2.current_ads_name}>
                <div className={classes2.crrnt_ads_title}>
                  <p>{campaign.campaign_name}</p>
                  <span
                    className={`${
                      status[0]
                        ? classes2.cads_active_dot
                        : classes2.cads_deactive_dot
                    }`}
                  >
                    <span className={classes2.cads_dot}></span>
                    {status[0] ? "Active" : "Deactive"}
                  </span>
                  {/*<!-- <span class="cads_deactive_dot"><span class="cads_dot"></span>Deactive</span> -->*/}
                </div>
     
              </div>
              <div
                className={`${classes2.ads_detail_info} ${classes2.ads_detail_row}`}
              >
                <div className={classes2.ads_detail_image}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.detail_img}>
                      <img src={campaign.image} alt="" />
                    </div>
                    <div className={classes2.detail_img_title}>
                      <span>Current Image</span>
                    </div>
                  </div>
                </div>
                <div className={classes2.ads_detail_audience}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>Audience</h5>
                    </div>
                    <div
                      className={`${classes2.ads_details_content} ${
                        this.state.editable && classes2.edit_inline_flex
                      }`}
                    >
                      <ul className={classes2.ads_detail_age}>
                        {!editable ? (
                          <li>
                            <span>Age</span>
                            <p className={classes2.detail_content_p}>
                              {campaign.audienceAge}
                            </p>
                          </li>
                        ) : (
                          <li>
                            <span>Age</span>
                            <div
                              className={`${classes2.details_edit_select} ${classes2.mt_8}`}
                            >
                              <select
                                name="audienceAge"
                                onChange={this.handleDetailsUpdate}
                              >
                                <option value={campaign.audienceAge}>
                                  {campaign.audienceAge}
                                </option>
                                {[
                                  "18-25",
                                  "26-35",
                                  "36-45",
                                  "46-55",
                                  "56-65",
                                  "66+",
                                ].map(
                                  (age, index) =>
                                    age !== campaign.audienceAge && (
                                      <option key={index} value={age}>
                                        {age}
                                      </option>
                                    )
                                )}
                              </select>
                              <img
                                src={ArrowDown}
                                alt="arrow"
                                className={classes2.details_edit_arrow}
                              />
                            </div>
                          </li>
                        )}
                        <li>
                          <span className={classes2.age_gender_line}></span>
                        </li>
                        {!editable ? (
                          <li>
                            <span>Gender</span>
                            <p className={classes2.detail_content_p}>
                              {campaign.audienceGender}
                            </p>
                          </li>
                        ) : (
                          <li>
                            {" "}
                            <span>Gender</span>
                            <div
                              className={`${classes2.details_edit_select} ${classes2.mt_8}`}
                            >
                              <select
                                name="audienceGender"
                                onChange={this.handleDetailsUpdate}
                              >
                                <option value={campaign.audienceGender}>
                                  {campaign.audienceGender}
                                </option>
                                {["Male", "Female", "Both"].map(
                                  (gender, index) =>
                                    gender !== campaign.audienceGender && (
                                      <option value={gender} key={index}>
                                        {gender}
                                      </option>
                                    )
                                )}
                              </select>
                              <img
                                src={ArrowDown}
                                alt="arrow"
                                className={classes2.details_edit_arrow}
                              />
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={classes2.ads_detail_quantity}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>
                        Display Quantity
                      </h5>
                    </div>
                    <div
                      className={`${classes2.ads_details_content} ${
                        this.state.editable && classes2.edit_inline_flex
                      }`}
                    >
                      {!editable ? (
                        <p className={classes2.detail_content_p}>
                          {campaign.display_quantity}
                        </p>
                      ) : (
                        <input
                          type="text"
                          name="display_quantity"
                          className={classes2.ads_edit_input}
                          value={campaign.display_quantity}
                          onChange={this.handleDetailsUpdate}
                        />
                      )}
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
                      <h5 className={classes2.detail_top_h5}>Daily Budget</h5>
                    </div>
                    <div className={classes2.ads_details_content}>
                      {!editable ? (
                        <p className={classes2.detail_content_p}>
                          ${campaign.daily_budget}
                        </p>
                      ) : (
                        <input
                          type="text"
                          name="daily_budget"
                          className={classes2.ads_edit_input}
                          value={campaign.daily_budget}
                          onChange={this.handleDetailsUpdate}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes2.ads_detail_category}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.ads_detail_top}>
                      <h5 className={classes2.detail_top_h5}>Category</h5>
                    </div>
                    <div className={classes2.ads_details_content}>
                      {!editable ? (
                        <p className={classes2.detail_content_p}>
                          {campaign.campaign_type}
                        </p>
                      ) : (
                        <div className={classes2.details_edit_select}>
                          <select
                            name="campaign_type"
                            onChange={this.handleDetailsUpdate}
                          >
                            <option>{campaign.campaign_type}</option>
                            {[
                              "Consumer Services",
                              "Consumer Products",
                              "Business Service",
                              "Business Products",
                              "Real-Estate",
                              "Insurance",
                              "Mortgage",
                              "Home Services",
                              "Professional Services",
                              "Automotive",
                            ].map(
                              (type, index) =>
                                type !== campaign.campaign_type && (
                                  <option key={index} value={type}>
                                    {type}
                                  </option>
                                )
                            )}
                          </select>
                          <img
                            src={ArrowDown}
                            alt="arrow"
                            className={classes2.details_edit_arrow}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes2.ads_detail_area}>
                  <div className={classes2.ads_detail_col}>
                  <div className={classes2.detail_img}>
                      <GoogleMap
                        state={this.state.map}
                        location={campaign.area}
                      />
                    </div>
                    <div className={classes2.detail_map_title}>
                      <span>Targer Area</span>
                      {!editable ? (
                        <small>{campaign.area}</small>
                      ) : /[1-9]/i.test(campaign.area) ? (
                        <input
                          type="text"
                          value={campaign.area}
                          size="2"
                          name="area"
                          onChange={this.handleDetailsUpdate}
                        />
                      ) : (
                        <div className={classes2.details_edit_select}>
                          {" "}
                          <select
                            name="area"
                            onChange={this.handleDetailsUpdate}
                          >
                            <option value={campaign.area}>
                              {campaign.area}
                            </option>
                            {[
                              "Nizami",
                              "Nasimi",
                              "Khazar",
                              "Sabunchu",
                              "Qaradaq",
                              "Binaqadi",
                              "Narimanov",
                              "Sabayil",
                              "Pirallahı",
                              "Xətai",
                              "Yasamal",
                              "Suraxanı",
                            ].map((district, i) => {
                              if (district !== campaign.area) {
                                return (
                                  <option
                                    value={district.toLowerCase()}
                                    key={i}
                                  >
                                    {district}
                                  </option>
                                );
                              }
                            })}
                          </select>
                          <img
                            src={ArrowDown}
                            alt="arrow"
                            className={classes2.details_edit_arrow}
                          />
                        </div>
                      )}
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

export default withRouter(AdDetails);

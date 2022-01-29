import React from "react";

import axios from "axios";

import GoogleMap from "../Dashboard/google-map";

import { Link, withRouter } from "react-router-dom";

import ArrowDown from "../../assets/css/common/icons/arrow-down.svg";
import Trash2 from "../../assets/css/CreateAd/ads-details/trash.svg";
import Edit from "../../assets/css/CreateAd/ads-details/edit.svg";
import ImgEdit from "../../assets/css/CreateAd/ads-details/image-edit.svg";
import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";

import classes2 from "../../assets/css/CreateAd/ads-details/index.module.css";

import { Upload } from "antd";



import Geocode from "react-geocode";



const { Dragger } = Upload;

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

const propsD = {
  name: "file",
  multiple: true,

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

class AdDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NumberOfDrivers: "",
      address: "",
      postalCode: "",
      location: "",
      errorZipCode: false,
      errorMessage: null,
      coordinates: [],
      toggleCartWithAreaInformation: false,

      center: {
        lat: 41.8781,
        lng: -87.6298,
      },
      zoom: 11,
      drivers: [],
      loaded: true,
      postCenter: {
        lat: 0,
        lng: 0,
      },
      updates: {
       
        daily_budget: "",
        advertisers_email: "",
        audienceAge: "",
        audienceGender: "",
        campaign_name: "",
        campaign_type: "",
        artWork_url: "",
        display_quantity: "",
        area: "",
      },
      editable: false
    };
  }
  toggleEditMode = () => {
    this.setState({ ...this.state, editable:true });
  };
  handleFileChange = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      const updates = this.state.updates;
      updates.artWork_url = e.target.result;
      this.setState({ ...this.state, updates });
    };
  };
  handleDetailsUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const updates = this.state.updates;
    updates[name] = value;
    this.setState({ ...this.state, updates });
  };
  submitUpdates = () => {
    const updates = this.state.updates;
    updates.ad_schedule = this.props.campaigns[0].ad_schedule;
    updates.ad_schedule_time = this.props.campaigns[0].ad_schedule_time;
    this.setState({ ...this.state, loaded: false });

    axios
      .put(
        `https://backendapp.murmurcars.com/api/v1/campaigns/${this.props.campaigns[0]._id}`,
        { ...updates }
      )
      .then((res) => {
        window.location.reload()
        this.setState({ ...this.state, loaded: true, editable: false });
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate(prevProps) {
    let url = this.props.location.pathname;
    const params = url.split("/")[2];
    let area;
    if (this.props.adds.length !== prevProps.adds.length) {
      for (let i = 0; i < this.props.adds.length; i++) {
        if (this.props.adds[i].id === params) {
          area = this.props.adds[i].area;
        }
      } 

    url = ''
    if( /[1-9]/i.test(area)){
      url =  "https://backendapp.murmurcars.com/api/v1/zipcode/get-zipcode-polygon-coords"
    }
      this.setState({...this.state, loaded: false})
      axios
      .post(
        url,
        { postalCode: area }
      )
      .then((res) => {
  
     

      Geocode.fromAddress("" + area).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          ...this.state,
          coordinates: [res.data],
          zoom: 13,
          postCenter: { lat, lng },
          center: {lat, lng},
          loaded: !this.props.loading,
          updates: {
            ...this.state.updates,
            daily_budget: this.props.campaigns[0].daily_budget,
            advertisers_email: sessionStorage.getItem("authUser"),
            audienceAge: this.props.campaigns[0].audienceAge,
            audienceGender: this.props.campaigns[0].audienceGender,
            campaign_name: this.props.campaigns[0].campaign_name,
            campaign_type: this.props.campaigns[0].campaign_type,
            artWork_url: this.props.campaigns[0].artWork_url,
            display_quantity: this.props.campaigns[0].display_quantity,
            area: this.props.campaigns[0].area,
          },
        });
      })
    })
    }
  
  }
  
  render() {
    const url = this.props.location.pathname;
    const params = url.split("/")[2];
    const statusArray = this.props.adds.filter((el) => el.id === params);
    let status = [];
    
    if (statusArray.length) {
      status = Object.values(statusArray[0]);
    }
    const { editable } = this.state;
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
          this.props.campaigns.map((campaign, index) => (
            <div className={classes2.ads_details_section} key={index}>
              <Link to="/ad-manager" className={classes2.ads_back_icon}>
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
                <button
                  type={editable? 'submit' :'button'}
                  className={classes2.crrnt_edit}
                  onClick={() => {
                    if(editable){
                     this.submitUpdates();
                    }else{
                    this.toggleEditMode()
                    }
                  }}
                >
                  <span>{`${editable ? "Done" : "Edit"}`}</span>

                  <img src={Edit} alt="" className={classes2.crrnt_edit_img} />
                </button>
              </div>
              <div
                className={`${classes2.ads_detail_info} ${classes2.ads_detail_row}`}
              >
                <div className={classes2.ads_detail_image}>
                  <div className={classes2.ads_detail_col}>
                    <div className={classes2.detail_img}>
                      <img src={campaign.artWork_url} alt="" />
                    </div>
                    <div className={classes2.detail_img_title}>
                      <span>Current Image</span>
                      {!editable ? (
                        <button
                          type="button"
                          className={classes2.detail_img_edit}
                        >
                          <img src={ImgEdit} alt="" />
                        </button>
                      ) : (
                        <Dragger
                          {...propsD}
                          beforeUpload={() => false}
                          showUploadList={false}
                          onChange={(info) => this.handleFileChange(info)}
                          style={{
                            background: "white",
                            borderColor: "transparent",
                          }}
                        >
                          <img src={ImgEdit} alt="" />
                        </Dragger>
                      )}
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
                          value={this.state.updates.display_quantity}
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
                          value={this.state.updates.daily_budget}
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
                      <GoogleMap state={this.state} />
                    </div>
                    <div className={classes2.detail_map_title}>
                      <span>Targer Area</span>
                      {!editable ? (
                        <small>{campaign.area}</small>
                      ) : (
                        <input
                          type="text"
                          value={this.state.updates.area}
                          size="2"
                          name="area"
                          onChange={this.handleDetailsUpdate}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes2.delete_ads}>
                <button
                  type="button"
                  className={classes2.delete_ads_btn}
                  onClick={() => this.props.delete(params, "_details")}
                >
                  <span>Delete Ad</span>
                  <img src={Trash2} alt="" />
                </button>
                <span className={classes2.delete_ads_note}>
                  *There is no backup for deleted AD’s
                </span>
              </div>
            </div>
          ))}
      </React.Fragment>
    );
  }
}

export default withRouter(AdDetails);

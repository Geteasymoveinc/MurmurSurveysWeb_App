import React from "react";

import axios from "axios";

import { Link, withRouter } from "react-router-dom";

import ArrowDown from "../../../assets/css/common/icons/arrow-down.svg";
import Trash2 from "../../../assets/css/CreateAd/ads-details/trash.svg";
import Edit from "../../../assets/css/CreateAd/ads-details/edit.svg";
import ImgEdit from "../../../assets/css/CreateAd/ads-details/image-edit.svg";
import ArrowLeft from "../../../assets/css/CreateAd/ads-details/arrow-left.svg";
import Avatar from "../../../assets/images/avatar.png";
import classes from "../../../assets/css/CreateAd/index.module.css";
import classes2 from "../../../assets/css/CreateAd/ads-details/index.module.css";

import Geocode from "react-geocode";
import { GOOGLE_MAP_KEY } from "../../../api";

import { Upload } from "antd";
const { Dragger } = Upload;

const propsD = {
  name: "file",
  multiple: true,

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

Geocode.setApiKey(GOOGLE_MAP_KEY);

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
      survey: [this.props.survey],
      updates: {},
      editable: false,
    };
  }
  componentDidMount() {
    const { survey } = this.props;

    this.setState({
      ...this.state,
      survey: [survey],
      loading: this.props.loading,
    });
  }

  handleFileChange = (info) => {
    const { updates } = this.state;

    const reader = new FileReader();
    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      updates.profilePhoto =`https://backendapp.murmurcars.com/advertisers/surveys/${info.file.name}`;
      updates.file = info.file;
      updates.image = e.target.result;

      this.setState({ ...this.state, updates });
    };
  };
  handleDetailsUpdate = (event, update, args) => {
    let value = {};
    if (event) value = { [update]: event.target.value };
    else value = args;
    this.setState({
      ...this.state,
      updates: {
        ...this.state.updates,
        ...value,
      },
    });
  };

  /*suspendOrRestoreCustomerAccount = (id, operation_type) => {
    this.setState({
      ...this.state,
      loading: true,
    });
    axios
      .put(
        `http://localhost:4000/api/v1/admin/customer-account-status?id=${id}&status=${operation_type}`,
        {
          accaunt_status: operation_type,
        }
      )
      .then((response) => {
        if (operation_type === "delete") {
          this.props.history.push("/customers");
          window.location.reload();
        }
        this.setState({
          ...this.state,
          loading: false,
          customer: [
            {
              ...this.state.customer[0],
              accaunt_status: operation_type,
            },
          ],
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  };*/

  toggleEditMode = () => {
    this.setState({ ...this.state, editable: true });
  };

  submitUpdates = () => {
 
  };

  render() {
    const { loading, survey, updates, editable } = this.state;
    return (
      <React.Fragment>
        {loading && (
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
        {!loading &&
          survey.length &&
          survey.map((survey, index) => {
            let survey_img = survey.survey_img;
            if (survey.image) {
              const { image } = updates;
              survey_img = image;
            } else {
              const hasImage =
                survey_img &&
                survey_img.split(
                  "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
                )[1];
              if (hasImage === "null" || hasImage === "undefined")
                survey_img = Avatar;
            }

            return (
              <div className={classes2.ads_details_section} key={index}>
                <div className="d-flex justify-content-between">
                  <Link to={`/surveys`} className={`${classes2.ads_back_icon}`}>
                    <img
                      src={ArrowLeft}
                      alt=""
                      className={classes2.ads_left_img}
                    />
                    <span>Back</span>
                  </Link>
                  <span>
                  <Link
                     to={`/surveys?survey=${survey._id}&mode=survey-view`}
                  >
                    <span>View</span>
                    </Link>
                  <button
                    type={editable ? "submit" : "button"}
                    className={classes2.crrnt_edit}
                    onClick={() => {
                      if (editable) {
                        this.submitUpdates();
                      } else {
                        this.toggleEditMode();
                      }
                    }}
                  >
                
                    <span>{`${editable ? "Update" : "Edit"}`}</span>

                    <img
                      src={Edit}
                      alt=""
                      className={classes2.crrnt_edit_img}
                    />
                  </button>
                  </span>
                </div>
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
                  <div
                    className={`${classes2.ads_detail_image} ${classes2.ads_detail_image_contentSize}`}
                  >
                    <div className={classes2.ads_detail_col}>
                      <div className={classes2.detail_img}>
                        <img
                          src={
                            survey_img
                              ? survey_img
                              : Avatar
                          }
                          alt="survey"
                        />
                      </div>
                      <div className={classes2.detail_img_title}>
                        <span>Current Image</span>
                        {editable && (
                          <Dragger
                            {...propsD}
                            beforeUpload={() => false}
                            showUploadList={false}
                            onChange={(info) => this.handleFileChange(info)}
                            style={{
                              background: "white",
                              borderColor: "transparent",
                            }}
                            className={classes2.hover_button}
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
                        <h5 className={classes2.detail_top_h5}>
                          {" "}
                          Survey Status
                        </h5>
                      </div>
                      <div className={`${classes2.ads_details_content} `}>
                        {!editable ? (
                          <p className={classes2.detail_content_p}>
                            {survey.status}
                          </p>
                        ) : (
                          <div
                          className={`${classes2.details_edit_select} ${classes2.mt_8}`}
                        >
                          <select
                          
                            onChange={(event) =>
                              this.handleDetailsUpdate(
                                event,
                                "status"
                              )
                            }
                          >
                            <option value={survey.status}>
                              {survey.status}
                            </option>
                            {['Approve', 'Need Attention'].map(
                              (status, index) =>
                                status !== survey.status && (
                                  <option key={index} value={status}>
                                    {status}
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
                </div>
                <div
                  className={`${classes2.budget_category_are} ${classes2.ads_detail_row}`}
                >
                  <div className={classes2.ads_detail_budget}>
                    <div className={classes2.ads_detail_col}>
                      <div className={classes2.ads_detail_top}>
                        <h5 className={classes2.detail_top_h5}>Title</h5>
                      </div>
                      <div className={classes2.ads_details_content}>
                        {!editable ? (
                          <p className={classes2.detail_content_p}>
                            {survey.survey_title}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className={classes2.ads_detail_category}>
                    <div className={classes2.ads_detail_col}>
                      <div className={classes2.ads_detail_top}>
                        <h5 className={classes2.detail_top_h5}>Price</h5>
                      </div>
                      <div className={classes2.ads_details_content}>
                        {!editable ? (
                          <p className={classes2.detail_content_p}>
                            {survey.survey_earnings} USD
                          </p>
                        ) : (
                         {/* <div
                            className={`${classes2.details_edit_select} ${classes2.mt_8}`}
                          >
                            <select
                              onChange={(event) =>
                                this.handleDetailsUpdate(
                                  event,
                                  "advertise_options"
                                )
                              }
                            >
                              <option value={customer.advertise_options}>
                                {customer.advertise_options
                                  ? customer.advertise_options
                                  : "Select add type"}
                              </option>
                              {["backpacks", "outdoor", "indoor"].map(
                                (type, index) =>
                                  type !== customer.advertise_options && (
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
                                  </div>*/}
                        )}
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
                  <div
                    className={`${classes2.ads_detail_quantity} ${classes2.customer_email}`}
                  >
                    <div className={classes2.ads_detail_col}>
                      <div className={classes2.ads_detail_top}>
                        <h5 className={classes2.detail_top_h5}>Total Answered Users</h5>
                      </div>
                      <div
                        className={`${classes2.ads_details_content} ${
                          editable && classes2.edit_inline_flex
                        }`}
                      >
                        <p className={classes2.detail_content_p}>
                          {survey.survey_audience_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div className={classes2.delete_ads}>
                    <button
                      type="button"
                      className={classes2.delete_ads_btn}
                      onClick={() =>
                        this.suspendOrRestoreCustomerAccount(survey._id)
                      }
                    >
                      <span>Delete Survey</span>
                      <img src={Trash2} alt="" />
                    </button>
                    <span className={classes2.delete_ads_note}>
                      *There is no backup
                    </span>
                  </div>
                  <div
                    className={`${classes2.delete_ads} ${
                  
                         classes2.activate_customer
                        
                    }`}
                  >
                  </div>
                </div>
              </div>
            );
          })}
      </React.Fragment>
    );
  }
}

export default withRouter(Details);

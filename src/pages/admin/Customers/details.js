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
      customer: [this.props.customer],
      updates: {},
      editable: false,
    };
  }
  componentDidMount() {
    const { customer } = this.props;

    this.setState({
      ...this.state,
      customer: [customer],
      loading: this.props.loading,
    });
  }

  handleFileChange = (info) => {
    const { updates } = this.state;

    const reader = new FileReader();
    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      updates.profilePhoto =`https://backendapp.murmurcars.com/advertisers/users/profilePhoto/${info.file.name}`;
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

  suspendOrRestoreCustomerAccount = (id, operation_type) => {
    this.setState({
      ...this.state,
      loading: true,
    });
    axios
      .put(
        `https://backendapp.murmurcars.com/api/v1/admin/customer-account-status?id=${id}&status=${operation_type}`,
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
  };

  toggleEditMode = () => {
    this.setState({ ...this.state, editable: true });
  };

  submitUpdates = () => {
    const { updates, customer } = this.state;
    const { email } = customer[0];

    const formData = new FormData();

    const keys = Object.keys(updates);

    for (let key of keys) {
      if(key === 'image') break
      formData.append([key], updates[key]);
    }
    this.setState({
      ...this.state,
      loading:true
    })
    axios.put(`https://backendapp.murmurcars.com/api/v1/admin/update-customer/${email}`, formData)
    .then(() => {
    this.setState({
      ...this.state,
      loading: false,
      editable: false,
      customer: [{ ...this.state.customer[0], ...updates }],
      updates: {},
    })
  })
  .catch(err => {
    this.setState({
      ...this.state,
      editable: false,
      loading: false
    })
  })
  };

  render() {
    const { loading, customer, updates, editable } = this.state;

    const url = this.props.location.search;
    const id = new URLSearchParams(url).get("customer");
    console.log(this.state.customer);
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
        {!this.state.loading &&
          customer.length &&
          customer.map((customer, index) => {
            let profile = customer.profilePhoto;
            if (customer.image) {
              const { image } = customer;
              profile = image;
            } else {
              const hasImage =
                profile &&
                profile.split(
                  "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
                )[1];
              if (hasImage === "null" || hasImage === "undefined")
                profile = Avatar;
            }

            return (
              <div className={classes2.ads_details_section} key={index}>
                <div className="d-flex justify-content-between">
                  <Link to="/customers" className={`${classes2.ads_back_icon}`}>
                    <img
                      src={ArrowLeft}
                      alt=""
                      className={classes2.ads_left_img}
                    />
                    <span>Back</span>
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
                            updates.image
                              ? updates.image
                              : profile
                              ? profile
                              : Avatar
                          }
                          alt=""
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
                          {customer.fullName}
                        </h5>
                      </div>
                      <div className={`${classes2.ads_details_content} `}>
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
                  <div className={classes2.ads_detail_audience}>
                    <div className={classes2.ads_detail_col}>
                      <div className={classes2.ads_detail_top}>
                        <h5 className={classes2.detail_top_h5}>
                          {" "}
                          Subscription
                        </h5>
                      </div>
                      <div className={`${classes2.ads_details_content} `}>
                        {!editable ? (
                          <p className={classes2.detail_content_p}>
                            {customer.subscribedToMurmurNewsettler
                              ? "Subscribed"
                              : "Not Subscribed"}
                          </p>
                        ) : (
                          <div
                            className={`${classes2.details_edit_select} ${classes2.mt_8}`}
                          >
                            <label className={classes.switch}>
                              <input
                                type="checkbox"
                                checked={
                                  updates.subscribedToMurmurNewsettler
                                    ? updates.subscribedToMurmurNewsettler
                                    : customer.subscribedToMurmurNewsettler
                                }
                                onChange={() =>
                                  this.handleDetailsUpdate(null, null, {
                                    subscribedToMurmurNewsettler:
                                      !customer.subscribedToMurmurNewsettler,
                                  })
                                }
                              />
                              <div
                                className={`${classes.slider} ${classes.round}`}
                                //  onClick={() => this.changeAddStatus(campaign._id, this.state.adds[i].checked)}
                              ></div>
                            </label>
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
                        <h5 className={classes2.detail_top_h5}>Company</h5>
                      </div>
                      <div className={classes2.ads_details_content}>
                        {!editable ? (
                          <p className={classes2.detail_content_p}>
                            ${customer.company}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className={classes2.ads_detail_category}>
                    <div className={classes2.ads_detail_col}>
                      <div className={classes2.ads_detail_top}>
                        <h5 className={classes2.detail_top_h5}>Ad Type</h5>
                      </div>
                      <div className={classes2.ads_details_content}>
                        {!editable ? (
                          <p className={classes2.detail_content_p}>
                            {customer.advertise_options}
                          </p>
                        ) : (
                          <div
                            className={`${classes2.details_edit_select} ${classes2.mt_8}`}
                          >
                            <select
                              name="audienceAge"
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
                          </div>
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
                        <h5 className={classes2.detail_top_h5}>Email</h5>
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
                <div className="d-flex justify-content-end">
                  <div className={classes2.delete_ads}>
                    <button
                      type="button"
                      className={classes2.delete_ads_btn}
                      onClick={() =>
                        this.suspendOrRestoreCustomerAccount(id, "delete")
                      }
                    >
                      <span>Delete Customer</span>
                      <img src={Trash2} alt="" />
                    </button>
                    <span className={classes2.delete_ads_note}>
                      *There is no backup
                    </span>
                  </div>
                  <div
                    className={`${classes2.delete_ads} ${
                      customer.accaunt_status === "suspend"
                        ? classes2.activate_customer
                        : classes2.suspend_customer
                    }`}
                  >
                    <button
                      type="button"
                      className={classes2.delete_ads_btn}
                      onClick={() =>
                        this.suspendOrRestoreCustomerAccount(
                          id,
                          `${
                            customer.accaunt_status === "suspend"
                              ? "active"
                              : "suspend"
                          }`
                        )
                      }
                    >
                      <span>
                        {customer.accaunt_status === "suspend"
                          ? "Activate"
                          : "Suspend"}{" "}
                        Customer
                      </span>
                    </button>
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

import React from "react";

import axios from "axios";

import GoogleMap from "../Dashboard/google-map";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";
import Trash2 from "../../assets/css/CreateAd/ads-details/trash.svg";
import Edit from "../../assets/css/CreateAd/ads-details/edit.svg";
import ImgEdit from "../../assets/css/CreateAd/ads-details/image-edit.svg";
import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";

import classes from "../../assets/css/CreateAd/index.module.css";
import classes2 from "../../assets/css/CreateAd/ads-details/index.module.css";
import { latLng } from "leaflet";

import ZIP from "../Dashboard/ZipCoordinates";

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

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
      loaded: false,
      postCenter: {
        lat: 0,
        lng: 0,
      },
      editable: false,
    };
  }
  toggleEditMode = () => {
    this.setState({ ...this.state, editable: !this.state.editable });
  };
  componentDidUpdate(prevProps) {
    const url = this.props.location.pathname;
    const params = url.split("/")[2];
    let area;
    if (this.props.adds.length !== prevProps.adds.length) {
      for (let i = 0; i < this.props.adds.length; i++) {
        if (this.props.adds[i].id === params) {
          area = this.props.adds[i].area;
          console.log(area);
        }
      }

      const LatLng = [];

      let coordinates = ZIP.filter((coordinate) => {
        if (coordinate[10] === area) {
          return coordinate[8];
        }
      });

      if (coordinates.length) {
        coordinates = coordinates.map((coordinate) => {
          return { coordinate: coordinate[8] };
        });
        coordinates = coordinates[0].coordinate.split("(((")[1].split(",");
        coordinates = coordinates.map((coordinate) => coordinate.split(" "));
        for (let i = 0; i < coordinates.length; i++) {
          if (coordinates[i][0].length !== 0) {
            LatLng.push({
              lat: Number.parseFloat(coordinates[i][1]),
              lng: Number.parseFloat(coordinates[i][0]),
            });
          } else {
            LatLng.push({
              lat: Number.parseFloat(coordinates[i][2]),
              lng: Number.parseFloat(coordinates[i][1]),
            });
          }
        }
      }
      console.log(LatLng[0]);
      Geocode.fromAddress("" + area).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        this.setState({
          ...this.state,
          coordinates: LatLng,
          zoom: 13,
          postCenter: { lat, lng },
        });
      });
    }
  }
  render() {
    const url = this.props.location.pathname;
    const params = url.split("/")[2];
    const statusArray = this.props.adds.filter((el) => el.id === params);
    let status = [];
    console.log(this.state);
    if (statusArray.length) {
      status = Object.values(statusArray[0]);
    }
    return (
      <React.Fragment>
        {this.props.loading && (
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
        {!this.props.loading && this.props.campaigns.map((campaign, index) => (
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
                type="button"
                className={classes2.crrnt_edit}
                onClick={this.toggleEditMode}
              >
                <span>{`${this.state.editable ? "Done" : "Edit"}`}</span>
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
                    <button type="button" className={classes2.detail_img_edit}>
                      <img src={ImgEdit} alt="" />
                    </button>
                  </div>
                </div>
              </div>
              <div className={classes2.ads_detail_audience}>
                <div className={classes2.ads_detail_col}>
                  <div className={classes2.ads_detail_top}>
                    <h5 className={classes2.detail_top_h5}>Audience</h5>
                  </div>
                  <div className={classes2.ads_details_content}>
                    <ul className={classes2.ads_detail_age}>
                      <li>
                        <span>Age</span>
                        <p
                          contentEditable={this.state.editable}
                          className={classes2.detail_content_p}
                        >
                          {campaign.audienceAge}
                        </p>
                      </li>
                      <li>
                        <span className={classes2.юage_gender_line}></span>
                      </li>
                      <li>
                        <span>Gender</span>
                        <p
                          contentEditable={this.state.editable}
                          className={classes2.detail_content_p}
                        >
                          {campaign.audienceGender}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className={classes2.ads_detail_quantity}>
                <div className={classes2.ads_detail_col}>
                  <div className={classes2.ads_detail_top}>
                    <h5 className={classes2.detail_top_h5}>Display Quantity</h5>
                  </div>
                  <div className={classes2.ads_details_content}>
                    <p
                      contentEditable={this.state.editable}
                      className={classes2.detail_content_p}
                    >
                      {campaign.display_quantity}
                    </p>
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
                    <p
                      contentEditable={this.state.editable}
                      className={classes2.detail_content_p}
                    >
                      ${campaign.daily_budget}
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes2.ads_detail_category}>
                <div className={classes2.ads_detail_col}>
                  <div className={classes2.ads_detail_top}>
                    <h5 className={classes2.detail_top_h5}>Category</h5>
                  </div>
                  <div className={classes2.ads_details_content}>
                    <p
                      contentEditable={this.state.editable}
                      className={classes2.detail_content_p}
                    >
                      {campaign.campaign_type}
                    </p>
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
                    <small contentEditable={this.state.editable}>
                      {campaign.area}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes2.delete_ads}>
              <button
                type="button"
                className={classes2.delete_ads_btn}
                onClick={() => this.props.delete(params, '_details')}
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

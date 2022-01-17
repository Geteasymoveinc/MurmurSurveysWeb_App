import axios from "axios";
import React, { Component } from "react";

import GoogleMap from "../Dashboard/google-map";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";
import Trash2 from "../../assets/css/CreateAd/ads-details/trash.svg";
import Edit from "../../assets/css/CreateAd/ads-details/edit.svg";

import classes from "../../assets/css/CreateAd/index.module.css";
import classes2 from "../../assets/css/CreateAd/ads-details/index.module.css";
import { latLng } from "leaflet";

import AdDetails from "./ad-details";

import ZIP from "../Dashboard/ZipCoordinates";

class Pullcampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullledCampaigns: [],
      modalViewDetailsStatus: false,
      viewCampaign: {},
      adds: [],
      editable: false,
      loading: false,
    };

    this.changeAddStatus = this.changeAddStatus.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.settingInterval = null;
  }
  componentDidMount() {
    let auth = sessionStorage.getItem("authUser");
    this.getCampaigns(auth)

    console.log(this.props.data.area);
  }
  
  
  //Get Campigns from APi call
  getCampaigns = (auth) => {
    this.setState({ ...this.state, loading: true });
    const allCampaigns = `https://backendapp.murmurcars.com/api/v1/campaigns/${auth}/all`;
    return axios.get(allCampaigns).then((response) => {
      console.log("hehe", auth);
      console.log(response);
      if (response.status !== 400 || response.status !== 500) {
        const adds = [];
        let item = {};
        const iterator = response.data.message;
        const campaigns = [];
        let index = 0;
        for (let i = 0; i < iterator.length; i++) {
          if (iterator[i].ad_schedule) {
            campaigns.push(iterator[i]);

            const date = iterator[i].ad_schedule.split(" ")[1];
            console.log(date);
            console.log(new Date(date) > new Date());
            item = {
              [`name-${index + 1}`]: new Date(date) > new Date(),
              id: iterator[i]._id,
              area: iterator[i].area,
            };
            adds.push(item);
            index++;
          }
          console.log(adds);
        }

        this.setState({
          ...this.state,
          pullledCampaigns: campaigns,
          adds: adds,
          loading: false,
        });
      }
    });
  };

  toggleDeleteAd = (id, type) => {
    this.setState({...this.state, loading:true})
    axios
      .delete(`https://backendapp.murmurcars.com/api/v1/campaigns/${id}`)
      .then((response) => {
        window.location.reload();
        if(type==='_details') this.props.history.push("/ad-manager");
        this.setState({...this.state, loading:false})
      })

      .catch((error) => console.log(error));
      
  };

  toggle = (status, campaign) => {
    console.log("modal", status, campaign);
    let modalStatus = !status;
    this.setState({
      modalViewDetailsStatus: modalStatus,
      viewCampaign: campaign,
    });
  };

  toggleEditMode() {
    this.setState({ ...this.state, editable: !this.state.editable });
  }

  locatePosition() {}

  handleCampaigns = () => {
    const toggle = this.toggle;
    console.log("our campaigns " + this.state.pullledCampaigns);
    let murmurCampaigns = [];
    /*this part is add-manager STARTING*/
    if (this.state.pullledCampaigns.length !== 0) {
      {
        this.state.pullledCampaigns.map((campaign, i) => {
          console.log(i);
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <div className={classes.cads_check}>
                    <input type="checkbox" id={`name-${i + 1}`} />
                    <label htmlFor={`name-${i + 1}`}>
                      {campaign.campaign_name}
                    </label>
                  </div>
                  <div className={`${classes.cads_radio_active}`}>
                    {!this.state.adds[i]["name-" + (i + 1)] && (
                      <button
                        type="button"
                        className={classes.check_remove}
                        onClick={() => this.toggleDeleteAd(campaign._id)}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                    <label
                      className={classes.switch}
                      htmlFor={`checkbox${i + 1}`}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox${i + 1}`}
                        name={`name-${i + 1}`}
                        defaultChecked={this.state.adds[i]["name-" + (i + 1)]}
                        onClick={this.changeAddStatus}
                      />
                      <div
                        className={`${classes.slider} ${classes.round}`}
                      ></div>
                    </label>
                  </div>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span
                  className={`${
                    this.state.adds[i]["name-" + (i + 1)]
                      ? classes.cads_active_dot
                      : classes.cads_deactive_dot
                  }`}
                >
                  <span className={classes.cads_dot}></span>{" "}
                  {`${
                    this.state.adds[i]["name-" + (i + 1)]
                      ? "Active"
                      : "Deactive"
                  }`}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {" "}
                  {campaign.display_quantity}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.daily_budget}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.area}</span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={"/ad-manager/" + campaign._id}
                  className={classes.details_link}
                  onClick={this.locatePosition}
                >
                  Details
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
      /*this part is add-manager ENDING*/
    }

    return murmurCampaigns;
  };

  //Sort Data
  changeAddStatus(event) {
    const name = event.target.name;
    const index = name.split("-")[1];
    const addsItemsArray = this.state.adds;
    const addItemCurrentStatus = this.state.adds[index - 1][name];
    const modifiedAddItemObject = { [name]: !addItemCurrentStatus };
    addsItemsArray[index - 1] = modifiedAddItemObject;
    this.setState({ ...this.state, adds: [...addsItemsArray] });
  }
  render() {
    /*extracting dymanic pathname (id) from url and querying pulledCampaigns for campaign with selected id*/
    const url = this.props.location.pathname;
    const params = url.split("/")[2];
    const statusArray = this.state.adds.filter((el) => el.id === params);
    let status = [];

    if (statusArray.length) {
      status = Object.values(statusArray[0]);
    }
    const campaigns = this.state.pullledCampaigns.filter(
      (el) => el._id === params
    );
    console.log(this.state);

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
        {this.props.match.isExact && !this.state.loading && (
          <div className={classes.cads_table}>
            <table>
              <thead>
                <tr className={classes.first_tr}>
                  <th className={classes.cads_th}>
                    <div
                      className={`${classes.cads_check} ${classes.invoice_th}`}
                    >
                      <input type="checkbox" id="invoice-txt" />
                      <label htmlFor="invoice-txt">Name</label>
                    </div>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Status</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                    <span>Display Quantity</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Daily Budget</span>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Area</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.handleCampaigns()}</tbody>
            </table>
          </div>
        )}
        {/* this part is ad-manager ENDING*/}
        {/*this part is ad-details STARTING*/}
        {!this.props.match.isExact && (
          <AdDetails
            campaigns={campaigns}
            adds={this.state.adds}
            delete={this.toggleDeleteAd}
            loading={this.state.loading}
          />
        )}
        {/*this part is ad-details ENDING*/}
      </React.Fragment>
    );
  }
}
export default withRouter(Pullcampaigns);

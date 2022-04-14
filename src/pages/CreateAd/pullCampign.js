import axios from "axios";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";

import classes from "../../assets/css/CreateAd/index.module.css";

import AdDetails from "./ad-details";

class Pullcampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: false,
      checked: false,
      pullledCampaigns: [],
      modalViewDetailsStatus: false,
      viewCampaign: {},
      adds: [],
      editable: false,
      loading: false,
    };

    this.changeAddStatus = this.changeAddStatus.bind(this);
    this.settingInterval = null;
  }
  componentDidMount() {
    let auth = sessionStorage.getItem("authUser");
    this.getCampaigns(auth);
  }

  //Get Campigns from APi call
  getCampaigns = (auth) => {
    this.setState({ ...this.state, loading: true });
    const allCampaigns = `https://backendapp.murmurcars.com/api/v1/campaigns/${auth}/all`;
    return axios
      .get(allCampaigns)
      .then((response) => {
        if (response.status !== 400 || response.status !== 500) {
          const adds = [];
          let item = {};
          const iterator = response.data.message;
          const campaigns = [];
          let index = 0;
          for (let i = 0; i < iterator.length; i++) {
            if (iterator[i].ad_schedule) {
              campaigns.push(iterator[i]);
              console.log(iterator[i].ad_schedule);
              const date = iterator[i].ad_schedule.split(" ")[1];

              item = {
                [`name-${index + 1}`]: new Date(date) > new Date(),
                id: iterator[i]._id,
                area: iterator[i].area,
                toggled: false,
              };
              adds.push(item);
              index++;
            }
            console.log(adds);
          }

          const campaignsLength = campaigns.length;
          const campaignList = {};

          for (let i = 0; i < campaignsLength; i++) {
            campaignList[`name-${i + 1}`] = false;
          }

          this.setState({
            ...this.state,
            pullledCampaigns: campaigns,
            adds: adds,
            loading: false,
            haveCampaigns: campaignsLength > 0 ? true : false,
            ...campaignList,
          });
        }
      })
      .catch(() => {
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  };

  toggleDeleteAd = (id, type) => {
    this.setState({ ...this.state, loading: true });
    axios
      .delete(`https://backendapp.murmurcars.com/api/v1/campaigns/${id}`)
      .then(() => {
        window.location.reload();
        if (type === "_details") {
          this.props.history.replace("/ad-manager");
          this.props.history.go("/ad-manager");
        }
        this.setState({ ...this.state, loading: false });
      })

      .catch((error) => console.log(error));
  };

  toggleDeleteMultipleAd = () => {
      const adds = this.state.adds
      const list_of_ids = [] 
      this.setState({ ...this.state, loading: true });
      for(let i=0;i<adds.length;i++){
          const keys = Object.keys(adds[i])
          if(!adds[i][keys[0]]){
              list_of_ids.push(adds[i].id)
          }
      }
    
      axios.delete(`https://backendapp.murmurcars.com/api/v1/campaigns/delete/${list_of_ids}`)
      .then(() => {
        window.location.reload();
        this.setState({ ...this.state, loading: false });
      })
      .catch(err => {
        
      })
  }

  checkCampaign = (event) => {
    const id = event.target.id;
    const adds = this.state.adds;
    for (let i = 0; i < adds.length; i++) {
      const keys = Object.keys(adds[i]);
      console.log(keys);
      if (keys[0] === id) {
        adds[i].toggled = !adds[i].toggled;
      }
    }
    this.setState({
      ...this.state,
      [id]: !this.state[id],
      adds,
    });
  };

  checkAllCampigns = () => {
    const campaigns = this.state.pullledCampaigns.length;
    const adds = this.state.adds;

    for (let i = 0; i < campaigns; i++) {
      console.log(adds[i]);
      const name = `name-${i + 1}`;
      console.log(this.state.checked);
      if (this.state.checked === true) {
        adds[i].toggled = false;
        console.log("checked");
        this.setState({ [name]: false, checked: false, adds });
        
      } else {
        console.log("second ");
        adds[i].toggled = true;
        this.setState({ [name]: true, checked: true, adds });
      }
    }
  };

  locatePosition() {}

  //ad-campaign
  handleCampaigns = () => {
    const {multiple} = this.state
    console.log("our campaigns " + this.state.pullledCampaigns);
    let murmurCampaigns = [];

    if (this.state.pullledCampaigns.length !== 0) {
      {
        this.state.pullledCampaigns.map((campaign, i) => {
          console.log(i);
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                  <div className={classes.cads_check}>
                    <input
             
                      type="checkbox"
                      id={`name-${i + 1}`}
                      checked={
                        (this.state.checked ||
                          (this.state.haveCampaigns &&
                            this.state[`name-${i + 1}`])) &&
                        this.state.haveCampaigns &&
                        this.state[`name-${i + 1}`]
                      }
                      onChange={this.checkCampaign}
                    />
                    <label htmlFor={`name-${i + 1}`}>
                      {campaign.campaign_name}
                    </label>
                  </div>
                  <div className={`${classes.cads_radio_active}`}>
                    {!this.state.adds[i]["name-" + (i + 1)] && !multiple && (
                      <button
                        type="button"
                        className={`${classes.check_remove}`}
                        onChange={() => this.toggleDeleteAd(campaign._id)}
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
                        checked={this.state.adds[i]["name-" + (i + 1)]}

                        onChange={() => this.changeAddStatus(campaign._id)}
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
                  to={`/ad-manager?campaign=${campaign._id}`}
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
    }

    return murmurCampaigns;
  };

  //activating and disactivating ad campaign
  changeAddStatus(id) {
    const target = id;
    const adds = this.state.adds;
    let count = 0
    let multiple = false
    let isSwitchRadiosInctive = false

    for (let i = 0; i < adds.length; i++) {
      const keys = Object.keys(adds[i]);
      if(!adds[i][keys[0]]){
        count++
      }
      if (adds[i]["toggled"]) {
        
        count++
  
        if(!adds[i][keys[0]]){
          isSwitchRadiosInctive = true
        }
        adds[i][keys[0]] = !adds[i][keys[0]];
      } else if (adds[i]["id"] === target) {
        console.log("right");
        count++
        if(!adds[i][keys[0]]){
          isSwitchRadiosInctive = true
        }
        adds[i][keys[0]] = !adds[i][keys[0]];
      }
    }
    if((count>1 && !isSwitchRadiosInctive) ){
      multiple = true
    }
    this.setState({
      ...this.state,
      adds,
      multiple
    });
    console.log(target);
  }



  render() {
    const url = this.props.location.search; //extracting billing id
    const params = url.split("?campaign=")[1]; // geting rid of left side
    const statusArray = this.state.adds.filter((el) => el.id === params); //looking for ad by ad campaign id
    let status = [];

    if (statusArray.length) {
      status = Object.values(statusArray[0]);
    }
    const campaigns = this.state.pullledCampaigns.filter(
      (el) => el._id === params
    ); //looging for campaign by ad campaign id
    const {multiple} = this.state
    console.log(this.state)
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
        {!this.props.location.search.length > 0 &&
          !this.state.loading && ( //list all campaigns
            <div className={classes.cads_table}>
              <table>
                <thead>
                  <tr className={classes.first_tr}>
                    <th className={`${classes.cads_th}`}>
                      <div
                        className={`${classes.cads_check} ${classes.invoice_th}`}
                      >
                        <input
                          type="checkbox"
                          id="invoice-txt"
                          onChange={this.checkAllCampigns}
                          checked={this.state.checked}
                        />
                        <label htmlFor="invoice-txt">Name</label>
                        {multiple && (
                      <button
                        type="button"
                        className={`${classes.check_remove} ${classes.multiple_remove}`}
                        onClick={() => this.toggleDeleteMultipleAd()}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                      </div>
                 
                    </th>
                    <th className={classes.cads_th}>
                      <span>Status</span>
                    </th>
                    <th
                      className={`${classes.cads_th} ${classes.cads_quantity}`}
                    >
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

        {this.props.location.search.length > 0 && ( //when user selects an add to check details
          <AdDetails
            campaigns={campaigns}
            adds={this.state.adds}
            delete={this.toggleDeleteAd}
            loading={this.state.loading}
          />
        )}
      </React.Fragment>
    );
  }
}
export default withRouter(Pullcampaigns);

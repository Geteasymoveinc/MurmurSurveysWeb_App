import axios from "axios";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";

import classes from "../../../assets/css/CreateAd/index.module.css";

import CampaignAnalytics from "./analytics";
import AdDetails from "./ad-details";

import { connect } from "react-redux";
import { postUpdateCampaignStatusToBackend, postUpdateCampaignsStatusToBackend } from "../../../store/campaigns/actions";

const declineRequest = (pulledRequests,adds, id) => {
  pulledRequests = pulledRequests.filter((campaign) => {
    if (campaign._id !== id) {
      return campaign;
    }
  });

  adds = adds.filter((campaign) => {
    if (campaign._id !== id) {
      return campaign;
    }
  });
  

  return {pulledRequests,adds}

}



class PulledRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      haveCampaigns: true,
      checked: false,
      pulledRequests: this.props.requests,
      adds: this.props.adds,
      multiple: false,
    };
  }


  declineMultipleRequests = (ids) => {
  
    let {adds, pulledRequests} = this.state
   
    adds = adds.filter((add, i) => add.id!==ids[i])
    pulledRequests = pulledRequests.filter((request, i) => request._id!==ids[i])
    this.setState({
      ...this.state,
      pulledRequests,
      adds
    });
  }
  declineAllRequests = () => {
    console.log('declyning')
  
    let {adds} = this.state
    const ids = []


    for(let i=0;i< adds.length; i++){
      
      if(adds[i].checked){
      const id = adds[i].id
      ids.push(id)
      }
    }



    this.declineMultipleRequests(ids)

    //this.props.postUpdateCampaignsStatusToBackend(ids, 'Declined')
  };
  declineRequest = (id) => {
    let { pulledRequests, adds } = this.state;
   

    const obj = declineRequest(pulledRequests,adds,id)
    
    this.setState({
      ...this.state,
      pulledRequests: obj[pulledRequests],
      adds: obj[adds],
    });
    this.props.postUpdateCampaignStatusToBackend(id, "Declined")
  };

  approveRequest = (campaign) => {
    this.props.approveRequest({
      campaign_name: campaign.campaign_name,
      _id: campaign._id,
      customer: campaign.customer,
      daily_budget: campaign.daily_budget,
      ad_type: campaign.ad_type,
    });
    let { pulledRequests,adds } = this.state;
    const obj = declineRequest(pulledRequests,adds,campaign._id)
    
    this.setState({
      ...this.state,
      pulledRequests: obj[pulledRequests],
      adds: obj[adds],
    });

    this.props.postUpdateCampaignStatusToBackend(campaign._id, 'Approved');
  };
  approveAllRequests = () => {

   
   const ids = []

   let {adds,pulledRequests} = this.state

   const requests = []
   const Adds = []
   for(let i=0;i< adds.length; i++){

    if(adds[i].checked){
     const id = adds[i].id
     ids.push(id)
    Adds.push(adds[i])
    requests.push(pulledRequests[i])
    }
   }

    this.props.approveAllRequests(Adds, requests);
    this.declineMultipleRequests(ids)

  
    this.props.postUpdateCampaignsStatusToBackend(ids, 'Approved')
  };
  //ad-campaign
  handleCampaigns = () => {
    let murmurCampaigns = [];

    if (this.state.pulledRequests.length !== 0) {
      {
        this.state.pulledRequests.map((campaign, i) => {
          murmurCampaigns.push(
            <tr key={campaign._id}>
              <td className={classes.cads_td}>
                <div className={classes.cads_flex_th}>
                <div className={classes.cads_check}>
                    <input
                      type="checkbox"
                      id={campaign._id}
                      checked={
                        (this.state.checked ||
                          (this.state.haveCampaigns &&
                            this.state.adds[i].checked)) &&
                        this.state.haveCampaigns &&
                        this.state.adds[i].checked
                      }
                      onChange={e => this.checkCampaign(e)}
                    />
                  <label htmlFor={campaign._id}>{campaign.campaign_name}</label>
                  </div>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span className={`${classes.td_data} ${classes.td_data_2}`}>
                  <img
                    src={campaign.customer.img}
                    alt="profile img"
                    className={classes.partner_profile_img}
                  />
                  {campaign.customer.fullName}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {" "}
                  {campaign.campaign_type}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {" "}
                  <button
                    type="button"
                    className={classes.decline_button}
                    onClick={() => this.declineRequest(campaign._id)}
                  >
                    Decline
                  </button>
                </span>
              </td>
              <td className={classes.cads_td}>
                <button
                  type="button"
                  className={classes.approve_button}
                  onClick={() => this.approveRequest(campaign)}
                >
                  Approve
                </button>
              </td>

              <td className={classes.cads_td}>
                <Link
                  to={`/campaigns?request=${campaign._id}`}
                  className={classes.details_link}
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
  

  
  checkCampaign = (event) => {
    const id = event.target.id;
    const adds = this.state.adds;
    let multiple = false;
    let count = 0;
    for (let i = 0; i < adds.length; i++) {
      if (adds[i].checked && adds[i].id!==id) {
        count++;
      }
      if (adds[i].id === id) {
        
        adds[i].checked = !adds[i].checked;
        if (adds[i].checked) {
          count++;
        }
      }
    }
    console.log(count)
    if (count > 1) {
      multiple = true;
    } 
    this.setState({
      ...this.state,
      adds,
      multiple,
    });

  };

  checkAllCampigns = () => {
    const adds = this.state.adds;
    let count = 0;
    let multiple = false;
    const checked = !this.state.checked;
   console.log('checking')
    for (let i = 0; i < adds.length; i++) {
      if (
        (this.state.multiple && this.state.checked) ||
        (!this.state.multiple && !this.state.checked)
      ) {
        if (adds[i].checked === true && this.state.checked) {
          adds[i].checked = false;
        } else if(!this.state.checked){
          count++;
          adds[i].checked = true;
        }
      } else if (!this.state.checked) {
        count++;
        adds[i].checked = true;
      }else{
        adds[i].checked = false
      }
    }

    if (count > 1 && checked) {
      multiple = true;
    }

    this.setState({
      ...this.state,
      adds,
      multiple,
      checked,
    });

  }
  render() {

    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get('request') //extracting id 
 
    const campaign = this.state.pulledRequests.filter(campaign => campaign._id ===id)
   
   console.log(this.state)

    return (
      <React.Fragment>
        {/* this part is ad-manager STARTING*/}
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
        {!this.props.location.search.length > 0 &&
          this.state.loaded && ( //list all campaigns
            <div
              className={classes.cads_table}
              style={{ marginBottom: "30px" }}
            >
              <table>
                <thead>
                  <tr className={classes.first_tr}>
                    <th className={`${classes.cads_th}`}>
                    <div
                        className={`${classes.cads_check} ${classes.invoice_th}`}
                      >
                        <input
                          type="checkbox"
                          id="requests"
                          onChange={this.checkAllCampigns}
                          checked={this.state.checked}

                        />
                        <label htmlFor="requests">Name</label>
                      </div>
                    </th>
                    <th className={classes.cads_th}>
                      <span>Customer</span>
                    </th>
                    <th
                      className={`${classes.cads_th} ${classes.cads_quantity}`}
                    >
                      <span>Type</span>
                    </th>
                    <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                      <span
                        className={classes.delete_table_header}
                        onClick={this.declineAllRequests}
                      >
                        Decline All
                      </span>
                    </th>
                    <th className={classes.cads_th}>
                      <span
                        className={classes.approve_table_header}
                        onClick={this.approveAllRequests}
                      >
                        Approve All
                      </span>
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
            campaigns={campaign}
            adds={this.state.adds}
            loading={this.state.loading}
          />
        )}
      </React.Fragment>
    );
  }
}

export default connect(null,{postUpdateCampaignStatusToBackend,postUpdateCampaignsStatusToBackend})(withRouter(PulledRequests));

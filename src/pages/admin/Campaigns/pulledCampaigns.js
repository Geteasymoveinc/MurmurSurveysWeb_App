import axios from "axios";
import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";

import classes from "../../../assets/css/CreateAd/index.module.css";

import CampaignAnalytics from "./analytics";





class PulledCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: true,
      checked: false,
      multiple: false,
       pullledCampaigns: this.props.campaigns,
       adds: this.props.adds,
      editable: false,
      loading: false,
    };


    this.settingInterval = null;
  }


  deleteCampaign = (id) => {

    console.log(id)
    let { pullledCampaigns, adds } = this.state;

    pullledCampaigns = pullledCampaigns.filter((campaign) => {
      if (campaign._id !== id) {
        return campaign;
      }
    });
    adds = adds.filter((add) => {
      if (add.id !== id) {
        return add;
      }
    });


    this.setState({
      ...this.state,
      pullledCampaigns,
      adds,
    });
  }





  checkCampaign = (event) => {
    const id = event.target.id;
    const adds = this.state.adds;
     let multiple = false
    let count = 0
    for (let i = 0; i < adds.length; i++) {
      if(adds[i].checked){
        count++
      }
      if (adds[i].id === id) {
        adds[i].toggled = !adds[i].toggled;
        adds[i].checked = !adds[i].checked;
        if(adds[i].checked){
          count++
        }
      }
    }

    if(count>1){
      multiple =  true
    }else{
      multiple = false
    }
    this.setState({
      ...this.state,
      adds,
      multiple
    });
  };

  checkAllCampigns = () => {
    const campaigns = this.state.pullledCampaigns.length;
    const adds = this.state.adds;

    for (let i = 0; i < campaigns; i++) {
      if (this.state.checked === true) {
        adds[i].toggled = false;
        adds[i].checked = false;

        this.setState({ checked: false, adds, multiple:false });
      } else {
        adds[i].toggled = true;
        adds[i].checked = true;
        this.setState({ checked: true, adds, multiple: true });
      }
    }
  };

  

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
                      onChange={this.checkCampaign}
                    />
                    <label htmlFor={campaign._id}>
                      {campaign.campaign_name}
                    </label>
                  </div>
                  <div className={`${classes.cads_radio_active}`}>
                    {this.state.adds[i].checked && !multiple && (
                      <button
                        type="button"
                        className={`${classes.check_remove}`}
                        onClick={() => this.deleteCampaign(campaign._id)}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
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
                <span className={classes.td_data}> {campaign.ad_type}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.daily_budget}</span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/campaigns?campaign=${campaign._id}`}
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


  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.campaigns.length !== this.props.campaigns.length
    ) {

        this.setState({
          ...this.state,
          pullledCampaigns: [
            ...this.state.pullledCampaigns,
            ...this.props.campaigns.slice(prevProps.campaigns.length, )
          ],
          adds: [...this.state.adds, ...this.props.adds.slice(prevProps.adds.length,)]
        });

      
    }

    
  }

  render() {
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get('campaign') //extracting id 


    const { multiple } = this.state;
   

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
                          id="campaigns"
                          onChange={this.checkAllCampigns}
                          checked={this.state.checked}
                        />
                        <label htmlFor="campaigns">Name</label>
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
                      <span>Customer</span>
                    </th>
                    <th
                      className={`${classes.cads_th} ${classes.cads_quantity}`}
                    >
                      <span>Type</span>
                    </th>
                    <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                      <span>Daily Budget</span>
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















export default withRouter(PulledCampaigns);

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
      pullledCampaigns: [],
      modalViewDetailsStatus: false,
      viewCampaign: {},
      adds: [],
      loading: false,
      multiple: false,
      multiple_delete: false,
      checked: false,
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
              const date = iterator[i].ad_schedule.split(" ")[1];

              item = {
                id: iterator[i]._id,
                area: iterator[i].area,
                toggled: new Date(date) > new Date(),
                checked: false,
              };
              adds.push(item);
              index++;
            }
          }

          const campaignsLength = campaigns.length;
          const campaignList = {};

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
        if (type === 'from_details') {
          this.props.history.replace("/ad-manager");
          this.props.history.go("/ad-manager");
        }
        this.setState({ ...this.state, loading: false });
      })

      .catch((error) => console.log(error));
  };

  toggleDeleteMultipleAd = () => {
    const adds = this.state.adds;
    const list_of_ids = [];
    this.setState({ ...this.state, loading: true });
    for (let i = 0; i < adds.length; i++) {
      if (!adds[i].toggled) {
        list_of_ids.push(adds[i].id);
      }
    }
   
    axios
      .delete(
        `https://backendapp.murmurcars.com/api/v1/campaigns/delete/${list_of_ids}`
      )
      .then(() => {
        window.location.reload();
        this.setState({ ...this.state, loading: false });
      })
      .catch((err) => this.setState({
        ...this.state, loading: false
      }));
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

    if (count > 1) {
      multiple = true;
    } else {
      multiple = false;
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
  };


  //ad-campaign
  handleCampaigns = () => {
    const { multiple_delete } = this.state;

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
                    {!this.state.adds[i].toggled && !multiple_delete && (
                      <button
                        type="button"
                        className={`${classes.check_remove}`}
                        onClick={() => this.toggleDeleteAd(campaign._id)}
                      >
                        <img src={Trash} alt="" />
                      </button>
                    )}
                    <label className={classes.switch}>
                      <input
                        type="checkbox"
                        checked={this.state.adds[i].toggled}
                        onChange={() => this.changeAddStatus(campaign._id, this.state.adds[i].checked)}
                      />
                      <div
                        className={`${classes.slider} ${classes.round}`}
                      //  onClick={() => this.changeAddStatus(campaign._id, this.state.adds[i].checked)}
                      ></div>
                    </label>
                  </div>
                </div>
              </td>
              <td className={classes.cads_td}>
                <span
                  className={`${
                    this.state.adds[i].toggled
                      ? classes.cads_active_dot
                      : classes.cads_deactive_dot
                  }`}
                >
                  <span className={classes.cads_dot}></span>{" "}
                  {`${this.state.adds[i].toggled ? "Active" : "Deactive"}`}
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

  toggleMultipleAdds = (id) => {
    const adds = this.state.adds;
    let count = 0;
    let multiple_delete = false;
    for (let i = 0; i < adds.length; i++) {
      if(adds[i].checked){
      if (adds[i].toggled === true) {
        adds[i].toggled = false;

        count++;
      } else {
        adds[i].toggled = true;
      }
      }
    }
    if (count > 1) {
      multiple_delete = true;
    }

    this.setState({ ...this.state, adds, multiple_delete });
  };
  //activating and disactivating ad campaign
  changeAddStatus(id, this_checked) {
    if (this.state.multiple, this_checked) {
      this.toggleMultipleAdds(id);
      return;
    }

    const adds = this.state.adds;
    let multiple_delete = false;
    let count = 0;

    
    for (let i = 0; i < adds.length; i++) {
      const toggled = adds[i].toggled
      

  
   
      if (adds[i].id === id) {
         
        if (toggled) {
          count++;
        }
        adds[i].toggled = !toggled
      }else{
        if(!toggled){
          count++
        }
      }
    }
  console.log(count)
    if (count > 1) {
      multiple_delete = true;
    } else {
      multiple_delete = false;
    }
    this.setState({
      ...this.state,
      adds,
      multiple_delete,
    });
  }

  render() {

    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get('campaign') //extracting id 

    const campaigns = this.state.pullledCampaigns.filter(
      (el) => el._id === id
    ); //looging for campaign by ad campaign id
    const { multiple_delete } = this.state;

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
                        {multiple_delete && (
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

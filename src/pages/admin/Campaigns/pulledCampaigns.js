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
      pullledCampaigns: [
        {
          _id: "6266d5a307c2ba1274d57108",
          ab_experiment: [],
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          ad_type: "Indoor",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: true,
        },
        {
          _id: "6266d5a307c2ba1274d57100",
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          ad_type: "Backpack",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
        {
          _id: "6266d5a307c2ba12uhd57108",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          ad_type: "Backpack",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
        {
          _id: "6278d5a307c2ba1274d57108",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          ad_schedule: "2022-04-26 2022-05-02",
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          ad_type: "Backpack",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
        {
          _id: "6266d5a307c2ba12jhld57108",
          ad_schedule: "2022-04-26 2022-05-02",
          customer: {
            img: "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/20191106_122151[1].jpg",
            fullName: "A.Valiyeva",
          },
          advertisers_email: "hemidovcingiz183@gmail.com",
          area: "khazar",
          artWork_url:
            "https://backendapp.murmurcars.com/advertisers/media/uploads/logo-create.png",
          audienceAge: "18-25",
          audienceGender: "Both",
          ad_type: "Backpack",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
        },
      ],
      adds: [
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba1274d57108",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba1274d57100",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba12uhd57108",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6278d5a307c2ba1274d57108",
          toggled: false,
        },
        {
          area: "khazar",

          checked: false,
          id: "6266d5a307c2ba12jhld57108",
          toggled: false,
        },
      ],
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
                [`campaign-${index + 1}`]: new Date(date) > new Date(),
                id: iterator[i]._id,
                area: iterator[i].area,
                toggled: false,
                checked: false,
              };
              adds.push(item);
              index++;
            }
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
                <span className={classes.td_data}>
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


  componentDidMount() {
    const length = this.state.pullledCampaigns.length;
    this.props.getCampaignsLength(length);
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.approvedRequests.length !== this.props.approvedRequests.length
    ) {
      if (this.props.mode === "single") {
        this.setState({
          ...this.state,
          pullledCampaigns: [
            ...this.state.pullledCampaigns,
            this.props.approvedRequests[0],
          ],
          adds: [...this.state.adds, ...this.props.adds[0]],
        });
      }else{
        this.setState({
          ...this.state,
          pullledCampaigns: [
            ...this.state.pullledCampaigns,
            ...this.props.approvedRequests,
          ],
          adds: [...this.state.adds, ...this.props.adds],
        });
      }
    }

    
  }

  render() {
    let status = [];
    const url = this.props.location.search; //extracting billing id
    const params = url.split("?campaign=")[1]; // geting rid of left side
    const statusArray = this.state.adds.filter((el) => el.id === params); //looking for ad by ad campaign id

    if (statusArray.length) {
      status = Object.values(statusArray[0]);
    }
    const campaigns = this.state.pullledCampaigns.filter(
      (el) => el._id === params
    ); //looging for campaign by ad campaign id
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
              style={{ marginBottom: "100px" }}
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

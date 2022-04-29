import React from "react";

import axios from "axios";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";
import SurveyEye from "../../../assets/images/surveys/survey-eye.svg";
import SurveyEdit from "../../../assets/images/surveys/survey-edit.svg";
import SurveyPrice from "../../../assets/images/surveys/survey-price.svg";
import SampleImage from "../../../assets/images/surveys/sample-image.png";
import SampleImage2 from "../../../assets/images/surveys/sample-image2.png";
import classes from "../../../assets/css/CreateAd/index.module.css";
import classes2 from "../../../assets/css/surveys/surveys.module.css";

import CampaignAnalytics from "./analytics";

class PulledSurveys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCampaigns: true,
      checked: false,
      active: "6266d5a307c2ba1274d57108",
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
          artWork_url:SampleImage,
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: true,
          views: 1000,
          answers:670,

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
          artWork_url:SampleImage2,
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
          views: 1000,
          answers:670,
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
          views: 1000,
          answers:670,
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
          answers:670,
          views: 1000,
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
          answers:670,
          views: 1000,
        },
      ],
      modalViewDetailsStatus: false,
      viewCampaign: {},
      adds: [
        {
          area: "khazar",
          "campaign-1": true,
          checked: false,
          id: "6266d5a307c2ba1274d57108",
          toggled: false,
        },
        {
          area: "khazar",
          "campaign-2": true,
          checked: false,
          id: "6266d5a307c2ba1274d57100",
          toggled: false,
        },
        {
          area: "khazar",
          "campaign-3": true,
          checked: false,
          id: "6266d5a307c2ba12uhd57108",
          toggled: false,
        },
        {
          area: "khazar",
          "campaign-4": true,
          checked: false,
          id: "6278d5a307c2ba1274d57108",
          toggled: false,
        },
        {
          area: "khazar",
          "campaign-5": true,
          checked: false,
          id: "6266d5a307c2ba12jhld57108",
          toggled: false,
        },
      ],
      editable: false,
      loading: false,
    };

    this.changeAddStatus = this.changeAddStatus.bind(this);
    this.settingInterval = null;
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
    const adds = this.state.adds;
    const list_of_ids = [];
    this.setState({ ...this.state, loading: true });
    for (let i = 0; i < adds.length; i++) {
      const keys = Object.keys(adds[i]);
      if (!adds[i][keys[0]]) {
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
      .catch((err) => {});
  };

  checkCampaign = (event) => {
    const id = event.target.id;
    console.log(id);
    const adds = this.state.adds;
    for (let i = 0; i < adds.length; i++) {
      console.log(adds[i][id]);
      if (adds[i][id]) {
        adds[i].toggled = !adds[i].toggled;
        adds[i].checked = !adds[i].checked;
      }
    }
    this.setState({
      ...this.state,
      adds,
    });
  };

  checkAllCampigns = () => {
    const campaigns = this.state.pullledCampaigns.length;
    const adds = this.state.adds;

    for (let i = 0; i < campaigns; i++) {
      if (this.state.checked === true) {
        adds[i].toggled = false;
        adds[i].checked = false;

        this.setState({ checked: false, adds });
      } else {
        adds[i].toggled = true;
        adds[i].checked = true;
        this.setState({ checked: true, adds });
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
         
                    <label htmlFor={`campaign-${i + 1}`}>
                      {campaign.campaign_name}
                    </label>
              
                </div>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  <img
                    src={campaign.customer.img}
                    alt="avatar"
                    className={classes.partner_profile_img}
                  />
                  {campaign.customer.fullName}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}> {campaign.views}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.answers}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{campaign.daily_budget}</span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/campaigns?campaign=${campaign._id}`}
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
  
  //activating and disactivating ad campaign
  changeAddStatus(id) {
    const target = id;
    const adds = this.state.adds;
    let count = 0;
    let multiple = false;
    let isSwitchRadiosInctive = false;

    for (let i = 0; i < adds.length; i++) {
      const keys = Object.keys(adds[i]);
      if (!adds[i][keys[0]]) {
        count++;
      }
      if (adds[i]["toggled"]) {
        count++;

        if (!adds[i][keys[0]]) {
          isSwitchRadiosInctive = true;
        }
        adds[i][keys[0]] = !adds[i][keys[0]];
      } else if (adds[i]["id"] === target) {
        console.log("right");
        count++;
        if (!adds[i][keys[0]]) {
          isSwitchRadiosInctive = true;
        }
        adds[i][keys[0]] = !adds[i][keys[0]];
      }
    }
    if (count > 1 && !isSwitchRadiosInctive) {
      multiple = true;
    }
    this.setState({
      ...this.state,
      adds,
      multiple,
    });
    console.log(target);
  }


  toggleSurveyWindow = (id) => {
      const active = this.state.active
      let value = id
      if(active === id){
          value = ''
      }

      this.setState({
          ...this.state,
          active: value
      })
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
        {(!this.props.location.search.length > 0 &&
        !this.state.loading) &&(
          <div className={classes.cads_table} style={{ marginBottom: "100px" }}>
            <table>
              <thead>
                <tr className={classes.first_tr}>
                  <th className={`${classes.cads_th}`}>
                 <span> Name</span>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Customer</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                    <span>View</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>answers</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Budget</span>
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

export default withRouter(PulledSurveys);

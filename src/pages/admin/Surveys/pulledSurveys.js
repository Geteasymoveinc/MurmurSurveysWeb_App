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
          artWork_url: SampleImage,
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: true,
          views: 1000,
          answers: 670,
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
          artWork_url: SampleImage2,
          audienceAge: "18-25",
          audienceGender: "Both",
          campaign_name: "Fiesta",
          campaign_type: "Automotive",
          created: "2022-04-25T17:08:51.253Z",
          daily_budget: "75",
          display_quantity: "200",
          hasAnalytics: false,
          views: 1000,
          answers: 670,
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
          answers: 670,
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
          answers: 670,
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
          answers: 670,
          views: 1000,
        },
      ],
      modalViewDetailsStatus: false,
      viewCampaign: {},
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
                  <label>{campaign.campaign_name}</label>
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
                  to={`/surveys?survey=${campaign._id}`}
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
  handleWindowsView = () => {
    const murmurCampaigns = [];
    const { pullledCampaigns } = this.state;
    if (pullledCampaigns.length !== 0) {
      pullledCampaigns.map((campaign, i) => {
        murmurCampaigns.push(
          <div
            className={`${classes2.window_container} ${
              this.state.active === campaign._id
                ? classes2.window_container_active
                : null
            }`}
            onClick={() => this.toggleSurveyWindow(campaign._id)}
          >
            <div className={classes2.survey_image_container}>
              <img
                src={campaign.artWork_url}
                alt="survey"
                className={classes2.survey_image}
              />
              <h1>{campaign.campaign_name}</h1>
              <span className={classes2.customer_personal_data}>
                by
                <img
                  src={campaign.customer.img}
                  slt="avatar"
                  className={classes.partner_profile_img_smaller}
                />
                {`${campaign.customer.fullName}`}
              </span>
            </div>
            <div className={classes2.surveys_analytics}>
              <span>
                <img src={SurveyEye} alt="eye icon" /> {campaign.views}
              </span>
              <span>
                <img src={SurveyEdit} alt="eye icon" /> {campaign.answers}
              </span>
              <span>
                <img src={SurveyPrice} alt="eye icon" /> {campaign.daily_budget}
              </span>
            </div>
          </div>
        );
      });
    }
    return murmurCampaigns;
  };

  toggleSurveyWindow = (id) => {
    const active = this.state.active;
    let value = id;
    if (active === id) {
      value = "";
    }

    this.setState({
      ...this.state,
      active: value,
    });
  };

  render() {
    let status = [];
    const url = this.props.location.search; //extracting billing id
    const params = url.split("?survey=")[1]; // geting rid of left side
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
        {!this.props.location.search.length > 0 &&
        !this.state.loading &&
        this.props.view.table ? ( //list all campaigns
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
        ) : !this.props.location.search.length > 0 ? (
          <div className={classes2.surveys_windows_container}>
            {this.handleWindowsView()}
          </div>
        ) : (
          <CampaignAnalytics />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(PulledSurveys);

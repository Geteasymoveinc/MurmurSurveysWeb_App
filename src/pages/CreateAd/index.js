import React, { Component } from "react";
import { Button, Badge, Alert } from "reactstrap";

import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import FormData from "form-data";

import Pullcampaigns from "./pullCampign";
import CampaignObjective from "./campaign-objective";
import CampaignDetails from "./campaign-details";
import Audience from "./audience";
import BudgetAndSchedule from "./budget-schedule";
import PlacementType from "./placement-type";
import AdMedia from "./ad-creative";
import VerifyData from "./verify-data";

import classes from "../../assets/css/CreateAd/index.module.css";

import { toggleSideBar } from "../../store/actions";
import HeadSearch from "../../components/CommonForBoth/Headsearch";

class CreateAdDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pulledCampigns: [],
      display_quantity: null,
      modal: false,
      brandAwareness: false,
      reach: false,
      tooltipOpen: false,
      traffic: false,
      budgetValue: null,
      audienceAge: null,
      audienceGender: null,
      adCategory: null,
      scheduleCampaignDate: null,
      createAdStatus: false,
      alertStatus: false,
      speedometerValue: null,
      speedometerMaxValue: 100000,
      modalCreateAdBody: false,
      murmurCampaign: [],
      campaigns: [
        {
          id: "customCheck2",
          campaign_name: "Zoom Product 1",
          budget: "$400",
          delivery_type: "Car-Top",
          CPM: "$10",
          campaignStatus: "success",
          campaignData: "In Review",
          reach: "10000",
          methodIcon: "fa-cc-mastercard",
          paymentMethod: "Mastercard",
          link: "#",
        },
        {
          id: "customCheck2",
          campaign_name: "Easymove",
          budget: "$6000",
          delivery_type: "Car-Top",
          CPM: "$20",
          campaignStatus: "danger",
          campaignData: "Offline",
          reach: "30000",
          methodIcon: "fa-cc-mastercard",
          paymentMethod: "Mastercard",
          link: "#",
        },
      ],
      advertisers: "",
      advertisers_email: sessionStorage.getItem("authUser"),
      campaign_type: "",
      payment: "",
      duration: "",
      area: "",
      campaign_name: "",
      artWork_url: "",
      images: [],
      verify_img: "",
      daily_budget: "",
      ad_schedule_time: "",
    };
    this.selectCampaignObjective = this.selectCampaignObjective.bind(this);
    this.handleCreateDetails = this.handleCreateDetails.bind(this);
    this.handleAudience = this.handleAudience.bind(this);
    this.handleBudgetAndDate = this.handleBudgetAndDate.bind(this);
    this.handleDisplayAmountAndType =
      this.handleDisplayAmountAndType.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.toggleCompleteCreateAd = this.toggleCompleteCreateAd.bind(this);
  }

  componentDidMount() {
    if (!this.props.match.isExact) {
      //if user on create add page and accidentaly refrash page then react will render first step of ad creation to start all over again
      this.toggle();
    }
  }
  toggle = () => {
    this.setState({
      ...this.state,
      modal: true,
      brandAwareness: false,
      reach: false,
      traffic: false,
    });
    this.props.toggleSideBar(false); //geting rid of left navbar for creating ad
    this.props.history.push("/ad-manager/campaign-objective");
  };

  //objectives
  selectCampaignObjective(objective) {
    this.setState({
      ...this.state,
      [objective]: true,
    });
  }

  handleCreateDetails({ campaign_name, adCategory }) {
    this.setState({
      ...this.state,
      adCategory: adCategory,
      campaign_name: campaign_name,
    });
    this.props.history.push("/ad-manager/audience");
  }

  handleCreateAd = (event) => {
    const name = event.target.name;
    if (name === "artWork_url") {
      this.setState({ ...this.state, file: event.target.files[0] });
    } else {
      this.setState({ ...this.state, [name]: event.target.value });
    }
  };

  handleAudience({ age, gender, location, specificAttribute }) {
    this.setState({
      ...this.state,
      audienceAge: age,
      audienceGender: gender,
      area: location,
      attribute: specificAttribute,
    });
    this.props.history.push("/ad-manager/budget-schedule");
  }

  toggleCancelCreateAd = () => {
    this.setState({ ...this.state, createAdStatus: false });
  };

  handleBudgetAndDate({ budgetValue, duration, time }) {
    console.log(duration);
    this.setState({
      ...this.state,
      daily_budget: budgetValue,
      duration: duration[0] + " " + duration[1],
      ad_schedule_time: time[0] + " " + time[1],
    });
    this.props.history.push("/ad-manager/placement-type");
  }

  handleDisplayAmountAndType({ campaign_type, display_quantity }) {
    this.setState({ ...this.state, campaign_type, display_quantity });
    this.props.history.push("/ad-manager/ad-media");
  }
  handleImage({ files, verify_img }) {
    this.setState({
      ...this.state,
      artWork_url: files[0].name,
      images: files,
      verify_img,
    });
    this.props.history.push("/ad-manager/verify-data");
  }

  toggleCompleteCreateAd() {
    const formData = new FormData();
    formData.append("advertisers_email", this.state.advertisers_email);
    formData.append("campaign_type", this.state.adCategory);
    formData.append('ad_type', this.state.campaign_type)
    formData.append("campaign_name", this.state.campaign_name);
    formData.append("ad_schedule", this.state.duration);
    formData.append("area", this.state.area);
    formData.append("daily_budget", this.state.daily_budget);
    formData.append("display_quantity", this.state.display_quantity);

    formData.append("audienceAge", this.state.audienceAge);
    formData.append("audienceGender", this.state.audienceGender);
    formData.append("ad_schedule_time", this.state.ad_schedule_time);
    formData.append("artWork_url", this.state.artWork_url);
    for (const image of this.state.images) {
      formData.append("images", image);
    }
    axios({
      url: "https://backendapp.murmurcars.com/api/v1/campaigns/create",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        this.setState({ ...this.state, alertStatus: true, modal: false });
        this.props.history.replace("/ad-manager");
        this.props.history.go("/ad-manager");
        this.setState({ ...this.state, alertStatus: false });
        
      })
      .catch((err) => {});
  }

  handleCampaigns = () => {
    let murmurCampaigns = [];
    if (this.state.murmurCampaign.length !== 0) {
      {
        this.state.campaigns.map((campaign, key) =>
          murmurCampaigns.push(
            <tr key={"_tr_" + key}>
              <td>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={campaign.campaign_name}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={campaign.campaign_name}
                  >
                    &nbsp;
                  </label>
                </div>
              </td>
              <td>
                <Link to="#" className="text-body font-weight-bold">
                  {campaign.campaign_name}
                </Link>
              </td>
              <td>{campaign.delivery_type}</td>
              <td>{campaign.budget}</td>
              <td>{campaign.CPM}</td>
              <td>
                <Badge
                  className={
                    "font-size-12 badge-soft-" + campaign.campaignStatus
                  }
                  color={campaign.campaignStatus}
                  pill
                >
                  {campaign.campaignData}
                </Badge>
              </td>
              <td>{campaign.reach}</td>
              <td>
                <Button
                  type="button"
                  color="primary"
                  size="sm"
                  className="btn-rounded waves-effect waves-light"
                  onClick={this.toggle}
                >
                  View Details
                </Button>
              </td>
            </tr>
          )
        );
      }
    }
    return murmurCampaigns;
  };

  render() {
    const { modal } = this.state;
    return (
      <React.Fragment>
        {!this.state.modal && ( //page where user see all its campaigns and can create new one
          <div className={classes.dash_right}>
            {this.state.alertStatus ? (
              <Alert color="success">
                We received your Ad Request and Reviewing it. Usually it takes
                15 min for approval.
                <a href="#" className="alert-link"></a>
                Have questions? Send us message in Drift.
              </Alert>
            ) : null}

            <HeadSearch />

            {this.props.match.isExact &&
              !this.props.location.search && ( //page where user see all its campaigns
                <div className={classes.create_ads}>
                  <div className={classes.ads_section}>
                    <div className={classes.cads_head}>
                      <div className={classes.cads_head_left}>
                        <h4 className={classes.cads_h4}>Your Current Ads</h4>
                        <p className={classes.cads_p}>
                          Here you can view the status of your ads with all the
                          necessary details
                        </p>
                      </div>
                      <button
                        type="button"
                        className={classes.create_ads_btn}
                        onClick={this.toggle}
                      >
                        Create Ad
                        <svg
                          width="20"
                          height="20"
                          className={classes.create_ads_img}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 10H15"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 15V5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <Pullcampaigns data={this.state} />
                  </div>
                </div>
              )}

            {this.props.match.isExact &&
              this.props.location.search.length > 0 && ( //details
                <Pullcampaigns data={this.state} />
              )}
          </div>
        )}
        {modal && ( //nesting routes (creat new ad campaign)
          <Switch>
            <Route path="/ad-manager/campaign-objective">
              <CampaignObjective
                toggleObjective={this.selectCampaignObjective}
              />
            </Route>
            <Route path="/ad-manager/campaign-details">
              <CampaignDetails createAdDetails={this.handleCreateDetails} />
            </Route>
            <Route path="/ad-manager/audience">
              <Audience createAudience={this.handleAudience} />
            </Route>
            <Route path="/ad-manager/budget-schedule">
              <BudgetAndSchedule
                createBudgetAndDuration={this.handleBudgetAndDate}
              />
            </Route>
            <Route path="/ad-manager/placement-type">
              <PlacementType
                createDisplayAmountAndCampaignType={
                  this.handleDisplayAmountAndType
                }
              />
            </Route>
            <Route path="/ad-manager/ad-media">
              <AdMedia createAdImage={this.handleImage} />
            </Route>
            <Route path="/ad-manager/verify-data">
              <VerifyData
                data={[
                  {
                    objective: this.state.brandAwareness
                      ? "Brand awareness"
                      : this.state.reach
                      ? "Reach"
                      : "Traffic",
                    age: this.state.audienceAge,
                    gender: this.state.audienceGender,
                    location: this.state.area,
                    name: this.state.campaign_name,
                    type: this.state.campaign_type,
                    attribute: this.state.attribute,
                    displayNumber: this.state.display_quantity,
                    category: this.state.adCategory,
                    budget: this.state.daily_budget,
                    artWork: this.state.verify_img,
                    duration: this.state.duration,
                  },
                ]}
                sendToBackEnd={this.toggleCompleteCreateAd}
                toggleBackToAdManager={this.toggle}
              />
            </Route>
          </Switch>
        )}
      </React.Fragment>
    );
  }
}



export default withRouter(
  connect(null, { toggleSideBar })(CreateAdDashboard)
);

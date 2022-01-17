import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
  Badge,
  CardText,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Fade,
  FormText,
  Tooltip,
  Alert,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";

import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import FormData from "form-data";

import Pullcampaigns, { getCampaigns } from "./pullCampign";
import CampaignObjective from "./campaign-objective";
import CampaignDetails from "./campaign-details";
import Audience from "./audience";
import BudgetAndSchedule from "./budget-schedule";
import PlacementType from "./placement-type";
import AdMedia from "./ad-creative";
import VerifyData from "./verify-data";

//import CreateAddForm from "./createAdTabs";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";

import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import classes from "../../assets/css/CreateAd/index.module.css";
import classes2 from "../../assets/css/CreateAd/ads-details/index.module.css";

import { addPackage, changeSideBar } from "../../store/actions";

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
      file: {},
      daily_budget: "",
      ad_schedule_time: "",
    };
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.handleCreateDetails = this.handleCreateDetails.bind(this);
    this.handleAudience = this.handleAudience.bind(this);
    this.handleBudgetAndDate = this.handleBudgetAndDate.bind(this);
    this.handleDisplayAmountAndType =
      this.handleDisplayAmountAndType.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.toggleCompleteCreateAd = this.toggleCompleteCreateAd.bind(this);
  }

  componentDidMount() {
    //this.setState({ modal: true });
    //this.toggle();
  }
  toggle = () => {
    const modal = !this.state.modal;

    this.setState({
      ...this.state,
      modal,
      brandAwareness: false,
      reach: false,
      traffic: false,
    });
    this.props.changeSideBar(false);
    this.props.history.push("/ad-manager/campaign-objective");
  };

  //Toggle Tooltip
  toggleTooltip(id) {
    if (id === 1) {
      this.setState({
        ...this.state,
        brandAwareness: true,
        reach: false,
        traffic: false,
      });
    }
    if (id === 2) {
      this.setState({
        ...this.state,
        brandAwareness: false,
        reach: true,
        traffic: false,
      });
    }
    if (id === 3) {
      this.setState({
        ...this.state,
        brandAwareness: false,
        reach: false,
        traffic: true,
      });
    }
  }

  handleInputDisplayChange = (e) => {
    const displayQuantity = e.target.value;
    this.setState({ ...this.state, display_quantity: displayQuantity });

    if (displayQuantity === "10") {
      this.setState({ speedometerValue: 150000, speedometerMaxValue: 250000 });
    }
    if (displayQuantity === "5") {
      this.setState({ speedometerValue: 450000, speedometerMaxValue: 650000 });
    }
    if (displayQuantity === "25") {
      this.setState({
        speedometerValue: 1500000,
        speedometerMaxValue: 2500000,
      });
    }
    if (displayQuantity === "50") {
      this.setState({
        speedometerValue: 3000000,
        speedometerMaxValue: 4500000,
      });
    }
    if (displayQuantity === "85") {
      this.setState({
        speedometerValue: 8300000,
        speedometerMaxValue: 11500000,
      });
    }
    if (displayQuantity === "150") {
      this.setState({
        speedometerValue: 12500000,
        speedometerMaxValue: 2250000,
      });
    }
    if (displayQuantity === "350") {
      this.setState({
        speedometerValue: 11500000,
        speedometerMaxValue: 4250000,
      });
    }
  };

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

  handleAudience({ audienceAge, audienceGender, area, specificAttribute }) {
    this.setState({
      ...this.state,
      audienceAge,
      audienceGender,
      area,
      attribute: specificAttribute,
    });
    this.props.history.push("/ad-manager/budget-schedule");
  }

  toggleCreateAd = () => {
    const createAdStatus = !this.state.createAdStatus;
    this.setState({
      ...this.state,
      createAdStatus,
      modal: false,
    });
  };

  toggleCancelCreateAd = () => {
    this.setState({ ...this.state, createAdStatus: false });
  };

  handleBudgetAndDate({ budgetValue, duration, time }) {
    console.log(duration);
    this.setState({
      ...this.state,
      daily_budget: budgetValue,
      duration: duration[0] + " " + duration[1],
      ad_schedule_time: time[0] + ' ' + time[1]
    });
    this.props.history.push("/ad-manager/placement-type");
  }

  handleDisplayAmountAndType({ campaign_type, display_quantity }) {
    this.setState({ ...this.state, campaign_type, display_quantity });
    this.props.history.push("/ad-manager/ad-creative");
  }
  handleImage({ img, file }) {
    console.log(file)
    this.setState({ ...this.state, file, artWork_url: img });
    this.props.history.push("/ad-manager/verify-data");
  }

  toggleCompleteCreateAd() {
    console.log(this.state.artWork_url);
    //let formdata = new FormData();
    const formData = {};
    //formData["images"] = this.state.file[0].originFileObj;
    formData["advertisers_email"] = this.state.advertisers_email;
    formData["campaign_type"] = this.state.adCategory;
    formData["campaign_name"] = this.state.campaign_name;
    formData["ad_schedule"] = this.state.duration;
    formData["area"] = this.state.area;
    formData["daily_budget"] = this.state.daily_budget;
    formData["display_quantity"] = this.state.display_quantity;
    formData["artWork_url"] =    this.state.artWork_url
    formData["audienceAge"] = this.state.audienceAge;
    formData["audienceGender"] = this.state.audienceGender;
    formData["ad_schedule_time"] = this.state.ad_schedule_time;

    /*formdata.append('campaign_name', this.state.campaign_name)
    formdata.append('advertisers_email', this.state.advertisers_email)
    formdata.append('ad_schedule', this.state.ad_schedule)
    formdata.append('audienceAge', this.state.audienceAge)
    formdata.append('ad_schedule_time', this.state.ad_schedule_time)
    formdata.append('daily_budget', this.state.daily_budget)
    formdata.append('ad_schedule_time', this.state.ad_schedule_time)
    formdata.append('area', this.state.area)
    formdata.append('audienceGender', this.state.audienceGender)
    formdata.append('artWork_url',  "/advertisers/media/uploads/" + this.state.artWork_url)
    formdata.append('audienceGender', this.state.audienceGender)*/


  
    axios({
      url: "https://backendapp.murmurcars.com/api/v1/campaigns/create",
      method: "POST",
      data: formData,
    })
      .then()
      .catch();
    this.setState({ ...this.state, createAdStatus: false, alertStatus: true });
    setTimeout(() => {
      this.setState({ ...this.state, alertStatus: false });
      this.props.history.replace("/ad-manager");
      this.props.history.go("/ad-manager");
    }, 3000);
  }

  handleOnChange = (event) => {
    this.setState({ ...this.state, campaign_type: event.target.name });
  };

  handleDateChange = (date, dateString) => {
    console.log("Date", date.dateString);
    this.setState({
      ...this.state,
      startCampaignDate: date.dateString[0],
      endCampaignDate: date.dateString[1],
      scheduleCampaignDate: date.dateString[0] + " " + date.dateString[1],
    });
    console.log("this is schedule state", this.state.scheduleCampaignDate);
  };

  toggleDeleteCampaign = () => {};

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
              <td>
                {/* <i
              className={
                "fab " + transaction.methodIcon + " mr-1"
              }
            ></i>{" "} */}
                {campaign.reach}
              </td>
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
    console.log(this.state, this.props);
    return (
      <React.Fragment>
        {!this.state.modal && (
          <div className={classes.dash_right}>
            {this.state.alertStatus ? (
              <Alert color="success">
                We received your Ad Request and Reviewing it. Usually it takes
                15 min for approval.
                <a href="#" className="alert-link"></a>
                Have questions? Send us message in Drift.
              </Alert>
            ) : null}

            {/*<!-- header search block -->*/}

            <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Ads manager</h1>

              <form>
                <div
                  className={`${classes.dash_relative} ${classes.search_box}`}
                >
                  <input type="text" placeholder="Search" />
                  <div className={classes.search_box_flex}>
                    <button type="submit" className={classes.search_icon}>
                      <img
                        src={SearchNormal}
                        alt=""
                        className={classes.search_img}
                      />
                    </button>
                    <button type="button" className={classes.search_maximize}>
                      <img
                        src={SearchMaximize}
                        alt=""
                        className={classes.maximize_img}
                      />
                    </button>

                    <ProfileMenu scope={"global"} />
                  </div>
                </div>
              </form>
            </div>
            {/*add-manager*/}
            {this.props.match.isExact && (
              <div className={classes.create_ads}>
                <div className={classes.ads_section}>
                  <div className={classes.cads_head}>
                    <div className={classes.cads_head_left}>
                      <h4 className={classes.cads_h4}>Current Ads</h4>
                      <p className={classes.cads_p}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Tortor lacinia vel pulvinar pellentesque. Dolor.
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
            {/*add-details STARTING*/}
            {!this.props.match.isExact && <Pullcampaigns data={this.state} />}
            {/*add-details ENDING*/}
            {/* Create Ad Part begins */}
            {/*} {this.state.createAdStatus ? (
              <div className="page-content">
                <Row xs="2" sm="4" md="2">
                  <Col>
                    <Button
                      outline
                      color="danger"
                      onClick={this.toggleCancelCreateAd}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
                <br></br>
                <Card body>
                  <CardTitle tag="h5">Specify your Ad</CardTitle>
                  <CardText>
                    We do`t advertice tabaco, adult and alcohol products &
                    services
                  </CardText>
                  <Container fluid>
                    <CreateAddForm
                      brandAwareness={this.state.brandAwareness}
                      reach={this.state.reach}
                      traffic={this.state.traffic}
                    />
                  </Container>
                </Card>
              </div>
            ) : null}*/}
            {/* Create Ad Part Ends*/}
            {/*<Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>
                Choose a Campaign Objective
              </ModalHeader>

              <ModalBody>
                <Container className="themed-container" fluid={true}>
                  <Row xs="1">
                    <Col>
                      <Form>
                        <FormGroup
                          check
                          onChange={(event) => this.handleOnChange(event)}
                        >
                          <Fade in={true} tag="h5" className="mt-3">
                            <Label check>
                              <Input type="radio" name="Brand Awareness" />{" "}
                              Brand awareness{" "}
                              <i
                                className="bx bxs-error-circle"
                                id="BrandAwareness"
                              ></i>
                              <Tooltip
                                id="BrandAwareness"
                                placement="right"
                                isOpen={this.state.brandAwareness}
                                target="BrandAwareness"
                                toggle={() => this.toggleTooltip(1)}
                              >
                                Show your ads to people who most likely to
                                remember them
                              </Tooltip>
                            </Label>
                          </Fade>
                          <Fade in={true} tag="h5" className="mt-3">
                            <Label check>
                              <Input type="radio" name="Reach" /> Reach
                              <i className="bx bxs-error-circle" id="Reach"></i>
                            </Label>
                            <Tooltip
                              id="Reach"
                              placement="right"
                              isOpen={this.state.reach}
                              target="Reach"
                              toggle={() => this.toggleTooltip(2)}
                            >
                              Show your ads to the maximum number of people
                            </Tooltip>
                          </Fade>{" "}
                          <Fade in={true} tag="h5" className="mt-3">
                            <Label check>
                              <Input type="radio" name="Traffic" /> Traffic
                              <i
                                className="bx bxs-error-circle"
                                id="Traffic"
                              ></i>
                              <Tooltip
                                id="Traffic"
                                placement="right"
                                isOpen={this.state.traffic}
                                target="Traffic"
                                toggle={() => this.toggleTooltip(3)}
                              >
                                Send people to a destination, like webpage,
                                event, etc
                              </Tooltip>
                            </Label>
                          </Fade>
                        </FormGroup>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.toggleCreateAd}>
                  Next
                </Button>
              </ModalFooter>
            </Modal>
            */}
            <Modal
              isOpen={this.state.modalCreateAdBody}
              toggle={this.toggle}
            ></Modal>
          </div>
        )}

        {this.state.modal && (
          <Switch>
            <Route path="/ad-manager/campaign-objective">
              <CampaignObjective toggleObjective={this.toggleTooltip} />
            </Route>
            <Route path="/ad-manager/campaign-details">
              <CampaignDetails
                createAdDetails={this.handleCreateDetails}
                adCategory={this.state.adCategory}
                campaign_name={this.state.campaign_name}
              />
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
            <Route path="/ad-manager/ad-creative">
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
                    artWork: this.state.artWork_url,
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

const mapStatetoProps = (state) => {
  console.log(state);
  const email = state.Login;
  return email;
};

export default withRouter(
  connect(mapStatetoProps, { changeSideBar })(CreateAdDashboard)
);

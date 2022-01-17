import React, { Component } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Container,
  Row,
  Col,
  Alert,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import classnames from "classnames";
import {
  EditFilled,
  CopyOutlined,
  CheckCircleTwoTone,
  TeamOutlined,
  AimOutlined,
  TableOutlined,
  DollarCircleOutlined,
  CarOutlined,
  InboxOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";

import { Divider, DatePicker, Space, Upload } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import FormData from "form-data";

import moment from "moment";
import SlackSendCustomerCreatedAdCampaign from "./../../helpers/slackSendCustomerCreatesAdCampaign";

const { Dragger } = Upload;

const propsD = {
  name: "file",
  multiple: true,
  //action: "https://backendapp.murmurcars.com/api/v1/campaigns/create",
  // onChange(info) {
  //   console.log({ info });
  //   const { status } = info.file;
  //   if (status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === "error") {
  //     //message.error(`${info.file.name} file upload failed.`);
  //   }
  //},
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

class CreateAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandAwareness: this.props.brandAwareness,
      traffic: this.props.traffic,
      reach: this.props.reach,
      advertisers: "",
      advertisers_email: sessionStorage.getItem("authUser"),
      campaign_type: "Consumer Services",
      duration: "",
      area: "",
      ad_type: "",
      campaign_name: "",
      artWork_url: "",
      adFiles: null,
      daily_budget: "",
      activeTab: "1",
      display_quantity: null,
      completedCampaignDetails: false,
      audienceAge: null,
      audienceGender: null,
      area: null,
      audienceTags: null,
      ad_schedule: null,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  validateForms = () => {
    if (this.state.campaign_name === "" || this.state.campaign_type === "") {
      alert("Campaign details are empty");
    } else return "Filled";
    if (
      this.state.audienceAge === "" ||
      this.state.audienceGender === "" ||
      this.state.area === ""
    ) {
      alert("Audience details are empty");
    } else return "Filled";
    if (this.state.daily_budget === "" || this.state.ad_schedule === "") {
      alert("Budget & Schedule details are empty");
    } else return "Filled";
    if (this.state.ad_type === "" || this.state.display_quantity === "") {
      alert("Placement type details are empty");
    } else return "Filled";
    if (this.state.adFiles === "") {
      alert("Ad Creative details are empty");
    } else return "Filled";
  };

  handleCreateAd = (event) => {
    console.log(event.target.name, event.target.value);
    const name = event.target.name;
    if (name === "artWork_url") {
      this.setState({ ...this.state, file: event.target.files[0] });
    } else {
      this.setState({ ...this.state, [name]: event.target.value });
    }
    console.log(this.state);
  };

  handleDateChange = (date, dateString) => {
    let campaign_date = date.dateString[0] + " " + date.dateString[1];

    console.log("this is schedule state", campaign_date);
    this.setState({
      ...this.state,
      ad_schedule: campaign_date,
      duration: dateString,
    });
    console.log("This is date", this.state);
  };

  handleFileChange = (info) => {
    let attached_ad_files = [];
    info.fileList.map((ad) => {
      attached_ad_files.push(ad);
    });
    this.setState({ ...this.state, adFiles: attached_ad_files });
  };

  toggleCompleteCreateAd = (event) => {
    event.preventDefault();
    console.log(this.state);
    let formdata = new FormData();
    const check = this.validateForms();
    // if (this.state.adFiles === null) {
    //   alert("Aupload Ad Creative");
    // }

    formdata.append("images", this.state.adFiles[0].originFileObj);
    formdata.append("advertisers_email", this.state.advertisers_email);
    formdata.append("campaign_type", this.state.campaign_type);
    formdata.append("campaign_name", this.state.campaign_name);
    formdata.append("ad_type", this.state.ad_type);
    formdata.append("ad_schedule", this.state.ad_schedule);
    formdata.append("area", this.state.area);
    formdata.append("audienceGender", this.state.audienceGender);
    formdata.append("audienceAge", this.state.audienceAge);
    formdata.append("audienceTags", this.state.audienceTags);
    formdata.append("daily_budget", this.state.daily_budget);
    formdata.append("display_quantity", this.state.display_quantity);
    this.state.adFiles.map((ad) => {
      console.log("This is addd", ad.name);
      formdata.append("artWork_url", "/advertisers/media/uploads/" + ad.name);
    });
    console.log({ formdata });
    SlackSendCustomerCreatedAdCampaign(this.state);
    axios({
      url: "https://backendapp.murmurcars.com/api/v1/campaigns/create",
      method: "POST",
      data: formdata,
    })
      .then((response) => {
        console.log("API", response);
        window.location.reload();

        alert(response.data.message);
      })
      .catch((error) => console.log({ error }));

    console.log("this is formDate", this.state);

    this.setState({ ...this.state, createAdStatus: false, alertStatus: true });
    setTimeout(() => {
      this.setState({ ...this.state, alertStatus: false });
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Breadcrumbs
            title="Create Campaign"
            breadcrumbItem="Create Campaign"
          />
          <Container className="themed-container" fluid="sm">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <Row>
                      <Col sm="2">
                        {this.state.campaign_type &&
                        this.state.campaign_name ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <CheckCircleTwoTone twoToneColor="#cf2149" />
                        )}
                      </Col>
                      <Col>Campaign Details</Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <Row>
                      <Col sm="2">
                        {this.state.audienceAge &&
                        this.state.audienceGender &&
                        this.state.area &&
                        this.state.audienceTags ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <CheckCircleTwoTone twoToneColor="#cf2149" />
                        )}
                      </Col>
                      <div style={{ width: 15 }}></div>
                      <Col> Audience </Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <Row>
                      <Col sm="2">
                        {this.state.daily_budget ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <CheckCircleTwoTone twoToneColor="#cf2149" />
                        )}
                      </Col>
                      <Col> Budget & Schedule</Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "4",
                    })}
                    onClick={() => {
                      this.toggle("4");
                    }}
                  >
                    <Row>
                      <Col sm="2">
                        {this.state.ad_type ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <CheckCircleTwoTone twoToneColor="#cf2149" />
                        )}
                      </Col>
                      <Col> Placement Type</Col>
                    </Row>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "5",
                    })}
                    onClick={() => {
                      this.toggle("5");
                    }}
                  >
                    <Row>
                      <Col sm="2">
                        {this.state.adFiles ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          <CheckCircleTwoTone twoToneColor="#cf2149" />
                        )}
                      </Col>
                      <Col> Ad Creative</Col>
                    </Row>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col xs="6" sm="5">
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Specify Campaign Name</CardTitle>

                        <CardText>
                          We do`t advertice tabaco, adult and alcohol products &
                          services
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label check>
                                <Col sm={10}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <EditFilled twoToneColor="#7369bf" />
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                      value={this.state.campaign_name}
                                      type="text"
                                      name="campaign_name"
                                      id="campaignName"
                                      onChange={(event) =>
                                        this.handleCreateAd(event)
                                      }
                                      size="27"
                                      placeholder="For Example: Ad_1"
                                    />
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Ad Categories</CardTitle>

                        <CardText>
                          You're required to declare if your ads are related to
                          credit, employment or housing opportunities or related
                          to social issues, elections or politics.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label check>
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <CopyOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        value={this.state.campaign_type}
                                        name="campaign_type"
                                        id="campaign_type"
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                        type="select"
                                      >
                                        <option>Consumer Services</option>
                                        <option>Consumer Products</option>
                                        <option>Business Services</option>
                                        <option>Business Products</option>
                                        <option>Real-Estate</option>
                                        <option>Insurance</option>
                                        <option>Mortgage</option>
                                        <option>Professional Services</option>
                                        <option>Home Services</option>
                                        <option>Automotive</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <div style={{ height: 20 }}></div>
                      <Button
                        outline
                        color="success"
                        size="lg"
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        Continue
                      </Button>
                    </Col>
                    {/* <Col xs="6" sm="5">
            <Card>
              <CardBody>
                <CardTitle tag="h5"></CardTitle>
                <CardSubtitle
                  tag="h6"
                  className="mb-2 text-muted"
                ></CardSubtitle>
                <CardText></CardText>
              </CardBody>
            </Card>
          </Col> */}
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col xs="6" sm="5">
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Audience Age</CardTitle>

                        <CardText>
                          Define the age of who you want to see your ads.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label for="exampleEmail">
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <TeamOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        type="select"
                                        value={this.state.audienceAge}
                                        name="audienceAge"
                                        id="audienceAge"
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                      >
                                        <option> 18-25 </option>
                                        <option>26-35</option>
                                        <option>36-45</option>
                                        <option>46-55</option>
                                        <option>56-65</option>
                                        <option>66+</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Audience Gender</CardTitle>

                        <CardText>
                          Define the gender of who you want to see your ads.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label check>
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <CopyOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        type="select"
                                        name="audienceGender"
                                        id="audienceGender"
                                        value={this.state.audienceGender}
                                        name="audienceGender"
                                        id="audienceGender"
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                      >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Both</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">
                          Audience Specific attibutes{" "}
                        </CardTitle>

                        <CardText>
                          Define the some tags/attibution which specific to your
                          audience.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label check>
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <SnippetsOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        value={this.state.audienceTags}
                                        type="text"
                                        name="audienceTags"
                                        id="audienceTags"
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                        size="27"
                                        placeholder="For Example: audience wearing red t-shirt, hats, glasses and etc"
                                      />
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Location</CardTitle>

                        <CardText>
                          Define the location where you want to show your ads.
                          Add ZipCodes.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label check>
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <AimOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        type="number"
                                        value={this.state.area}
                                        name="area"
                                        id="area"
                                        min={5}
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                      ></Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>

                      <div style={{ height: 20 }}></div>
                      <Row>
                        <Col>
                          <Button
                            outline
                            color="danger"
                            size="lg"
                            onClick={() => {
                              this.toggle("1");
                            }}
                          >
                            Back
                          </Button>
                        </Col>
                        <div style={{ width: 200 }}></div>
                        <Col>
                          <Button
                            outline
                            color="success"
                            size="lg"
                            onClick={() => {
                              this.toggle("3");
                            }}
                          >
                            Continue
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col xs="6" sm="5">
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Daily Budget</CardTitle>

                        <CardText>
                          How much would you like your maximum daily budget to
                          be?
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label for="exampleEmail">
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <DollarCircleOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        type="number"
                                        value={this.state.daily_budget}
                                        name="daily_budget"
                                        id="daily_budget"
                                        min={5}
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                      ></Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Campign Duration</CardTitle>

                        <CardText>
                          Define how long you want to run your ad campaign.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label check>
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <TableOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Space direction="vertical">
                                        <DatePicker.RangePicker
                                          defaultValue={this.state.duration}
                                          name="duration"
                                          id="duration"
                                          onChange={(date, dateString) =>
                                            this.handleDateChange({
                                              date,
                                              dateString,
                                            })
                                          }
                                          picker="date"
                                        />
                                      </Space>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>

                      <div style={{ height: 20 }}></div>
                      <Row>
                        <Col>
                          <Button
                            outline
                            color="danger"
                            size="lg"
                            onClick={() => {
                              this.toggle("2");
                            }}
                          >
                            Back
                          </Button>
                        </Col>
                        <div style={{ width: 200 }}></div>
                        <Col>
                          <Button
                            outline
                            color="success"
                            size="lg"
                            onClick={() => {
                              console.log(this.state);
                              this.toggle("4");
                            }}
                          >
                            Continue
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col xs="6" sm="5">
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">
                          Choose the type to show your Ad.
                        </CardTitle>

                        <CardText>
                          How much would you like your maximum daily budget to
                          be?
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label for="exampleEmail">
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <CarOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        type="select"
                                        name="ad_type"
                                        id="ad_type"
                                        //value={this.state.campaign}
                                        value={this.state.ad_type}
                                        min={5}
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                      >
                                        <option>Outdoor</option>
                                        <option>Swarn</option>
                                        <option>Book</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">
                          Choose the number of displays.
                        </CardTitle>

                        <CardText>
                          How many displays will show your ads?
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label for="exampleEmail">
                                <Col sm={30}>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <CarOutlined twoToneColor="#7369bf" />
                                      </InputGroupText>

                                      <Input
                                        type="select"
                                        name="display_quantity"
                                        id="campaignDisplayQuantity"
                                        value={this.state.display_quantity}
                                        //onChange={this.handleInputDisplayChange}
                                        onChange={(event) =>
                                          this.handleCreateAd(event)
                                        }
                                      >
                                        <option>5</option>
                                        <option>10</option>
                                        <option>25</option>
                                        <option>50</option>
                                        <option>85</option>
                                        <option>150</option>
                                        <option>350</option>
                                      </Input>
                                    </InputGroupAddon>
                                  </InputGroup>
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>

                      <div style={{ height: 20 }}></div>
                      <Row>
                        <Col>
                          <Button
                            outline
                            color="danger"
                            size="lg"
                            onClick={() => {
                              this.toggle("3");
                            }}
                          >
                            Back
                          </Button>
                        </Col>
                        <div style={{ width: 200 }}></div>
                        <Col>
                          <Button
                            outline
                            color="success"
                            size="lg"
                            onClick={() => {
                              this.toggle("5");
                            }}
                          >
                            Continue
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Col xs="6" sm="5">
                      <Card body>
                        <div style={{ height: 30 }}></div>
                        <CardTitle tag="h5">Add Media</CardTitle>

                        <CardText>
                          Select the media and upload it. Media can be image,
                          animation or video. dimensions should to be 196X64.
                        </CardText>
                        <Divider />

                        <CardBody>
                          <Form>
                            <FormGroup check>
                              <Label for="exampleEmail">
                                <Col sm={30}>
                                  <Dragger
                                    {...propsD}
                                    openFileDialogOnClick={true}
                                    onChange={(info) =>
                                      this.handleFileChange(info)
                                    }
                                  >
                                    <p className="ant-upload-drag-icon">
                                      <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                      Click or drag file to this area to upload
                                    </p>
                                    <p className="ant-upload-hint">
                                      Support for a single or bulk upload.
                                      Strictly prohibit from uploading company
                                      data or other band files
                                    </p>
                                  </Dragger>
                                  ,
                                </Col>
                              </Label>
                            </FormGroup>
                          </Form>
                        </CardBody>
                      </Card>

                      <div style={{ height: 20 }}></div>
                      <Row>
                        <Col>
                          <Button
                            outline
                            color="danger"
                            size="lg"
                            onClick={() => {
                              this.toggle("4");
                            }}
                          >
                            Back
                          </Button>
                        </Col>
                        <div style={{ width: 200 }}></div>
                        <Col>
                          <Button
                            outline
                            color="success"
                            size="lg"
                            onClick={this.toggleCompleteCreateAd}
                          >
                            Publish
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  console.log(state);
  console.log("State Login", state.Login);
  const email = state.Login;
  return email;
};

export default withRouter(connect(mapStatetoProps)(CreateAddForm));

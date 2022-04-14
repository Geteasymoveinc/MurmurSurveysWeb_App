import React from "react";

import classes from "../../assets/css/CreateAd/campaign-details/index.module.css";
import LogoCreate from "../../assets/css/CreateAd/logo-create.png";
import Copyright from "../../assets/css/CreateAd/copyright.svg";
import Check from "../../assets/css/CreateAd/check.svg";
import InfoCircle from "../../assets/css/CreateAd/info-circle.svg";
import Text from "../../assets/css/CreateAd/text.svg";
import TextError from "../../assets/css/CreateAd/text-error.svg";
import ArrowDown from "../../assets/css/CreateAd/arrow-down.svg";
import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";

import { changeSideBar } from "../../store/actions";
import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

class CampaignDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: {
        campaign_name: null,
        adCategory: "Consumer Services",
      },
      error: { campaign_name: false },
    };
    this.submit = this.submit.bind(this);
    this.canselNewCampaign = this.canselNewCampaign.bind(this);
  }

  submit(event) {
    event.preventDefault();
    let hasNull = false;
    const { createAdDetails } = this.props;
    const { error } = this.state;
    const { campaign } = this.state;
    const states = Object.keys(campaign);
    console.log(states);
    for (let i = 0; i < states.length; i++) {
      if (
        this.state.campaign[states[i]] === null ||
        !this.state.campaign[states[i]].length
      ) {
        error[states[i]] = true;
        console.log(error);
        this.setState({ campaign, error });
        hasNull = true;
      }
    }

    if (!hasNull) {
      createAdDetails(this.state.campaign);
    }
  }
  handleChange = (event, name) => {
    const value = event.target.value;
    const { campaign } = this.state;
    const { error } = this.state;
    this.setState({
      ...this.state,
      campaign: { ...campaign, [name]: value },
      error: {
        ...error,
        [name]: false,
      },
    });
  };
  canselNewCampaign() {
    this.props.changeSideBar(true);
    this.props.history.replace("/ad-manager");
    this.props.history.go("/ad-manager");
  }

  componentDidMount() {
    //this.props.apiError("");

    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }
  render() {
    console.log(this.state);
    const { error } = this.state;
    return (
      <React.Fragment>
        <header className={classes.header}>
          <div
            className={`${classes.mur_contain} ${classes.create_top_cancel}`}
          >
            <a href="#">
              <img src={LogoCreate} alt="" />
            </a>
            <button
              type="button"
              className={classes.create_cancel_btn}
              onClick={this.canselNewCampaign}
            >
              Cancel
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4142 11.9998L17.7072 7.70676C18.0982 7.31576 18.0982 6.68376 17.7072 6.29276C17.3162 5.90176 16.6842 5.90176 16.2933 6.29276L12.0002 10.5858L7.70725 6.29276C7.31625 5.90176 6.68425 5.90176 6.29325 6.29276C5.90225 6.68376 5.90225 7.31576 6.29325 7.70676L10.5862 11.9998L6.29325 16.2928C5.90225 16.6838 5.90225 17.3158 6.29325 17.7068C6.48825 17.9018 6.74425 17.9998 7.00025 17.9998C7.25625 17.9998 7.51225 17.9018 7.70725 17.7068L12.0002 13.4138L16.2933 17.7068C16.4882 17.9018 16.7443 17.9998 17.0002 17.9998C17.2562 17.9998 17.5122 17.9018 17.7072 17.7068C18.0982 17.3158 18.0982 16.6838 17.7072 16.2928L13.4142 11.9998Z"
                  fill="#192038"
                />
              </svg>
            </button>
          </div>
        </header>
        <section className={classes.mur_contain}>
          <div className={classes.create_steps}>
            <div className={classes.create_navbar}>
              <ul className={classes.create_nav_ul}>
                <li className={`${classes.nav_ul_item} ${classes.passed_step}`}>
                  <a href="#" className={classes.nav_item_name}>
                    Campaing Objective
                  </a>
                  <div className={classes.step_number_cover}>
                    <div className={classes.number_dot}>
                      <span className={classes.step_number}>1</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes.passed_check}
                      />
                    </div>
                    <div className={classes.step_number_active}>
                      <span className={classes.step_number}>1</span>
                    </div>
                  </div>
                </li>
                <li className={`${classes.nav_ul_item} ${classes.active}`}>
                  <a href="#" className={classes.nav_item_name}>
                    Campaing Details
                  </a>
                  <div className={classes.step_number_cover}>
                    <div className={classes.number_dot}>
                      <span className={classes.step_number}>2</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes.passed_check}
                      />
                    </div>
                    <div className={classes.step_number_active}>
                      <span className={classes.step_number}>2</span>
                    </div>
                  </div>
                </li>
                <li className={classes.nav_ul_item}>
                  <a href="#" className={classes.nav_item_name}>
                    Audience
                  </a>
                  <div className={classes.step_number_cover}>
                    <div className={classes.number_dot}>
                      <span className={classes.step_number}>3</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes.passed_check}
                      />
                    </div>
                    <div className={classes.step_number_active}>
                      <span className={classes.step_number}>3</span>
                    </div>
                  </div>
                </li>
                <li className={classes.nav_ul_item}>
                  <a href="#" className={classes.nav_item_name}>
                    Budget & Schedule
                  </a>
                  <div className={classes.step_number_cover}>
                    <div className={classes.number_dot}>
                      <span className={classes.step_number}>4</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes.passed_check}
                      />
                    </div>
                    <div className={classes.step_number_active}>
                      <span className={classes.step_number}>4</span>
                    </div>
                  </div>
                </li>
                <li className={classes.nav_ul_item}>
                  <a href="#" className={classes.nav_item_name}>
                    Placement Type
                  </a>
                  <div className={classes.step_number_cover}>
                    <div className={classes.number_dot}>
                      <span className={classes.step_number}>5</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes.passed_check}
                      />
                    </div>
                    <div className={classes.step_number_active}>
                      <span className={classes.step_number}>5</span>
                    </div>
                  </div>
                </li>
                <li className={classes.nav_ul_item}>
                  <a href="#" className={classes.nav_item_name}>
                    Ad creative
                  </a>
                  <div className={classes.step_number_cover}>
                    <div className={classes.number_dot}>
                      <span className={classes.step_number}>6</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes.passed_check}
                      />
                    </div>
                    <div className={classes.step_number_active}>
                      <span className={classes.step_number}>6</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={classes.create_details}>
              <div className={classes.create_step_1}>
                <h4 className={classes.create_step_h4}>Campaign Details</h4>

                <div className={classes.step_max_form}>
                  <form onSubmit={this.submit}>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="step-campaing-name"
                        className={`${classes.step_label} ${
                          error["campaign_name"] ? classes.pass_error_text : ""
                        }`}
                      >
                        Campaign Name
                      </label>
                      <div className={classes.step_relative}>
                        <input
                          type="text"
                          className={`${classes.step_element} ${
                            error["campaign_name"] ? classes.pass_error : ""
                          }`}
                          onChange={(event) =>
                            this.handleChange(event, "campaign_name")
                          }
                          name="step-campaing-name"
                          id="step-campaing-name"
                          placeholder="Campaing name"
                        />
                        <img
                          src={error["campaign_name"] ? TextError : Text}
                          alt=""
                          className={classes.step_form_icon}
                        />
                      </div>
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="step-categories"
                        className={classes.step_label}
                      >
                        Categories
                      </label>
                      <div className={classes.step_relative}>
                        <select
                          name="adCategory"
                          id="step-categories"
                          className={classes.step_select_item}
                          onChange={(event) =>
                            this.handleChange(event, "adCategory")
                          }
                        >
                          <option value="Consumer Services">
                            Consumer Services
                          </option>
                          <option value="Consumer Products<">
                            Consumer Products
                          </option>
                          <option value="Business Service">
                            Business Service
                          </option>
                          <option value="Business Products">
                            Business Products
                          </option>
                          <option value="Real-Estate">Real-Estate</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Mortgage">Mortgage</option>
                          <option value="Professional Services">
                            Professional Services
                          </option>
                          <option value="Home Services">Home Services</option>
                          <option value="Automotive">Automotive</option>
                        </select>
                        <img
                          src={ArrowDown}
                          alt=""
                          className={classes.step_select_icon}
                        />
                      </div>
                    </div>
                    <button type="submit" className={classes.step2_btn}>
                      Next
                    </button>
                    <div className={classes.step_center}>
                      <Link
                        to="/ad-manager/campaign-objective"
                        className={classes.step2_back_link}
                      >
                        <img src={ArrowLeft} alt="" />
                        <span>Go Back</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={classes.create_right_info}>
              <div className={classes.create_info}>
                <p className={classes.create_info_icon}>
                  <img src={InfoCircle} alt="" />
                  <span>Information</span>
                </p>
                <ul className={classes.create_info_ul}>
                  <li>
                    <p className={classes.create_ul_p}>Campaign Name</p>
                    <div className={classes.create_ul_txt}>
                      We do not advertise tabacco, adult and alcohol products
                      and services
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>Categories</p>
                    <div className={classes.create_ul_txt}>
                      You are required to declare if your ads are related to
                      credit, employment and housing opportunities or related to
                      social issues, elections or politics.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <footer className={classes.footer}>
          <div className={`${classes.mur_contain} ${classes.mur_flex}`}>
            <p className={`${classes.footer_copyright} ${classes.mur_flex}`}>
              <img src={Copyright} alt="" />
              <span>{new Date().getFullYear()}, MurmurCars</span>
            </p>
            <ul className={classes.footer_links}>
              <li>
                <a href="#" className={classes.footer_link}>
                  All rights reserved
                </a>
              </li>
              <li>
                <a href="#" className={classes.footer_link}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default connect(null, { changeSideBar })(withRouter(CampaignDetails));

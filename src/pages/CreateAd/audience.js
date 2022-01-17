import React from "react";

import classes from "../../assets/css/CreateAd/audience/index.module.css";
import classes2 from "../../assets/css/CreateAd/navbar.module.css";
import LogoCreate from "../../assets/css/CreateAd/logo-create.png";
import Copyright from "../../assets/css/CreateAd/copyright.svg";
import Check from "../../assets/css/CreateAd/check.svg";
import InfoCircle from "../../assets/css/CreateAd/info-circle.svg";
import Text from "../../assets/css/CreateAd/text.svg";
import ArrowDown from "../../assets/css/CreateAd/arrow-down.svg";
import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";
import Hashtag from "../../assets/css/CreateAd/hashtag.svg";
import Location from "../../assets/css/CreateAd/location.svg";

import {changeSideBar} from '../../store/actions';
import {connect} from 'react-redux'


import { Link, withRouter } from "react-router-dom";

class Audience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '18-25',
      gender: 'Male',
      specificAttribute: null,
      location: null,
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.canselNewCampaign = this.canselNewCampaign.bind(this)
  }

  submit(event) {
    event.preventDefault();
    if (
      this.state.age != null &&
      this.state.gender != null &&
      this.state.specificAttribute != null &&
      this.state.location != null
    ) {
      this.props.createAudience({
        audienceAge: this.state.age,
        audienceGender: this.state.gender,
        area: this.state.location,
        specificAttribute: this.state.specificAttribute,
      });
    }
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "step-attributes")
      this.setState({ ...this.state, specificAttribute: value });
    else if (name === "step-aud-location")
      this.setState({ ...this.state, location: value });
    else {
      this.setState({ ...this.state, [name]: value });
    }
  }
  canselNewCampaign(){
    this.props.changeSideBar(true);
    this.props.history.replace('/ad-manager')
    this.props.history.go('/ad-manager')
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
    return (
      <React.Fragment>
        <header className={classes2.header}>
          <div className={`${classes2.mur_contain} ${classes2.create_top_cancel}`}>
            <a href="#">
              <img src={LogoCreate} alt="" />
            </a>
            <button type="button" className={classes2.create_cancel_btn} onClick={this.canselNewCampaign}>
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
        <section className={classes2.mur_contain}>
          <div className={classes2.create_steps}>
            <div className={classes2.create_navbar}>
              <ul className={classes2.create_nav_ul}>
                <li
                  className={`${classes2.nav_ul_item} ${classes2.passed_step}`}
                >
                  <a href="#" className={classes2.nav_item_name}>
                    Campaing Objective
                  </a>
                  <div className={classes2.step_number_cover}>
                    <div className={classes2.number_dot}>
                      <span className={classes2.step_number}>1</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes2.passed_check}
                      />
                    </div>
                    <div className={classes2.step_number_active}>
                      <span className={classes2.step_number}>1</span>
                    </div>
                  </div>
                </li>
                <li
                  className={`${classes2.nav_ul_item} ${classes2.passed_step}`}
                >
                  <a href="#" className={classes2.nav_item_name}>
                    Campaing Details
                  </a>
                  <div className={classes2.step_number_cover}>
                    <div className={classes2.number_dot}>
                      <span className={classes2.step_number}>2</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes2.passed_check}
                      />
                    </div>
                    <div className={classes2.step_number_active}>
                      <span className={classes2.step_number}>2</span>
                    </div>
                  </div>
                </li>
                <li className={`${classes2.nav_ul_item} ${classes2.active}`}>
                  <a href="#" className={classes2.nav_item_name}>
                    Audience
                  </a>
                  <div className={classes2.step_number_cover}>
                    <div className={classes2.number_dot}>
                      <span className={classes2.step_number}>3</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes2.passed_check}
                      />
                    </div>
                    <div className={classes2.step_number_active}>
                      <span className={classes2.step_number}>3</span>
                    </div>
                  </div>
                </li>
                <li className={classes2.nav_ul_item}>
                  <a href="#" className={classes2.nav_item_name}>
                    Budget & Schedule
                  </a>
                  <div className={classes2.step_number_cover}>
                    <div className={classes2.number_dot}>
                      <span className={classes2.step_number}>4</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes2.passed_check}
                      />
                    </div>
                    <div className={classes2.step_number_active}>
                      <span className={classes2.step_number}>4</span>
                    </div>
                  </div>
                </li>
                <li className={classes2.nav_ul_item}>
                  <a href="#" className={classes2.nav_item_name}>
                    Placement Type
                  </a>
                  <div className={classes2.step_number_cover}>
                    <div className={classes2.number_dot}>
                      <span className={classes2.step_number}>5</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes2.passed_check}
                      />
                    </div>
                    <div className={classes2.step_number_active}>
                      <span className={classes2.step_number}>5</span>
                    </div>
                  </div>
                </li>
                <li className={classes2.nav_ul_item}>
                  <a href="#" className={classes2.nav_item_name}>
                    Ad creative
                  </a>
                  <div className={classes2.step_number_cover}>
                    <div className={classes2.number_dot}>
                      <span className={classes2.step_number}>6</span>
                      <img
                        src={Check}
                        alt=""
                        className={classes2.passed_check}
                      />
                    </div>
                    <div className={classes2.step_number_active}>
                      <span className={classes2.step_number}>6</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={classes.audience_step}>
              <div className={classes.create_step_1}>
                <h4 className={classes.create_step_h4}>Audience</h4>
                <p className={classes.create_step_p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
                  facilisis quis a faucibus.
                </p>
                <div className={classes.step_max_form}>
                  <form onSubmit={this.submit}>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="step-aud-age"
                        className={classes.step_label}
                      >
                        Audience Age
                      </label>
                      <div className={classes.step_relative}>
                        <select
                          name="age"
                          id="step-aud-age"
                          className={classes.step_select_item}
                          onChange={this.handleChange}
                        >
                          <option value="" disabled>
                            Select Age
                          </option>
                          <option value="18-25">18-25</option>
                          <option value="26-35">26-35</option>
                          <option value="36-45">36-45</option>
                          <option value="46-55">46-55</option>
                          <option value="56-65">56-65</option>
                          <option value="66+">66+</option>
                        </select>
                        <img
                          src={ArrowDown}
                          alt=""
                          className={classes.step_select_icon}
                        />
                      </div>
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="step-aud-gender"
                        className={classes.step_label}
                      >
                        Audience Gender
                      </label>
                      <div className={classes.step_relative}>
                        <select
                          name="gender"
                          id="step-aud-gender"
                          className={classes.step_select_item}
                          onChange={this.handleChange}
                        >
                          <option value="" disabled>
                            Select Gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Both">Both</option>
                        </select>
                        <img
                          src={ArrowDown}
                          alt=""
                          className={classes.step_select_icon}
                        />
                      </div>
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="step-attributes"
                        className={classes.step_label}
                      >
                        Audience Specific attributes
                      </label>
                      <div className={classes.step_relative}>
                        <input
                          type="text"
                          className={classes.step_element}
                          name="step-attributes"
                          id="step-attributes"
                          placeholder="For exapmle: Audience wearing"
                          onChange={this.handleChange}
                        />
                        <img
                          src={Hashtag}
                          alt=""
                          className={classes.step_form_icon}
                        />
                      </div>
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="step-aud-location"
                        className={classes.step_label}
                      >
                        Audience Location
                      </label>
                      <div className={classes.step_relative}>
                        <input
                          type="text"
                          className={classes.step_element}
                          name="step-aud-location"
                          id="step-aud-location"
                          placeholder="Enter zip code"
                          onChange={this.handleChange}
                        />
                        <img
                          src={Location}
                          alt=""
                          className={classes.step_form_icon}
                        />
                      </div>
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <button type="submit" className={classes.step3_btn}>
                      Next
                    </button>
                    <div className={classes.step_center}>
                      <Link
                        to="/ad-manager/campaign-details"
                        className={classes.step3_back_link}
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
                  <span>Info</span>
                </p>
                <ul className={classes.create_info_ul}>
                  <li>
                    <p className={classes.create_ul_p}>Audience Age</p>
                    <div className={classes.create_ul_txt}>
                    Define the age of who you want to see your ads.
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>Audience Gender</p>
                    <div className={classes.create_ul_txt}>
                    Define the gender of who you want to see your ads.
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>
                      Audience Specific Attibutes
                    </p>
                    <div className={classes.create_ul_txt}>
                    Define the some tags/attibution which specific to your
                          audience.
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>Audience Location</p>
                    <div className={classes.create_ul_txt}>
                    Define the location where you want to show your ads.
                          Add ZipCodes.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <footer className={classes2.footer}>
          <div className={`${classes2.mur_contain} ${classes2.mur_flex}`}>
            <p className={`${classes2.footer_copyright} ${classes2.mur_flex}`}>
              <img src={Copyright} alt="" />
              <span>{new Date().getFullYear()}, MurmurCars</span>
            </p>
            <ul className={classes2.footer_links}>
              <li>
                <a href="#" className={classes2.footer_link}>
                  All rights reserved
                </a>
              </li>
              <li>
                <a href="#" className={classes2.footer_link}>
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

export default connect(null, {changeSideBar})(withRouter(Audience));

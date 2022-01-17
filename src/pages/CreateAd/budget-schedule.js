import React from "react";

import classes from "../../assets/css/CreateAd/budget-and-schedule/index.module.css";
import classes2 from "../../assets/css/CreateAd/navbar.module.css";
import LogoCreate from "../../assets/css/CreateAd/logo-create.png";
import Copyright from "../../assets/css/CreateAd/copyright.svg";
import Check from "../../assets/css/CreateAd/check.svg";
import InfoCircle from "../../assets/css/CreateAd/info-circle.svg";
import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";
import Calendar from "../../assets/css/CreateAd/calendar.svg";
import DollarCircle from "../../assets/css/CreateAd/dollar-circle.svg";
import Clock from "../../assets/css/CreateAd/clock.svg";

import {changeSideBar} from '../../store/actions';
import {connect} from 'react-redux'

import "./ant-picker.css";
import { DatePicker,TimePicker } from "antd";
import { Link, withRouter } from "react-router-dom";

class BudgetAndSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: [new Date(), new Date()],
      timeRange: [null, null],
      budget: 0,
    };
    this.submit = this.submit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onBudgetValueChange = this.onBudgetValueChange.bind(this);
    this.canselNewCampaign = this.canselNewCampaign.bind(this)
  }

  submit(event) {
    event.preventDefault();
    if (this.state.dateRange != null && this.state.budget !== 0) {
      this.props.createBudgetAndDuration({
        budgetValue: this.state.budget,
        duration: this.state.dateRange,
        time: this.state.timeRange
      });
    }
  }
  handleDateChange(update) {
    console.log(update)
    if(update.type ==='campaing_time'){
      this.setState({...this.state, timeRange: update.dateString})
    }else{
        this.setState({ ...this.state, dateRange: update.dateString });
    }
  }

  canselNewCampaign(){
    this.props.changeSideBar(true);
    this.props.history.replace('/ad-manager')
    this.props.history.go('/ad-manager')
  }

  onBudgetValueChange(event) {
    this.setState({
      ...this.state,
      budget: event.target.value,
    });
  }
  componentDidMount() {
    //this.props.apiError("");

    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }

  render() {
    return (
      <React.Fragment>
        <header className={classes2.header}>
          <div
            className={`${classes2.mur_contain} ${classes2.create_top_cancel}`}
          >
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
                <li
                  className={`${classes2.nav_ul_item} ${classes2.passed_step}`}
                >
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
                <li className={`${classes2.nav_ul_item} ${classes2.active}`}>
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
            <div className={classes.budget_step}>
              <div className={classes.create_step_1}>
                <h4 className={classes.create_step_h4}>Budget & Schelude</h4>
                <p className={classes.create_step_p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
                  facilisis quis a faucibus.
                </p>
                <div className={classes.step_max_form}>
                  <form onSubmit={this.submit}>
                    <div className={classes.step_form_item}>
                      <label
                        htmlFor="daily-budget"
                        className={classes.step_label}
                      >
                        Daily Budget
                      </label>
                      <div className={classes.step_relative}>
                        <input
                          type="text"
                          className={classes.step_element}
                          name="daily-budget"
                          id="daily-budget"
                          placeholder="Type max Budget"
                          onChange={this.onBudgetValueChange}
                        />
                        <img
                          src={DollarCircle}
                          alt=""
                          className={classes.step_form_icon}
                        />
                      </div>
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <div className={classes.step_form_item}>
                      <label htmlFor="duration" className={classes.step_label}>
                        Campaign Duration
                      </label>
                      <div
                        className={`${classes.step_relative} ${classes.duration_step}`}
                      >
                        <DatePicker.RangePicker
                          defaultValue={this.state.duration}
                          name="duration"
                          id="duration"
                          className={`${classes.step_element}`}
                          onChange={(date, dateString) =>
                            this.handleDateChange({
                              date,
                              dateString,
                            })
                          }
                          picker="date"
                
                        />

                        <img
                          src={Calendar}
                          alt=""
                          className={classes.calendar_icon}
                        />
                      </div>
                     </div>
                      <div className={classes.step_form_item}>
                        <label
                          htmlFor="campaing_time"
                          className={classes.step_label}
                        >
                          Campaing Time
                        </label>
                        <div
                          className={`${classes.step_relative} ${classes.duration_step}`}
                        >
                           <TimePicker.RangePicker
                          //defaultValue={this.state.duration}
                          name="campaing_time"
                          id="campaing_time"
                          className={`${classes.step_element}`}
                          onChange={(date, dateString) =>
                            this.handleDateChange({
                              type: 'campaing_time',
                              date,
                              dateString,
                            })
                          }
                          use12Hours format='HH:mm'
                          picker="date"
                
                        />
                          <img
                            src={Clock}
                            alt=""
                            className={classes.calendar_icon}
                          />
                        </div>
                        {/*<!-- <span class="pass_error">Error message</span> -->*/}
                  
                      {/*<!-- <span class="pass_error">Error message</span> -->*/}
                    </div>
                    <button type="submit" className={classes.step4_btn}>
                      Next
                    </button>
                    <div className={classes.step_center}>
                      <Link
                        to="/ad-manager/audience"
                        className={classes.step4_back_link}
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
                    <p className={classes.create_ul_p}>Daily Budget</p>
                    <div className={classes.create_ul_txt}>
                      How much would you like your maximum daily budget to be?
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>Campaing Duration</p>
                    <div className={classes.create_ul_txt}>
                      Define how long you want to run your ad campaign.
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

export default connect(null, {changeSideBar})(withRouter(BudgetAndSchedule));

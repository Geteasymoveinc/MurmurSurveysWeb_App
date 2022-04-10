import React from "react";

import classes from "../../assets/css/CreateAd/campaign-objective/index.module.css";
import LogoCreate from "../../assets/css/CreateAd/logo-create.png";
import Copyright from "../../assets/css/CreateAd/copyright.svg";
import Check from "../../assets/css/CreateAd/check.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";
import InfoCircle from "../../assets/css/CreateAd/info-circle.svg";

import { changeSideBar } from "../../store/actions";
import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

class CampaignObjective extends React.Component {
  constructor(props) {
    super(props);
    this.canselNewCampaign = this.canselNewCampaign.bind(this)
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
    console.log(this.props);
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
                <li className={`${classes.nav_ul_item} ${classes.active}`}>
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
                <li className={`${classes.nav_ul_item}`}>
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
                  <Link
                    to='/ad-manager/ad-creative'
                    className={classes.nav_item_name}
                  >
                    Ad creative
                  </Link>
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
            <div className={classes.create_objective}>
              <div className={classes.create_step_1}>
                <h4 className={classes.create_step_h4}>
                  Choose a Campaing Objective
                </h4>
                <p className={classes.create_step_p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
                  facilisis quis a faucibus.
                </p>
                <ul className={classes.max_width_step}>
                  <li>
                    <button
                      className={`${classes.mur_flex} ${classes.step_link}`}
                      onClick={() => {
                        this.props.toggleObjective('brandAwareness');
                        this.props.history.push("/ad-manager/campaign-details");
                      }}
                    >
                      <span>Brand awareness</span>
                      <img src={ArrowRight} alt="" />
                    </button>
                  </li>
                  <li>
                    <button
                      className={`${classes.mur_flex} ${classes.step_link}`}
                      onClick={() => {
                        this.props.toggleObjective('reach');
                        this.props.history.push("/ad-manager/campaign-details");
                      }}
                    >
                      <span>Reach</span>
                      <img src={ArrowRight} alt="" />
                    </button>
                  </li>
                  <li>
                    <button
                      href="#"
                      className={`${classes.mur_flex} ${classes.step_link}`}
                      onClick={() => {
                        this.props.toggleObjective('traffic');
                        this.props.history.push("/ad-manager/campaign-details");
                      }}
                    >
                      <span>Traffic</span>
                      <img src={ArrowRight} alt="" />
                    </button>
                  </li>
                </ul>
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
                    <p className={classes.create_ul_p}>Brand awareness</p>
                    <div className={classes.create_ul_txt}>
                      Show your ads to people who most likely to remember them
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>Reach</p>
                    <div className={classes.create_ul_txt}>
                      Show your ads to the maximum number of people
                    </div>
                  </li>
                  <li>
                    <p className={classes.create_ul_p}>Traffic</p>
                    <div className={classes.create_ul_txt}>
                      Send people to a destination, like webpage, event, etc
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

export default connect(null, { changeSideBar })(withRouter(CampaignObjective));

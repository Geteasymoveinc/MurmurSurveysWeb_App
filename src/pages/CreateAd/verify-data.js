import React from "react";

import classes from "../../assets/css/CreateAd/verify-data/index.module.css";
import classes2 from "../../assets/css/CreateAd/navbar.module.css";
import LogoCreate from "../../assets/css/CreateAd/logo-create.png";
import Copyright from "../../assets/css/CreateAd/copyright.svg";

import ArrowLeft from "../../assets/css/CreateAd/ads-details/arrow-left.svg";


import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { toggleSideBar } from "../../store/actions";

class VerifyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();

    this.props.toggleSideBar(true);
    this.props.sendToBackEnd();
  }

  componentDidMount() {
    document.body.classList.add("bg-transparent");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-transparent");
  }

  render() {
    return (
      <React.Fragment>
        <header className={classes2.header}>
          <div className={classes2.mur_contain}>
            <a href="#">
              <img src={LogoCreate} alt="" />
            </a>
          </div>
        </header>

        <section className={classes.mur_contain}>
          <div className={classes.verify_data}>
            <div className={classes.verify_content}>
              <form onSubmit={this.submit}>
                {this.props.data.length &&
                  this.props.data.map((el, id) => (
                    <ul className={classes.verify_ul} key={id}>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Campaign Objective
                        </span>
                        <p className={classes.verify_li_p}>{el.objective}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Audience Age
                        </span>
                        <p className={classes.verify_li_p}>{el.age}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Audience Location
                        </span>
                        <p className={classes.verify_li_p}>{el.location}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Audience Specific Attributs
                        </span>
                        <p className={classes.verify_li_p}>{el.attribute}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Campaign Name
                        </span>
                        <p className={classes.verify_li_p}>{el.name}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Audience Gender
                        </span>
                        <p className={classes.verify_li_p}>{el.gender}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Daily Budget
                        </span>
                        <p className={classes.verify_li_p}>{el.budget}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Campaing Duration
                        </span>
                        <p className={classes.verify_li_p}>
                          {el.duration}
                        </p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>Category</span>
                        <p className={classes.verify_li_p}>{el.category}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Number of Displays
                        </span>
                        <p className={classes.verify_li_p}>
                          {el.displayNumber}
                        </p>
                      </li>
                      <li className={classes.verify_li}>
                        <span className={classes.verify_li_span}>
                          Type of Ad
                        </span>
                        <p className={classes.verify_li_p}>{el.type}</p>
                      </li>
                      <li className={classes.verify_li}>
                        <div
                          className={classes.verify_img_cover}
                        >
                           <img  className={classes.verify_img} src={el.artWork}/>
                        </div>
                      </li>
                    </ul>
                  ))}

                <div className={classes.verify_center}>
                  <button type="submit" className={classes.publish_btn}>
                    Publish
                  </button>
                  <div className={classes.step_center}>
                    <Link
                      to="/ad-manager/ad-media"
                      className={classes.publish_back_link}
                    >
                      <img src={ArrowLeft} alt="" />
                      <span>Go Back</span>
                    </Link>
                  </div>
                </div>
              </form>
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

export default connect(null, { toggleSideBar })(withRouter(VerifyData));

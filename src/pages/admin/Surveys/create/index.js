import React from "react";
import { Component, Fragment } from "react";

import Logo from "../../../../assets/images/surveys/logoBlue.svg";
import Eye from "../../../../assets/images/surveys/eye.svg";
import Eye_Slash from "../../../../assets/images/surveys/eye-slash.svg";
import classes from "../../../../assets/css/surveys/index.module.scss";
import ArrowLeft from "../../../../assets/css/CreateAd/ads-details/arrow-left.svg";
import classes2 from "../../../../assets/css/CreateAd/ads-details/index.module.css";

import SurveyQuestion from "./questions";
import SurveySettings from "./settings";
//import SurveyAnalytics from "./analytics";
//import SurveyAnswers from "./answers";
//import Preview from "./preview";



import Profile from "../../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import {
  publish_survey,
  fetch_survey,
  fetch_map_position,
  toggleSideBar
} from "../../../../store/actions";
import { connect } from "react-redux";
import { queryForEmail } from "../../../../helpers/fakebackend_helper";

import { Link, withRouter } from "react-router-dom";

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      first: true,
      survey_id: "",
      user_id: "",
      hasSurvey: false,
      email: sessionStorage.getItem("authUser"),
      menu: {
        menu_item: "questions",
        preview: false,
      },
    };
    this.timeout = null;
  }
  togleMenuItem = (menu) => {
    this.setState({
      ...this.state,
      menu: {
        menu_item: menu,
      },
    });
  };

  togglePreviewMode = () => {
    this.setState({
      ...this.state,
      menu: {
        ...this.state.menu,
        preview: !this.state.menu.preview,
      },
    });
  };

  componentWillUnmount() {
    document.body.classList.remove("grey-background");
    clearTimeout(this.timeout);
    this.props.toggleSideBar(true)
  }
  componentDidMount() {
    this.props.toggleSideBar(false);
    document.body.classList.add("grey-background");

    const {id: survey_id} = this.props


    let loading = this.state.loading
    if (survey_id) {

      loading=this.props.loading
      
      this.setState({
        ...this.state,
        hasSurvey: true,
        loading
      });

      queryForEmail(
        `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
        {
          email: this.state.email,
        }
      )
        .then((user) => {
          const { _id } = user.resp;
          this.props.fetch_survey(
            `https://backendapp.murmurcars.com/api/v1/surveys/survey/fetch-admin-survey?survey_id=${survey_id}`
          );
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              this.setState({
                ...this.state,
                survey_id,
                user_id: _id
              });

              this.handleReverseGeocode({ lat, lng });
              //this.handleLocationChange();
            },
            (err) => {
              this.setState({
                ...this.state,
                survey_id,
                user_id: _id,
              });
            }
          );
        })
        .catch((err) => {
          this.setState({
            survey_id,
          });
        });
    }else{
    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
      {
        email: this.state.email,
      }
    ).then((user) => {
      const { _id } = user.resp;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setState({
            ...this.state,
            user_id: _id,
            loading: false,
          });

          this.handleReverseGeocode({ lat, lng });
          //this.handleLocationChange();
        },
        (err) => {
          this.setState({
            ...this.state,
            user_id: _id,
            loading: false,
          });
        }
      );
    });
  }
  }

  componentDidUpdate() {
    if (this.props.loading !== this.state.loading) {
      this.setState({
        ...this.state,
        loading: this.props.loading,
      });
    }
  }

  //publish or update
  submitNewSurvey = (event) => {
    event.preventDefault();
    let url = "";
    const {
      survey_questions,
      survey_title,
      survey_earnings,
      target_audience,
      survey_audience_number,
      survey_image,
      survey_active,
      survey_caption,
    } = this.props;
    const { user_id, survey_id } = this.state;
    const formData = new FormData();
    formData.append("survey_title", survey_title);
    formData.append("survey_earnings", survey_earnings);
    formData.append("target_audience", JSON.stringify(target_audience));
    formData.append("survey_audience_count", survey_audience_number);
    if(survey_image.image_src){
    formData.append("photo", survey_image.image_name);
    formData.append("file", survey_image.image_file);
    }
    formData.append("survey_active", JSON.stringify(survey_active));
    formData.append("survey_caption", survey_caption);
 

    if (survey_questions.length) {
      for (let i = 0; i < survey_questions.length; i++) {
        formData.append(
          "survey_questions",
          JSON.stringify(survey_questions[i])
        );
      }
    } else {
      formData.append("survey_questions", JSON.stringify(survey_questions));
    }

    let method = "POST";

    if (this.state.survey_id.length) {
      url = `https://backendapp.murmurcars.com/api/v1/surveys/survey/update-survey/${survey_id}`;
      method = "PUT";
    } else {
      url = `https://backendapp.murmurcars.com/api/v1/surveys/survey/create/${user_id}`;
    }
    this.props.publish_survey({
      url,
      data: formData,
      history: this.props.history,
      method,
    });
  };

  //settings

  handleReverseGeocode = ({ lat, lng }) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        console.log(response);
        const address = response.results[5].formatted_address;

        this.props.fetch_map_position(address, {
          lat,
          lng,
        });
      },
      (error) => {
        this.setState({
          ...this.state,
        });
      }
    );
  };



  render() {
    const { menu, survey_id, hasSurvey, loading } = this.state;
    const { menu_item, preview: preview_mode } = menu;

    return (
      <Fragment>
        {loading && (
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
        )}
        {!loading && (
          <div className={classes.dash_right}>
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={Logo} alt="logo" />
                </a>
              </div>
              <div
                className={`${classes.menu_self_flex} ${
                  hasSurvey ? classes.menu_self_flex_hasSurvey : null
                }`}
              >
                <div
                  className={`${classes.menu_flex} ${
                    hasSurvey ? classes.menu_flex_hasSurvey : null
                  }`}
                >
                  <div className={classes.button_containers}>
                    {" "}
                    <button onClick={() => this.togleMenuItem("questions")}>
                      Questions
                    </button>
                    <span
                      className={`${
                        menu_item === "questions" ? classes.border_active : null
                      }`}
                    ></span>
                  </div>

                  <div className={classes.button_containers}>
                    <button onClick={() => this.togleMenuItem("settings")}>
                      Settings
                    </button>
                    <span
                      className={`${
                        menu_item === "settings" ? classes.border_active : null
                      }`}
                    ></span>
                  </div>
                </div>
              </div>
              <div className={classes.dash_relative}>
                <div className={classes.search_box_flex}>
                  <button className={classes.pass_eye}>
                    <img
                      src={`${preview_mode ? Eye_Slash : Eye}`}
                      alt="icon"
                      onClick={this.togglePreviewMode}
                    />
                  </button>
                  <form>
                    <button
                      className={classes.publish_survey}
                      onClick={this.submitNewSurvey}
                    >
                      <span>{`${
                        this.state.survey_id.length ? "Update" : "Publish"
                      }`}</span>
                    </button>
                  </form>
                  <Profile scope={"survey"} />
                </div>
              </div>
            </header>
            {this.props.message && (
              <h1 className={classes.publish_update_success}>
                {this.props.message}
              </h1>
            )}
            <Link to={`/surveys`} className={`${classes2.ads_back_icon}`} >
              <img src={ArrowLeft} alt="" className={classes2.ads_left_img} />
              <span>Back</span>
            </Link>
            {!preview_mode && menu_item === "questions" && (
              <SurveyQuestion
                hasSurvey={this.state.hasSurvey}
                surveys={this.props.survey_questions}
                survey_title={this.props.survey_title}
                survey_caption={this.props.survey_caption}
                survey_earnings={this.props.survey_earnings}
                survey_image={this.props.survey_image}
                survey_audience_number={this.props.survey_audience_number}
              />
            )}
            {!preview_mode && menu_item === "settings" && (
              <SurveySettings
                survey_active={this.props.survey_active}
                survey_location={this.props.target_audience.location}
                survey_gender={this.props.target_audience.gender}
                survey_age={this.props.target_audience.age}
                handleLocationChange={this.handleLocationChange}
                map={this.props.map}
              />
            )}
          </div>
        )}
      </Fragment>
    );
  }
}
const mapPropsToState = (state) => {
  const {
    survey_questions,
    survey_title,
    survey_caption,
    survey_earnings,
    survey_image,
    target_audience,
    survey_audience_number,
    survey_active,
    analytics,
    map,
    loading,
    message,
  } = state.Survey;

  return {
    survey_questions,
    survey_title,
    survey_caption,
    survey_earnings,
    survey_image,
    target_audience,
    survey_audience_number,
    survey_active,
    analytics,
    map,
    loading,
    message,
  };
};

export default connect(mapPropsToState, {
  publish_survey,
  fetch_survey,
  fetch_map_position,
  toggleSideBar,
})(withRouter(Survey));

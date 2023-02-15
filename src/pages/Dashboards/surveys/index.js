import React from "react";
import { Component, Fragment } from "react";

import Logo from "../../../assets/images/surveys/logoBlue.svg";
import Eye from "../../../assets/images/surveys/eye.svg";
import Eye_Slash from "../../../assets/images/surveys/eye-slash.svg";
import classes from "../../../assets/css/surveys/index.module.scss";

import SurveyQuestion from "./questions";
import SurveySettings from "./settings";
import SurveyAnalytics from "./analytics";
import SurveyAnswers from "./answers";
import Preview from "./preview";

import Profile from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import {
  publish_survey,
  fetch_survey,
  fetch_map_position,
} from "../../../store/actions";
import { connect } from "react-redux";
import { queryForEmail } from "../../../helpers/fakebackend_helper";

import { withRouter } from "react-router-dom";

import Geocode from "react-geocode";

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLEMAPSKEY}`);

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      first: true,
      survey_id: "",
      publish: false,
      hasSurvey: false,
      email: sessionStorage.getItem("authUser"),
      menu: {
        menu_item: "questions",
        preview: false,
      },
    };
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
  }
  componentDidMount() {
    const url = this.props.location.search; //search property of history props
    const survey_id = new URLSearchParams(url).get("survey_id"); //extracting id

    document.body.classList.add("grey-background");

    if (survey_id) {
      this.setState({
        ...this.state,
        hasSurvey: true,
      });

      this.props.fetch_survey(
        `https://backendapp.murmurcars.com/api/v1/surveys/survey/fetch-survey?survey_id=${survey_id}`
      );
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setState({
            ...this.state,
            survey_id,
            loading: false,
          });
          const { country, target_audience } = this.props.survey;
          //this.handleReverseGeocode({ lat, lng });
          this.handleGeocode(country, target_audience.location);
          //this.handleLocationChange();
        },
        (err) => {
          const { country, target_audience } = this.props.survey;
          this.handleGeocode(country, target_audience.location);
          this.setState({
            ...this.state,
            survey_id,
            loading: false,
          });
        }
      );
    } else {
      const url = this.props.location.search; //search property of history props
      const publish =
        new URLSearchParams(url).get("publish") === "true" ? true : false;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          this.setState({
            ...this.state,
            survey_id,
            loading: false,
            publish,
          });

          this.handleReverseGeocode({ lat, lng });
        },
        (err) => {
          this.handleReverseGeocode({ lat: 41.8781, lng: -87.6298 });
          this.setState({
            ...this.state,
            loading: false,
          });
        }
      );
    }
  }

  //publish or update
  submitNewSurvey = (event, stripe, no_stripe_surveys, user_id) => {
    event.preventDefault();

    const {
      survey_questions,
      survey_title,
      survey_earnings,
      survey_budget,
      target_audience,
      survey_audience_number,
      survey_image,
      survey_active,
      survey_caption,
      country,
      survey_specific,
    } = this.props.survey;
    const { survey_id } = this.state;
    const formData = new FormData();
    formData.append("survey_title", survey_title);
    formData.append("survey_earnings", survey_earnings);
    formData.append("survey_budget", survey_budget);
    formData.append("target_audience", JSON.stringify(target_audience));
    formData.append("survey_audience_count", survey_audience_number);
    formData.append("photo", JSON.stringify(survey_image.image_name));
    formData.append("survey_active", JSON.stringify(survey_active));
    formData.append("survey_caption", survey_caption);
    formData.append("file", survey_image.image_file);
    formData.append("survey_specific", JSON.stringify(survey_specific));
    formData.append("country", country);
    formData.append("no_stripe_surveys", JSON.stringify(no_stripe_surveys));

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

    const backend = {};

    if (survey_id) {
      backend.url = `http://localhost:4000/api/v1/surveys/survey/update-survey/${survey_id}`;
      backend.method = "PUT";
      backend.update = true;
    } else {
      //backend.url = `https://backendapp.murmurcars.com/api/v1/surveys/survey/publish-survey/${user_id}?withoutStripeCheckout=${stripe}`;
      backend.url = `http://localhost:4000/api/v1/surveys/survey/publish-survey/${user_id}?withoutStripeCheckout=${!stripe}`;
      backend.method = "POST";
      backend.update = false;
      backend.stripe = stripe;
    }
    this.props.publish_survey({
      backend,
      data: formData,
      history: this.props.history,
    });
  };
  checkout = (survey_id) => {
    const { survey_audience_number, survey_earnings } = this.props.survey;

    const backend = {};
    backend.url = `http://localhost:4000/api/v1/surveys/survey/handle-checkout/${survey_id}`;
    backend.method = "POST";
    backend.stripe = true;
    this.props.publish_survey({
      backend,
      data: {
        survey_audience_count: survey_audience_number,
        survey_earnings: survey_earnings,
      },
      history: this.props.history,
    });
  };

  //settings

  handleReverseGeocode = ({ lat, lng }) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.plus_code.compound_code;
        const country = address.split(",").at(-1);
        this.props.fetch_map_position(address, country, {
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
  handleGeocode = (country, location) => {

    Geocode.fromAddress(country + " " + location)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const center = { lat, lng };
        console.log(center);
        this.handleReverseGeocode(center);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { menu, loading, survey_id, publish } = this.state;
    const { menu_item, preview: preview_mode } = menu;

    const { survey, payment, user_id } = this.props;

    const { analytics } = survey;
    console.log(this.props);
    let stripe = payment.stripe;

    if (survey_id) {
      stripe = survey.stripe;
    }

    return (
      <Fragment>
        {survey.loading || loading ? (
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
        ) : (
          <div className={classes.dash_right}>
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={Logo} alt="logo" />
                </a>
              </div>
              <div
                className={`${classes.menu_self_flex} ${
                  survey_id ? classes.update : null
                }`}
              >
                <div
                  className={`${classes.menu_flex} ${
                    survey_id ? classes.update : null
                  }`}
                >
                  <div className={classes.button_containers}>
                    {" "}
                    <button
                      onClick={() => this.togleMenuItem("questions")}
                      className={`${classes.navbar_btn} ${
                        menu_item === "questions"
                          ? classes.navbar_btn_active
                          : null
                      }`}
                    >
                      Questions
                    </button>
                    <span
                      className={`${
                        menu_item === "questions" ? classes.border_active : null
                      }`}
                    ></span>
                  </div>

                  {survey_id ? (
                    <div className={classes.button_containers}>
                      <button
                        onClick={() => this.togleMenuItem("analytics")}
                        className={`${classes.navbar_btn} ${
                          menu_item === "analytics"
                            ? classes.navbar_btn_active
                            : null
                        }`}
                      >
                        Analytics
                      </button>

                      <span
                        className={`${
                          menu_item === "analytics"
                            ? classes.border_active
                            : null
                        }`}
                      ></span>
                    </div>
                  ) : null}

                  {survey_id ? (
                    <div className={classes.button_containers}>
                      <button
                        onClick={() => this.togleMenuItem("answers")}
                        className={`${classes.navbar_btn} ${
                          menu_item === "answers"
                            ? classes.navbar_btn_active
                            : null
                        }`}
                      >
                        Answers
                      </button>
                      <span
                        className={`${
                          menu_item === "answers" ? classes.border_active : null
                        }`}
                      ></span>
                    </div>
                  ) : null}

                  <div className={classes.button_containers}>
                    <button
                      onClick={() => this.togleMenuItem("settings")}
                      className={`${classes.navbar_btn} ${
                        menu_item === "settings"
                          ? classes.navbar_btn_active
                          : null
                      }`}
                    >
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
                <div
                  className={`${classes.search_box_flex} ${
                    stripe && survey_id ? classes.checkout : null
                  }`}
                >
                  <button className={classes.pass_eye}>
                    <img
                      src={`${preview_mode ? Eye_Slash : Eye}`}
                      alt="icon"
                      onClick={this.togglePreviewMode}
                    />
                  </button>
                  <form
                    onSubmit={(e) =>
                      this.submitNewSurvey(
                        e,
                        payment.stripe,
                        payment.no_stripe_surveys,
                        user_id
                      )
                    }
                  >
                    {stripe && survey_id ? (
                      <button
                        className={classes.publish_survey}
                        onClick={() => this.checkout(survey_id)}
                      >
                        <span>Checkout</span>
                      </button>
                    ) : null}
                    <button className={classes.publish_survey} type="submit">
                      <span>{`${survey_id ? "Update" : "Publish"}`}</span>
                    </button>
                  </form>
                  <Profile scope={"survey"} />
                </div>
              </div>
            </header>

            {!preview_mode && menu_item === "questions" && (
              <SurveyQuestion
                hasSurvey={this.state.hasSurvey}
                surveys={survey.survey_questions}
                survey_title={survey.survey_title}
                survey_caption={survey.survey_caption}
                survey_earnings={survey.survey_earnings}
                survey_budget={survey.survey_budget}
                survey_image={survey.survey_image}
                survey_audience_number={survey.survey_audience_number}
                publish={publish}
              />
            )}
            {!preview_mode && menu_item === "settings" && (
              <SurveySettings
                survey_active={survey.survey_active}
                survey_specific={survey.survey_specific}
                country={survey.country}
                survey_location={survey.target_audience.location}
                survey_gender={survey.target_audience.gender}
                survey_age={survey.target_audience.age}
                paid={survey.paid}
                handleLocationChange={this.handleLocationChange}
                map={survey.map}
              />
            )}
            {!preview_mode && menu_item === "analytics" && (
              <SurveyAnalytics id={survey._id} />
            )}
            {!preview_mode && menu_item === "answers" && (
              <SurveyAnswers
                analytics={analytics}
                survey_questions={survey.survey_questions}
                id={survey._id}
              />
            )}
            {preview_mode && <Preview surveys={survey.survey_questions} />}
          </div>
        )}
      </Fragment>
    );
  }
}

export default connect(null, {
  publish_survey,
  fetch_survey,
  fetch_map_position,
})(withRouter(Survey));

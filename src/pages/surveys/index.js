import React from "react";
import { Component, Fragment } from "react";

import Logo from "../../assets/images/surveys/logoBlue.svg";
import Eye from "../../assets/images/surveys/eye.svg";
import classes from "../../assets/css/surveys/index.module.scss";

import SurveyQuestion from "./questions";
import SurveySettings from "./settings";
import SurveyAnalytics from "./analytics";
import SurveyAnswers from "./answers";
import Preview from "./preview";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import { changeSideBar } from "../../store/actions";
import { publish_survey } from "../../store/actions";
import { connect } from "react-redux";

import { Link, withRouter } from "react-router-dom";

import axios from "axios";
import { queryForEmail } from "../../helpers/fakebackend_helper";

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {

      user_id:'',
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
    console.log(this.props.history);
    document.body.classList.add("grey-background");
    this.props.changeSideBar(false);

    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
      {
        email: this.state.stng_email,
      }
    )
    .then(user => {
         this.setState({
           ...this.state,
           user_id: user.id
         })
    })
    .catch(err => console.log(err))
  }
  submitNewSurvey = (event) => {
    event.preventDefault();
    const { price, title, surveys, settings } = this.props;

    console.log(price, title, surveys, settings);
    let post_survey = {
      survey_title: title.title,
      survey_status: settings.active,
      survey_earnings: price.price,
      
    };

    let survey_question = surveys.map((survey) => {
      return {
        question: survey.question,
        type: survey.type,
        answers: survey.answers,
        important: survey.important,
      };
    });

    post_survey["survey_questions"] = survey_question;

    this.props.publish_survey({
      data: post_survey,
      user_id: this.state.user_id,
      history: this.props.history,
    });
  };

  render() {
    const { menu, fetch_questions } = this.state;
    const { menu_item, preview: preview_mode } = menu;

    console.log(this.props);
    return (
      <Fragment>
        {this.props.loading && (
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
        {!this.props.loading && (
          <div className={classes.dash_right}>
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={Logo} alt="logo" />
                </a>
              </div>
              <div className={classes.menu_self_flex}>
                <div className={classes.menu_flex}>
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
                    <button onClick={() => this.togleMenuItem("analytics")}>
                      Analytics
                    </button>

                    <span
                      className={`${
                        menu_item === "analytics" ? classes.border_active : null
                      }`}
                    ></span>
                  </div>
                  <div className={classes.button_containers}>
                    <button onClick={() => this.togleMenuItem("answers")}>
                      Answers
                    </button>
                    <span
                      className={`${
                        menu_item === "answers" ? classes.border_active : null
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
                      src={Eye}
                      alt="icon"
                      onClick={this.togglePreviewMode}
                    />
                  </button>
                  <form>
                    <button
                      className={classes.publish_survey}
                      onClick={this.submitNewSurvey}
                    >
                      <span>Publish</span>
                    </button>
                  </form>
                  <Profile scope={"survey"} />
                </div>
              </div>
            </header>

            {!preview_mode && menu_item === "questions" && <SurveyQuestion />}
            {!preview_mode && menu_item === "settings" && <SurveySettings />}
            {!preview_mode && menu_item === "analytics" && <SurveyAnalytics />}
            {!preview_mode && menu_item === "answers" && <SurveyAnswers />}
            {preview_mode && <Preview />}
          </div>
        )}
      </Fragment>
    );
  }
}
const mapPropsToState = (state) => {
  const { surveys, title, price, settings } = state.Survey;

  return { surveys, title, price, settings };
};

export default connect(mapPropsToState, { changeSideBar, publish_survey })(
  withRouter(Survey)
);

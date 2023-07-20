import React from "react";
import { Component, Fragment } from "react";

import LogoWhiteTheme from "../../assets/images/LogoWhiteTheme.png";
import classes from "../../assets/css/surveys/index.module.scss";
import RecruitParticipants from "../../assets/images/recruit-participants.png";
import UploadParticipants from "../../assets/images/upload-participants.png";
import HiIcon from "../../assets/images/hi.svg";
import ChatRoom from "../../assets/images/Chat Room.png";
import StudyGroup2 from "../../assets/images/study-group-2.png";
import Calendar from "../../assets/images/Calendar.png";
import Checklist from "../../assets/images/Checklist.png";
import ApplicationWindow from "../../assets/images/Application Window.png";
import Phone from "../../assets/images/Phone.png";
import PlaceMarker from "../../assets/images/Place Marker.png";
import Survey from "../../assets/images/Survey.png";
import avatar from "../../assets/images/avatar.png";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import ParticipantsModal from "../../components/modals/upload-participants";
import { ErrorFeedback, SuccessFeedback } from "../../components/feedbacks";
import DownloadTemplate from "../../components/modals/download-template";

import { queryForEmail } from "../../helpers/fakebackend_helper";

import axios from "axios";

class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      company: "",
      profile: sessionStorage.getItem("profileImage") || avatar,
      loading: true,
      page: "main",
      constructResearch: {
        research: "",
        targetUsersFrom: "",
        researchConductedVia: "",
      },
      uploadParticipantsModalLoader: false,
      uploadParticipantsModal: false,
      downloadCSVTemplateModal: false,
      uploadCsvSuccess: false,
      uploadCsvError: false,
    };
  }

  componentDidMount() {
    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`,
      {
        email: sessionStorage.getItem("authUser"),
        role: "2",
      }
    )
      .then((user) => {
        const { fullName, company, _id, payment, subscription } = user.resp;
        this.setState({
          ...this.state,
          fullName,
          company,
          id: _id,
          //free: survey_payment.count > 0,
          payment,
          subscription,
          loading: false,
        });
      })
      .catch((err) =>
        this.setState({
          ...this.state,
          loading: false,
        })
      );
  }

  toggleToCreateSurveyMode = () => {
    axios
      .post(
        `https://backendapp.murmurcars.com/api/v1/surveys/survey/publish-survey/${this.state.id}?payment=${this.state.payment.type}`,
        {
          research: this.state.constructResearch.research,
          targetUsersFrom: this.state.constructResearch.targetUsersFrom,
          researchConductedVia:
            this.state.constructResearch.researchConductedVia,
          no_payment_count: this.state.payment.count,
        }
      )
      .then((response) => {
        this.props.history.push(
          `/surveys/publish-survey?survey_id=${response.data.survey_id}`
        );
        this.setState({
          ...this.state,
          create_edit_survey_mode: true,
        });
      })
      .catch((err) => console.log(err));
  };

  enrollParticipants = (research) => {
    this.setState((state) => ({
      ...state,
      page: "enroll-participants",
      constructResearch: {
        ...state.constructResearch,
        research,
      },
    }));
  };

  render() {
    const { create_edit_survey_mode, loading } = this.state;
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
        {!loading && !create_edit_survey_mode && (
          <div
            className={`${classes.dash_right}  ${
              this.state.uploadParticipantsModal ? classes["blur-page"] : null
            }`}
          >
            <header className={classes.header}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img src={LogoWhiteTheme} alt="logo" />
                </a>
              </div>
              <div className={classes.menu_self_flex}>
                <div className={`${classes.menu_flex}`}>
                  {" "}
                  <div className={classes.button_containers}>
                    <Link
                      to={`/`}
                      className={`${classes.navbar_btn} ${classes.main} ${classes.active}`}
                    >
                      Main
                    </Link>
                    <span className={`${classes.border_active}`} />
                  </div>
                  <div className={classes.button_containers}>
                    <Link
                      to={`/surveys`}
                      className={`${classes.navbar_btn} ${classes.main}`}
                    >
                      Surveys
                    </Link>
                  </div>
                </div>
              </div>
              <div className={classes.dash_relative}>
                <div className={classes.search_box_flex_end}>
                  <Profile scope="survey" />
                </div>
              </div>
            </header>

            <div className={classes.surveys_container}>
              <div
                className={classes.create_ads}
                style={{
                  background: "transparent",
                  boxShadow: "none",
                  width: "fit-content",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {this.state.page === "studyGroup" ||
                this.state.page === "studyConduct" ? null : (
                  <div className={classes.profile}>
                    <img src={this.state.profile} alt="profile image" />
                    <div className={classes.profile__subcontainer}>
                      <img src={HiIcon} alt="" />
                      <p>
                        <span>Welcome</span> {this.state.fullName}{" "}
                      </p>
                    </div>
                  </div>
                )}

                {this.state.page === "main" ? (
                  <div className={classes.services}>
                    <div className={classes.services__service}>
                      <h5>
                        <span>
                          {this.props.layoutTheme === "dark" ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                d="M3 9C4.10457 9 5 8.10457 5 7C5 5.89543 4.10457 5 3 5C1.89543 5 1 5.89543 1 7C1 8.10457 1.89543 9 3 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21 9C22.1046 9 23 8.10457 23 7C23 5.89543 22.1046 5 21 5C19.8954 5 19 5.89543 19 7C19 8.10457 19.8954 9 21 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M7.5 16.5V18.5C7.5 19.11 7.13 19.64 6.61 19.86C6.42 19.95 6.22 20 6 20H4C3.17 20 2.5 19.33 2.5 18.5V16.5C2.5 15.67 3.17 15 4 15H6C6.83 15 7.5 15.67 7.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21.5 16.5V18.5C21.5 19.33 20.83 20 20 20H18C17.78 20 17.58 19.95 17.39 19.86C16.87 19.64 16.5 19.11 16.5 18.5V16.5C16.5 15.67 17.17 15 18 15H20C20.83 15 21.5 15.67 21.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M15 5.5V8.5C15 9.32 14.32 10 13.5 10H10.5C9.68 10 9 9.32 9 8.5V5.5C9 4.68 9.68 4 10.5 4H13.5C14.32 4 15 4.68 15 5.5Z"
                                fill="#7F56D9"
                              />
                              <g opacity="0.4">
                                <path
                                  opacity="0.4"
                                  d="M9 6.25H5C4.59 6.25 4.25 6.59 4.25 7C4.25 7.41 4.59 7.75 5 7.75H7.57C5.52 9.27 4.25 11.79 4.25 14.5C4.25 14.7 4.26 14.89 4.29 15.09C4.33 15.47 4.66 15.75 5.03 15.75C5.06 15.75 5.09 15.75 5.12 15.75C5.53 15.7 5.83 15.33 5.78 14.92C5.76 14.78 5.76 14.65 5.76 14.51C5.76 11.91 7.17 9.50997 9.35 8.40997C9.72 8.21997 9.87 7.77002 9.68 7.40002C9.67 7.39002 9.66 7.38 9.66 7.37C9.72 7.26 9.77 7.14001 9.77 7.01001C9.75 6.59001 9.41 6.25 9 6.25Z"
                                  fill="#7F56D9"
                                />
                                <path
                                  opacity="0.4"
                                  d="M16.43 7.75H19C19.41 7.75 19.75 7.41 19.75 7C19.75 6.59 19.41 6.25 19 6.25H15C14.59 6.25 14.25 6.59 14.25 7C14.25 7.13 14.29 7.24999 14.36 7.35999C14.35 7.36999 14.34 7.38001 14.34 7.39001C14.15 7.76001 14.3 8.21002 14.67 8.40002C16.85 9.50002 18.26 11.9 18.26 14.5C18.26 14.64 18.25 14.77 18.24 14.91C18.19 15.32 18.49 15.69 18.9 15.74C18.93 15.74 18.96 15.74 18.99 15.74C19.37 15.74 19.69 15.46 19.73 15.08C19.75 14.88 19.77 14.69 19.77 14.49C19.75 11.79 18.48 9.27 16.43 7.75Z"
                                  fill="#7F56D9"
                                />
                              </g>
                            </svg>
                          ) : null}
                          UX & Design
                        </span>
                        <button
                          onClick={() => this.enrollParticipants("uiux-design")}
                        >
                          {this.props.layoutTheme === "light" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 8H15M15 8L8 1M15 8L8 15"
                                stroke="#344054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </h5>
                      <p>
                        Get informed by the latest trends in design psychology
                        directly from the audience by creating your own survey
                      </p>
                    </div>
                    <div className={classes.services__service}>
                      <h5>
                        <span>
                          {this.props.layoutTheme === "dark" ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                opacity="0.4"
                                d="M21.3699 11.39V17.38C21.3699 20.14 19.1299 22.38 16.3699 22.38H7.62988C4.86988 22.38 2.62988 20.14 2.62988 17.38V11.46C3.38988 12.28 4.46988 12.75 5.63988 12.75C6.89988 12.75 8.10988 12.12 8.86988 11.11C9.54988 12.12 10.7099 12.75 11.9999 12.75C13.2799 12.75 14.4199 12.15 15.1099 11.15C15.8799 12.14 17.0699 12.75 18.3099 12.75C19.5199 12.75 20.6199 12.26 21.3699 11.39Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M14.9899 1.25H8.98985L8.24985 8.61C8.18985 9.29 8.28985 9.93 8.53985 10.51C9.11985 11.87 10.4799 12.75 11.9999 12.75C13.5399 12.75 14.8699 11.89 15.4699 10.52C15.6499 10.09 15.7599 9.59 15.7699 9.08V8.89L14.9899 1.25Z"
                                fill="#7F56D9"
                              />
                              <path
                                opacity="0.6"
                                d="M22.3598 8.27L22.0698 5.5C21.6498 2.48 20.2798 1.25 17.3498 1.25H13.5098L14.2498 8.75C14.2598 8.85 14.2698 8.96 14.2698 9.15C14.3298 9.67 14.4898 10.15 14.7298 10.58C15.4498 11.9 16.8498 12.75 18.3098 12.75C19.6398 12.75 20.8398 12.16 21.5898 11.12C22.1898 10.32 22.4598 9.31 22.3598 8.27Z"
                                fill="#7F56D9"
                              />
                              <path
                                opacity="0.6"
                                d="M6.59014 1.25C3.65014 1.25 2.29014 2.48 1.86014 5.53L1.59014 8.28C1.49014 9.35 1.78014 10.39 2.41014 11.2C3.17014 12.19 4.34014 12.75 5.64014 12.75C7.10014 12.75 8.50014 11.9 9.21014 10.6C9.47014 10.15 9.64014 9.63 9.69014 9.09L10.4701 1.26H6.59014V1.25Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M11.3501 16.66C10.0801 16.79 9.12012 17.87 9.12012 19.15V22.38H14.8701V19.5C14.8801 17.41 13.6501 16.42 11.3501 16.66Z"
                                fill="#7F56D9"
                              />
                            </svg>
                          ) : null}
                          Ecommerce
                        </span>
                        <button
                          onClick={() => this.enrollParticipants("ecommerce")}
                        >
                          {this.props.layoutTheme === "light" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 8H15M15 8L8 1M15 8L8 15"
                                stroke="#344054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </h5>
                      <p>
                        Analyze the most detailed insights about customer
                        behavior, preferences, and satisfaction for the
                        ecommerce service by conducting online surveys via
                        InsightsIQ.
                      </p>
                    </div>
                    <div className={classes.services__service}>
                      <h5>
                        <span>
                          {this.props.layoutTheme === "dark" ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                opacity="0.4"
                                d="M20.95 14.55L18.28 17.22L17.22 18.28L14.55 20.95C13.15 22.35 10.85 22.35 9.45002 20.95L6.78001 18.28L5.72001 17.22L3.05 14.55C1.65 13.15 1.65 10.85 3.05 9.45002L5.72001 6.78001L6.78001 5.72001L9.45002 3.05C10.85 1.65 13.15 1.65 14.55 3.05L17.22 5.72001L18.28 6.78001L20.95 9.45002C22.35 10.85 22.35 13.15 20.95 14.55Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M13.0602 12L18.2802 17.22L17.2202 18.28L12.0002 13.06L6.78021 18.28L5.72021 17.22L10.9402 12L5.72021 6.77997L6.78021 5.71997L12.0002 10.94L17.2202 5.71997L18.2802 6.77997L13.0602 12Z"
                                fill="#7F56D9"
                              />
                            </svg>
                          ) : null}
                          Product
                        </span>
                        <button
                          onClick={() => this.enrollParticipants("product")}
                        >
                          {this.props.layoutTheme === "light" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 8H15M15 8L8 1M15 8L8 15"
                                stroke="#344054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </h5>
                      <p>
                        Make sure that your future product will be a success in
                        the market before the launch, by gathering useful
                        feedback directly from the potential customers via
                        InsightsIQ.
                      </p>
                    </div>
                    <div className={classes.services__service}>
                      <h5>
                        <span>
                          {this.props.layoutTheme === "dark" ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                d="M3 9C4.10457 9 5 8.10457 5 7C5 5.89543 4.10457 5 3 5C1.89543 5 1 5.89543 1 7C1 8.10457 1.89543 9 3 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21 9C22.1046 9 23 8.10457 23 7C23 5.89543 22.1046 5 21 5C19.8954 5 19 5.89543 19 7C19 8.10457 19.8954 9 21 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M7.5 16.5V18.5C7.5 19.11 7.13 19.64 6.61 19.86C6.42 19.95 6.22 20 6 20H4C3.17 20 2.5 19.33 2.5 18.5V16.5C2.5 15.67 3.17 15 4 15H6C6.83 15 7.5 15.67 7.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21.5 16.5V18.5C21.5 19.33 20.83 20 20 20H18C17.78 20 17.58 19.95 17.39 19.86C16.87 19.64 16.5 19.11 16.5 18.5V16.5C16.5 15.67 17.17 15 18 15H20C20.83 15 21.5 15.67 21.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M15 5.5V8.5C15 9.32 14.32 10 13.5 10H10.5C9.68 10 9 9.32 9 8.5V5.5C9 4.68 9.68 4 10.5 4H13.5C14.32 4 15 4.68 15 5.5Z"
                                fill="#7F56D9"
                              />
                              <g opacity="0.4">
                                <path
                                  opacity="0.4"
                                  d="M9 6.25H5C4.59 6.25 4.25 6.59 4.25 7C4.25 7.41 4.59 7.75 5 7.75H7.57C5.52 9.27 4.25 11.79 4.25 14.5C4.25 14.7 4.26 14.89 4.29 15.09C4.33 15.47 4.66 15.75 5.03 15.75C5.06 15.75 5.09 15.75 5.12 15.75C5.53 15.7 5.83 15.33 5.78 14.92C5.76 14.78 5.76 14.65 5.76 14.51C5.76 11.91 7.17 9.50997 9.35 8.40997C9.72 8.21997 9.87 7.77002 9.68 7.40002C9.67 7.39002 9.66 7.38 9.66 7.37C9.72 7.26 9.77 7.14001 9.77 7.01001C9.75 6.59001 9.41 6.25 9 6.25Z"
                                  fill="#7F56D9"
                                />
                                <path
                                  opacity="0.4"
                                  d="M16.43 7.75H19C19.41 7.75 19.75 7.41 19.75 7C19.75 6.59 19.41 6.25 19 6.25H15C14.59 6.25 14.25 6.59 14.25 7C14.25 7.13 14.29 7.24999 14.36 7.35999C14.35 7.36999 14.34 7.38001 14.34 7.39001C14.15 7.76001 14.3 8.21002 14.67 8.40002C16.85 9.50002 18.26 11.9 18.26 14.5C18.26 14.64 18.25 14.77 18.24 14.91C18.19 15.32 18.49 15.69 18.9 15.74C18.93 15.74 18.96 15.74 18.99 15.74C19.37 15.74 19.69 15.46 19.73 15.08C19.75 14.88 19.77 14.69 19.77 14.49C19.75 11.79 18.48 9.27 16.43 7.75Z"
                                  fill="#7F56D9"
                                />
                              </g>
                            </svg>
                          ) : null}
                          Marketing Agencies
                        </span>
                        <button onClick={() => this.enrollParticipants("hr")}>
                          {this.props.layoutTheme === "light" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 8H15M15 8L8 1M15 8L8 15"
                                stroke="#344054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </h5>
                      <p>
                        Make your marketing agency the most viral in the area by
                        using insights from the online surveys for understanding
                        customer needs and demands, conducting market research
                        and building brand awareness.
                      </p>
                    </div>
                    <div className={classes.services__service}>
                      <h5>
                        <span>
                          {this.props.layoutTheme === "dark" ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                d="M3 9C4.10457 9 5 8.10457 5 7C5 5.89543 4.10457 5 3 5C1.89543 5 1 5.89543 1 7C1 8.10457 1.89543 9 3 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21 9C22.1046 9 23 8.10457 23 7C23 5.89543 22.1046 5 21 5C19.8954 5 19 5.89543 19 7C19 8.10457 19.8954 9 21 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M7.5 16.5V18.5C7.5 19.11 7.13 19.64 6.61 19.86C6.42 19.95 6.22 20 6 20H4C3.17 20 2.5 19.33 2.5 18.5V16.5C2.5 15.67 3.17 15 4 15H6C6.83 15 7.5 15.67 7.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21.5 16.5V18.5C21.5 19.33 20.83 20 20 20H18C17.78 20 17.58 19.95 17.39 19.86C16.87 19.64 16.5 19.11 16.5 18.5V16.5C16.5 15.67 17.17 15 18 15H20C20.83 15 21.5 15.67 21.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M15 5.5V8.5C15 9.32 14.32 10 13.5 10H10.5C9.68 10 9 9.32 9 8.5V5.5C9 4.68 9.68 4 10.5 4H13.5C14.32 4 15 4.68 15 5.5Z"
                                fill="#7F56D9"
                              />
                              <g opacity="0.4">
                                <path
                                  opacity="0.4"
                                  d="M9 6.25H5C4.59 6.25 4.25 6.59 4.25 7C4.25 7.41 4.59 7.75 5 7.75H7.57C5.52 9.27 4.25 11.79 4.25 14.5C4.25 14.7 4.26 14.89 4.29 15.09C4.33 15.47 4.66 15.75 5.03 15.75C5.06 15.75 5.09 15.75 5.12 15.75C5.53 15.7 5.83 15.33 5.78 14.92C5.76 14.78 5.76 14.65 5.76 14.51C5.76 11.91 7.17 9.50997 9.35 8.40997C9.72 8.21997 9.87 7.77002 9.68 7.40002C9.67 7.39002 9.66 7.38 9.66 7.37C9.72 7.26 9.77 7.14001 9.77 7.01001C9.75 6.59001 9.41 6.25 9 6.25Z"
                                  fill="#7F56D9"
                                />
                                <path
                                  opacity="0.4"
                                  d="M16.43 7.75H19C19.41 7.75 19.75 7.41 19.75 7C19.75 6.59 19.41 6.25 19 6.25H15C14.59 6.25 14.25 6.59 14.25 7C14.25 7.13 14.29 7.24999 14.36 7.35999C14.35 7.36999 14.34 7.38001 14.34 7.39001C14.15 7.76001 14.3 8.21002 14.67 8.40002C16.85 9.50002 18.26 11.9 18.26 14.5C18.26 14.64 18.25 14.77 18.24 14.91C18.19 15.32 18.49 15.69 18.9 15.74C18.93 15.74 18.96 15.74 18.99 15.74C19.37 15.74 19.69 15.46 19.73 15.08C19.75 14.88 19.77 14.69 19.77 14.49C19.75 11.79 18.48 9.27 16.43 7.75Z"
                                  fill="#7F56D9"
                                />
                              </g>
                            </svg>
                          ) : null}
                          Marketing
                        </span>
                        <button
                          onClick={() => this.enrollParticipants("marketing")}
                        >
                          {this.props.layoutTheme === "light" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 8H15M15 8L8 1M15 8L8 15"
                                stroke="#344054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </h5>
                      <p>
                        Use online surveys to gain a better understanding of the
                        target market, competitors, and industry trends of your
                        brand. By that, making more informed business decisions.
                      </p>
                    </div>
                    <div className={classes.services__service}>
                      <h5>
                        <span>
                          {this.props.layoutTheme === "dark" ? (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="mr-3"
                            >
                              <path
                                d="M3 9C4.10457 9 5 8.10457 5 7C5 5.89543 4.10457 5 3 5C1.89543 5 1 5.89543 1 7C1 8.10457 1.89543 9 3 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21 9C22.1046 9 23 8.10457 23 7C23 5.89543 22.1046 5 21 5C19.8954 5 19 5.89543 19 7C19 8.10457 19.8954 9 21 9Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M7.5 16.5V18.5C7.5 19.11 7.13 19.64 6.61 19.86C6.42 19.95 6.22 20 6 20H4C3.17 20 2.5 19.33 2.5 18.5V16.5C2.5 15.67 3.17 15 4 15H6C6.83 15 7.5 15.67 7.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M21.5 16.5V18.5C21.5 19.33 20.83 20 20 20H18C17.78 20 17.58 19.95 17.39 19.86C16.87 19.64 16.5 19.11 16.5 18.5V16.5C16.5 15.67 17.17 15 18 15H20C20.83 15 21.5 15.67 21.5 16.5Z"
                                fill="#7F56D9"
                              />
                              <path
                                d="M15 5.5V8.5C15 9.32 14.32 10 13.5 10H10.5C9.68 10 9 9.32 9 8.5V5.5C9 4.68 9.68 4 10.5 4H13.5C14.32 4 15 4.68 15 5.5Z"
                                fill="#7F56D9"
                              />
                              <g opacity="0.4">
                                <path
                                  opacity="0.4"
                                  d="M9 6.25H5C4.59 6.25 4.25 6.59 4.25 7C4.25 7.41 4.59 7.75 5 7.75H7.57C5.52 9.27 4.25 11.79 4.25 14.5C4.25 14.7 4.26 14.89 4.29 15.09C4.33 15.47 4.66 15.75 5.03 15.75C5.06 15.75 5.09 15.75 5.12 15.75C5.53 15.7 5.83 15.33 5.78 14.92C5.76 14.78 5.76 14.65 5.76 14.51C5.76 11.91 7.17 9.50997 9.35 8.40997C9.72 8.21997 9.87 7.77002 9.68 7.40002C9.67 7.39002 9.66 7.38 9.66 7.37C9.72 7.26 9.77 7.14001 9.77 7.01001C9.75 6.59001 9.41 6.25 9 6.25Z"
                                  fill="#7F56D9"
                                />
                                <path
                                  opacity="0.4"
                                  d="M16.43 7.75H19C19.41 7.75 19.75 7.41 19.75 7C19.75 6.59 19.41 6.25 19 6.25H15C14.59 6.25 14.25 6.59 14.25 7C14.25 7.13 14.29 7.24999 14.36 7.35999C14.35 7.36999 14.34 7.38001 14.34 7.39001C14.15 7.76001 14.3 8.21002 14.67 8.40002C16.85 9.50002 18.26 11.9 18.26 14.5C18.26 14.64 18.25 14.77 18.24 14.91C18.19 15.32 18.49 15.69 18.9 15.74C18.93 15.74 18.96 15.74 18.99 15.74C19.37 15.74 19.69 15.46 19.73 15.08C19.75 14.88 19.77 14.69 19.77 14.49C19.75 11.79 18.48 9.27 16.43 7.75Z"
                                  fill="#7F56D9"
                                />
                              </g>
                            </svg>
                          ) : null}
                          Startup & VC’s
                        </span>
                        <button
                          onClick={() => this.enrollParticipants("startup-vcs")}
                        >
                          {this.props.layoutTheme === "light" ? (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 8H15M15 8L8 1M15 8L8 15"
                                stroke="#344054"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 12H19M19 12L12 5M19 12L12 19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>
                      </h5>
                      <p>
                        Get direct validation and feedback from the audience for
                        your brand new startup product by researching gathered
                        insights via online surveys
                      </p>
                    </div>
                  </div>
                ) : this.state.page === "enroll-participants" ? (
                  <div className={classes.participants}>
                    <ErrorFeedback showFeedback={this.state.uploadCsvError} />
                    <div
                      className={classes["participants__enroll-participants"]}
                    >
                      <img src={RecruitParticipants} alt="" />
                      <h5>Recruit our participants....</h5>
                      <p>Start a new project to recruit quality participants</p>
                      <button
                        onClick={() =>
                          this.setState((state) => ({
                            ...state,
                            page: "studyConduct",
                            constructResearch: {
                              ...state.constructResearch,
                              targetUsersFrom: null,
                            },
                          }))
                        }
                      >
                        Start recruiting
                      </button>
                    </div>
                    <div
                      className={classes["participants__enroll-participants"]}
                    >
                      <img src={UploadParticipants} alt="" />
                      <h5>Do research with your own participants...</h5>
                      <p>Recruit, schedule, and track research automatically</p>
                      <button
                        onClick={() =>
                          this.setState((state) => ({
                            ...state,
                            uploadParticipantsModal: true,
                          }))
                        }
                      >
                        Start recruiting
                      </button>
                    </div>
                  </div>
                ) : this.state.page === "studyGroup" ? (
                  <div className={classes["study-groups"]}>
                    <h1>Which type of study group would you like to run?</h1>
                    <div className={classes["study-groups__row"]}>
                      <button
                        className={classes["study-groups__group"]}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            page: "studyConduct",
                          }));
                        }}
                      >
                        <img src={ChatRoom} alt="" />
                        <h5>Recruit our participants....</h5>
                        <p>
                          Start a new project to recruit quality participants
                        </p>
                      </button>
                      <button
                        className={classes["study-groups__group"]}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            page: "studyConduct",
                          }));
                        }}
                      >
                        <img src={StudyGroup2} alt="" />
                        <h5>Recruit our participants....</h5>
                        <p>
                          Start a new project to recruit quality participants
                        </p>
                      </button>
                      <button
                        className={classes["study-groups__group"]}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            page: "studyConduct",
                          }));
                        }}
                      >
                        <img src={Calendar} alt="" />
                        <h5>Recruit our participants....</h5>
                        <p>
                          Start a new project to recruit quality participants
                        </p>
                      </button>
                      <button
                        className={classes["study-groups__group"]}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            page: "studyConduct",
                          }));
                        }}
                      >
                        <img src={Checklist} alt="" />
                        <h5>Recruit our participants....</h5>
                        <p>
                          Start a new project to recruit quality participants
                        </p>
                      </button>
                    </div>
                  </div>
                ) : this.state.page === "studyConduct" ? (
                  <div className={classes["study-conduct"]}>
                    <SuccessFeedback
                      showFeedback={this.state.uploadCsvSuccess}
                      feedback={"csv file is uploaded"}
                    />

                    <h1>How will this study be conducted?</h1>
                    <div className={classes["study-conduct__row"]}>
                      <button
                        className={`${classes["study-conduct__way"]} ${
                          this.state.constructResearch.researchConductedVia ===
                          "survey app"
                            ? classes["study-conduct__way--active"]
                            : null
                        }`}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            constructResearch: {
                              ...state.constructResearch,
                              researchConductedVia: "survey app",
                            },
                          }));
                        }}
                      >
                        <img src={Survey} alt="" />
                        <h5>In App</h5>
                        <p>
                          research will be conducted via InsightsIQ mobile app
                        </p>
                      </button>
                      <button
                        className={`${classes["study-conduct__way"]} ${
                          this.state.constructResearch.researchConductedVia ===
                          "in person"
                            ? classes["study-conduct__way--active"]
                            : null
                        }`}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            constructResearch: {
                              ...state.constructResearch,
                              researchConductedVia: "in person",
                            },
                          }));
                        }}
                      >
                        <img src={PlaceMarker} alt="" />
                        <h5>In Person</h5>
                        <p>
                          Research will be conducted in a physical location in
                          face to face
                        </p>
                      </button>

                      <button
                        className={`${classes["study-conduct__way"]} ${
                          this.state.constructResearch.researchConductedVia ===
                          "via video"
                            ? classes["study-conduct__way--active"]
                            : null
                        }`}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            constructResearch: {
                              ...state.constructResearch,
                              researchConductedVia: "via video",
                            },
                          }));
                        }}
                      >
                        <img src={ApplicationWindow} alt="" />
                        <h5>Online via video</h5>
                        <p>Research will be conducted via video session</p>
                        <div className={classes["study-conduct__beta"]}>
                          Beta
                        </div>
                      </button>
                      <button
                        className={`${classes["study-conduct__way"]} ${
                          this.state.constructResearch.researchConductedVia ===
                          "over phone"
                            ? classes["study-conduct__way--active"]
                            : null
                        }`}
                        onClick={() => {
                          this.setState((state) => ({
                            ...state,
                            constructResearch: {
                              ...state.constructResearch,
                              researchConductedVia: "over phone",
                            },
                          }));
                        }}
                      >
                        <img src={Phone} alt="" />
                        <h5>Over the phone</h5>
                        <p>Research will be conducted via phone call</p>
                        <div className={classes["study-conduct__beta"]}>
                          Beta
                        </div>
                      </button>
                    </div>

                    <button
                      className={classes["study-conduct__btn"]}
                      onClick={this.toggleToCreateSurveyMode}
                    >
                      Create and continue{" "}
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66699 10.0001H16.3337M16.3337 10.0001L10.5003 4.16675M16.3337 10.0001L10.5003 15.8334"
                          stroke="white"
                          strokeWidth="1.67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
        <ParticipantsModal
          modalStatus={this.state.uploadParticipantsModal}
          loading={this.state.uploadParticipantsModalLoader}
          closeModal={(state, asset) => {
            if (state == "download" && asset == null) {
              this.setState((state) => ({
                ...state,
                uploadParticipantsModal: false,
                downloadCSVTemplateModal: true,
              }));
              return;
            } else if (asset == null) {
              this.setState((state) => ({
                ...state,
                uploadParticipantsModal: false,
              }));
              return;
            }
            this.setState((state) => ({
              ...state,
              uploadParticipantsModalLoader: true,
            }));
            const formData = new FormData();
            formData.append("csvFile", asset.csvFile);
            formData.append("fileName", asset.name);
            formData.append("company", this.state.company);
            axios
              .post(
                "https://backendapp.murmurcars.com/api/v1/surveys/user/insertExternalParticipants",
                formData
              )
              .then((response) => {
                this.setState((state) => ({
                  ...state,
                  uploadCsvSuccess: true,
                  uploadParticipantsModal: false,
                  page: "studyConduct",
                  constructResearch: {
                    ...state.constructResearch,
                    targetUsersFrom: this.state.company,
                  },
                  uploadParticipantsModalLoader: false,
                }));

                setTimeout(() => {
                  this.setState((state) => ({
                    ...state,
                    uploadCsvSuccess: false,
                  }));
                }, 3000);
              })
              .catch((err) => {
                this.setState((state) => ({
                  ...state,
                  uploadCsvError: true,
                  uploadParticipantsModal: false,
                  uploadParticipantsModalLoader: false,
                }));
                setTimeout(() => {
                  this.setState((state) => ({
                    ...state,
                    uploadCsvError: false,
                  }));
                }, 3000);
              });
          }}
          uploadCSV={this.uploadCSV}
          layoutTheme={this.props.layoutTheme}
        />

        <DownloadTemplate
          modalStatus={this.state.downloadCSVTemplateModal}
          closeModal={() => {
            this.setState((state) => ({
              ...state,
              downloadCSVTemplateModal: false,
              uploadParticipantsModal: true,
            }));
          }}
        />
      </Fragment>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};
export default connect(mapStatetoProps, null)(withRouter(Surveys));

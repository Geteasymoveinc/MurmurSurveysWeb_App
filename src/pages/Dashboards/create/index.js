import React from "react";
import { Component, Fragment } from "react";

import classes from "../../../assets/css/surveys/index.module.scss";

//questions
import LogoWhiteThemeQuestions from "../../../assets/images/LogoWhiteThemeQuestions.png";
import LogoWhiteTheme from "../../../assets/images/LogoWhiteTheme.png";
import Radio from "../../../assets/images/surveys/radio.svg";
import Upload from "../../../assets/images/surveys/upload.png";
import Trash from "../../../assets/images/surveys/trash.svg";
import Chevron_Down from "../../../assets/images/surveys/chevron-down.svg";
import Add_Icon from "../../../assets/images/surveys/add.svg";
import Gallery_Add from "../../../assets/images/surveys/gallery-add.svg";
import Edit from "../../../assets/css/CreateAd/ads-details/edit.svg";
import Info_Circle from "../../../assets/css/CreateAd/info-circle.svg";
import Info_Circle_White from "../../../assets/css/CreateAd/info-circle-white.svg";
import Option_Delete from "../../../assets/images/surveys/option-delete.svg";
import RecordVideo from "../../../assets/images/video.png";
import RecordAudio from "../../../assets/images/microphone.png";
import "../../../assets/css/surveys/antd.css";
import "../../../assets/css/common/css/spinner.scss";

//import SurveyQuestion from "./questions";
import SurveySettings from "./settings";
import SurveyAnalytics from "./analytics";
import SurveyAnswers from "./answers";
import Preview from "../preview";
import PullParticipants from "./pullParticipants";
import ResearchSetting from "./research-setting";

import { Upload as Upload_Antd } from "antd";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import {
  publish_survey,
  fetch_survey,
  fetch_map_position,
} from "../../../store/actions";

import { connect } from "react-redux";
//import { queryForEmail } from "../../../helpers/fakebackend_helper";

import LocationModal from "../../../components/location-modal";
import Profile from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import WebcamModal from "../../../components/modals/webcam";
import AudioRecorder from "../../../components/audio-recorder";
import AudioPlayer from "../../../components/audio-player";
import { WarningFeedback } from "../../../components/feedbacks";

import Geocode from "react-geocode";
Geocode.setApiKey(`${process.env.REACT_APP_GOOGLEMAPSKEY}`);

const { Dragger } = Upload_Antd;

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      //first: true,
      survey_id: "", 
      publish: true, //fetching from this.props.match.path survey production noolean 
      //publish: false,
      locationModal: false, //country, city modal
      recordVideoModal: false, //webcam
      recordAudio: false, //audio
      warningFeedback: false, //if u try publish without at least one question
      warning: null, //warning message
      email: sessionStorage.getItem("authUser"),
      menu: {  //navigation
        menu_item: "questions",
        preview: false,
      },
      form: { //app state
        survey_answers_questions: {
          //id: 0,
          survey: { //create question
            // main: true,
            count: this.props.survey.count + 1,
            isQuestion: true, //question or section(like container of conditional questions)
            isConditional: false, //not main question
            type: "radio",
            asset: {
              assetName: "",
              assetFile: {},
              assetUrl: "",
              assetType: "",
            },
            question: "",
            answers: {
              count: 1,
              options: {
                option_1: "Answer 1",
              },
            },
          },
          surveys: this.props.survey.survey_questions,  //all questions
        },
        survey_title_question_image: {  
          survey: {
            form_title: this.props.survey.survey_title,

            form_caption: this.props.survey.survey_caption,
            image: {
              image_url: this.props.survey.survey_image.image_url,
              image_file: this.props.survey.survey_image.image_file,
              image_name: this.props.survey.survey_image.image_name,
            },
          },
        },
        survey_price_amount: {
          survey: {
            price: 0.5,
            amount: 50,
            budget:
              this.props.subscription != null &&
              this.props.subscription.paymentStatus === "active"
                ? 25 - 25 * this.props.subscription.discount
                : 25,
          },
        },
      },
      activeBox: {
        //hovering: null,
        name: null, //box name like survey_price_amount survey_answer_questions
        uid: null, //uid of hovered active survey box (survey_questions main item)
        section: [], //main survey question might have more than one section linked to its options
        linkedSections: {}, //key is main survey option and value is section name
      },
      inform_danger: {
        survey_question: false,
      },

      urls: [] //assets to delete in backend
    };
    this.timeout = null;
    this.new_option = React.createRef(null);
  }

  componentDidUpdate(prevProps) {
  
    if (
      prevProps.survey.survey_questions.length !==
        this.props.survey.survey_questions.length ||
      this.props.survey.loading !== prevProps.survey.loading ||
      this.props.subscription !== prevProps.subscription
    ) {
      this.setState((state) => ({
        ...state,
        loading: false,
        form: {
          ...state.form,
          survey_answers_questions: {
            ...state.form.survey_answers_questions,
            survey: {
              ...state.form.survey_answers_questions.survey,
              count: this.props.survey.count + 1,
            },
            surveys: this.props.survey.survey_questions,
          },
          survey_title_question_image: {
            ...state.form.survey_title_question_image,
            survey: {
              ...state.form.survey_title_question_image.survey,
              form_title: this.props.survey.survey_title,
              form_caption: this.props.survey.survey_caption,
              image: {
                ...state.form.survey_title_question_image.survey.image,
                image_url: this.props.survey.survey_image.image_url,
                image_file: this.props.survey.survey_image.image_file,
                image_name: this.props.survey.survey_image.image_name,
              },
            },
          },
          survey_price_amount: {
            survey: {
              price: 0.5,
              amount: this.props.survey.survey_audience_number,
              //budget: +this.props.survey.survey_budget,
              budget:
                this.props.subscription != null &&
                this.props.subscription.paymentStatus === "active"
                  ? this.props.survey.survey_budget -
                    this.props.survey.survey_budget *
                      this.props.subscription.discount
                  : this.props.survey.survey_budget,
            },
          },
        },
      }));
    }
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

    const publish = this.props.match.path.includes("/publish-survey");

    document.body.classList.add("grey-background");

    this.props.fetch_survey(
      `https://backendapp.murmurcars.com/api/v1/surveys/survey/fetch-survey?survey_id=${survey_id}`
    );
    this.setState((state) => ({
      ...state,
      survey_id,
      publish,
    }));
    /* navigator.geolocation.getCurrentPosition(
        (position) => {
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
      );*/
  }

  //publish or update
  submitNewSurvey = async (event, survey_id, urls) => {
    event.preventDefault();

    const { form_caption, form_title, image } =
      this.state.form.survey_title_question_image.survey;
    const { image_file, image_name } = image;

    const { amount, budget } =
      this.state.form.survey_price_amount.survey;
    const { surveys } = this.state.form.survey_answers_questions;

    const { target_audience, survey_active, survey_specific } =
      this.props.survey;

    if (!surveys.length) {
      this.setState((state) => ({
        ...state,
        warningFeedback: true,
        warning: "Please create at least one question",
      }));
      setTimeout(() => {
        this.setState((state) => ({
          ...state,
          warningFeedback: false,
          warning: null,
        }));
      }, 3000);
      return;
    }
    const formData = new FormData();
    formData.append("survey_title", form_title);
    //formData.append("survey_earnings", price);
    formData.append("survey_budget", budget);
    formData.append("target_audience", JSON.stringify(target_audience));
    formData.append("survey_audience_count", amount);
    formData.append("photo", image_name);
    formData.append("survey_active", survey_active);
    formData.append("survey_specific", survey_specific);
    formData.append("survey_caption", form_caption);
    formData.append("file", image_file);
    formData.append(
      "researchConductedVia",
      this.props.survey.researchConductedVia
    );
    formData.append("targetUsersFrom", this.props.survey.targetUsersFrom);
    formData.append("research", this.props.survey.research);
    formData.append(
      "researcherContacts",
      JSON.stringify(this.props.survey.researcherContacts)
    );
    //formData.append("survey_title", survey_title);
    //formData.append("survey_earnings", survey_earnings);
    //formData.append("survey_budget", survey_budget);
    //formData.append("target_audience", JSON.stringify(target_audience));
    //formData.append("survey_audience_count", survey_audience_number);
    //formData.append("photo", JSON.stringify(survey_image.image_name));
    //formData.append("survey_active", JSON.stringify(survey_active));
    //formData.append("survey_caption", survey_caption);
    //formData.append("file", survey_image.image_file);
    //formData.append("survey_specific", JSON.stringify(survey_specific));
    //formData.append("country", country);
    formData.append("payment", JSON.stringify(this.props.survey.payment));

    const conditionals = [];
    const main = [];
    const sections = [];
    for (let question of surveys) {
      delete question.edit;
      if (question.isConditional && !question.isQuestion) {
        sections.push(question);
      } else if (question.isQuestion && question.isConditional) {
        conditionals.push(question);
      } else {
        main.push(question);
      }
    }
    for (let section of sections) {
      for (let conditional of conditionals) {
        if (conditional.link === section.uid) {
          delete conditional.link;
          section.questions.push(conditional);
        }
      }
    }

    const publish = [...main, ...sections];

    for (let survey of publish) {
      delete survey.asset.assetFile;
      formData.append("survey_questions", JSON.stringify(survey));
    }

    const backend = {};

    backend.url = `https://backendapp.murmurcars.com/api/v1/surveys/survey/update-survey/${survey_id}?paid=${this.props.survey.paid}&publish=${this.state.publish}`;
    //backend.url = `http://localhost:4000/api/v1/surveys/survey/update-survey/${survey_id}?paid=${this.props.survey.paid}&publish=${this.state.publish}`;
    backend.method = "PUT";
    backend.payment = this.props.survey.payment;
    backend.paid = this.props.survey.paid;
    backend.publish = this.state.publish;

    for await (let url of urls){
      axios
      .post(
        "https://stagingapp.murmurcars.com/api/v1/surveys/survey/delete-asset",
        { url }
      )
    }

    this.props.publish_survey({
      backend,
      data: formData,
      history: this.props.history,
    });
  };

  checkout = (survey_id) => {
    const { amount, budget } = this.state.form.survey_price_amount.survey;

    const backend = {};
    backend.url = `https://backendapp.murmurcars.com/api/v1/surveys/survey/handle-checkout/${survey_id}`;
    backend.method = "POST";
    backend.payment = this.props.survey.payment;
    backend.publish = true; // couse it is checkout
    this.props.publish_survey({
      backend,
      data: {
        budget,
        amount,
      },
      history: this.props.history,
    });
  };

  //settings

  handleReverseGeocode = ({ lat, lng }) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.plus_code.compound_code;
        const country = address
          .split(/\s|[,]/i)
          .filter((el) => el !== "")
          .at(-1)
          .trim();
        let city = address
          .split(/\s|[,]/i)
          .filter((el) => el !== "")
          .at(-2)
          .trim();

        if (country === "USA") {
          city = city === "Illinois" ? "Chicago" : "SF";
        }
        this.props.fetch_map_position(address, country, city, {
          lat,
          lng,
        });
      },
      (error) => {
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    );
  };

  changeLocation = (country, city) => {
    Geocode.fromAddress(`${country}, ${city}`)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const center = {
          lat,
          lng,
        };
        this.setState({
          ...this.state,
          locationModal: false,
        });
        this.props.fetch_map_position(
          `${country}, ${city}`,
          country,
          city,
          center
        );
      })
      .catch((err) => {
        console.log("network error");
      });
  };

  //questions
  changeCreatedQuestionsInputType = (e, i) => {
    const input_type = e.target.value;

    const { surveys } = this.state.form.survey_answers_questions;

    const Surveys = [...surveys];
    const left = Surveys.slice(0, i);
    const right = Surveys.slice(i + 1, Surveys.length);

    const selectedSurvey = Surveys.at(i);
    selectedSurvey.type = input_type;
    this.setState((state) => ({
      ...state,
      form: {
        ...state.form,
        survey_answers_questions: {
          ...state.form.survey_answers_questions,
          surveys: [...left, selectedSurvey, ...right],
        },
      },
    }));
    this.props.updateQuestions(selectedSurvey, false);
  };

  handleDragEnd = (result) => {
    const destin_id = result.destination.index;
    const source_id = result.source.index;

    const surveys = [...this.state.form.survey_answers_questions.surveys];

    const dragged_item = { ...surveys[source_id] };
    const destination_item = surveys[destin_id];

    /*const sourceIsSection = dragged_item.isSection;
  const destinationIsQuestion = destination_item.isQuestion;

  let questions = [];

  if (sourceIsSection && destinationIsQuestion) {
    questions = [...dragged_item.questions];
    const question = destination_item;
    destin_id < source_id
      ? questions.push(question)
      : (questions = questions.filter(
          (el) => el.question !== question.question
        ));

    ("questions", questions);
    dragged_item.questions = questions;
  } else if (!sourceIsSection && !destinationIsQuestion) {
    questions = [...destination_item.questions];
    const question = dragged_item;

    source_id < destin_id
      ? questions.push(question)
      : (questions = questions.filter(
          (el) => el.question !== question.question
        ));
    ("questions", questions);
    destination_item.questions = questions;
  }
*/

    surveys[source_id] = destination_item;
    surveys[destin_id] = dragged_item;

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          surveys,
        },
      },
    });
  };
  //drag and drop

  toggleToInputState = (type, input) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [type]: {
          ...this.state.form[type],
          [input]: true,
        },
      },
    });
  };
  togleFromInputState = (type, input) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [type]: {
          ...this.state.form[type],
          [input]: false,
        },
      },
    });
  };

  /*addInformationToSurvey = (type, segment) => {
  /*if (type === "price") {
    const { price, amount, budget } =
      this.state.form.survey_price_amount.survey;
    const input = {};
    if (amount < 50) {
      this.props.add_price({ price: 0.5, amount: 50, budget: 50 * 0.5 });
      input.price = 0.5;
      input.budget = 50 * 0.5;
      input.amount = 50;
    } else {
      this.props.add_price({ price, amount, budget });
    }
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [segment]: {
          ...this.state.form[segment],
          input: false,
          survey: {
            ...this.state.form[segment].survey,
            ...input,
          },
        },
      },
    });
    return;
  } 
    const { image, form_caption, form_title } =
      this.state.form.survey_title_question_image.survey;
    this.props.add_title({
      image: {
        name: image.image_name,
        file: image.image_file,
        url: image.image_url,
      },
      title: form_title,
      caption: form_caption,
    });
  

  this.setState({
    ...this.state,
    form: {
      ...this.state.form,
      [segment]: {
        ...this.state.form[segment],
        input: false,
      },
    },
  });
};*/
  onSurveyImageUpload = (info) => {
    const reader = new FileReader();
    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          survey_title_question_image: {
            ...this.state.form.survey_title_question_image,
            survey: {
              ...this.state.form.survey_title_question_image.survey,
              image: {
                image_url: e.target.result,
                image_file: info.file,
                image_name: info.file.name,
              },
            },
          },
        },
      });
    };
  };
  onSurveyQuestionCretiveUpload = (info) => {
    const reader = new FileReader();
    const asset = {
      assetName: "",
      assetFile: {},
      assetUrl: "",
      assetType: "",
    };

    reader.readAsDataURL(info.file);

    reader.onload = (e) => {
      asset.assetFile = info.file;
      asset.assetUrl = e.target.result;
      asset.assetName = info.file.name;
      asset.assetType = info.file.type;

      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          survey_answers_questions: {
            ...this.state.form.survey_answers_questions,
            survey: {
              ...this.state.form.survey_answers_questions.survey,
              asset,
            },
          },
        },
      });
    };
  };

  uploadSurveyAssetToServer = (asset, uid) => {
    const form = new FormData();
    form.append("file", asset.assetFile);
    form.append("assetName", asset.assetName);

    axios
      .post(
        "https://stagingapp.murmurcars.com/api/v1/surveys/survey/upload-asset",
        form
      )
      .then((response) => {
        const surveys = this.state.form.survey_answers_questions.surveys;
        
        const index = surveys.findIndex((el) => el.uid === uid);
        const survey = surveys.at(index);

        //survey.asset = asset
        survey.asset.assetUrl = response.data.url;

        delete survey.asset.status;

        const left = surveys.slice(0, index);
        const right = surveys.slice(index + 1, surveys.length);

        this.setState((state) => ({
          ...state,
          form: {
            ...state.form,
            survey_answers_questions: {
              ...state.form.survey_answers_questions,
              surveys: [...left, survey, ...right],
            },
          },
        }));
      })
      .catch((err) => console.log(err));
  };

  removeSurveyAsset = (url, index, stateChange) => {

        if (!stateChange) return;
        const surveys = this.state.form.survey_answers_questions.surveys;
        //const index = surveys.findIndex((el) => el.uid === uid);
        const survey = surveys.at(index);
        survey.asset.assetUrl = "";

        const left = surveys.slice(0, index);
        const right = surveys.slice(index + 1, surveys.length);

        this.setState((state) => ({
          ...state,
          form: {
            ...state.form,
            survey_answers_questions: {
              ...state.form.survey_answers_questions,
              surveys: [...left, survey, ...right],
            },
          },

          urls:[...state.urls, url]
        }));

  };

  getUserInput = (e, segment, type) => {
    let value = e.target.value;
    let rate = 0.5;
    if (segment === "survey_price_amount") {
      value = Number.parseInt(value.trim());
    }

    if (Number.isNaN(value) && segment === "survey_price_amount") {
      value = "";
    }

    const input = {
      [type]: value,
    };

    if (segment === "survey_price_amount") {
      input.price = rate;
      input.budget = +Number(rate * value).toFixed(2);
    }

    if (
      this.props.subscription != null &&
      this.props.subscription.paymentStatus === "active"
    ) {
      input.budget =
        input.budget - input.budget * this.props.subscription.discount;
    }

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [segment]: {
          ...this.state.form[segment],
          survey: {
            ...this.state.form[segment].survey,
            ...input,
          },
        },
      },
    });
  };
  addNewOptionToCreatedQuetion = (i) => {
    const value =
      this.new_option.current != null && this.new_option.current.value
        ? this.new_option.current.value
        : null;
    if (value == null) return;
    const { surveys } = this.state.form.survey_answers_questions;

    const Surveys = [...surveys];
    const left = Surveys.slice(0, i);
    const right = Surveys.slice(i + 1, Surveys.length);

    const selectedSurvey = Surveys.at(i);
    selectedSurvey.answers.push(value);
    this.setState((state) => ({
      ...state,
      form: {
        ...state.form,
        survey_answers_questions: {
          ...state.form.survey_answers_questions,
          surveys: [...left, selectedSurvey, ...right],
        },
      },
    }));
    document.getElementById("add-new-option").value = "";
  };
  //creating options
  createAnOption = (event, option) => {
    const value = event.target.value;
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          survey: {
            ...this.state.form.survey_answers_questions.survey,
            answers: {
              ...this.state.form.survey_answers_questions.survey.answers,
              options: {
                ...this.state.form.survey_answers_questions.survey.answers
                  .options,
                [option]: value,
              },
            },
          },
        },
      },
    });
  };

  //storing in state users input (new question-answers) type and setera
  handleCreateQuestion = (event, parent, type) => {
    const value = event.target.value;

    this.setState((state) => ({
      ...state,
      inform_danger: {
        ...state.inform_danger,
        survey_question: false,
      },
      form: {
        ...state.form,
        [parent]: {
          ...state.form[parent],
          survey: {
            ...state.form[parent].survey,
            [type]: value,
          },
        },
      },
    }));
  };

  handleInputTypeSelected = (e) => {
    const value = e.target.value;

    this.setState((state) => ({
      ...state,
      inform_danger: {
        ...state.inform_danger,
        survey_question: false,
      },
      form: {
        ...state.form,
        survey_answers_questions: {
          ...state.form.survey_answers_questions,
          survey: {
            ...state.form.survey_answers_questions.survey,
            type: value,
            answers: {
              ...state.form.survey_answers_questions.survey.answers,
              count: 1,
              options: {
                option_1: "Answer 1",
              },
            },
          },
        },
      },
    }));
  };

  //create new survey question
  addNewQuestionAnswer = (isSection) => {
    const { survey, surveys } = this.state.form.survey_answers_questions;

    const { image, question, answers, type, isConditional, count, asset } =
      survey;
    if (!question.length) {
      this.setState({
        ...this.state,
        inform_danger: {
          ...this.state.inform_danger,
          survey_question: true,
        },
      });
      return;
    }
    if (asset.assetUrl) {
      this.uploadSurveyAssetToServer(asset, count);
      asset.status = "uploading";
    } else {
      asset.assetUrl = null;
      asset.assetType = null;
      asset.assetName = null;
      delete asset.assetFile;
    }

    const options = Object.values(answers.options);
    const newQuestion = {
      question,
      answers: options,
      type,
      isQuestion: true,
      isConditional,
      uid: count,
      edit: false,
      //selectSection: false,
      asset,
    };
    if (isSection) {
      newQuestion["isQuestion"] = false;
      newQuestion["isConditional"] = true;
      newQuestion["questions"] = [];
      newQuestion["section_name"] = "Section name";
      newQuestion["link"] = null;
      delete newQuestion["image"];
      delete newQuestion["question"];
      delete newQuestion["answers"];
      delete newQuestion["type"];
    }

    this.setState((state) => ({
      ...state,
      recordAudio: false,
      form: {
        ...state.form,

        survey_answers_questions: {
          ...state.form.survey_answers_questions,
          survey: {
            //important: true,
            ...state.form.survey_answers_questions.survey,
            count: state.form.survey_answers_questions.survey.count + 1,
            isQuestion: true,
            isConditional: false,
            type: "radio",
            asset: {
              assetUrl: "",
              assetFile: {},
              assetType: "",
            },
            question: "",
            answers: {
              count: 1,
              options: {
                option_1: "Answer 1",
              },
            },
          },
          surveys: [...surveys, newQuestion],
        },
      },
    }));
  };
  deleteCreatedSurvey = (index) => {
    const { surveys } = this.state.form.survey_answers_questions;

    const left = surveys.slice(0, index);
    const right = surveys.slice(index + 1, surveys.length);

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          id: this.state.form.survey_answers_questions.id--,
          surveys: [...left, ...right],
        },
      },
    });
  };
  addNewAnswerOption = () => {
    let count = this.state.form.survey_answers_questions.survey.answers.count;

    const form = this.state.form;
    form.survey_answers_questions.survey.answers.count = count + 1;
    form.survey_answers_questions.survey.answers.options[
      `option_${count + 1}`
    ] = `Answer ${count + 1}`;
    this.setState({
      ...this.state,
      form: {
        ...form,
      },
    });
  };

  removeOption = () => {
    const options = {
      ...this.state.form.survey_answers_questions.survey.answers.options,
    };

    const keys = Object.keys(options);
    delete options[keys[keys.length - 1]];

    this.setState((state) => ({
      ...state,
      form: {
        ...state.form,
        survey_answers_questions: {
          ...state.form.survey_answers_questions,
          survey: {
            ...state.form.survey_answers_questions.survey,
            answers: {
              ...state.form.survey_answers_questions.survey.answers,
              count:
                state.form.survey_answers_questions.survey.answers.count - 1,
              options,
            },
          },
        },
      },
    }));
  };

  returnAnswerOptions = () => {
    const { survey, input } = this.state.form.survey_answers_questions;
    const { answers, type } = survey;
    const answers_array = [];
    let htmlElement = [];
    if (type !== "text") {
      for (let i = 0; i < answers.count; i++) {
        let htmlElement = (
          <span key={i}>
            {i === answers.count - 1 ? (
              <img
                src={Option_Delete}
                alt=""
                className={classes.option_delete}
                onClick={() => this.removeOption(i)}
              />
            ) : null}

            {input && type !== "dropdown" ? (
              <input
                type="text"
                className={classes.input_option}
                value={answers.options[`option_${i + 1}`]}
                onChange={(event) => {
                  this.createAnOption(event, `option_${i + 1}`);
                }}
              />
            ) : type === "dropdown" ? (
              <span className={classes.dropdown_option}>
                <span className={classes.dropdown_option_counter}>
                  {i + 1}.
                </span>
                {!input ? (
                  answers.options[`option_${i + 1}`]
                ) : (
                  <input
                    type="text"
                    className={classes.input_option}
                    // value={answers.options[`option_${i + 1}`]}
                    onChange={(event) => {
                      this.createAnOption(event, `option_${i + 1}`);
                    }}
                  />
                )}
              </span>
            ) : (
              <label htmlFor="answer">
                {answers.options[`option_${i + 1}`]}
              </label>
            )}
          </span>
        );
        answers_array.push(htmlElement);
      }
    } else {
      htmlElement = (
        <span key="1">
          <input
            className={`${type === "text" && classes.survey_input} ${
              type === "text" && classes.survey_input_2
            }`}
            onChange={(event) => {
              this.createAnOption(event, `option_1`);
            }}
            placeholder="Type your short answer"
          />
        </span>
      );

      answers_array.push(htmlElement);
    }

    return answers_array;
  };
  toggleSurveyImportance = (e) => {
    const isConditional = !e.target.checked; //true is important false conditional

    const survey = {
      ...this.state.form.survey_answers_questions.survey,
      isConditional,
    };

    if (isConditional) {
      survey.link = null;
    }

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          survey,
        },
      },
    });
  };
  toggleCurrentSurveysImportance = (e, i) => {
    const isConditional = !e.target.checked; //true is important false conditional
    let { surveys } = this.state.form.survey_answers_questions;

    const left = surveys.slice(0, i);
    const right = surveys.slice(i + 1, surveys.length);
    const survey = { ...surveys[i] };
    survey.isConditional = isConditional;
    if (isConditional) {
      survey.link = null;
    }

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          surveys: [...left, survey, ...right],
        },
      },
    });
  };
  editSurvey = (index, activeBoxUpdate) => {
    const { surveys } = this.state.form.survey_answers_questions;
    let Surveys = [...surveys];
    Surveys[index].edit = !Surveys[index].edit;

    this.setState((state) => {
      if (activeBoxUpdate) {
        state.activeBox = {
          ...state.activeBox,
          name: null,
          section: null,
        };
      }
      return {
        ...state,
        form: {
          ...state.form,
          survey_answers_questions: {
            ...state.form.survey_answers_questions,
            surveys: [...Surveys],
          },
        },
      };
    });
  };

  surveyInputValueChange = (e, index, option) => {
    //survey question name and options name change fn
    const value = e.target.value;

    const { surveys } = this.state.form.survey_answers_questions;

    let Surveys = [...surveys];

    if (option || option === 0) {
      //if option exists then it is survey question's option
      Surveys[index].answers[option] = value;
    } else {
      Surveys[index].question = value; //survey question change
    }

    //this.props.updateQuestions(Surveys[index], false)
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          surveys: [...Surveys],
        },
      },
    });
  };

  deleteOptionFromSurveyQuestion = (survey, option) => {
    const { surveys } = this.state.form.survey_answers_questions;

    let Surveys = [...surveys];

    const options = Surveys[survey].answers;

    const left = options.slice(0, option);
    const right = options.slice(option + 1, options.length);

    Surveys[survey].answers = [...left, ...right];

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        survey_answers_questions: {
          ...this.state.form.survey_answers_questions,
          surveys: [...Surveys],
        },
      },
    });
  };

  addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    //const audio = document.createElement("audio");
    ///audio.src = url;
    //audio.controls = true;
    //document.body.appendChild(audio);

    this.setState((state) => ({
      ...state,
      recordedAudioUrl: url,
    }));
  };

  render() {
    const {
      menu,
      locationModal,
      loading,
      form,
      activeBox,
      inform_danger,
      survey_id,
      urls
    } = this.state;

    const { menu_item, preview: preview_mode } = menu;

    const {
      survey_title_question_image,
      survey_answers_questions,
      survey_price_amount,
    } = form;
    const { survey_question } = inform_danger;
    const { survey: create_title_caption } = survey_title_question_image;
    const { survey: price_amount } = survey_price_amount;
    const { amount, budget } = price_amount;
    let {
      survey: create_answers_questions,
      input,
      surveys,
    } = survey_answers_questions;

    const { asset: expamle_asset, answers } = create_answers_questions;
    let {
      form_title,
      form_caption,
      image: create_title_caption_image,
    } = create_title_caption;

    const {
      type: type_dev,
      isConditional,
      isQuestion,
    } = create_answers_questions;

    const { survey } = this.props;

    const { response: analytics } = survey;

    

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
            <WarningFeedback
              showFeedback={this.state.warningFeedback}
              feedback={this.state.warning}
            />
            <header className={`${classes.header} ${classes.main}`}>
              <div className={classes.mur_contain}>
                <a href="#" className={classes.logo}>
                  <img
                    src={
                      this.props.layoutTheme === "light"
                        ? LogoWhiteThemeQuestions
                        : LogoWhiteTheme
                    }
                    alt="logo"
                  />
                </a>
              </div>
              <div
                className={`${classes.menu_self_flex} ${
                  analytics.length ? classes.update : null
                }`}
              >
                <div
                  className={`${classes.menu_flex} ${
                    analytics.length ? classes.update : null
                  }`}
                >
                  <div className={classes.button_containers}>
                    <Link to={`/`}>Main</Link>
                  </div>

                  <div className={classes.button_containers}>
                    <button
                      onClick={() => this.togleMenuItem("research")}
                      className={` ${
                        menu_item === "research" ? classes.active : null
                      }`}
                    >
                      Research
                    </button>
                    <span
                      className={`${
                        menu_item === "research" ? classes.border_active : null
                      }`}
                    ></span>
                  </div>
                  <div className={classes.button_containers}>
                    {" "}
                    <button
                      onClick={() => this.togleMenuItem("questions")}
                      className={`${
                        menu_item === "questions" ? classes.active : null
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

                  {analytics.length ? (
                    <div className={classes.button_containers}>
                      <button
                        onClick={() => this.togleMenuItem("analytics")}
                        className={`${
                          menu_item === "analytics" ? classes.active : null
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

                  {false ? (
                    <div className={classes.button_containers}>
                      <button
                        onClick={() => this.togleMenuItem("answers")}
                        className={` ${
                          menu_item === "answers" ? classes.active : null
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
                      className={` ${
                        menu_item === "settings" ? classes.active : null
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
                  {this.props.survey.targetUsersFrom !== "murmur" ? (
                    <div className={classes.button_containers}>
                      <button
                        onClick={() => this.togleMenuItem("participants")}
                        className={`${
                          menu_item === "participants" ? classes.active : null
                        }`}
                      >
                        Users
                      </button>
                      <span
                        className={`${
                          menu_item === "participants"
                            ? classes.border_active
                            : null
                        }`}
                      ></span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className={classes.dash_relative}>
                <div className={`${classes.search_box_flex}`}>
                  <form
                    onSubmit={(event) => this.submitNewSurvey(event, survey_id, urls)}
                  >
                    {this.state.publish || this.props.paid ? null : (
                      <button
                        className={`${classes.publish_survey} mr-3`}
                        onClick={() => this.checkout(survey_id)}
                      >
                        <span>Checkout</span>
                      </button>
                    )}
                    <button className={classes.publish_survey} type="submit">
                      <span>{`${
                        this.state.publish ? "Publish" : "Update"
                      }`}</span>
                    </button>
                  </form>
                  <Profile scope="survey" />
                </div>
              </div>
            </header>

            {!preview_mode && menu_item === "questions" && (
              <div className={classes.grid_container}>
                <div className={classes.left_container}>
                  <div
                    className={`${classes.survey_amount_price} ${
                      activeBox.name === "survey_price_amount" && classes.active
                    }`}
                    onMouseEnter={() => {
                      this.setState((state) => ({
                        ...state,
                        activeBox: {
                          name: "survey_price_amount",
                        },
                      }));
                    }}
                    onMouseLeave={() => {
                      const { price, amount, budget } =
                        this.state.form.survey_price_amount.survey;
                      const input = { price, amount, budget };
                      if (amount < 50) {
                        input.price = 0.5;
                        input.budget = 50 * 0.5;
                        input.amount = 50;
                      }
                      this.setState((state) => ({
                        ...state,
                        form: {
                          ...state.form,
                          survey_price_amount: {
                            ...state.form.survey_price_amount,
                            survey: {
                              ...input,
                            },
                          },
                        },
                        activeBox: {
                          name: null,
                        },
                      }));
                    }}
                  >
                    <div className={classes.survey_amount_price_subc}>
                      <div>
                        <h6>Cost of survey:</h6>
                        <p>{budget}</p>
                      </div>
                      <div>
                        <h6>Number of people:</h6>

                        {activeBox.name === "survey_price_amount" ? (
                          <input
                            type="number"
                            min="0"
                            style={{ pointerEvents: "all" }}
                            className={classes.survey_amount_price_input}
                            value={amount}
                            onChange={(e) =>
                              this.getUserInput(
                                e,
                                "survey_price_amount",
                                "amount"
                              )
                            }
                          />
                        ) : (
                          <p>{amount}</p>
                        )}
                        <div className={classes.foreground} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.flex_container}>
                  <div className={`${classes.flexbox}`}>
                    <div
                      className={`${classes.title_image_container} ${
                        activeBox.name === "survey_title_question_image"
                          ? classes.active
                          : null
                      }`}
                    >
                      <div
                        className={classes.title_image_subcontainer}
                        onMouseEnter={() => {
                          this.setState((state) => ({
                            ...state,
                            activeBox: {
                              name: "survey_title_question_image",
                            },
                          }));
                        }}
                        onMouseLeave={() => {
                          this.setState((state) => ({
                            ...state,
                            activeBox: {
                              name: null,
                            },
                          }));
                        }}
                      >
                        <div
                          className={`image-dragger ${classes.image_and_title}`}
                        >
                          <Dragger
                            listType="picture-card"
                            openFileDialogOnClick={true}
                            showUploadList={false}
                            beforeUpload={() => false}
                            className="profil_img_edit"
                            onChange={(info) => this.onSurveyImageUpload(info)}
                          >
                            {/*} <Profile scope={"local"} />*/}
                            <div className={classes.profil_cover}>
                              <img
                                src={
                                  create_title_caption_image.image_name
                                    ? create_title_caption_image.image_url
                                    : Upload
                                }
                                className={classes.profil_cover_img}
                              />
                            </div>
                          </Dragger>
                        </div>
                        <div className={classes.title_and_caption}>
                          {activeBox.name === "survey_title_question_image" ? (
                            <input
                              type="text"
                              className={`${classes.survey_input} ${classes.bottom_border} ${classes.extra_bottom_margin}`}
                              placeholder={form_title}
                              onChange={(e) => {
                                this.getUserInput(
                                  e,
                                  "survey_title_question_image",
                                  "form_title"
                                );
                              }}
                            />
                          ) : (
                            <h4>{form_title}</h4>
                          )}
                          {activeBox.name === "survey_title_question_image" ? (
                            <input
                              type="text"
                              className={`${classes.survey_input} ${classes.bottom_border}`}
                              placeholder={form_caption}
                              onChange={(e) => {
                                this.getUserInput(
                                  e,
                                  "survey_title_question_image",
                                  "form_caption"
                                );
                              }}
                            />
                          ) : (
                            <p>{form_caption}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/*surveys */}
                    <DragDropContext onDragEnd={this.handleDragEnd}>
                      <Droppable droppableId="surveys">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes.dragable_container}
                          >
                            {surveys.length > 0 &&
                              surveys.map((survey, i) => {
                                return (
                                  <Draggable
                                    key={i}
                                    index={i}
                                    draggableId={`${i}`}
                                  >
                                    {(provided) => (
                                      <div
                                        {...provided.dragHandleProps}
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                        className={`${
                                          classes["survey-question"]
                                        } ${
                                          activeBox.name ===
                                          `survey_created_input_${i}`
                                            ? classes.active
                                            : null
                                        } ${
                                          survey.isConditional &&
                                          survey.isQuestion
                                            ? classes["active--conditional"]
                                            : null
                                        }`}
                                        //style={{borderLeft: survey.isConditional ? '2px solid red' : 'transparent'}}
                                      >
                                        {/*container for survey*/}

                                        {!survey.isQuestion ? (
                                          <div
                                            className={classes.question_answer}
                                            onMouseEnter={() => {
                                              this.setState((state) => ({
                                                ...state,
                                                activeBox: {
                                                  name: `survey_created_input_${i}`,
                                                  uid: survey.uid,
                                                },
                                              }));
                                            }}
                                            onMouseLeave={() => {
                                              if (survey.edit) {
                                                this.editSurvey(i, true);
                                              } else {
                                                this.setState((state) => ({
                                                  ...state,
                                                  activeBox: {
                                                    name: null,
                                                  },
                                                }));
                                              }
                                            }}
                                            id={i}
                                          >
                                            <input
                                              type="text"
                                              value={survey.section_name}
                                              className={
                                                classes.survey_question
                                              }
                                              onChange={(e) => {
                                                const value = e.target.value;
                                                const surveys =
                                                  this.state.form
                                                    .survey_answers_questions
                                                    .surveys;
                                                const left = surveys.slice(
                                                  0,
                                                  i
                                                );
                                                const right = surveys.slice(
                                                  i + 1,
                                                  surveys.length
                                                );
                                                const survey = {
                                                  ...surveys[i],
                                                };
                                                survey.section_name = value;

                                                this.setState((state) => ({
                                                  ...state,
                                                  form: {
                                                    ...state.form,
                                                    survey_answers_questions: {
                                                      ...state.form
                                                        .survey_answers_questions,
                                                      surveys: [
                                                        ...left,
                                                        survey,
                                                        ...right,
                                                      ],
                                                    },
                                                  },
                                                }));
                                              }}
                                            />
                                            {survey.edit ? (
                                              <span
                                                className={
                                                  classes.question_answers_container
                                                }
                                              >
                                                {surveys
                                                  .filter(
                                                    (el) =>
                                                      el.isConditional &&
                                                      el.isQuestion &&
                                                      (el.link == null ||
                                                        el.link === survey.uid)
                                                  )
                                                  .map((el, n) => (
                                                    <span
                                                      className={
                                                        classes.question_answer_span
                                                      }
                                                      key={el.count}
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        name={el.uid}
                                                        id={el.uid}
                                                        checked={
                                                          survey.uid === el.link
                                                        }
                                                        onChange={(e) => {
                                                          const checked =
                                                            e.target.checked;

                                                          const index =
                                                            surveys.findIndex(
                                                              (question) =>
                                                                question.uid ===
                                                                el.uid
                                                            ); //index of a cond question

                                                          const question =
                                                            surveys.at(index);

                                                          question.link =
                                                            checked
                                                              ? survey.uid
                                                              : null;

                                                          /*question.isConditional =
                                                 checked;*/

                                                          /*checked
                                                 ? section.questions.push(
                                                     el.uid
                                                   )
                                                 : (section.questions =
                                                     section.questions.filter(
                                                       (uid) =>
                                                         el.uid !==
                                                          uid
                                                     ));*/

                                                          //this.props.updateQuestions(question, false)

                                                          const left =
                                                            surveys.slice(
                                                              0,
                                                              index
                                                            );
                                                          const right =
                                                            surveys.slice(
                                                              index + 1,
                                                              surveys.length
                                                            );

                                                          this.setState(
                                                            (state) => ({
                                                              ...state,
                                                              form: {
                                                                ...state.form,
                                                                survey_answers_questions:
                                                                  {
                                                                    ...state
                                                                      .form
                                                                      .survey_answers_questions,
                                                                    surveys: [
                                                                      ...left,
                                                                      question,
                                                                      ...right,
                                                                    ],
                                                                  },
                                                              },
                                                            })
                                                          );
                                                        }}
                                                      />

                                                      <label htmlFor={el.uid}>
                                                        {" "}
                                                        {el.question}
                                                      </label>
                                                    </span>
                                                  ))}
                                              </span>
                                            ) : null}
                                            {activeBox.name ===
                                            `survey_created_input_${i}` ? (
                                              <div
                                                className={
                                                  classes.question_answer_setting_flex_end
                                                }
                                              >
                                                <div
                                                  className={
                                                    classes.survey_trash
                                                  }
                                                >
                                                  <img
                                                    src={Edit}
                                                    alt=""
                                                    onClick={() =>
                                                      this.editSurvey(i)
                                                    }
                                                  />
                                                  <img
                                                    src={Trash}
                                                    alt=""
                                                    onClick={() =>
                                                      this.deleteCreatedSurvey(
                                                        i
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            ) : null}
                                          </div>
                                        ) : (
                                          <div
                                            className={classes.question_answer}
                                            onMouseEnter={() => {
                                              const sections = surveys.filter(
                                                (el) => !el.isQuestion
                                              );
                                              const linkedSections =
                                                sections.filter(
                                                  (el) =>
                                                    el.link != null &&
                                                    el.link.question ===
                                                      survey.question
                                                );
                                              const links = {};
                                              //linked sections to this main question
                                              for (let section of linkedSections) {
                                                for (let answer of survey.answers) {
                                                  if (
                                                    section.link.option ===
                                                    answer
                                                  ) {
                                                    links[answer] = //setting each option as key and section name as value
                                                      section.section_name;
                                                  }
                                                }
                                              }
                                              this.setState((state) => ({
                                                ...state,
                                                activeBox: {
                                                  name: `survey_created_input_${i}`,
                                                  section: linkedSections.length
                                                    ? linkedSections
                                                    : null,
                                                  uid: survey.uid,
                                                  linkedSections: links,
                                                },
                                              }));
                                            }}
                                            onMouseLeave={() => {
                                              if (survey.edit) {
                                                this.editSurvey(i, true);
                                              } else {
                                                this.setState((state) => ({
                                                  ...state,
                                                  activeBox: {
                                                    name: null,
                                                    section: null,
                                                  },
                                                }));
                                              }
                                            }}
                                            id={survey.id}
                                          >
                                            {/*image*/}
                                            {survey.asset.assetUrl ? (
                                              <div
                                                className={`${classes.survey_asset_container}`}
                                              >
                                                {survey.asset.assetType.includes(
                                                  "image"
                                                ) ? (
                                                  <img
                                                    src={survey.asset.assetUrl}
                                                    alt="survey question image"
                                                    className={` ${
                                                      classes.survey_img
                                                    } ${
                                                      survey.asset.status
                                                        ? classes.uploading
                                                        : null
                                                    }`}
                                                  />
                                                ) : survey.asset.assetType.includes(
                                                    "video"
                                                  ) ? (
                                                  <video
                                                    controls
                                                    className={` ${
                                                      classes.survey_img
                                                    } ${
                                                      survey.asset.status
                                                        ? classes.uploading
                                                        : null
                                                    }`}
                                                  >
                                                    <source
                                                      src={
                                                        survey.asset.assetUrl
                                                      }
                                                      type={
                                                        survey.asset.assetType
                                                      }
                                                    />
                                                  </video>
                                                ) : (
                                                  <AudioPlayer
                                                    audio={
                                                      survey.asset.assetUrl
                                                    }
                                                    key={survey.asset.assetUrl}
                                                  />
                                                )}
                                                {survey.asset.status ? (
                                                  <div className="spinner_container">
                                                    <div
                                                      className="spinner-border text-primary"
                                                      role="status"
                                                    />
                                                  </div>
                                                ) : (
                                                  <img
                                                    src={Option_Delete}
                                                    alt=""
                                                    className={
                                                      classes.option_delete
                                                    }
                                                    onClick={() =>
                                                      this.removeSurveyAsset(
                                                        survey.asset.assetUrl,
                                                        i,
                                                        true
                                                      )
                                                    }
                                                  />
                                                )}
                                              </div>
                                            ) : null}
                                            {/*question*/}
                                            {!survey.edit ? (
                                              <h4
                                                className={`${
                                                  survey.asset &&
                                                  survey.asset.assetUrl
                                                    ? classes.margin_top
                                                    : null
                                                }`}
                                              >
                                                {survey.question}
                                              </h4>
                                            ) : (
                                              <input
                                                type="text"
                                                value={survey.question}
                                                className={
                                                  classes.survey_question
                                                }
                                                onChange={(e) =>
                                                  this.surveyInputValueChange(
                                                    e,
                                                    i,
                                                    null
                                                  )
                                                }
                                              />
                                            )}

                                            {/*answers ---options*/}
                                            <span
                                              className={
                                                classes.question_answers_container
                                              }
                                            >
                                              {survey.type === "dropdown" ? (
                                                <span
                                                  className={
                                                    classes.selection_options_container
                                                  }
                                                >
                                                  {!this.state.form
                                                    .survey_answers_questions
                                                    .surveys[i].edit ? (
                                                    <>
                                                      <select
                                                        className={`${classes.survey_input} ${classes.survey_selection}`}
                                                      >
                                                        {survey.answers.map(
                                                          (answer, index) => (
                                                            <option
                                                              key={index}
                                                              value={answer}
                                                            >
                                                              {answer}
                                                            </option>
                                                          )
                                                        )}
                                                      </select>
                                                      <img
                                                        src={Chevron_Down}
                                                        alt="arrow"
                                                        className={
                                                          classes.select_icon
                                                        }
                                                      />
                                                    </>
                                                  ) : (
                                                    survey.answers.map(
                                                      (answer, index) => (
                                                        <div
                                                          key={answer}
                                                          className="d-flex align-items-center"
                                                        >
                                                          <input
                                                            type="text"
                                                            className={
                                                              classes.survey_input
                                                            }
                                                            value={answer}
                                                            onChange={(e) =>
                                                              this.surveyInputValueChange(
                                                                e,
                                                                i,
                                                                index
                                                              )
                                                            }
                                                          />
                                                          <select
                                                            name="section"
                                                            onChange={(
                                                              event
                                                            ) => {
                                                              /*this.changeCreatedQuestionsInputType(
                                                       event,
                                                       i
                                                     )*/
                                                              const value =
                                                                event.target
                                                                  .value;
                                                              const index =
                                                                surveys.findIndex(
                                                                  (el) =>
                                                                    el.section_name ===
                                                                    value
                                                                );
                                                              const left =
                                                                surveys.slice(
                                                                  0,
                                                                  index
                                                                );
                                                              const right =
                                                                surveys.slice(
                                                                  index + 1,
                                                                  surveys.length
                                                                );
                                                              const surveyCopy =
                                                                {
                                                                  ...surveys[
                                                                    index
                                                                  ],
                                                                };
                                                              surveyCopy.link =
                                                                {
                                                                  question:
                                                                    survey.question,
                                                                  option:
                                                                    answer,
                                                                };

                                                              this.props.updateQuestions(
                                                                surveyCopy,
                                                                false
                                                              );
                                                              this.setState(
                                                                (state) => ({
                                                                  ...state,
                                                                  form: {
                                                                    ...state.form,
                                                                    survey_answers_questions:
                                                                      {
                                                                        ...state
                                                                          .form
                                                                          .survey_answers_questions,
                                                                        surveys:
                                                                          [
                                                                            ...left,
                                                                            surveyCopy,
                                                                            ...right,
                                                                          ],
                                                                      },
                                                                  },
                                                                })
                                                              );
                                                            }}
                                                            className={
                                                              classes.input_type_select
                                                            }
                                                          >
                                                            {activeBox.linkedSections &&
                                                            activeBox
                                                              .linkedSections[
                                                              answer
                                                            ] ? (
                                                              <option
                                                                value={
                                                                  activeBox
                                                                    .linkedSections[
                                                                    answer
                                                                  ]
                                                                }
                                                              >
                                                                {
                                                                  activeBox
                                                                    .linkedSections[
                                                                    answer
                                                                  ]
                                                                }
                                                              </option>
                                                            ) : (
                                                              <option value="">
                                                                Select section
                                                              </option>
                                                            )}
                                                            {surveys
                                                              .filter(
                                                                (el) =>
                                                                  !el.isQuestion
                                                              )
                                                              .map((el, i) => (
                                                                <option
                                                                  key={i}
                                                                  value={
                                                                    el.section_name
                                                                  }
                                                                >
                                                                  {
                                                                    el.section_name
                                                                  }
                                                                </option>
                                                              ))}
                                                          </select>{" "}
                                                          <img
                                                            src={Option_Delete}
                                                            alt=""
                                                            className={
                                                              classes.option_delete
                                                            }
                                                            onClick={() =>
                                                              this.deleteOptionFromSurveyQuestion(
                                                                i,
                                                                index
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                      )
                                                    )
                                                  )}
                                                </span>
                                              ) : (
                                                survey.answers.map(
                                                  (answer, index) => {
                                                    return (
                                                      <span
                                                        className={
                                                          classes.question_answer_span
                                                        }
                                                        key={index}
                                                      >
                                                        <input
                                                          id={`answer${i + 1}-${
                                                            index + 1
                                                          }`}
                                                          type={`${
                                                            survey.type ===
                                                            "radio"
                                                              ? "radio"
                                                              : survey.type ===
                                                                "checkbox"
                                                              ? "checkbox"
                                                              : survey.type ===
                                                                "text"
                                                              ? "text"
                                                              : null
                                                          }`}
                                                          className={`${
                                                            survey.type ===
                                                              "text" &&
                                                            classes.survey_input
                                                          } ${
                                                            survey.type ===
                                                              "text" &&
                                                            classes.survey_input_2
                                                          }`}
                                                          name={`options${
                                                            i + 1
                                                          }`}
                                                          placeholder={`${
                                                            survey.type ===
                                                              "text" && "Answer"
                                                          }`}
                                                        />
                                                        {survey.type !==
                                                          "text" &&
                                                        !survey.edit ? (
                                                          <label
                                                            htmlFor={`answer${
                                                              i + 1
                                                            }-${index + 1}`}
                                                          >
                                                            {" "}
                                                            {answer}
                                                          </label>
                                                        ) : survey.type !==
                                                          "text" ? (
                                                          <span
                                                            className={
                                                              classes.options
                                                            }
                                                          >
                                                            <input
                                                              type="text"
                                                              className={`${classes.survey_input} w-25`}
                                                              value={answer}
                                                              onChange={(e) =>
                                                                this.surveyInputValueChange(
                                                                  e,
                                                                  i,
                                                                  index
                                                                )
                                                              }
                                                            />
                                                            <select
                                                              name="section"
                                                              onChange={(
                                                                event
                                                              ) => {
                                                                /*this.changeCreatedQuestionsInputType(
                                                       event,
                                                       i
                                                     )*/
                                                                const value =
                                                                  event.target
                                                                    .value;
                                                                const index =
                                                                  surveys.findIndex(
                                                                    (el) =>
                                                                      el.section_name ===
                                                                      value
                                                                  );
                                                                const left =
                                                                  surveys.slice(
                                                                    0,
                                                                    index
                                                                  );
                                                                const right =
                                                                  surveys.slice(
                                                                    index + 1,
                                                                    surveys.length
                                                                  );
                                                                const surveyCopy =
                                                                  {
                                                                    ...surveys[
                                                                      index
                                                                    ],
                                                                  };
                                                                surveyCopy.link =
                                                                  {
                                                                    question:
                                                                      survey.question,
                                                                    option:
                                                                      answer,
                                                                  };

                                                                /*this.props.updateQuestions(
                                                       surveyCopy,
                                                       false
                                                     );*/
                                                                this.setState(
                                                                  (state) => ({
                                                                    ...state,
                                                                    form: {
                                                                      ...state.form,
                                                                      survey_answers_questions:
                                                                        {
                                                                          ...state
                                                                            .form
                                                                            .survey_answers_questions,
                                                                          surveys:
                                                                            [
                                                                              ...left,
                                                                              surveyCopy,
                                                                              ...right,
                                                                            ],
                                                                        },
                                                                    },
                                                                  })
                                                                );
                                                              }}
                                                              className={
                                                                classes.input_type_select
                                                              }
                                                            >
                                                              {activeBox.linkedSections &&
                                                              activeBox
                                                                .linkedSections[
                                                                answer
                                                              ] ? (
                                                                <option
                                                                  value={
                                                                    activeBox
                                                                      .linkedSections[
                                                                      answer
                                                                    ]
                                                                  }
                                                                >
                                                                  {
                                                                    activeBox
                                                                      .linkedSections[
                                                                      answer
                                                                    ]
                                                                  }
                                                                </option>
                                                              ) : (
                                                                <option value="">
                                                                  Select section
                                                                </option>
                                                              )}
                                                              {surveys
                                                                .filter(
                                                                  (el) =>
                                                                    !el.isQuestion
                                                                )
                                                                .map(
                                                                  (el, i) => (
                                                                    <option
                                                                      key={i}
                                                                      value={
                                                                        el.section_name
                                                                      }
                                                                    >
                                                                      {
                                                                        el.section_name
                                                                      }
                                                                    </option>
                                                                  )
                                                                )}
                                                            </select>{" "}
                                                            <img
                                                              src={
                                                                Option_Delete
                                                              }
                                                              alt=""
                                                              className={
                                                                classes.option_delete
                                                              }
                                                              onClick={() =>
                                                                this.deleteOptionFromSurveyQuestion(
                                                                  i,
                                                                  index
                                                                )
                                                              }
                                                            />
                                                          </span>
                                                        ) : null}
                                                      </span>
                                                    );
                                                  }
                                                )
                                              )}

                                              {/* adding new option or changing its value*/}
                                              {false &&
                                              survey.type !== "text" ? (
                                                <span
                                                  className={`${
                                                    survey.type !== "dropdown"
                                                      ? " ml-4"
                                                      : null
                                                  }`}
                                                >
                                                  <input
                                                    type="text"
                                                    placeholder="add new option"
                                                    className={
                                                      classes.survey_input
                                                    }
                                                    ref={this.new_option}
                                                    id="add-new-option"
                                                  />

                                                  <img
                                                    src={Add_Icon}
                                                    alt=""
                                                    className={
                                                      classes.option_delete
                                                    }
                                                    onClick={() =>
                                                      this.addNewOptionToCreatedQuetion(
                                                        i
                                                      )
                                                    }
                                                  />
                                                </span>
                                              ) : null}
                                            </span>

                                            {activeBox.name ===
                                            `survey_created_input_${i}` ? (
                                              <>
                                                {" "}
                                                <div
                                                  className={
                                                    classes.question_answer_border
                                                  }
                                                />
                                                <div
                                                  className={
                                                    classes.question_answer_setting_flex_end
                                                  }
                                                >
                                                  <div className="d-flex">
                                                    <select
                                                      name="question_type"
                                                      onChange={(event) =>
                                                        this.changeCreatedQuestionsInputType(
                                                          event,
                                                          i
                                                        )
                                                      }
                                                      className={
                                                        classes.input_type_select
                                                      }
                                                    >
                                                      <option key={survey.type}>
                                                        {survey.type === "radio"
                                                          ? "Radio"
                                                          : survey.type ===
                                                            "checkbox"
                                                          ? "Checkboxes"
                                                          : survey.type ===
                                                            "dropdown"
                                                          ? "Dropdown"
                                                          : null}
                                                      </option>
                                                      {[
                                                        {
                                                          value: "radio",
                                                          type: "Radio",
                                                        },
                                                        {
                                                          value: "checkbox",
                                                          type: "Checkboxes",
                                                        },
                                                        {
                                                          value: "dropdown",
                                                          type: "Dropdown",
                                                        },
                                                      ].map((el, index) => {
                                                        if (
                                                          el.value !==
                                                          survey.type
                                                        ) {
                                                          return (
                                                            <option
                                                              key={index}
                                                              value={el.value}
                                                            >
                                                              {el.type}
                                                            </option>
                                                          );
                                                        }
                                                      })}
                                                    </select>
                                                    <img
                                                      src={Edit}
                                                      alt=""
                                                      onClick={() =>
                                                        this.editSurvey(i)
                                                      }
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      className="ml-3 mr-3 position-relative"
                                                    />
                                                    <img
                                                      src={Trash}
                                                      alt=""
                                                      className="ml-3 mr-3 position-relative"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        this.deleteCreatedSurvey(
                                                          i
                                                        )
                                                      }
                                                    />
                                                  </div>
                                                  <div
                                                    className={`${classes.question_answer_setting} ml-4`}
                                                  >
                                                    <div>
                                                      <p>Important</p>
                                                      <label
                                                        className={
                                                          classes.switch
                                                        }
                                                        htmlFor={`important-question${i}`}
                                                      >
                                                        <input
                                                          type="checkbox"
                                                          id={`important-question${i}`}
                                                          checked={
                                                            survey.isQuestion &&
                                                            !survey.isConditional
                                                          }
                                                          onChange={(e) =>
                                                            this.toggleCurrentSurveysImportance(
                                                              e,
                                                              i
                                                            )
                                                          }
                                                        />
                                                        <div
                                                          className={`${classes.slider} ${classes.round}`}
                                                        ></div>
                                                      </label>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                            ) : null}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div
                      className={`${classes.create_question} ${
                        input ? classes.active : null
                      }`}
                    >
                      <div
                        style={{
                          width: "660px",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                        }}
                        onMouseEnter={() => {
                          this.toggleToInputState(
                            "survey_answers_questions",
                            "input"
                          );
                        }}
                        onMouseLeave={() =>
                          this.togleFromInputState(
                            "survey_answers_questions",
                            "input"
                          )
                        }
                      >
                        {" "}
                        {input ? (
                          <div
                            className={classes.user_setting}
                            style={{ height: "80px" }}
                          >
                            <svg
                              viewBox="0 -0.5 21 21"
                              version="1.1"
                              width="25"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#000000"
                              onClick={() => this.addNewQuestionAnswer()}
                            >
                              <g strokeWidth="0"></g>
                              <g
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g>
                                <g
                                  stroke="none"
                                  strokeWidth="0.5"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  {" "}
                                  <g
                                    transform="translate(-179.000000, -600.000000)"
                                    fill="#2E3A59"
                                  >
                                    {" "}
                                    <g transform="translate(56.000000, 160.000000)">
                                      {" "}
                                      <path d="M137.7,450 C137.7,450.552 137.2296,451 136.65,451 L134.55,451 L134.55,453 C134.55,453.552 134.0796,454 133.5,454 C132.9204,454 132.45,453.552 132.45,453 L132.45,451 L130.35,451 C129.7704,451 129.3,450.552 129.3,450 C129.3,449.448 129.7704,449 130.35,449 L132.45,449 L132.45,447 C132.45,446.448 132.9204,446 133.5,446 C134.0796,446 134.55,446.448 134.55,447 L134.55,449 L136.65,449 C137.2296,449 137.7,449.448 137.7,450 M133.5,458 C128.86845,458 125.1,454.411 125.1,450 C125.1,445.589 128.86845,442 133.5,442 C138.13155,442 141.9,445.589 141.9,450 C141.9,454.411 138.13155,458 133.5,458 M133.5,440 C127.70085,440 123,444.477 123,450 C123,455.523 127.70085,460 133.5,460 C139.29915,460 144,455.523 144,450 C144,444.477 139.29915,440 133.5,440">
                                        {" "}
                                      </path>{" "}
                                    </g>{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                            <svg
                              fill="#2E3A59"
                              viewBox="0 0 100 100"
                              onClick={() => this.addNewQuestionAnswer(true)}
                            >
                              <g strokeWidth="0"></g>
                              <g
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g>
                                <path
                                  d="M31,34H69a1,1,0,0,0,1-1V29a1,1,0,0,0-1-1H31a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1m41,6H28a4,4,0,0,1-4-4V26a4,4,0,0,1,4-4H72a4,4,0,0,1,4,4V36a4,4,0,0,1-4,4"
                                  fillRule="evenodd"
                                ></path>
                                <path
                                  d="M31,72H69a1,1,0,0,0,1-1V67a1,1,0,0,0-1-1H31a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1m41,6H28a4,4,0,0,1-4-4V64a4,4,0,0,1,4-4H72a4,4,0,0,1,4,4V74a4,4,0,0,1-4,4"
                                  fillRule="evenodd"
                                ></path>
                                <path
                                  d="M77,54H67a3,3,0,0,1-3-3V49a3,3,0,0,1,3-3H77a3,3,0,0,1,3,3v2a3,3,0,0,1-3,3"
                                  fillRule="evenodd"
                                ></path>
                                <path
                                  d="M55,54H45a3,3,0,0,1-3-3V49a3,3,0,0,1,3-3H55a3,3,0,0,1,3,3v2a3,3,0,0,1-3,3"
                                  fillRule="evenodd"
                                ></path>
                                <path
                                  d="M33,54H23a3,3,0,0,1-3-3V49a3,3,0,0,1,3-3H33a3,3,0,0,1,3,3v2a3,3,0,0,1-3,3"
                                  fillRule="evenodd"
                                ></path>
                              </g>
                            </svg>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={classes.create_question_subcontainer}
                        onMouseEnter={() => {
                          this.toggleToInputState(
                            "survey_answers_questions",
                            "input"
                          );
                        }}
                        onMouseLeave={() =>
                          this.togleFromInputState(
                            "survey_answers_questions",
                            "input"
                          )
                        }
                      >
                        <div className={classes.radio_group}>
                          <div className={classes.radio_group_with}>
                            <div className={classes.radio_group_grid_container}>
                              <img src={Radio} alt="radio icons" />
                              <img src={Radio} alt="radio icons" />
                              <img src={Radio} alt="radio icons" />
                              <img src={Radio} alt="radio icons" />
                              <img src={Radio} alt="radio icons" />
                              <img src={Radio} alt="radio icons" />
                            </div>
                          </div>
                        </div>
                        <div className={classes.survey_input_and_question_type}>
                          {expamle_asset.assetUrl ? (
                            <div
                              className={` ${classes.survey_asset_container}`}
                            >
                              {expamle_asset.assetType.includes("image") ? (
                                <img
                                  src={expamle_asset.assetUrl}
                                  alt=""
                                  className={` ${classes.survey_img} ${
                                    expamle_asset.status
                                      ? classes.uploading
                                      : null
                                  }`}
                                />
                              ) : expamle_asset.assetType.includes("video") ? (
                                <video
                                  controls
                                  className={` ${classes.survey_img} ${
                                    expamle_asset.status
                                      ? classes.uploading
                                      : null
                                  }`}
                                >
                                  <source
                                    src={expamle_asset.assetUrl}
                                    type={expamle_asset.assetType}
                                  />
                                </video>
                              ) : (
                                <AudioPlayer
                                  audio={expamle_asset.assetUrl}
                                  keyProp={expamle_asset.assetUrl}
                                />
                              )}
                              <img
                                src={Option_Delete}
                                alt=""
                                className={classes.option_delete}
                                onClick={() =>
                                  this.setState((state) => ({
                                    ...state,
                                    form: {
                                      ...this.state.form,
                                      survey_answers_questions: {
                                        ...this.state.form
                                          .survey_answers_questions,
                                        survey: {
                                          ...this.state.form
                                            .survey_answers_questions.survey,
                                          asset: {},
                                        },
                                      },
                                    },
                                  }))
                                }
                              />
                            </div>
                          ) : null}
                        </div>
                        <div className={classes.survey_input_align_center}>
                          <input
                            type="text"
                            className={`${classes.survey_input} ${
                              survey_question && classes.survey_input_danger
                            }`}
                            placeholder="Type your question"
                            value={create_answers_questions.question}
                            onChange={(event) => {
                              this.handleCreateQuestion(
                                event,
                                "survey_answers_questions",
                                "question"
                              );
                            }}
                          />
                          <div className={`${classes.flex_row}`}>
                            <div
                              className={`img-dragger-2 ${classes.spacing_between}`}
                            >
                              <Dragger
                                listType="picture-card"
                                openFileDialogOnClick={true}
                                showUploadList={false}
                                beforeUpload={() => false}
                                className="profil_img_edit"
                                onChange={(info) =>
                                  this.onSurveyQuestionCretiveUpload(info)
                                }
                                style={{
                                  background: "white",
                                  borderColor: "transparent",
                                }}
                              >
                                <div className={classes.profil_relative}>
                                  {/*} <Profile scope={"local"} />*/}
                                  <div className={classes.upload_image_cont}>
                                    <img
                                      src={Gallery_Add}
                                      className={classes.add_image_icon}
                                    />
                                  </div>
                                </div>
                              </Dragger>
                            </div>
                            <span className={classes.select_container}>
                              <select
                                name="question_type"
                                onChange={(event) =>
                                  this.handleInputTypeSelected(event)
                                }
                                className={classes.input_type_select}
                              >
                                <option key={type_dev}>
                                  {type_dev === "radio"
                                    ? "Radio"
                                    : type_dev === "checkbox"
                                    ? "Checkboxes"
                                    : type_dev === "dropdown"
                                    ? "Dropdown"
                                    : "Short answers"}
                                </option>
                                {[
                                  { value: "radio", type: "Radio" },
                                  { value: "checkbox", type: "Checkboxes" },
                                  { value: "dropdown", type: "Dropdown" },
                                  { value: "text", type: "Short answers" },
                                ].map((el, index) => {
                                  if (el.value !== type_dev) {
                                    return (
                                      <option key={index} value={el.value}>
                                        {el.type}
                                      </option>
                                    );
                                  }
                                })}
                              </select>
                            </span>
                          </div>

                          {/* <div
               className={`${classes.flex_row} ${
                 true && classes.extra_margin_top
               }`}
             >
        
             </div>*/}
                        </div>
                        {this.state.recordAudio ? (
                          <div className="mt-3 mb-3 pl-4">
                            <AudioRecorder
                              onFinishRecording={(blob) => {
                                const reader = new FileReader();
                                const asset = {
                                  assetName: "",
                                  assetFile: blob,
                                  assetUrl: "",
                                  assetType: "audio/mp3",
                                };

                                reader.readAsDataURL(blob);

                                reader.onload = (e) => {
                                  //asset.assetFile = info.file;
                                  asset.assetUrl = e.target.result;
                                  //asset.assetName = info.file.name;
                                  //asset.assetType = info.file.type;

                                  this.setState({
                                    ...this.state,
                                    recordAudio: false,
                                    form: {
                                      ...this.state.form,
                                      survey_answers_questions: {
                                        ...this.state.form
                                          .survey_answers_questions,
                                        survey: {
                                          ...this.state.form
                                            .survey_answers_questions.survey,
                                          asset: {
                                            ...asset,
                                          },
                                        },
                                      },
                                    },
                                  });
                                };
                              }}
                            />
                          </div>
                        ) : null}
                        <div
                          className={`${classes.question_answer} ${classes.margin_top}`}
                        >
                          {this.returnAnswerOptions()}
                          {type_dev !== "text" && (
                            <span className={classes.add_question}>
                              {type_dev !== "dropdown" ? (
                                <input
                                  id="answer"
                                  type={`${
                                    type_dev === "radio"
                                      ? "radio"
                                      : type_dev === "checkbox"
                                      ? "checkbox"
                                      : null
                                  }`}
                                />
                              ) : (
                                <span
                                  className={classes.dropdown_option_counter}
                                >
                                  {answers.count + 1}.
                                </span>
                              )}
                              <label htmlFor="answer">
                                {" "}
                                Add another or{" "}
                                <span
                                  className={classes.link_color}
                                  onClick={this.addNewAnswerOption}
                                >
                                  other
                                </span>
                              </label>
                            </span>
                          )}
                        </div>
                        <div className={classes.question_answer_border}></div>
                        <div className={classes.question_answer_setting}>
                          <button
                            className={classes["record-audio"]}
                            onClick={() =>
                              this.setState((state) => ({
                                ...state,
                                recordAudio: !state.recordAudio,
                              }))
                            }
                          >
                            {this.state.recordAudio ? "Cancel" : "Record Audio"}
                            <img src={RecordAudio} alt="" />
                          </button>{" "}
                          <button
                            className={classes["record-video"]}
                            onClick={() =>
                              this.setState((state) => ({
                                ...state,
                                recordVideoModal: true,
                                recordAudio: false,
                              }))
                            }
                          >
                            <img src={RecordVideo} alt="" /> Record video
                          </button>
                          <div>
                            {/*<img src={Copy} alt="comment icon" />
                   <img src={Trash} alt="delete icon" />*/}
                            <p>Important</p>
                            <label
                              className={classes.switch}
                              htmlFor="create-question"
                            >
                              <input
                                type="checkbox"
                                id="create-question"
                                checked={isQuestion && !isConditional}
                                onChange={this.toggleSurveyImportance}
                              />
                              <div
                                className={`${classes.slider} ${classes.round}`}
                              ></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.create_right_info}>
                  <div className={classes.create_info}>
                    <p className={classes.create_info_icon}>
                      <img
                        src={
                          this.props.layoutTheme === "light"
                            ? Info_Circle
                            : Info_Circle_White
                        }
                        alt=""
                      />
                      <span>Information</span>
                    </p>
                    <ul className={classes.create_info_ul}>
                      <li>
                        <p className={classes.create_ul_p}>
                          Responses from 50 to 250
                        </p>
                        <div className={classes.create_ul_txt}>
                          Rate is gonna be 0.5 USD
                        </div>
                      </li>
                      <li>
                        <p className={classes.create_ul_p}>
                          Responses from 250 to 600
                        </p>
                        <div className={classes.create_ul_txt}>
                          Rate will drop to be 0.3 USD
                        </div>
                      </li>
                      <li>
                        <p className={classes.create_ul_p}>
                          Responses from 600
                        </p>
                        <div className={classes.create_ul_txt}>
                          Rate will decrease to 0.2 USD
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {!preview_mode && menu_item === "settings" && (
              <SurveySettings
                active={survey.survey_active}
                survey_specific={survey.survey_specific}
                //country={survey.country}
                //survey_location={survey.target_audience.location}
                // survey_gender={survey.target_audience.gender}
                // survey_age={survey.target_audience.age}
                //paid={survey.paid}
                handleLocationChange={this.handleLocationChange}
                map={survey.map}
                target_audience={this.props.survey.target_audience}
                researchConductedVia={this.props.survey.researchConductedVia}
                researcherContacts={this.props.survey.researcherContacts}
                layoutTheme={this.props.layoutTheme}
                toggleLocationModal={() => {
                  this.setState((state) => ({
                    ...state,
                    locationModal: true,
                  }));
                }}
              />
            )}
            {!preview_mode && menu_item === "analytics" && (
              <SurveyAnalytics
                id={survey._id}
                layoutTheme={this.props.layoutTheme}
              />
            )}
            {!preview_mode && menu_item === "answers" && (
              <SurveyAnswers
                analytics={analytics}
                survey_questions={survey.survey_questions}
                id={survey._id}
              />
            )}

            {!preview_mode && menu_item === "participants" && (
              <div className={classes.surveys_container}>
                <div className={classes.create_ads}>
                  <div className={classes.ads_section}>
                    <div className={classes.cads_head}>
                      <div className={classes.cads_head_left}>
                        <h4 className={classes.cads_h4}>
                          Assigned participants
                        </h4>
                        <p className={classes.cads_p}>
                          Here you can view participants
                        </p>
                      </div>
                      <button
                        onClick={this.toggleToCreateSurveyMode}
                        type="button"
                        className={classes.create_ads_btn}
                      >
                        Create Survey
                        <svg
                          width="20"
                          height="20"
                          className={classes.create_ads_img}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 10H15"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 15V5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <PullParticipants
                      user_id={this.props.user_id}
                      participants={this.props.survey.participants}
                    />
                  </div>
                </div>
              </div>
            )}
            {preview_mode && <Preview surveys={survey.survey_questions} />}
          </div>
        )}
        {!preview_mode && menu_item === "research" && (
          <ResearchSetting
            researchConductedVia={this.props.survey.researchConductedVia}
            targetUsersFrom={this.props.survey.targetUsersFrom}
            research={this.props.survey.research}
            layoutTheme={this.props.layoutTheme}
            company={this.props.company}
            continue={() =>
              this.setState((state) => ({
                ...state,
                menu: {
                  ...state.menu,
                  menu_item: "questions",
                },
              }))
            }
          />
        )}
        <LocationModal
          modalStatus={locationModal}
          //country={map.country}
          //city={map.city}
          closeModal={(state, country, city) => {
            if (!state || country === undefined || city === undefined) {
              this.setState({
                ...this.state,
                locationModal: false,
              });
              return;
            } else if (country === "all") {
              this.setState({
                ...this.state,
                locationModal: false,
              });
              this.props.fetch_map_position(
                `${country}, ${city}`,
                country,
                city,
                { lat: 41.8781, lng: -87.6298 }
              );
              return;
            }
            this.changeLocation(country, city);
          }}
        />

        <WebcamModal
          modalStatus={this.state.recordVideoModal}
          closeModal={() =>
            this.setState((state) => ({
              ...state,
              recordVideoModal: false,
            }))
          }
          layoutTheme={this.props.layoutTheme}
          uploadVideo={(blob, videoUrl) => {
            {
              const asset = {
                assetName: videoUrl.substring(0, 25) + ".mp4",
                assetFile: blob,
                assetUrl: videoUrl,
                assetType: "video/mp4",
              };

              this.setState({
                ...this.state,
                recordVideoModal: false,
                form: {
                  ...this.state.form,
                  survey_answers_questions: {
                    ...this.state.form.survey_answers_questions,
                    survey: {
                      ...this.state.form.survey_answers_questions.survey,
                      asset,
                    },
                  },
                },
              });
            }
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

export default connect(mapStatetoProps, {
  publish_survey,
  fetch_survey,
  fetch_map_position,
})(withRouter(Survey));

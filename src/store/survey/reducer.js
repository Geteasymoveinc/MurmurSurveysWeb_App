import {
  ADDSURVEY,
  ADDTITLE,
  ADDPRICE,
  ADDSETTINGS,
  SUBMITSURVEYTOBACKEND,
  SUBMITSURVEYTOBACKENDSUCCESS,
  FETCHSURVEYFROMBACKEND,
  FETCHSURVEYFROMBACKENDSUCCESS,
  FETCHINGMAPLOCATIONANDADDRESS,
  UPDATEQUESTIONS,
  UPDATERESEARCHMAINSETTINGS,
  RESEARCHCONTACTINFORMATION,
} from "./actionTypes";

const initial_surveys = {
  _id: null,
  survey_questions: [],
  survey_earnings: 0.5,
  survey_budget: 25,
  survey_audience_number: 50,
  survey_title: "Untitled",
  survey_caption: "Caption",
  survey_image: {
    image_name: "",
    image_file: {},
    image_url: "",
  },
  target_audience: {
    gender: "Both",
    age: "all",
    location: "all",
    country: "all",
    city: "all",
    interest: "all",
    income: { min: 300, max: 3000 },
  },
  survey_active: false,
  survey_specific: false,
  //country: 'US',
  //paid: false,
  payment: '',
  response: [],
  participants: [],
  researchConductedVia: "",
  targetUsersFrom: "",
  research: "",
  researcherContacts: {
    phone: null,
    location: null,
    hyperlink: null,
  },
  map: {
    address: "",
    center: {
      lat: 0,
      lng: 0,
    },
  },
  message: null,
  loading: true,
  count: 0,
  paid: false,
  hasAwsReports:false,
  answersCount: 0
};

const Survey = (state = initial_surveys, actions) => {
  let questions = state.survey_questions;
  let index = 0;
  let left = [];
  let right = [];

 

  switch (actions.type) {
    case ADDSURVEY:
      state = {
        ...state,
        survey_questions: actions.payload,
      };
      break;
    case ADDTITLE:
      state = {
        ...state,
        survey_title: actions.payload.title,
        survey_image: {
          ...state.survey_image,
          image_file: actions.payload.image.file,
          image_name: actions.payload.image.name,
          image_url: actions.payload.image.url,
        },
        survey_caption: actions.payload.caption,
      };
      break;
    case UPDATEQUESTIONS:
      index = questions.findIndex(
        (el) => el.uid === actions.payload.question.uid
      );
      left = questions.slice(0, index);
      right = questions.slice(index + 1, questions.length);
      const { state: State } = actions.payload;

      state = {
        ...state,
        survey_questions: State
          ? [...left, ...right]
          : [...left, actions.payload.question, ...right],
      };
      break;
    case ADDPRICE:
      state = {
        ...state,
        survey_earnings: actions.payload.price,
        survey_audience_number: actions.payload.amount,
        survey_budget: actions.payload.budget,
      };
      break;
    case ADDSETTINGS:
      console.log(actions.payload)
      state = {
        ...state,
        target_audience: actions.payload.hasOwnProperty('settings')? {...state.target_audience,...actions.payload.settings} : state.target_audience,
        survey_active: actions.payload.hasOwnProperty('active')? actions.payload.active : state.survey_active,
        survey_specific: actions.payload.hasOwnProperty('survey_specific')? actions.payload.survey_specific : state.survey_specific,
      };
      break;
    case FETCHSURVEYFROMBACKEND:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCHSURVEYFROMBACKENDSUCCESS:
      let count = state.count;

      const surveys = actions.payload.survey_questions;
      //questions = [];

      /*for (let survey of surveys) {
        if (count < survey.uid) {
          count = survey.uid;
        }

        /*if (survey.isConditional) {
          for (let question of survey.questions) {
            question.link = survey.uid;
            if (count < question.uid) {
              count = question.uid;
            }
            questions.push(question);
          }
          survey.questions = [];
        }
      }*/

      state = {
        ...state,
        _id: actions.payload._id,
        survey_questions: [...surveys],
        survey_title: actions.payload.survey_title,
        survey_caption: actions.payload.survey_caption,
        survey_earnings: actions.payload.survey_earnings,
        survey_budget: actions.payload.survey_budget,
        survey_audience_number: actions.payload.survey_audience_number,
        survey_active: actions.payload.survey_active,
        survey_specific: actions.payload.survey_specific,
        country: actions.payload.country,
        target_audience: actions.payload.target_audience,
        participants: actions.payload.participants,
        survey_image: {
          ...state.survey_image,
          image_url: actions.payload.survey_image,
          image_name: actions.payload.survey_image
            ? actions.payload.survey_image.split(
                "https://backendapp.getinsightiq.com/advertisers/surveys/"
              )[1]
            : null,
        },
        //: actions.payload.paid,
        payment: actions.payload.payment,
        researchConductedVia: actions.payload.researchConductedVia,
        targetUsersFrom: actions.payload.targetUsersFrom,
        research: actions.payload.research,
        response: actions.payload.response,
        researcherContacts: actions.payload.researcherContacts,
        paid: actions.payload.paid,
        loading: false,
        hasAwsReports: actions.payload.hasAwsReports,
        count,
        answersCount: actions.payload.answeredBy.length
      };
      break;

    case FETCHINGMAPLOCATIONANDADDRESS:
      state = {
        ...state,
        map: {
          address: actions.payload.address,
          center: actions.payload.center,
        },
        target_audience: {...state.target_audience, ...actions.payload.settings}
      };
      break;
    case SUBMITSURVEYTOBACKEND:
      state = {
        ...state,
        loading: true,
      };
      break;
    case SUBMITSURVEYTOBACKENDSUCCESS:
      state = {
        ...state,
        message: actions.payload,
        loading: false,
      };
      break;
    case UPDATERESEARCHMAINSETTINGS:
      state = {
        ...state,
        [actions.payload.type]: actions.payload.value,
      };
      break;
    case RESEARCHCONTACTINFORMATION:
      state = {
        ...state,
        researcherContacts: {
          ...state.researcherContacts,
        [actions.payload.contactType]: actions.payload.contact
        }
      };
      break;
    default:
      state = { ...state };
      break;
  }

  return state;
};

export default Survey;


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

} from "./actionTypes";

const initial_surveys = {
  survey_questions: [],
  survey_earnings: 0,
  survey_audience_number: 0,
  survey_title: 'Untitled',
  survey_caption: 'Caption',
  survey_image: {
    image_name: '',
    image_file: {},
    image_url: ''
  },
  target_audience: {
    gender: 'Both',
    age: '18-25',
    location:'nizami'
  },
  survey_active: false,
  analytics: [],
  map: {
    address: '',
    center: {
      lat: 0,
      lng:0
    }
  },
  message: null,
  loading: false,
};

const Survey = (state = initial_surveys, actions) => {

  switch (actions.type) {
    
    case ADDSURVEY:

      state = {
        ...state,
        survey_questions: actions.payload,
      };
      break
    case ADDTITLE:
      state = {
        ...state,
        survey_title: actions.payload.title,
        survey_image: {
          ...state.survey_image,
          image_file: actions.payload.image.file,
          image_name: actions.payload.image.name,
          image_url: actions.payload.image.url
        },
        survey_caption: actions.payload.caption
      };
      break
    case ADDPRICE:
      state = {
        ...state,
        survey_earnings: actions.payload.price,
        survey_audience_number: actions.payload.amount
      };
      break
    case ADDSETTINGS:
      state = {
        ...state,
        target_audience: actions.payload.settings,
        survey_active: actions.payload.active
      };
     break
    case FETCHSURVEYFROMBACKEND:
      state = {
        ...state,
        loading:true
      }
      break;
    case FETCHSURVEYFROMBACKENDSUCCESS:
      state = {
        ...state,
        survey_questions: actions.payload.survey_questions,
        survey_title: actions.payload.survey_title,
        survey_caption: actions.payload.survey_caption,
        survey_earnings: actions.payload.survey_earnings,
        survey_audience_number: actions.payload.survey_audience_number,
        survey_active: actions.payload.survey_active,
        target_audience: actions.payload.target_audience,
        survey_image: {
          ...state.survey_image,
          image_url: actions.payload.survey_image,
          image_name: actions.payload.survey_image.split('https://backendapp.murmurcars.com/advertisers/surveys/')[1]
        },
        analytics: actions.payload.analytics,
        loading:false
      }
      break;
    case FETCHINGMAPLOCATIONANDADDRESS:

      state={
        ...state,
        map: {
          address: actions.payload.address,
          center: actions.payload.center
        }
      }
       break;
    case SUBMITSURVEYTOBACKEND:
      state = {
        ...state,
        loading:true
      }
      break;
    case SUBMITSURVEYTOBACKENDSUCCESS:
      
      state = {
        ...state,
        message: actions.payload,
        loading:false
      }
      break;
  };

  return state

};

export default Survey;

import {
  ADDSURVEY,
  ADDTITLE,
  ADDPRICE,
  ADDSETTINGS,
  SUBMITSURVEYTOBACKEND,
} from "./actionTypes";

const initial_surveys = {
  surveys: [],
  price: {},
  title: {},
  settings: {},
  error: null,
  loading: false,
};

const Survey = (state = initial_surveys, actions) => {

  switch (actions.type) {
    
    case ADDSURVEY:

      state = {
        ...state,
        surveys: actions.payload,
      };
       return state
    case ADDTITLE:
      state = {
        ...state,
        title: actions.payload,
      };
      return state
    case ADDPRICE:
      state = {
        ...state,
        price: actions.payload,
      };
      return state
    case ADDSETTINGS:
      state = {
        ...state,
        settings: actions.payload,
      };
      return state
   
  };

  return state

};

export default Survey;

import {
  ADDSURVEY,
  ADDTITLE,
  ADDPRICE,
  ADDSETTINGS,
  SUBMITSURVEYTOBACKEND,
  SUBMITSURVEYTOBACKENDSUCCESS,
  SUBMITSURVEYTOBACKENDERROR,
  FETCHSURVEYFROMBACKEND,
  FETCHSURVEYFROMBACKENDSUCCESS,
  FETCHSURVEYFROMBACKENDFAILED,
  FETCHINGMAPLOCATIONANDADDRESS,
  UPDATEQUESTIONS,
  UPDATERESEARCHMAINSETTINGS,
  RESEARCHCONTACTINFORMATION,
} from "./actionTypes";

const add_survey = (surveys) => {
  return {
    payload: surveys,
    type: ADDSURVEY,
  };
};

const add_title = ({ title, caption, image }) => {
  return {
    payload: { title, caption, image },
    type: ADDTITLE,
  };
};

const add_price = ({ price, amount, budget }) => {
  return {
    payload: { price, amount, budget },
    type: ADDPRICE,
  };
};

const add_settings = (settings) => {
  
  return {
    payload: settings,
    type: ADDSETTINGS,
  };
};

const publish_survey = ({backend, data,  history }) => {
  return {
    payload: { backend, data,  history  },
    type: SUBMITSURVEYTOBACKEND,
  };
};

const publish_survey_success = (message) => {

  return {
    type:SUBMITSURVEYTOBACKENDSUCCESS,
    payload: message

  }
};
const publish_survey_failed= (err) => {

  return {
    type:SUBMITSURVEYTOBACKENDERROR,
    payload: err
  }
};

const fetch_survey = (url) => {
  
  return{
    type: FETCHSURVEYFROMBACKEND,
    payload: {url}
  }
}
const fetch_survey_success = (data) => {
  return {
    type: FETCHSURVEYFROMBACKENDSUCCESS,
    payload: data
  }
}
const fetch_survey_failed= (err) => {
  return {
    type: FETCHSURVEYFROMBACKENDFAILED,
    payload: err
  }
}


const fetch_map_position = (address,country,city, center) => {

  return {
    type:FETCHINGMAPLOCATIONANDADDRESS,
    payload: {address,country,city, center}
  }
}


const updateQuestions = (question, state) => {
  return {
    payload: {question, state},
    type: UPDATEQUESTIONS
  }
}


const updateResearchMainSettings = (type, value) => {
  return {
    payload: {type,value},
    type: UPDATERESEARCHMAINSETTINGS
  }
}

const addResearchContactDetails = (contactType, contact) => {
  return {
    payload: {contactType, contact},
    type: RESEARCHCONTACTINFORMATION
  }
}


export {
  add_survey,
  add_title,
  add_price,
  add_settings,
  publish_survey,
  publish_survey_success,
  publish_survey_failed,
  fetch_survey,
  fetch_survey_success,
  fetch_survey_failed,
  fetch_map_position,
  updateQuestions,
  updateResearchMainSettings,
  addResearchContactDetails
};

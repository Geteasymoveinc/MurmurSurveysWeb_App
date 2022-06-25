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
  FETCHINGMAPLOCATIONANDADDRESS,
} from "./actionTypes";

const add_survey = (surveys) => {
  console.log("action creater for add survey is getting called");
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

const add_price = ({ price, amount }) => {
  return {
    payload: { price, amount },
    type: ADDPRICE,
  };
};

const add_settings = (settings) => {
  return {
    payload: settings,
    type: ADDSETTINGS,
  };
};

const publish_survey = ({url, data,  history, method }) => {
  return {
    payload: { url,data, history, method },
    type: SUBMITSURVEYTOBACKEND,
  };
};

const publish_survey_success = (message) => {
  console.log(message)
  return {
    type:SUBMITSURVEYTOBACKENDSUCCESS,
    payload: message
  }
};


const fetch_survey = (url) => {
  console.log(url)
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

const fetch_map_position = (address,center) => {
 console.log(address,center)
  return {
    type:FETCHINGMAPLOCATIONANDADDRESS,
    payload: {address,center}
  }
}


export {
  add_survey,
  add_title,
  add_price,
  add_settings,
  publish_survey,
  publish_survey_success,
  fetch_survey,
  fetch_survey_success,
  fetch_map_position,

};

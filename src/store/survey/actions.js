import {
  ADDSURVEY,
  ADDTITLE,
  ADDPRICE,
  ADDSETTINGS,
  SUBMITSURVEYTOBACKEND,
  SUBMITSURVEYTOBACKENDSUCCESS,
  SUBMITSURVEYTOBACKENDERROR,
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

const publish_survey = ({ data, user_id,  history }) => {
  return {
    payload: { data, user_id, history },
    type: SUBMITSURVEYTOBACKEND,
  };
};

const publish_survey_success = () => {};

export {
  add_survey,
  add_title,
  add_price,
  add_settings,
  publish_survey,
  publish_survey_success,
};

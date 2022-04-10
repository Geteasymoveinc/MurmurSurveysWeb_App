import {
  GOOGLE_SIGNUP,
  GOOGLE_LOGIN,
  GOOGLE_SUCCESS,
  GOOGLE_FAILED,
} from "./actionTypes";

export const google_signup = (data) => {


  return {
    type: GOOGLE_SIGNUP,
    payload: data,
  };
};


export const google_login = ({ profile, history }) => {
  

  return {
    type: GOOGLE_LOGIN,
    payload: { profile, history },
  };
};

export const google_success = ({ resp }) => {
  return {
    type: GOOGLE_SUCCESS,
    payload: resp,
  };
};

export const google_failed = ({ err }) => {
  return {
    type: GOOGLE_FAILED,
    payload: err,
  };
};

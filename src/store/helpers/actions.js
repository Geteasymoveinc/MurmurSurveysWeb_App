import {
  GOOGLE_SIGNUP,
  GOOGLE_LOGIN,
  GOOGLE_SUCCESS,
  GOOGLE_FAILED,
} from "./actionTypes";

export const google_signup = (data) => {
  console.log(data);
  return {
    type: GOOGLE_SIGNUP,
    payload: data,
  };
};

export const google_login = ({ email, history }) => {
  console.log(email,history)
  return {
    type: GOOGLE_LOGIN,
    payload: { email, history },
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

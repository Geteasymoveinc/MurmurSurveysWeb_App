import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR
} from "./actionTypes";

export const userForgetPassword = ({email,history}) => {
  return {
    type: FORGET_PASSWORD,
    payload: { email, history }
  };
};

export const userForgetPasswordSuccess = data => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: {user:data.user, message:data.message}
  };
};

export const userForgetPasswordError = message => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message
  };
};

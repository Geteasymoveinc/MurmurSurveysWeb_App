import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESSEFULL,
  RESET_PASSWORD_FAILED,
} from "./actionTypes";

export const resetPwd = ({ token, password, history }) => {
  return { type: RESET_PASSWORD, payload: { token, password, history } };
};

export const resetPwdSuccess = (data) => {
  return { type: RESET_PASSWORD_SUCCESSEFULL, payload: data.user };
};

export const resetPwdFailed = (err) => {
  return { type: RESET_PASSWORD_FAILED, payload: err };
};

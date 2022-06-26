
import { NEW_USER, NEW_USER_FAILED, NEW_USER_SECCESSFULL } from "./actionTypes";

export const addUser = (user, history) => {
  return {
    type: NEW_USER,
    payload: { user, history },
  };
};



export const registerUserSuccessfull = (user) => {
  return {
    type: NEW_USER_SECCESSFULL,
    payload: {user}
  }
}

export const registerUserError = (err) => {
  return {
    type: NEW_USER_FAILED,
    payload: err
  }
}




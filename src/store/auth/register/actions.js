
import { NEW_USER } from "./actionTypes";

export const addUser = (user, history) => {
  return {
    type: NEW_USER,
    payload: { user, history },
  };
};

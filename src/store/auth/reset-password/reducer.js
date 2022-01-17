import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESSEFULL,
  RESET_PASSWORD_FAILED,
} from "./actionTypes";

const initialState = { user: null, error: null, loading: false };

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESSEFULL:
      return { ...state, loading: false, user: action.payload };
    case RESET_PASSWORD_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default resetPassword;

import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR
} from "./actionTypes";

const initialState = {
  forgetSuccess: null,
  forgetError: null,
  loading:false
};

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        loading:true,
        forgetError:null
      };
      break;
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        forgetSuccess: action.payload,
        loading:false
      };
      break;
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload, loading:false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default forgetPassword;

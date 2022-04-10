import {
  SUBSCRIBE,
  SUBSCRIBE_USER_SUCCESSFUL,
  SUBSCRIBE_USER_FAILED,
} from "./actionTypes";

const initialState = {
  loading: false,
  subscriber: null,
  subscriptionError: null,
};

const subscribe = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE:
      state = {
        ...state,
        loading: true,
        subscriber: null,
      };
      break;

    case SUBSCRIBE_USER_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        subscriber: action.payload.subscriber,
      };
      break;
    case SUBSCRIBE_USER_FAILED:
      state = {
        ...state,
        loading: false,
        subscriptionError: action.payload,
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default subscribe;

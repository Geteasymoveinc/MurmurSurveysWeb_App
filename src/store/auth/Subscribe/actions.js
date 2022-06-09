import {
  SUBSCRIBE,
  SUBSCRIBE_USER_SUCCESSFUL,
  SUBSCRIBE_USER_FAILED,
} from "./actionTypes";

export const subscribeFn = (subscribe, subscriber, history) => {
  return {
    type: SUBSCRIBE,
    payload: {subscribe, subscriber, history },
  };
};

export const subscribeSuccesfully = (subscriber) => {
  return {
    type: SUBSCRIBE_USER_SUCCESSFUL,
    payload: subscriber,
  };
};

export const subscriptionUserFailed = (err) => {
  return {
    type: SUBSCRIBE_USER_FAILED,
    payload: err,
  };
};

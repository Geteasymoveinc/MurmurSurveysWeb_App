import { NEW_USER } from "./actionTypes";

const initialState = {
  user: {},
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case NEW_USER:
      state = {
        ...state,
        user: action.payload.user,
      };

      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default account;

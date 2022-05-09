import { FETCHSURVEYS, FETCHSURVEYSSUCCESS } from "./actionTypes";

const initialState = {
  loading: false,
  surveys: [],
  adds: [],
};

const Surveys = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCHSURVEYS:
      state = {
        ...state,
        loading: true,
      };
      break;
    case FETCHSURVEYSSUCCESS:
      state = {
        ...state,
        loading: false,
        surveys: actions.payload.surveys,
        adds: actions.payload.adds
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Surveys;

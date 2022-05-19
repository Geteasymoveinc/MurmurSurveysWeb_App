import {
  FETCHSURVEYS,
  FETCHSURVEYSSUCCESS
} from "./actionTypes";

const fetchSurveys = (url) => {
  
  return {
    type: FETCHSURVEYS,
    payload: { url },
  };
};

const fetchSurveysSuccess = (surveys, adds) => {
  return {
    type: FETCHSURVEYSSUCCESS,
    payload: { surveys, adds},
  };
};



export {
  fetchSurveys,
  fetchSurveysSuccess
};

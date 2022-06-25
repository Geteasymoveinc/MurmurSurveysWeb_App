// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects";

import {
  FETCHSURVEYS
} from "./actionTypes";


import { fetchSurveysSuccess } from "./actions";

import {
  fetch_surveys
} from "../../helpers/fakebackend_helper";

function* Surveys({ payload: { url } }) {
  try {
    const response = yield call(fetch_surveys, url);
    const { surveys,adds} = response.data;
    console.log(surveys)
    yield put(
      fetchSurveysSuccess(surveys,adds)
    );
  } catch (err) {}
}



export function* watchSurveys() {
  yield takeEvery(FETCHSURVEYS, Surveys);
}



function* SurveysSaga() {
  yield all([
    fork(watchSurveys)
  ]);
}

export default SurveysSaga;

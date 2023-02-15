import {
  takeEvery,
  fork,
  put,
  all,
  call,
  takeLatest,
} from "redux-saga/effects";

import {
  fetch_survey_success,
  fetch_survey_failed,
  publish_survey_success,
  publish_survey_failed,
} from "./actions";

import { SUBMITSURVEYTOBACKEND, FETCHSURVEYFROMBACKEND } from "./actionTypes";

import { post_surveys, get_survey } from "../../helpers/fakebackend_helper";

function* post_survey({ payload: { backend, data, history } }) {
  try {
   const response = yield call(post_surveys, backend.url, data, backend.method);
   if(backend.update){
    const {message} = response.data
    yield put(publish_survey_success(message));
     return
   }
   const {payment_link, message} = response.data

   yield put(publish_survey_success(message));
    backend.stripe ?  setTimeout(() =>  window.location = payment_link, 1000) : history.replace('/surveys')
  } catch (err) {
    alert(err)
    yield put(publish_survey_failed(err));
  }
}

function* fetch_survey({ payload: { url } }) {
  try {
    const response = yield call(get_survey, url);

    yield put(fetch_survey_success(response));
  } catch (err) {
    yield put(fetch_survey_failed(err));
  }
}

export function* watchPostingSurvey() {
  yield takeEvery(SUBMITSURVEYTOBACKEND, post_survey);
}

export function* watchFetchingSurvey() {
  yield takeEvery(FETCHSURVEYFROMBACKEND, fetch_survey);
}

function* survey_saga() {
  yield all([fork(watchPostingSurvey), fork(watchFetchingSurvey)]);
}
export default survey_saga;

import { takeEvery, fork, put, all, call, takeLatest } from "redux-saga/effects";

import { publish_survey_success, fetch_survey_success } from "./actions";


import {ADDSURVEY,ADDSETTINGS,SUBMITSURVEYTOBACKEND, FETCHSURVEYFROMBACKEND} from './actionTypes'


import {post_surveys, get_survey} from '../../helpers/fakebackend_helper'

 function* post_survey({ payload: { url,data,  history, method} }) {
    
  try {
    const response = yield call(
      post_surveys,
       url,data, method
    );

    const {message} = response.data

    
    yield put(publish_survey_success(message))
   setTimeout(() => history.push('/surveys'), 1000)
    }catch{
       
    }
}

function* fetch_survey({payload: {url}}){
  
  try {
    const response = yield call(
      get_survey,
       url
    );

    yield put(fetch_survey_success(response))
    }catch{

    }

}

export function* watchPostingSurvey() {
  yield takeEvery(SUBMITSURVEYTOBACKEND, post_survey);
}

export function* watchFetchingSurvey(){
  yield takeEvery(FETCHSURVEYFROMBACKEND, fetch_survey);
}

function* survey_saga() {
    yield all([fork(watchPostingSurvey), fork(watchFetchingSurvey)]);
  }
export default survey_saga;

import { takeEvery, fork, put, all, call, takeLatest } from "redux-saga/effects";

import { publish_survey_success } from "./actions";


import {ADDSURVEY,ADDSETTINGS,SUBMITSURVEYTOBACKEND} from './actionTypes'


import {post_surveys} from '../../helpers/fakebackend_helper'

 function* post_survey({ payload: { data,user_id:id,  history } }) {
    

  try {
    const response = yield call(
      post_surveys,
      `https://backendapp.murmurcars.com/api/v1/surveys/survey/create/${id}`,
      {
        data
      }
    );
    }catch{

    }
}

export function* watchPostingSurvey() {
  yield takeEvery(SUBMITSURVEYTOBACKEND, post_survey);
}


function* survey_saga() {
    yield all([fork(watchPostingSurvey)]);
  }
export default survey_saga;

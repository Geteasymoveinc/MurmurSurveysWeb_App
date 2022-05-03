// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects";


import {FETCHUSERANALYTICS} from './actionTypes'

import { fetchUserAnalyticsSuccess } from "./actions";

import {fetch_user_analytics} from '../../helpers/fakebackend_helper'

function* UsersAnalytics ({payload: {url}}){
   try{
    console.log(url)
    const response =  yield call(fetch_user_analytics, url)
  
    const {campaigns, surveys,users} = response.data
   

    yield put(fetchUserAnalyticsSuccess(campaigns,surveys,users))
   }catch(err){

   }

}


export function* watchUsersAnalytics(){
    yield takeEvery(FETCHUSERANALYTICS, UsersAnalytics);
}

function* UserSaga() {
    yield all([fork(watchUsersAnalytics)]);
  }

export default UserSaga
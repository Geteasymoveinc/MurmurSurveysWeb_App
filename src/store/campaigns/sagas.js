// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects";


import {FETCHCAMPAIGNS} from './actionTypes'

import { fetchCampaignsSuccess } from "./actions";

import {fetch_campaigns} from '../../helpers/fakebackend_helper'

function* Campaigns ({payload: {url}}){
   try{
    console.log(url)
    const response =  yield call(fetch_campaigns, url)
  
    console.log(response)
   
    const {campaigns,requests} = response.data
    yield put(fetchCampaignsSuccess(campaigns,requests))
   }catch(err){

   }

}


export function* watchCampaigns(){
    yield takeEvery(FETCHCAMPAIGNS, Campaigns);
}

function* CampaignsSaga() {
    yield all([fork(watchCampaigns)]);
  }

export default CampaignsSaga
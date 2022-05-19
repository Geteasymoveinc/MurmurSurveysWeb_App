// @flow
import { all, call, fork, takeEvery, put } from "redux-saga/effects";


import {FETCHCUSTOMERS} from './actionTypes'

import  {fetchCustomersSuccess} from "./actions";

import {fetch_customers} from '../../helpers/fakebackend_helper'

function* Customers ({payload: {url}}){
   try{
  
    const response =  yield call(fetch_customers, url)
  
    const {customers, length, page} = response.data
   

    yield put( fetchCustomersSuccess(customers, length))
   }catch(err){

   }

}


export function* watchCustomers(){
    yield takeEvery(FETCHCUSTOMERS, Customers);
}

function* CustomersSaga() {
    yield all([fork(watchCustomers)]);
  }

export default CustomersSaga
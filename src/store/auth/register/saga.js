import {
  takeEvery,
  takeLatest,
  fork,
  put,
  all,
  call,
} from "redux-saga/effects";

//Account Redux states
import { NEW_USER } from "./actionTypes";

import {registerUserError, registerUserSuccessfull} from './actions'

import { postRegister } from "../../../helpers/fakebackend_helper";

// Is user register successfull then direct plot user in redux.
function* registerUserFn({ payload: { user, history } }) {

try{
  if (user.email) {
    const fullName = user.fullName;
    const email = user.email;
    const password = user.password;
    const phone_number = user.phone_number;
    const company = user.company;
  

    const registered_user = {
      fullName,
      password,
      email,
      phone_number,
      company
    };

    const response = yield call(
      postRegister,
      "https://backendapp.getinsightiq.com/api/v1/surveys/customers/signup",
      //"http://localhost:4000/api/v1/surveys/customers/signup",
      registered_user
    );
  if(response.status === 204){
    
    yield put(registerUserError(response.message))
    return
  }
    
    yield put(registerUserSuccessfull(response));
    sessionStorage.setItem('authUser', email)
    history.push("/");
  } else {
    history.replace("/register");
  }
}catch(err){
      yield put(registerUserError(err))
}
}

export function* watchUserRegister() {
  yield takeEvery(NEW_USER, registerUserFn);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;

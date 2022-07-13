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
      company,
      role:'2'
    };

    const response = yield call(
      postRegister,
      "https://backendapp.murmurcars.com/api/v1/users/signup",
      //"http://localhost:4000/api/v1/users/signup",
      registered_user
    );
  
    yield put(registerUserSuccessfull(response));
    sessionStorage.setItem('authUser', email)
    history.push("/surveys");
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

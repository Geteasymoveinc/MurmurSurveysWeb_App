import { all } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import GoogleAuthSaga from "./helpers/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ResetPasswordSaga from './auth/reset-password/saga'
import LayoutSaga from "./layout/saga";



//surveys

import  SurveySaga from "./survey/sagas";

export default function* rootSaga() {
  yield all([
    //public
    AccountSaga(),
    AuthSaga(),
    GoogleAuthSaga(),
    ForgetSaga(),
    ResetPasswordSaga(),
    LayoutSaga(),
    //private
    SurveySaga()
  ]);
}

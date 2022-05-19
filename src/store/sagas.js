import { all } from "redux-saga/effects";


import LayoutSaga from "./layout/saga";
import AuthSaga from './auth/login/saga'


import UserSaga from "./users/sagas";
import CampaignsSaga from "./campaigns/sagas";
import SurveysSaga from "./surveys/sagas";
import CustomersSaga from "./customers/sagas";

export default function* rootSaga() {
  yield all([
    //public
   AuthSaga(),
    LayoutSaga(),
    //auth
    UserSaga(),
    CampaignsSaga(),
    SurveysSaga(),
    CustomersSaga()
  ]);
}

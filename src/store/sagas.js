import { all } from "redux-saga/effects";


import LayoutSaga from "./layout/saga";
import UserSaga from "./users/sagas";
import CampaignsSaga from "./campaigns/sagas";


import AuthSaga from './auth/login/saga'

export default function* rootSaga() {
  yield all([
   AuthSaga(),
    LayoutSaga(),
    UserSaga(),
    CampaignsSaga()
  ]);
}

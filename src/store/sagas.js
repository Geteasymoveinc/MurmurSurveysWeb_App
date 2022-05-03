import { all } from "redux-saga/effects";


import LayoutSaga from "./layout/saga";
import UserSaga from "./users/sagas";
import CampaignsSaga from "./campaigns/sagas";

export default function* rootSaga() {
  yield all([
 
    LayoutSaga(),
    UserSaga(),
    CampaignsSaga()
  ]);
}

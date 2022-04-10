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

// Is user register successfull then direct plot user in redux.
function* registerUserFn({ payload: { user, history } }) {
  try {
    history.push("/business");
  } catch (error) {}
}

export function* watchUserRegister() {
  yield takeEvery(NEW_USER, registerUserFn);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;

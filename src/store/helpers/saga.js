import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { GOOGLE_LOGIN } from "./actionTypes";
import { google_success, google_failed } from "./actions";

//Include Both Helper File with needed methods
import { queryForEmail } from '../../helpers/fakebackend_helper';


function* loginUser({ payload: { email, history } }) {
    console.log(email)
  try {
    const response = yield call(
      queryForEmail,
      "https://backendapp.murmurcars.com/api/v1/users/checkEmail",
      {
        email: email,
      }
    );
    const data = response.resp.at(-1)
    sessionStorage.setItem("authUser", data.email);

    yield put(google_success(data));

    history.push("/dashboard");
  } catch (error) {
    yield put(google_failed(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(GOOGLE_LOGIN, loginUser);
}

function* googleAuthSaga() {
  yield all([fork(watchUserLogin)]);
}

export default googleAuthSaga;

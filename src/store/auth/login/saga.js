import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { loginSuccess, logoutUserSuccess, apiError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postLogin } from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      yield put(loginSuccess(response));
    } else {
      console.log(user.email, user.password);
      const response = yield call(
        postLogin,
      "https://backendapp.murmurcars.com/api/v1/users/login",
        //"http://localhost:4000/api/v1/users/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      console.log(response)
      sessionStorage.setItem("authUser", response.resp[0].email);
      yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    console.log('error is ' + error)
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("profileImage");
    sessionStorage.removeItem("authUser");
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("user");


    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)]);
}

export default authSaga;

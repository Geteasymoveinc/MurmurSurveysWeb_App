import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { loginSuccess, logoutUserSuccess, apiError } from "./actions";


import { postLogin } from "../../../helpers/fakebackend_helper";



function* loginUser({ payload: { user, history } }) {
  try {

      const response = yield call(
        postLogin,
        "https://backendapp.murmurcars.com/api/v1/users/login",
        //"http://localhost:4000/api/v1/users/login",
        {
          email: user.email,
          password: user.password,
        }
      );

      const image = response.resp.at(-1).profilePhoto;

      
      sessionStorage.setItem("authUser", response.resp.at(-1).email);

      if (image) {
        sessionStorage.setItem("profileImage", image);
      }
      yield put(loginSuccess(response));
    
    history.push("/dashboard");
  } catch (error) {
    if (error.status) {
      yield put(apiError(error.message));
      history.push("/login");
    } else {
      yield put(apiError("Please contact Murmur technical Support"));
      history.push("/login");
    }
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("profileImage");
    sessionStorage.removeItem("authUser");


 
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

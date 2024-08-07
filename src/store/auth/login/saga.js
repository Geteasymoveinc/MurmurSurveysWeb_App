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
      const response = yield call(
        postLogin,
        "https://backendapp.getinsightiq.com/api/v1/surveys/customer/login",
        //"https://backendapp.getinsightiq.com/api/v1/surveys/customers/login",
        {
          email: user.email,
          password: user.password
        }
      );
  
      console.log(response)
      const image = response.resp.profilePhoto;
      sessionStorage.setItem("authUser", response.resp.email);
      if (image) {
        sessionStorage.setItem("profileImage", image);
      }
      document.title = 'InsightsIQ | Transforming User Feedback into Actionable AI-driven Insights';
      yield put(loginSuccess(response));
    }
   history.push("/");
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

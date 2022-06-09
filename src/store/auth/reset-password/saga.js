import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { RESET_PASSWORD } from "./actionTypes";
import { resetPwdSuccess, resetPwdFailed } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postForgetPwd } from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* resetPassword({ payload: { token, password, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.forgetPassword, {
        token,
        password,
      });

      if (response) {
        yield put(resetPwdSuccess({ message: response.message, password }));
      }
    } else {

      const response = yield call(
        postForgetPwd,
        "https://backendapp.murmurcars.com/api/v1/users/reset-password",
        //"http://localhost:4000/api/v1/users/reset-password",
        { password, token }
      );
      
      if (response) {
        yield put(resetPwdSuccess({ message: response.message, password }));
        history.push("/login");
      }
    }
  } catch (error) {
    yield put(resetPwdFailed(error));
  }
}

export function* watchUserPasswordReset() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

function* resetPasswordSaga() {
  yield all([fork(watchUserPasswordReset)]);
}

export default resetPasswordSaga;

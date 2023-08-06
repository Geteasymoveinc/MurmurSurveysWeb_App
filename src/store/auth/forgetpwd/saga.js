import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { FORGET_PASSWORD } from "./actionTypes";
import { userForgetPasswordSuccess, userForgetPasswordError } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postForgetPwd } from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { email, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.forgetPassword, email);

      if (response) {
        yield put(
          userForgetPasswordSuccess(
            {message:"Reset link are sended to your mailbox, check there first", email}
          )
        );
      }
    } else {
  
      const response = yield call(
        postForgetPwd,
        "https://backendapp.getinsightiq.com/api/v1/surveys/customers/forgot-password",
        //"http://localhost:4000/api/v1/surveys/customers/forgot-password",
         {email}
      );
      if (response) {
        
        yield put(
          userForgetPasswordSuccess(
            {message:response.message, email}
          )
        );
        history.push('/email-sent')
      }
    }
  } catch (error) {
    if(error.status){
      yield put(userForgetPasswordError(error.message))
    }else{
      yield put(userForgetPasswordError('Please contact our technical Support'))
    }
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser);
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)]);
}

export default forgetPasswordSaga;

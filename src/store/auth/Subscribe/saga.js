import {
  takeEvery,
  takeLatest,
  fork,
  put,
  all,
  call,
} from "redux-saga/effects";

//Account Redux states
import { SUBSCRIBE } from "./actionTypes";
import { subscribeSuccesfully, subscriptionUserFailed } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { subscribe } from "../../../helpers/fakebackend_helper";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* subscribeFn({ payload: { subscriber, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.initFirebaseBackend,
        subscriber
      );

      yield put(subscribeSuccesfully(subscriber));
      setTimeout(() => history.push("/login"), 2000);
    } else {
      let source = [];

      if (subscriber) {
        console.log(subscriber);
        source = subscriber;

        const firstName = source.fullName.split(" ")[0];
        const lastName = source.fullName.split(" ")[1];
        const email = source.email;
        const phoneNumber = source.phone_number;
        const company = source.company;
        console.log(firstName, lastName, company, phoneNumber, email);
        const subscribed_user = {
          firstName,
          lastName,
          email,
          phoneNumber,
          company,
        };

        const response = yield call(
          subscribe,
          "https://backendapp.murmurcars.com/api/v1/subscribe/mailchimp",
          subscribed_user
        );
        console.log(response);

        yield put(subscribeSuccesfully(response));

        sessionStorage.setItem("authUser", email);
        sessionStorage.removeItem("user");
        history.push('/dashboard')
      } else {
        history.replace("/register");
      }
    }
  } catch (error) {
    console.log(error);
    sessionStorage.removeItem("user");
    yield put(subscriptionUserFailed(error));
  }
}

export function* watchUserSubscribe() {
  yield takeEvery(SUBSCRIBE, subscribeFn);
}

function* subscribeSaga() {
  yield all([fork(watchUserSubscribe)]);
}

export default subscribeSaga;

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
import {  subscribeBackend } from "../../../helpers/fakebackend_helper";

// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();

// Is user register successfull then direct plot user in redux.
function* subscribeFn({ payload: { subscribe, subscriber, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.initFirebaseBackend,
        subscriber
      );

      yield put(subscribeSuccesfully(subscriber));
      setTimeout(() => history.push("/"), 2000);
    } else {
      if (subscriber) {
        const firstName = subscriber.fullName.split(" ")[0];
        const lastName = subscriber.fullName.split(" ")[1];
        const email = subscriber.email;
        const phoneNumber = subscriber.phone_number;
        const company = subscriber.company;

        
        const subscribed_user = {
          firstName,
          lastName,
          email,
          phoneNumber,
          company,
        };
        console.log('in saga')
        if(subscribe){
         console.log(subscribed_user)

        const response = yield call(
          subscribeBackend,
          "http://localhost:4000/api/v1/subscribe/mailchimp",
          subscribed_user
        );

        yield put(subscribeSuccesfully(response));
        sessionStorage.setItem('authUser', email)
        history.push("/dashboard");
        }else{

          sessionStorage.setItem('authUser', email)
          history.push("/dashboard");
        }
      } else {
    
        history.replace("/register");
      }
    }
  } catch (error) {
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

import { takeEvery, fork, put, all, call, select } from "redux-saga/effects";

//Account Redux states
import { ADD__PACKAGE } from "./actionTypes";


//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postRegister } from "../../../helpers/fakebackend_helper";

import {
  sendPackageSuccessfully,
  sendPackageFailed,
  errorCleanup,
  addPackage
} from "./actions";




// initialize relavant method of both Auth
const fireBaseBackend = getFirebaseBackend();


function* addPackageFn({ payload: { option, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.initFirebaseBackend, option);
      yield put(addPackage(response));
    } else {

 
      
        const fullName = option.user.fullName;
        const email =option.user.email;
        const password = option.user.password;
        const phone_number =option.user.phone_number;
        const company = option.user.company;
        const advertise_options = option.option;

        const registered_user = {
          fullName,
          password,
          email,
          phone_number,
          company,
          advertise_options,
        }

       
        const response = yield call(
          postRegister,
          "https://backendapp.murmurcars.com/api/v1/users/signup",
          registered_user
        );
      

        yield put(sendPackageSuccessfully(response));
        history.push('/subscribe')
  }
  } catch (error) {

    yield put(sendPackageFailed(error));
    sessionStorage.removeItem("user");

     history.replace("/register")
   

  }
}

export function* watchUserAddGoal() {
  yield takeEvery(ADD__PACKAGE, addPackageFn);
}

function* packageSaga() {
  yield all([fork(watchUserAddGoal)]);
}

export default packageSaga;

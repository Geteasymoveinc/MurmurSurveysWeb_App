import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { GOOGLE_LOGIN } from "./actionTypes";
import { google_success, google_failed } from "./actions";

//Include Both Helper File with needed methods
import { queryForEmail } from "../../helpers/fakebackend_helper";


function* loginUser({ payload: { profile, history } }) {
     console.log(profile.email)

  try {
    const response = yield call(
      queryForEmail,
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${true}`,
      //`http://localhost:4000/api/v1/users/checkemail/${true}`,
      {
        email: profile.email,
      }
    );
    const data = response.resp;
    console.log('this is the status')
    console.log(data)

    if(data.status!==204){
    sessionStorage.setItem("authUser", data.email);
    const image = data.profilePhoto
    console.log(image)
    if(image){
      sessionStorage.setItem("profileImage", image);
    }else{
      sessionStorage.setItem('profileImage', profile.picture)
    }
    
    sessionStorage.setItem(
      "fullName",
      profile.given_name +
        " " +
        profile.family_name
    );
    yield put(google_success(data));

    history.push("/dashboard");
    }else{
      history.push('/register')
    }
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

import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import ResetPassword from "./auth/reset-password/reducer";

import GoogleAuth from "./helpers/reducer";

//surveys
import Survey from './survey/reducer'

const rootReducer = combineReducers({
  //public
  Layout,
  Login,
  Account,
  ForgetPassword,
  ResetPassword,
  GoogleAuth,
  //private
  Survey
});

export default rootReducer;

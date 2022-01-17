import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import ResetPassword from './auth/reset-password/reducer'
import Business from "./auth/business/reducer";
import Subscribe from "./auth/Subscribe/reducer";
import GoogleAuth from "./helpers/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  ResetPassword,
  Business,
  Subscribe,
  GoogleAuth,
});

export default rootReducer;

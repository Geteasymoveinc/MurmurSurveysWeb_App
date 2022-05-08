import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import Users from "./users/reducer";
import Campaigns from "./campaigns/reducer";


//auth
import Login from './auth/login/reducer'

const rootReducer = combineReducers({
  Login,
  Layout,
  Users,
  Campaigns
  
});

export default rootReducer;

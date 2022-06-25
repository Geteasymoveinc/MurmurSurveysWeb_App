import { combineReducers } from "redux";


import Users from "./users/reducer";
import Campaigns from "./campaigns/reducer";
import Surveys from "./surveys/reducer";
import Customers from "./customers/reducer";
import Survey from './survey/reducer'

import Login from './auth/login/reducer'
import Layout from "./layout/reducer";

const rootReducer = combineReducers({
  //public
  Login,
  Layout,
  //auth
  Users,
  Campaigns,
  Surveys,
  Customers,
  Survey
});

export default rootReducer;

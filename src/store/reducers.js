import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import Users from "./users/reducer";
import Campaigns from "./campaigns/reducer";

const rootReducer = combineReducers({
  
  Layout,
  Users,
  Campaigns

});

export default rootReducer;

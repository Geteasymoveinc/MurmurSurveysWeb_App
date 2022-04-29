import React from "react";
import { Redirect } from "react-router-dom";


import Dashboard from "../pages/admin/Dashboard/index";
import Campaigns from '../pages/admin/Campaigns/index'
import Surveys from '../pages/admin/Surveys/index'


const authProtectedRoutes = [
  { path: '/campaigns', component: Campaigns },
  //{ path: "/campaigns/:adId", component: Campaigns},
  { path: "/dashboard", component: Dashboard },
  { path: "/surveys", component: Surveys},
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];



export { authProtectedRoutes };

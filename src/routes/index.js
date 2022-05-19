import React from "react";
import { Redirect } from "react-router-dom";


import Login from '../pages/admin/AuthPage/index.'
import Logout from "../pages/admin/AuthPage/Logout";


import Dashboard from "../pages/admin/Dashboard/index";
import Campaigns from '../pages/admin/Campaigns/index'
import Surveys from '../pages/admin/Surveys/index'
import Customers from "../pages/admin/Customers/index";

const publicPages = [
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
  { path: "/", exact: true, component: () => <Redirect to="/login" /> }
]


const authProtectedRoutes = [
  { path: '/campaigns', component: Campaigns },
  { path: "/dashboard", component: Dashboard },
  { path: "/surveys", component: Surveys},
  { path: '/customers', component: Customers}
  //{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];



export { authProtectedRoutes, publicPages};

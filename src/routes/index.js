import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/newLogin/index";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/newRegister/index";
import ForgetPwd from "../pages/Authentication/Forgotpassword/index";

import Business from "../pages/Authentication/Business-goals/index";
import Subscribe from "../pages/Authentication/Subscribe/index";
import EmailSent from "../pages/Authentication/email-sent";
import resetPassword from "../pages/Authentication/ResetPassword/reset-password";

// Dashboard

import Surveys from "../pages/Dashboards/surveys/surveys";


const authProtectedRoutes = [

  { path: "/surveys", component: Surveys },
  { path: "/", exact: true, component: () => <Redirect to="/surveys" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/email-sent", component: EmailSent },
  { path: "/register", component: Register },
  { path: "/reset-password", component: resetPassword },
  { path: "/subscribe_package", component: Business },
  { path: "/subscribe", component: Subscribe },
];

export { authProtectedRoutes, publicRoutes };

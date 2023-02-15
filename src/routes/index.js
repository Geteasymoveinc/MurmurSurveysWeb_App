import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/newLogin/index";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/newRegister/index";
import ForgetPwd from "../pages/Authentication/Forgotpassword/index";
import EmailSent from "../pages/Authentication/email-sent";
import resetPassword from "../pages/Authentication/ResetPassword/reset-password";


// Dashboard
import Surveys from "../pages/Dashboards/surveys/surveys";
import Settings from "./../pages/Settings/index";
import PaymentSuccess from "../pages/Dashboards/payment-success";
import PaymentFailed from "../pages/Dashboards/payment-failed";


const authProtectedRoutes = [
  { path: "/settings", component: Settings },
  { path: "/surveys", component: Surveys },
  { path: '/payment-success', component: PaymentSuccess},
  { path: '/payment-failed', component: PaymentFailed},
  { path: "/", exact: true, component: () => <Redirect to="/surveys" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/email-sent", component: EmailSent },
  { path: "/register", component: Register },
  { path: "/reset-password", component: resetPassword }
];

export { authProtectedRoutes, publicRoutes };

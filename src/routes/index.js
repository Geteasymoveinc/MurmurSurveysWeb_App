

// Authentication related pages
import Login from "../pages/Authentication/newLogin/index";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/newRegister/index";
import ForgetPwd from "../pages/Authentication/Forgotpassword/index";
import EmailSent from "../pages/Authentication/email-sent";
import resetPassword from "../pages/Authentication/ResetPassword/reset-password";

// Dashboard
import Main from "../pages/Dashboards";
import Projects from "../pages/Dashboards/projects";
import Settings from "./../pages/Settings/index";
import PaymentSuccess from "../pages/Dashboards/payment-success";
import PaymentFailed from "../pages/Dashboards/payment-failed";
import Subscription from "../pages/Subscription";
import billingHistory from "../pages/Subscription/billing-history";

const authProtectedRoutes = [
  { path: "/surveys", component: Projects },
  { path: "/settings", component: Settings },
  { path: "/payment-success", component: PaymentSuccess },
  { path: "/payment-failed", component: PaymentFailed },
  { path: "/subscription", component: Subscription },
  { path: "/billing", component: billingHistory },
  { path: "/", exact: true, component: Main },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/email-sent", component: EmailSent },
  { path: "/register", component: Register },
  { path: "/reset-password", component: resetPassword },
];

export { authProtectedRoutes, publicRoutes };

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
import Dashboard from "../pages/Dashboard/index";
import CreateDeliveryRequest from "./../pages/Delivery/CreateDeliveryRequest";
import DriversInYourArea from "./../pages/Delivery/DriversInYourArea";
import AllProducts from "./../pages/Products/AllProducts";
import AddProduct from "./../pages/Products/AddProduct";
import ProductDashboard from "../pages/Products/ProductDashboard";
import AllCoupons from "../pages/Coupons/AllCoupons";
import CouponDashboard from "../pages/Coupons/CouponDashboard";
import CreateCoupon from "./../pages/Coupons/CreateCoupon";
import Contacts from "./../pages/Customers/Contacts";
import ViewAllNotifications from "./../components/CommonForBoth/TopbarDropdown/ViewAllNotifications";
import Chat from "./../pages/Messages/Messages";
import CreateAdDashboard from "./../pages/CreateAd/index";
import CampaignAnalytics from "./../pages/Analytics/index";
import AudienceManager from "./../pages/AudienceManager/index";
import Destination from "./../pages/Destination/index";
import Billing from "./../pages/Billing/index";
import Pixel from "./../pages/Pixel/index";
import Settings from "./../pages/Settings/index";
import ABTesting from "./../pages/ABTesting/index";
import StreetIQMain from "./../pages/StreetIQ/index";

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/create-delivery-request", component: CreateDeliveryRequest },
  { path: "/drivers-near-me", component: DriversInYourArea },
  { path: "/all-products", component: AllProducts },
  { path: "/add-product", component: AddProduct },
  { path: "/product-dashboard", component: ProductDashboard },
  { path: "/coupon-dashboard", component: CouponDashboard },
  { path: "/all-coupons", component: AllCoupons },
  { path: "/create-coupon", component: CreateCoupon },
  { path: "/contacts", component: Contacts },
  { path: "/view-all-notifications", component: ViewAllNotifications },
  { path: "/chat", component: Chat },
  { path: "/ad-manager", component: CreateAdDashboard },
  { path: "/ad-manager/:adId", component: CreateAdDashboard },
  { path: "/analytics", component: CampaignAnalytics },
  { path: "/audience-manager", component: AudienceManager },
  { path: "/destination", component: Destination },
  { path: "/billing", component: Billing },
  { path: "/pixel", component: Pixel },
  { path: "/settings", component: Settings },
  { path: "/testing", component: ABTesting },
  { path: "/streetIQ", component: StreetIQMain },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path:'/email-sent', component: EmailSent },
  { path: "/register", component: Register },
  { path:'/reset-password', component:resetPassword},
  { path: '/business', component: Business},
  { path: '/subscribe', component: Subscribe}
  /*{
    path: "/business",
    component: () => {
      if (
        !JSON.parse(sessionStorage.getItem("user")) &&
        !sessionStorage.getItem("authUser")
      ) {
        return <Redirect to="/login" />;
      } else if (
        sessionStorage.getItem("authUser")
      ) {
        return <Redirect to="/" />;
      }
      return <Business />;
    },
  },
  {
    path: "/subscribe",
    component: () => {
      if (
        !JSON.parse(sessionStorage.getItem("user")) &&
        !sessionStorage.getItem("authUser")) 
       {
        return <Redirect to="/login" />;
      } else if (
        sessionStorage.getItem("authUser")
      ) {
        return <Redirect to="/" />;
      }
      return <Subscribe />;
    },
  },*/
];

export { authProtectedRoutes, publicRoutes };

import React from "react";
import { Route, Redirect } from "react-router-dom";

const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      console.log('check')
      console.log(isAuthProtected)
      console.log(sessionStorage.getItem('authUser'))
      if (isAuthProtected && !sessionStorage.getItem("authUser")) {
      
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default AppRoute;

import React, { Component } from "react";

//i18n
import { withNamespaces } from "react-i18next";
import GoogleMaps from "./GoogleMap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleGeoLocationPermission = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
  
        }else{
          console.log('permission denied')
        }
        permissionStatus.onchange = function () {};
      });
  };

  componentDidMount(){
       this.handleGeoLocationPermission()
  }

  render() {
    return (
      <React.Fragment>
        <GoogleMaps />
      </React.Fragment>
    );
  }
}

export default withNamespaces()(Dashboard);

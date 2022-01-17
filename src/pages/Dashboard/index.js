import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

//import Charts
import StackedColumnChart from "./StackedColumnChart";
import DeliveryPieChart from "./DeliveryPieChart";
//import DeliveryDriversMap from "./DeliveryDriversMap"

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components

import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import CampaignData from "./CampaignData";
import LatestTranaction from "./LatestTranaction";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import classes from '../../assets/css/Dashboard/dashboard.module.css'


//i18n
import { withNamespaces } from "react-i18next";
import GoogleMaps from "./GoogleMap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      reports: [
        { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
        {
          title: "Revenue",
          iconClass: "bx-archive-in",
          description: "$35, 723",
        },
        {
          title: "Average Price",
          iconClass: "bx-purchase-tag-alt",
          description: "$16.2",
        },
      ],
      email: [
        { title: "Week", linkto: "#", isActive: false },
        { title: "Month", linkto: "#", isActive: false },
        { title: "Year", linkto: "#", isActive: true },
      ],
      modal: false,
    };
    this.togglemodal.bind(this);
  }

  componentDidMount() {
    this.handleGeoLocationPermission();
  }

  //Geolocation Permission

  handleGeoLocationPermission = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (permissionStatus) {
        if (permissionStatus.state === "granted") {
        }
        permissionStatus.onchange = function () {};
      });
  };

  togglemodal = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  render() {
    return (
      <React.Fragment>

          <GoogleMaps />

      </React.Fragment>
    );
  }
}

export default withNamespaces()(Dashboard);

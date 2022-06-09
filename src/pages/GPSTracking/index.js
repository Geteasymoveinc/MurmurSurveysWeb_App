import React, { Component } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polygon,
  InfoWindow,
  Circle,
} from "google-maps-react";
import ReactStars from "react-rating-stars-component";

import classes from "../../assets/css/Dashboard/dashboard.module.css";
import classes2 from "../../assets/css/gps-tracking/index.module.css";
import "../../assets/css/app.css";
import googleStyles from "../Dashboard/google-styles";

import { Google_Map_Styles } from "./map_styles";
import { GOOGLE_MAP_KEY } from "../../api";
//import moment from "moment";
import axios from "axios";
import MurmurBackpackWalkerIcon from "../../../src/assets/images/MurmurBackpackWalker.gif";
import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import ModalFooter from "reactstrap/lib/ModalFooter";
import Directions from "./Directions";
import { Link } from "react-router-dom";
import GPSPieChart from "./PieChart";

//const firebase = require("firebase/app");
//const db = firebase.database();

//const ref = db.ref(`/backpackwalkers/${moment().format("MMM Do YY")}`);
//const io = require("socket.io-client");
// const socket = io.connect("https://backendapp.murmurcars.com/", {
//   path: "/socket.io",
// });
//const socket = io.connect("http://localhost:7444/", {});

class GPS_TRACKING extends Component {
  state = {
    fullName: "",
    Coords: {},
    mapCenter: { lat: null, lng: null },
    Markers: [],
    FullName: "",
    latitude: null,
    longitude: null,
    coords: null,
    keyValue: null,
    submitted: false,
    Walkers: [],
    WalkersStatus: false,
    NumberOfWalkers: null,
    modalStatus: false,
    partner_name: "",
    partner_startTime: "",
    partner_StartedGPSCoords: {},
    partner_StoppedGPSCoords: {},
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        mapCenter: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });

      setInterval(
        () => this.handleGET_The_List_of_Online_Backpackwalkers(),
        5850
      );
    });
  }

  handleGET_The_List_of_Online_Backpackwalkers = () => {
    axios
      .get(
        "https://backendapp.murmurcars.com/api/v1/gps/get-list-online-backpackwalkers"
      )
      .then((response) => {
        response.data.map((item) => {
          if (item.GPS_Tracker.length !== 0) {
            let Partners = [];
            // console.log("this is item", item.GPS_Tracker[0]);
            // Partners.push(item.GPS_Tracker[0]);

            this.state.Walkers.push(item.GPS_Tracker[0]);
            this.setState({
              WalkersStatus: true,
              NumberOfWalkers: this.state.Walkers.length,
            });
            setTimeout(
              () => this.setState({ Walkers: [], WalkersStatus: false }),
              5000
            );
            //console.log("From Axios", this.state);
            //this.handleMarkersonMap();
          } else {
            this.setState({ NumberOfWalkers: this.state.Walkers.length });
          }
        });
      })
      .catch((error) => console.log(error));
  };
  handleMarkerClick = (data) => {
    this.setState({
      modalStatus: true,
      partner_name: data.name,
      partner_StartedGPSCoords: data.StartedGPSCoords,
      partner_StoppedGPSCoords: data.StoppedGPSCoords,
      partner_startTime: data.startTime,
      formattedOrigin: data.StartedGPSCoords,
      formattedDestination: data.StoppedGPSCoords,
      Number,
    });
  };

  handleMarkersonMap = (props) => {
    let tMarkers = [];

    this.state.Walkers.map((data) => {
      const triangleCoords = {
        lat: data.StoppedGPSCoords.lat,
        lng: data.StoppedGPSCoords.lng,
      };

      tMarkers.push(
        <Marker
          title={"The marker`s title will appear as a tooltip."}
          label={data.name}
          position={triangleCoords}
          onClick={() => this.handleMarkerClick(data)}
          icon={{
            url: require("../../assets/images/MurmurBackpackWalker.png"),
            anchor: new props.google.maps.Point(5, 58),
          }}
        >
          <InfoWindow
            //marker={this.state.activeMarker}
            visible={true}
          >
            <div>
              <h1>{data.name}</h1>
            </div>
          </InfoWindow>
        </Marker>
      );
    });

    return tMarkers;
  };

  handleCirclesonMap = () => {
    let tCircles = [];

    this.state.Walkers.map((data) => {
      const triangleCoords = {
        lat: data.StoppedGPSCoords.lat,
        lng: data.StoppedGPSCoords.lng,
      };

      tCircles.push(
        <Circle
          radius={120}
          center={triangleCoords}
          // onMouseover={() => console.log("mouseover")}
          // onClick={() => console.log("click")}
          // onMouseout={() => console.log("mouseout")}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor="#FF0000"
          fillOpacity={0.2}
        />
      );
    });

    return tCircles;
  };

  render() {
    return (
      <React.Fragment>
        {this.state.mapCenter.lat ? (
          <div className={classes.dash_right}>
            <div className={classes.map}>
              <Map
                google={this.props.google}
                zoom={15}
                styles={Google_Map_Styles}
                initialCenter={this.state.mapCenter}
                fullscreenControl={false}
                draggable={true}
                center={this.state.mapCenter}
                scrollwheel={true}
                mapTypeControl={false}
                disableDoubleClickZoom={false}
                disableDefaultUI={true}
                keyboardShortcuts={false}
              >
                {this.state.WalkersStatus ? (
                  this.handleMarkersonMap(this.props)
                ) : (
                  <Card>{this.state.WalkersStatus}</Card>
                )}
                {/* {this.state.WalkersStatus ? this.handleCirclesonMap() : null} */}
              </Map>
            </div>
          </div>
        ) : null}
        {this.state.NumberOfWalkers ? (
          <div className={classes.head_search_dashboard}>
            <div className={classes.head_search}>
              <div className={`${classes.dash_relative} ${classes.search_box}`}>
                <input
                  type="text"
                  placeholder="Search"
                  value={`There are ${this.state.NumberOfWalkers} Murmur Partners`}
                />
                <div className={classes.search_box_flex}>
                  <ProfileMenu scope={"global"} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Modal
          isOpen={this.state.modalStatus}
          //toggle={this.props.toggleModal}
          className="setting_cancel_modal"
        >
          <ModalHeader>
            <div className={`position-relative max_343`}>
              <Col>
                {/* <img
                  //className="rounded-circle header-profile-user"
                  className={`${
                    this.props.scope === "global"
                      ? classes.profil_img
                      : this.props.scope === "survey"
                      ? classes.profil_img
                      : classes.profil_cover_img
                  }`}
                  src={require("../../assets/images/MurmurBackpackWalker.png")}
                  alt="Header Avatar"
                /> */}
              </Col>
              <Col>
                <span>{this.state.partner_name}</span>{" "}
              </Col>
              <Col>
                Well Performing Partner
                <ReactStars
                  count={5}
                  //onChange={ratingChanged}
                  size={24}
                  value={5}
                  activeColor="#ffd700"
                />
              </Col>
            </div>
          </ModalHeader>
          <ModalBody>
            <form>
              <div className="form_element_modal">
                <label htmlFor="about_reason">
                  {this.state.partner_name} daily generates: {"\n"} ~14772
                  Impressions, ~5435 Views.
                </label>
              </div>
              <div className="form_element_modal">
                <label htmlFor="about_reason">
                  It is beta feature. This data is not a real-time and based on
                  statistics which we collect every week.
                </label>
              </div>
              <div
                className={`${classes2.map_container} form_element_btn text-center`}
              >
                <Row>
                  <Col>
                    <GPSPieChart
                      male={"50%"}
                      female={"50%"}
                      location={"Baku"}
                      labels={["males", "females"]}
                    />
                  </Col>
                  <Col>
                    <GPSPieChart
                      male={"80%"}
                      female={"20%"}
                      location={"Baku"}
                      labels={["Android", "iOS"]}
                    />
                  </Col>
                </Row>
                <Row>
                  <label></label>
                </Row>

                {/* <Map
                  google={this.props.google}
                  zoom={10}
                  styles={Google_Map_Styles}
                  initialCenter={this.state.mapCenter}
                  fullscreenControl={false}
                  draggable={true}
                  center={this.state.mapCenter}
                  scrollwheel={true}
                  mapTypeControl={false}
                  disableDoubleClickZoom={false}
                  disableDefaultUI={true}
                  keyboardShortcuts={false}
                ></Map> */}
                {/* <Directions state={this.state}></Directions> */}
                {/* <DirectionsRenderer
                  directions={{
                    origin: this.state.formattedOrigin,
                    destination: this.state.formattedDestination,
                    travelMode: this.props.google.maps.TravelMode.DRIVING,
                  }}
                /> */}
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col></Col>
            </Row>
            <button
              type="button"
              className="reason_cancel_btn"
              onClick={() => {
                this.setState({ ...this.state, modalStatus: false });
              }}
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_KEY,
})(GPS_TRACKING);
import React, { Component } from "react";

import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polygon,
  Circle,
} from "google-maps-react";
import axios from "axios";

import Geocode from "react-geocode";

import { MapStyle } from "./mapStyles";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

const CarImage = "../../assets/images/car.png";

const firebaseConfig = {
  apiKey: "AIzaSyCufaPUqLeJ83iRcMEoq9wZoXxP8jyF2OY",
  authDomain: "murmurdriverreactnativeapp.firebaseapp.com",
  databaseURL: "https://murmurdriverreactnativeapp-default-rtdb.firebaseio.com",
  projectId: "murmurdriverreactnativeapp",
  storageBucket: "murmurdriverreactnativeapp.appspot.com",
  messagingSenderId: "476698745619",
  appId: "1:476698745619:web:32c16fa59b7df52a0818e6",
  measurementId: "G-B6HKFHXVNN",
};

const mapStyles = {
  width: "100%",
  height: "100%",
  //marginTop: "10%",
};

const LoadingContainer = (props) => (
  <div id="preloader">
    <div id="status">
      <div className="spinner-chase">
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
        <div className="chase-dot"></div>
      </div>
    </div>
  </div>
);

class StreetIQMap extends Component {
  state = {
    streetIQCardStatus: true,
    NumberOfDrivers: "",
  };

  handleRenderDriversCircleCoordinates = () => {
    let renderDriversCircle = [];
    const state = this.state;

    if (state.drivers.length === 0) {
    } else {
      state.drivers.map((item, key) => {
        if (item.Coordinates) {
          if (item.Coordinates.length === 1) {
            renderDriversCircle.push(
              <Circle
                radius={8}
                center={{
                  lat: parseFloat(item.Coordinates[0].coords.latitude),
                  lng: parseFloat(item.Coordinates[0].coords.longitude),
                }}
                onMouseover={() => console.log("mouseover")}
                onClick={() => console.log("click")}
                onMouseout={() => console.log("mouseout")}
                strokeColor="transparent"
                strokeOpacity={0}
                strokeWeight={5}
                fillColor="#200b47"
                fillOpacity={0.5}
              />
            );
          }
        }
      });
    }

    return renderDriversCircle;
  };

  distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  handleRenderDriversCoordinates = () => {
    let renderDrivers = [];
    const state = this.state;

    if (state.drivers.length === 0) {
    } else {
      state.drivers.map((item, key) => {
        if (item.Coordinates) {
          if (item.Coordinates.length === 1) {
            renderDrivers.push(
              <Marker
                key={key}
                title={`Driver ${item.username}`}
                name={item.username}
                position={{
                  lat: item.Coordinates[0].coords.latitude,
                  lng: item.Coordinates[0].coords.longitude,
                }}
                onMouseover={this.handleShowMarkerArea(item)}
                icon={require("../../assets/images/circles1.png")}
              />
            );
          }
        }
      });
    }

    return renderDrivers;
  };

  handleCloseStreetIQCard = () => {
    if (this.state.streetIQCardStatus === true) {
      this.setState({ streetIQCardStatus: false });
    } else {
      this.setState({ streetIQCardStatus: true });
    }
  };

  render() {
    const { places } = this.props.maping;
    console.log(places);
    return (
      <React.Fragment>
        <Map
          google={this.props.google}
          zoom={this.props.maping.zoom}
          styles={this.props.mapStyle}
          initialCenter={this.props.maping.center}
          draggable={true}
          center={this.props.maping.postCenter && this.props.maping.postCenter}
          fullscreenControl={false}
          mapTypeControl={false}
          disableDefaultUI={true}
          distanceToMouse={this.distanceToMouse}
        >
          {this.props.maping.coordinates.length &&
            this.props.maping.coordinates.map((coordinate, index) => {
              return (
                <Polygon
                  onClick={() => {
                    if (this.props.maping.districts.length) {
                      this.props.selectedDistrictData(
                        this.props.maping.districts[index]
                      );
                    }
                  }}
                  key={index}
                  paths={coordinate}
                  fillColor="#7356bd"
                  fillOpacity={0.35}
                  //fillOpacity="0.5"
                  strokeOpacity={0.8}
                  strokeWeight={1}
                  strokeColor="#200b47"
                />
              );
            })}
          {/* {this.handleRenderDriversCoordinates()}*/}
          {/*{this.handleRenderDriversCircleCoordinates()}*/}
          {places.length &&
            places.map((place, index) => (
              <Marker
                key={index}
                name={place.name}
                position={place.position}
                icon={require("../../assets/images/placeholder.png")}
              />
            ))}
        </Map>
        )
      </React.Fragment>
    );
  }
}

StreetIQMap.defaultProps = MapStyle;

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio",
  LoadingContainer: LoadingContainer,
})(StreetIQMap);

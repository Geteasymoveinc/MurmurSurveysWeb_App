import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker, Polygon } from "google-maps-react";

import googleMapStyles from "./google-styles";

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

const mapStyles = {
  width: "100%",
  height: "100%",
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

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRenderDriversCoordinates = () => {
    let renderDrivers = [];
    const props = this.props.state;

    if (props.drivers.length === 0) {
    } else {
      props.drivers.map((item, key) => {
        console.log(props.drivers);
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
                icon={require("../../assets/images/car.png")}
              />
            );
          }
        }
      });
    }

    return renderDrivers;
  }
 
  centerMoved(coord) {
    console.log(coord);
  }
  
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={this.props.state.zoom}
        styles={this.props.mapStyle}
        initialCenter={this.props.state.center}
        fullscreenControl={false}
        draggable={true}
        center={this.props.state.postCenter}
        scrollwheel={false}
        mapTypeControl={false}
        disableDoubleClickZoom={false}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        onDragend={(coord) => this.centerMoved(coord)}
      >
        <Polygon
          paths={this.props.state.coordinates}
          fillColor="#7356bd"
          fillOpacity={0.35}
          //fillOpacity="0.5"
          strokeOpacity={0.8}
          strokeWeight={1}
          strokeColor="#200b47"
          
        />
        {/*{this.handleRenderDriversCoordinates()}*/}
      </Map>
    );
  }
}

GoogleMap.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio",
  LoadingContainer: LoadingContainer,
})(GoogleMap);

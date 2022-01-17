import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    coordinates: navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }),
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={mapStyles}
        center={{
          lat: this.state.lat,
          lng: this.state.lng,
        }}
        streetViewControl={false}
        panControl={false}
        fullscreenControl={false}
        keyboardShortcuts={false}
        mapTypeControl={false}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAD0JbuK05MqCA4OZAt3ZVH7Fz7z_DsIP4",
})(MapContainer);

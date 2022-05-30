import React, { Component } from "react";
import { Google_Map_Styles } from "./map_styles";
import {
  GoogleMap,
  DirectionsRenderer,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsService,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={9}
      defaultCenter={props.mapCenter}
      defaultOptions={{ styles: Google_Map_Styles }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      )}
      <DirectionsRenderer
        directions={{
          origin: props.origin,
          destination: props.destination,
          //travelMode: google.maps.TravelMode.DRIVING,
        }}
      />
    </GoogleMap>
  ))
);

class Directions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getDirections();
  }

  getDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = this.props.state.partner_StartedGPSCoords;
    const destination = this.props.state.partner_StoppedGPSCoords;
    console.log("Direction", origin, destination);
    if (origin !== null && destination !== null) {
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
            console.log("Eto State", this.state);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    } else {
      console.log("Please mark your destination in the map first!");
    }
  };

  render(props) {
    return (
      <MyMapComponent
        mapCenter={this.props.state.mapCenter}
        origin={this.props.state.partner_StartedGPSCoords}
        destination={this.props.state.partner_StoppedGPSCoords}
        isMarkerShown={false}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `50%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `50%` }} />}
      />
    );
  }
}

export default Directions;

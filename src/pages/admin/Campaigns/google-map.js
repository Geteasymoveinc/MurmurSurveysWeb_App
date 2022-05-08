import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker, Polygon, InfoWindow } from "google-maps-react";

import googleMapStyles from "../../../assets/google/google-styles";

import { GOOGLE_MAP_KEY } from "../../../api";




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
    this.state = {
      streetIQCardStatus: true,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    };
  }


  render() {
    const { state} = this.props;


    return (
      <Map
        google={this.props.google}
        zoom={state.zoom}
        styles={this.props.mapStyle}
        initialCenter={state.center}
        fullscreenControl={false}
        draggable={true}
        center={state.postCenter}
        scrollwheel={false}
        mapTypeControl={false}
        disableDoubleClickZoom={false}
        disableDefaultUI={true}
        keyboardShortcuts={false}

      >
        <Polygon
          paths={state.coordinates}
          fillColor="#7356bd"
          fillOpacity={0.35}
          //fillOpacity="0.5"
          strokeOpacity={0.8}
          strokeWeight={1}
          strokeColor="#200b47"
        />
      </Map>
    );
  }
}

GoogleMap.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_KEY,
  LoadingContainer: LoadingContainer,
})(GoogleMap);

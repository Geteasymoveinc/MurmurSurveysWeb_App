import React, { Component } from "react";

import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polygon,
  InfoWindow,
} from "google-maps-react";

import googleMapStyles from "../../../assets/google/google-styles";

import Geocode from "react-geocode";

const GOOGLE_MAP_KEY = process.env.REACT_APP_GOOGLEMAPSKEY;
Geocode.setApiKey(GOOGLE_MAP_KEY);

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
  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  render() {
    const { state } = this.props;

    const { marker, zoom, center } = state;
    return (
      <Map
        google={this.props.google}
        zoom={zoom}
        styles={this.props.mapStyle}
        fullscreenControl={false}
        draggable={true}
        initialCenter={center}
        center={center}
        scrollwheel={false}
        mapTypeControl={false}
        disableDoubleClickZoom={false}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        //onDragend={(coord) => this.centerMoved(coord)}
      >
        {marker.position ? 
        
              <Marker
                name={marker.name}
                position={marker.position}
                icon={marker.image}
                // onMouseover={this.onMarkerClick}
              />
            
          : null}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h6> Location: {this.state.selectedPlace.name}</h6>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

GoogleMap.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_KEY,
  LoadingContainer: LoadingContainer,
})(GoogleMap);

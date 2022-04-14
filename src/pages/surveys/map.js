import React, { Component } from "react";

import { Map, GoogleApiWrapper, Marker, Polygon, InfoWindow } from "google-maps-react";

import googleMapStyles from "../../assets/google/google-styles";

import Geocode from "react-geocode";
import { GOOGLE_MAP_KEY } from "../../api";

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
  



  centerMoved(coord) {
    console.log(coord);
  }



  render() {
    const { state} = this.props;

   const {marker} = state
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
        onDragend={(coord) => this.centerMoved(coord)}
      >
        {marker && 
         
           
                
                  <Marker
       
                    name={marker.name}
                    position={marker.position}
                    icon={marker.image}      
                    onMouseover={this.onMarkerClick}
                  />
            }
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

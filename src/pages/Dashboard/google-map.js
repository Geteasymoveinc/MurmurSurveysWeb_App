import React, { Component } from "react";

import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polygon,
  InfoWindow,
} from "google-maps-react";

import googleMapStyles from "./google-styles";

import Geocode from "react-geocode";
import { GOOGLE_MAP_KEY } from "../../api";


import io from "socket.io-client";

//const socket = io.connect("http://localhost:7444");


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
      Coords: {},
      streetIQCardStatus: true,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      markerGeoCode: {},
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


  /*handleGEOMarkers = () => {
    const Geo_Tracking_Marker = [];

      socket.on("connect", (socket) => {
        console.log(socket);
      });
      console.log("tracking");
      socket.on("Retrive_Backpack_geoCodes", (data) => {
        console.log("this is data", data);
        this.setState({ Coords: data.Coords });
        console.log("Coordinates", this.state.Coords);
        Geo_Tracking_Marker.push(
          <Marker
            title={"The marker`s title will appear as a tooltip."}
            name={"SOMA"}
            position={this.state.Coords}
          />
        );
      });
    
    return Geo_Tracking_Marker;
  };*/

  // handleRenderDriversCoordinates = () => {
  //   let renderDrivers = [];
  //   const props = this.props.state;

  //   if (props.drivers.length === 0) {
  //   } else {
  //     props.drivers.map((item, key) => {
  //       console.log(props.drivers);
  //       if (item.Coordinates) {
  //         if (item.Coordinates.length === 1) {
  //           renderDrivers.push(
  //             <React.Fragment>
  //               <Marker
  //                 key={key}
  //                 title={`Driver ${item.username}`}
  //                 name={item.username}
  //                 position={{
  //                   lat: Number(item.Coordinates[0].coords.latitude),
  //                   lng: Number(item.Coordinates[0].coords.longitude),
  //                 }}
  //               />
  //             </React.Fragment>
  //           );
  //         }
  //       }
  //     });
  //   }

  //   return renderDrivers;

  componentDidMount() {}

  // handleGEOMarkers = () => {
  //   let Geo_Tracking_Marker = [];
  //   socket.on("Retrive_Backpack_geoCodes", (data) => {
  //     console.log("this is data", data);
  //     this.setState({ Coords: data.Coords });
  //     console.log("Coordinates", this.state.Coords);
  //     Geo_Tracking_Marker.push(
  //       <Marker
  //         title={"The marker`s title will appear as a tooltip."}
  //         name={"SOMA"}
  //         position={this.state.Coords}
  //       />
  //     );
  //   });

  //   return Geo_Tracking_Marker;

  // };

  centerMoved(coord) {
    console.log(coord);
  }

  /*componentDidUpdate(){
  const socket = this.props.backpackers()
  console.log(socket)
  socket.emit('start_getting_locations', {})
 }*/

  render() {
    const { toggle, segment, state } = this.props;

    const { markers } = state;

    return (
      <Map
        google={this.props.google}
        zoom={state.zoom}
        styles={this.props.mapStyle}
        initialCenter={state.center}
        fullscreenControl={false}
        draggable={true}
        center={state.postCenter}
        scrollwheel={true}
        mapTypeControl={false}
        disableDoubleClickZoom={false}
        disableDefaultUI={true}
        keyboardShortcuts={false}
        onDragend={(coord) => this.centerMoved(coord)}
      >
        {/*{this.handleGEOMarkers()}*/}

        <Polygon
          paths={state.coordinates}
          fillColor="#7356bd"
          fillOpacity={0.35}
          //fillOpacity="0.5"
          strokeOpacity={0.8}
          strokeWeight={1}
          strokeColor="#200b47"
          onClick={toggle}
        />
        {/*{this.handleRenderDriversCoordinates()}*/}
        {segment &&
          markers[segment] &&
          markers[segment].map((place, index) => (
            <Marker
              key={index}
              name={place.name}
              position={place.position}
              population={place.population}
              icon={place.image}
              onMouseover={this.onMarkerClick}
            />
          ))}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h6> Location: {this.state.selectedPlace.name}</h6>
            <h6> Population: {this.state.selectedPlace.population}</h6>
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

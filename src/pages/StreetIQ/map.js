import React, { Fragment, Component } from "react";

import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polygon,
  Circle,
  InfoWindow,
} from "google-maps-react";

import Geocode from "react-geocode";

import { MapStyle } from "./mapStyles";

import axios from "axios";

Geocode.setApiKey("AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio");

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
  constructor(props) {
    super(props);
    this.state = {
      streetIQCardStatus: true,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      coordsResult: [],
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

    const { list_of_places } = this.props;

    return (
      <React.Fragment>
        <Map
          google={this.props.google}
          zoom={this.props.maping.zoom}
          styles={this.props.mapStyle}
          initialCenter={this.props.maping.center}
          draggable={true}
          center={this.props.maping.postCenter}
          fullscreenControl={false}
          mapTypeControl={false}
          disableDefaultUI={true}
        >
          {this.props.maping.coordinates.length &&
            this.props.maping.coordinates.map((coordinate, index) => {
              return (
                <Polygon
                  onClick={() => {
                    if (this.props.maping.districts.length) {
                      this.props.selectedLocation(
                        this.props.maping.districts[index],
                        index
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
          {list_of_places &&
            list_of_places.length &&
            list_of_places.map((place, index) => {

              return (
                <Marker
                key={index}
                  name={place.name}
                  rating={place.rating}
                  position={place.geometry.location}
                  //icon={require("../../assets/images/placeholder.png")}
                  icon={require("../../assets/images/placeholder.png")}
                  //address={place.address}
                  onMouseover={this.onMarkerClick}
                />)
           })}
           
           <InfoWindow
                  marker={this.state.activeMarker}
                  onClose={this.onInfoWindowClose}
                  visible={this.state.showingInfoWindow}
                >
                  <div>
                    <h6>Name: {this.state.selectedPlace.name}</h6>
                    <h6> Rating: {this.state.selectedPlace.rating}</h6>
                  </div>
                </InfoWindow>
        </Map>
      </React.Fragment>
    );
  }
}

StreetIQMap.defaultProps = MapStyle;

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIz-CXJ0CDRPjUrNpXKi67fbl-0Fbedio",
  LoadingContainer: LoadingContainer,
})(StreetIQMap);

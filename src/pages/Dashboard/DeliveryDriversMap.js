import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class DeliveryDriversMap extends Component {
    static defaultProps = {
    center: {
      lat: 59.955413,
      lng: 30.337844
    },
    zoom: 11
  };
    render() { 
        return ( <div style={{ height: '100vh', width: '100%' }}> <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAQFYqktj2mnobiNqChri2OSnFhY_ay5Kc" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        > </GoogleMapReact>
        </div> );
    }
}
 
export default DeliveryDriversMap;
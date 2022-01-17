import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// If you want to use the provided css
import "react-google-places-autocomplete/dist/index.min.css";

const GoogleAutoCompletePickup = () => (
  <div>
    <GooglePlacesAutocomplete
      onSelect={console.log}
      apiKey="AIzaSyC2uga_jwIxgNXKqsNtptT6Fx7eWe1w9fk"
      placeholder="Enter Pickup Address"
    />
  </div>
);

export default GoogleAutoCompletePickup;

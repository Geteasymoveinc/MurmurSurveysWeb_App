import React, { Component } from "react";
import { Helmet } from "react-helmet";

class EyeTracking extends Component {
  state = {};

  componentDidMount() {
    const GazeCloudAPI = window.GazeCloudAPI;
    GazeCloudAPI.StartEyeTracking();
    GazeCloudAPI.OnCamDenied = function () {
      console.log("camera access denied");
    };
    GazeCloudAPI.OnResult = function (GazeData) {
      console.log(GazeData.state);
    }; // 0: valid gaze data; -1 : face tracking lost, 1 : gaze data uncalibrated GazeData.docX // gaze x in document coordinates GazeData.docY // gaze y in document coordinates GazeData.time // timestamp }
  }

  render() {
    return (
      <React.Fragment>
        <p>Hello</p>
      </React.Fragment>
    );
  }
}

export default EyeTracking;

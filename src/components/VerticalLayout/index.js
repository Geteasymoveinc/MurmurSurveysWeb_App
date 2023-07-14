import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Rightbar from "../CommonForBoth/Rightbar";

import classes from "../../assets/css/surveys/index.module.scss";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={`${classes["app-container"]} ${
            classes[`${this.props.layoutTheme}`]
          }`}
        >
          {this.props.children}
        </div>

        <Rightbar />
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};
export default connect(mapStatetoProps, {})(withRouter(Layout));

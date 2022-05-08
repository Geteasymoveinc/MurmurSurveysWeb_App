import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";



import SidebarContent from "./testSidebarContent";



class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
     
      

          {this.props.type !== "condensed" ? (

            <SidebarContent type={this.props.type}/>
          ) : (

            <SidebarContent type={this.props.type}/>
          )}

   

      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(Sidebar));

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
     
      
          {/*className=''*/}
          {/* <div data-simplebar className="h-100">*/}
          {this.props.type !== "condensed" ? (
            /* <SimpleBar style={{ maxHeight: "100%" }}>*/
            <SidebarContent type={this.props.type}/>
          ) : (
            /*</SimpleBar>*/
            <SidebarContent type={this.props.type}/>
          )}

   
      
        {/* </div>*/}
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

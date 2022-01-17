import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {} from "../../store/actions";

//Simple bar
import SimpleBar from "simplebar-react";

//i18n
import { withNamespaces } from "react-i18next";
import SidebarContent from "./testSidebarContent";




import classes from "../../assets/css/layout/sidebar.module.css";

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
)(withRouter(withNamespaces()(Sidebar)));

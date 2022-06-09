import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {} from "../../store/actions";


//i18n
import { withNamespaces } from "react-i18next";
import SidebarContent from "./testSidebarContent";





class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
            <SidebarContent type={this.props.type}/>
      
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

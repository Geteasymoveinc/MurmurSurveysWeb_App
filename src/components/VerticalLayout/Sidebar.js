import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";



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

import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

// users
import user1 from "../../../assets/images/avatar.png";

import classes from '../../../assets/css/Settings/settings.module.css'

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      username: sessionStorage.getItem("fullName")
        ? sessionStorage.getItem("fullName")
        : null,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log('profile is running')
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu && this.props.scope==='global'}
          toggle={this.toggle}

          //className={`${this.props.scope==='global' &&  classes.search_profil_parent}`}
         // className="d-inline-block"
        >
          <DropdownToggle
            //className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            tag="button"
            type='button'
            className={`${this.props.scope==='global'? classes.search_profil: classes.profil_cover}`}
          >
            <img
              //className="rounded-circle header-profile-user"
              className={`${this.props.scope==='global'? classes.profil_img : classes.profil_cover_img}`}
              
             
             src = {this.props.scope==='local'? (this.props.image.length>0? this.props.image: sessionStorage.getItem("profileImage")?
                   sessionStorage.getItem("profileImage")
                  : user1) : sessionStorage.getItem("profileImage")?sessionStorage.getItem("profileImage"):user1}
              
              alt="Header Avatar"
            />
           {/* <span 
           // className="d-none d-xl-inline-block ml-2 mr-1"
            >
              {this.state.username}
           </span>*/}
            {/* <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i> */}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag="a" href="/settings">
              <i className="bx bx-user font-size-16 align-middle mr-1"></i>
              {this.props.t("Profile")}
            </DropdownItem>
            {/*<DropdownItem tag="a" href="/billing">
              <i className="bx bx-wallet font-size-16 align-middle mr-1"></i>
              {this.props.t("Billing")}
            </DropdownItem>
            <DropdownItem tag="a" href="#">
              <span className="badge badge-success float-right">11</span>
              <i className="mdi mdi-settings font-size-17 align-middle mr-1"></i>
              {this.props.t("Settings")}
            </DropdownItem> */}

            <div className="dropdown-divider"></div>
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
              <span>{this.props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withRouter(withNamespaces()(ProfileMenu));

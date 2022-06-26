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

import classes from "../../../assets/css/Settings/settings.module.css";
import '../../../assets/css/surveys/profile/index.css'

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      username: sessionStorage.getItem("fullName")
        ? sessionStorage.getItem("fullName")
        : null,

      profile_image: {
        src: ''
      },
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {

    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }
componentDidMount(){
  const url =  sessionStorage.getItem("profileImage")
  let image = {
    src: ''
  }
  if(url){
   image = new Image()
  image.src = url
  image.name = url.split("https://backendapp.murmurcars.com/advertisers/users/profilePhoto/")[1]
  }
  this.setState({
    ...this.state,
    profile_image: image
  })
}
  render() {
  
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu && this.props.scope!=='local'}
          toggle={this.toggle}
          className={`${'dropdown'}`}
        >
          <DropdownToggle

            id="page-header-user-dropdown"
            tag="button"
            type="button"
            className={`${
              this.props.scope === "global"
                ? classes.search_profil
                : this.props.scope === "survey"
                ? classes.search_profil
                : classes.profil_cover
            }`}
          >
            <img
              className={`${
                this.props.scope === "global"
                  ? classes.profil_img
                  : this.props.scope === "survey"
                  ? classes.profil_img
                  : classes.profil_cover_img
              }`}
              src={`${
                (this.props.image && this.props.image.length > 0)
                  ? this.props.image
                  : (this.state.profile_image.name && this.state.profile_image.name.length > 0)
                  ? this.state.profile_image.src
                  : user1
              }`}
              alt="Header Avatar"
            />

          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag="a" href='/surveys'>
            <i className="bx bx-wallet font-size-16 align-middle mr-1"></i>
              {this.props.t('My Surveys')}
            </DropdownItem>

          <div className="dropdown-divider"></div>
            <DropdownItem tag="a" href="/settings">
         
              <i className="bx bx-user font-size-16 align-middle mr-1"></i>
              {this.props.t("My Profile")}
            </DropdownItem>
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

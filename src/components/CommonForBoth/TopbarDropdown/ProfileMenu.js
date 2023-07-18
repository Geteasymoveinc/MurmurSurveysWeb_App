import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";

import { changeLayoutTheme } from "../../../store/actions";
import { connect } from "react-redux";

// users
import user1 from "../../../assets/images/avatar.png";

import classes from "../../../assets/css/Settings/settings.module.css";
import "../../../assets/css/layout/layoutThemeSwitcher.scss";
import "../../../assets/css/layout/profile.css";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      username: sessionStorage.getItem("fullName")
        ? sessionStorage.getItem("fullName")
        : null,

      profile_image: {
        src: "",
      },
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }
  componentDidMount() {
    const url = sessionStorage.getItem("profileImage");
    let image = {
      src: "",
    };
    if (url) {
      image = new Image();
      image.src = url;
      image.name = url.split(
        "https://backendapp.murmurcars.com/advertisers/users/profilePhoto/"
      )[1];
    }
    this.setState({
      ...this.state,
      profile_image: image,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu && this.props.scope !== "local"}
          toggle={this.toggle}
          className={`dropdown ${this.props.layoutTheme}`}
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
                this.props.image && this.props.image.length > 0
                  ? this.props.image
                  : this.state.profile_image.name &&
                    this.state.profile_image.name.length > 0
                  ? this.state.profile_image.src
                  : user1
              }`}
              alt="Header Avatar"
            />
          </DropdownToggle>
          <DropdownMenu right>
          <DropdownItem tag="div">
              <Link to="/settings" className="dropdown-item p-0">
                <i className="bx bx-user font-size-16 align-middle mr-1"></i>
                Profile
              </Link>
            </DropdownItem>
            <div className="dropdown-divider"></div>
            <DropdownItem tag="div">
              <button  className="dropdown-item p-0" onClick={() => {
                      this.props.history.push("/")
                      this.props.history.replace('/surveys')
              }}>
                {" "}
                <i className="bx bx-wallet font-size-16 align-middle mr-1"></i>{" "}
                My Surveys
              </button>
            </DropdownItem>

            <div className="dropdown-divider"></div>
         
            <DropdownItem tag="div">
              <Link to="/billing" className="dropdown-item p-0">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 7V21C2 21.83 2.94 22.3 3.6 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.29 22.29C8.68 22.68 9.32 22.68 9.71 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 13.01H12"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 9.01001H12"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.99561 13H6.00459"
                    stroke="#292D32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.99561 9H6.00459"
                    stroke="#292D32"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Billing history
              </Link>
            </DropdownItem>

            <div className="dropdown-divider"></div>
            <DropdownItem tag="div">
              <Link to="/subscription" className="dropdown-item p-0">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <path
                    d="M14.2617 15.4385H9.26172"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.7617 12.998V17.998"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.66 2.51814L12.63 2.58814L9.72996 9.31814H6.87996C6.19996 9.31814 5.54996 9.45814 4.95996 9.70814L6.70996 5.52814L6.74996 5.42814L6.81996 5.26814C6.83996 5.20814 6.85996 5.14814 6.88996 5.09814C8.19996 2.06814 9.67996 1.37814 12.66 2.51814Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.05 9.51813C17.6 9.37813 17.12 9.31813 16.64 9.31813H9.72998L12.63 2.58813L12.66 2.51813C12.81 2.56813 12.95 2.63813 13.1 2.69813L15.31 3.62813C16.54 4.13813 17.4 4.66813 17.92 5.30813C18.02 5.42813 18.1 5.53813 18.17 5.66813C18.26 5.80813 18.33 5.94813 18.37 6.09813C18.41 6.18813 18.44 6.27813 18.46 6.35813C18.73 7.19813 18.57 8.22813 18.05 9.51813Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5217 14.1984V16.1484C21.5217 16.3484 21.5117 16.5484 21.5017 16.7484C21.3117 20.2384 19.3617 21.9984 15.6617 21.9984H7.86172C7.62172 21.9984 7.38172 21.9784 7.15172 21.9484C3.97172 21.7384 2.27172 20.0384 2.06172 16.8584C2.03172 16.6284 2.01172 16.3884 2.01172 16.1484V14.1984C2.01172 12.1884 3.23172 10.4584 4.97172 9.70836C5.57172 9.45836 6.21172 9.31836 6.89172 9.31836H16.6517C17.1417 9.31836 17.6217 9.38836 18.0617 9.51836C20.0517 10.1284 21.5217 11.9884 21.5217 14.1984Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.71 5.52814L4.96 9.70814C3.22 10.4581 2 12.1881 2 14.1981V11.2681C2 8.42814 4.02 6.05814 6.71 5.52814Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.5186 11.2677V14.1977C21.5186 11.9977 20.0586 10.1277 18.0586 9.52766C18.5786 8.22766 18.7286 7.20766 18.4786 6.35766C18.4586 6.26766 18.4286 6.17766 18.3886 6.09766C20.2486 7.05766 21.5186 9.02766 21.5186 11.2677Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Subscription
              </Link>
            </DropdownItem>
            <div className="dropdown-divider"></div>
            <DropdownItem tag="a" href="/logout">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
              <span>{"Logout"}</span>
            </DropdownItem>
            <div className="dropdown-divider"></div>
            <div className="theme">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={this.props.layoutTheme === "dark"}
                onChange={(e) => {
                  const light = !e.target.checked;
                  this.props.changeLayoutTheme(light ? "light" : "dark");
                }}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
              </label>
            </div>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};

export default connect(mapStatetoProps, { changeLayoutTheme })(
  withRouter(ProfileMenu)
);

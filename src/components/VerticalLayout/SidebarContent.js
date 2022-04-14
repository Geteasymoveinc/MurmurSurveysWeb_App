import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="bx bx-home-circle"></i>
                {/* <span className="badge badge-pill badge-info float-right">
                  03
                </span> */}
                <span>{this.props.t("Dashboards")}</span>
              </Link>
              <Link to="/streetIQ" className="waves-effect">
                <i className="bx bx-map-pin"></i>
                <span>{this.props.t("Street IQ")}</span>
              </Link>
              {/* <ul className="sub-menu" aria-expanded="false">
                                    <li><Link to="/dashboard">{this.props.t('Default') }</Link></li>
                                    <li><Link to="/#">{this.props.t('Saas') }</Link></li>
                                    <li><Link to="/#">{this.props.t('Crypto') }</Link></li>
                                </ul> */}
            </li>
            <li className="menu-title">{this.props.t("Business Tools")}</li>
            <li>
              <Link to="/create-ad" className=" waves-effect">
                <i className="bx bx-calendar"></i>
                <span>{this.props.t("Create Ad")}</span>
              </Link>
            </li>
            {/* <li>
              <Link to="#t" className=" waves-effect">
                <i className="bx bx-chat"></i>
                <span className="badge badge-pill badge-success float-right">
                  {this.props.t("New")}
                </span>
                <span>{this.props.t("Chat")}</span>
              </Link>
            </li> */}
            <li>
              <Link to="/analytics" className="waves-effect">
                <i className="bx bx-bar-chart-alt"></i>
                <span>{this.props.t("Analytics")}</span>
              </Link>
              <Link to="/testing" className="waves-effect">
                <i className="bx bx-transfer"></i>
                <span>{this.props.t("A/B Testing")}</span>
              </Link>

              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Products")}</Link>
                </li>
                <li>
                  <Link to="#-detail">{this.props.t("Product Detail")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Customers")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Cart")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Checkout")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Shops")}</Link>
                </li>
                <li>
                  <Link to="#-product">{this.props.t("Add Product")}</Link>
                </li>
              </ul> has-arrow  */}
            </li>
            <li>
              {/* <Link to="/#" className="waves-effect">
                <i className="bx bx-bell"></i>
                <span>{this.props.t("Notifications")}</span>
              </Link> */}
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Wallet")}</Link>
                </li>
                <li>
                  <Link to="#-sell">{this.props.t("Buy/Sell")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Exchange")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Lending")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Orders")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("KYC Application")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("ICO Landing")}</Link>
                </li>
              </ul> */}
            </li>
            <li>
              {/* <Link to="/audience-manager" className="waves-effect">
                <i className="bx bx-group"></i>
                <span>{this.props.t("Audience Manager")}</span>
              </Link> */}
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Read Email")} </Link>
                </li>
              </ul> */}
            </li>
            <li></li>
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-briefcase-alt-2"></i>
                <span>{this.props.t("Projects")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Projects Grid")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Projects List")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Project Overview")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Create New")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-task"></i>
                <span>{this.props.t("Tasks")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Task List")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Kanban Board")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Create Task")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bxs-user-detail"></i>
                <span>{this.props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Profile")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li className="menu-title">Integrations</li> */}
            <li>
              {/* <Link to="/destination" className=" waves-effect">
                <i className="bx bx-shuffle"></i>
                <span>{this.props.t("Destination")}</span>
              </Link> */}
              {/* <ul className="sub-menu">
                <li>
                  <Link to="#">{this.props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Forget Password")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Lock Screen")}</Link>
                </li>
              </ul> */}
            </li>
            <li>
              {/* <Link to="/pixel" className="waves-effect">
                <i className="bx bx-collapse"></i>
                <span>{this.props.t("Pixel")}</span>
              </Link> */}
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Error 500")}</Link>
                </li>
              </ul> */}
            </li>
            <li className="menu-title">{this.props.t("Services")}</li>
            <li>
              <Link to="/settings" className="waves-effect">
                <i className="bx bx-cog"></i>
                <span>{this.props.t("Settings")}</span>
              </Link>
              <Link to="/billing" className="waves-effect">
                <i className="bx bx-credit-card"></i>
                <span>{this.props.t("Billing History")}</span>
              </Link>
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Session Timeout")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Sweet-Alert")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Tabs & Accordions")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("General")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Notifications")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Image Cropper")}</Link>
                </li>
              </ul> */}
            </li>
            <li>
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Form Elements")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Validation")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Form Mask")}</Link>
                </li>
              </ul> */}
            </li>
            <li>
              {/* <Link to="/support" className="waves-effect">
                <i className="bx bx-headphone"></i>
                <span>{this.props.t("Support")}</span>
              </Link> */}
              {/* <Link to="/knowledge-base" className="waves-effect">
                <i className="bx bx-folder-open"></i>
                 <span className="badge badge-pill badge-danger float-right">
                  6
                </span> 
                <span>{this.props.t("Knowledge Base")}</span>
              </Link> */}
              {/* <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Data Tables")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Responsive Table")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Editable Table")}</Link>
                </li>
              </ul> */}
            </li>
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bxs-bar-chart-alt-2"></i>
                <span>{this.props.t("Charts")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Apex charts")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Chartist Chart")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Chartjs Chart")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Toast UI Chart")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Sparkline Chart")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Knob Chart")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-aperture"></i>
                <span>{this.props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Material Design")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-map"></i>
                <span>{this.props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Vector Maps")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Leaflet Maps")}</Link>
                </li>
              </ul>
            </li> */}
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-share-alt"></i>
                <span>{this.props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="#">{this.props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="#" className="has-arrow">
                    {this.props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu" aria-expanded="true">
                    <li>
                      <Link to="#">{this.props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="#">{this.props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withNamespaces()(SidebarContent));

import React, { Component } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import classname from "classnames";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
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
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <div className="topnav">
          <div className="container-fluid">
            <nav
              className="navbar navbar-light navbar-expand-lg topnav-menu"
              id="navigation"
            >
              <Collapse
                isOpen={this.props.menuOpen}
                className="navbar-collapse"
                id="topnav-menu-content"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <Link className="nav-link " to="/dashboard">
                      <i className="bx bx-home-circle mr-2"></i>
                      {this.props.t("Dashboard")} {this.props.menuOpen}
                    </Link>
                    {/* <div
                      className={classname("dropdown-menu", {
                        show: this.state.isDashboard,
                      })}
                    >
                      <Link to="index" className="dropdown-item">{this.props.t('Default')}</Link>
                                            <Link to="dashboard-saas" className="dropdown-item">{this.props.t('Saas')}</Link>
                                            <Link to="dashboard-crypto" className="dropdown-item">{this.props.t('Crypto')}</Link> 
                    </div> */}
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ uiState: !this.state.uiState });
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                    >
                      <i className="bx bx-tone mr-2"></i>
                      {this.props.t("Products")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu ", {
                        show: this.state.uiState,
                      })}
                    >
                      <Row>
                        <Col lg={8}>
                          <div>
                            <Link
                              to="/product-dashboard"
                              className="dropdown-item"
                            >
                              {this.props.t("Product Dashboard")}
                            </Link>
                          </div>
                          <div>
                            <Link to="/add-product" className="dropdown-item">
                              {this.props.t("Add Product")}
                            </Link>
                          </div>

                          <div>
                            <Link to="/all-products" className="dropdown-item">
                              {this.props.t("All Products")}
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ appState: !this.state.appState });
                      }}
                      className="nav-link dropdown-toggle arrow-none"
                    >
                      <i className="bx bx-customize mr-2"></i>
                      {this.props.t("Coupons")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.appState,
                      })}
                    >
                      <Link to="/coupon-dashboard" className="dropdown-item">
                        {this.props.t("Coupon Dashboard")}
                      </Link>
                      <Link to="/create-coupon" className="dropdown-item">
                        {this.props.t("Create Coupon")}
                      </Link>
                      <Link to="/all-coupons" className="dropdown-item">
                        {this.props.t("All Coupons")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      to="/#"
                      className="nav-link dropdown-toggle arrow-none"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          componentState: !this.state.componentState,
                        });
                      }}
                    >
                      <i className="bx bx-collection mr-2"></i>
                      {this.props.t("Orders")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.appState,
                      })}
                    >
                      <Link to="calendar" className="dropdown-item">
                        {this.props.t("Pending")}
                      </Link>
                      <Link to="chat" className="dropdown-item">
                        {this.props.t("Completed")}
                      </Link>
                      <Link to="chat" className="dropdown-item">
                        {this.props.t("Failed")}
                      </Link>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ extraState: !this.state.extraState });
                      }}
                    >
                      <i className="bx bx-file mr-2"></i>
                      {this.props.t("Delivery")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.extraState,
                      })}
                    >
                      <div className="dropdown">
                        <Link
                          to="/create-delivery-request"
                          className="dropdown-item"
                        >
                          {this.props.t("Request Delivery")}{" "}
                        </Link>
                      </div>

                      <Link to="/drivers-near-me" className="dropdown-item">
                        {this.props.t("Driver Near Me")}
                      </Link>
                      <Link to="pages-register" className="dropdown-item">
                        {this.props.t("Scheduled Deliveries")}
                      </Link>
                      <Link to="pages-forget-pwd" className="dropdown-item">
                        {this.props.t("In Progress Deliveries")}
                      </Link>
                      <Link to="auth-lock-screen" className="dropdown-item">
                        {this.props.t("Completed Deliveries")}
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ extraState: !this.state.extraState });
                      }}
                    >
                      <i className="bx bx-file mr-2"></i>
                      {this.props.t("Customers")}{" "}
                      <div className="arrow-down"></div>
                    </Link>
                    <div
                      className={classname("dropdown-menu", {
                        show: this.state.extraState,
                      })}
                    >
                      <div className="dropdown">
                        <Link to="/contacts" className="dropdown-item">
                          {this.props.t("Contacts")}{" "}
                        </Link>
                      </div>

                      <Link to="/send-email" className="dropdown-item">
                        {this.props.t("Send Email  ")}
                      </Link>
                      <Link to="/send-sms" className="dropdown-item">
                        {this.props.t("Send SMS")}
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle arrow-none"
                      to="/chat"
                    >
                      <i
                        className="bx bx-message-detail"
                        style={{ marginRight: 5 }}
                      >
                        {" "}
                      </i>
                      {this.props.t("Chat")}{" "}
                    </Link>
                  </li>
                </ul>
              </Collapse>
            </nav>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);

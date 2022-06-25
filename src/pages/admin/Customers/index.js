import React, { Component, Fragment } from "react";

import { Pagination } from "antd";
import "antd/dist/antd.css";
import "../../../assets/css/antd/custom-antd.css";

import PulledCustomers from "./pulledCustomers";

import SearchNormal from "../../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../../assets/css/Settings/search-maximize.svg";
import ProfileMenu from "../../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

//import classes
import classes from "../../../assets/css/analitics/index.module.css";
import classes2 from "../../../assets/css/Dashboard/dashboard.module.css";
import classes3 from "../../../assets/css/CreateAd/index.module.css";

import "../../../assets/css/app.css";

import { connect } from "react-redux";
import { fetchCustomers } from "../../../store/actions";

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      length: this.props.length,
      customers: this.props.customers,
      page: 1,
    };
    this.async = null;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.customers.length !== prevProps.customers.length
    ) {
      const length = this.props.length;

      this.setState({
        ...this.state,
        length,
        customers: this.props.customers,
      });
    }
    this.async = setTimeout(() => {
      if (!this.state.loaded) {
        this.setState({
          ...this.state,
          loading: false,
        });
      }
    }, 3000);
  }
  componentDidMount() {
    const url = this.props.location.search;
    let page = new URLSearchParams(url).get("page");
    if (!page) {
      page = this.state.page;
    } //extracting id)
    this.props.fetchCustomers(
      `https://backendapp.murmurcars.com/api/v1/admin/customers?page=${page}`
    );
  }

  componentWillUnmount() {
    clearTimeout(this.async);
  }

  pickTimeFrame = (e, category, key) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [category]: {
        ...this.state[category],
        [key]: value,
      },
    });
  };

  createPages = () => {
    const length = this.state.length;
    const buttons = [];
    let page = 1;
    for (let i = 0; i < length; i++) {
      if (i % 5 === 0) {
        buttons.push(
          <input
            key={i}
            type="button"
            className={`${classes3.pagination_element} ${
              this.state.page === page ? classes3.page_active : null
            }`}
            onClick={(e) => this.changeToAnotherPage(e, page)}
            value={page++}
          />
        );
      }
    }
    return buttons;
  };

  changeToAnotherPage = (page) => {
    this.props.fetchCustomers(
      `https://backendapp.murmurcars.com/api/v1/admin/customers?page=${page}`
    );

    this.setState({
      ...this.state,
      page,
    });
  };

  render() {
    const { customers, length } = this.state;

    return (
      <Fragment>
        {this.state.loading && (
          <div id="preloader" style={{ opacity: 0.7 }}>
            <div id="status">
              <div className="spinner-chase">
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
              </div>
            </div>
          </div>
        )}
        {!this.state.loading && (
          <div className={classes.dash_right}>
            <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Analytics</h1>
              <form onSubmit={this.submitLocationToZoomIn}>
                <div
                  className={`${classes.dash_relative} ${classes.search_box}`}
                >
                  <input type="text" placeholder="Search" />
                  <div className={classes.search_box_flex}>
                    <button type="submit" className={classes.search_icon}>
                      <img
                        src={SearchNormal}
                        alt=""
                        className={classes.search_img}
                      />
                    </button>
                    <button type="button" className={classes.search_maximize}>
                      <img
                        src={SearchMaximize}
                        alt=""
                        className={classes.maximize_img}
                      />
                    </button>

                    <ProfileMenu scope={"global"} />
                  </div>
                </div>
              </form>
            </div>

            {/* <!-- analytics block -->*/}
            {this.props.match.isExact && !this.props.location.search && (
              <>
                <div
                  className={`${classes.analytics_block} ${classes2.flex_analytics_container}`}
                >
                  <div className={classes3.ads_section}>
                    <div
                      className={`${classes3.cads_head} ${classes3.cads_head_2}`}
                    >
                      <h4 className={classes3.cads_h4}>Customers</h4>
                    </div>
                    <PulledCustomers
                      loading={this.props.loading}
                      customers={customers}
                    />

                    <div>
                      <Pagination
                        defaultCurrent={1}
                        total={(length / 5) * 10}
                        onChange={this.changeToAnotherPage}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            {this.props.match.isExact &&
              this.props.location.search.length > 0 && ( //details
                <PulledCustomers
                  loading={this.props.loading}
                  customers={customers}
                />
              )}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapstatetoprops = (state) => {
  const { length, customers } = state.Customers;

  return { length, customers };
};
export default connect(mapstatetoprops, { fetchCustomers })(Customers);

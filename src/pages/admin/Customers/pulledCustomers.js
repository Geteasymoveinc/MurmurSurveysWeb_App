import React from "react";

import axios from "axios";

import { Link, withRouter } from "react-router-dom";

import Trash from "../../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../../assets/css/CreateAd/arrow-right.svg";
import SurveyEye from "../../../assets/images/surveys/survey-eye.svg";
import SurveyEdit from "../../../assets/images/surveys/survey-edit.svg";
import SurveyPrice from "../../../assets/images/surveys/survey-price.svg";
import SampleImage from "../../../assets/images/surveys/sample-image.png";
import SampleImage2 from "../../../assets/images/surveys/sample-image2.png";
import classes from "../../../assets/css/CreateAd/index.module.css";
import classes2 from "../../../assets/css/surveys/surveys.module.css";
import Avatar from "../../../assets/images/avatar.png";

import { connect } from "react-redux";

import Details from "./details";

class PulledCustomers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveCustomers: true,
      checked: false,
      pulledCustomers: this.props.customers,
      page: 1,
    };

    this.settingInterval = null;
  }

  //ad-campaign
  handleCampaigns = () => {
    const { multiple } = this.state;

    let murmurCampaigns = [];

    if (this.state.pulledCustomers.length !== 0) {
      {
        this.state.pulledCustomers.map((customer, i) => {
          murmurCampaigns.push(
            <tr key={customer._id}>
              <td className={classes.cads_td}>
                <span className={`${classes.td_data} ${classes.td_data_2}`}>
                  <img
                    src={customer.profilePhoto ? customer.profilePhoto : Avatar}
                    alt="avatar"
                    className={classes.partner_profile_img}
                  />
                  {customer.fullName}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={`${classes.td_data} `}>
                  {customer.advertise_options}
                </span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}> {customer.campaigns}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>{customer.company}</span>
              </td>
              <td className={classes.cads_td}>
                <span className={classes.td_data}>
                  {customer.subscribedToMurmurNewsettler
                    ? "Subscribed"
                    : "Not Subscribed"}
                </span>
              </td>
              <td className={classes.cads_td}>
                <Link
                  to={`/customers?customer=${customer._id}`}
                  className={classes.details_link}
                >
                  Details
                  <img
                    src={ArrowRight}
                    alt=""
                    className={classes.details_img}
                  />
                </Link>
              </td>
            </tr>
          );
        });
      }
    }

    return murmurCampaigns;
  };

  toggleSurveyWindow = (id) => {
    const active = this.state.active;
    let value = id;
    if (active === id) {
      value = "";
    }

    this.setState({
      ...this.state,
      active: value,
    });
  };

  componentDidUpdate(prevProps) {
    const { loading, customers } = this.props;

    if (
      customers.length !== prevProps.customers.length ||
      this.state.page !== this.props.page ||
      (customers.length &&customers[0]._id !== prevProps.customers[0]._id)
    ) {
      this.setState({
        ...this.state,
        pulledCustomers: customers,
        haceCustomers: true,
        page: this.props.page,
      });
    }
  }

  render() {
    const url = this.props.location.search; //search property of history props
    const id = new URLSearchParams(url).get("customer"); //extracting id
    let customer = [];
    if (id) {
      customer = this.state.pulledCustomers.filter((customer) => {
        if (customer._id === id) {
          return customer;
        }
      })[0];
    }

    console.log(this.state);

    return (
      <React.Fragment>
        {/* this part is ad-manager STARTING*/}

        {!this.props.location.search.length > 0 && (
          <div className={classes.cads_table} style={{ marginBottom: "100px" }}>
            <table>
              <thead>
                <tr className={classes.first_tr}>
                  <th className={`${classes.cads_th}`}>
                    <span>Customer</span>
                  </th>
                  <th className={classes.cads_th}>
                    <span>Subscription</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_quantity}`}>
                    <span>Campaigns</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Company</span>
                  </th>
                  <th className={`${classes.cads_th} ${classes.cads_budget}`}>
                    <span>Newsletter</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.handleCampaigns()}</tbody>
            </table>
          </div>
        )}

        {this.props.location.search.length > 0 && ( //when user selects an add to check details
          <Details customer={customer} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { customers, page, loading } = state.Customers;
  return { customers, page, loading };
};

export default connect(mapStateToProps, null)(withRouter(PulledCustomers));

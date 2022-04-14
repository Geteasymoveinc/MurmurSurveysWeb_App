import React, { Component } from "react";

import { Link } from "react-router-dom";

import ProfileMenu from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";

import SearchNormal from "../../assets/css/Settings/search-normal.svg";
import SearchMaximize from "../../assets/css/Settings/search-maximize.svg";
import Walk from "../../assets/css/Billing/walk.svg";
import WalkActive from "../../assets/css/Billing/walk-active.svg";
import Check from "../../assets/css/Billing/check.svg";
import Ellipse from "../../assets/css/Billing/ellipse.svg";
import Run from "../../assets/css/Billing/run.svg";
import RunActive from "../../assets/css/Billing/run-active.svg";
import Fly from "../../assets/css/Billing/fly.svg";
import FlyActive from "../../assets/css/Billing/fly-active.svg";
import DocumentDownload from "../../assets/css/Billing/document-download.svg";
import CheckGreen from "../../assets/css/Billing/green-check.svg";
import ArrowDown from "../../assets/css/Billing/arrow-down.svg";

import classes from "../../assets/css/Billing/index.module.css";

import UpdateModal from "./updateBilling";
import axios from "axios";
import { queryForEmail } from "../../helpers/fakebackend_helper";

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveInvoices: false,
      checked: false,
      billing: "Walk",
      modal: false,
      loading: false,
      invoices: [
        /*{
          id: "customCheck2",
          invoice_name: "Murmur Inc",
          invoiceAmountPaid: "$6000",
          invoiceDate: "Nov 08, 2020",
          invoiceStatus: "danger",
          invoiceData: "Due",
          link: "#",
          billing: "Run",
        },
        {
          id: "customCheck2",
          invoice_name: "Murmur Inc",
          invoiceAmountPaid: "$6000",
          invoiceDate: "Nov 08, 2020",
          invoiceStatus: "danger",
          invoiceData: "Due",
          link: "#",
          billing: "Run",
        },*/
      ],
    };
  }

  checkBill = (event) => {
    const id = event.target.id;

    this.setState({
      ...this.state,
      [id]: !this.state[id],
    });
  };

  checkAllBills = () => {
    const invoices = this.state.invoices.length;

    if (invoices.length) {
      for (let i = 0; i < invoices; i++) {
        const name = `invoice-${i + 1}`;
        console.log(this.state.checked);
        if (this.state.checked === true) {
          console.log("checked");
          this.setState({ [name]: false, checked: false });
        } else {
          console.log("second ");
          this.setState({ [name]: true, checked: true });
        }
      }
    } else {
      this.setState({ checked: !this.state.checked });
    }
  };

  selectBillingPlan = (event) => {
    const plan = event.target.name;
    this.setState({ ...this.state, billing: plan, modal: true });
  };

  selectBilling = (plan, amount) => {
    console.log(plan, amount);
    this.setState({
      ...this.state,
      loading: true,
    });
    axios
      .post("https://backendapp.murmurcars.com/api/v1/billing/create-billing", {
        user: this.state.user_id,
        amount,
        subscription_package: plan,
        invoice_status: "Pending",
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
        this.setState({ ...this.state, modal: false, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, modal: false, loading: false });
      });
  };
  closeModal = () => {
    this.setState({ ...this.state, modal: false });
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      loading: true,
    });
    const invoices = this.state.invoices.length;

    queryForEmail("https://backendapp.murmurcars.com/api/v1/users/checkEmail", {
      email: sessionStorage.getItem("authUser"),
    })
      .then((user) => {
        const user_id = user.resp.at(-1)._id;
        this.setState({ ...this.state, user_id });
        axios
          .get(`https://backendapp.murmurcars.com/api/v1/billing/user/${user_id}`)
          .then((billing) => {
            console.log(billing);
            const invoices = this.state.invoices;
            if (billing.data.length) {
              const { billing: invoice } = billing.data[0];
              console.log(invoice);

              for (let i = 0; i < invoice.length; i++) {
                invoices.push({
                  invoice_name: "Murmur_Inc",
                  invoiceAmountPaid: invoice[i].amount,
                  invoiceDate: invoice[i].invoiceDate,
                  invoiceData: invoice[i].invoice_status,
                  billing: invoice[i].subscription_package,
                  link: new URL(invoice[i].invoice_link),
                });
              }
              for (let i = 0; i < invoices; i++) {
                const name = `invoice-${i + 1}`;
                this.setState({ ...this.state, [name]: false });
              }

              this.setState({
                ...this.state,
                loading: false,
                invoices,
                haveInvoices: true,
              });
            } else {
              this.setState({
                ...this.state,
                loading: false,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              ...this.state,
              loading: false,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state);
    const { loading } = this.state;
    const { haveInvoices } = this.state;
    return (
      <React.Fragment>
        {loading && (
          <div id="preloader">
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
        {!loading && (
          <div className={classes.dash_right}>
            {/*<!-- header search block -->*/}
            <div className={classes.head_search}>
              <h1 className={classes.dash_h1}>Billing History</h1>

              <form>
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
            {/*<!-- billing-history block -->*/}
            <div className={classes.billing_history}>
              <div className={classes.current_plan}>
                <h4 className={classes.history_h4}>Current Plan</h4>
                <p className={classes.history_p}>
                  Choose one of three billing plans which is most comfortable
                  for you. Start your business journey with Murmur.
                </p>
                <div className={classes.plan_row}>
                  <div className={classes.plan_col}>
                    <div className={classes.plan_item}>
                      <input
                        type="radio"
                        name="Walk"
                        id="plan-walk"
                        checked={this.state.billing === "Walk"}
                        onChange={this.selectBillingPlan}
                      />
                      <label htmlFor="plan-walk">
                        <div className={classes.lbl_flex}>
                          <div className={classes.lbl_imgs}>
                            <img
                              src={Walk}
                              alt=""
                              className={classes.pln_icon}
                            />
                            <img
                              src={WalkActive}
                              alt=""
                              className={classes.pln_icon_active}
                            />
                          </div>
                          <div className={classes.lbl_data}>
                            <p className={classes.lbl_month}>
                              <span className={classes.lbl_type}>Walk Plan</span>
                              <span className={classes.lbl_price}>
                                $10 <small>/month</small>
                              </span>
                            </p>
                       
                          </div>
                        </div>
                        <div className={classes.check_icon}>
                          <img
                            src={Check}
                            alt=""
                            className={classes.plan_check}
                          />
                          <img
                            src={Ellipse}
                            alt=""
                            className={classes.plan_ellipse}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className={classes.plan_col}>
                    <div className={classes.plan_item}>
                      <input
                        type="radio"
                        name="Run"
                        id="plan-run"
                        checked={this.state.billing === "Run"}
                        onChange={this.selectBillingPlan}
                      />
                      <label htmlFor="plan-run">
                        <div className={classes.lbl_flex}>
                          <div className={classes.lbl_imgs}>
                            <img
                              src={Run}
                              alt=""
                              className={classes.pln_icon}
                            />
                            <img
                              src={RunActive}
                              alt=""
                              className={classes.pln_icon_active}
                            />
                          </div>
                          <div className={classes.lbl_data}>
                            <p className={classes.lbl_month}>
                              <span className={classes.lbl_type}>Run Plan</span>
                              <span className={classes.lbl_price}>
                                $55 <small>/month</small>
                              </span>
                            </p>
                  
                          </div>
                        </div>
                        <div className={classes.check_icon}>
                          <img
                            src={Check}
                            alt=""
                            className={classes.plan_check}
                          />
                          <img
                            src={Ellipse}
                            alt=""
                            className={classes.plan_ellipse}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className={classes.plan_col}>
                    <div className={classes.plan_item}>
                      <div className={classes.plan_item}>
                        <input
                          type="radio"
                          name="Fly"
                          id="plan-fly"
                          checked={this.state.billing === "Fly"}
                          onChange={this.selectBillingPlan}
                        />
                        <label htmlFor="plan-fly">
                          <div className={classes.lbl_flex}>
                            <div className={classes.lbl_imgs}>
                              <img
                                src={Fly}
                                alt=""
                                className={classes.pln_icon}
                              />
                              <img
                                src={FlyActive}
                                alt=""
                                className={classes.pln_icon_active}
                              />
                            </div>
                            <div className={classes.lbl_data}>
                              <p className={classes.lbl_month}>
                                <span className={classes.lbl_type}>Fly Plan</span>
                                <span className={classes.lbl_price}>
                                  $75 <small>/month</small>
                                </span>
                              </p>
                           
                            </div>
                          </div>
                          <div className={classes.check_icon}>
                            <img
                              src={Check}
                              alt=""
                              className={classes.plan_check}
                            />
                            <img
                              src={Ellipse}
                              alt=""
                              className={classes.plan_ellipse}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.billing_section}>
                <div className={classes.billing_head}>
                  <div className={classes.bllng_head_left}>
                    <h4 className={classes.history_h4}>Billing history</h4>
                    <p className={classes.history_p}>
                    Please reach out to our friendly team via billing@murmurcars.com with any questions
                    </p>
                  </div>
                  <Link
                    to="myfile.pdf"
                    target="_blank"
                    download
                    className={classes.download_all}
                  >
                    {" "}
                    Download all{" "}
                    <img
                      src={DocumentDownload}
                      alt=""
                      className={classes.download_img}
                    />
                  </Link>
                </div>
                <div className={classes.billing_table}>
                  <table>
                    <thead>
                      <tr className={classes.first_tr}>
                        <th className={classes.blng_th}>
                          <div
                            className={`${classes.billing_check} ${classes.invoice_th} ${classes.no_margin}`}
                          >
                            <input
                              type="checkbox"
                              id="invoice-txt"
                              onChange={this.checkAllBills}
                              checked={this.state.checked}
                            />
                            <label htmlFor="invoice-txt">
                              Invoice{" "}
                              <img
                                src={ArrowDown}
                                alt=""
                                className={classes.invoice_arrow}
                              />
                            </label>
                          </div>
                        </th>
                        <th className={classes.blng_th}>
                          <span>Status</span>
                        </th>
                        <th className={classes.blng_th}>
                          <span>Amount</span>
                        </th>
                        <th className={classes.blng_th}>
                          <span>Plan</span>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.invoices.map((invoice, index) => {
                        console.log(index);

                        return (
                          invoice.billing === this.state.billing && (
                            <tr key={index}>
                              <td className={classes.blng_td}>
                                <div className={classes.billing_check}>
                                  <input
                                    type="checkbox"
                                    id={`invoice-${index + 1}`}
                                    onChange={this.checkBill}
                                    checked={
                                      (this.state.checked ||
                                        (this.state.haveInvoices &&
                                          this.state[
                                            `invoice-${index + 1}`
                                          ])) &&
                                      this.state.haveInvoices &&
                                      this.state[`invoice-${index + 1}`]
                                    }
                                  />
                                  <label htmlFor={`invoice-${index + 1}`}>
                                    {invoice.invoiceDate}
                                  </label>
                                </div>
                              </td>
                              <td className={classes.blng_td}>
                                <span className={classes.blng_paid}>
                                  <img
                                    src={CheckGreen}
                                    alt=""
                                    className={classes.green_check}
                                  />
                                  {invoice.data}
                                </span>
                              </td>
                              <td className={classes.blng_td}>
                                <span className={classes.usd_span}>
                                  {invoice.invoiceAmountPaid}
                                </span>
                              </td>
                              <td className={classes.blng_td}>
                                <span className={classes.td_status}>
                                  {invoice.billing}
                                </span>
                              </td>
                              <td className={classes.blng_td}>
                                <a href={invoice.link} target="_blank" download>
                                  Download
                                </a>
                              </td>
                            </tr>
                          )
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {!haveInvoices && (
              <UpdateModal
                toggleModal={this.closeModal}
                selectBilling={this.selectBilling}
                modal={this.state.modal}
                billing={this.state.billing}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Billing;

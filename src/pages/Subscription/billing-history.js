import React, { Component, Fragment } from "react";

import classes from "../../assets/css/surveys/index.module.scss";
import LogoWhiteTheme from "../../assets/images/LogoWhiteTheme.png";
import Trash from "../../assets/css/CreateAd/trash.svg";
import ArrowRight from "../../assets/css/CreateAd/arrow-right.svg";
import Visa from "../../assets/images/cards/visa.png";
import AmericanExpress from "../../assets/images/cards/americanexpress.png";
import MasterCard from "../../assets/images/cards/mastercard.png";
import VisaDark from "../../assets/images/cards/visa-dark.png";
import AmericanExpressDark from "../../assets/images/cards/americanexpress-dark.png";
import MasterCardDark from "../../assets/images/cards/mastercard-dark.png";

import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import { queryForEmail } from "../../helpers/fakebackend_helper";
import CheckoutForm from "../../components/modals/stripe-form";
import ChangeDefaultCard from "../../components/modals/change-card";
import { ErrorFeedback, SuccessFeedback } from "../../components/feedbacks";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(process.env.REACT_APP_TEST_STRIPEKEY);

const appearance = {
  theme: "stripe",
};

class BillingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addCardModal: false,
      changeDefaultPaymentMethodModal: false,
      subscription: "",
      loading: true,
      billings: [],
      multiple_remove: false,
      multiple: false,
      profile: {},
      stripeCustomerId: "",
      defaultPaymentMethod: {},
      changeDefaultCardLoading:false,
      changeDefaultCardSuccess: false,
      changeDefaultCardError: false,
    };
  }

  toggleDeleteBilling = (id) => {
    axios
      .delete(`http://localhost:4000/api/v1/surveys/user/delete-billing/${id}`)
      .then(() => {
        window.location.reload();
        this.setState((state) => ({ ...state, loading: false }));
      })
      .catch((err) => {
        this.setState((state) => ({ ...state, loading: false }));
      });
  };

  componentDidMount() {
    queryForEmail(
      `https://backendapp.murmurcars.com/api/v1/users/checkEmail/${false}`, //to get customer profile
      {
        email: sessionStorage.getItem("authUser"),
        role: "2",
      }
    )
      .then((user) => {
        const { _id, fullName, email, companyAddress, phone_number } =
          user.resp;

        axios
          .get(
            `http://localhost:4000/api/v1/surveys/user/fetch-billing-history/${_id}` //to get billing history and customer stripe id
          )
          .then((response) => {
            const { invoices, stripeCustomerId, plan } = response.data;
            for (let invoice of invoices) {
              invoice.checked = false;
            }
            axios
              .get(
                `http://localhost:4000/api/v1/surveys/user/default-payment-method/${_id}`
              ) //fetch default payment method
              .then((response) => {
                const { paymentMethod } = response.data;

                this.setState({
                  ...this.state,
                  loading: false,
                  billings: invoices,
                  profile: {
                    id: _id,
                    fullName,
                    email,
                    address: companyAddress,
                    phone_number,
                  },
                  stripeCustomerId,
                  defaultPaymentMethod: paymentMethod,
                  subscription: plan,
                });
              })
              .catch((err) => {
                this.setState({
                  ...this.state,
                  loading: false,
                  billing: invoices,
                  profile: {
                    id: _id,
                    fullName,
                    email,
                    address: companyAddress,
                    phone_number,
                  },
                  stripeCustomerId,
                  subscription: plan,
                });
              });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              loading: false,
              profile: {
                id: _id,
                fullName,
                email,
                address: companyAddress,
                phone_number,
              },
            });
          });
      })

      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
      });
  }
  checkBilling = (event) => {
    const id = event.target.id;
    const checked = event.target.checked;
    const billings = [...this.state.billings];
    let multiple = false;
    let count = 0;
    if (checked) {
      count++;
    }
    console.log(checked);
    console.log(id);
    for (let i = 0; i < billings.length; i++) {
      console.log(billings[i]._id);
      if (billings[i]._id === id) {
        billings[i].checked = checked;
      }

      if (billings[i]._id !== id && billings[i].checked) {
        count++;
      }
    }
    if (count > 1) {
      multiple = true;
    }
    this.setState((state) => ({
      ...state,
      billings,
      multiple_remove: multiple,
    }));
  };

  checkAllBillings = (e) => {
    const billings = [...this.state.billings];
    const checked = e.target.checked;

    for (let i = 0; i < billings.length; i++) {
      billings[i].checked = checked;
    }

    this.setState((state) => ({
      ...state,
      billings,
      multiple: checked,
      multiple_remove: checked,
    }));
  };

  handleBillings = () => {
    const { multiple, multiple_remove, loading } = this.state;
    let allBillings = [];

    this.state.billings.map((billing, i) => {
      allBillings.push(
        <tr key={billing._id}>
          <td className={classes.cads_td}>
            <div className={classes.cads_flex_th}>
              <div className={classes.cads_check}>
                <input
                  type="checkbox"
                  id={billing._id}
                  checked={(multiple && billing.checked) || billing.checked}
                  onChange={this.checkBilling}
                />
                <label htmlFor={billing._id}>
                  <span className={classes.td_data}>{billing.invoice}</span>
                </label>
              </div>
              <div className={`${classes.cads_radio_active}`}>
                {billing.checked && !multiple_remove ? (
                  <button
                    type="button"
                    className={`${classes.check_remove}`}
                    //onClick={() => this.toggleDeleteBilling(billing.id)}
                  >
                    <img src={Trash} alt="" />
                  </button>
                ) : null}
              </div>
            </div>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>{billing.paid}</span>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>{billing.date}</span>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>{billing.subscription}</span>
          </td>
          <td className={classes.cads_td}>
            <span className={classes.td_data}>{billing.status}</span>
            <a href={billing.pdf} download={true}>
              Download
            </a>
          </td>
          {/*<td className={classes.cads_td}>
                <span className={`${classes.td_data} ${survey.paid ? classes.success : classes.failed}`}>
                  {survey.paid ? "Paid" : 'Not Paid'}
                </span>
                </td>*
          <td className={classes.cads_td}>
            <Link
              to={`/surveys/update-survey?survey_id=${survey.survey_id}`}
              className={classes.details_link}
              onClick={() => this.props.toggleToEditAndViewMode()}
            >
              Details
              <img src={ArrowRight} alt="" className={classes.details_img} />
            </Link>
                </td>*/}
        </tr>
      );
    });

    return allBillings;
  };

  toggleDeleteMultipleBillings = () => {
    const billings = this.state.billings;
    const list_of_ids = [];
    this.setState({ ...this.state, loading: true });
    for (let billing of billings) {
      if (billing.checked) {
        list_of_ids.push(billing._id);
      }
    }

    axios
      .delete(
        `http://localhost:4000/api/v1/surveys/user/delete-multiple-billings/${list_of_ids}`
      )
      .then(() => {
        window.location.reload();
        this.setState({ ...this.state, loading: false });
      })
      .catch((err) => {
        this.setState({ ...this.state, loading: false });
      });
  };

  render() {
    const {
      loading,
      multiple_remove,
      multiple,
      profile,
      defaultPaymentMethod,
    } = this.state;
    console.log(defaultPaymentMethod);

    let cardImage = "";

    if (!loading && defaultPaymentMethod.card !== undefined) {
      cardImage =
        defaultPaymentMethod.card.brand === "visa"
          ? Visa
          : defaultPaymentMethod.card.brand === "mastercard"
          ? MasterCard
          : AmericanExpress;

      if (this.props.layoutTheme === "dark") {
        cardImage =
          defaultPaymentMethod.card.brand === "visa"
            ? VisaDark
            : defaultPaymentMethod.card.brand === "mastercard"
            ? MasterCardDark
            : AmericanExpressDark;
      }
    }
    return (
      <Fragment>
        {loading ? (
          <div id="status" style={{ zIndex: 101 }}>
            <div className="spinner-chase">
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
            </div>
          </div>
        ) : null}
        {loading ? (
          <div
            style={{
              background: "white",
              zIndex: 100,
              position: "absolute",
              top: 0,
              width: "100vw",
              height: "100vh",
              opacity: 0.8,
            }}
          />
        ) : null}
        <div
          className={`${classes.dash_right}  ${
            this.state.changeSubsciptionModal ? classes["blur-page"] : null
          }`}
        >
          <header className={classes.header}>
            <div className={classes.mur_contain}>
              <a href="#" className={classes.logo}>
                <img src={LogoWhiteTheme} alt="logo" />
              </a>
            </div>
            <div className={classes.menu_self_flex}>
              <div className={`${classes.menu_flex}`}>
                {" "}
                <div className={classes.button_containers}>
                  <Link
                    to={`/`}
                    className={`${classes.navbar_btn} ${classes.main}`}
                  >
                    Main
                  </Link>
                </div>
                <div className={classes.button_containers}>
                  {" "}
                  <Link
                    //onClick={this.toggleToCreateSurveyMode}
                    to="/surveys/create-survey?publish=true"
                    className={`${classes.navbar_btn} ${classes.main}`}
                  >
                    Questions
                  </Link>
                </div>
              </div>
            </div>
            <div className={classes.dash_relative}>
              <div className={classes.search_box_flex_end}>
                <Profile scope={"survey"} />
              </div>
            </div>
          </header>
          <div
            className={`${classes.surveys_container} d-flex flex-column  align-items-center`}
          >
            <div className={classes["current-subscription"]}>
              <div
                className="d-flex align-items-center justify-content-between h-100"
                style={{ width: "fit-content" }}
              >
                <Link
                  to="/subscription"
                  style={{ whiteSpace: "nowrap" }}
                  className="d-flex align-items-center mr-3"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 12H5M5 12L12 19M5 12L12 5"
                      stroke="#344054"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-2">Go Back</span>
                </Link>
                <div
                  className={`d-flex flex-column justify-content-between h-100 ${classes["current-subscription__info"]}`}
                >
                  <span>
                    Subscription: <span>{this.state.subscription.package}</span>
                  </span>
                  <span>
                    New payment date: {this.state.subscription.expiration}
                  </span>
                </div>
              </div>
            </div>

            <SuccessFeedback
              feedback="default payment method changed"
              showFeedback={this.state.changeDefaultCardSuccess}
            />

            <ErrorFeedback showFeedback={this.state.changeDefaultCardError} />

            {defaultPaymentMethod.card !== undefined ? (
              <div
                className={classes.create_ads}
                style={{ height: "78px", padding: 0 }}
              >
                <div className={classes["default-payment-method"]}>
                  <div>
                    <span>Payment method</span>
                    <p>Change how you pay your plan</p>
                  </div>
                  <div className={classes["default-payment-method__card"]}>
                    <img src={cardImage} />
                    <div
                      className={
                        classes["default-payment-method__card-details"]
                      }
                    >
                      <span>
                        **** **** **** {defaultPaymentMethod.card.last4}
                      </span>
                      <span>
                        Expiry date: {defaultPaymentMethod.card.exp_month}/
                        {defaultPaymentMethod.card.exp_year}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        console.log("click");
                        this.setState((state) => ({
                          ...state,
                          changeDefaultPaymentMethodModal: true,
                        }));
                      }}
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div className={classes.create_ads}>
              <div className={classes.ads_section}>
                <div className={classes.cads_table}>
                  <div />
                  <table>
                    <thead>
                      <tr className={classes.first_tr}>
                        <th className={`${classes.cads_th}`}>
                          <div
                            className={`${classes.cads_check} ${classes.invoice_th}`}
                          >
                            <input
                              type="checkbox"
                              id="invoice"
                              onChange={this.checkAllBillings}
                              checked={multiple}
                            />
                            <label htmlFor="invoice">Invoice</label>
                            {multiple_remove && (
                              <button
                                type="button"
                                className={`${classes.check_remove} ${classes.multiple_remove}`}
                                onClick={() =>
                                  this.toggleDeleteMultipleSurveys()
                                }
                              >
                                <img src={Trash} alt="" />
                              </button>
                            )}
                          </div>
                        </th>
                        <th
                          className={classes.cads_th}
                          style={{ minWidth: "100px" }}
                        >
                          <span>Amount</span>
                        </th>
                        <th
                          className={classes.cads_th}
                          style={{ minWidth: "100px" }}
                        >
                          <span>Date</span>
                        </th>
                        <th
                          className={classes.cads_th}
                          style={{ minWidth: "100px" }}
                        >
                          <span>Subscription</span>
                        </th>

                        <th style={{ minWidth: "200px" }}></th>
                      </tr>
                    </thead>
                    <tbody>{this.handleBillings()}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.addCardModal ? (
          <Elements stripe={stripe} appearance={{ appearance }}>
            <CheckoutForm
              modalStatus={this.state.addCardModal}
              user_id={profile?.id}
              name={profile?.fullName}
              email={profile?.email}
              address={profile?.address}
              phone={profile?.phone_number}
              subscribe={false}
              stripeCustomerId={this.state.stripeCustomerId}
              closeModal={(submit, state) => {
                if (submit && state) {
                  window.scrollTo({ top: 0, left: 0 });
                  this.setState((state) => ({
                    ...state,
                    addCardModal: false,
                    changeDefaultPaymentMethodModal: false,
                    changeDefaultCardSuccess: true,
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      changeDefaultCardSuccess: false,
                    }));
                  }, 3000);

                  
                }else if (!state) {
                  window.scrollTo({ top: 0, left: 0 });
                  this.setState((state) => ({
                    ...state,
                    addCardModal: false,
                    changeDefaultPaymentMethodModal: false,
                    changeDefaultCardError: true,
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      changeDefaultCardError: false,
                    }));
                  }, 3000);
                }else{
                  this.setState((state) => ({
                    ...state,
                    addCardModal: false,
                    changeDefaultPaymentMethodModal:true,
                  }));
                }
              }}
              layoutTheme={this.props.layoutTheme}
            />
          </Elements>
        ) : null}
        {this.state.changeDefaultPaymentMethodModal ? (
          <ChangeDefaultCard
            modalStatus={this.state.changeDefaultPaymentMethodModal}
            user_id={profile?.id}
            name={profile?.fullName}
            email={profile?.email}
            loading={this.state.changeDefaultCardLoading}
            closeModal={async (modalState, paymentMethod) => {
          
              if (paymentMethod === "add card") {
                setTimeout(() => {
                  this.setState((state) => ({
                    ...state,
                    addCardModal: true,
                  }));
                }, 200);
              } else if (modalState) {
                this.setState(state => ({
                  ...state,
                  changeDefaultCardLoading: true
                }))
                try {
                  const customer = await axios.post(
                    "http://localhost:4000/api/v1/surveys/user/update-customer",
                    {
                      user_id: profile?.id,
                      customerId: this.state.stripeCustomerId,
                      paymentMethod,
                    }
                  );
                  axios
                    .get(
                      `http://localhost:4000/api/v1/surveys/user/default-payment-method/${profile?.id}`
                    ) //fetch default payment method
                    .then((response) => {
                      const { paymentMethod } = response.data;
                      window.scrollTo({ top: 0, left: 0 });
                      this.setState((state) => ({
                        ...state,
                        changeDefaultPaymentMethodModal: false,
                        changeDefaultCardSuccess: true,
                        defaultPaymentMethod: paymentMethod,
                        changeDefaultCardLoading: false
                      }));

                      setTimeout(() => {
                        this.setState((state) => ({
                          ...state,
                          changeDefaultCardSuccess: false,
                        }));
                      }, 3000);
                    })
                    .catch((err) => {
                      window.scrollTo({ top: 0, left: 0 });
                      this.setState((state) => ({
                        ...state,
                        changeDefaultPaymentMethodModal: false,
                        changeDefaultCardError: true,
                        changeDefaultCardLoading: false
                      }));
                      setTimeout(() => {
                        this.setState((state) => ({
                          ...state,
                          changeDefaultCardError: false,
                        }));
                      }, 3000);
                    });
                } catch (err) {
                  window.scrollTo({ top: 0, left: 0 });
                  this.setState((state) => ({
                    ...state,
                    changeDefaultPaymentMethodModal: false,
                    changeDefaultCardError: true,
                    changeDefaultCardLoading: false
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      changeDefaultCardError: false,
                    }));
                  }, 3000);
                }
              }else{
                this.setState((state) => ({
                  ...state,
                 changeDefaultPaymentMethodModal: false
                }));
              }
            }}
            layoutTheme={this.props.layoutTheme}
            defaultPaymentMethod={this.state.defaultPaymentMethod.id}
            stripeCustomerId={this.state.stripeCustomerId}
            subscribe={false}
          />
        ) : null}
      </Fragment>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    ...state.Layout,
  };
};
export default connect(mapStatetoProps, null)(withRouter(BillingHistory));

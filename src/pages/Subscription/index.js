import React, { Component, Fragment } from "react";

import classes from "../../assets/css/surveys/index.module.scss";
import LogoWhiteTheme from "../../assets/images/LogoWhiteTheme.png";

import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import { queryForEmail } from "../../helpers/fakebackend_helper";

import Profile from "../../components/CommonForBoth/TopbarDropdown/ProfileMenu";
import CheckoutForm from "../../components/modals/stripe-form";
import ChangeDefaultCard from "../../components/modals/change-card";
import UpgradeSubscription from "../../components/modals/upgrade-subscription";
import DowngradeSubscription from "../../components/modals/degrade-subscription";
import {
  ErrorFeedback,
  SuccessFeedback,
  WarningFeedback,
} from "../../components/feedbacks";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



const stripe = loadStripe(process.env.REACT_APP_TEST_STRIPEKEY);

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSubsciptionModal: false,
      selectPaymentMethodModal: false,
      upgradeSubscriptionModal: false,
      downgradeSubscriptionModal: false,
      addCardModal: false,
      profile: {},
      stripeCustomerId: "",
      defaultPaymentMethod: {},
      subscription: "",
      subscriptions: [{ features: [] }, { features: [] }, { features: [] }],
      paymentStatus: "",
      loading: true,
      subscribeWithDefaultCardLoading: false,
      subscribedSuccesefulyFeedback: false,
      subscribeErrorFeedback: false,
      successFeedback: ''
    };
  }

  componentDidMount() {
  
    window.scrollTo({ top: 0, left: 0 });
    queryForEmail(
      `https://backendapp.getinsightiq.com/api/v1/surveys/customer/checkEmail`, //to get customer profile
      {
        email: sessionStorage.getItem("authUser")
      }
    )
      .then((user) => {
        const { _id, fullName, email, companyAddress, phone_number } =
          user.resp;

        axios
          .get(
            `https://backendapp.getinsightiq.com/api/v1/surveys/customer/subscriptions/${_id}`
          )
          .then((response) => {

           
            const { subscriptions, stripeCustomerId } = response.data;
            const subscribed = subscriptions.some((el) => el.active);
            const index = subscriptions.findIndex((el) => el.active);
            const paymentStatus = subscriptions[index]?.paymentStatus;
            if (!stripeCustomerId) {
              this.setState((state) => ({
                ...state,
           
                subscriptions,
                paymentStatus,
                profile: {
                  id: _id,
                  fullName,
                  email,
                  address: companyAddress,
                  phone_number,
                },
                stripeCustomerId,
                successFeedback: "Subscription is created"
              }));
              setTimeout(() => {
                this.setState((state) => ({
                  ...state,
                  paymentStatus: "",
                  loading: false,
                }));
              }, 5000);
              return;
            }
            axios
              .get(
                `https://backendapp.getinsightiq.com/api/v1/surveys/customer/default-payment-method/${_id}`
              ) //fetch default payment method
              .then((response) => {
                const { paymentMethod } = response.data;

                this.setState((state) => ({
                  ...state,
                 
                  subscriptions,
                  paymentStatus,
                  stripeCustomerId,
                  profile: {
                    id: _id,
                    fullName,
                    email,
                    address: companyAddress,
                    phone_number,
                  },
                  stripeCustomerId,
                  defaultPaymentMethod: paymentMethod.id,
                  successFeedback:subscribed
                  ? "Subscription is updated"
                  : "Subscription is created"
                }));
           

                setTimeout(() => {
                  this.setState((state) => ({
                    ...state,
                    paymentStatus: "",
                     loading: false,
                  }));
                }, 5000);
              })
              .catch((err) => {
                this.setState((state) => ({
                  ...state,
                  loading: false,
                  subscriptions,
                  paymentStatus,
                  profile: {
                    id: _id,
                    fullName,
                    email,
                    address: companyAddress,
                    phone_number,
                  },
                  stripeCustomerId,
                  successFeedback: subscribed
                  ? "Subscription is updated"
                  : "Subscription is created"
                }));
 
              });
          })
          .catch((err) => {
            this.setState((state) => ({
              ...state,
              loading: false,
              profile: {
                id: _id,
                fullName,
                email,
                address: companyAddress,
                phone_number,
              },
              successFeedback: "Subscription is created"
            }));
            document.body.style.overflow = "initial";
          });
      })
      .catch((err) => {
        this.setState((state) => ({
          ...state,
          loading: false,
        }));
        document.body.style.overflow = "initial";
      });
  }

  render() {
    const { loading, subscriptions, profile, subscription, paymentStatus } =
      this.state;

    const subscribed = subscriptions.some((el) => el.active);
    const index = subscriptions.findIndex((el) => el.active);
    const subscriptionId = subscriptions[index]?.subscriptionId;
    const subscribedPackageSize = subscriptions[index]?.size;

    const priceId = subscription.priceId; //selected subscription priceId


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
                    Home
                  </Link>
                </div>
                <div className={classes.button_containers}>
                  {" "}
                  <Link
                    //onClick={this.toggleToCreateSurveyMode}
                    to="/surveys"
                    className={`${classes.navbar_btn} ${classes.main}`}
                  >
                    Surveys
                  </Link>
                </div>
              </div>
            </div>
            <div className={classes.dash_relative}>
              <div className={classes.search_box_flex_end}>
                <Profile scope='global' />
              </div>
            </div>
          </header>

          <div className={classes.surveys_container}>
            <SuccessFeedback
              feedback={this.state.successFeedback}
              showFeedback={this.state.subscribedSuccesefulyFeedback}
            />

            <ErrorFeedback showFeedback={this.state.subscribeErrorFeedback} />
            <WarningFeedback
              showFeedback={paymentStatus === "incomplete"}
              feedback="You have unpaid subscription"
            />
            <div
              className={classes.create_ads}
              style={{
                background: "transparent",
                boxShadow: "none",
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div className={classes.hero}>
                <h1>Subscription</h1>
                <p>Choose one of our packages</p>
              </div>
              <div className={classes.subscription}>
                {subscriptions.map((subscription, index) => (
                  <div
                    className={`${
                      classes["subscription__subscription-package"]
                    } ${
                      this.state.subscription.package ===
                        subscription.package || subscription.active
                        ? classes["subscription__subscription-package--active"]
                        : null
                    }`}
                    key={index}
                  >
                    <div>
                      <h5>
                        {subscription.package}{" "}
                        {subscription.bestSeller ? (
                          <span className={classes['best-seller']}>Best Seller</span>
                        ) : null}
                      </h5>
                      <span>
                        <strong>{subscription.price}</strong> per month
                      </span>
                      <p>{subscription.description}</p>
                    </div>
                    <ul>
                      {subscription.features.map((feature, index) => (
                        <li key={`feature${index}`}>{feature}</li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0 });

                        if (subscription.active) {
                          this.setState(state => ({
                            ...state,
                            loading: true
                          }))
                          axios.delete(
                            `https://backendapp.getinsightiq.com/api/v1/surveys/customer/customer/${profile?.id}/cancel-subscription/${subscriptionId}`
                          ).then(response => {
                            this.setState(state => ({
                              ...state,
                              loading: false,
                              subscribedSuccesefulyFeedback: true,
                              successFeedback: 'Canceled'
                            }))


                            setTimeout(() => {
                              this.setState((state) => ({
                                ...state,
                                subscribedSuccesefulyFeedback: false,
                                successFeedback:  subscribed
                                ? "Subscription is updated"
                                : "Subscription is created"
                              }));

                          
                            }, 3000);

                            setTimeout(() => {
                              this.props.history.push("/");
                            }, 3500)
        
                          }).catch(err => {
                            this.setState(state => ({
                              ...state,
                              loading: false,
                              subscribeErrorFeedback: true
                            }))

                            setTimeout(() => {
                              this.setState((state) => ({
                                ...state,
                                subscribeErrorFeedback: false,
                              
                              }));
                          
                            }, 3000);
                          })
                          return;
                        }
                        if (subscribed) {
                          //if subscribed we change subscription we need to open modal (upgrade or downgrade)
                          const selectedPackageSize = subscription.size;

                          this.setState((state) => ({
                            ...state,
                            subscription: {
                              package: subscription.package,
                              priceId: subscription.priceTestId,
                            },
                            upgradeSubscriptionModal:
                              selectedPackageSize > subscribedPackageSize, //if selected package more expensive then true and upgrade modal popsup
                            downgradeSubscriptionModal:
                              subscribedPackageSize > selectedPackageSize, // if u downgrade then clicked new package price is cheaper
                          }));

                          return;
                        }
                        this.setState((state) => ({
                          ...state,
                          subscription: {
                            package: subscription.package,
                            priceId: subscription.priceTestId,
                          },
                          selectPaymentMethodModal: true,
                        }));
                      }}
                      className={`${classes.subscription__btn} ${
                        subscription.active
                          ? classes["subscription__btn--cancel"]
                          : null
                      }`}
                    >
                      {subscription.active ? "Cancel" : "Get started"}
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66699 10.0001H16.3337M16.3337 10.0001L10.5003 4.16675M16.3337 10.0001L10.5003 15.8334"
                          stroke="white"
                          strokeWidth="1.67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <Link to="/billing" className={classes["billing-history-link"]}>
                See billing history
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="#344054"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {this.state.addCardModal ? (
          <Elements stripe={stripe}>
            <CheckoutForm
              modalStatus={this.state.addCardModal}
              user_id={profile?.id}
              name={profile?.fullName}
              email={profile?.email}
              address={profile?.address}
              phone={profile?.phone_number}
              subscribe={true}
              stripeCustomerId={this.state.stripeCustomerId}
              subscribed={subscribed}
              submit={async (paymentMethod) => {

                if(paymentMethod == null){
                  this.setState((state) => ({
                    ...state,
                    selectPaymentMethodModal: false,
                    subscribeErrorFeedback: true,
                    subscribeWithDefaultCardLoading: false,
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      subscribeErrorFeedback: false,
                    }));
                  }, 3000);
                  return 
                }
                //else checking if customer clicks subscribe btn
                let response = {};
                this.setState((state) => ({
                  ...state,
                  subscribeWithDefaultCardLoading: true,
                }));
      
                try {
                  let customer;
                  if(this.state.stripeCustomerId){
                   customer = await axios.post(
                    "https://backendapp.getinsightiq.com/api/v1/surveys/customer/update-customer",
                    {
                      customerId: this.state.stripeCustomerId,
                      paymentMethod: paymentMethod?.paymentMethod?.id,
                    }
                  );
                }else{
                  customer = await axios.post(
                    "https://backendapp.getinsightiq.com/api/v1/surveys/customer/create-customer",
                    {
                      customer: { email:profile?.email, name:profile?.fullName, phone:profile?.phone_number },
                      paymentMethod: paymentMethod?.paymentMethod?.id,
                    }
                  );
                }

                  if (subscribed) {
                    //if already subscribed and want to upgrade or downgrade package

                    response = await axios.post(
                      `https://backendapp.getinsightiq.com/api/v1/surveys/customer/change-subscription/${profile?.id}`,
                      {
                        subscriptionId,
                        priceId,
                        subscription
                      }
                    );
                  } else {
                    //creating new subscription
                    response = await axios.post(
                      `https://backendapp.getinsightiq.com/api/v1/surveys/customer/create-subscription/${profile?.id}`,
                      {
                        customerId: this.state.stripeCustomerId,
                        priceId,
                      }
                    );
                  }

                  const { client_secret } = response.data;

                  const result =
                    client_secret != null
                      ? await stripe?.value?.confirmCardPayment(client_secret)
                      : null;

                  if (result?.error) {
                    this.setState((state) => ({
                      ...state,
                      selectPaymentMethodModal: false,
                      subscribeErrorFeedback: true,
                      subscribeWithDefaultCardLoading: false,
                    }));

                    setTimeout(() => {
                      this.setState((state) => ({
                        ...state,
                        subscribeErrorFeedback: false,
                      }));
                    }, 3000);
                  } else {
                    // setLoading(false);

                    this.setState((state) => ({
                      ...state,
                      selectPaymentMethodModal: false,
                      subscribedSuccesefulyFeedback: true,
                      subscribeWithDefaultCardLoading: false,
                    }));

                    setTimeout(() => {
                      this.setState((state) => ({
                        ...state,
                        subscribedSuccesefulyFeedback: false,
                      }));
                    }, 3000);

                    setTimeout(() => {
                      this.props.history.push("/");
                    }, 3500);
                  }
                } catch (err) {
                  this.setState((state) => ({
                    ...state,
                    selectPaymentMethodModal: false,
                    subscribeErrorFeedback: true,
                    subscribeWithDefaultCardLoading: false,
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      subscribeErrorFeedback: false,
                    }));
                  }, 3000);
                }
              }}
              closeModal={ () => {
                //if closes modal
                this.setState((state) => ({
                  ...state,
                  selectPaymentMethodModal: false,
                  subscribeWithDefaultCardLoading: false,
                 addCardModal:false,
                }));
              }}

              layoutTheme={this.props.layoutTheme}
              priceId={priceId}
              subscriptionId={subscriptionId}
            />
          </Elements>
        ) : null}
        {this.state.selectPaymentMethodModal ? (
          <ChangeDefaultCard
            modalStatus={this.state.selectPaymentMethodModal}
            //user_id={profile?.id}
            //name={profile?.fullName}
            //email={profile?.email}
            subscribe={true}
            loading={this.state.subscribeWithDefaultCardLoading}
            submit={async (paymentMethod) => {
              //else checking if customer clicks subscribe btn
              let response = {};
              this.setState((state) => ({
                ...state,
                subscribeWithDefaultCardLoading: true,
              }));
              try {
                const customer = await axios.post(
                  "https://backendapp.getinsightiq.com/api/v1/surveys/customer/update-customer",
                  {
                    customerId: this.state.stripeCustomerId,
                    paymentMethod,
                    user_id:profile?.id
                  }
                );

                if (subscribed) {
                  //if already subscribed and want to upgrade or downgrade package

                  response = await axios.post(
                    `https://backendapp.getinsightiq.com/api/v1/surveys/customer/change-subscription/${profile?.id}`,
                    {
                      subscriptionId,
                      priceId,
                      subscription
                    }
                  );
                } else {
                  //creating new subscription
                  response = await axios.post(
                    `https://backendapp.getinsightiq.com/api/v1/surveys/customer/create-subscription/${profile?.id}`,
                    {
                      customerId: this.state.stripeCustomerId,
                      priceId,
                    }
                  );
                }

                const { client_secret } = response.data;

                const result =
                  client_secret != null
                    ? await stripe?.value?.confirmCardPayment(client_secret)
                    : null;

                if (result?.error) {
                  this.setState((state) => ({
                    ...state,
                    selectPaymentMethodModal: false,
                    subscribeErrorFeedback: true,
                    subscribeWithDefaultCardLoading: false,
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      subscribeErrorFeedback: false,
                    }));
                  }, 3000);
                } else {
                  // setLoading(false);

                  this.setState((state) => ({
                    ...state,
                    selectPaymentMethodModal: false,
                    subscribedSuccesefulyFeedback: true,
                    subscribeWithDefaultCardLoading: false,
                  }));

                  setTimeout(() => {
                    this.setState((state) => ({
                      ...state,
                      subscribedSuccesefulyFeedback: false,
                    }));
                  }, 3000);

                  setTimeout(() => {
                    this.props.history.push("/");
                  }, 3500);
                }
              } catch (err) {
                this.setState((state) => ({
                  ...state,
                  selectPaymentMethodModal: false,
                  subscribeErrorFeedback: true,
                  subscribeWithDefaultCardLoading: false,
                }));

                setTimeout(() => {
                  this.setState((state) => ({
                    ...state,
                    subscribeErrorFeedback: false,
                  }));
                }, 3000);
              }
            }}
            closeModal={ () => {
              //if closes modal
              this.setState((state) => ({
                ...state,
                selectPaymentMethodModal: false,
                subscribeWithDefaultCardLoading: false,
                subscription: {},
              }));
            }}
            addNewCard={() => {
              window.scrollTo({ top: 0, left: 0 });
              //checking if customer want to add a new card
              setTimeout(() => {
                this.setState((state) => ({
                  ...state,
                  addCardModal: true,
                }));
              }, 200);
            }}
            //subscribe={true}
            layoutTheme={this.props.layoutTheme}
            defaultPaymentMethod={this.state.defaultPaymentMethod}
            stripeCustomerId={this.state.stripeCustomerId}
            //priceId={this.state.subscription.priceId}
          />
        ) : null}

        {this.state.upgradeSubscriptionModal ? (
          <UpgradeSubscription
            layoutTheme={this.props.layoutTheme}
            modalStatus={this.state.upgradeSubscriptionModal}
            closeModal={async (modalState) => {
              if (!modalState) {
                this.setState((state) => ({
                  ...state,
                  upgradeSubscriptionModal: false,
                  subscription: {},
                }));

                return;
              }
              this.setState((state) => ({
                ...state,
                upgradeSubscriptionModal: false,
                selectPaymentMethodModal: true,
              }));
            }}
          />
        ) : null}
        {this.state.downgradeSubscriptionModal ? (
          <DowngradeSubscription
            layoutTheme={this.props.layoutTheme}
            modalStatus={this.state.downgradeSubscriptionModal}
            closeModal={async (modalState) => {
              if (!modalState) {
                this.setState((state) => ({
                  ...state,
                  downgradeSubscriptionModal: false,
                  subscription: {},
                }));

                return;
              }
              this.setState((state) => ({
                ...state,
                downgradeSubscriptionModal: false,
                selectPaymentMethodModal: true,
              }));
            }}
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
export default connect(mapStatetoProps, null)(withRouter(Subscription));

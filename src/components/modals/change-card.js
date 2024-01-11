import React, { useMemo, useState } from "react";

import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import "../../assets/css/modals/stripe-modal.scss";
import classes from "../../assets/css/modals/stripe.module.scss";
import NewCard from "../../assets/images/Mastercard.svg";
import Visa from "../../assets/images/cards/visa.png";
import AmericanExpress from "../../assets/images/cards/americanexpress.png";
import MasterCard from "../../assets/images/cards/mastercard.png";
import VisaDark from "../../assets/images/cards/visa-dark.png";
import AmericanExpressDark from "../../assets/images/cards/americanexpress-dark.png";
import MasterCardDark from "../../assets/images/cards/mastercard-dark.png";
//import Visa from '../../assets/images/cards/visa.png'

class ChangeDefaultCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultPaymentMethod: this.props.defaultPaymentMethod,
      paymentMethods: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      loading: true,
    }));

    if (!this.props.stripeCustomerId) {
      this.setState((state) => ({
        ...state,
        loading: false,
      }));
      return;
    }
    axios
      .get(
        `https://backendapp.getinsightiq.com/api/v1/surveys/customer//list-payment-methods/${this.props.stripeCustomerId}`
      )
      .then((response) => {
        const { data } = response.data.paymentMethods;
        const paymentMethods = [];
        for (let paymentMethod of data) {
          const card = {};
          card.name = paymentMethod.billing_details.name;
          card.brand = paymentMethod.card.brand;
          card.expirationDate =
            paymentMethod.card.exp_month + "/" + paymentMethod.card.exp_year;
          card.last4 = paymentMethod.card.last4;
          card.id = paymentMethod.id;
          paymentMethods.push(card);
        }
        this.setState((state) => ({
          ...state,
          paymentMethods,
          defaultPaymentMethod: this.props.defaultPaymentMethod,
          loading: false,
        }));
      })
      .catch((err) =>
        this.setState((state) => ({
          ...state,
          loading: false,
        }))
      );
  }

  render() {
    const { modalStatus, closeModal, layoutTheme } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        isOpen={modalStatus}
        toggle={closeModal}
        className={`${classes.modal} ${classes[layoutTheme]} ${layoutTheme}`}
      >
        <ModalHeader>
          <div className={classes.modal_header}>
            <h3>Choose payment method</h3>
            <button onClick={() => closeModal(false, null)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#667085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            className={`stripe ${classes.card} border-bottom-0 border-left-0 border-right-0`}
          >
            {loading || this.props.loading ? (
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
            ) : null}
            {this.state.paymentMethods.map((card, i) => {
              let cardImage =
                card.brand === "visa"
                  ? Visa
                  : card.brand === "mastercard"
                  ? MasterCard
                  : AmericanExpress;

              if (layoutTheme === "dark") {
                cardImage =
                  card.brand === "visa"
                    ? VisaDark
                    : card.brand === "mastercard"
                    ? MasterCardDark
                    : AmericanExpressDark;
              }
              return (
                <label key={card.id} htmlFor={card.id}>
                  <div className={classes["card__input-container"]}>
                    <input
                      type="radio"
                      id={card.id}
                      checked={this.state.defaultPaymentMethod === card.id}
                      onChange={() =>
                        this.setState((state) => ({
                          ...state,
                          defaultPaymentMethod: card.id,
                        }))
                      }
                    />
                    <div className={`${classes["card__input"]}`} />
                    <div className={classes["card__foreground"]} />
                  </div>
                  <div className={classes["card__card-img"]}>
                    <img src={cardImage} alt="" />
                  </div>
                  <div className={classes["card__owner"]}>
                    <span>Name on card:</span>
                    <span>{card.name.toUpperCase()}</span>
                  </div>
                  <div className={classes["card__details"]}>
                    <span>**** **** **** {card.last4}</span>
                    <span>Expiry date: {card.expirationDate}</span>
                  </div>
                </label>
              );
            })}
            <label htmlFor="new-card">
              <div
                htmlFor="new-card"
                className={classes["card__input-container"]}
              >
                <input
                  type="radio"
                  id="new-card"
                  checked={this.state.defaultPaymentMethod === "add card"}
                  onChange={() =>
                    this.setState((state) => ({
                      ...state,
                      defaultPaymentMethod: "add card",
                    }))
                  }
                />
                <div className={`${classes["card__input"]}`} />
                <div className={classes["card__foreground"]} />
              </div>
              <div className={classes["card__card-img"]}>
                <img src={NewCard} alt="" />
              </div>
              <span>Add new card</span>
            </label>
          </div>
          <div className={classes.btns}>
            <button
              type="button"
              onClick={() => {
                closeModal(false, null);
              }}
            >
              Cancel
            </button>

            <input
              type="submit"
              form="myform"
              value={
                this.state.defaultPaymentMethod === "add card"
                  ? "Next"
                  : !this.props.subscribe
                  ? "Save"
                  : "Subscribe"
              }
              className={`${
                !this.state.defaultPaymentMethod ||
                (this.state.defaultPaymentMethod ===
                  this.props.defaultPaymentMethod &&
                  !this.props.subscribe)
                  ? classes.disabled
                  : classes.active
              }`}
              disabled={
                !this.state.defaultPaymentMethod ||
                (this.state.defaultPaymentMethod ===
                  this.props.defaultPaymentMethod &&
                  !this.props.subscribe)
              }
              onClick={() => {
                closeModal(true, this.state.defaultPaymentMethod);
              }}
            />
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ChangeDefaultCard;

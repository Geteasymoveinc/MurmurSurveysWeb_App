import React, { useMemo, useState } from "react";
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import "../../assets/css/modals/stripe-modal.scss";
import classes from "../../assets/css/modals/stripe.module.scss";
import Mastercard from "../../assets/images/Mastercard.png";

const useOptions = () => {
  const options = useMemo(
    () => ({
      showIcon: true,
      style: {
        base: {
          fontSize: "17px",
          color: "#424770",

          fontSmoothing: "antialiased",
          letterSpacing: "0.025em",
          fontFamily: "Roboto, Source Code Pro, monospace, SFUIDisplay",
          backgroundColor: "white",
          margin: "18px",
          height: "30px",
          "::placeholder": {
            color: "#667085",
            margin: "18px",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const completed = {
  cvc: false,
  number: false,
  expiry: false
}
function CheckoutForm({
  user_id,
  modalStatus,
  closeModal,
  submit,
  layoutTheme,
  subscribe,
  stripeCustomerId,
  email,
  phone,
}) {
  const [checkoutError, setCheckoutError] = useState();
  const [disabled, setDisabledState] = useState(true)
  const [loading, setLoading] = useState(false);
  const [name, setFullName] = useState('')

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleCardDetailsChange = (event) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
   
    if (event.complete) {
      if (event.elementType === "cardNumber") {
        elements?.getElement(CardExpiryElement)?.focus();
        completed.number = true
      }

      if (event.elementType === "cardExpiry") {
        elements?.getElement(CardCvcElement)?.focus();
        completed.expiry = true
      }
      

      if(event.elementType === 'cardCvc'){
        completed.cvc = true
      }


      if(completed.number && completed.cvc && completed.expiry){
        setDisabledState(false)
      }
    }else{
      if (event.elementType === "cardNumber") {
    
        completed.number = false
      }

      if (event.elementType === "cardExpiry") {
  
        completed.expiry = false
      }
      

      if(event.elementType === 'cardCvc'){
        completed.cvc = false
      }


      if(!completed.number || !completed.cvc || !completed.expiry){
        setDisabledState(true)
      }
    }
  };

  /*var element = elements.create('card', {
      style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#fff',
          fontWeight: '500',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#87BBFD',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },
    });*/
  // main function

  const createSubscription = async () => {
    setLoading(true);
    try {
      let paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email,
          phone,
        },
      });
      submit(paymentMethod)
   
    } catch (error) {
      submit(null);
      setLoading(false);
    }
  };

  const addNewPaymentMethod = async () => {
    setLoading(true);
    try {
      let paymentMethod = await stripe?.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email,
          phone,
        },
      });
      submit(paymentMethod)
   
    } catch (error) {
      submit(null);
      setLoading(false);
    }
  };



  return (
    <Modal
      isOpen={modalStatus}
      toggle={closeModal}
      className={`${classes.modal} ${layoutTheme}`}
    >
      <ModalHeader>
        <div className={classes.modal_header}>
          <h3>Choose payment method</h3>
          <button onClick={() => closeModal()}>
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
        {loading ? (
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
        <div
          className={`stripe ${classes["card"]} ${
            loading ? classes["card--opacity-50"] : null
          }`}
        >
          <label htmlFor="new card">
            <div className={classes["card__input-container"]}>
              <input type="radio" id="new card" defaultChecked={true} />
              <div className={`${classes["card__input"]}`} />
            </div>
            <div className={classes["card__card-img"]}>
              <img src={Mastercard} alt="" />
            </div>
            <span>Add new card</span>
          </label>
          <form className="d-flex flex-column mt-4" id="myForm">
            <label className="card-element w-100 mb-4">
              <input
                type="text"
                onChange={(event) => {
                  const value = event.target.value;

                  setFullName(value);
                }}
                placeholder="Name on the card"
              />
            </label>

            <label className="card-number">
              <CardNumberElement
                options={options}
                onChange={handleCardDetailsChange}
                disabled={loading}
              />
            </label>
            <div
              className="d-flex justify-content-between"
              style={{ gap: "25px" }}
            >
              <label className="card-element">
                <CardExpiryElement
                  options={options}
                  onChange={handleCardDetailsChange}
                  disabled={loading}
                />
              </label>
              <label className="card-element">
                <CardCvcElement
                  options={options}
                  onChange={handleCardDetailsChange}
                  disabled={loading}
                />
              </label>
            </div>
          </form>
        </div>
        <div
          className={`${classes.btns} ${
            loading ? classes["card--opacity-50"] : null
          }`}
        >
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              closeModal(false);
            }}
          >
            Go Back
          </button>

          <input
            type="button"
            form="myform"
            disabled={!name || loading || disabled}
            className={!name || loading || disabled ? classes.disabled : null}
            onClick={() => {
              const callFn = subscribe
                ? createSubscription
                : addNewPaymentMethod;
              callFn();
            }}
            value={`${subscribe ? "Subscribe" : "Add Card"}`}
            //disabled={disabled}
            //className={`${disabled ? classes.disabled : classes.active}`}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}

export default CheckoutForm;

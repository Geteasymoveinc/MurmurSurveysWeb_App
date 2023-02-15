import React from 'react';


import {
  Elements,
  ElementsConsumer,
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51LMXvLIG4ifzlvJuB6FKpUFRFhyutfaEPQnQKurOwmTzczuDKZo6rm9NK6SNoYLatUm4AbYrIWDd6OBZ4eKaEyEk00gldheHja");

class PaymentForm extends React.Component {
  handleSubmit = async () => {
    const { elements, stripe } = this.props;
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // ... SEND to your API server to process payment intent
    }
  };

  render() {
    return (
      <>
        <h1>stripe form</h1>
        <CardElement />
        <button onClick={this.handleSubmit}>Buy</button>
      </>
    );
  }
}

export class StripePaymentForm extends React.Component {
  render() {
    return (
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {(ctx) => <PaymentForm {...ctx} />}
        </ElementsConsumer>
      </Elements>
    );
  }
}

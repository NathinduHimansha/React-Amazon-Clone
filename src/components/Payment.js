import React, { useState, useEffect } from "react";
import "./payment.css";
import { useStateValue } from "../state_management/StateProvider";
import CheckoutProducts from "./CheckoutProducts";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../state_management/reducer";
import instance from "../axios/axios";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase_services/firebase";

function Payment() {
  const history = useHistory();
  const [{ user, basket }, dispatch] = useStateValue();

  //stripe
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  //secret key generator
  useEffect(() => {
    //generates a special stripe secret key which allows us to charge from customer(this is need to connect with strip)
    //by this is telling strip a diffrent paymnet is coming likewise
    const getClientSecret = async () => {
      const response = await instance({
        method: "post",
        //Stripe expects the total in a currencies subunits(may defer to different currencies)
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);
  console.log("CLIENT SECRET: ", clientSecret);

  //stripe functions(buy button)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    //reqursing to get the payment by passing secret key and card details
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        console.log("paymentIntent:", paymentIntent);

        //updating db amout payment details(firestore)
        db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        dispatch({
          type: "EMPTY_BASKET",
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //.replace will clear the browser history from current link and routing to new
        //because its not need to come back to this page
        history.replace("/orders");
      });
  };

  //card details entering - works as a listner
  //listen for changes in the cardElement and display any errors as the customer types in their card details
  const handleChange = (e) => {
    //if untill event is empty btn will be disabled
    setDisabled(e.empty);
    //if any error in card it will setup the error state
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout">({basket?.length} items)</Link>}</h1>

        {/* payment-section--deliveryitems */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address:</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>No: 123/1, Main Street</p>
            <p>Colombo 07</p>
          </div>
        </div>
        {/* payment-section--reviewitems */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and Delivery: </h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProducts
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment-section--payment added */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method: </h3>
          </div>
          <div className="payment__details">
            {/* strip will use here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  // value={0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* error display */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

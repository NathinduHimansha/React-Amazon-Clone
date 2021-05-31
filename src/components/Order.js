import React from "react";
import "./order.css";
import moment from "moment";
import CheckoutProducts from "./CheckoutProducts";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      {/* momemnt is a js library to render timestamps nicely */}
      <p>{moment.unix(order?.data.created).format("Do MMMM YYYY , h:mma")}</p>
      <p className="order__id">
        <span>
          <b>order no</b>: {order?.id}
        </span>
      </p>
      {order?.data?.basket?.map((item) => (
        <CheckoutProducts
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hidebutton={true}
        />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total:{value}</h3>
          </>
        )}
        decimalScale={2}
        value={order?.data?.amount / 100}
        // value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;

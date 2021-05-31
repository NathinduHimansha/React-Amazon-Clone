import React, { useEffect, useState } from "react";
import "./subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../state_management/StateProvider";
import { getBasketTotal } from "../state_management/reducer";
import { useHistory } from "react-router";

function Subtotal() {
  const history = useHistory();

  const [{ basket }, dispatch] = useStateValue();

  //function for get total - this is basic function. powerfull function in reducer.js(reduce())
  // const getBasketTotal = () => {
  //   let total = 0;
  //   basket.forEach((item) => {
  //     total += item.price;
  //   });
  //   return total;
  // };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length}): {/*({basket.length} items): */}
              {/* <strong>{`${value}`}</strong> */}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        // value={0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />

      <button onClick={(e) => history.push("/payment")}>Procees to Checkout</button>
    </div>
  );
}

export default Subtotal;

import React from "react";
import "./checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "../state_management/StateProvider";
import CheckoutProducts from "./CheckoutProducts";

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout__add"
        />
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>

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
      <div className="checkout__right">
        {/* subtotal */}
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;

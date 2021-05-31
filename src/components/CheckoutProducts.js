import React from "react";
import "./checkoutproducts.css";
import { useStateValue } from "../state_management/StateProvider";

function CheckoutProducts({ id, title, image, price, rating, hidebutton = false }) {
  const [{ basket }, dispatch] = useStateValue();

  //remove the items from basket
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProducts">
      <img className="checkoutProducts__image" src={image} alt="" />

      <div className="checkoutProducts__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkout__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {/* a way to run for loop inside the html just scenrios like threr is no arrayin here its create an array 
          accoriding to the number given(rating) and mapping(iteraring)it. at a single iteraion we can do print stuff
          (just like array map() function but hereno array its a kind of virtual array) */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hidebutton && <button onClick={removeFromBasket}>Remove from basket</button>}
      </div>
    </div>
  );
}

export default CheckoutProducts;

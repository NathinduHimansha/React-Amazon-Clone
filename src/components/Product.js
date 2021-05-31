import React from "react";
import { useStateValue } from "../state_management/StateProvider";
import "./product.css";

function Product({ id, title, image, price, rating }) {
  // state = {basket}
  const [{ basket }, dispatch] = useStateValue();

  //dispath the items to the data layer
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id: id, title: title, image: image, price: price, rating: rating },
    });
  };
  console.log(basket);

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small> $</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {/* a way to run for loop inside the html just scenrios like threr is no array
          in here its create an array accoriding to the number given(rating) and mapping(iteraring)
          it. at a single iteraion we can do print stuff(just like array map() function but here
          no array its a kind of virtual array) */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;

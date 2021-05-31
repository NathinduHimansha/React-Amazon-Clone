import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../state_management/StateProvider";
import { auth } from "../firebase_services/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  //login/logout control
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="hedaer__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        {/* icon */}
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div onClick={handleAuthentication} className="header__option">
          <span className="hedaer__optionLineOne">Hello {user ? user.email : "Guest"}</span>
          <span className="hedaer__optionLineTwo">{user ? "Sign-Out" : "Sign-In"}</span>
        </div>
        <Link to="/orders">
          <div className="header__option">
            <div className="header__option">
              <span className="hedaer__optionLineOne">Returns</span>
              <span className="hedaer__optionLineTwo">& Orders</span>
            </div>
          </div>
        </Link>
        <div className="header__option">
          {" "}
          <div className="header__option">
            <span className="hedaer__optionLineOne">Your</span>
            <span className="hedaer__optionLineTwo">Prime</span>
          </div>
        </div>
      </div>

      <Link to="/checkout">
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className="hedaer__optionLineTwo header__basketCount">{basket?.length}</span>
        </div>
      </Link>
    </div>
  );
}

export default Header;

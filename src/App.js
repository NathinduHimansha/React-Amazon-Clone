import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { auth } from "./firebase_services/firebase";
import { useStateValue } from "./state_management/StateProvider";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

//stripe public key
const promise = loadStripe(
  "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    //onAuthStateChanged() <- this works as a listner to the app. if auth logined or logout this will work
    //this is providfed by firebase
    auth.onAuthStateChanged((authUser) => {
      console.log("userrrr", authUser);

      //checking weather logged in
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      }
      //if user logout
      else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  console.log("boooom", user);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact={true} path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route exact={true} path="/payment">
            <Header />
            {/* wrapping by stripe - as react higer order */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact={true} path="/login">
            <Login />
          </Route>
          <Route exact={true} path="/checkout">
            <Header />
            <Checkout />
          </Route>
          {/* default route - this should be in bottom becuase react match the route chracters
          and also if there is no route matched react will direct you to this*/}
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

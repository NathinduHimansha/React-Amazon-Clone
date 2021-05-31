import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./login.css";
import { auth } from "../firebase_services/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //allow us to chnage the link/route
  const history = useHistory();

  //signin
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("logn", auth);
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  //signup
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1920px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" onClick={signIn} className="login_signinButton">
            Sign In
          </button>
        </form>

        <span>This is a clone of Amazon made by Nathindu Himansha</span>
        <p>
          by signing-in you agree to Amazon's conditions of Use & Sale. Please see our Privacy
          Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>
        <button type="submit" onClick={register} className="login_signupButton">
          Create your Amzon Account
        </button>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./state_management/StateProvider";
import reducer, { initialState } from "./state_management/reducer";

ReactDOM.render(
  <React.StrictMode>
    {/* warp the whole app inside the datalayer */}
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

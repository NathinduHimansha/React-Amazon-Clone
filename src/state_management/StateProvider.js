import React, { createContext, useContext, useReducer } from "react";

//prepare the datalayer - context API
export const StateContext = createContext();

//wrap our app in data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  //wrap the all components(app.js) inside the data layer(state)
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull information outside from data layer
export const useStateValue = () => useContext(StateContext);

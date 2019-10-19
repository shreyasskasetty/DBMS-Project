/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { createStore } from 'redux';
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
import { Provider } from 'react-redux';
import rootReducer from 'reducers/rootReducer.js';

const saveState = (state) => {
  try {
      // Convert the state to a JSON string 
      const serialisedState = JSON.stringify(state);

      // Save the serialised state to localStorage against the key 'app_state'
      window.sessionStorage.setItem('app_state', serialisedState);
  } catch (err) {
      // Log errors here, or ignore
  }
};

const loadState = () => {
  try {
      // Load the data saved in localStorage, against the key 'app_state'
      const serialisedState = window.sessionStorage.getItem('app_state');

      // Passing undefined to createStore will result in our app getting the default state
      // If no data is saved, return undefined
      if (!serialisedState) return undefined;

      // De-serialise the saved state, and return it.
      return JSON.parse(serialisedState);
  } catch (err) {
      // Return undefined if localStorage is not available, 
      // or data could not be de-serialised, 
      // or there was some other error
      return undefined;
  }
};
const oldState = loadState();
const store = createStore(rootReducer,oldState);

store.subscribe(() => {
  console.log('state updated');
  console.log(store.getState());
  saveState(store.getState());
})
ReactDOM.render(
  <Provider store={store}>,
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

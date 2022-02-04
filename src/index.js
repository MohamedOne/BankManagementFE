import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import ManagerMenu from './components/ManagerMenu';
import AccountMenu from './components/AccountMenu';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../src/redux/store'

const store = createStore(RootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/account">
            <AccountMenu />
          </Route>
          <Route path="/manager">
            <ManagerMenu />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

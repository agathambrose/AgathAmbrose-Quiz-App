import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import { store } from './components/redux/features/store';



ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);



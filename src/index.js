import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import errorInterceptor from './helpers/error.interceptor';
import { Provider } from 'react-redux';
import store from './store/store';
import orgInterceptor from './helpers/org.interceptor';
orgInterceptor(axios)
errorInterceptor(axios)
ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/search" element={<App />} />

      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

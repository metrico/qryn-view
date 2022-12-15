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
import DataSources from './views/DataSources/DataSources';

errorInterceptor(axios)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* // react router v6 doesn't support [exact] anymore. */}
          <Route path="/" element={<App />} /> 
          <Route path="/search" element={<App />} />
          <Route path="/datasources/*" element={<DataSources />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

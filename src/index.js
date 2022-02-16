import React from 'react';
import ReactDOM from 'react-dom';
import './scss/app.scss';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/search" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

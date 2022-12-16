import React from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import errorInterceptor from "./helpers/error.interceptor";
import { Provider } from "react-redux";
import store from "./store/store";
import DataSources from "./views/DataSources/DataSources";

import { CookiesProvider } from "react-cookie";
errorInterceptor(axios);
const showDs = store.getState()["showDataSourceSetting"] || false;
ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/search" element={<App />} />
                        {showDs && (
                            <Route
                                path="/datasources/*"
                                element={showDs ? <DataSources /> : <App />}
                            />
                        )}
                    </Routes>
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

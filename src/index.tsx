import {StrictMode} from "react";
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
import ProtectedRoute from "./providers/ProtectedRoute";
errorInterceptor(axios);
ReactDOM.render(
    <StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/search" element={<App />} />
                            <Route
                                path="/datasources/*"
                                element={<ProtectedRoute> <DataSources /></ProtectedRoute>}
                            />
                    </Routes>
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    </StrictMode>,
    document.getElementById("root")
);

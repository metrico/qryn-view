import {lazy,Suspense, StrictMode} from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";
//import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import errorInterceptor from "./helpers/error.interceptor";
import { Provider } from "react-redux";
import store from "./store/store";
//import DataSources from "./views/DataSources/DataSources";
import { Notification } from "./qryn-ui/notifications";
import { CookiesProvider } from "react-cookie";
import ProtectedRoute from "./providers/ProtectedRoute";
const AppRoute = lazy(()=> import("./App"))
const DataSourcesRoute = lazy(()=> import("./views/DataSources/DataSources"))
errorInterceptor(axios);
ReactDOM.render(
    <StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<AppRoute />} />
                        <Route path="/search" element={<AppRoute />} />
                            <Route
                                path="/datasources/*"
                                element={<ProtectedRoute> <DataSourcesRoute /></ProtectedRoute>}
                            />
                    </Routes>
                    </Suspense>
                </BrowserRouter>
                <Notification />
            </Provider>
        </CookiesProvider>
    </StrictMode>,
    document.getElementById("root")
);

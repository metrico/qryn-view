import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";
//import App from "./App";
import axios from "axios";
import errorInterceptor from "./helpers/error.interceptor";
import { Provider } from "react-redux";
import store from "./store/store";
import { Notification } from "./qryn-ui/notifications";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScreenLoader from "./views/ScreenLoader";
import ProtectedRoute from "./providers/ProtectedRoute";
const AppRoute = lazy(() => import("./App"));
const DataSourcesRoute = lazy(() => import("./views/DataSources/DataSources"));
const MainRoute = lazy(() => import("./views/Main"));
const PluginsRoute = lazy(() => import("./plugins/Plugins"));
const UserRoles = lazy(()=> import("./views/User/UserRoles"))
errorInterceptor(axios);
ReactDOM.render(
    <StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Suspense fallback={<ScreenLoader />}>
                        <Routes>
                            <Route path="/" element={<AppRoute />}>
                                <Route index element={<MainRoute />} />
                                <Route
                                    path="/search/*"
                                    index
                                    element={<MainRoute />}
                                />
                                <Route
                                    path="/plugins"
                                    element={<PluginsRoute />}
                                />
                                   <Route
                                    path="/users"
                                    element={<UserRoles />}
                                />

                                <Route
                                    path="/datasources/*"
                                    element={
                                        <ProtectedRoute>
                                            {" "}
                                            <DataSourcesRoute />
                                        </ProtectedRoute>
                                    }
                                />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
                <Notification />
            </Provider>
        </CookiesProvider>
    </StrictMode>,
    document.getElementById("root")
);

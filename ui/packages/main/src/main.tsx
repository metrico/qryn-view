
import React from 'react'
import ReactDOM from 'react-dom/client'

import axios from 'axios'
import "./scss/app.scss";
import errorInterceptor from '@ui/helpers/error.interceptor'

import { Notification } from '@ui/qrynui/notifications'

import {CookiesProvider } from 'react-cookie'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import  ScreenLoader  from '@ui/views/ScreenLoader'

import store from '@ui/store/store'
import { Provider } from 'react-redux'
import ProtectedRoute from './providers/ProtectedRoute'

const AppRoute = lazy(()=> import('./App'))

const DataSourcesRoute = lazy(()=> import ('@ui/views/DataSources/DataSources'))

const MainRoute = lazy(()=> import ("@ui/views/Main"))

const PluginsRoute = lazy(() => import("@ui/plugins/Plugins"));

const UserRoles = lazy(()=> import("@ui/views/User/UserRoles"))

errorInterceptor(axios);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<React.StrictMode>
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
</React.StrictMode>
);

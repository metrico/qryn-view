import { createSlice } from "@reduxjs/toolkit";

export interface HTTPHeadersState {
    url: string;
    allowedCookies: string[];
    timeOut: number;
}

const initialState: HTTPHeadersState = {
    url: "http://qryn:3100",
    allowedCookies: [],
    timeOut: 0,
};

export interface UrlPayload {
    payload: string;
}

export interface AllowedCookiesPayload {
    payload: string[];
}

export interface TimeOutPayload {
    payload: number;
}

const setUrl = (state: HTTPHeadersState, action: UrlPayload) => {
    state.url = action.payload;
};

const setAllowedCookies = (
    state: HTTPHeadersState,
    action: AllowedCookiesPayload
) => {
    state.allowedCookies = action.payload;
};

const setTimeOutState = (state: HTTPHeadersState, action: TimeOutPayload) => {
    state.timeOut = action.payload;
};

export const httpHeadersSlice = createSlice({
    name: "httpHeaders",
    initialState,
    reducers: {
        setUrl,
        setAllowedCookies,
        setTimeOutState,
    },
});

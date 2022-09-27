import {createSlice} from '@reduxjs/toolkit'

export interface DataSourceAuthState {
    basicAuth: boolean;
    withCredentials: boolean;
    TLSClientAuth: boolean;
    withCACert: boolean;
    skipTLSVerify: boolean;
    forwardOAuthIdentity: boolean;
}

const initialState:DataSourceAuthState = {
    basicAuth: false,
    withCredentials: false,
    TLSClientAuth: false,
    withCACert: false,
    skipTLSVerify: false,
    forwardOAuthIdentity: false,
}

export interface BasicAuthPayload  {
  payload:boolean;
}
export interface WithCredentialsPayload  {
    payload:boolean;
  }
  export interface TLSCLientAuthPayload  {
    payload:boolean;
  }
  export interface WithCACertPayload  {
    payload:boolean;
  }
  export interface SkipTLSVerifyPayload  {
    payload:boolean;
  }
  export interface ForwardOauthIdentityPayload  {
    payload:boolean;
  }
  

const setBasicAuth = (state:DataSourceAuthState, action:BasicAuthPayload) => {
    state.basicAuth = action.payload;
}

const setWithCredentials = (state:DataSourceAuthState, action:WithCredentialsPayload) => {
    state.withCredentials = action.payload;
}

const setTLSClientAuth = (state:DataSourceAuthState, action:TLSCLientAuthPayload)=>{
state.TLSClientAuth = action.payload;
}

const setWithCACert = (state: DataSourceAuthState, action: WithCACertPayload) => {
    state.withCACert = action.payload;
}

const setSkipTLSVerify = (state:DataSourceAuthState, action: SkipTLSVerifyPayload) => {
    state.skipTLSVerify = action.payload;
}

const setForwardOauthIdentity = (state:DataSourceAuthState, action:ForwardOauthIdentityPayload) => {
    state.forwardOAuthIdentity = action.payload;
}


export const dataSourceAuthSlice = createSlice({
    name:'dataSourceAuth',
    initialState,
    reducers: {
        setBasicAuth,
        setWithCredentials,
        setTLSClientAuth,
        setWithCACert,
        setSkipTLSVerify,
        setForwardOauthIdentity

    },  
});

